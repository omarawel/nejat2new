
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { CheckCircle, XCircle, Drumstick, Fish, GlassWater } from 'lucide-react';

const content = {
    de: {
        title: "Islamische Essensregeln",
        description: "Ein Überblick über Halal (erlaubt) und Haram (verboten) im Islam.",
        halal: {
            title: "Was ist Halal?",
            description: "Halal ist ein arabisches Wort und bedeutet „erlaubt“ oder „zulässig“. Es bezieht sich auf alles, was nach islamischem Recht erlaubt ist. Bei Lebensmitteln bedeutet dies, dass sie nach bestimmten Regeln zubereitet und verzehrt werden.",
            items: [
                { icon: Drumstick, text: "Fleisch von Tieren, die nach dem islamischen Ritual (Zabiha) geschlachtet wurden, wie Rind, Lamm und Huhn." },
                { icon: Fish, text: "Fisch und die meisten Meeresfrüchte." },
                { icon: GlassWater, text: "Milchprodukte, Eier, Getreide, Obst und Gemüse." }
            ]
        },
        haram: {
            title: "Was ist Haram?",
            description: "Haram bedeutet „verboten“ oder „unzulässig“. Es bezeichnet Handlungen oder Lebensmittel, die im Islam strengstens verboten sind. Der Verzehr von Haram-Lebensmitteln gilt als Sünde.",
            items: [
                { icon: XCircle, text: "Schweinefleisch und alle daraus hergestellten Produkte." },
                { icon: XCircle, text: "Aas (Tiere, die eines natürlichen Todes gestorben sind)." },
                { icon: XCircle, text: "Blut und Blutprodukte." },
                { icon: XCircle, text: "Fleisch von Raubtieren und Vögeln mit Krallen." },
                { icon: XCircle, text: "Alkohol und andere berauschende Substanzen." }
            ]
        },
        importance: {
            title: "Die Weisheit hinter den Regeln",
            content: "Die islamischen Speisevorschriften dienen nicht nur der körperlichen, sondern auch der spirituellen Reinheit und Gesundheit. Sie fördern Achtsamkeit, Disziplin und Dankbarkeit gegenüber Allah für seine Gaben. Das Einhalten von Halal ist ein wichtiger Teil des Gottesdienstes eines Muslims."
        }
    },
    en: {
        title: "Islamic Food Rules",
        description: "An overview of Halal (permissible) and Haram (forbidden) in Islam.",
        halal: {
            title: "What is Halal?",
            description: "Halal is an Arabic word meaning 'permissible' or 'lawful'. It refers to anything that is permitted under Islamic law. For food, this means it is prepared and consumed according to specific rules.",
            items: [
                { icon: Drumstick, text: "Meat from animals slaughtered according to the Islamic ritual (Zabiha), such as beef, lamb, and chicken." },
                { icon: Fish, text: "Fish and most seafood." },
                { icon: GlassWater, text: "Dairy products, eggs, grains, fruits, and vegetables." }
            ]
        },
        haram: {
            title: "What is Haram?",
            description: "Haram means 'forbidden' or 'unlawful'. It refers to actions or foods that are strictly prohibited in Islam. Consuming Haram food is considered a sin.",
            items: [
                { icon: XCircle, text: "Pork and all products derived from it." },
                { icon: XCircle, text: "Carrion (animals that have died of natural causes)." },
                { icon: XCircle, text: "Blood and blood products." },
                { icon: XCircle, text: "Meat from predators and birds with talons." },
                { icon: XCircle, text: "Alcohol and other intoxicants." }
            ]
        },
        importance: {
            title: "The Wisdom Behind the Rules",
            content: "The Islamic dietary laws serve not only physical but also spiritual purity and health. They promote mindfulness, discipline, and gratitude to Allah for His blessings. Adhering to Halal is an important part of a Muslim's worship."
        }
    }
};

export default function FoodRulesPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="border-green-500/50 border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-green-600 dark:text-green-500">
                            <CheckCircle className="h-8 w-8" />
                            {c.halal.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{c.halal.description}</p>
                        <ul className="space-y-3">
                            {c.halal.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <item.icon className="h-6 w-6 text-green-600 dark:text-green-500 mt-1 flex-shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-destructive/50 border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-destructive">
                            <XCircle className="h-8 w-8" />
                            {c.haram.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{c.haram.description}</p>
                         <ul className="space-y-3">
                            {c.haram.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <item.icon className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="max-w-5xl mx-auto mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{c.importance.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{c.importance.content}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
