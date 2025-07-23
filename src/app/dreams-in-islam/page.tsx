
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Moon, CheckCircle, AlertTriangle, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Träume im Islam",
        description: "Ein Leitfaden zum Verständnis der verschiedenen Arten von Träumen und ihrer Bedeutung im Islam.",
        backToFeatures: "Zurück zu den Funktionen",
        types: {
            title: "Die drei Arten von Träumen",
            description: "Der Prophet Muhammad (ﷺ) lehrte, dass es drei Arten von Träumen gibt:",
            items: [
                {
                    icon: CheckCircle,
                    title: "Wahrer Traum (Ru'ya)",
                    content: "Dies ist ein guter Traum, der von Allah kommt. Er ist eine Form der frohen Botschaft und ein Teil der Prophetie. Solche Träume haben oft eine symbolische Bedeutung und können zukünftige Ereignisse andeuten. Wenn man einen solchen Traum hat, soll man Allah dafür danken und ihn nur mit Menschen teilen, die man liebt und denen man vertraut."
                },
                {
                    icon: Shield,
                    title: "Traum vom Schaitan (Hulum)",
                    content: "Dies ist ein schlechter Traum oder Albtraum, der vom Schaitan (Satan) stammt, um den Gläubigen zu betrüben, zu erschrecken oder in die Irre zu führen. Wenn man einen solchen Traum hat, soll man Zuflucht bei Allah suchen (indem man 'A'udhu billahi minash-shaitanir-radschim' sagt), dreimal zur linken Seite spucken und sich auf die andere Seite legen. Man soll diesen Traum niemandem erzählen."
                },
                {
                    icon: AlertTriangle,
                    title: "Traum von der eigenen Seele (Nafs)",
                    content: "Dies sind Träume, die die Gedanken, Sorgen, Wünsche und Ereignisse des Tages widerspiegeln. Sie sind ein Produkt des eigenen Unterbewusstseins und haben in der Regel keine tiefere spirituelle Bedeutung oder prophetische Aussagekraft."
                }
            ]
        },
        etiquette: {
            title: "Die Etikette des Träumens",
            points: [
                "**Bei einem guten Traum:** Danke Allah, sei optimistisch und erzähle ihn nur vertrauenswürdigen Personen.",
                "**Bei einem schlechten Traum:** Suche Zuflucht bei Allah vor dem Schaitan und dem Übel des Traums, spucke dreimal leicht nach links, ändere deine Schlafposition und erzähle ihn niemandem.",
                "**Traumdeutung:** Nicht jeder ist zur Traumdeutung qualifiziert. Suche Rat bei einer wissenden und frommen Person. Überinterpretiere Träume nicht und lass dein Leben nicht von ihnen bestimmen."
            ]
        }
    },
    en: {
        title: "Dreams in Islam",
        description: "A guide to understanding the different types of dreams and their significance in Islam.",
        backToFeatures: "Back to Features",
        types: {
            title: "The Three Types of Dreams",
            description: "The Prophet Muhammad (ﷺ) taught that there are three types of dreams:",
            items: [
                {
                    icon: CheckCircle,
                    title: "True Dream (Ru'ya)",
                    content: "This is a good dream that comes from Allah. It is a form of glad tidings and a part of prophecy. Such dreams often have symbolic meaning and can indicate future events. If one has such a dream, one should thank Allah for it and share it only with people one loves and trusts."
                },
                {
                    icon: Shield,
                    title: "Dream from Shaytan (Hulum)",
                    content: "This is a bad dream or nightmare that comes from Shaytan (Satan) to grieve, frighten, or mislead the believer. If one has such a dream, one should seek refuge with Allah (by saying 'A'udhu billahi minash-shaitanir-rajim'), spit lightly to the left three times, and turn to the other side. One should not tell this dream to anyone."
                },
                {
                    icon: AlertTriangle,
                    title: "Dream from Oneself (Nafs)",
                    content: "These are dreams that reflect the thoughts, worries, desires, and events of the day. They are a product of one's own subconscious and usually have no deeper spiritual meaning or prophetic significance."
                }
            ]
        },
        etiquette: {
            title: "The Etiquette of Dreaming",
            points: [
                "**For a good dream:** Thank Allah, be optimistic, and tell it only to trustworthy people.",
                "**For a bad dream:** Seek refuge with Allah from Shaytan and the evil of the dream, spit lightly to your left three times, change your sleeping position, and do not tell it to anyone.",
                "**Dream Interpretation:** Not everyone is qualified to interpret dreams. Seek advice from a knowledgeable and pious person. Do not over-interpret dreams or let them dictate your life."
            ]
        }
    }
};

export default function DreamsInIslamPage() {
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
                    <Moon className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{c.types.title}</CardTitle>
                        <CardDescription>{c.types.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {c.types.items.map((item, index) => (
                             <div key={index} className="flex items-start gap-4 p-4 rounded-md bg-accent/20">
                                <item.icon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>{c.etiquette.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-3">
                            {c.etiquette.points.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
