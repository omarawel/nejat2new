
"use client"

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, Pause, Loader, Eye, EyeOff, BrainCircuit } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { cn } from '@/lib/utils';

const content = {
    de: {
        title: "Lern-Werkzeug",
        description: "Gib einen beliebigen Text ein, um ihn mit Sprachausgabe und Versteckfunktion auswendig zu lernen.",
        inputTitle: "Text zum Auswendiglernen",
        inputDescription: "Füge hier den Text ein, den du lernen möchtest. Das kann ein Vers, ein Dua oder etwas anderes sein.",
        inputPlaceholder: "Beginne hier mit der Eingabe...",
        startButton: "Lernen starten",
        learningZoneTitle: "Lern-Zone",
        play: "Abspielen",
        memorize: "Lernen"
    },
    en: {
        title: "Memorization Tool",
        description: "Enter any text to memorize it with audio playback and a hide/show feature.",
        inputTitle: "Text to Memorize",
        inputDescription: "Paste the text you want to learn here. It can be a verse, a dua, or anything else.",
        inputPlaceholder: "Start typing here...",
        startButton: "Start Learning",
        learningZoneTitle: "Learning Zone",
        play: "Play",
        memorize: "Memorize"
    }
}

export default function MemorizationPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  const [inputText, setInputText] = useState('');
  const [learningText, setLearningText] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  
  const [playingAudio, setPlayingAudio] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStartLearning = () => {
    setLearningText(inputText);
    setIsHidden(false);
    setPlayingAudio(false);
    setLoadingAudio(false);
    setAudioUrl(null);
  };

  const handlePlayAudio = async () => {
    if (playingAudio) {
        audioRef.current?.pause();
        setPlayingAudio(false);
        return;
    }

    if (audioUrl) {
        audioRef.current?.play();
        setPlayingAudio(true);
        return;
    }
    
    setLoadingAudio(true);
    try {
      const result = await textToSpeech(learningText);
      setAudioUrl(result.audio);
    } catch (err) {
      console.error("Failed to get audio", err);
    } finally {
      setLoadingAudio(false);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current && !playingAudio) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
        setPlayingAudio(true);
    }
  }, [audioUrl, playingAudio]);

  return (
    <div className="container mx-auto px-4 py-8">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setPlayingAudio(false)}
        />
      )}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
            <BrainCircuit className="h-10 w-10" />
            {c.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{c.inputTitle}</CardTitle>
            <CardDescription>{c.inputDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder={c.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={10}
              className="resize-none"
            />
            <Button onClick={handleStartLearning} disabled={!inputText.trim()} className="w-full">
              {c.startButton}
            </Button>
          </CardContent>
        </Card>

        <Card className={cn(!learningText && "bg-muted/50")}>
            <CardHeader>
                <CardTitle>{c.learningZoneTitle}</CardTitle>
                <CardDescription>
                    {learningText ? 'Use the controls to learn.' : 'Your text will appear here.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {learningText ? (
                    <div className="space-y-4">
                        <div className={cn(
                            "p-4 border rounded-md min-h-[220px] transition-all",
                             isHidden ? "bg-card text-card" : "bg-background"
                        )}>
                           <p className={cn("whitespace-pre-wrap transition-opacity", isHidden ? "opacity-0" : "opacity-100")}>{learningText}</p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" size="lg" onClick={handlePlayAudio} disabled={loadingAudio}>
                                {loadingAudio ? <Loader className="mr-2 h-5 w-5 animate-spin" /> : (playingAudio ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />)}
                                {c.play}
                            </Button>
                            <Button variant="outline" size="lg" onClick={() => setIsHidden(!isHidden)}>
                                {isHidden ? <EyeOff className="mr-2 h-5 w-5" /> : <Eye className="mr-2 h-5 w-5" />}
                                {c.memorize}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[280px] text-muted-foreground">
                        <p>No text to learn yet.</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
