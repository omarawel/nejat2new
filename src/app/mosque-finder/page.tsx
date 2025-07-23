
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const content = {
    de: {
        pageTitle: "Moscheefinder",
        pageDescription: "Finde Moscheen in deiner Nähe oder an einem bestimmten Ort.",
        backToFeatures: "Zurück zu den Funktionen",
        comingSoon: "Funktion in Entwicklung",
        infoText: "Diese Funktion befindet sich derzeit in der Entwicklung. Um Moscheen in deiner Nähe zu finden, benötigt die App Zugriff auf deinen Standort. Du wirst auch nach Orten suchen können.",
        permissions: "Berechtigungen erforderlich:",
        location: "Standortzugriff",
        findMosques: "Moscheen finden"
    },
    en: {
        pageTitle: "Mosque Finder",
        pageDescription: "Find mosques near you or at a specific location.",
        backToFeatures: "Back to Features",
        comingSoon: "Feature in Development",
        infoText: "This feature is currently under development. To find mosques near you, the app needs access to your location. You will also be able to search for locations.",
        permissions: "Permissions Required:",
        location: "Location Access",
        findMosques: "Find Mosques"
    }
}


export default function MosqueFinderPage() {
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
                            <MapPin className="h-12 w-12 text-primary" />
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
                        </ul>
                    </div>
                    <Button disabled>{c.findMosques}</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
