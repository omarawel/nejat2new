
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

type PrayerCounts = {
  [key: string]: number;
};

const content = {
    de: {
        pageTitle: "Tracker für verpasste Gebete",
        pageDescription: "Behalte den Überblick über nachzuholende Gebete (Qada). Trage ein, welche Gebete du nachholen musst.",
        backToFeatures: "Zurück zu den Funktionen",
        totalMissed: "Gesamt:",
        resetAll: "Alle zurücksetzen",
        prayersToMakeUp: "Nachzuholende Gebete",
    },
    en: {
        pageTitle: "Missed Prayers Tracker",
        pageDescription: "Keep track of prayers that need to be made up (Qada). Log which prayers you need to complete.",
        backToFeatures: "Back to Features",
        totalMissed: "Total Missed:",
        resetAll: "Reset All",
        prayersToMakeUp: "Prayers to Make Up",
    }
}

export default function MissedPrayersPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const [prayerCounts, setPrayerCounts] = useState<PrayerCounts>({
    Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0
  });

  useEffect(() => {
    const savedCounts = localStorage.getItem('missedPrayers');
    if (savedCounts) {
      setPrayerCounts(JSON.parse(savedCounts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('missedPrayers', JSON.stringify(prayerCounts));
  }, [prayerCounts]);

  const updateCount = (prayer: string, change: number) => {
    setPrayerCounts(prev => ({
      ...prev,
      [prayer]: Math.max(0, prev[prayer] + change)
    }));
  };

  const resetAll = () => {
    setPrayerCounts({ Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 });
  };
  
  const totalMissed = Object.values(prayerCounts).reduce((acc, count) => acc + count, 0);

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-lg">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <Card>
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <Clock className="h-12 w-12 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                    <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        {prayerNames.map(prayer => (
                            <div key={prayer} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <p className="text-lg font-medium">{prayer}</p>
                                <div className="flex items-center gap-2">
                                    <Button size="icon" variant="outline" onClick={() => updateCount(prayer, -1)} disabled={prayerCounts[prayer] === 0}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="text-xl font-bold w-12 text-center">{prayerCounts[prayer]}</span>
                                    <Button size="icon" variant="outline" onClick={() => updateCount(prayer, 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <div className="w-full flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                         <p className="text-lg font-bold text-primary">{c.totalMissed}</p>
                         <p className="text-2xl font-bold text-primary">{totalMissed}</p>
                    </div>
                    <Button variant="destructive" className="w-full" onClick={resetAll} disabled={totalMissed === 0}>{c.resetAll}</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
