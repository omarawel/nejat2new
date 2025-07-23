
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, RotateCcw, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';

const content = {
    de: {
        pageTitle: "Digitaler Tasbih-Zähler",
        pageDescription: "Zähle dein Dhikr und deine Lobpreisungen mit diesem einfachen Werkzeug.",
        backToFeatures: "Zurück zu den Funktionen",
        comingSoon: "Funktion in Entwicklung",
        infoText: "Diese Funktion befindet sich derzeit in der Entwicklung. Bald kannst du hier deine Gedenkformeln einfach zählen, Runden speichern und deinen Fortschritt verfolgen.",
        reset: "Zurücksetzen"
    },
    en: {
        pageTitle: "Digital Tasbih Counter",
        pageDescription: "Count your dhikr and praises with this simple tool.",
        backToFeatures: "Back to Features",
        comingSoon: "Feature in Development",
        infoText: "This feature is currently under development. Soon you will be able to easily count your remembrances, save rounds, and track your progress here.",
        reset: "Reset"
    }
}


export default function TasbihCounterPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                    <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="p-8 bg-muted rounded-lg">
                        <p className="text-7xl font-mono font-bold">{count}</p>
                   </div>
                   <div className="space-y-4">
                        <Button className="w-full h-16 text-2xl" onClick={() => setCount(count + 1)}>
                            <Plus />
                        </Button>
                         <div className="flex gap-4">
                             <Button variant="outline" className="w-full" onClick={() => setCount(count > 0 ? count - 1 : 0)}>
                                <Minus />
                            </Button>
                            <Button variant="destructive" className="w-full" onClick={() => setCount(0)}>
                                <RotateCcw /> {c.reset}
                            </Button>
                         </div>
                   </div>

                </CardContent>
            </Card>
        </div>
    </div>
  );
}
