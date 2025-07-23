
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Scale, Bridge, Cross, Smile, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Das Jenseits (Al-Akhirah)",
        description: "Ein Einblick in die islamische Vorstellung vom Leben nach dem Tod, dem Tag des Jüngsten Gerichts und dem endgültigen Bestimmungsort.",
        backToFeatures: "Zurück zu den Funktionen",
        stages: [
            {
                icon: Shield,
                title: "Das Leben im Grab (Barzakh)",
                content: "Nach dem Tod tritt die Seele in eine Zwischenwelt namens Barzakh ein, die bis zum Tag der Auferstehung andauert. Im Grab wird jeder Mensch von den Engeln Munkar und Nakir befragt über seinen Herrn, seine Religion und seinen Propheten. Für die Gläubigen wird das Grab ein friedlicher und weiter Ort, ein Vorgeschmack auf das Paradies. Für die Ungläubigen wird es ein enger und schrecklicher Ort, ein Vorgeschmack auf die Hölle."
            },
            {
                icon: Scale,
                title: "Der Tag des Jüngsten Gerichts (Yawm al-Qiyamah)",
                content: "An diesem gewaltigen Tag werden alle Menschen von Allah wiederauferweckt. Die Sonne wird nahe rücken, und die Menschen werden für ihre Taten zur Rechenschaft gezogen. Jedem wird sein Buch der Taten gegeben, entweder in die rechte Hand (Zeichen des Erfolgs) oder in die linke (Zeichen des Verlustes). Die Waage (Mizan) wird aufgestellt, um die guten und schlechten Taten abzuwägen."
            },
            {
                icon: Bridge,
                title: "Die Brücke (As-Sirat)",
                content: "Nach der Abrechnung müssen alle Menschen eine Brücke überqueren, die über die Hölle gespannt ist. Für die Gläubigen wird diese Überquerung je nach ihren Taten leicht und schnell sein – einige werden sie mit der Geschwindigkeit eines Blitzes überqueren. Für die Ungläubigen und Sünder wird die Brücke schärfer als ein Schwert und dünner als ein Haar sein, und viele werden von ihr in die Tiefen der Hölle stürzen."
            },
            {
                icon: Smile,
                title: "Das Paradies (Jannah)",
                content: "Jannah ist der ewige Wohnort der Gläubigen, ein Ort unvorstellbarer Schönheit, des Friedens und des Glücks. Es gibt dort keine Krankheit, keinen Schmerz, keinen Tod und keine Sorgen. Die Bewohner des Paradieses werden alles haben, was ihre Herzen begehren, und ihre größte Freude wird es sein, das Angesicht Allahs zu sehen. Es gibt verschiedene Stufen des Paradieses, wobei die höchste Stufe Firdaws ist."
            },
            {
                icon: Cross,
                title: "Die Hölle (Jahannam)",
                content: "Jahannam ist der Ort der ewigen Bestrafung für diejenigen, die Allah verleugnet und Seine Gebote missachtet haben. Es ist ein Ort des unvorstellbaren Leidens, mit loderndem Feuer, kochendem Wasser und bitterer Nahrung. Es ist eine Manifestation des Zorns Allahs über die Ungläubigen. Möge Allah uns davor bewahren."
            }
        ]
    },
    en: {
        title: "The Hereafter (Al-Akhirah)",
        description: "An insight into the Islamic conception of life after death, the Day of Judgment, and the final destination.",
        backToFeatures: "Back to Features",
        stages: [
            {
                icon: Shield,
                title: "Life in the Grave (Barzakh)",
                content: "After death, the soul enters an intermediate world called Barzakh, which lasts until the Day of Resurrection. In the grave, every person will be questioned by the angels Munkar and Nakir about their Lord, their religion, and their prophet. For the believers, the grave will be a peaceful and spacious place, a foretaste of Paradise. For the disbelievers, it will be a narrow and terrible place, a foretaste of Hell."
            },
            {
                icon: Scale,
                title: "The Day of Judgment (Yawm al-Qiyamah)",
                content: "On this tremendous day, all people will be resurrected by Allah. The sun will draw near, and people will be held accountable for their deeds. Everyone will be given their book of deeds, either in their right hand (a sign of success) or in their left (a sign of loss). The scale (Mizan) will be set up to weigh the good and bad deeds."
            },
            {
                icon: Bridge,
                title: "The Bridge (As-Sirat)",
                content: "After the reckoning, all people must cross a bridge that is spanned over Hell. For the believers, this crossing will be easy and swift, depending on their deeds—some will cross it with the speed of lightning. For the disbelievers and sinners, the bridge will be sharper than a sword and thinner than a hair, and many will fall from it into the depths of Hell."
            },
            {
                icon: Smile,
                title: "Paradise (Jannah)",
                content: "Jannah is the eternal abode of the believers, a place of unimaginable beauty, peace, and happiness. There is no sickness, no pain, no death, and no sorrow. The inhabitants of Paradise will have everything their hearts desire, and their greatest joy will be to see the face of Allah. There are different levels of Paradise, with the highest level being Firdaws."
            },
            {
                icon: Cross,
                title: "Hell (Jahannam)",
                content: "Jahannam is the place of eternal punishment for those who denied Allah and disobeyed His commandments. It is a place of unimaginable suffering, with blazing fire, boiling water, and bitter food. It is a manifestation of Allah's wrath upon the disbelievers. May Allah protect us from it."
            }
        ]
    }
};

export default function HereafterPage() {
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
            
            <div className="max-w-3xl mx-auto space-y-6">
                {c.stages.map((stage, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <stage.icon className="h-7 w-7 text-primary" />
                                <span>{stage.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{stage.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
