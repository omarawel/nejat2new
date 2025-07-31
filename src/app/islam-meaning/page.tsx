
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
                title: "Der Sinn des Lebens",
                content: "Im Islam ist der Sinn des Lebens klar definiert: Allah zu dienen und anzubeten ('Ibadah'). Dies umfasst nicht nur rituelle Handlungen wie das Gebet, sondern jede gute Tat, die mit der Absicht verrichtet wird, Allah zu gefallen – sei es Ehrlichkeit im Geschäft, Freundlichkeit zu den Eltern oder der Schutz der Umwelt."
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
                title: "The Purpose of Life",
                content: "In Islam, the purpose of life is clearly defined: to serve and worship Allah ('Ibadah'). This includes not only ritual acts like prayer but every good deed done with the intention of pleasing Allah – whether it's honesty in business, kindness to parents, or protecting the environment."
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
                            <p className="text-muted-foreground">{section.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
