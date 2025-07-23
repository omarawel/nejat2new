
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, Play, Pause, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const content = {
    de: {
        pageTitle: "Islamisches Radio",
        pageDescription: "Höre Live-Vorträge, Koranrezitationen und islamische Programme.",
        backToFeatures: "Zurück zu den Funktionen",
        comingSoon: "Funktion in Entwicklung",
        infoText: "Diese Funktion befindet sich derzeit in der Entwicklung. Bald wirst du hier eine Auswahl an islamischen Radiosendern aus der ganzen Welt streamen können.",
        play: "Abspielen"
    },
    en: {
        pageTitle: "Islamic Radio",
        pageDescription: "Listen to live lectures, Quran recitations, and Islamic programs.",
        backToFeatures: "Back to Features",
        comingSoon: "Feature in Development",
        infoText: "This feature is currently under development. Soon you will be able to stream a selection of Islamic radio stations from around the world here.",
        play: "Play"
    }
}


export default function RadioPage() {
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
                            <Radio className="h-12 w-12 text-primary" />
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
                    <Button disabled>
                        <Play className="mr-2 h-4 w-4" />
                        {c.play}
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
