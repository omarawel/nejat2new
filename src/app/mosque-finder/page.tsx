
"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, LocateFixed, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


const content = {
    de: {
        pageTitle: "Moscheefinder",
        pageDescription: "Finde Moscheen in deiner Nähe oder an einem bestimmten Ort.",
        backToFeatures: "Zurück zu den Funktionen",
        searchPlaceholder: "Stadt oder Adresse eingeben...",
        searchButton: "Suchen",
        useCurrentLocation: "Meinen Standort verwenden",
        locationError: "Standort konnte nicht abgerufen werden. Bitte überprüfe deine Browsereinstellungen.",
        locating: "Standort wird ermittelt...",
    },
    en: {
        pageTitle: "Mosque Finder",
        pageDescription: "Find mosques near you or at a specific location.",
        backToFeatures: "Back to Features",
        searchPlaceholder: "Enter city or address...",
        searchButton: "Search",
        useCurrentLocation: "Use My Location",
        locationError: "Could not retrieve location. Please check your browser settings.",
        locating: "Getting location...",
    }
}


export default function MosqueFinderPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const { toast } = useToast();
  const router = useRouter();
  const [locationQuery, setLocationQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = () => {
      if (!locationQuery.trim()) return;
      const url = `https://www.google.com/maps/search/?api=1&query=mosques+near+${encodeURIComponent(locationQuery)}`;
      window.open(url, '_blank');
  };
  
  const handleCurrentLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
        toast({
            variant: "destructive",
            title: "Error",
            description: c.locationError,
        });
        setIsLocating(false);
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://www.google.com/maps/search/?api=1&query=mosques&query_place_id=${latitude},${longitude}`;
            window.open(url, '_blank');
            setIsLocating(false);
        },
        (error) => {
             toast({
                variant: "destructive",
                title: "Error",
                description: c.locationError,
            });
            console.error(error);
            setIsLocating(false);
        }
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex flex-col">
        <div className="w-full max-w-2xl mx-auto">
            <Button variant="ghost" className="mb-8" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToFeatures}
            </Button>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                    <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Input 
                            placeholder={c.searchPlaceholder}
                            className="flex-grow"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button className="w-full sm:w-auto" onClick={handleSearch} disabled={!locationQuery.trim()}>
                            <Search className="mr-2 h-4 w-4" />
                            {c.searchButton}
                        </Button>
                    </div>
                     <div className="relative flex items-center justify-center my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">OR</span>
                        </div>
                    </div>
                     <Button variant="secondary" className="w-full" onClick={handleCurrentLocation} disabled={isLocating}>
                         {isLocating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                         ) : (
                            <LocateFixed className="mr-2 h-4 w-4" />
                         )}
                         {isLocating ? c.locating : c.useCurrentLocation}
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
