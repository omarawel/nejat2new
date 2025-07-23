
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowLeft, Search, LocateFixed } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Input } from '@/components/ui/input';


const content = {
    de: {
        pageTitle: "Moscheefinder",
        pageDescription: "Finde Moscheen in deiner Nähe oder an einem bestimmten Ort.",
        backToFeatures: "Zurück zu den Funktionen",
        searchPlaceholder: "Stadt oder Adresse eingeben...",
        searchButton: "Suchen",
        useCurrentLocation: "Meinen Standort verwenden",
        infoTitle: "Funktion in Kürze verfügbar",
        infoText: "Die Karten- und Suchfunktion wird bald integriert. In der Zwischenzeit kannst du beliebte Online-Dienste nutzen, um Moscheen zu finden."
    },
    en: {
        pageTitle: "Mosque Finder",
        pageDescription: "Find mosques near you or at a specific location.",
        backToFeatures: "Back to Features",
        searchPlaceholder: "Enter city or address...",
        searchButton: "Search",
        useCurrentLocation: "Use My Location",
        infoTitle: "Feature Coming Soon",
        infoText: "The map and search functionality will be integrated soon. In the meantime, you can use popular online services to find mosques."
    }
}


export default function MosqueFinderPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex flex-col">
        <div className="w-full max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <MapPin className="h-10 w-10" />
                    {c.pageTitle}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">{c.pageDescription}</p>
            </header>

            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Input placeholder={c.searchPlaceholder} className="flex-grow" />
                        <Button className="w-full sm:w-auto"><Search className="mr-2 h-4 w-4" />{c.searchButton}</Button>
                    </div>
                     <div className="relative flex items-center justify-center my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">OR</span>
                        </div>
                    </div>
                     <Button variant="secondary" className="w-full"><LocateFixed className="mr-2 h-4 w-4" /> {c.useCurrentLocation}</Button>
                </CardContent>
            </Card>

            <div className="aspect-video w-full bg-muted rounded-lg flex flex-col items-center justify-center text-center p-4">
                <MapPin className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground">{c.infoTitle}</h3>
                <p className="text-muted-foreground">{c.infoText}</p>
            </div>
        </div>
    </div>
  );
}
