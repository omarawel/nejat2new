
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Heart, Smile, Users, MessageSquare, Hand, Brain, Shield, ArrowLeft, Handshake, Scale, History, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Gute Manieren im Islam (Akhlaq)",
        description: "Akhlaq ist das arabische Wort für Charakter, Ethik und Moral. Es ist ein zentraler Aspekt des Islam und beschreibt das vorbildliche Verhalten eines Muslims, wie es der Prophet Muhammad (ﷺ) vorgelebt hat.",
        backToFeatures: "Zurück zu den Funktionen",
        topics: [
            {
                icon: Heart,
                title: "Aufrichtigkeit (Ikhlas)",
                content: "Jede Handlung sollte mit der reinen Absicht verrichtet werden, Allah zu gefallen, nicht um von anderen gesehen oder gelobt zu werden. Aufrichtigkeit ist die Grundlage aller guten Taten."
            },
            {
                icon: Smile,
                title: "Geduld (Sabr)",
                content: "Geduld in Zeiten der Not, bei der Verrichtung von Gottesdiensten und beim Fernhalten von Sünden ist eine der am höchsten geschätzten Tugenden. Allah ist mit den Geduldigen."
            },
            {
                icon: Users,
                title: "Freundlichkeit und Barmherzigkeit (Rifq & Rahmah)",
                content: "Ein Muslim sollte freundlich zu allen Geschöpfen sein – Menschen, Tieren und der Umwelt. Der Prophet (ﷺ) war bekannt für seine Sanftmut und sein barmherziges Herz."
            },
            {
                icon: MessageSquare,
                title: "Wahrhaftigkeit (Sidq)",
                content: "Immer die Wahrheit zu sagen, auch wenn es gegen einen selbst geht, ist ein Zeichen starken Glaubens. Lügen, auch im Scherz, sollte vermieden werden."
            },
            {
                icon: Hand,
                title: "Bescheidenheit (Haya')",
                content: "Haya' umfasst Schamgefühl, Bescheidenheit und Zurückhaltung in Kleidung, Verhalten und Sprache. Es ist ein Schutz vor unziemlichen Handlungen und ein Schmuck des Glaubens."
            },
            {
                icon: Brain,
                title: "Dankbarkeit (Shukr)",
                content: "Dankbarkeit gegenüber Allah für seine unzähligen Gaben zu zeigen, indem man sie im Gehorsam Ihm gegenüber verwendet und seine Zufriedenheit sucht. Und auch Dankbarkeit gegenüber den Menschen zu zeigen."
            },
             {
                icon: Shield,
                title: "Vertrauen auf Allah (Tawakkul)",
                content: "Tawakkul bedeutet, sein Bestes zu geben und alle Anstrengungen zu unternehmen, aber das Ergebnis vollständig in Allahs Hände zu legen. Es ist das Vertrauen, dass Allahs Plan immer der beste ist."
            },
            {
                icon: Handshake,
                title: "Vergebung (Afw)",
                content: "Anderen zu vergeben, auch wenn man im Recht ist, ist ein Zeichen großer Stärke und Frömmigkeit. Allah liebt diejenigen, die vergeben. Es reinigt das Herz von Groll und Hass."
            },
            {
                icon: Scale,
                title: "Gerechtigkeit (Adl)",
                content: "Gerecht zu sein in allen Angelegenheiten, sei es im Handel, im Urteil oder im Umgang mit der Familie, ist eine grundlegende Forderung des Islam. Ungerechtigkeit ist eine der größten Sünden."
            },
             {
                icon: UserCheck,
                title: "Versprechen halten (Al-Wafa bil-Ahd)",
                content: "Ein Versprechen im Islam ist ein bindender Vertrag. Das Einhalten von Versprechen und Abmachungen ist ein Zeichen von Vertrauenswürdigkeit und ein Merkmal eines wahren Gläubigen."
            },
            {
                icon: Users,
                title: "Respekt vor Älteren",
                content: "Ältere Menschen in der Gesellschaft zu ehren und zu respektieren, ist eine wichtige islamische Lehre. Der Prophet (ﷺ) sagte: 'Wer unseren Jüngeren nicht barmherzig ist und unsere Älteren nicht ehrt, gehört nicht zu uns.'"
            }
        ],
        quote: "Der Prophet (ﷺ) sagte: „Die besten unter euch sind diejenigen mit dem besten Charakter und Benehmen.“ (Sahih al-Bukhari)"
    },
    en: {
        title: "Good Manners in Islam (Akhlaq)",
        description: "Akhlaq is the Arabic word for character, ethics, and morality. It is a central aspect of Islam and describes the exemplary behavior of a Muslim, as exemplified by the Prophet Muhammad (ﷺ).",
        backToFeatures: "Back to Features",
        topics: [
            {
                icon: Heart,
                title: "Sincerity (Ikhlas)",
                content: "Every action should be done with the pure intention of pleasing Allah, not to be seen or praised by others. Sincerity is the foundation of all good deeds."
            },
            {
                icon: Smile,
                title: "Patience (Sabr)",
                content: "Patience in times of hardship, in performing acts of worship, and in refraining from sins is one of the most highly valued virtues. Allah is with the patient."
            },
            {
                icon: Users,
                title: "Kindness and Mercy (Rifq & Rahmah)",
                content: "A Muslim should be kind to all creatures – people, animals, and the environment. The Prophet (ﷺ) was known for his gentleness and merciful heart."
            },
            {
                icon: MessageSquare,
                title: "Truthfulness (Sidq)",
                content: "Always speaking the truth, even if it is against oneself, is a sign of strong faith. Lying, even in jest, should be avoided."
            },
            {
                icon: Hand,
                title: "Modesty (Haya')",
                content: "Haya' includes a sense of shame, modesty, and decorum in dress, behavior, and speech. It is a protection against indecent acts and an adornment of faith."
            },
            {
                icon: Brain,
                title: "Gratitude (Shukr)",
                content: "Showing gratitude to Allah for His countless blessings by using them in obedience to Him and seeking His pleasure. And also showing gratitude to people."
            },
            {
                icon: Shield,
                title: "Trust in Allah (Tawakkul)",
                content: "Tawakkul means doing one's best and making all efforts, but leaving the outcome entirely in Allah's hands. It is the trust that Allah's plan is always the best."
            },
            {
                icon: Handshake,
                title: "Forgiveness (Afw)",
                content: "Forgiving others, even when you are in the right, is a sign of great strength and piety. Allah loves those who forgive. It cleanses the heart of resentment and hatred."
            },
            {
                icon: Scale,
                title: "Justice (Adl)",
                content: "Being just in all matters, whether in trade, judgment, or dealing with family, is a fundamental requirement of Islam. Injustice is one of the greatest sins."
            },
            {
                icon: UserCheck,
                title: "Keeping Promises (Al-Wafa bil-Ahd)",
                content: "A promise in Islam is a binding contract. Fulfilling promises and agreements is a sign of trustworthiness and a characteristic of a true believer."
            },
            {
                icon: Users,
                title: "Respect for Elders",
                content: "Honoring and respecting the elderly in society is an important Islamic teaching. The Prophet (ﷺ) said, 'He is not one of us who is not merciful to our young and respectful to our elders.'"
            }
        ],
        quote: "The Prophet (ﷺ) said, 'The best among you are those who have the best character and manners.' (Sahih al-Bukhari)"
    }
};

export default function AkhlaqPage() {
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {c.topics.map((topic, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <topic.icon className="h-10 w-10 text-primary" />
                            <CardTitle>{topic.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{topic.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

             <footer className="mt-12 text-center">
                <Card className="max-w-3xl mx-auto bg-accent/20">
                    <CardContent className="p-6">
                        <p className="text-lg italic text-foreground/80">{c.quote}</p>
                    </CardContent>
                </Card>
            </footer>
        </div>
    );
}
