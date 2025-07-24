
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, Play, Pause, ArrowLeft, Volume2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const stations = [
    {
        name: "Quran Radio - Makkah",
        description: "Live broadcast from the Holy Mosque in Mecca.",
        streamUrl: "https://stream.radiojar.com/4wqre23fytzuv",
        logo: "https://placehold.co/100x100.png",
        hint: "Kaaba"
    },
    {
        name: "Quran Radio - AbdulBaset",
        description: "Recitations by the legendary Qari AbdulBaset AbdulSamad.",
        streamUrl: "https://qurango.net/radio/abdullbaset_abdulsamad",
        logo: "https://placehold.co/100x100.png",
        hint: "Quran"
    },
    {
        name: "Radio Coran - France",
        description: "Islamic programs and recitations in French.",
        streamUrl: "https://radiocorran.ice.infomaniak.ch/radiocorran-128.mp3",
        logo: "https://placehold.co/100x100.png",
        hint: "Eiffel Tower"
    },
];

const content = {
    de: {
        pageTitle: "Islamisches Radio",
        pageDescription: "Höre Live-Vorträge, Koranrezitationen und islamische Programme aus aller Welt.",
        backToFeatures: "Zurück zu den Funktionen",
        nowPlaying: "Aktuelle Wiedergabe",
        stopped: "Angehalten"
    },
    en: {
        pageTitle: "Islamic Radio",
        pageDescription: "Listen to live lectures, Quran recitations, and Islamic programs from around the world.",
        backToFeatures: "Back to Features",
        nowPlaying: "Now Playing",
        stopped: "Stopped"
    }
}


export default function RadioPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<(typeof stations)[0] | null>(null);

  const togglePlay = (station: (typeof stations)[0]) => {
      if (currentStation?.streamUrl === station.streamUrl && isPlaying) {
          audioRef.current?.pause();
          setIsPlaying(false);
      } else {
          setCurrentStation(station);
          setIsPlaying(true);
      }
  };

  useEffect(() => {
    if (isPlaying && currentStation && audioRef.current) {
        audioRef.current.src = currentStation.streamUrl;
        audioRef.current.play().catch(error => {
            console.error("Audio play error:", error);
            setIsPlaying(false);
        });
    }
  }, [isPlaying, currentStation]);


  return (
    <div className="container mx-auto px-4 py-8">
        <audio ref={audioRef} />
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToFeatures}
            </Link>
        </Button>
        <header className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                <Radio className="h-10 w-10" />
                {c.pageTitle}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">{c.pageDescription}</p>
        </header>

         <Card className="max-w-md mx-auto mb-8 bg-muted/50">
            <CardHeader>
                <CardTitle className="text-lg">{c.nowPlaying}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
                {currentStation ? (
                    <>
                        <Image src={currentStation.logo} alt={currentStation.name} width={64} height={64} className="rounded-md" data-ai-hint={currentStation.hint} />
                        <div className="flex-grow">
                            <p className="font-semibold">{currentStation.name}</p>
                            <p className="text-sm text-muted-foreground">{isPlaying ? "Playing..." : "Paused"}</p>
                        </div>
                        {isPlaying && <Volume2 className="h-6 w-6 text-primary animate-pulse" />}
                    </>
                ) : (
                    <p className="text-muted-foreground">{c.stopped}</p>
                )}
            </CardContent>
        </Card>

        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
            {stations.map(station => (
                 <Card key={station.name} className="flex items-center p-4">
                     <Image src={station.logo} alt={station.description} width={60} height={60} className="rounded-md mr-4" data-ai-hint={station.hint} />
                     <div className="flex-grow">
                         <h3 className="font-semibold">{station.name}</h3>
                         <p className="text-sm text-muted-foreground">{station.description}</p>
                     </div>
                     <Button 
                        size="icon" 
                        variant={currentStation?.streamUrl === station.streamUrl && isPlaying ? "default" : "outline"}
                        onClick={() => togglePlay(station)}
                    >
                        {currentStation?.streamUrl === station.streamUrl && isPlaying ? <Pause /> : <Play />}
                     </Button>
                 </Card>
            ))}
        </div>
    </div>
  );
}
