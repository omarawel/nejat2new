
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
import { setLastRead } from "@/lib/progress";


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
        errorAudio: "Failed to generate audio for the verse.",
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

const SurahDetailContent = ({ surahNumber, languageEdition, c }: { surahNumber: number, languageEdition: LanguageEdition, c: typeof content['de'] | typeof content['en'] }) => {
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
      if (!surahNumber) return
      setLoading(true)
      setError(null)
      setHiddenAyahs({})
      
      const editions = ['quran-uthmani', languageEdition, 'en.transliteration'];
      const offlineData = await getSurahWithEditions(surahNumber, editions);

      if (offlineData) {
        setDetail({
            arabic: offlineData[0] as SurahDetail,
            translation: offlineData[1] as SurahDetail,
            transliteration: offlineData[2] as SurahDetail
        });
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${languageEdition},en.transliteration`)
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
  }, [surahNumber, languageEdition, c.errorSurahDetails, c.errorInvalidData, c.errorAudio])
  
   useEffect(() => {
    if (detail) {
      setLastRead('quran', { surah: detail.number, surahName: detail.englishName });
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
