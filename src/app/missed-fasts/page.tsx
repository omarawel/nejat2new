
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowLeft, PlusCircle, MinusCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const content = {
    de: {
        pageTitle: "Tracker für verpasste Fastentage",
        pageDescription: "Behalte den Überblick über nachzuholende Fastentage aus dem Ramadan oder anderen Anlässen.",
        backToFeatures: "Zurück zu den Funktionen",
        remainingFasts: "Offene Fastentage",
        addMissedFast: "Verpassten Tag hinzufügen",
        completeFast: "Tag nachgeholt",
        noFasts: "Du hast alle Fastentage nachgeholt. Alhamdulillah!",
        completed: "Abgeschlossen!",
        fastsToMakeUp: "Tage zum Nachholen"
    },
    en: {
        pageTitle: "Missed Fasts Tracker",
        pageDescription: "Keep track of fasts to be made up from Ramadan or other occasions.",
        backToFeatures: "Back to Features",
        remainingFasts: "Remaining Fasts",
        addMissedFast: "Add Missed Fast",
        completeFast: "Complete a Fast",
        noFasts: "You have completed all your fasts. Alhamdulillah!",
        completed: "Completed!",
        fastsToMakeUp: "Fasts to Make Up"
    }
}

export default function MissedFastsPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const [missedFasts, setMissedFasts] = useState(0);

  useEffect(() => {
    const savedFasts = localStorage.getItem('missedFasts');
    if (savedFasts) {
      setMissedFasts(JSON.parse(savedFasts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('missedFasts', JSON.stringify(missedFasts));
  }, [missedFasts]);

  const addFast = () => setMissedFasts(prev => prev + 1);
  const completeFast = () => setMissedFasts(prev => (prev > 0 ? prev - 1 : 0));

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
                <CardContent className="space-y-6">
                    <Card className="bg-muted">
                        <CardHeader>
                            <CardTitle className="text-lg">{c.remainingFasts}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-6xl font-bold text-primary">{missedFasts}</p>
                            <p className="text-muted-foreground">{c.fastsToMakeUp}</p>
                        </CardContent>
                    </Card>
                    
                     {missedFasts === 0 && (
                        <div className="p-4 text-green-600 bg-green-100 dark:bg-green-900/50 rounded-md flex items-center justify-center gap-2">
                           <CheckCircle className="h-5 w-5" />
                           <span className="font-semibold">{c.noFasts}</span>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <Button className="w-full" onClick={addFast}>
                            <PlusCircle className="mr-2 h-5 w-5" />
                            {c.addMissedFast}
                        </Button>
                         <Button variant="outline" className="w-full" onClick={completeFast} disabled={missedFasts === 0}>
                            <MinusCircle className="mr-2 h-5 w-5" />
                            {c.completeFast}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
