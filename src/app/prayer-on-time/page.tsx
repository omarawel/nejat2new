
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Clock, CheckCircle, Shield, Heart, Sparkles, Lightbulb, TrendingDown, Users, Home, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Das Gebet pünktlich verrichten",
        description: "Die Bedeutung, der Nutzen und praktische Tipps, um das Gebet zur richtigen Zeit zu verrichten.",
        backToFeatures: "Zurück zu den Funktionen",
        importance: {
            title: "Die höchste Priorität",
            content: "Das Gebet (Salah) ist die zweite Säule des Islam und die wichtigste Verbindung zwischen einem Muslim und seinem Schöpfer. Allah fragt uns am Tag des Jüngsten Gerichts als Erstes nach unserem Gebet. Der Prophet (ﷺ) wurde gefragt, welche Tat die beste sei, und er antwortete: „Das Gebet zu seiner festgesetzten Zeit.“ (Bukhari). Es ist mehr als eine Pflicht; es ist eine Gelegenheit zur Ruhe, Reflexion und spirituellen Aufladung fünfmal am Tag."
        },
        benefits: {
            title: "Der Nutzen des pünktlichen Gebets",
            items: [
                { icon: CheckCircle, text: "Erlangung von Allahs Wohlgefallen und Liebe." },
                { icon: Shield, text: "Schutz vor Sünden und Schamlosigkeit (Sure 29:45)." },
                { icon: Heart, text: "Frieden und Ruhe für Herz und Seele." },
                { icon: Sparkles, text: "Bringt Segen (Barakah) in die Zeit und den Alltag." },
                { icon: Lightbulb, text: "Ist ein Licht (Nur) für den Gläubigen an Tag des Jüngsten Gerichts." },
                { icon: Clock, text: "Strukturiert den Tag und schafft Disziplin im Leben eines Muslims." }
            ]
        },
        consequences: {
            title: "Die Konsequenzen der Verzögerung",
            content: "Das bewusste und regelmäßige Vernachlässigen oder Verzögern des Gebets ist eine ernste Angelegenheit. Allah warnt im Koran: 'Wehe den Betenden, die auf ihre Gebete nicht achten' (Sure 107:4-5). Das ständige Aufschieben des Gebets bis zum Ende seiner Zeitspanne ohne gültigen Grund wird als eine Eigenschaft der Heuchler (Munafiqun) beschrieben. Es schwächt die spirituelle Verbindung zu Allah und öffnet Türen für die Einflüsterungen des Schaytan."
        },
        tips: {
            title: "Praktische Tipps",
            items: [
                { icon: BookOpen, text: "Verstehe die Bedeutung: Erinnere dich ständig daran, warum du betest und für Wen. Lerne die Bedeutung dessen, was du rezitierst." },
                { icon: Clock, text: "Setze Erinnerungen: Nutze Gebets-Apps oder Wecker, die dich kurz vor der Gebetszeit erinnern." },
                { icon: Home, text: "Bereite dich vor: Halte deine Gebetskleidung und deinen Gebetsplatz sauber und bereit. Verrichte Wudu, sobald die Zeit eintritt." },
                { icon: Shield, text: "Vermeide Aufschub: Erledige das Gebet sofort, wenn die Zeit beginnt. Sage dir: „Nur 5 Minuten für meinen Schöpfer.“" },
                { icon: Users, text: "Suche gute Gesellschaft: Umgib dich mit Freunden, die dich ebenfalls an das Gebet erinnern, und bete, wenn möglich, in der Gemeinschaft." },
                { icon: Heart, text: "Mache Dua: Bitte Allah um Hilfe, standhaft und pünktlich im Gebet zu sein." }
            ]
        }
    },
    en: {
        title: "Praying on Time",
        description: "The importance, benefits, and practical tips for performing the prayer at its proper time.",
        backToFeatures: "Back to Features",
        importance: {
            title: "The Highest Priority",
            content: "Prayer (Salah) is the second pillar of Islam and the most important connection between a Muslim and their Creator. The first thing we will be asked about on the Day of Judgment is our prayer. The Prophet (ﷺ) was asked which deed is the best, and he replied, 'Prayer at its fixed time.' (Bukhari). It is more than a duty; it is an opportunity for rest, reflection, and spiritual recharge five times a day."
        },
        benefits: {
            title: "The Benefits of Praying on Time",
            items: [
                { icon: CheckCircle, text: "Gaining Allah's pleasure and love." },
                { icon: Shield, text: "Protection from sins and indecency (Surah 29:45)." },
                { icon: Heart, text: "Peace and tranquility for the heart and soul." },
                { icon: Sparkles, text: "Brings blessings (Barakah) into one's time and daily life." },
                { icon: Lightbulb, text: "Will be a light (Nur) for the believer on the Day of Judgment." },
                { icon: Clock, text: "Structures the day and creates discipline in a Muslim's life." }
            ]
        },
        consequences: {
            title: "The Consequences of Delay",
            content: "Deliberately and regularly neglecting or delaying the prayer is a serious matter. Allah warns in the Quran: 'So woe to those who pray, [but] who are heedless of their prayer' (Surah 107:4-5). Constantly postponing the prayer until the end of its time without a valid reason is described as a characteristic of the hypocrites (Munafiqun). It weakens the spiritual connection to Allah and opens doors to the whispers of Shaytan."
        },
        tips: {
            title: "Practical Tips",
            items: [
                { icon: BookOpen, text: "Understand the 'Why': Constantly remind yourself why you pray and for Whom. Learn the meaning of what you recite." },
                { icon: Clock, text: "Set Reminders: Use prayer apps or alarms that remind you shortly before the prayer time." },
                { icon: Home, text: "Prepare in Advance: Keep your prayer clothes and prayer space clean and ready. Perform Wudu as soon as the time enters." },
                { icon: Shield, text: "Avoid Procrastination: Perform the prayer as soon as the time begins. Tell yourself: 'Just 5 minutes for my Creator.'" },
                { icon: Users, text: "Seek Good Company: Surround yourself with friends who also remind you of prayer, and pray in congregation whenever possible." },
                { icon: Heart, text: "Make Dua: Ask Allah for help to be steadfast and punctual in your prayers." }
            ]
        }
    }
};

export default function PrayerOnTimePage() {
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
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="bg-primary/5">
                    <CardHeader>
                        <CardTitle>{c.importance.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{c.importance.content}</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>{c.benefits.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {c.benefits.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <item.icon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Lightbulb className="h-7 w-7 text-amber-500" />
                           {c.tips.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4">
                            {c.tips.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <item.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-destructive/50 bg-destructive/10">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-3 text-destructive">
                            <TrendingDown className="h-7 w-7" />
                           {c.consequences.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive/90">{c.consequences.content}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

    

    