
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const content = {
    de: {
        pageTitle: "Digitaler Tasbih-Zähler",
        pageDescription: "Zähle dein Dhikr und deine Lobpreisungen mit diesem einfachen Werkzeug.",
        backToFeatures: "Zurück zu den Funktionen",
        reset: "Zurücksetzen"
    },
    en: {
        pageTitle: "Digital Tasbih Counter",
        pageDescription: "Count your dhikr and praises with this simple tool.",
        backToFeatures: "Back to Features",
        reset: "Reset"
    }
}


export default function TasbihCounterPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleCount = () => {
    if (count === 100) {
        setCount(0);
        return;
    }
    const newCount = count + 1;
    setCount(newCount);
    if (newCount === 33 || newCount === 99 || newCount === 100) {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300); // Animation duration
    }
  }

  const handleReset = () => {
      setCount(0);
  }

  const isMilestone = count === 33 || count === 99 || count === 100;

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
            <Button asChild variant="ghost" className="mb-8 self-start">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <div className="flex flex-col items-center">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                    <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                </CardHeader>
                <div className="w-64 h-64 my-8">
                     <button
                        onClick={handleCount}
                        className={cn(
                            "w-full h-full rounded-full flex items-center justify-center select-none transition-colors duration-200",
                            "bg-muted text-foreground shadow-inner",
                            "hover:bg-accent",
                            "active:bg-primary/20",
                             isMilestone && animate && "bg-primary text-primary-foreground"
                        )}
                        style={{
                            boxShadow: 'inset 0 6px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        <span className="text-7xl font-mono font-bold">{count}</span>
                    </button>
                </div>
                 <Button variant="outline" className="w-48" onClick={handleReset}>
                    <RotateCcw className="mr-2 h-4 w-4" /> {c.reset}
                </Button>
            </div>
        </div>
    </div>
  );
}
