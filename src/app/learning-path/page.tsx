
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, ArrowLeft, AlertTriangle, Wand2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const content = {
    de: {
        pageTitle: "KI-Lernpfad-Generator",
        pageDescription: "Erhalte einen personalisierten Lernplan, der auf deine Ziele und dein Wissen zugeschnitten ist.",
        backToFeatures: "Zurück zu den Funktionen",
        comingSoon: "Funktion in Entwicklung",
        infoText: "Diese Funktion nutzt KI, um dir einen strukturierten Lernpfad zu erstellen. Gib einfach deine Interessen an (z.B. 'Grundlagen für Konvertiten', 'Fiqh des Gebets', 'Prophetengeschichten'), und die KI schlägt dir Themen, Reihenfolgen und Ressourcen vor.",
        generatePath: "Meinen Lernpfad erstellen"
    },
    en: {
        pageTitle: "AI Learning Path Generator",
        pageDescription: "Get a personalized learning plan tailored to your goals and knowledge.",
        backToFeatures: "Back to Features",
        comingSoon: "Feature in Development",
        infoText: "This feature uses AI to create a structured learning path for you. Simply state your interests (e.g., 'Basics for reverts', 'Fiqh of prayer', 'Stories of the prophets'), and the AI will suggest topics, sequences, and resources.",
        generatePath: "Create My Learning Path"
    }
}


export default function LearningPathPage() {
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
                            <Map className="h-12 w-12 text-primary" />
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
                        <Wand2 className="mr-2 h-4 w-4" />
                        {c.generatePath}
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
