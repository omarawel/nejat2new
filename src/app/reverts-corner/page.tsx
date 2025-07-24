
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, BookHeart, DoorOpen, HelpCircle, ArrowLeft, Star, Users, Droplets } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

const content = {
    de: {
        pageTitle: "Ecke für Konvertiten",
        description: "Herzlich willkommen in der Ummah! Hier findest du Ressourcen und Anleitungen, die dir den Einstieg in den Islam erleichtern.",
        backToFeatures: "Zurück zu den Funktionen",
        cards: [
            {
                icon: Star,
                title: "Die Schahada (Glaubensbekenntnis)",
                description: "Der erste und wichtigste Schritt. Lerne die Bedeutung und Aussprache des Bekenntnisses, das dich zum Muslim macht: 'Aschhadu an la ilaha illallah, wa aschhadu anna Muhammadan abduhu wa rasuluh.'",
                buttonText: "Mehr erfahren",
                href: "/arkan-al-islam"
            },
            {
                icon: BookHeart,
                title: "Die 5 Säulen des Islam",
                description: "Die fünf Säulen sind das Fundament der gottesdienstlichen Handlungen eines Muslims. Lerne ihre Bedeutung und wie sie praktiziert werden.",
                buttonText: "Zu den Säulen des Islam",
                href: "/arkan-al-islam"
            },
            {
                icon: BookHeart,
                title: "Die 6 Säulen des Iman",
                description: "Die sechs Glaubensartikel sind die grundlegenden Überzeugungen, die das Weltbild eines Muslims formen. Vertiefe dein Verständnis über Allah, die Engel, die Bücher, die Gesandten, den Jüngsten Tag und die Vorherbestimmung.",
                buttonText: "Zu den Säulen des Iman",
                href: "/arkan-al-iman"
            },
            {
                icon: Droplets,
                title: "Das Gebet lernen (Salah)",
                description: "Das Gebet ist die direkte Verbindung zu Allah. Der erste Schritt ist die rituelle Waschung (Wudu). Hier findest du eine einfache Anleitung.",
                buttonText: "Wudu lernen",
                href: "/wudu"
            },
            {
                icon: Users,
                title: "Eine Gemeinschaft finden",
                description: "Der Islam ist eine Gemeinschaft. Der Besuch einer lokalen Moschee kann dir helfen, andere Muslime kennenzulernen, Fragen zu stellen und Unterstützung zu finden.",
                buttonText: "Moscheefinder nutzen",
                href: "/mosque-finder"
            },
            {
                icon: HelpCircle,
                title: "Häufige Fragen",
                description: "Du hast sicher viele Fragen. Nutze unseren KI-Gelehrten, um Antworten zu finden, oder durchstöbere unsere Themen.",
                buttonText: "KI-Gelehrten fragen",
                href: "/insights"
            }
        ]
    },
    en: {
        pageTitle: "Revert's Corner",
        pageDescription: "Welcome to the Ummah! Here you'll find resources and guidance to help you on your journey into Islam.",
        backToFeatures: "Back to Features",
        cards: [
            {
                icon: Star,
                title: "The Shahada (Testimony of Faith)",
                description: "The first and most important step. Learn the meaning and pronunciation of the testimony that makes you a Muslim: 'Ashhadu an la ilaha illallah, wa ashhadu anna Muhammadan abduhu wa rasuluh.'",
                buttonText: "Learn More",
                href: "/arkan-al-islam"
            },
            {
                icon: BookHeart,
                title: "The 5 Pillars of Islam",
                description: "The five pillars are the foundation of a Muslim's acts of worship. Learn their meaning and how they are practiced.",
                buttonText: "To the Pillars of Islam",
                href: "/arkan-al-islam"
            },
             {
                icon: BookHeart,
                title: "The 6 Pillars of Iman",
                description: "The six articles of faith are the fundamental beliefs that shape a Muslim's worldview. Deepen your understanding of Allah, the angels, the books, the messengers, the Last Day, and divine decree.",
                buttonText: "To the Pillars of Iman",
                href: "/arkan-al-iman"
            },
            {
                icon: Droplets,
                title: "Learning to Pray (Salah)",
                description: "Prayer is the direct connection to Allah. The first step is the ritual ablution (Wudu). Here you will find a simple guide.",
                buttonText: "Learn Wudu",
                href: "/wudu"
            },
            {
                icon: Users,
                title: "Finding a Community",
                description: "Islam is a community. Visiting a local mosque can help you meet other Muslims, ask questions, and find support.",
                buttonText: "Use Mosque Finder",
                href: "/mosque-finder"
            },
            {
                icon: HelpCircle,
                title: "Common Questions",
                description: "You surely have many questions. Use our AI Scholar to find answers, or browse our topics.",
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
                
                {c.pageTitle}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.pageDescription}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {c.cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <Card key={index} className="flex flex-col text-center">
                        <CardHeader>
                             
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
