
"use client"

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Play, Pause, Loader } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';
import { textToSpeech } from "@/ai/flows/text-to-speech"

const numbers = [
  { number: '١', name: 'Wahid', value: 1 },
  { number: '٢', name: 'Ithnan', value: 2 },
  { number: '٣', name: 'Thalatha', value: 3 },
  { number: '٤', name: 'Arba\'a', value: 4 },
  { number: '٥', name: 'Khamsa', value: 5 },
  { number: '٦', name: 'Sittah', value: 6 },
  { number: '٧', name: 'Sab\'a', value: 7 },
  { number: '٨', name: 'Thamaniyah', value: 8 },
  { number: '٩', name: 'Tis\'a', value: 9 },
  { number: '١٠', name: 'Asharah', value: 10 },
  { number: '١١', name: 'Ahada Ashar', value: 11 },
  { number: '١٢', name: 'Ithna Ashar', value: 12 },
  { number: '١٣', name: 'Thalathata Ashar', value: 13 },
  { number: '١٤', name: 'Arba\'ata Ashar', value: 14 },
  { number: '١٥', name: 'Khamsata Ashar', value: 15 },
  { number: '١٦', name: 'Sittata Ashar', value: 16 },
  { number: '١٧', name: 'Sab\'ata Ashar', value: 17 },
  { number: '١٨', name: 'Thamaniyata Ashar', value: 18 },
  { number: '١٩', name: 'Tis\'ata Ashar', value: 19 },
  { number: '٢٠', name: 'Ishrun', value: 20 },
];

const content = {
    de: {
        title: "Arabische Zahlen",
        description: "Lerne die Zahlen von 1 bis 20 auf Arabisch.",
    },
    en: {
        title: "Arabic Numbers",
        description: "Learn the numbers from 1 to 20 in Arabic.",
    }
}


export default function ArabicNumbersPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const [hiddenCards, setHiddenCards] = useState<Record<number, boolean>>({});

  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<number | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleCardVisibility = (value: number) => {
    setHiddenCards(prev => ({ ...prev, [value]: !prev[value] }));
  };

  const handlePlayAudio = async (textToPlay: string, id: number) => {
    if (playingAudio === id) {
        audioRef.current?.pause();
        setPlayingAudio(null);
        return;
    }
    setLoadingAudio(id);
    setAudioUrl(null);
    setPlayingAudio(null);

    try {
      const result = await textToSpeech(textToPlay);
      setAudioUrl(result.audio);
      setPlayingAudio(id);
    } catch (err) {
      console.error("Failed to get audio", err);
    } finally {
      setLoadingAudio(null);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [audioUrl]);


  return (
    <div className="container mx-auto px-4 py-8">
       {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setPlayingAudio(null)}
        />
      )}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{c.description}</p>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {numbers.map((num) => {
          const isHidden = hiddenCards[num.value];
          const isPlaying = playingAudio === num.value;
          const isLoading = loadingAudio === num.value;
          return (
            <Card key={num.value} className="text-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg relative">
              <div className="absolute top-2 right-2 flex">
                <Button variant="ghost" size="icon" onClick={() => toggleCardVisibility(num.value)}>
                    {isHidden ? <EyeOff /> : <Eye />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(num.name, num.value)} disabled={isLoading}>
                    {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : (isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />)}
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-6xl font-bold text-primary pt-8">{num.number}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className={cn("text-2xl font-semibold", isHidden && 'opacity-0')}>{num.value}</p>
                <p className={cn("text-muted-foreground", isHidden && 'opacity-0')}>{num.name}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}

    