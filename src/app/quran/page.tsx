
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Terminal, Search, Eye, EyeOff, Play, Loader, Pause, ArrowLeft, Download, WifiOff, Star, Sparkles, Loader2 } from "lucide-react"
import { useEffect, useState, useMemo, FormEvent, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { textToSpeech } from "@/ai/flows/text-to-speech"
import type { TextToSpeechInput, TextToSpeechOutput } from "@/ai/flows/text-to-speech-types";
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { getSurahList, storeSurahList, getSurahEdition, storeSurahEdition, isQuranDownloaded, clearOfflineQuranData } from "@/lib/quran-offline"
import { Progress } from "@/components/ui/progress"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { addFavorite } from "@/lib/favorites"
import { canAccessFeature } from "@/lib/user-usage"
import { AdBanner } from "@/components/ad-banner"
import { setLastRead } from "@/lib/progress";
import { Badge } from "@/components/ui/badge";

export interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

interface Ayah {
  number: number
  audio: string
  audioSecondary: string[]
  text: string
  numberInSurah: number
  juz: number
  manzil: number
  page: number
  ruku: number
  hizbQuarter: number
  sajda: boolean
}

interface Edition {
  identifier: string
  language: string
  name: string
  englishName: string
  format: string
  type: string
  direction: string
}

interface SurahDetail extends Surah {
  ayahs: Ayah[]
  edition: Edition
}

interface SearchResultAyah {
    number: number;
    text: string;
    surah: Surah;
    numberInSurah: number;
}

interface SearchResults {
    count: number;
    matches: SearchResultAyah[];
}

type LanguageEdition = "en.sahih" | "de.aburida" | "am.sadiq"

const content = {
    de: {
        title: "Der Heilige Koran",
        description: "Durchsuche, lies und reflektiere über die Worte Allahs.",
        backToFeatures: "Zurück zu den Funktionen",
        translationLanguage: "Übersetzungssprache",
        english: "Englisch",
        german: "Deutsch",
        amharic: "Amharisch",
        searchVerse: "Suche nach Vers oder Wort",
        searchPlaceholder: "z.B. Thronvers, 2:255, Barmherzigkeit",
        searchResults: "Suchergebnisse",
        matches: "Treffer",
        noResults: "Keine Ergebnisse für deine Anfrage gefunden.",
        filterSurahs: "Filtere Suren",
        filterPlaceholder: "z.B. Al-Fatihah, 1",
        errorLoading: "Fehler beim Laden der Suren",
        errorSurahDetails: "Fehler beim Laden der Sure-Details",
        errorInvalidData: "Ungültige Daten von der API empfangen",
        errorAudio: "Fehler beim Generieren des Audios für den Vers.",
        searchError: "Suchanfrage fehlgeschlagen. Bitte versuche es erneut.",
        searchErrorTitle: "Suchfehler",
        offlineAccess: "Offline-Zugriff",
        downloadQuran: "Für Offline-Nutzung herunterladen",
        downloadingQuran: "Koran wird heruntergeladen...",
        downloadComplete: "Download abgeschlossen!",
        clearOfflineData: "Offline-Daten löschen",
        downloadingSurah: "Lade Sure",
        downloaded: "Heruntergeladen",
        offlineReady: "Koran ist offline verfügbar.",
        toastFavoriteSaved: "Favorit gespeichert!",
        toastErrorSaving: "Fehler beim Speichern.",
        loginToSave: "Anmelden zum Speichern",
        proFeature: "Pro-Funktion",
        proFeatureDescription: "Erhalte Offline-Zugriff und unterstütze die App mit einem Upgrade.",
        upgradeNow: "Jetzt upgraden",
    },
    en: {
        title: "The Holy Quran",
        description: "Browse, read, and reflect upon the words of Allah.",
        backToFeatures: "Back to Features",
        translationLanguage: "Translation Language",
        english: "English",
        german: "German",
        amharic: "Amharic",
        searchVerse: "Search Verse or Word",
        searchPlaceholder: "e.g. Throne Verse, 2:255, mercy",
        searchResults: "Search Results",
        matches: "matches",
        noResults: "No results found for your query.",
        filterSurahs: "Filter Surahs",
        filterPlaceholder: "e.g. Al-Fatihah, 1",
        errorLoading: "Error Loading Surahs",
        errorSurahDetails: "Failed to fetch surah details",
        errorInvalidData: "Invalid data received from API",
        errorAudio: "Failed to generate audio for the verse.",
        searchError: "Search request failed. Please try again.",
        searchErrorTitle: "Search Error",
        offlineAccess: "Offline Access",
        downloadQuran: "Download for Offline Use",
        downloadingQuran: "Downloading Quran...",
        downloadComplete: "Download Complete!",
        clearOfflineData: "Clear Offline Data",
        downloadingSurah: "Downloading Surah",
        downloaded: "Downloaded",
        offlineReady: "Quran is available offline.",
        toastFavoriteSaved: "Favorite saved!",
        toastErrorSaving: "Error saving favorite.",
        loginToSave: "Login to save",
        proFeature: "Pro Feature",
        proFeatureDescription: "Get offline access and support the app by upgrading.",
        upgradeNow: "Upgrade Now",
    }
}

const SurahDetailContent = ({ surah, languageEdition, c }: { surah: Surah, languageEdition: LanguageEdition, c: typeof content['de'] | typeof content['en'] }) => {
  const { toast } = useToast();
  const [user] = useAuthState(auth);

  const [detail, setDetail] = useState<{ arabic: SurahDetail, translation: SurahDetail, transliteration: SurahDetail } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hiddenAyahs, setHiddenAyahs] = useState<Record<number, boolean>>({});
  
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState<number | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAyahVisibility = (ayahNumber: number) => {
    setHiddenAyahs(prev => ({ ...prev, [ayahNumber]: !prev[ayahNumber] }));
  };

  const handlePlayAudio = async (ayahText: string, ayahNumber: number) => {
    if (playingAudio === `ayah-${ayahNumber}`) {
        audioRef.current?.pause();
        setPlayingAudio(null);
        return;
    }
    setLoadingAudio(ayahNumber);
    setAudioUrl(null);
    setPlayingAudio(null);

    try {
      const result = await textToSpeech(ayahText);
      setAudioUrl(result.audio);
      setPlayingAudio(`ayah-${ayahNumber}`);
    } catch (err) {
      console.error("Failed to get audio", err);
      setError(c.errorAudio);
    } finally {
      setLoadingAudio(null);
    }
  };

  const handleSaveFavorite = async (index: number) => {
    if (!user || !detail) return;

    setIsSaving(detail.arabic.ayahs[index].number);
    const textToSave = `Surah ${detail.arabic.name} (${detail.arabic.englishName}), Ayah ${detail.arabic.ayahs[index].numberInSurah}

${detail.arabic.ayahs[index].text}

${detail.translation.ayahs[index].text}`;

    try {
        await addFavorite(user.uid, textToSave);
        toast({ title: c.toastFavoriteSaved });
    } catch (error) {
        toast({ title: c.toastErrorSaving, variant: 'destructive' });
    } finally {
        setIsSaving(null);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [audioUrl]);


  useEffect(() => {
    async function fetchSurahDetail() {
      if (!surah) return
      setLoading(true)
      setError(null)
      setHiddenAyahs({})
      
      const editions = ['quran-uthmani', languageEdition, 'en.transliteration'];
      
      const offlineDataPromises = editions.map(edition => getSurahEdition(surah.number, edition));
      const offlineData = await Promise.all(offlineDataPromises);


      if (offlineData.every(d => d)) {
        const [arabicData, translationData, transliterationData] = offlineData;
        const reconstructedDetail = {
            arabic: {
                ...surah,
                ayahs: arabicData!.text.split('\n').map((text, index) => ({
                    number: parseInt(`${surah.number}${String(index + 1).padStart(3, '0')}`), // Reconstruct ayah number
                    text: text,
                    audio: '', 
                    audioSecondary: [],
                    numberInSurah: index + 1,
                    juz: 0, 
                    manzil: 0,
                    page: 0,
                    ruku: 0,
                    hizbQuarter: 0,
                    sajda: false,
                })),
                edition: { identifier: 'quran-uthmani', language: 'ar', name: 'Quran Uthmani', englishName: 'Quran Uthmani', format: 'text', type: 'quran', direction: 'rtl' },
            } as SurahDetail,
            translation: {
                ...surah,
                 ayahs: translationData!.text.split('\n').map((text, index) => ({
                    number: parseInt(`${surah.number}${String(index + 1).padStart(3, '0')}`),
                    text: text,
                    audio: '', 
                    audioSecondary: [],
                    numberInSurah: index + 1,
                    juz: 0, 
                    manzil: 0,
                    page: 0,
                    ruku: 0,
                    hizbQuarter: 0,
                    sajda: false,
                })),
                edition: { identifier: languageEdition, language: languageEdition.split('.')[0], name: '', englishName: '', format: 'text', type: 'translation', direction: 'ltr' },
            } as SurahDetail,
            transliteration: {
                ...surah,
                 ayahs: transliterationData!.text.split('\n').map((text, index) => ({
                    number: parseInt(`${surah.number}${String(index + 1).padStart(3, '0')}`),
                    text: text,
                    audio: '',
                    audioSecondary: [],
                    numberInSurah: index + 1,
                    juz: 0,
                    manzil: 0,
                    page: 0,
                    ruku: 0,
                    hizbQuarter: 0,
                    sajda: false,
                })),
                edition: { identifier: 'en.transliteration', language: 'en', name: '', englishName: '', format: 'text', type: 'transliteration', direction: 'ltr' },
            } as SurahDetail,
        };
        setDetail(reconstructedDetail);
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/editions/quran-uthmani,${languageEdition},en.transliteration`)
        if (!response.ok) {
          throw new Error(c.errorSurahDetails);
        }
        const data = await response.json()
        if (data.code !== 200 || !data.data || data.data.length < 3) {
            throw new Error(c.errorInvalidData);
        }

        setDetail({
            arabic: data.data[0],
            translation: data.data[1],
            transliteration: data.data[2]
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchSurahDetail()
  }, [surah, languageEdition, c.errorSurahDetails, c.errorInvalidData, c.errorAudio])
  
   useEffect(() => {
    if (detail) {
      setLastRead('quran', { surah: detail.arabic.number, surahName: detail.arabic.englishName });
    }
  }, [detail]);


  if (loading) {
    return (
      <div className="divide-y divide-border">
          {[...Array(3)].map((_, i) => (
              <div key={i} className="px-6 py-4 space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
              </div>
          ))}
      </div>
    )
  }

  if (error) {
    return (
        <div className="px-6 py-4">
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    )
  }
  
  if (!detail) return null

  return (
    <div className="divide-y divide-border">
       {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setPlayingAudio(null)}
        />
      )}
      {detail.arabic.ayahs.map((_, index) => {
        const ayahNumber = detail.arabic.ayahs[index].number;
        const isHidden = hiddenAyahs[ayahNumber];
        const arabicText = detail.arabic.ayahs[index].text;

        const isPlaying = playingAudio === `ayah-${ayahNumber}`;
        const isLoadingAudio = loadingAudio === ayahNumber;
        const isSavingFavorite = isSaving === ayahNumber;

        return (
            <div key={ayahNumber} className="px-6 py-4 space-y-3 relative">
                <div className="flex justify-between items-start">
                    <p className={cn("text-2xl font-quranic text-right tracking-wide leading-relaxed flex-1", isHidden ? "opacity-0" : "opacity-100")}>{arabicText}</p>
                    <div className="flex items-center ml-4">
                        <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(arabicText, ayahNumber)} disabled={isLoadingAudio}>
                            {isLoadingAudio ? <Loader className="h-5 w-5 animate-spin" /> : (isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />)}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => toggleAyahVisibility(ayahNumber)}>
                            {isHidden ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                         <Button variant="ghost" size="icon" onClick={() => handleSaveFavorite(index)} disabled={isSavingFavorite || !user}>
                            {isSavingFavorite ? <Loader className="h-5 w-5 animate-spin" /> : <Star className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
                <div className={cn("transition-opacity duration-300", isHidden ? "opacity-0 h-0 overflow-hidden" : "opacity-100")}>
                    <p className="text-muted-foreground italic mt-2">{detail.transliteration.ayahs[index].text}</p>
                    <p className="text-foreground/90 mt-1">{detail.translation.ayahs[index].text}</p>
                </div>
            </div>
        )
      })}
    </div>
  )
}

export default function QuranPage() {
    const { language } = useLanguage();
    const c = content[language];
    const [user, loadingAuth] = useAuthState(auth);
    const [hasAccess, setHasAccess] = useState(false);
    const [loadingAccess, setLoadingAccess] = useState(true);

    const [surahs, setSurahs] = useState<Surah[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState("")
    const [languageEdition, setLanguageEdition] = useState<LanguageEdition>(language === 'de' ? "de.aburida" : "en.sahih")
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    
    // Offline state
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    const checkDownloadStatus = useCallback(async () => {
        if (await isQuranDownloaded()) {
            setIsDownloaded(true);
        }
    }, []);

    useEffect(() => {
        checkDownloadStatus();
        if (!loadingAuth && user) {
            canAccessFeature(user.uid, 'quran').then(setHasAccess);
        }
         setLoadingAccess(false);
    }, [checkDownloadStatus, user, loadingAuth]);
    
    useEffect(() => {
        if(language === 'de') setLanguageEdition('de.aburida');
        if(language === 'en') setLanguageEdition('en.sahih');
        // 'am' is not a language option, so we just set for de/en
    }, [language])


    useEffect(() => {
        async function fetchSurahList() {
            setLoading(true)
            
            const offlineSurahs = await getSurahList();
            if (offlineSurahs) {
                setSurahs(offlineSurahs);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("https://api.alquran.cloud/v1/surah")
                if (!response.ok) {
                    throw new Error(c.errorLoading);
                }
                const data = await response.json()
                setSurahs(data.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            } finally {
                setLoading(false)
            }
        }
        fetchSurahList()
    }, [c.errorLoading])
    
    const handleDownloadQuran = async () => {
        setIsDownloading(true);
        setDownloadProgress(0);

        try {
            const listRes = await fetch("https://api.alquran.cloud/v1/surah");
            const listData = await listRes.json();
            await storeSurahList(listData.data);
            
            const totalSurahs = 114;
            const editions = ['quran-uthmani', 'en.sahih', 'de.aburida', 'en.transliteration'];

            for (let i = 1; i <= totalSurahs; i++) {
                const surahRes = await fetch(`https://api.alquran.cloud/v1/surah/${i}/editions/${editions.join(',')}`);
                const surahData = await surahRes.json();

                if (surahData.code === 200 && surahData.data) {
                    for(let j=0; j < surahData.data.length; j++) {
                        const editionData = { text: surahData.data[j].ayahs.map((a: Ayah) => a.text).join('\n') };
                        await storeSurahEdition(i, editions[j], editionData);
                    }
                }
                setDownloadProgress((i / totalSurahs) * 100);
            }
            toast({ title: c.downloadComplete });
            setIsDownloaded(true);
        } catch (error) {
            toast({ title: "Download Failed", description: "Could not download Quran data.", variant: "destructive"});
            console.error(error);
        } finally {
            setIsDownloading(false);
        }
    }
    
    const handleClearOfflineData = async () => {
        await clearOfflineQuranData();
        setIsDownloaded(false);
        toast({ title: "Offline Data Cleared" });
    }

    const filteredSurahs = useMemo(() => {
        return surahs.filter(surah =>
            surah.name.toLowerCase().includes(filter.toLowerCase()) ||
            surah.englishName.toLowerCase().includes(filter.toLowerCase()) ||
            surah.number.toString().includes(filter)
        )
    }, [surahs, filter])

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setSearchLoading(true);
        setSearchError(null);
        setSearchResults(null);
        
        try {
            const response = await fetch(`https://api.alquran.cloud/v1/search/${searchQuery}/${languageEdition}`);
            if (!response.ok) {
                throw new Error(c.searchError);
            }
            const data = await response.json();
             if (data.code !== 200 || !data.data) {
                throw new Error(c.searchError);
            }
            setSearchResults(data.data);

        } catch (error) {
             if (error instanceof Error) {
                setSearchError(error.message);
            }
        } finally {
            setSearchLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                <Card>
                    <CardHeader>
                        <CardTitle>{c.searchVerse}</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <form onSubmit={handleSearch} className="flex gap-2">
                             <Input 
                                placeholder={c.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button type="submit" disabled={searchLoading}>
                                {searchLoading ? <Loader className="animate-spin" /> : <Search />}
                            </Button>
                         </form>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {c.offlineAccess}
                             { loadingAccess ? <Skeleton className="h-6 w-16" /> : hasAccess ? (
                                isDownloaded ? <Badge variant="secondary">{c.downloaded}</Badge> : ""
                             ) : (
                                <Badge variant="destructive">{c.proFeature}</Badge>
                             )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                        {loadingAccess ? <Skeleton className="h-10 w-full" /> : hasAccess ? (
                            isDownloaded ? (
                                <Button variant="outline" onClick={handleClearOfflineData} className="w-full">{c.clearOfflineData}</Button>
                            ) : (
                                <Button onClick={handleDownloadQuran} className="w-full" disabled={isDownloading}>
                                    {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4"/>}
                                    {isDownloading ? `${c.downloadingQuran} (${Math.round(downloadProgress)}%)` : c.downloadQuran}
                                </Button>
                            )
                        ) : (
                            <div className="w-full space-y-2">
                                <p className="text-sm text-muted-foreground">{c.proFeatureDescription}</p>
                                <Button asChild className="w-full">
                                    <Link href="/subscribe">
                                        <Sparkles className="mr-2 h-4 w-4"/>
                                        {c.upgradeNow}
                                    </Link>
                                </Button>
                            </div>
                        )}
                       
                    </CardContent>
                </Card>
            </div>
            
             <div className="max-w-5xl mx-auto my-8">
                <AdBanner slotId="quran-page-bottom" />
            </div>

            {searchError && (
                 <div className="max-w-3xl mx-auto mb-8">
                     <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>{c.searchErrorTitle}</AlertTitle>
                        <AlertDescription>{searchError}</AlertDescription>
                    </Alert>
                 </div>
            )}
            {searchResults && (
                <div className="max-w-3xl mx-auto mb-8">
                    <h2 className="text-2xl font-bold mb-4">{searchResults.count} {searchResults.count === 1 ? 'Match' : c.matches}</h2>
                    <Card>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border">
                                {searchResults.matches.map((ayah) => (
                                    <div key={ayah.number} className="p-4">
                                        <p className="font-semibold">{ayah.surah.englishName} ({ayah.surah.number}:{ayah.numberInSurah})</p>
                                        <p className="text-muted-foreground">{ayah.text}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="max-w-3xl mx-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <Label htmlFor="language-select">{c.translationLanguage}</Label>
                        <Select
                            value={languageEdition}
                            onValueChange={(value) => setLanguageEdition(value as LanguageEdition)}
                        >
                            <SelectTrigger id="language-select">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en.sahih">{c.english}</SelectItem>
                                <SelectItem value="de.aburida">{c.german}</SelectItem>
                                <SelectItem value="am.sadiq">{c.amharic}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                         <Label htmlFor="surah-filter">{c.filterSurahs}</Label>
                        <Input
                            id="surah-filter"
                            placeholder={c.filterPlaceholder}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                    </div>
                ) : error ? (
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {filteredSurahs.map(surah => (
                            <AccordionItem value={surah.number.toString()} key={surah.number}>
                                <AccordionTrigger className="text-lg hover:no-underline">
                                    <div className="flex items-center text-left">
                                        <span className="text-primary font-bold w-12 flex-shrink-0 text-right pr-4">{surah.number}.</span> 
                                        <div className="flex-1">
                                            <span>{surah.englishName}</span>
                                            <span className="text-sm text-muted-foreground font-normal block">{surah.englishNameTranslation}</span>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-quranic ml-4">{surah.name}</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <SurahDetailContent surah={surah} languageEdition={languageEdition} c={c}/>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    )
}
