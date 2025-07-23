
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, BookHeart, DoorOpen, HelpCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

const content = {
    de: {
        pageTitle: "Ecke für Konvertiten",
        pageDescription: "Herzlich willkommen in der Ummah! Hier findest du Ressourcen, die dir den Einstieg in den Islam erleichtern.",
        backToFeatures: "Zurück zu den Funktionen",
        cards: [
            {
                icon: BookHeart,
                title: "Die Grundlagen des Glaubens",
                description: "Verstehe die sechs Säulen des Iman (Glaube) und die fünf Säulen des Islam, die das Fundament deines neuen Lebensweges bilden.",
                buttonText: "Mehr über die Säulen",
                href: "/prophets" // Placeholder link
            },
            {
                icon: DoorOpen,
                title: "Deine ersten Schritte",
                description: "Praktische Anleitungen für deine ersten Schritte, einschließlich der Schahada (Glaubensbekenntnis) und wie man die Gebetswaschung (Wudu) und das Gebet (Salah) lernt.",
                buttonText: "Wudu & Gebet lernen",
                href: "/wudu"
            },
            {
                icon: HelpCircle,
                title: "Häufige Fragen",
                description: "Antworten auf häufige Fragen, die neue Muslime oft haben, von sozialen Aspekten bis hin zu theologischen Details. Nutze auch unseren KI-Gelehrten.",
                buttonText: "KI-Gelehrten fragen",
                href: "/insights"
            }
        ]
    },
    en: {
        pageTitle: "Revert's Corner",
        pageDescription: "Welcome to the Ummah! Here you will find resources to help you get started with Islam.",
        backToFeatures: "Back to Features",
        cards: [
            {
                icon: BookHeart,
                title: "The Foundations of Faith",
                description: "Understand the six pillars of Iman (faith) and the five pillars of Islam, which form the foundation of your new path in life.",
                buttonText: "Learn about the Pillars",
                href: "/prophets" // Placeholder link
            },
            {
                icon: DoorOpen,
                title: "Your First Steps",
                description: "Practical guidance for your first steps, including the Shahada (testimony of faith) and how to learn ablution (Wudu) and prayer (Salah).",
                buttonText: "Learn Wudu & Prayer",
                href: "/wudu"
            },
            {
                icon: HelpCircle,
                title: "Common Questions",
                description: "Answers to common questions that new Muslims often have, from social aspects to theological details. Feel free to use our AI Scholar.",
                buttonText: "Ask the AI Scholar",
                href: "/insights"
            }
        ]
    }
}


export default function RevertsCornerPage() {
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
            <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                <Handshake className="h-10 w-10" />
                {c.pageTitle}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.pageDescription}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {c.cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <Card key={index} className="flex flex-col text-center">
                        <CardHeader>
                             <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center">
                                <Icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="mt-4">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{card.description}</CardDescription>
                        </CardContent>
                        <div className="p-6 pt-0">
                             <Button asChild>
                                <Link href={card.href}>{card.buttonText}</Link>
                            </Button>
                        </div>
                    </Card>
                )
            })}
        </div>
    </div>
  );
}
