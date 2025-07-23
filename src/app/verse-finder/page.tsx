
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const content = {
    de: {
        pageTitle: "KI Vers-Finder",
        pageDescription: "Finde Koranverse, indem du ihre Bedeutung beschreibst oder ein Stichwort eingibst.",
        backToFeatures: "Zurück zu den Funktionen",
        comingSoon: "Funktion in Entwicklung",
        infoText: "Diese Funktion ist wie ein 'Shazam' für den Koran. Beschreibe den Inhalt oder die Bedeutung eines Verses, an den du dich erinnerst, und die KI wird versuchen, ihn für dich zu finden. Du kannst auch nach Stichwörtern oder Themen suchen, um relevante Verse zu entdecken.",
        findVerse: "Vers finden"
    },
    en: {
        pageTitle: "AI Verse Finder",
        pageDescription: "Find Quranic verses by describing their meaning or entering a keyword.",
        backToFeatures: "Back to Features",
        comingSoon: "Feature in Development",
        infoText: "This feature is like a 'Shazam' for the Quran. Describe the content or meaning of a verse you remember, and the AI will try to find it for you. You can also search for keywords or topics to discover relevant verses.",
        findVerse: "Find Verse"
    }
}


export default function VerseFinderPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <Card className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <Search className="h-12 w-12 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                    <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>{c.comingSoon}</AlertTitle>
                        <AlertDescription>
                            {c.infoText}
                        </AlertDescription>
                    </Alert>
                    <Button disabled>{c.findVerse}</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
