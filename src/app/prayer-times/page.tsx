
"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sunrise, Sun, Sunset, Moon, Sparkles, ArrowLeft, LocateFixed } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const content = {
    de: {
        title: "Gebetszeiten",
        description: "Präziser Zeitplan für deine täglichen Gebete.",
        backToFeatures: "Zurück zu den Funktionen",
        locationNeeded: "Standort benötigt",
        locationDescription: "Für genaue Gebetszeiten aktiviere bitte die Ortungsdienste in deinem Browser und lade die Seite neu.",
        todaysSchedule: "Heutiger Zeitplan",
        placeholderLocation: "Basierend auf Platzhalter-Standort.",
        fajr: "Fajr",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        qiblaTitle: "Finde die Qibla",
        qiblaDescription: "Nutze unseren Kompass, um die exakte Gebetsrichtung zu finden, egal wo du bist.",
        qiblaButton: "Zum Qibla-Kompass",
    },
    en: {
        title: "Prayer Times",
        description: "Precise schedule for your daily prayers.",
        backToFeatures: "Back to Features",
        locationNeeded: "Location Needed",
        locationDescription: "For accurate prayer times, please enable location services in your browser and reload the page.",
        todaysSchedule: "Today's Schedule",
        placeholderLocation: "Based on placeholder location.",
        fajr: "Fajr",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        qiblaTitle: "Find the Qibla",
        qiblaDescription: "Use our compass to find the exact direction of prayer, no matter where you are.",
        qiblaButton: "Go to Qibla Compass",
    }
}

const prayerTimes = [
  { nameKey: "fajr", time: "04:30 AM", icon: Sunrise },
  { nameKey: "dhuhr", time: "01:15 PM", icon: Sun },
  { nameKey: "asr", time: "05:00 PM", icon: Sun },
  { nameKey: "maghrib", time: "07:45 PM", icon: Sunset },
  { nameKey: "isha", time: "09:15 PM", icon: Moon },
];

export default function PrayerTimesPage() {
    const { language } = useLanguage();
    const c = content[language];
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToFeatures}
            </Link>
        </Button>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2">{c.description}</p>
      </header>
      
      <div className="space-y-8">
        <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>{c.locationNeeded}</AlertTitle>
            <AlertDescription>{c.locationDescription}</AlertDescription>
        </Alert>

        <Card>
            <CardHeader>
            <CardTitle>{c.todaysSchedule}</CardTitle>
            <CardDescription>{c.placeholderLocation}</CardDescription>
            </CardHeader>
            <CardContent>
            <ul className="divide-y divide-border">
                {prayerTimes.map((prayer) => (
                <li key={prayer.nameKey} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                    <prayer.icon className="h-6 w-6 text-primary" />
                    <span className="text-lg font-medium">{c[prayer.nameKey as keyof typeof c]}</span>
                    </div>
                    <span className="text-lg font-mono text-muted-foreground">{prayer.time}</span>
                </li>
                ))}
            </ul>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><LocateFixed /> {c.qiblaTitle}</CardTitle>
                <CardDescription>{c.qiblaDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button asChild className="w-full">
                    <Link href="/compass">{c.qiblaButton}</Link>
                 </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
