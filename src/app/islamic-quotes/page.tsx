
"use client"

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquareQuote, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

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
        intro: "Worte haben die Macht, zu heilen, zu motivieren und unsere Perspektive zu verändern. Diese Sammlung von Zitaten von den Gefährten des Propheten, großen Imamen und Gelehrten dient als tägliche Erinnerung an die tiefen Weisheiten und die spirituelle Tiefe des islamischen Erbes."
    },
    en: {
        title: "Inspirational Quotes",
        description: "A daily dose of wisdom from great scholars and thinkers of Islam to nourish the soul and inspire the mind.",
        backToFeatures: "Back to Features",
        newQuote: "New Quote",
        intro: "Words have the power to heal, motivate, and change our perspective. This collection of quotes from the companions of the Prophet, great Imams, and scholars serves as a daily reminder of the profound wisdom and spiritual depth of the Islamic heritage."
    }
}

export default function IslamicQuotesPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-grow">
            <div className="w-full max-w-2xl">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {c.backToFeatures}
                    </Link>
                </Button>
                 <header className="text-center mb-6">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.intro}</p>
                </header>
                <Card className="w-full text-center shadow-xl">
                    <CardHeader>
                        
                        <CardTitle className="text-3xl font-bold">{c.title}</CardTitle>
                        <CardDescription className="text-lg">{c.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-[150px] flex items-center justify-center">
                        {loading ? (
                             <div className="space-y-4 w-full">
                                <div className="h-6 bg-muted rounded w-3/4 mx-auto animate-pulse"></div>
                                <div className="h-4 bg-muted rounded w-1/3 mx-auto animate-pulse"></div>
                            </div>
                        ) : quote ? (
                            <blockquote className="space-y-4">
                                <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">"{language === 'de' ? quote.text_de : quote.text_en}"</p>
                                <footer className="text-base text-muted-foreground">- {language === 'de' ? quote.author_de : quote.author_en}</footer>
                            </blockquote>
                        ) : null}
                    </CardContent>
                    <CardFooter className="flex justify-center p-6">
                        <Button onClick={getNewQuote} disabled={loading}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            {c.newQuote}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
