
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const content = {
    de: {
        pageTitle: "Tracker für verpasste Fastentage",
        pageDescription: "Behalte den Überblick über nachzuholende Fastentage.",
        backToFeatures: "Zurück zu den Funktionen",
        comingSoon: "Funktion in Entwicklung",
        infoText: "Mit diesem Werkzeug kannst du verpasste Fastentage (z.B. aus dem Ramadan) eintragen und abhaken, sobald du sie nachgeholt hast. So verlierst du nie den Überblick über deine offenen Pflichten.",
        addDay: "Tag hinzufügen"
    },
    en: {
        pageTitle: "Missed Fasts Tracker",
        pageDescription: "Keep track of fasts that need to be made up.",
        backToFeatures: "Back to Features",
        comingSoon: "Feature in Development",
        infoText: "With this tool, you can record missed fasts (e.g., from Ramadan) and check them off once you have made them up. This way, you'll never lose track of your outstanding obligations.",
        addDay: "Add Day"
    }
}


export default function MissedFastsPage() {
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
                            <CalendarDays className="h-12 w-12 text-primary" />
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
                    <Button disabled>{c.addDay}</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
