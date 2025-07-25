
"use client"

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, BookOpen, Loader2, ArrowLeft, Share2, Heart, List } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { addFavorite } from '@/lib/favorites';
import Image from 'next/image';

interface Quote {
  text_de: string;
  text_en: string;
  author_de: string;
  author_en: string;
  arabic: string;
  reference: string;
}

const quotes: Quote[] = [
    { 
        text_de: "Wahrlich, die Taten sind entsprechend den Absichten, und wahrlich, jeder Mensch bekommt nur das, was er beabsichtigt hat.", 
        text_en: "Verily, actions are by intentions, and for every person is what he intended.", 
        author_de: "Prophet Muhammad (ﷺ)", 
        author_en: "Prophet Muhammad (ﷺ)", 
        arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", 
        reference: "Sahih al-Bukhari 1" 
    },
    { 
        text_de: "Der Starke ist nicht der, der im Ringen siegt, sondern der, der sich im Zorn beherrschen kann.",
        text_en: "The strong man is not the one who is good at wrestling, but the strong man is the one who controls himself when he is angry.",
        author_de: "Prophet Muhammad (ﷺ)", 
        author_en: "Prophet Muhammad (ﷺ)", 
        arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ", 
        reference: "Sahih al-Bukhari 6114"
    },
    { 
        text_de: "Sprecht Gutes oder schweigt.",
        text_en: "Speak good or remain silent.",
        author_de: "Prophet Muhammad (ﷺ)", 
        author_en: "Prophet Muhammad (ﷺ)", 
        arabic: "فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ", 
        reference: "Sahih al-Bukhari 6018"
    }
];


const content = {
    de: {
        title: "Hadith des Tages",
        backToFeatures: "Zurück zu den Funktionen",
        newHadith: "Neuer Hadith",
        narrated: "Überliefert von",
        shareError: "Teilen wird von deinem Browser nicht unterstützt.",
        hadithCopied: "Hadith in die Zwischenablage kopiert.",
        favoriteSaved: "Als Favorit gespeichert!",
        loginToSave: "Anmelden, um Favoriten zu speichern.",
        errorSaving: "Fehler beim Speichern des Favoriten."
    },
    en: {
        title: "Hadith of the Day",
        backToFeatures: "Back to Features",
        newHadith: "New Hadith",
        narrated: "Narrated by",
        shareError: "Sharing is not supported by your browser.",
        hadithCopied: "Hadith copied to clipboard.",
        favoriteSaved: "Saved to favorites!",
        loginToSave: "Login to save favorites.",
        errorSaving: "Error saving favorite."
    }
}

export default function HadithOfTheDayPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const { toast } = useToast();
    const [user, authLoading] = useAuthState(auth);

    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const getNewQuote = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            let newQuote = quotes[randomIndex];
            if (quote && newQuote.arabic === quote.arabic) {
                 newQuote = quotes[(randomIndex + 1) % quotes.length];
            }
            setQuote(newQuote);
            setLoading(false);
        }, 300);
    }, [quote]);

    useEffect(() => {
        getNewQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleShare = async () => {
        if (!quote) return;
        const shareText = `"${language === 'de' ? quote.text_de : quote.text_en}" - ${quote.author_en} (${quote.reference})`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: c.title,
                    text: shareText,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(shareText);
            toast({
                description: c.hadithCopied,
            });
        }
    };
    
    const handleSaveFavorite = async () => {
        if (!quote) return;
        if (!user) {
            toast({
                variant: 'destructive',
                title: c.loginToSave,
                description: <Button variant="secondary" size="sm" asChild className="mt-2"><Link href="/login">Login</Link></Button>
            });
            return;
        }

        setIsSaving(true);
        const textToSave = `"${language === 'de' ? quote.text_de : quote.text_en}" - ${quote.author_en} (${quote.reference})`;
        try {
            await addFavorite(user.uid, textToSave);
            toast({ title: c.favoriteSaved });
        } catch (error) {
            console.error("Error saving favorite: ", error);
            toast({ variant: 'destructive', title: c.errorSaving });
        } finally {
            setIsSaving(false);
        }
    }


    return (
        <div className="flex-grow w-full flex flex-col bg-background">
             <div className="flex-grow w-full bg-accent/30 rounded-b-[3rem] p-4 relative">
                 <div className="container mx-auto">
                    <Button asChild variant="ghost" className="absolute top-4 left-4">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {c.backToFeatures}
                        </Link>
                    </Button>
                 </div>
                 <div className="flex items-center justify-center h-full">
                      <Image 
                        src="https://www.dropbox.com/scl/fi/y4jqa7s9aamexfbvb1tf7/DALL-E-2025-07-16-11.45.19-A-beautiful-and-elegant-calligraphy-of-the-name-of-Prophet-Muhammad-peace-be-upon-him-in-Arabic-s-l-All-h-lyh-wslm-The-calligraphy-is-in-a-c.png?rlkey=v1u1r5z22a0q5u43u1p5b3mhc&dl=1"
                        alt="Calligraphy of Prophet Muhammad's name"
                        width={300}
                        height={200}
                        className="object-contain"
                        data-ai-hint="calligraphy prophet"
                    />
                 </div>
             </div>
             <div className="container mx-auto px-4 -mt-24 sm:-mt-32 z-10">
                <Card className="w-full max-w-2xl mx-auto text-center shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="min-h-[200px] flex items-center justify-center p-6">
                        {loading ? (
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        ) : quote ? (
                            <div className="space-y-4">
                                <p className="text-2xl md:text-3xl font-quranic text-right tracking-wide leading-relaxed">{quote.arabic}</p>
                                <p className="text-base md:text-lg leading-relaxed text-foreground/90">"{language === 'de' ? quote.text_de : quote.text_en}"</p>
                                <p className="text-sm text-muted-foreground">{c.narrated} {language === 'de' ? quote.author_de : quote.author_en} [{quote.reference}]</p>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
                 <div className="w-full max-w-2xl mx-auto mt-4 grid grid-cols-4 gap-2">
                    <Button variant="outline" className="col-span-2" onClick={getNewQuote} disabled={loading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        {c.newHadith}
                    </Button>
                    <Button variant="outline" aria-label="Share" onClick={handleShare}>
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" aria-label="Favorite" onClick={handleSaveFavorite} disabled={isSaving}>
                       {isSaving ? <Loader2 className="h-5 w-5 animate-spin"/> : <Heart className="h-5 w-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );

