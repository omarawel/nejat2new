
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
import { getSurahList, storeSurahList, getSurahWithEditions, storeSurahEdition, isQuranDownloaded, clearOfflineQuranData } from "@/lib/quran-offline"
import { Progress } from "@/components/ui/progress"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { addFavorite } from "@/lib/favorites"
import { canAccessFeature } from "@/lib/user-usage"
import { AdBanner } from "@/components/ad-banner"


interface Surah {
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

const HadithContent = ({ hadith, language }: { hadith: Hadith, language: Language }) => {
  const { language: currentLanguage } = useLanguage();
  const c = content[currentLanguage] || content.de;
  const { toast } = useToast();
  const [user] = useAuthState(auth);
  
  const [isHidden, setIsHidden] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const getText = () => {
    switch(language) {
      case "urd":
        return hadith.hadithUrdu
      case "ara":
        return hadith.hadithArabic
      case "eng":
      default:
        return hadith.hadithEnglish
    }
  }
  
  const getLanguageDirection = () => {
    switch(language) {
        case "urd":
        case "ara":
            return "rtl";
        default:
            return "ltr";
    }
  }

  const handlePlayAudio = async (hadithText: string, hadithId: number) => {
    if (playingAudio === `hadith-${hadithId}`) {
        audioRef.current?.pause();
        setPlayingAudio(null);
        return;
    }
    setLoadingAudio(hadithId);
    setAudioUrl(null);
    setPlayingAudio(null);

    try {
      const result = await textToSpeech(hadithText);
      setAudioUrl(result.audio);
      setPlayingAudio(`hadith-${hadithId}`);
    } catch (err) {
      console.error("Failed to get audio", err);
    } finally {
      setLoadingAudio(null);
    }
  };

  const handleSaveFavorite = async () => {
      if (!user) {
          toast({
              title: c.loginToSave,
              variant: 'destructive',
              description: <Button variant="secondary" size="sm" asChild className="mt-2"><Link href="/login">Login</Link></Button>,
          });
          return;
      }
      setIsSaving(true);
      const textToSave = `Hadith ${hadith.hadithNumber} (${hadith.book.bookName})\n\n${getText()}`;
      try {
          await addFavorite(user.uid, textToSave);
          toast({ title: c.toastFavoriteSaved });
      } catch (error) {
          toast({ title: c.toastErrorSaving, variant: 'destructive' });
      } finally {
          setIsSaving(false);
      }
  }

  useEffect(() => {
    if (audioUrl && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [audioUrl]);

  const hadithText = getText();
  const isPlaying = playingAudio === `hadith-${hadith.id}`;
  const isLoading = loadingAudio === hadith.id;

  return (
    <div className="px-6 py-4 space-y-3 relative">
       {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setPlayingAudio(null)}
        />
      )}
        <div className="flex justify-between items-start">
            <p className={cn("text-foreground/90 flex-1", getLanguageDirection() === 'rtl' ? "text-right" : "", isHidden ? "opacity-0" : "opacity-100")}>{hadithText}</p>
            <div className="flex items-center ml-4">
                <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(hadithText, hadith.id)} disabled={isLoading}>
                    {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : (isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />)}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsHidden(!isHidden)}>
                    {isHidden ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
                 <Button variant="ghost" size="icon" onClick={handleSaveFavorite} disabled={isSaving}>
                    {isSaving ? <Loader className="h-5 w-5 animate-spin" /> : <Star className="h-5 w-5" />}
                </Button>
            </div>
        </div>
    </div>
  )
}


export default function QuranPage() {
  const { language: currentLanguage } = useLanguage();
  const c = content[currentLanguage] || content.de;

  const [hadiths, setHadiths] = useState<Hadith[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paginationInfo, setPaginationInfo] = useState<{currentPage: number, lastPage: number, from: number, to: number, total: number} | null>(null)
  const [openHadith, setOpenHadith] = useState<string | undefined>(undefined);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Hadith[] | null>(null);

  const [language, setLanguage] = useState<Language>("eng");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  useEffect(() => {
    async function fetchHadiths() {
      if (submittedSearchTerm) return; // Don't fetch list if a search is active

      setLoading(true)
      setError(null)
      try {
        const data = await getHadiths(page);
        if (data.error) {
            throw new Error(data.error);
        }
        if (!data.hadiths) {
            throw new Error("No hadiths data received.");
        }
        
        const hadithsData = data.hadiths.data;
        setHadiths(hadithsData)
        
        const total = data.hadiths.total;
        const perPage = hadithsData.length > 0 ? (data.hadiths.to - data.hadiths.from + 1) : 25;
        const lastPage = Math.ceil(total / perPage);
        const from = data.hadiths.from;
        const to = data.hadiths.to;

        setPaginationInfo({
            currentPage: page,
            lastPage,
            from,
            to,
            total,
        })

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchHadiths()
  }, [page, submittedSearchTerm])

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults(null);
      setSubmittedSearchTerm("");
      setSearchError(null);
      return;
    }

    setPage(1);
    setSubmittedSearchTerm(searchTerm);
    setIsSearching(true);
    setSearchError(null);
    setSearchResults(null);
    
    try {
        const data = await getHadiths(1, searchTerm);
        if (data.error) {
            throw new Error(data.error);
        }
        if (!data.hadiths) {
            throw new Error("No search results received.");
        }
        setSearchResults(data.hadiths.data);
    } catch (err) {
        setSearchError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
        setIsSearching(false);
    }
  };

  const handleNextPage = () => {
    if (paginationInfo && paginationInfo.currentPage < paginationInfo.lastPage) {
      setPage(p => p + 1);
    }
  }

  const handlePrevPage = () => {
    if (paginationInfo && paginationInfo.currentPage > 1) {
      setPage(p => p - 1);
    }
  }

  const handleGoToPage = (e: FormEvent) => {
      e.preventDefault();
      const pageNum = parseInt(pageInput, 10);
      if (paginationInfo && !isNaN(pageNum) && pageNum >= 1 && pageNum <= paginationInfo.lastPage) {
          setPage(pageNum);
      } else {
         setPageInput(page.toString()); // Reset input to current page if invalid
      }
  }
  
  const displayHadiths = hadiths;
  const chapterText = c.chapter;

  return (
    <div className="space-y-8 flex-grow flex flex-col p-4 sm:p-6 lg:p-8">
      <Button asChild variant="ghost" className="self-start">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {c.backToFeatures}
        </Link>
      </Button>
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2">{c.description}</p>
      </header>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="language">{c.translationLanguage}</Label>
                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                    <SelectTrigger id="language" className="mt-1">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="eng">English</SelectItem>
                        <SelectItem value="urd">Urdu</SelectItem>
                        <SelectItem value="ara">Arabic</SelectItem>
                        <SelectItem value="de" disabled>{c.german} {c.comingSoon}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div>
                <Label htmlFor="search-hadith">{c.searchCollection}</Label>
                <form onSubmit={handleSearch} className="flex items-center gap-2 mt-1">
                    <Input
                        id="search-hadith"
                        placeholder={c.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" variant="outline" size="icon" disabled={isSearching}><Search className="h-4 w-4"/></Button>
                </form>
            </div>
      </div>
      
       <div className="my-8">
            <AdBanner slotId="hadith-page-bottom" />
        </div>

      {error && (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{c.errorLoading}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSearching && (
          <div className="flex items-center justify-center py-4">
              <Skeleton className="h-8 w-1/2" />
          </div>
      )}
      
      {searchError && (
          <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>{c.searchErrorTitle}</AlertTitle>
              <AlertDescription>{searchError}</AlertDescription>
          </Alert>
      )}
      
      {searchResults && (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{c.searchResults} ({searchResults.length} {searchResults.length === 1 ? c.match : c.matches})</h2>
                {searchResults.length > 0 ? (
                    <div className="space-y-4">
                        {searchResults.map(hadith => (
                             <Accordion type="single" collapsible className="w-full" key={hadith.id}>
                                <AccordionItem value={`search-item-${hadith.id}`}>
                                    <AccordionTrigger className="text-lg hover:no-underline">
                                        <div className="flex items-center gap-4 text-left">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shrink-0">{hadith.hadithNumber}</span>
                                            <div>
                                                <p className="font-semibold">{hadith.book.bookName}</p>
                                                <p className="text-sm text-muted-foreground">{chapterText}: {hadith.chapter.chapterEnglish}</p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <HadithContent hadith={hadith} language={language} />
                                    </AccordionContent>
                                </AccordionItem>
                             </Accordion>
                        ))}
                    </div>
                ) : (
                    <p>{c.noResults} "{submittedSearchTerm}"</p>
                )}
            </CardContent>
        </Card>
      )}


      {!submittedSearchTerm && !searchResults && (
        loading ? (
          <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                   <Skeleton key={i} className="h-12 w-full" />
              ))}
          </div>
        ) : displayHadiths.length === 0 ? (
          <Card>
              <CardContent className="p-6 text-center">
                  <p>{c.noHadithsFound}</p>
              </CardContent>
          </Card>
        ) : (
          <>
              <Card className="flex-grow overflow-hidden">
                  <CardContent className="p-0 h-full overflow-y-auto">
                      <Accordion type="single" collapsible className="w-full" value={openHadith} onValueChange={setOpenHadith}>
                          {displayHadiths.map((hadith) => (
                          <AccordionItem value={`item-${hadith.id}`} key={hadith.id}>
                              <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
                                  <div className="flex items-center gap-4 text-left">
                                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shrink-0">{hadith.hadithNumber}</span>
                                      <div>
                                          <p className="font-semibold">{hadith.book.bookName}</p>
                                          <p className="text-sm text-muted-foreground">{chapterText}: {hadith.chapter.chapterEnglish}</p>
                                      </div>
                                  </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                  {openHadith === `item-${hadith.id}` && (
                                      <HadithContent hadith={hadith} language={language} />
                                  )}
                              </AccordionContent>
                          </AccordionItem>
                          ))}
                      </Accordion>
                  </CardContent>
              </Card>

              {paginationInfo && paginationInfo.total > 0 && (
                  <div className="flex items-center justify-between pt-4">
                      <p className="text-sm text-muted-foreground">
                          {c.showing} {paginationInfo.from} {c.to} {paginationInfo.to} {c.of} {paginationInfo.total} {c.hadiths}
                      </p>
                      <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={paginationInfo.currentPage <= 1 || loading}>
                              <ChevronLeft />
                          </Button>
                          <form onSubmit={handleGoToPage} className="flex items-center gap-1">
                             <Input 
                               type="number"
                               value={pageInput}
                               onChange={e => setPageInput(e.target.value)}
                               className="w-16 h-9 text-center"
                               min="1"
                               max={paginationInfo.lastPage}
                             />
                             <span className="text-muted-foreground text-sm">/ {paginationInfo.lastPage}</span>
                             <Button type="submit" variant="outline" size="sm" className="h-9">{c.goToPage}</Button>
                          </form>
                          <Button variant="outline" size="icon" onClick={handleNextPage} disabled={paginationInfo.currentPage >= paginationInfo.lastPage || loading}>
                              <ChevronRight />
                          </Button>
                      </div>
                  </div>
              )}
          </>
        )
      )}
    </div>
  );
}
