
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar, BookOpen, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

const content = {
    de: {
        pageTitle: "Khutbah der Woche",
        pageDescription: "Eine wöchentliche Ansprache, um Wissen und Iman zu stärken.",
        backToFeatures: "Zurück zu den Funktionen",
        khutbah: {
            title: "Die Bedeutung der Geduld (Sabr) in schwierigen Zeiten",
            speaker: "Imam Youssef",
            date: "25. Juli 2025",
            summary: "In dieser Khutbah erörtert Imam Youssef die verschiedenen Arten der Geduld im Islam, wie sie im Koran und in der Sunnah beschrieben werden. Er gibt praktische Ratschläge, wie Muslime Standhaftigkeit im Glauben bewahren und auf Allahs Hilfe vertrauen können, wenn sie mit Prüfungen konfrontiert werden.",
            keyPoints: "Wichtige Punkte:",
            points: [
                "Die drei Arten von Sabr: Geduld im Gehorsam gegenüber Allah, Geduld beim Unterlassen von Sünden und Geduld bei schmerzhaften Schicksalsschlägen.",
                "Beispiele für Geduld aus dem Leben der Propheten.",
                "Die immense Belohnung für die Geduldigen im Dies- und Jenseits.",
                "Wie man durch Gebet, Dhikr und Vertrauen auf Allah (Tawakkul) Geduld entwickelt."
            ]
        }
    },
    en: {
        pageTitle: "Khutbah of the Week",
        pageDescription: "A weekly sermon to strengthen knowledge and Iman.",
        backToFeatures: "Back to Features",
        khutbah: {
            title: "The Importance of Patience (Sabr) in Difficult Times",
            speaker: "Imam Youssef",
            date: "July 25, 2025",
            summary: "In this Khutbah, Imam Youssef discusses the different types of patience in Islam as described in the Quran and Sunnah. He provides practical advice on how Muslims can maintain steadfastness in faith and trust in Allah's help when faced with trials.",
            keyPoints: "Key Points:",
            points: [
                "The three types of Sabr: patience in obedience to Allah, patience in refraining from sins, and patience during painful trials.",
                "Examples of patience from the lives of the Prophets.",
                "The immense reward for the patient in this life and the hereafter.",
                "How to develop patience through prayer, Dhikr, and trust in Allah (Tawakkul)."
            ]
        }
    }
}


export default function KhutbahOfTheWeekPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToFeatures}
            </Link>
        </Button>
        <header className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-primary">
                {c.pageTitle}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">{c.pageDescription}</p>
        </header>

        <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader>
                <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center mb-4">
                     <p className="text-muted-foreground">Video Placeholder</p>
                </div>
                <CardTitle className="text-3xl">{c.khutbah.title}</CardTitle>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{c.khutbah.speaker}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{c.khutbah.date}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-6">{c.khutbah.summary}</p>
                
                <div className="bg-accent/50 p-4 rounded-md">
                     <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <BookOpen className="h-5 w-5" />
                        {c.khutbah.keyPoints}
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                       {c.khutbah.points.map((point, index) => <li key={index}>{point}</li>)}
                    </ul>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
