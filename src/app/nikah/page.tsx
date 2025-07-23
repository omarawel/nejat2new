
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Heart, FileText, Users, Handshake, Gift } from 'lucide-react';

const content = {
    de: {
        title: "Ehe im Islam (Nikah)",
        description: "Ein Leitfaden zu den grundlegenden Prinzipien und dem Ablauf der islamischen Eheschließung.",
        sections: [
            {
                icon: Heart,
                title: "Die Bedeutung der Ehe",
                content: "Die Ehe (Nikah) ist im Islam nicht nur ein sozialer Vertrag, sondern ein heiliger Bund und ein Akt der Anbetung. Sie bildet die Grundlage für die Familie, die als Eckpfeiler der Gesellschaft gilt. Der Koran beschreibt die Beziehung zwischen Ehepartnern als eine von 'Mawaddah' (Liebe und Zuneigung) und 'Rahmah' (Barmherzigkeit)."
            },
            {
                icon: FileText,
                title: "Voraussetzungen für einen gültigen Nikah",
                content: "Damit eine islamische Ehe gültig ist, müssen mehrere Bedingungen erfüllt sein:",
                points: [
                    "**Gegenseitiges Einverständnis (Ijab wa Qubul):** Ein klares Angebot (Ijab) von einer Seite und eine klare Annahme (Qubul) von der anderen.",
                    "**Wali (Vormund der Braut):** Die Zustimmung und Anwesenheit des männlichen Vormunds der Braut (üblicherweise ihr Vater) ist nach der Mehrheit der Rechtsschulen erforderlich.",
                    "**Zeugen:** Mindestens zwei rechtschaffene muslimische Zeugen müssen bei der Vertragschließung anwesend sein.",
                    "**Mahr (Brautgabe):** Ein Geschenk des Mannes an die Frau, das ihr alleiniges Eigentum wird. Es ist ein Symbol für seine Verpflichtung und Verantwortung."
                ]
            },
            {
                icon: Users,
                title: "Rechte und Pflichten",
                content: "Ehepartner haben gegenseitige Rechte und Pflichten. Der Mann ist verpflichtet, für den Unterhalt, die Unterkunft und den Schutz der Familie zu sorgen. Die Frau ist für die Führung des Haushalts und die Erziehung der Kinder verantwortlich. Beide Partner sind verpflichtet, einander mit Freundlichkeit, Respekt und Liebe zu behandeln und sich gegenseitig in ihrem Glauben zu unterstützen."
            },
            {
                icon: Handshake,
                title: "Der Ablauf der Zeremonie",
                content: "Die Nikah-Zeremonie ist oft einfach. Sie beginnt in der Regel mit einer kurzen Predigt (Khutbah), gefolgt von der formellen Angebots- und Annahmeerklärung vor den Zeugen. Anschließend werden Bittgebete (Dua) für das Paar gesprochen. Eine anschließende Feier (Walima), die vom Bräutigam ausgerichtet wird, wird empfohlen, um die Ehe öffentlich bekannt zu machen."
            }
        ]
    },
    en: {
        title: "Marriage in Islam (Nikah)",
        description: "A guide to the fundamental principles and procedures of Islamic marriage.",
        sections: [
            {
                icon: Heart,
                title: "The Meaning of Marriage",
                content: "In Islam, marriage (Nikah) is not just a social contract, but a sacred covenant and an act of worship. It forms the foundation of the family, which is considered the cornerstone of society. The Quran describes the relationship between spouses as one of 'Mawaddah' (love and affection) and 'Rahmah' (mercy)."
            },
            {
                icon: FileText,
                title: "Conditions for a Valid Nikah",
                content: "For an Islamic marriage to be valid, several conditions must be met:",
                points: [
                    "**Mutual Consent (Ijab wa Qubul):** A clear offer (Ijab) from one party and a clear acceptance (Qubul) from the other.",
                    "**Wali (Bride's Guardian):** The consent and presence of the bride's male guardian (usually her father) is required according to the majority of legal schools.",
                    "**Witnesses:** At least two righteous Muslim witnesses must be present at the contract ceremony.",
                    "**Mahr (Bridal Gift):** A gift from the husband to the wife, which becomes her sole property. It is a symbol of his commitment and responsibility."
                ]
            },
            {
                icon: Users,
                title: "Rights and Responsibilities",
                content: "Spouses have mutual rights and responsibilities. The husband is obligated to provide for the maintenance, lodging, and protection of the family. The wife is responsible for managing the household and raising the children. Both partners are obligated to treat each other with kindness, respect, and love, and to support each other in their faith."
            },
            {
                icon: Handshake,
                title: "The Ceremony Procedure",
                content: "The Nikah ceremony is often simple. It typically begins with a short sermon (Khutbah), followed by the formal declaration of offer and acceptance in front of the witnesses. Supplications (Dua) are then made for the couple. A subsequent feast (Walima), hosted by the groom, is recommended to announce the marriage publicly."
            }
        ]
    }
};

export default function NikahPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-3xl mx-auto space-y-8">
                {c.sections.map((section, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="h-7 w-7 text-primary" />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">{section.content}</p>
                            {section.points && (
                                <ul className="space-y-2 list-inside">
                                    {section.points.map((point, pIndex) => (
                                        <li key={pIndex} className="text-muted-foreground pl-4 border-l-2 border-primary/50">{point}</li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
