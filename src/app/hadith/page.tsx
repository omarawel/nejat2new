
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
import { setLastRead } from "@/lib/progress"



type Language = "eng" | "urd" | "ara";



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

const HadithContent = ({ hadith }: { hadith: Hadith }) => {
    const { language } = useLanguage();
    const [user] = useAuthState(auth);
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);
    
    const handleSaveFavorite = async () => {
        if (!user) return;
        setIsSaving(true);
        const textToSave = `Hadith ${hadith.hadithNumber} (${hadith.book.bookName})

${hadith.hadithEnglish}`;
        try {
            await addFavorite(user.uid, textToSave);
            toast({ title: content[language].toastFavoriteSaved });
        } catch (error) {
            toast({ title: content[language].toastErrorSaving, variant: 'destructive' });
        } finally {
            setIsSaving(false);
        }
    }
    
    useEffect(() => {
        setLastRead('hadith', { collection: hadith.book.bookName, hadithNumber: hadith.hadithNumber });
    }, [hadith]);

    return (
        <div className="space-y-4 text-base">
            <p className="font-quranic text-xl text-right leading-relaxed">{hadith.hadithArabic}</p>
            <p className="italic text-muted-foreground">{hadith.englishNarrator}</p>
            <p className="text-foreground/90">{hadith.hadithEnglish}</p>
            <div className="flex justify-end pt-2 border-t">
                <Button variant="ghost" size="sm" onClick={handleSaveFavorite} disabled={!user || isSaving}>
                    {isSaving ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : <Star className="mr-2 h-4 w-4"/>}
                    {content[language].toastFavoriteSaved}
                </Button>
            </div>
        </div>
    )
}

export default function HadithPage() {
    const { language } = useLanguage();
    const c = content[language];
    const [hadithsData, setHadithsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');

    const fetchAndSetHadiths = async (pageNum: number, searchQuery: string) => {
        setLoading(true);
        setError(null);
        const result = await getHadiths(pageNum, searchQuery);
        if (result.error) {
            setError(result.error);
        } else {
            setHadithsData(result.hadiths);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchAndSetHadiths(page, query);
    }, [page, query]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset to first page on new search
        fetchAndSetHadiths(1, query);
    }
    
    const totalPages = hadithsData?.last_page ?? 1;

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

             <div className="max-w-xl mx-auto mb-8">
                 <form onSubmit={handleSearch} className="flex gap-2">
                    <Input 
                        placeholder={c.searchPlaceholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        <Search className="h-4 w-4"/>
                    </Button>
                 </form>
             </div>
             
             <div className="max-w-4xl mx-auto my-8">
                <AdBanner slotId="hadith-page-bottom" />
            </div>

            {loading ? (
                 <div className="space-y-4 max-w-3xl mx-auto">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
                 </div>
            ) : error ? (
                <Alert variant="destructive" className="max-w-3xl mx-auto">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{c.errorLoading}</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : hadithsData && hadithsData.data.length > 0 ? (
                 <div className="max-w-3xl mx-auto">
                     <Accordion type="single" collapsible className="w-full">
                         {hadithsData.data.map((hadith: Hadith) => (
                            <AccordionItem value={hadith.id.toString()} key={hadith.id}>
                                <AccordionTrigger className="text-left hover:no-underline">
                                    <span className="font-semibold mr-4">{hadith.book.bookName} {hadith.hadithNumber}</span>
                                    <span className="text-sm text-muted-foreground truncate">{hadith.chapter.chapterEnglish}</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-4">
                                   <HadithContent hadith={hadith} />
                                </AccordionContent>
                            </AccordionItem>
                         ))}
                     </Accordion>
                     <div className="flex items-center justify-between mt-8">
                        <Button variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                           <ChevronLeft /> Previous
                        </Button>
                         <span className="text-sm text-muted-foreground">Page {hadithsData.current_page} of {totalPages}</span>
                        <Button variant="outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                           Next <ChevronRight />
                        </Button>
                     </div>
                 </div>
            ) : (
                <p className="text-center text-muted-foreground">{c.noHadithsFound}</p>
            )}
        </div>
    );
}
