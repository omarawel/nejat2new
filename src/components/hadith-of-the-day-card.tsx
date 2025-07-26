
"use client"

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, BookOpen, Loader2, ArrowLeft, Share2, Heart, MessageSquareQuote } from 'lucide-react';
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
        narrated: "Überliefert von",
        hadithButton: "Mehr entdecken"
    },
    en: {
        title: "Hadith of the Day",
        narrated: "Narrated by",
        hadithButton: "Discover More",
    }
}

export function HadithOfTheDayCard() {
    const { language } = useLanguage();
    const c = content[language];
    
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);
    const postcardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoading(true);
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
        setLoading(false);
    }, []);


    return (
        <Card 
            ref={postcardRef} 
            className="w-full text-center shadow-lg bg-card border-amber-200/50 dark:border-amber-800/50 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/old-paper-dark.png')]"
        >
            <CardHeader>
                <CardTitle className="text-3xl font-bold">{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
                <div className="border-4 border-amber-300 dark:border-amber-800 rounded-md p-6 min-h-[250px] flex flex-col items-center justify-center">
                    {loading ? (
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    ) : quote ? (
                        <div className="space-y-4">
                            <p className="text-xl md:text-2xl font-quranic text-right tracking-wide leading-relaxed">{quote.arabic}</p>
                            <p className="text-base md:text-lg leading-relaxed text-foreground/90">"{language === 'de' ? quote.text_de : quote.text_en}"</p>
                            <p className="text-sm text-muted-foreground">{c.narrated} {language === 'de' ? quote.author_de : quote.author_en} [{quote.reference}]</p>
                        </div>
                    ) : null}
                </div>
            </CardContent>
            <CardFooter className="justify-center p-6">
                <Button asChild variant="outline" className="bg-background/50">
                    <Link href="/hadith-of-the-day">
                        {c.hadithButton}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

