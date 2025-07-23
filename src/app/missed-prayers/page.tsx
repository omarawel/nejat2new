
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const content = {
    de: {
        pageTitle: "Tracker für verpasste Gebete",
        pageDescription: "Behalte den Überblick über nachzuholende Gebete (Qada).",
        backToFeatures: "Zurück zu den Funktionen",
        comingSoon: "Funktion in Entwicklung",
        infoText: "Mit diesem Werkzeug kannst du verpasste Gebete eintragen und verwalten. Markiere sie als erledigt, sobald du sie nachgeholt hast, um deine spirituellen Pflichten zu erfüllen.",
        addPrayer: "Gebet hinzufügen"
    },
    en: {
        pageTitle: "Missed Prayers Tracker",
        pageDescription: "Keep track of prayers that need to be made up (Qada).",
        backToFeatures: "Back to Features",
        comingSoon: "Feature in Development",
        infoText: "With this tool, you can record and manage missed prayers. Mark them as completed once you have made them up to fulfill your spiritual obligations.",
        addPrayer: "Add Prayer"
    }
}


export default function MissedPrayersPage() {
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
                            <Clock className="h-12 w-12 text-primary" />
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
                    <Button disabled>{c.addPrayer}</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
