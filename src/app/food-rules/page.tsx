
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { CheckCircle, XCircle, Drumstick, Fish, GlassWater, HandHeart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Islamische Essensregeln",
        description: "Ein umfassender Leitfaden zu Halal, Haram und der Etikette des Essens.",
        backToFeatures: "Zurück zu den Funktionen",
        halal: {
            title: "Was ist Halal?",
            description: "Halal ist ein arabisches Wort und bedeutet „erlaubt“ oder „zulässig“. Es bezieht sich auf alles, was nach islamischem Recht erlaubt ist. Bei Lebensmitteln bedeutet dies, dass sie aus reinen Quellen stammen und auf eine Weise zubereitet werden, die dem islamischen Gesetz entspricht.",
            items: [
                { icon: Drumstick, text: "Fleisch von Tieren, die nach dem islamischen Ritual (Zabiha) geschlachtet wurden, wie Rind, Lamm und Huhn." },
                { icon: Fish, text: "Fisch und die meisten Meeresfrüchte." },
                { icon: GlassWater, text: "Milchprodukte, Eier, Getreide, Obst und Gemüse, solange sie nicht mit Haram-Substanzen vermischt sind." }
            ]
        },
        haram: {
            title: "Was ist Haram?",
            description: "Haram bedeutet „verboten“ oder „unzulässig“. Es bezeichnet Handlungen oder Lebensmittel, die im Islam strengstens verboten sind. Der Verzehr von Haram-Lebensmitteln gilt als Sünde und beeinträchtigt die spirituelle Reinheit.",
            items: [
                { icon: XCircle, text: "Schweinefleisch und alle daraus hergestellten Produkte." },
                { icon: XCircle, text: "Aas (Tiere, die eines natürlichen Todes gestorben sind)." },
                { icon: XCircle, text: "Blut in jeglicher Form." },
                { icon: XCircle, text: "Fleisch von Raubtieren, Vögeln mit Krallen und Tieren, die nicht im Namen Allahs geschlachtet wurden." },
                { icon: XCircle, text: "Alkohol und andere berauschende Substanzen." }
            ]
        },
        etiquette: {
            title: "Die Etikette des Essens (Adab al-Ta'am)",
            description: "Neben den Regeln, was gegessen werden darf, gibt es auch Empfehlungen für das Verhalten beim Essen, die auf der Sunnah des Propheten (ﷺ) basieren und Segen (Barakah) bringen.",
            points: [
                "Wasche die Hände vor und nach dem Essen.",
                "Beginne mit „Bismillah“. Wenn du es vergisst, sage „Bismillahi awwalahu wa akhirahu“, sobald du dich erinnerst.",
                "Iss mit der rechten Hand.",
                "Iss von dem, was direkt vor dir liegt.",
                "Trinke im Sitzen und in drei Zügen, nicht alles auf einmal.",
                "Puste nicht in heißes Essen oder Trinken, um es abzukühlen. Hab Geduld.",
                "Finde keine Fehler am Essen. Wenn du es magst, iss es; wenn nicht, lass es stehen, ohne es zu kritisieren.",
                "Iss nicht übermäßig. Die Sunna empfiehlt, den Magen zu einem Drittel mit Essen, einem Drittel mit Wasser und einem Drittel mit Luft zu füllen.",
                "Iss gemeinsam mit anderen, wann immer es möglich ist, um den Segen zu mehren.",
                "Wische den Teller sauber und lecke die Finger ab, denn man weiß nicht, in welchem Teil des Essens der Segen liegt.",
                "Zeige Dankbarkeit und lobe Allah nach dem Essen, indem du „Alhamdulillah“ sagst.",
            ]
        },
        importance: {
            title: "Die Weisheit hinter den Regeln",
            content: "Die islamischen Speisevorschriften dienen nicht nur der körperlichen, sondern auch der spirituellen Reinheit und Gesundheit. Sie fördern Achtsamkeit, Disziplin und Dankbarkeit gegenüber Allah für seine Gaben. Das Einhalten von Halal ist ein wichtiger Teil des Gottesdienstes (Ibadah) eines Muslims und ein Ausdruck des Gehorsams gegenüber dem Schöpfer."
        }
    },
    en: {
        title: "Islamic Food Rules",
        description: "A comprehensive guide to Halal, Haram, and the etiquette of eating.",
        backToFeatures: "Back to Features",
        halal: {
            title: "What is Halal?",
            description: "Halal is an Arabic word meaning 'permissible' or 'lawful'. It refers to anything permitted under Islamic law. For food, this means it comes from pure sources and is prepared in a manner consistent with Islamic law.",
            items: [
                { icon: Drumstick, text: "Meat from animals slaughtered according to the Islamic ritual (Zabiha), such as beef, lamb, and chicken." },
                { icon: Fish, text: "Fish and most seafood." },
                { icon: GlassWater, text: "Dairy products, eggs, grains, fruits, and vegetables, as long as they are not mixed with Haram substances." }
            ]
        },
        haram: {
            title: "What is Haram?",
            description: "Haram means 'forbidden' or 'unlawful'. It refers to actions or foods that are strictly prohibited in Islam. Consuming Haram food is considered a sin and affects one's spiritual purity.",
            items: [
                { icon: XCircle, text: "Pork and all products derived from it." },
                { icon: XCircle, text: "Carrion (animals that have died of natural causes)." },
                { icon: XCircle, text: "Blood in any form." },
                { icon: XCircle, text: "Meat from predators, birds with talons, and animals not slaughtered in the name of Allah." },
                { icon: XCircle, text: "Alcohol and other intoxicants." }
            ]
        },
        etiquette: {
            title: "The Etiquette of Eating (Adab al-Ta'am)",
            description: "In addition to the rules about what may be eaten, there are also recommendations for behavior during meals, based on the Sunnah of the Prophet (ﷺ), which bring blessings (Barakah).",
            points: [
                "Wash hands before and after eating.",
                "Start by saying 'Bismillah'. If you forget, say 'Bismillahi awwalahu wa akhirahu' as soon as you remember.",
                "Eat with your right hand.",
                "Eat from what is directly in front of you.",
                "Drink while sitting and in three sips, not all at once.",
                "Do not blow into hot food or drink to cool it down. Be patient.",
                "Do not find fault with the food. If you like it, eat it; if not, leave it without criticizing.",
                "Do not overeat. The Sunnah recommends filling the stomach with one-third food, one-third drink, and one-third air.",
                "Eat together with others whenever possible to increase blessings.",
                "Wipe the plate clean and lick the fingers, as one does not know in which part of the food the blessing lies.",
                "Show gratitude and praise Allah after eating by saying 'Alhamdulillah'."
            ]
        },
        importance: {
            title: "The Wisdom Behind the Rules",
            content: "The Islamic dietary laws serve not only physical but also spiritual purity and health. They promote mindfulness, discipline, and gratitude to Allah for His blessings. Adhering to Halal is an important part of a Muslim's worship (Ibadah) and an expression of obedience to the Creator."
        }
    }
};

export default function FoodRulesPage() {
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
                <Card className="border-green-500/50 border-2 flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-green-600 dark:text-green-500">
                            <CheckCircle className="h-8 w-8" />
                            {c.halal.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
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

                <Card className="border-destructive/50 border-2 flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-destructive">
                            <XCircle className="h-8 w-8" />
                            {c.haram.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
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

             <div className="max-w-5xl mx-auto mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <HandHeart className="h-8 w-8 text-primary" />
                            {c.etiquette.title}
                        </CardTitle>
                         <CardDescription>{c.etiquette.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-decimal list-inside space-y-3">
                            {c.etiquette.points.map((point, index) => (
                                <li key={index} className="pl-2">{point}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="max-w-5xl mx-auto mt-8">
                <Card className="bg-accent/20">
                    <CardHeader>
                        <CardTitle>{c.importance.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/80">{c.importance.content}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
