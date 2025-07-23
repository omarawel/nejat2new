
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Hand, Landmark, Star, Moon, Plane, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Die 5 Säulen des Islam",
        description: "Die fünf Säulen des Islam sind die grundlegenden gottesdienstlichen Handlungen, die für jeden Muslim verpflichtend sind.",
        backToFeatures: "Zurück zu den Funktionen",
        pillars: [
            {
                icon: Hand,
                title: "Schahada (Glaubensbekenntnis)",
                content: "Das Bekenntnis, dass es keine Gottheit außer Allah gibt und dass Muhammad Sein Gesandter ist. Es ist der Schlüssel zum Islam und muss mit Aufrichtigkeit und Überzeugung ausgesprochen werden."
            },
            {
                icon: Landmark,
                title: "Salah (Gebet)",
                content: "Die fünf täglichen Pflichtgebete, die zu bestimmten Zeiten verrichtet werden. Sie sind die direkte Verbindung zwischen dem Diener und seinem Herrn und ein Mittel zur spirituellen Reinigung und Besinnung."
            },
            {
                icon: Star,
                title: "Zakat (Pflichtabgabe)",
                content: "Die jährliche Abgabe von 2,5% des eigenen Vermögens, das einen bestimmten Schwellenwert (Nisab) überschreitet. Sie dient der Reinigung des Besitzes und der Unterstützung der Armen und Bedürftigen."
            },
            {
                icon: Moon,
                title: "Sawm (Fasten im Ramadan)",
                content: "Das Fasten von der Morgendämmerung bis zum Sonnenuntergang während des gesamten Monats Ramadan. Es ist eine Zeit der Geduld, der Selbstbeherrschung, der Empathie und der verstärkten Anbetung."
            },
            {
                icon: Plane,
                title: "Haddsch (Pilgerfahrt)",
                content: "Die Pilgerfahrt nach Mekka, die jeder Muslim, der körperlich und finanziell dazu in der Lage ist, mindestens einmal im Leben unternehmen sollte. Sie ist ein Symbol der Einheit und Gleichheit aller Muslime."
            }
        ]
    },
    en: {
        title: "The 5 Pillars of Islam",
        description: "The five pillars of Islam are the fundamental acts of worship that are obligatory for every Muslim.",
        backToFeatures: "Back to Features",
        pillars: [
            {
                icon: Hand,
                title: "Shahada (Testimony of Faith)",
                content: "The declaration that there is no deity but Allah and that Muhammad is His Messenger. It is the key to Islam and must be uttered with sincerity and conviction."
            },
            {
                icon: Landmark,
                title: "Salah (Prayer)",
                content: "The five daily obligatory prayers performed at specific times. They are the direct connection between the servant and their Lord and a means of spiritual purification and reflection."
            },
            {
                icon: Star,
                title: "Zakat (Obligatory Charity)",
                content: "The annual levy of 2.5% on one's wealth that exceeds a certain threshold (Nisab). It serves to purify one's possessions and to support the poor and needy."
            },
            {
                icon: Moon,
                title: "Sawm (Fasting in Ramadan)",
                content: "Fasting from dawn to sunset throughout the entire month of Ramadan. It is a time of patience, self-control, empathy, and increased worship."
            },
            {
                icon: Plane,
                title: "Hajj (Pilgrimage)",
                content: "The pilgrimage to Mecca, which every Muslim who is physically and financially able should undertake at least once in their lifetime. It is a symbol of the unity and equality of all Muslims."
            }
        ]
    }
};

export default function ArkanAlIslamPage() {
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
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {c.pillars.map((pillar, index) => (
                    <Card key={index} className="flex flex-col text-center">
                         <CardHeader>
                             <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center">
                                <pillar.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="mt-4">{pillar.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <p className="text-muted-foreground">{pillar.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
