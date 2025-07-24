
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft, Wand2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';


const content = {
    de: {
        pageTitle: "KI Vers-Finder",
        pageDescription: "Finde Koranverse, indem du ihre Bedeutung beschreibst oder ein Stichwort eingibst.",
        backToFeatures: "Zurück zu den Funktionen",
        searchPlaceholder: "Beschreibe einen Vers oder ein Thema...\nz.B. 'Der Vers über Geduld bei einem Schicksalsschlag' oder 'Verse über die Erschaffung des Menschen'",
        findVerse: "Verse finden",
        resultsTitle: "Gefundene Verse",
        resultsPlaceholder: "Die von der KI gefundenen Verse und ihre Erklärungen werden hier angezeigt."
    },
    en: {
        pageTitle: "AI Verse Finder",
        pageDescription: "Find Quranic verses by describing their meaning or entering a keyword.",
        backToFeatures: "Back to Features",
        searchPlaceholder: "Describe a verse or topic...\ne.g., 'The verse about patience during hardship' or 'verses about the creation of man'",
        findVerse: "Find Verses",
        resultsTitle: "Found Verses",
        resultsPlaceholder: "The verses and explanations found by the AI will be displayed here."
    }
}


export default function VerseFinderPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="w-full max-w-2xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <Card>
                <CardHeader className="text-center">
                    
                    <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                    <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea 
                        placeholder={c.searchPlaceholder}
                        rows={4}
                    />
                    <Button className="w-full" disabled>
                        <Wand2 className="mr-2 h-4 w-4" />
                        {c.findVerse}
                    </Button>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>{c.resultsTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 text-center border-2 border-dashed rounded-lg text-muted-foreground">
                        {c.resultsPlaceholder}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
