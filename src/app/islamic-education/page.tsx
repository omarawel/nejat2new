"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { BookHeart, Heart, Brain, Lightbulb, Users, ArrowLeft, Smile, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Islamische Erziehung (Tarbiyah)",
        description: "Prinzipien und Ratschläge für die Erziehung von Kindern im Licht des Korans und der Sunnah.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: BookHeart,
                title: "Grundlagen des Glaubens vermitteln (Aqidah)",
                content: "Die wichtigste Aufgabe ist es, Kindern von klein auf die Liebe zu Allah und Seinem Gesandten (ﷺ) zu vermitteln. Lehre sie die Grundlagen des Tauhid (Einzigartigkeit Allahs), die Bedeutung von &apos;La ilaha illallah&apos; und die Namen und Eigenschaften Allahs auf eine einfache und liebevolle Weise.",
                points: [
                    "Erzähle Geschichten über die Allmacht und Barmherzigkeit Allahs.",
                    "Beziehe Allah in den Alltag ein, z.B. durch Dankbarkeit (&apos;Alhamdulillah&apos;) für das Essen.",
                    "Nutze kindgerechte Bücher und Medien, um den Glauben verständlich zu machen."
                ]
            },
            {
                icon: Heart,
                title: "Charakterbildung (Akhlaq)",
                content: "Die Erziehung zielt darauf ab, einen rechtschaffenen Charakter zu formen. Lebe die islamischen Tugenden wie Ehrlichkeit, Barmherzigkeit, Geduld, Dankbarkeit und Respekt vor. Kinder lernen am besten durch das Vorbild ihrer Eltern.",
                 points: [
                    "Sei selbst das beste Vorbild. Kinder imitieren das Verhalten ihrer Eltern.",
                    "Lobe gutes Verhalten und erkläre liebevoll, warum schlechtes Verhalten nicht erwünscht ist.",
                    "Lest gemeinsam Geschichten über den vorbildlichen Charakter des Propheten Muhammad (ﷺ)."
                ]
            },
            {
                icon: Brain,
                title: "Wissen und Anbetung (Ilm &amp; Ibadah)",
                content: "Bringe Kindern schrittweise das Gebet (Salah), das Fasten und andere gottesdienstliche Handlungen bei. Mache es zu einer positiven und freudigen Erfahrung. Fördere ihre Liebe zum Koran, indem ihr ihn gemeinsam lest und über seine Bedeutungen sprecht.",
                 points: [
                    "Beginne früh, aber ohne Zwang. Mache das Gebet zu einem gemeinsamen Familienritual.",
                    "Belohne kleine Erfolge, z.B. wenn ein Kind eine kurze Sure auswendig lernt.",
                    "Erkläre den Sinn hinter den Gottesdiensten, damit sie nicht zu leeren Ritualen werden."
                ]
            },
            {
                icon: Lightbulb,
                title: "Kritisches Denken fördern (Tafakkur)",
                content: "Ermutige Kinder, Fragen zu stellen und über die Schöpfung Allahs nachzudenken. Eine Erziehung, die auf Verständnis statt auf blindem Befolgen basiert, schafft einen stärkeren und beständigeren Glauben.",
                points: [
                    "Gehe gemeinsam in die Natur und bestaunt die Schöpfung Allah&apos;s (Sterne, Tiere, Pflanzen).",
                    "Beantworte ihre Fragen über den Glauben geduldig und ehrlich, auch wenn du die Antwort nicht sofort weißt.",
                    "Ermutige sie, ihre eigenen Überzeugungen zu entwickeln und zu festigen."
                ]
            },
            {
                icon: Users,
                title: "Soziale Verantwortung (Ummah)",
                content: "Lehre Kinder die Bedeutung der Gemeinschaft, der Rechte der Nachbarn, des Respekts vor Älteren und der Freundlichkeit gegenüber allen Geschöpfen. Beziehe sie in wohltätige Aktivitäten ein, um Empathie zu entwickeln.",
                points: [
                    "Nehmt als Familie an Gemeinschaftsveranstaltungen in der Moschee teil.",
                    "Beziehe deine Kinder mit ein, wenn du Essen mit Nachbarn teilst.",
                    "Ermutige sie, einen Teil ihres Taschengeldes für Bedürftige zu spenden."
                ]
            },
            {
                icon: Smile,
                title: "Geduld &amp; Barmherzigkeit in der Erziehung",
                content: "Erziehung ist ein Marathon, kein Sprint. Es wird schwierige Phasen geben. In diesen Momenten sind Geduld (Sabr) und Barmherzigkeit (Rahmah) die wichtigsten Werkzeuge. Denke daran, dass der Prophet (ﷺ) der barmherzigste Mensch zu Kindern war. Schreien oder harte Strafen führen selten zum Ziel und können das Herz des Kindes verschließen.",
                points: []
            },
             {
                icon: MessageCircle,
                title: "Das Dua der Eltern",
                content: "Das Bittgebet der Eltern für ihre Kinder wird von Allah erhört. Mache es zur Gewohnheit, regelmäßig für die Rechtleitung, den Schutz und den Erfolg deiner Kinder im Dies- und Jenseits zu beten. Eines der schönsten Gebete im Koran ist: „Mein Herr, mache mich und meine Nachkommen zu Ver-richtern des Gebets. Unser Herr, und nimm mein Gebet an.“ (Sure Ibrahim, 14:40)",
                points: []
            }
        ],
        quote: {
            text: "Kein Vater kann seinem Kind ein besseres Geschenk machen als eine gute Erziehung.",
            source: "(Tirmidhi)"
        }
    },
    en: {
        title: "Islamic Education (Tarbiyah)",
        description: "Principles and advice for raising children in the light of the Quran and Sunnah.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: BookHeart,
                title: "Teaching the Foundations of Faith (Aqidah)",
                content: "The most important task is to instill in children from an early age the love for Allah and His Messenger (ﷺ). Teach them the basics of Tawhid (the Oneness of Allah), the meaning of &apos;La ilaha illallah&apos;, and the names and attributes of Allah in a simple and loving way.",
                points: [
                    "Tell stories about the omnipotence and mercy of Allah.",
                    "Incorporate Allah into daily life, e.g., through gratitude (&apos;Alhamdulillah&apos;) for food.",
                    "Use child-friendly books and media to make faith understandable."
                ]
            },
            {
                icon: Heart,
                title: "Character Building (Akhlaq)",
                content: "Education aims to form a righteous character. Live the Islamic virtues such as honesty, mercy, patience, gratitude, and respect. Children learn best from the example of their parents.",
                 points: [
                    "Be the best role model yourself. Children imitate their parents&apos; behavior.",
                    "Praise good behavior and lovingly explain why bad behavior is undesirable.",
                    "Read stories together about the exemplary character of the Prophet Muhammad (ﷺ)."
                ]
            },
            {
                icon: Brain,
                title: "Knowledge and Worship (Ilm &amp; Ibadah)",
                content: "Gradually teach children prayer (Salah), fasting, and other acts of worship. Make it a positive and joyful experience. Foster their love for the Quran by reading it together and discussing its meanings.",
                 points: [
                    "Start early, but without compulsion. Make prayer a joint family ritual.",
                    "Reward small successes, e.g., when a child memorizes a short surah.",
                    "Explain the purpose behind acts of worship so they do not become empty rituals."
                ]
            },
            {
                icon: Lightbulb,
                title: "Fostering Critical Thinking (Tafakkur)",
                content: "Encourage children to ask questions and to reflect on Allah&apos;s creation. An education based on understanding rather than blind obedience creates a stronger and more lasting faith.",
                points: [
                    "Go into nature together and marvel at Allah&apos;s creation (stars, animals, plants).",
                    "Patiently and honestly answer their questions about faith, even if you don&apos;t know the answer immediately.",
                    "Encourage them to develop and solidify their own convictions."
                ]
            },
            {
                icon: Users,
                title: "Social Responsibility (Ummah)",
                content: "Teach children the importance of the community, the rights of neighbors, respect for elders, and kindness to all creatures. Involve them in charitable activities to develop empathy.",
                 points: [
                    "Participate in community events at the mosque as a family.",
                    "Involve your children when sharing food with neighbors.",
                    "Encourage them to donate a portion of their allowance to the needy."
                ]
            },
            {
                icon: Smile,
                title: "Patience &amp; Mercy in Upbringing",
                content: "Upbringing is a marathon, not a sprint. There will be difficult phases. In these moments, patience (Sabr) and mercy (Rahmah) are the most important tools. Remember that the Prophet (ﷺ) was the most merciful person to children. Shouting or harsh punishments rarely achieve their goal and can close a child&apos;s heart.",
                points: []
            },
            {
                icon: MessageCircle,
                title: "The Dua of Parents",
                content: "The supplication of parents for their children is answered by Allah. Make it a habit to regularly pray for the guidance, protection, and success of your children in this world and the hereafter. One of the most beautiful prayers in the Quran is: &quot;My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.&quot; (Surah Ibrahim, 14:40)",
                points: []
            }
        ],
        quote: {
            text: "No father can give a better gift to his child than good upbringing.",
            source: "(Tirmidhi)"
        }
    }
};

export default function IslamicEducationPage() {
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

            <div className="max-w-4xl mx-auto space-y-6">
                {c.sections.map((section, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="h-7 w-7 text-primary" />
                                <span>{section.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{section.content}</p>
                            {section.points && section.points.length > 0 && (
                                <ul className="list-disc list-inside space-y-2 mt-4 text-muted-foreground">
                                    {section.points.map((point, pIndex) => (
                                        <li key={pIndex}>{point}</li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                ))}
                 <Card className="bg-accent/20 border-accent">
                    <CardContent className="p-6 text-center">
                        <blockquote className="text-lg italic text-foreground/80">
                           &quot;{c.quote.text}&quot;
                           <footer className="text-sm not-italic text-muted-foreground mt-2">{c.quote.source}</footer>
                        </blockquote>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
