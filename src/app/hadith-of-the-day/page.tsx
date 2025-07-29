"use client"

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, BookOpen, Loader2, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { addFavorite } from '@/lib/favorites';
import { toBlob } from 'html-to-image';


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
        hadithCopied: "Hadith-Bild in die Zwischenablage kopiert.",
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
        hadithCopied: "Hadith image copied to clipboard.",
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
    const postcardRef = useRef<HTMLDivElement>(null);

    const showLoginToast = () => {
        toast({
            title: c.loginToSave,
            variant: 'destructive',
            description: <Button variant="secondary" size="sm" asChild className="mt-2"><Link href="/login">Login</Link></Button>,
        });
    }

    const getNewQuote = useCallback(() => {
        if (!user) {
            showLoginToast();
            return;
        }
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
    }, [quote, user, c.loginToSave]);

    useEffect(() => {
        setLoading(true);
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
        setLoading(false);
    }, []);

    const handleShare = async () => {
        if (!user) {
            showLoginToast();
            return;
        }
        if (!postcardRef.current || !quote) return;
        try {
            const blob = await toBlob(postcardRef.current, { pixelRatio: 2 });
            if (!blob) return;

            const file = new File([blob], `hadith-${quote.reference}.png`, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: c.title,
                });
            } else {
                 await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                toast({ description: c.hadithCopied });
            }
        } catch (error) {
            console.error('Error sharing:', error);
            toast({ variant: 'destructive', description: c.shareError });
        }
    };
    
    const handleSaveFavorite = async () => {
        if (!user) {
            showLoginToast();
            return;
        }
        if (!quote) return;
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
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-grow">
            <div className="w-full max-w-2xl">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {c.backToFeatures}
                    </Link>
                </Button>
                <Card 
                    ref={postcardRef} 
                    className="w-full text-center shadow-2xl bg-card border-amber-200/50 dark:border-amber-800/50 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/old-paper-dark.png')]"
                >
                    <CardContent className="p-2">
                        <div className="border-4 border-amber-300 dark:border-amber-800 rounded-md p-6 min-h-[300px] flex flex-col items-center justify-center">
                            <CardTitle className="text-xl font-bold mb-4">{c.title}</CardTitle>
                            {loading ? (
                                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            ) : quote ? (
                                <div className="space-y-4">
                                    <p className="text-2xl md:text-3xl font-quranic text-center tracking-wide leading-relaxed">{quote.arabic}</p>
                                    <p className="text-base md:text-lg leading-relaxed text-foreground/90">"{language === 'de' ? quote.text_de : quote.text_en}"</p>
                                    <p className="text-sm text-muted-foreground">{c.narrated} {language === 'de' ? quote.author_de : quote.author_en} [{quote.reference}]</p>
                                </div>
                            ) : null}
                             <div className="flex-grow" />
                             <p className="text-xs text-muted-foreground/80 pt-4 mt-auto">Nejat Pro</p>
                        </div>
                    </CardContent>
                </Card>
                 <div className="w-full mt-4 grid grid-cols-3 gap-2">
                    <Button variant="outline" onClick={getNewQuote} disabled={authLoading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        {c.newHadith}
                    </Button>
                    <Button variant="outline" aria-label="Share" onClick={handleShare} disabled={authLoading}>
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" aria-label="Favorite" onClick={handleSaveFavorite} disabled={isSaving || authLoading}>
                       {isSaving ? <Loader2 className="h-5 w-5 animate-spin"/> : <Heart className="h-5 w-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
