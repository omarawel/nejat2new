
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Shirt, HandHeart, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const content = {
    de: {
        title: "Islamische Mode & Bescheidenheit",
        description: "Ein Einblick in die Prinzipien der bescheidenen Kleidung im Islam (Hidschab) und ihre Vielfalt.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: Shield,
                title: "Das Konzept des Hidschab",
                content: "Hidschab ist mehr als nur ein Kopftuch. Es ist ein umfassendes Konzept der Bescheidenheit in Kleidung, Verhalten und Sprache für Männer und Frauen. Das Ziel ist es, den Fokus von der äußeren Erscheinung auf den inneren Charakter und die Frömmigkeit zu lenken und eine respektvolle Interaktion in der Gesellschaft zu fördern."
            },
            {
                icon: HandHeart,
                title: "Richtlinien für bescheidene Kleidung",
                points: [
                    "Die Kleidung sollte den Körper bedecken (die genauen Anforderungen variieren je nach Rechtsschule).",
                    "Die Kleidung sollte nicht eng anliegen oder durchsichtig sein, um die Körperform nicht zu betonen.",
                    "Die Kleidung sollte nicht der des anderen Geschlechts ähneln.",
                    "Die Kleidung sollte nicht extravagant oder prahlerisch sein."
                ]
            }
        ],
        styles_men: {
            title: "Kleidung für Männer",
            content: "Die Bescheidenheit des Mannes beinhaltet das Bedecken des Bereichs vom Nabel bis zu den Knien. Kleidung wie die 'Thobe' oder 'Dishdasha', weite Hosen und Hemden sind üblich.",
            image: "https://placehold.co/600x400.png",
            hint: "islamic men fashion",
        },
        styles_women: {
            title: "Kleidung für Frauen",
            content: "Für Frauen bedeutet Bescheidenheit oft das Tragen von 'Abaya', 'Jilbab' oder anderen lockeren Kleidungsstücken sowie einem Kopftuch ('Khimar'). Die Stile, Farben und Stoffe variieren stark je nach Kultur und persönlicher Vorliebe.",
            image: "https://placehold.co/600x400.png",
            hint: "islamic women fashion",
        }
    },
    en: {
        title: "Islamic Fashion & Modesty",
        description: "An insight into the principles of modest clothing in Islam (Hijab) and its diversity.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: Shield,
                title: "The Concept of Hijab",
                content: "Hijab is more than just a headscarf. It is a comprehensive concept of modesty in dress, behavior, and speech for both men and women. The goal is to shift the focus from outer appearance to inner character and piety and to foster respectful interaction in society."
            },
            {
                icon: HandHeart,
                title: "Guidelines for Modest Dress",
                points: [
                    "Clothing should cover the body (the exact requirements vary by school of thought).",
                    "Clothing should not be tight-fitting or transparent so as not to accentuate the body shape.",
                    "Clothing should not resemble that of the opposite sex.",
                    "Clothing should not be extravagant or boastful."
                ]
            }
        ],
        styles_men: {
            title: "Clothing for Men",
            content: "A man's modesty includes covering the area from the navel to the knees. Garments like the 'Thobe' or 'Dishdasha', loose trousers, and shirts are common.",
            image: "https://placehold.co/600x400.png",
            hint: "islamic men fashion",
        },
        styles_women: {
            title: "Clothing for Women",
            content: "For women, modesty often involves wearing an 'Abaya', 'Jilbab', or other loose-fitting garments, along with a headscarf ('Khimar'). The styles, colors, and fabrics vary greatly depending on culture and personal preference.",
            image: "https://placehold.co/600x400.png",
            hint: "islamic women fashion",
        }
    }
};

export default function IslamicFashionPage() {
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
                    <Shirt className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-4xl mx-auto space-y-8">
                {c.sections.map((section, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="h-7 w-7 text-primary" />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {section.content && <p className="text-muted-foreground">{section.content}</p>}
                            {section.points && (
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    {section.points.map((point, pIndex) => <li key={pIndex}>{point}</li>)}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                ))}

                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-6">
                            <CardTitle>{c.styles_men.title}</CardTitle>
                            <p className="text-muted-foreground mt-2">{c.styles_men.content}</p>
                        </div>
                        <Image src={c.styles_men.image} alt={c.styles_men.title} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={c.styles_men.hint} />
                    </div>
                </Card>

                 <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-6 md:order-2">
                            <CardTitle>{c.styles_women.title}</CardTitle>
                            <p className="text-muted-foreground mt-2">{c.styles_women.content}</p>
                        </div>
                        <div className="md:order-1">
                           <Image src={c.styles_women.image} alt={c.styles_women.title} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={c.styles_women.hint} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
