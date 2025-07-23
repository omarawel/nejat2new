
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Mosque, Bath, BookOpen, Clock, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const contentData = {
    de: {
        title: "Das Freitagsgebet (Jumu'ah)",
        description: "Ein Leitfaden zu den Vorzügen, Regeln und der Etikette des wichtigsten wöchentlichen Gebets im Islam.",
        backToFeatures: "Zurück zu den Funktionen",
        importance: {
            title: "Die Bedeutung des Jumu'ah",
            content: "Der Freitag ist der beste Tag der Woche. Das Jumu'ah-Gebet ist eine gemeinschaftliche Pflicht (Fard al-Ayn) für alle volljährigen, gesunden und ansässigen muslimischen Männer. Allah sagt im Koran: „O die ihr glaubt, wenn zum Gebet gerufen wird am Freitag, dann eilt zum Gedenken Allahs und lasst das Kaufgeschäft. Das ist besser für euch, wenn ihr wisst.“ (Sure Al-Jumu'ah, 62:9)."
        },
        sunnah_acts: {
            title: "Empfohlene Handlungen (Sunnah) am Freitag",
            items: [
                "Ganzkörperwaschung (Ghusl) vor dem Gebet.",
                "Die beste, saubere Kleidung anziehen und Parfüm (alkoholfrei) verwenden.",
                "Früh zur Moschee gehen, um einen größeren Lohn zu erlangen.",
                "Die Sura Al-Kahf (Kapitel 18) rezitieren."
            ]
        },
        etiquette: {
            title: "Etikette in der Moschee",
            items: [
                "Verrichte zwei Rak'ah (Tahiyyat al-Masjid), wenn du die Moschee betrittst, bevor du dich setzt.",
                "Rücke zusammen, um Platz für andere zu schaffen.",
                "Springe nicht über die Schultern der Sitzenden, um nach vorne zu gelangen.",
                "Höre der Khutbah (Predigt) aufmerksam zu. Sprechen oder Spielen ist nicht gestattet.",
                "Sende viele Segenswünsche auf den Propheten Muhammad (ﷺ)."
            ]
        }
    },
    en: {
        title: "The Friday Prayer (Jumu'ah)",
        description: "A guide to the virtues, rules, and etiquette of the most important weekly prayer in Islam.",
        backToFeatures: "Back to Features",
        importance: {
            title: "The Importance of Jumu'ah",
            content: "Friday is the best day of the week. The Jumu'ah prayer is a communal obligation (Fard al-Ayn) for all adult, healthy, and resident Muslim men. Allah says in the Quran: 'O you who have believed, when the adhan is called for the prayer on the day of Jumu'ah (Friday), then proceed to the remembrance of Allah and leave trade. That is better for you, if you only knew.' (Surah Al-Jumu'ah, 62:9)."
        },
        sunnah_acts: {
            title: "Recommended Acts (Sunnah) on Friday",
            items: [
                "Performing a full body wash (Ghusl) before the prayer.",
                "Wearing the best, clean clothes and using perfume (non-alcoholic).",
                "Going to the mosque early to gain a greater reward.",
                "Reciting Surah Al-Kahf (Chapter 18)."
            ]
        },
        etiquette: {
            title: "Etiquette in the Mosque",
            items: [
                "Perform two Rak'ah (Tahiyyat al-Masjid) upon entering the mosque before sitting down.",
                "Move closer together to make space for others.",
                "Do not jump over the shoulders of those sitting to get to the front.",
                "Listen attentively to the Khutbah (sermon). Talking or playing is not permitted.",
                "Send many blessings upon the Prophet Muhammad (ﷺ)."
            ]
        }
    }
};

const sunnahIcons = [Bath, Users, Clock, BookOpen];

export default function JummahPage() {
    const { language } = useLanguage();
    const c = contentData[language] || contentData.de;

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
                    <Mosque className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{c.importance.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{c.importance.content}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{c.sunnah_acts.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {c.sunnah_acts.items.map((text, index) => {
                                const IconComponent = sunnahIcons[index];
                                return (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="text-muted-foreground mt-1">{text}</p>
                                </li>
                            )})}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{c.etiquette.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {c.etiquette.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
