
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, ArrowLeft, MapPin, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const content = {
    de: {
        pageTitle: "Qibla-Kompass",
        pageDescription: "Finde die Richtung nach Mekka für dein Gebet.",
        backToFeatures: "Zurück zu den Funktionen",
        comingSoon: "Funktion in Entwicklung",
        infoText: "Diese Funktion befindet sich derzeit in der Entwicklung. Um die Qibla-Richtung genau zu bestimmen, benötigt die App Zugriff auf deinen Standort und die Sensoren deines Geräts (Kompass).",
        permissions: "Berechtigungen erforderlich:",
        location: "Standortzugriff",
        sensors: "Gerätesensoren (Kompass)",
        note: "Hinweis: Die Genauigkeit hängt von deinem Gerät und deiner Umgebung ab. Halte dich von metallischen Gegenständen und Magnetfeldern fern."
    },
    en: {
        pageTitle: "Qibla Compass",
        pageDescription: "Find the direction to Mecca for your prayer.",
        backToFeatures: "Back to Features",
        comingSoon: "Feature in Development",
        infoText: "This feature is currently under development. To accurately determine the Qibla direction, the app needs access to your location and your device's sensors (compass).",
        permissions: "Permissions Required:",
        location: "Location Access",
        sensors: "Device Sensors (Compass)",
        note: "Note: Accuracy depends on your device and surroundings. Stay away from metallic objects and magnetic fields."
    }
}


export default function CompassPage() {
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
                            <Compass className="h-12 w-12 text-primary" />
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
                    <div className="text-left text-sm space-y-2">
                        <p className="font-semibold">{c.permissions}</p>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>{c.location}</li>
                            <li>{c.sensors}</li>
                        </ul>
                        <p><span className="font-semibold">{c.note.split(':')[0]}:</span> {c.note.split(':')[1]}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
