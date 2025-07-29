
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
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Terminal, ChevronLeft, ChevronRight, Search, Eye, EyeOff, Play, Pause, Loader, ArrowLeft, Star } from "lucide-react"
import { useEffect, useState, useMemo, FormEvent, useRef } from "react"
import { Hadith, getHadiths } from "./actions";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { textToSpeech } from "@/ai/flows/text-to-speech"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { addFavorite } from "@/lib/favorites"
import { AdBanner } from "@/components/ad-banner"


type Language = "eng" | "urd" | "ara";
type Hadith = Awaited<ReturnType<typeof getHadiths>> extends { hadiths: { data: (infer T)[] } } ? T : never;


const content = {
    de: {
        title: "Hadith-Sammlung",
        description: "Anleitung aus dem Leben und den Aussprüchen des Propheten Muhammad (ﷺ).",
        translationLanguage: "Übersetzungssprache",
        searchCollection: "Sammlung durchsuchen",
        searchPlaceholder: "z.B. bukhari, muslim...",
        searchResults: "Suchergebnisse",
        match: "Treffer",
        matches: "Treffer",
        noResults: "Keine Ergebnisse für Ihre Anfrage gefunden:",
        chapter: "Kapitel",
        showing: "Zeige",
        to: "bis",
        of: "von",
        hadiths: "Hadithe",
        goToPage: "Gehe zu",
        errorLoading: "Fehler beim Laden der Hadithe",
        searchErrorTitle: "Suchfehler",
        noHadithsFound: "Keine Hadithe gefunden.",
        german: "Deutsch",
        comingSoon: "(bald verfügbar)",
        backToFeatures: "Zurück zu den Funktionen",
        toastFavoriteSaved: "Favorit gespeichert!",
        toastErrorSaving: "Fehler beim Speichern.",
        loginToSave: "Anmelden zum Speichern",
    },
    en: {
        title: "Collection of Hadith",
        description: "Guidance from the life and sayings of the Prophet Muhammad (ﷺ).",
        translationLanguage: "Translation Language",
        searchCollection: "Search collection",
        searchPlaceholder: "e.g. bukhari, muslim...",
        searchResults: "Search Results",
        match: "match",
        matches: "matches",
        noResults: "No results found for your query:",
        chapter: "Chapter",
        showing: "Showing",
        to: "to",
        of: "of",
        hadiths: "hadiths",
        goToPage: "Go",
        errorLoading: "Error Loading Hadiths",
        searchErrorTitle: "Search Error",
        noHadithsFound: "No hadiths found.",
        german: "German",
        comingSoon: "(coming soon)",
        backToFeatures: "Back to Features",
        toastFavoriteSaved: "Favorite saved!",
        toastErrorSaving: "Error saving favorite.",
        loginToSave: "Login to save",
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
    const textToSave = `Surah ${detail.arabic.name} (${detail.arabic.englishName}), Ayah ${detail.arabic.ayahs[index].numberInSurah}\n\n${detail.arabic.ayahs[index].text}\n\n${detail.translation.ayahs[index].text}`;

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
            arabic: offlineData[0],
            translation: offlineData[1],
            transliteration: offlineData[2]
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
