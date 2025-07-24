
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Shirt, HandHeart, Shield, ArrowLeft, Eye, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Islamische Mode & Bescheidenheit",
        description: "Ein Einblick in die Prinzipien der bescheidenen Kleidung und des Verhaltens im Islam.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: Shield,
                title: "Das Konzept des Hidschab",
                content: "Hidschab ist mehr als nur ein Kopftuch. Es ist ein umfassendes Konzept der Bescheidenheit, das sich auf Kleidung, Verhalten und Sprache für Männer und Frauen bezieht. Das Ziel ist es, den Fokus von der äußeren Erscheinung auf den inneren Charakter und die Frömmigkeit zu lenken und eine würdevolle, respektvolle Interaktion in der Gesellschaft zu fördern."
            },
            {
                icon: HandHeart,
                title: "Allgemeine Richtlinien für bescheidene Kleidung",
                points: [
                    "**Bedeckung (Satr):** Die Kleidung sollte die vorgeschriebenen Körperteile (Aurah) bedecken. Für Männer ist dies in der Regel der Bereich vom Nabel bis zu den Knien, für Frauen der gesamte Körper außer Gesicht und Händen, wobei es hier unterschiedliche Gelehrtenmeinungen gibt.",
                    "**Nicht durchsichtig oder eng:** Die Kleidung sollte nicht so dünn sein, dass die Haut durchscheint, oder so eng, dass sie die Körperform detailliert nachzeichnet.",
                    "**Keine Nachahmung:** Die Kleidung sollte nicht der des anderen Geschlechts ähneln oder spezifische Kleidung von Nicht-Muslimen imitieren, die mit deren religiösen Praktiken verbunden ist.",
                    "**Keine Prahlerei:** Kleidung sollte nicht aus Arroganz oder zur Angeberei getragen werden."
                ]
            },
            {
                icon: Shirt,
                title: "Bescheidenheit des Mannes",
                content: "Die Bescheidenheit des Mannes geht über die Bedeckung des Bereichs vom Nabel bis zu den Knien hinaus. Es umfasst auch das Tragen von lockerer, würdevoller Kleidung, die nicht extravagant ist. Das Herablassen der Kleidung unter die Knöchel (Isbal) aus Stolz wird missbilligt. Eine gepflegte Erscheinung, wie das Schneiden des Schnurrbarts und das Wachsenlassen des Bartes, ist ebenfalls Teil der Sunnah."
            },
            {
                icon: Shirt,
                title: "Bescheidenheit der Frau",
                content: "Für Frauen bedeutet Bescheidenheit das Tragen von Kleidung, die den gesamten Körper außer Gesicht und Händen bedeckt, wie z.B. eine 'Abaya' oder ein 'Jilbab', und ein Kopftuch ('Khimar'). Die Stile, Farben und Stoffe variieren stark je nach Kultur und persönlicher Vorliebe, solange die Grundprinzipien der Bedeckung und Lockerheit eingehalten werden."
            },
            {
                icon: Eye,
                title: "Bescheidenheit ist mehr als nur Kleidung",
                content: "Wahre Bescheidenheit (Haya') ist eine innere Eigenschaft, die sich im gesamten Verhalten widerspiegelt:",
                points: [
                   "**Senken des Blicks:** Sowohl Männer als auch Frauen sind angewiesen, ihre Blicke zu senken und nicht lüstern auf das andere Geschlecht zu starren.",
                   "**Zurückhaltung in der Sprache:** Vermeiden von vulgärer, anzüglicher oder nutzloser Rede.",
                   "**Würde im Gang und Verhalten:** Ein würdevolles und respektvolles Auftreten in der Öffentlichkeit."
                ]
            },
            {
                icon: Mic,
                title: "Die Weisheit hinter der Bescheidenheit",
                content: "Die islamischen Kleidungs- und Verhaltensregeln sind kein Selbstzweck, sondern dienen einem höheren Ziel. Sie schützen die Würde des Einzelnen und der Gesellschaft, lenken den Fokus auf den Charakter statt auf das Äußere, reduzieren soziale Reibungen und fördern eine Atmosphäre des Respekts und der Frömmigkeit. Sie sind ein Ausdruck des Gehorsams und der Liebe zu Allah, dem Schöpfer."
            }
        ]
    },
    en: {
        title: "Islamic Fashion & Modesty",
        description: "An insight into the principles of modest clothing and conduct in Islam.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: Shield,
                title: "The Concept of Hijab",
                content: "Hijab is more than just a headscarf. It is a comprehensive concept of modesty that applies to clothing, behavior, and speech for both men and women. The goal is to shift the focus from outer appearance to inner character and piety and to foster dignified, respectful interaction in society."
            },
            {
                icon: HandHeart,
                title: "General Guidelines for Modest Dress",
                points: [
                    "**Coverage (Satr):** Clothing should cover the prescribed parts of the body (Aurah). For men, this is typically the area from the navel to the knees; for women, the entire body except for the face and hands, though there are differing scholarly opinions on this.",
                    "**Not Transparent or Tight:** The clothing should not be so thin that the skin shows through, or so tight that it details the shape of the body.",
                    "**No Imitation:** Clothing should not resemble that of the opposite sex or imitate specific clothing of non-Muslims associated with their religious practices.",
                    "**No Ostentation:** Clothing should not be worn out of arrogance or for showing off."
                ]
            },
            {
                icon: Shirt,
                title: "Modesty for Men",
                content: "A man's modesty extends beyond covering the area from the navel to the knees. It also includes wearing loose, dignified clothing that is not extravagant. Letting clothes hang below the ankles (Isbal) out of pride is discouraged. A well-groomed appearance, such as trimming the mustache and letting the beard grow, is also part of the Sunnah."
            },
            {
                icon: Shirt,
                title: "Modesty for Women",
                content: "For women, modesty often involves wearing clothes that cover the entire body except for the face and hands, such as an 'Abaya' or 'Jilbab', and a headscarf ('Khimar'). The styles, colors, and fabrics vary greatly depending on culture and personal preference, as long as the basic principles of coverage and looseness are met."
            },
            {
                icon: Eye,
                title: "Modesty is More Than Just Clothing",
                content: "True modesty (Haya') is an inner quality that is reflected in one's entire conduct:",
                 points: [
                   "**Lowering the Gaze:** Both men and women are instructed to lower their gaze and not to stare lustfully at the opposite sex.",
                   "**Restraint in Speech:** Avoiding vulgar, suggestive, or useless talk.",
                   "**Dignity in Gait and Behavior:** Maintaining a dignified and respectful demeanor in public."
                ]
            },
             {
                icon: Mic,
                title: "The Wisdom Behind Modesty",
                content: "The Islamic rules of dress and conduct are not an end in themselves but serve a higher purpose. They protect the dignity of the individual and society, shift the focus to character rather than appearance, reduce social friction, and promote an atmosphere of respect and piety. They are an expression of obedience and love for Allah, the Creator."
            }
        ]
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
                <h1 className="text-4xl font-bold tracking-tight text-primary">
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-3xl mx-auto space-y-6">
                {c.sections.map((section, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-start gap-3">
                                <section.icon className="h-7 w-7 text-primary mt-1" />
                                <span>{section.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {section.content && <p className="text-muted-foreground">{section.content}</p>}
                            {section.points && (
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                                    {section.points.map((point, pIndex) => 
                                        <li key={pIndex} dangerouslySetInnerHTML={{ __html: point }} />
                                    )}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
