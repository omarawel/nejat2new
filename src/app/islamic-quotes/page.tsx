
"use client"

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquareQuote, ArrowLeft, Loader2, Share2, Heart } from 'lucide-react';
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
}

const quotes: Quote[] = [
  { text_de: "Geduld ist nicht nur die Fähigkeit zu warten, sondern die Fähigkeit, beim Warten eine gute Einstellung zu bewahren.", author_de: "Imam Ali (ra)", text_en: "Patience is not just the ability to wait, but the ability to keep a good attitude while waiting.", author_en: "Imam Ali (ra)" },
  { text_de: "Die Welt ist ein Gefängnis für den Gläubigen und ein Paradies für den Ungläubigen.", author_de: "Prophet Muhammad (ﷺ)", text_en: "The world is a prison for the believer and a paradise for the disbeliever.", author_en: "Prophet Muhammad (ﷺ)" },
  { text_de: "Reichtum besteht nicht im Überfluss an Gütern, sondern im Reichtum der Seele.", author_de: "Prophet Muhammad (ﷺ)", text_en: "Richness is not in the abundance of wealth; rather, richness is the richness of the soul.", author_en: "Prophet Muhammad (ﷺ)" },
  { text_de: "Spreche Gutes oder schweige.", author_de: "Prophet Muhammad (ﷺ)", text_en: "Speak good or remain silent.", author_en: "Prophet Muhammad (ﷺ)" },
  { text_de: "Der Starke ist nicht der, der im Ringen siegt, sondern der, der sich im Zorn beherrschen kann.", author_de: "Prophet Muhammad (ﷺ)", text_en: "The strong man is not the one who wrestles, but the strong man is in fact the one who controls himself in a fit of rage.", author_en: "Prophet Muhammad (ﷺ)" },
  { text_de: "Wenn Allah Gutes für jemanden will, gibt Er ihm Verständnis für die Religion.", author_de: "Prophet Muhammad (ﷺ)", text_en: "When Allah wishes good for someone, He gives him understanding of the religion.", author_en: "Prophet Muhammad (ﷺ)" }
];


const content = {
    de: {
        title: "Inspirierende Zitate",
        description: "Eine tägliche Dosis Weisheit von großen Gelehrten und Denkern des Islam, um die Seele zu nähren und den Geist zu inspirieren.",
        backToFeatures: "Zurück zu den Funktionen",
        newQuote: "Neues Zitat",
        intro: "Worte haben die Macht, zu heilen, zu motivieren und unsere Perspektive zu verändern. Diese Sammlung von Zitaten von den Gefährten des Propheten, großen Imamen und Gelehrten dient als tägliche Erinnerung an die tiefen Weisheiten und die spirituelle Tiefe des islamischen Erbes.",
        shareError: "Teilen wird von deinem Browser nicht unterstützt.",
        quoteCopied: "Zitat-Bild in die Zwischenablage kopiert.",
        favoriteSaved: "Als Favorit gespeichert!",
        loginToSave: "Anmelden, um Favoriten zu speichern.",
        errorSaving: "Fehler beim Speichern des Favoriten."
    },
    en: {
        title: "Inspirational Quotes",
        description: "A daily dose of wisdom from great scholars and thinkers of Islam to nourish the soul and inspire the mind.",
        backToFeatures: "Back to Features",
        newQuote: "New Quote",
        intro: "Words have the power to heal, motivate, and change our perspective. This collection of quotes from the companions of the Prophet, great Imams, and scholars serves as a daily reminder of the profound wisdom and spiritual depth of the Islamic heritage.",
        shareError: "Sharing is not supported by your browser.",
        quoteCopied: "Quote image copied to clipboard.",
        favoriteSaved: "Saved to favorites!",
        loginToSave: "Login to save favorites.",
        errorSaving: "Error saving favorite."
    }
}

export default function IslamicQuotesPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const { toast } = useToast();
    const [user] = useAuthState(auth);

    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const postcardRef = useRef<HTMLDivElement>(null);

    const getNewQuote = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            let newQuote = quotes[randomIndex];
            if (quote && newQuote.text_en === quote.text_en) {
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
        if (!postcardRef.current || !quote) return;
        try {
            const blob = await toBlob(postcardRef.current, { pixelRatio: 2 });
            if (!blob) return;

            const file = new File([blob], `quote.png`, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: c.title,
                });
            } else {
                 await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                toast({ description: c.quoteCopied });
            }
        } catch (error) {
            console.error('Error sharing:', error);
            toast({ variant: 'destructive', description: c.shareError });
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
        const textToSave = `"${language === 'de' ? quote.text_de : quote.text_en}" - ${language === 'de' ? quote.author_de : quote.author_en}`;
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
                     <MessageSquareQuote className="h-24 w-24 text-primary/50" />
                 </div>
             </div>
             <div className="container mx-auto px-4 -mt-24 sm:-mt-32 z-10">
                <Card ref={postcardRef} className="w-full max-w-2xl mx-auto text-center shadow-2xl bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="min-h-[150px] flex items-center justify-center p-6">
                        {loading ? (
                             <div className="space-y-4 w-full">
                                <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                            </div>
                        ) : quote ? (
                            <blockquote className="space-y-4">
                                <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">"{language === 'de' ? quote.text_de : quote.text_en}"</p>
                                <footer className="text-base text-muted-foreground">- {language === 'de' ? quote.author_de : quote.author_en}</footer>
                            </blockquote>
                        ) : null}
                    </CardContent>
                    <CardFooter className="justify-end">
                        <p className="text-xs text-muted-foreground">Nejat Pro</p>
                    </CardFooter>
                </Card>
                 <div className="w-full max-w-2xl mx-auto mt-4 grid grid-cols-3 gap-2">
                    <Button variant="outline" className="col-span-1" onClick={getNewQuote} disabled={loading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        {c.newQuote}
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
}
