
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Die Islamischen Monate",
        description: "Der islamische Kalender ist ein Mondkalender, bestehend aus 12 Monaten in einem Jahr von 354 oder 355 Tagen.",
        backToFeatures: "Zurück zu den Funktionen",
        months: [
            { name: "Muharram", significance: "Der erste Monat und einer der vier heiligen Monate. Freiwilliges Fasten am 10. Tag (Aschura) wird empfohlen." },
            { name: "Safar", significance: "Der zweite Monat, oft fälschlicherweise mit Unglück in Verbindung gebracht, was im Islam keinen Grund hat." },
            { name: "Rabi' al-Awwal", significance: "Der dritte Monat, in dem der Prophet Muhammad (ﷺ) geboren wurde." },
            { name: "Rabi' al-Thani", significance: "Der vierte Monat, auch Rabi' al-Akhir genannt." },
            { name: "Jumada al-Ula", significance: "Der fünfte Monat des islamischen Kalenders." },
            { name: "Jumada al-Akhirah", significance: "Der sechste Monat, auch Jumada al-Thani genannt." },
            { name: "Rajab", significance: "Der siebte Monat, ebenfalls einer der vier heiligen Monate. Die Isra und Mi'raj (Nachtreise und Himmelfahrt des Propheten) fanden in diesem Monat statt." },
            { name: "Sha'ban", significance: "Der achte Monat. Der Prophet (ﷺ) pflegte in diesem Monat vermehrt freiwillig zu fasten, als Vorbereitung auf den Ramadan." },
            { name: "Ramadan", significance: "Der neunte und heiligste Monat. Muslime fasten von der Morgendämmerung bis zum Sonnenuntergang. In diesem Monat wurde der Koran herabgesandt." },
            { name: "Shawwal", significance: "Der zehnte Monat. Der erste Tag ist Eid al-Fitr, das Fest des Fastenbrechens. Es wird empfohlen, sechs Tage in diesem Monat zu fasten." },
            { name: "Dhu al-Qi'dah", significance: "Der elfte Monat und einer der vier heiligen Monate." },
            { name: "Dhu al-Hijjah", significance: "Der zwölfte und letzte Monat. In ihm finden die Hajj (Pilgerfahrt nach Mekka) und das Eid al-Adha (Opferfest) statt. Die ersten zehn Tage sind besonders gesegnet." }
        ]
    },
    en: {
        title: "The Islamic Months",
        description: "The Islamic calendar is a lunar calendar consisting of 12 months in a year of 354 or 355 days.",
        backToFeatures: "Back to Features",
        months: [
            { name: "Muharram", significance: "The first month and one of the four sacred months. Voluntary fasting on the 10th day (Ashura) is recommended." },
            { name: "Safar", significance: "The second month, often mistakenly associated with misfortune, which has no basis in Islam." },
            { name: "Rabi' al-Awwal", significance: "The third month, in which the Prophet Muhammad (ﷺ) was born." },
            { name: "Rabi' al-Thani", significance: "The fourth month, also called Rabi' al-Akhir." },
            { name: "Jumada al-Ula", significance: "The fifth month of the Islamic calendar." },
            { name: "Jumada al-Akhirah", significance: "The sixth month, also called Jumada al-Thani." },
            { name: "Rajab", significance: "The seventh month, also one of the four sacred months. The Isra and Mi'raj (Night Journey and Ascension of the Prophet) took place in this month." },
            { name: "Sha'ban", significance: "The eighth month. The Prophet (ﷺ) used to fast more voluntarily in this month in preparation for Ramadan." },
            { name: "Ramadan", significance: "The ninth and most sacred month. Muslims fast from dawn to sunset. The Quran was sent down in this month." },
            { name: "Shawwal", significance: "The tenth month. The first day is Eid al-Fitr, the festival of breaking the fast. It is recommended to fast for six days in this month." },
            { name: "Dhu al-Qi'dah", significance: "The eleventh month and one of the four sacred months." },
            { name: "Dhu al-Hijjah", significance: "The twelfth and final month. The Hajj (pilgrimage to Mecca) and Eid al-Adha (Festival of Sacrifice) take place in it. The first ten days are particularly blessed." }
        ]
    }
};

export default function IslamicMonthsPage() {
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
            
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {c.months.map((month, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle><span className="text-primary font-bold mr-2">{index + 1}.</span>{month.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{month.significance}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
