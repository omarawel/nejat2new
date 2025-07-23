
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Heart, FileText, Users, Handshake, Gift, Search, Utensils, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Ehe im Islam (Nikah)",
        description: "Ein umfassender Leitfaden zu den grundlegenden Prinzipien und dem Ablauf der islamischen Eheschließung.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: Heart,
                title: "Die Bedeutung der Ehe",
                content: "Die Ehe (Nikah) ist im Islam nicht nur ein sozialer Vertrag, sondern ein heiliger Bund und ein Akt der Anbetung. Sie bildet die Grundlage für die Familie, die als Eckpfeiler der Gesellschaft gilt. Der Koran beschreibt die Beziehung zwischen Ehepartnern als eine von 'Mawaddah' (Liebe und Zuneigung) und 'Rahmah' (Barmherzigkeit)."
            },
            {
                icon: Search,
                title: "Die Wahl des richtigen Partners",
                content: "Die Wahl eines Ehepartners ist eine der wichtigsten Entscheidungen im Leben eines Muslims. Der Islam legt Wert auf Kriterien wie Frömmigkeit (Taqwa), guten Charakter (Akhlaq), Kompatibilität und gegenseitige Anziehung. Der Prophet (ﷺ) riet, die Religion als wichtigstes Kriterium zu wählen.",
                points: [
                    "**Religiosität und Charakter (Din wa Akhlaq):** Das wichtigste Kriterium ist der Glaube und die Praxis des Islam.",
                    "**Istikhara-Gebet:** Es wird empfohlen, das Istikhara-Gebet zu verrichten, um Allah um Führung bei der Entscheidung zu bitten.",
                    "**Nachforschungen anstellen:** Es ist erlaubt und empfohlen, sich über den potenziellen Partner zu erkundigen, um sicherzustellen, dass man eine informierte Entscheidung trifft."
                ]
            },
            {
                icon: Gift,
                title: "Die Verlobung (Khitbah)",
                content: "Die Khitbah ist das formelle Verlöbnis, bei dem ein Mann um die Hand einer Frau bei ihrem Vormund (Wali) anhält. Es ist kein Ehevertrag, sondern ein gegenseitiges Versprechen zu heiraten.",
                points: [
                    "**Anschauen des Partners:** Es ist dem Mann und der Frau erlaubt, sich in Anwesenheit eines Mahrams (naher Verwandter) zu sehen.",
                    "**Grenzen wahren:** Während der Verlobungszeit sind die Partner immer noch Fremde füreinander (nicht-mahram), daher müssen die islamischen Regeln des Umgangs zwischen den Geschlechtern eingehalten werden (kein Alleinsein, keine körperliche Berührung)."
                ]
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
                icon: Handshake,
                title: "Der Ablauf der Zeremonie",
                content: "Die Nikah-Zeremonie ist oft einfach gehalten. Sie kann in einer Moschee oder zu Hause stattfinden.",
                points: [
                    "**Khutbat-un-Nikah:** Eine kurze Ansprache, die oft vom Imam gehalten wird und das Paar an seine Pflichten erinnert.",
                    "**Angebot & Annahme:** Das formelle Angebot und die Annahme der Ehe vor den Zeugen.",
                    "**Dua:** Bittgebete für das Brautpaar, um Segen für ihre Ehe zu erbitten."
                ]
            },
            {
                icon: Users,
                title: "Rechte und Pflichten",
                content: "Ehepartner haben gegenseitige Rechte und Pflichten, die auf Liebe, Barmherzigkeit und Gerechtigkeit basieren. Der Mann ist als Versorger (Qawwam) für den finanziellen Unterhalt der Familie verantwortlich. Die Frau ist primär für den Haushalt und die Erziehung der Kinder zuständig. Beide sollen sich gegenseitig unterstützen, ihre Geheimnisse wahren und einander Freude bereiten."
            },
            {
                icon: Utensils,
                title: "Das Hochzeitsfest (Walima)",
                content: "Die Walima ist das Festmahl, das vom Bräutigam nach dem Vollzug der Ehe gegeben wird. Es dient dazu, die Ehe öffentlich bekannt zu machen und die Freude mit Familie und Freunden zu teilen. Es ist eine wichtige Sunnah.",
                points: [
                    "**Öffentliche Bekanntmachung:** Die Walima ist der wichtigste Weg, die Ehe in der Gemeinschaft bekannt zu machen.",
                    "**Bescheidenheit:** Das Fest sollte nicht extravagant oder verschwenderisch sein.",
                    "**Arme einladen:** Es wird empfohlen, auch die Bedürftigen der Gemeinschaft zur Walima einzuladen."
                ]
            }
        ]
    },
    en: {
        title: "Marriage in Islam (Nikah)",
        description: "A comprehensive guide to the fundamental principles and procedures of Islamic marriage.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: Heart,
                title: "The Meaning of Marriage",
                content: "In Islam, marriage (Nikah) is not just a social contract, but a sacred covenant and an act of worship. It forms the foundation of the family, which is considered the cornerstone of society. The Quran describes the relationship between spouses as one of 'Mawaddah' (love and affection) and 'Rahmah' (mercy)."
            },
            {
                icon: Search,
                title: "Choosing the Right Partner",
                content: "Choosing a spouse is one of the most important decisions in a Muslim's life. Islam emphasizes criteria such as piety (Taqwa), good character (Akhlaq), compatibility, and mutual attraction. The Prophet (ﷺ) advised choosing religion as the most important criterion.",
                points: [
                    "**Religiosity and Character (Din wa Akhlaq):** The most important criterion is the belief and practice of Islam.",
                    "**Istikhara Prayer:** It is recommended to perform the Istikhara prayer to ask Allah for guidance in making the decision.",
                    "**Making Inquiries:** It is permissible and recommended to inquire about the potential partner to ensure an informed decision is made."
                ]
            },
            {
                icon: Gift,
                title: "The Engagement (Khitbah)",
                content: "The Khitbah is the formal engagement where a man proposes to a woman through her guardian (Wali). It is not a marriage contract but a mutual promise to marry.",
                points: [
                    "**Seeing the Partner:** It is permissible for the man and woman to see each other in the presence of a Mahram (close relative).",
                    "**Maintaining Boundaries:** During the engagement period, the partners are still considered strangers to each other (non-mahram), so Islamic rules of interaction between genders must be observed (no being alone together, no physical touch)."
                ]
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
                icon: Handshake,
                title: "The Ceremony Procedure",
                content: "The Nikah ceremony is often kept simple. It can take place in a mosque or at home.",
                points: [
                    "**Khutbat-un-Nikah:** A short sermon, often delivered by the Imam, reminding the couple of their duties.",
                    "**Offer & Acceptance:** The formal offer and acceptance of the marriage in front of the witnesses.",
                    "**Dua:** Supplications for the couple, asking for blessings in their marriage."
                ]
            },
            {
                icon: Users,
                title: "Rights and Responsibilities",
                content: "Spouses have mutual rights and responsibilities based on love, mercy, and justice. The husband, as the provider (Qawwam), is responsible for the financial maintenance of the family. The wife is primarily responsible for the household and the upbringing of children. Both should support each other, keep each other's secrets, and bring joy to one another."
            },
            {
                icon: Utensils,
                title: "The Wedding Feast (Walima)",
                content: "The Walima is the feast given by the groom after the consummation of the marriage. It serves to publicly announce the marriage and share the joy with family and friends. It is an important Sunnah.",
                points: [
                    "**Public Announcement:** The Walima is the most important way to announce the marriage to the community.",
                    "**Modesty:** The feast should not be extravagant or wasteful.",
                    "**Inviting the Poor:** It is recommended to also invite the needy of the community to the Walima."
                ]
            }
        ]
    }
};

export default function NikahPage() {
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
                                <ul className="space-y-2">
                                    {section.points.map((point, pIndex) => (
                                        <li key={pIndex} className="text-muted-foreground pl-4 border-l-2 border-primary/50" dangerouslySetInnerHTML={{ __html: point }}></li>
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
