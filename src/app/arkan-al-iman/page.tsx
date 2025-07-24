
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Book, Users, Mail, GanttChartSquare, Milestone, Scale, ArrowLeft, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Die 6 Säulen des Iman (Glaube)",
        description: "Die sechs Glaubensartikel sind die fundamentalen Überzeugungen eines Muslims, die das Fundament seiner Weltanschauung bilden.",
        backToFeatures: "Zurück zu den Funktionen",
        memorize: "Lernen",
        pillars: [
            {
                icon: Milestone,
                title: "Glaube an Allah",
                arabic: "الإيمان بالله",
                content: "Der Glaube an den einen, einzigen Gott, der keinen Partner oder Sohn hat. Er ist der Schöpfer und Erhalter des Universums, der Allmächtige, Allwissende und Allbarmherzige. Dieser Glaube (Tauhid) ist der Kern des Islam."
            },
            {
                icon: Users,
                title: "Glaube an die Engel (Mala'ikah)",
                arabic: "الإيمان بالملائكة",
                content: "Der Glaube an die Engel als Diener Allahs, die aus Licht erschaffen wurden. Sie haben keinen eigenen Willen und führen Allahs Befehle ohne Zögern aus. Beispiele sind Jibril (Gabriel), der die Offenbarungen überbrachte, und Mikail (Michael), der für den Regen zuständig ist."
            },
            {
                icon: Book,
                title: "Glaube an die offenbarten Schriften (Kutub)",
                arabic: "الإيمان بالكتب",
                content: "Der Glaube an die heiligen Bücher, die Allah Seinen Propheten offenbart hat, einschließlich der Thora (an Musa), des Zabur (an Dawud), des Indschil (an Isa) und als letzte und vollständigste Offenbarung, des Korans (an Muhammad ﷺ)."
            },
            {
                icon: Mail,
                title: "Glaube an die Gesandten (Rusul)",
                arabic: "الإيمان بالرسل",
                content: "Der Glaube an alle Propheten und Gesandten, die Allah zur Rechtleitung der Menschheit geschickt hat, von Adam bis zum letzten Propheten, Muhammad (ﷺ). Muslime müssen alle Propheten ehren und respektieren, ohne zwischen ihnen zu unterscheiden."
            },
            {
                icon: GanttChartSquare,
                title: "Glaube an den Tag des Jüngsten Gerichts (Yawm al-Qiyamah)",
                arabic: "الإيمان باليوم الآخر",
                content: "Der Glaube daran, dass dieses weltliche Leben eine Prüfung ist und dass ein Tag kommen wird, an dem alle Menschen von Allah wiederauferweckt werden, um für ihre Taten zur Rechenschaft gezogen zu werden. Das Ergebnis ist ewige Belohnung im Paradies oder Bestrafung in der Hölle."
            },
            {
                icon: Scale,
                title: "Glaube an die Vorherbestimmung (Qadr)",
                arabic: "الإيمان بالقدر",
                content: "Der Glaube daran, dass alles, was geschieht, ob gut oder schlecht, mit Allahs Wissen und Seinem Willen geschieht. Dies bedeutet nicht, dass der Mensch keinen freien Willen hat. Vielmehr hat der Mensch die Freiheit zu wählen, aber das Ergebnis und die Umstände unterliegen Allahs allumfassendem Plan."
            }
        ]
    },
    en: {
        title: "The 6 Pillars of Iman (Faith)",
        description: "The six articles of faith are the fundamental beliefs of a Muslim, forming the foundation of their worldview.",
        backToFeatures: "Back to Features",
        memorize: "Memorize",
        pillars: [
            {
                icon: Milestone,
                title: "Belief in Allah",
                arabic: "Al-Iman billah",
                content: "The belief in the one and only God, who has no partner or son. He is the Creator and Sustainer of the universe, the Almighty, the All-Knowing, and the All-Merciful. This belief (Tawhid) is the core of Islam."
            },
            {
                icon: Users,
                title: "Belief in the Angels (Mala'ikah)",
                arabic: "Al-Iman bil-Mala'ikah",
                content: "The belief in angels as servants of Allah, created from light. They have no free will and carry out Allah's commands without hesitation. Examples include Jibril (Gabriel), who delivered the revelations, and Mikail (Michael), who is in charge of rain."
            },
            {
                icon: Book,
                title: "Belief in the Revealed Scriptures (Kutub)",
                arabic: "Al-Iman bil-Kutub",
                content: "The belief in the holy books that Allah revealed to His prophets, including the Torah (to Musa), the Zabur (to Dawud), the Injeel (to Isa), and as the final and most complete revelation, the Quran (to Muhammad ﷺ)."
            },
            {
                icon: Mail,
                title: "Belief in the Messengers (Rusul)",
                arabic: "Al-Iman bir-Rusul",
                content: "The belief in all the prophets and messengers sent by Allah for the guidance of humanity, from Adam to the final prophet, Muhammad (ﷺ). Muslims must honor and respect all prophets without making any distinction between them."
            },
            {
                icon: GanttChartSquare,
                title: "Belief in the Day of Judgment (Yawm al-Qiyamah)",
                arabic: "Al-Iman bil-Yawm al-Akhir",
                content: "The belief that this worldly life is a test and that a day will come when all people will be resurrected by Allah to be held accountable for their deeds. The result is eternal reward in Paradise or punishment in Hell."
            },
            {
                icon: Scale,
                title: "Belief in Divine Decree (Qadr)",
                arabic: "Al-Iman bil-Qadar",
                content: "The belief that everything that happens, whether good or bad, occurs with Allah's knowledge and will. This does not mean that humans do not have free will. Rather, humans have the freedom to choose, but the outcome and circumstances are subject to Allah's all-encompassing plan."
            }
        ]
    }
};

export default function ArkanAlImanPage() {
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
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {c.pillars.map((pillar, index) => (
                    <Card key={index} className="flex flex-col text-center">
                         <CardHeader>
                             <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center">
                                <pillar.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="mt-4">{pillar.title}</CardTitle>
                            <CardDescription className="font-quranic text-lg">{pillar.arabic}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <p className="text-muted-foreground">{pillar.content}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" size="sm" asChild className="w-full">
                                <Link href={{ pathname: '/memorization', query: { text: `${pillar.title}\n${pillar.arabic}` } }}>
                                    <BrainCircuit className="mr-2 h-4 w-4" />
                                    {c.memorize}
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
