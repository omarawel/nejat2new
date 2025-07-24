
"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sunrise, Sun, Sunset, Moon, Sparkles, ArrowLeft, LocateFixed, WifiOff, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { format } from 'date-fns';

const content = {
    de: {
        title: "Gebetszeiten",
        description: "Präziser Zeitplan für deine täglichen Gebete.",
        backToFeatures: "Zurück zu den Funktionen",
        locationNeeded: "Standort benötigt",
        locationDescription: "Für genaue Gebetszeiten aktiviere bitte die Ortungsdienste in deinem Browser und lade die Seite neu.",
        todaysSchedule: "Heutiger Zeitplan",
        imsak: "Imsak",
        fajr: "Fajr",
        sunrise: "Sonnenaufgang",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        qiblaTitle: "Finde die Qibla",
        qiblaDescription: "Nutze unseren Kompass, um die exakte Gebetsrichtung zu finden, egal wo du bist.",
        qiblaButton: "Zum Qibla-Kompass",
        loading: "Gebetszeiten werden geladen...",
        error: "Fehler",
        errorDesc: "Gebetszeiten konnten nicht geladen werden. Bitte überprüfe deine Internetverbindung und Standortberechtigungen.",
    },
    en: {
        title: "Prayer Times",
        description: "Precise schedule for your daily prayers.",
        backToFeatures: "Back to Features",
        locationNeeded: "Location Needed",
        locationDescription: "For accurate prayer times, please enable location services in your browser and reload the page.",
        todaysSchedule: "Today's Schedule",
        imsak: "Imsak",
        fajr: "Fajr",
        sunrise: "Sunrise",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        qiblaTitle: "Find the Qibla",
        qiblaDescription: "Use our compass to find the exact direction of prayer, no matter where you are.",
        qiblaButton: "Go to Qibla Compass",
        loading: "Loading prayer times...",
        error: "Error",
        errorDesc: "Could not load prayer times. Please check your internet connection and location permissions.",
    }
}

interface PrayerTime {
    nameKey: string;
    name: string;
    time: string;
    icon: React.ElementType;
}

export default function PrayerTimesPage() {
    const { language } = useLanguage();
    const c = content[language];
    const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
    const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrayerTimes = (latitude: number, longitude: number) => {
            const date = new Date();
            // Method 4: Muslim World League. A widely used method.
            const url = `https://api.aladhan.com/v1/timings/${date.getTime()/1000}?latitude=${latitude}&longitude=${longitude}&method=4`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        const times = data.data.timings;
                        const prayerIcons = {
                            Imsak: Sparkles,
                            Fajr: Sunrise,
                            Sunrise: Sunrise,
                            Dhuhr: Sun,
                            Asr: Sun,
                            Maghrib: Sunset,
                            Isha: Moon
                        };
                         const prayerNames: Record<string, string> = {
                            Imsak: c.imsak,
                            Fajr: c.fajr,
                            Sunrise: c.sunrise,
                            Dhuhr: c.dhuhr,
                            Asr: c.asr,
                            Maghrib: c.maghrib,
                            Isha: c.isha
                        };

                        const formattedTimes: PrayerTime[] = Object.keys(prayerIcons)
                            .map(key => ({
                                nameKey: key,
                                name: prayerNames[key],
                                time: times[key],
                                icon: prayerIcons[key as keyof typeof prayerIcons]
                            }));
                        
                        setPrayerTimes(formattedTimes);

                        // Fetch location name
                         fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${language}`)
                            .then(res => res.json())
                            .then(locationData => {
                                setLocation({ city: locationData.city, country: locationData.countryName });
                            })


                    } else {
                        setError(c.errorDesc);
                    }
                })
                .catch(() => setError(c.errorDesc))
                .finally(() => setLoading(false));
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    setError(c.locationDescription);
                    setLoading(false);
                }
            );
        } else {
            setError(c.locationDescription);
            setLoading(false);
        }

    }, [c, language]);

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
        {loading ? (
             <Card>
                <CardHeader>
                    <CardTitle>{c.todaysSchedule}</CardTitle>
                    <CardDescription>{c.loading}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-48">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </CardContent>
            </Card>
        ) : error ? (
            <Alert variant="destructive">
                <LocateFixed className="h-4 w-4" />
                <AlertTitle>{c.error}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        ) : (
            <Card>
                <CardHeader>
                    <CardTitle>{c.todaysSchedule}</CardTitle>
                    <CardDescription>
                        {location ? `${location.city}, ${location.country}` : `(${format(new Date(), "PPP")})`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="divide-y divide-border">
                        {prayerTimes.map((prayer) => (
                            <li key={prayer.nameKey} className="flex items-center justify-between py-4">
                                <div className="flex items-center gap-4">
                                <prayer.icon className="h-6 w-6 text-primary" />
                                <span className="text-lg font-medium">{prayer.name}</span>
                                </div>
                                <span className="text-lg font-mono text-muted-foreground">{prayer.time}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        )}

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
