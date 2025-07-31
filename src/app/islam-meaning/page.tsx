"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Globe, Heart, BookOpen, User, Key, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Die Bedeutung des Islam",
        description: "Ein grundlegendes Verständnis der Religion des Friedens und der Hingabe an Gott.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: Globe,
                title: "Was bedeutet 'Islam'?",
                content: "Das arabische Wort 'Islam' hat zwei Hauptbedeutungen: 'Hingabe' oder 'Unterwerfung' unter den Willen des einen, einzigen Gottes (Allah) und 'Frieden', der aus dieser Hingabe resultiert. Ein Muslim ist demnach jemand, der Frieden findet, indem er sein Leben dem Willen Gottes unterwirft."
            },
            {
                icon: Heart,
                title: "Der Kern des Glaubens: Tauhid",
                content: "Das Fundament des Islam ist der Glaube an die absolute Einheit und Einzigartigkeit Allahs (Tauhid). Es gibt nur einen Schöpfer und Erhalter des Universums. Dieser Glaube befreit den Menschen von der Anbetung von Götzen, Menschen, materiellen Dingen oder dem eigenen Ego und richtet alle Anbetung allein auf Allah."
            },
            {
                icon: BookOpen,
                title: "Der Koran: Das Wort Gottes",
                content: "Die primäre Quelle der Rechtleitung für Muslime ist der Koran, der als das wörtliche Wort Allahs gilt, das dem Propheten Muhammad (ﷺ) über einen Zeitraum von 23 Jahren offenbart wurde. Er ist eine fehlerfreie und vollständige Anleitung für die gesamte Menschheit."
            },
            {
                icon: User,
                title: "Die Sunnah: Das gelebte Beispiel",
                content: "Die Sunnah bezieht sich auf die Lehren, Handlungen und Aussprüche des Propheten Muhammad (ﷺ). Sie ist die zweite primäre Quelle im Islam und dient als praktische Erklärung und Anwendung der Prinzipien des Korans im täglichen Leben."
            },
            {
                icon: Key,
                title: "Was unterscheidet den Islam?",
                content: "Obwohl der Islam die gleiche monotheistische Wurzel wie Judentum und Christentum teilt, gibt es einige Kernunterschiede: \n\n1. **Reiner Monotheismus (Tauhid):** Der Islam betont die absolute Einheit Gottes (Allah) ohne jegliche Partner, Nachkommen oder Vermittler. Die Vorstellung einer Trinität oder dass ein Mensch göttlich sein könnte, wird abgelehnt. \n2. **Direkte Beziehung zu Gott:** Im Islam gibt es keinen Klerus oder Priestertum als Mittler zwischen dem Menschen und Gott. Jeder Einzelne kann und soll direkt zu Allah beten. \n3. **Bewahrte Offenbarung:** Muslime glauben, dass der Koran das letzte, vollständige und unverfälschte Wort Gottes ist, das seit seiner Offenbarung geschützt geblieben ist. \n4. **Umfassende Lebensweise (Deen):** Der Islam ist nicht nur eine Religion der Rituale, sondern ein komplettes Lebenssystem (Deen), das detaillierte Anleitungen für alle Aspekte des Lebens bietet – von Ethik und Moral bis hin zu Recht, Wirtschaft und Politik."
            },
            {
                icon: User,
                title: "Eine vollständige Lebensweise",
                content: "Der Islam ist keine Religion, die nur an Feiertagen oder in der Moschee praktiziert wird. Er ist ein umfassendes System, das alle Aspekte des Lebens leitet – von persönlichen Moralvorstellungen und familiären Beziehungen bis hin zu sozialen, wirtschaftlichen und politischen Angelegenheiten. Er bietet eine Anleitung für ein ausgeglichenes und sinnvolles Leben."
            },
            {
                icon: Key,
                title: "Die Fortsetzung der Offenbarung",
                content: "Muslime glauben, dass der Islam keine neue Religion ist, sondern die endgültige und vervollständigte Form der Botschaft, die Allah der Menschheit seit Anbeginn durch alle Propheten – wie Adam, Nuh, Ibrahim, Musa und Isa (Friede sei mit ihnen allen) – offenbart hat. Der Prophet Muhammad (ﷺ) ist das 'Siegel der Propheten', der die letzte Offenbarung, den Koran, empfing."
            },
            {
                icon: Heart,
                title: "Das Ziel: Erfolg im Dies- und Jenseits",
                content: "Das ultimative Ziel eines Muslims ist es, das Wohlgefallen Allahs zu erlangen (Ridwanullah), was zum Erfolg in diesem Leben und zur ewigen Belohnung im Paradies (Jannah) im Jenseits führt. Dieses Leben wird als eine Prüfung betrachtet, deren Ergebnis über das ewige Schicksal entscheidet."
            }
        ]
    },
    en: {
        title: "The Meaning of Islam",
        description: "A fundamental understanding of the religion of peace and submission to God.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: Globe,
                title: "What does 'Islam' mean?",
                content: "The Arabic word 'Islam' has two main meanings: 'submission' or 'surrender' to the will of the one and only God (Allah), and 'peace,' which results from this submission. A Muslim, therefore, is one who finds peace by submitting their life to the will of God."
            },
            {
                icon: Heart,
                title: "The Core of Faith: Tawhid",
                content: "The foundation of Islam is the belief in the absolute Oneness and Uniqueness of Allah (Tawhid). There is only one Creator and Sustainer of the universe. This belief liberates a person from the worship of idols, people, material things, or their own ego, directing all worship solely to Allah."
            },
            {
                icon: BookOpen,
                title: "The Quran: The Word of God",
                content: "The primary source of guidance for Muslims is the Quran, which is considered the literal word of Allah as revealed to Prophet Muhammad (ﷺ) over a period of 23 years. It is an infallible and complete guide for all of humanity."
            },
            {
                icon: User,
                title: "The Sunnah: The Lived Example",
                content: "The Sunnah refers to the teachings, actions, and sayings of the Prophet Muhammad (ﷺ). It is the second primary source in Islam and serves as a practical explanation and application of the principles of the Quran in daily life."
            },
            {
                icon: Key,
                title: "What Distinguishes Islam?",
                content: "Although Islam shares the same monotheistic root as Judaism and Christianity, there are some key differences:\n\n1. **Pure Monotheism (Tawhid):** Islam emphasizes the absolute oneness of God (Allah) without any partners, offspring, or intermediaries. The concept of a trinity or that a human could be divine is rejected.\n2. **Direct Relationship with God:** In Islam, there is no clergy or priesthood to mediate the relationship between an individual and God. Every person can and should pray directly to Allah.\n3. **Preserved Revelation:** Muslims believe that the Quran is the final, complete, and uncorrupted word of God, which has remained protected since its revelation.\n4. **Comprehensive Way of Life (Deen):** Islam is not just a religion of rituals, but a complete system of life (Deen) that provides detailed guidance for all aspects of life – from ethics and morality to law, economics, and politics."
            },
            {
                icon: User,
                title: "A Complete Way of Life",
                content: "Islam is not a religion that is only practiced on holidays or in the mosque. It is a comprehensive system that guides all aspects of life – from personal morals and family relationships to social, economic, and political matters. It provides guidance for a balanced and meaningful life."
            },
            {
                icon: Key,
                title: "The Continuation of Revelation",
                content: "Muslims believe that Islam is not a new religion, but the final and perfected form of the message that Allah has revealed to humanity from the beginning through all the prophets – such as Adam, Nuh, Ibrahim, Musa, and Isa (peace be upon them all). The Prophet Muhammad (ﷺ) is the 'Seal of the Prophets,' who received the final revelation, the Quran."
            },
            {
                icon: Heart,
                title: "The Goal: Success in This Life and the Hereafter",
                content: "The ultimate goal of a Muslim is to attain the pleasure of Allah (Ridwanullah), which leads to success in this life and the eternal reward of Paradise (Jannah) in the hereafter. This life is considered a test, the outcome of which determines one's eternal destiny."
            }
        ]
    }
};

export default function IslamMeaningPage() {
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
                    <Globe className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-3xl mx-auto space-y-6">
                {c.sections.map((section, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="h-7 w-7 text-primary" />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-wrap">{section.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
