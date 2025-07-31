
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AdBanner } from '@/components/ad-banner';

const content = {
    de: {
        pageTitle: "Digitaler Tasbih-Zähler",
        pageDescription: "Zähle dein Dhikr und deine Lobpreisungen mit diesem einfachen Werkzeug.",
        backToFeatures: "Zurück zu den Funktionen",
        reset: "Zurücksetzen",
        target: "Ziel"
    },
    en: {
        pageTitle: "Digital Tasbih Counter",
        pageDescription: "Count your dhikr and praises with this simple tool.",
        backToFeatures: "Back to Features",
        reset: "Reset",
        target: "Target"
    }
}


export default function TasbihCounterPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [animate, setAnimate] = useState(false);

  const handleCount = () => {
    const newCount = count + 1;
    if (newCount >= target) {
        setCount(0);
        setAnimate(true); // Trigger animation
        setTimeout(() => setAnimate(false), 500); // Reset animation state
    } else {
        setCount(newCount);
    }
  }

  const handleReset = () => {
      setCount(0);
  }

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

                <div className="mb-8">
                     <ToggleGroup type="single" defaultValue="33" value={target.toString()} onValueChange={(value) => { if(value) setTarget(Number(value))}}>
                        <ToggleGroupItem value="33" aria-label="Set target to 33">33</ToggleGroupItem>
                        <ToggleGroupItem value="99" aria-label="Set target to 99">99</ToggleGroupItem>
                        <ToggleGroupItem value="100" aria-label="Set target to 100">100</ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <div className="w-64 h-64 my-8">
                     <button
                        onClick={handleCount}
                        className={cn(
                            "w-full h-full rounded-full flex items-center justify-center select-none transition-all duration-300 transform active:scale-95",
                            "bg-muted text-foreground shadow-inner",
                            "hover:bg-accent",
                             animate && "bg-primary text-primary-foreground scale-110"
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
             <div className="w-full mt-12">
                <AdBanner slotId="tasbih-counter-bottom" />
            </div>
        </div>
    </div>
  );
}
