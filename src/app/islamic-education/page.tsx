
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { GraduationCap, BookHeart, Heart, Brain, Lightbulb, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Islamische Erziehung (Tarbiyah)",
        description: "Prinzipien und Ratschläge für die Erziehung von Kindern im Licht des Korans und der Sunnah.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: BookHeart,
                title: "Grundlagen des Glaubens vermitteln (Aqidah)",
                content: "Die wichtigste Aufgabe ist es, Kindern von klein auf die Liebe zu Allah und Seinem Gesandten (ﷺ) zu vermitteln. Lehre sie die Grundlagen des Tauhid (Einzigartigkeit Allahs), die Bedeutung von 'La ilaha illallah' und die Namen und Eigenschaften Allahs auf eine einfache und liebevolle Weise."
            },
            {
                icon: Heart,
                title: "Charakterbildung (Akhlaq)",
                content: "Die Erziehung zielt darauf ab, einen rechtschaffenen Charakter zu formen. Lebe die islamischen Tugenden wie Ehrlichkeit, Barmherzigkeit, Geduld, Dankbarkeit und Respekt vor. Kinder lernen am besten durch das Vorbild ihrer Eltern. Erzähle ihnen Geschichten über den vorbildlichen Charakter des Propheten Muhammad (ﷺ)."
            },
            {
                icon: Brain,
                title: "Wissen und Anbetung (Ilm & Ibadah)",
                content: "Bringe Kindern schrittweise das Gebet (Salah), das Fasten und andere gottesdienstliche Handlungen bei. Mache es zu einer positiven und freudigen Erfahrung. Fördere ihre Liebe zum Koran, indem ihr ihn gemeinsam lest und über seine Bedeutungen sprecht. Ermutige sie, nützliches Wissen in allen Lebensbereichen zu suchen."
            },
            {
                icon: Lightbulb,
                title: "Kritisches Denken fördern",
                content: "Ermutige Kinder, Fragen zu stellen und über die Schöpfung Allahs nachzudenken (Tafakkur). Eine Erziehung, die auf Verständnis statt auf blindem Befolgen basiert, schafft einen stärkeren und beständigeren Glauben. Gib ihnen Raum, ihre eigenen Überzeugungen zu entwickeln und zu festigen."
            },
            {
                icon: Users,
                title: "Soziale Verantwortung",
                content: "Lehre Kinder die Bedeutung der Gemeinschaft (Ummah), der Rechte der Nachbarn, des Respekts vor Älteren und der Freundlichkeit gegenüber allen Geschöpfen. Beziehe sie in wohltätige Aktivitäten ein, um Empathie und ein Gefühl der Verantwortung für andere zu entwickeln."
            }
        ],
        quote: {
            text: "Der Prophet (ﷺ) sagte: „Kein Vater kann seinem Kind ein besseres Geschenk machen als eine gute Erziehung.“",
            source: "(Tirmidhi)"
        }
    },
    en: {
        title: "Islamic Education (Tarbiyah)",
        description: "Principles and advice for raising children in the light of the Quran and Sunnah.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: BookHeart,
                title: "Teaching the Foundations of Faith (Aqidah)",
                content: "The most important task is to instill in children from an early age the love for Allah and His Messenger (ﷺ). Teach them the basics of Tawhid (the Oneness of Allah), the meaning of 'La ilaha illallah', and the names and attributes of Allah in a simple and loving way."
            },
            {
                icon: Heart,
                title: "Character Building (Akhlaq)",
                content: "Education aims to form a righteous character. Live the Islamic virtues such as honesty, mercy, patience, gratitude, and respect. Children learn best from the example of their parents. Tell them stories about the exemplary character of the Prophet Muhammad (ﷺ)."
            },
            {
                icon: Brain,
                title: "Knowledge and Worship (Ilm & Ibadah)",
                content: "Gradually teach children prayer (Salah), fasting, and other acts of worship. Make it a positive and joyful experience. Foster their love for the Quran by reading it together and discussing its meanings. Encourage them to seek useful knowledge in all areas of life."
            },
            {
                icon: Lightbulb,
                title: "Fostering Critical Thinking",
                content: " encourage children to ask questions and to reflect on Allah's creation (Tafakkur). An education based on understanding rather than blind obedience creates a stronger and more lasting faith. Give them space to develop and solidify their own convictions."
            },
            {
                icon: Users,
                title: "Social Responsibility",
                content: "Teach children the importance of the community (Ummah), the rights of neighbors, respect for elders, and kindness to all creatures. Involve them in charitable activities to develop empathy and a sense of responsibility for others."
            }
        ],
        quote: {
            text: "The Prophet (ﷺ) said: 'No father can give a better gift to his child than good upbringing.'",
            source: "(Tirmidhi)"
        }
    }
};

export default function IslamicEducationPage() {
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
                    <GraduationCap className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-6">
                {c.sections.map((section, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="h-7 w-7 text-primary" />
                                <span>{section.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{section.content}</p>
                        </CardContent>
                    </Card>
                ))}
                 <Card className="bg-accent/20 border-accent">
                    <CardContent className="p-6 text-center">
                        <blockquote className="text-lg italic text-foreground/80">
                           "{c.quote.text}"
                           <footer className="text-sm not-italic text-muted-foreground mt-2">{c.quote.source}</footer>
                        </blockquote>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
