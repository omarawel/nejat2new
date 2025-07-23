
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Mosque, Bath, BookOpen, Mic, Wind, Users, Clock } from 'lucide-react';

const content = {
    de: {
        title: "Das Freitagsgebet (Jumu'ah)",
        description: "Ein Leitfaden zu den Vorzügen, Regeln und der Etikette des wichtigsten wöchentlichen Gebets im Islam.",
        importance: {
            title: "Die Bedeutung des Jumu'ah",
            content: "Der Freitag ist der beste Tag der Woche. Das Jumu'ah-Gebet ist eine gemeinschaftliche Pflicht (Fard al-Ayn) für alle volljährigen, gesunden und ansässigen muslimischen Männer. Allah sagt im Koran: „O die ihr glaubt, wenn zum Gebet gerufen wird am Freitag, dann eilt zum Gedenken Allahs und lasst das Kaufgeschäft. Das ist besser für euch, wenn ihr wisst.“ (Sure Al-Jumu'ah, 62:9)."
        },
        sunnah_acts: {
            title: "Empfohlene Handlungen (Sunnah) am Freitag",
            items: [
                { icon: Bath, text: "Ganzkörperwaschung (Ghusl) vor dem Gebet." },
                { icon: Wind, text: "Die beste, saubere Kleidung anziehen und Parfüm (alkoholfrei) verwenden." },
                { icon: Clock, text: "Früh zur Moschee gehen, um einen größeren Lohn zu erlangen." },
                { icon: Users, text: "Zu Fuß zur Moschee gehen, wenn möglich." },
                { icon: BookOpen, text: "Die Sura Al-Kahf (Kapitel 18) rezitieren." },
                { icon: Mic, text: "Viel Dua (Bittgebete) machen, da es eine Stunde am Freitag gibt, in der die Gebete erhört werden." }
            ]
        },
        etiquette: {
            title: "Etikette in der Moschee",
            items: [
                "Verrichte zwei Rak'ah (Tahiyyat al-Masjid), wenn du die Moschee betrittst, bevor du dich setzt.",
                "Rücke zusammen, um Platz für andere zu schaffen.",
                "Springe nicht über die Schultern der Sitzenden, um nach vorne zu gelangen.",
                "Höre der Khutbah (Predigt) aufmerksam zu. Sprechen, Spielen mit dem Handy oder Schlafen während der Predigt ist verboten und mindert den Lohn des Gebets.",
                "Vermeide es, andere zu stören.",
                "Sende viele Segenswünsche auf den Propheten Muhammad (ﷺ)."
            ]
        }
    },
    en: {
        title: "The Friday Prayer (Jumu'ah)",
        description: "A guide to the virtues, rules, and etiquette of the most important weekly prayer in Islam.",
        importance: {
            title: "The Importance of Jumu'ah",
            content: "Friday is the best day of the week. The Jumu'ah prayer is a communal obligation (Fard al-Ayn) for all adult, healthy, and resident Muslim men. Allah says in the Quran: 'O you who have believed, when the adhan is called for the prayer on the day of Jumu'ah (Friday), then proceed to the remembrance of Allah and leave trade. That is better for you, if you only knew.' (Surah Al-Jumu'ah, 62:9)."
        },
        sunnah_acts: {
            title: "Recommended Acts (Sunnah) on Friday",
            items: [
                { icon: Bath, text: "Performing a full body wash (Ghusl) before the prayer." },
                { icon: Wind, text: "Wearing the best, clean clothes and using perfume (non-alcoholic)." },
                { icon: Clock, text: "Going to the mosque early to gain a greater reward." },
                { icon: Users, text: "Walking to the mosque if possible." },
                { icon: BookOpen, text: "Reciting Surah Al-Kahf (Chapter 18)." },
                { icon: Mic, text: "Making lots of Dua (supplications), as there is an hour on Friday when prayers are answered." }
            ]
        },
        etiquette: {
            title: "Etiquette in the Mosque",
            items: [
                "Perform two Rak'ah (Tahiyyat al-Masjid) upon entering the mosque before sitting down.",
                "Move closer together to make space for others.",
                "Do not jump over the shoulders of those sitting to get to the front.",
                "Listen attentively to the Khutbah (sermon). Talking, playing with a phone, or sleeping during the sermon is forbidden and diminishes the reward of the prayer.",
                "Avoid disturbing others.",
                "Send many blessings upon the Prophet Muhammad (ﷺ)."
            ]
        }
    }
};

export default function JummahPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    return (
        <div className="container mx-auto px-4 py-8">
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
                            {c.sunnah_acts.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="text-muted-foreground mt-1">{item.text}</p>
                                </li>
                            ))}
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
