
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { CheckCircle, XCircle, ArrowLeft, TriangleAlert, ShieldCheck, Brain, HandCoins, Music, Sparkles, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Leitfaden zu Halal & Haram",
        description: "Einblick in wichtige islamische Urteile für den Alltag, ihre Begründungen und die Weisheit dahinter.",
        backToFeatures: "Zurück zu den Funktionen",
        topics: [
            {
                key: "alcohol",
                title: "Alkohol & Rauschmittel",
                icon: XCircle,
                ruling: "Haram (Strengstens verboten)",
                explanation: "Der Konsum von Alkohol und anderen Substanzen, die den Verstand berauschen (Khamr), ist im Islam eindeutig verboten. Der Koran bezeichnet sie als 'ein Gräuel von Satans Werk' (5:90) und befiehlt den Gläubigen, sie zu meiden. Dieses Verbot gilt für jede Menge, auch für kleinste Tropfen, da der Prophet (ﷺ) sagte: 'Was in großer Menge berauscht, ist auch in kleiner Menge verboten.'",
                wisdom: [
                    { icon: ShieldCheck, text: "Schutz des Verstandes: Der Verstand ist eine Gabe Allahs. Alkohol trübt das Urteilsvermögen und führt zu unkontrolliertem Verhalten." },
                    { icon: Brain, text: "Spirituelle Klarheit: Nüchternheit ist Voraussetzung für ein gültiges Gebet und eine bewusste Beziehung zu Allah." },
                    { icon: Scale, text: "Soziale Stabilität: Das Verbot beugt gesellschaftlichen Übeln wie Gewalt, Familienzerstörung und Gesundheitsschäden vor." }
                ],
                disadvantage: "Der Konsum führt zu spiritueller Distanz, gesundheitlichen Schäden und kann die Ursache für viele weitere Sünden und soziales Elend sein."
            },
            {
                key: "riba",
                title: "Zinsen (Riba)",
                icon: XCircle,
                ruling: "Haram (Strengstens verboten)",
                explanation: "Riba, was Zins oder Wucher bedeutet, ist eine der größten Sünden im Islam. Es ist das Nehmen oder Geben eines Aufschlags für einen Kredit, ohne dass ein realer Handel mit Gütern oder Dienstleistungen stattfindet. Allah hat den Handel erlaubt, aber Zinsen verboten (Koran 2:275) und erklärt denen den Krieg, die nicht davon ablassen.",
                wisdom: [
                    { icon: HandCoins, text: "Wirtschaftliche Gerechtigkeit: Das Verbot von Riba verhindert die Ausbeutung der Armen durch die Reichen und fördert ein Wirtschaftssystem, das auf realer Wertschöpfung basiert." },
                    { icon: Sparkles, text: "Förderung von Risikoteilung: Islamische Finanzmodelle wie Mudarabah (Gewinnbeteiligung) und Musharakah (Joint Venture) ermutigen zu Partnerschaft statt zu reiner Kreditvergabe." },
                    { icon: Scale, text: "Sozialer Zusammenhalt: Es stärkt die Brüderlichkeit, indem man zinslose Kredite (Qard al-Hasan) als Form der Hilfe gewährt." }
                ],
                disadvantage: "Zinsbasierte Transaktionen schaffen ein ungerechtes System, das die Reichen reicher und die Armen ärmer macht, und stehen unter dem Zorn Allahs."
            },
            {
                key: "music",
                title: "Musik & Instrumente",
                icon: TriangleAlert,
                ruling: "Umstritten (Je nach Art und Kontext)",
                explanation: "Die islamische Meinung über Musik ist vielfältig. Während einige Gelehrte die meisten Musikinstrumente als verboten (haram) ansehen, basierend auf Hadithen, die vor 'ma'azif' (Musikinstrumenten) warnen, erlauben andere bestimmte Arten von Musik unter Bedingungen. Gesang ohne instrumentale Begleitung (außer dem Duff-Tamburin bei Festen) mit guten und erlaubten Inhalten (wie Lobpreis auf Allah oder islamische Gedichte) wird oft als zulässig angesehen.",
                wisdom: [
                    { icon: ShieldCheck, text: "Schutz des Herzens: Die Einschränkung zielt darauf ab, das Herz vor Inhalten zu schützen, die zu unmoralischem Verhalten, vergesslicher Lebensweise oder der Verherrlichung von Verbotenem anregen." },
                    { icon: Brain, text: "Fokus auf das Wesentliche: Es soll die Gläubigen dazu anhalten, ihre Zeit mit nützlicheren Dingen wie der Koranrezitation, dem Dhikr und dem Erwerb von Wissen zu verbringen." }
                ],
                disadvantage: "Musik, die zu Sünden, Faulheit oder der Vernachlässigung religiöser Pflichten anstiftet, wird als schädlich für den Glauben und die Seele angesehen."
            },
            {
                key: "tattoos",
                title: "Tattoos & Körpermodifikationen",
                icon: XCircle,
                ruling: "Haram (Strengstens verboten)",
                explanation: "Permanente Tattoos, bei denen die Haut durchstochen und mit Tinte gefüllt wird, gelten als haram. Der Prophet Muhammad (ﷺ) verfluchte diejenigen, die tätowieren, und diejenigen, die sich tätowieren lassen. Dies wird als eine Veränderung der Schöpfung Allahs (Taghyir Khalqillah) angesehen, was eine Einmischung in das Werk des Schöpfers darstellt.",
                wisdom: [
                    { icon: ShieldCheck, text: "Bewahrung der natürlichen Schöpfung: Der Islam lehrt, den Körper als ein von Allah anvertrautes Gut (Amanah) zu sehen und ihn nicht unnötig zu verändern oder zu schädigen." },
                    { icon: Brain, text: "Reinheit und Wudu: Permanente Tattoos können die rituelle Reinheit beeinträchtigen, da sie eine undurchlässige Schicht über der Haut bilden können." },
                    { icon: Scale, text: "Abgrenzung von heidnischen Praktiken: In der Vergangenheit waren Tattoos oft mit heidnischen Ritualen und Götzenanbetung verbunden." }
                ],
                disadvantage: "Das Anbringen eines Tattoos ist eine dauerhafte Veränderung der Schöpfung Allahs und eine Handlung, die den Fluch des Propheten (ﷺ) auf sich zieht. Temporäre Verzierungen wie Henna sind jedoch erlaubt."
            },
        ]
    },
    en: {
        title: "Guide to Halal & Haram",
        description: "Insight into important Islamic rulings for daily life, their reasoning, and the wisdom behind them.",
        backToFeatures: "Back to Features",
        topics: [
            {
                key: "alcohol",
                title: "Alcohol & Intoxicants",
                icon: XCircle,
                ruling: "Haram (Strictly Forbidden)",
                explanation: "The consumption of alcohol and other substances that intoxicate the mind (Khamr) is unequivocally forbidden in Islam. The Quran describes them as an 'abomination of Satan's handiwork' (5:90) and commands believers to avoid them. This prohibition applies to any amount, even the smallest drop, as the Prophet (ﷺ) said: 'Whatever intoxicates in large amounts is forbidden in small amounts.'",
                wisdom: [
                    { icon: ShieldCheck, text: "Protection of the Intellect: The mind is a gift from Allah. Alcohol clouds judgment and leads to uncontrolled behavior." },
                    { icon: Brain, text: "Spiritual Clarity: Sobriety is a prerequisite for valid prayer and a conscious relationship with Allah." },
                    { icon: Scale, text: "Social Stability: The prohibition prevents social evils such as violence, family breakdown, and health problems." }
                ],
                disadvantage: "Consumption leads to spiritual distance, health damage, and can be the cause of many other sins and social misery."
            },
            {
                key: "riba",
                title: "Interest (Riba)",
                icon: XCircle,
                ruling: "Haram (Strictly Forbidden)",
                explanation: "Riba, meaning interest or usury, is one of the greatest sins in Islam. It is the taking or giving of an increase on a loan without any real trade of goods or services taking place. Allah has permitted trade but has forbidden interest (Quran 2:275) and declares war on those who do not desist from it.",
                wisdom: [
                    { icon: HandCoins, text: "Economic Justice: The prohibition of Riba prevents the exploitation of the poor by the rich and promotes an economic system based on real value creation." },
                    { icon: Sparkles, text: "Promotion of Risk-Sharing: Islamic finance models like Mudarabah (profit-sharing) and Musharakah (joint venture) encourage partnership rather than pure lending." },
                    { icon: Scale, text: "Social Cohesion: It strengthens brotherhood by providing interest-free loans (Qard al-Hasan) as a form of help." }
                ],
                disadvantage: "Interest-based transactions create an unjust system that makes the rich richer and the poor poorer, and incurs the wrath of Allah."
            },
            {
                key: "music",
                title: "Music & Instruments",
                icon: TriangleAlert,
                ruling: "Controversial (Depends on type and context)",
                explanation: "The Islamic opinion on music is diverse. While some scholars consider most musical instruments to be forbidden (haram), based on hadiths that warn against 'ma'azif' (musical instruments), others permit certain types of music under conditions. Singing without instrumental accompaniment (except for the duff tambourine at festivals) with good and permissible content (like praise of Allah or Islamic poems) is often considered permissible.",
                wisdom: [
                    { icon: ShieldCheck, text: "Protection of the Heart: The restriction aims to protect the heart from content that encourages immoral behavior, a forgetful lifestyle, or the glorification of the forbidden." },
                    { icon: Brain, text: "Focus on the Essential: It is intended to encourage believers to spend their time on more useful things like Quran recitation, Dhikr, and acquiring knowledge." }
                ],
                disadvantage: "Music that incites to sin, laziness, or neglect of religious duties is considered harmful to faith and the soul."
            },
            {
                key: "tattoos",
                title: "Tattoos & Body Modifications",
                icon: XCircle,
                ruling: "Haram (Strictly Forbidden)",
                explanation: "Permanent tattoos, where the skin is pierced and filled with ink, are considered haram. The Prophet Muhammad (ﷺ) cursed those who tattoo and those who get tattooed. This is seen as changing the creation of Allah (Taghyir Khalqillah), which is an interference with the work of the Creator.",
                wisdom: [
                    { icon: ShieldCheck, text: "Preservation of Natural Creation: Islam teaches to see the body as a trust from Allah (Amanah) and not to change or harm it unnecessarily." },
                    { icon: Brain, text: "Purity and Wudu: Permanent tattoos can affect ritual purity as they can form an impermeable layer on the skin." },
                    { icon: Scale, text: "Distinction from Pagan Practices: In the past, tattoos were often associated with pagan rituals and idol worship." }
                ],
                disadvantage: "Getting a tattoo is a permanent alteration of Allah's creation and an act that incurs the curse of the Prophet (ﷺ). However, temporary adornments like henna are permitted."
            },
        ]
    }
};

const RulingCard = ({ title, icon: Icon, ruling, explanation, wisdom, disadvantage, rulingIcon: RulingIcon }: { title: string, icon: React.ElementType, ruling: string, explanation: string, wisdom: {icon: React.ElementType, text: string}[], disadvantage: string, rulingIcon: React.ElementType }) => {
    const { language } = useLanguage();
    const isHaram = ruling.includes("Haram");
    const isMushbooh = ruling.includes("Umstritten") || ruling.includes("Controversial");
    
    let rulingColor = "text-green-500";
    if (isHaram) rulingColor = "text-red-500";
    if (isMushbooh) rulingColor = "text-amber-500";

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Icon className="h-7 w-7 text-primary" />
                    {title}
                </CardTitle>
                <CardDescription className={`flex items-center gap-2 font-semibold ${rulingColor}`}>
                     <RulingIcon className="h-5 w-5" />
                    {ruling}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="explanation">
                        <AccordionTrigger>Explanation</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{explanation}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="wisdom">
                        <AccordionTrigger>Wisdom & Benefits</AccordionTrigger>
                        <AccordionContent>
                             <ul className="space-y-3 pt-2">
                                {wisdom.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <item.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                        <span className="text-muted-foreground">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="disadvantage">
                        <AccordionTrigger>Consequences of Violation</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{disadvantage}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}

export default function HalalHaramCheckerPage() {
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
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>

            <div className="max-w-3xl mx-auto space-y-8">
                {c.topics.map(topic => (
                    <RulingCard 
                        key={topic.key}
                        title={topic.title}
                        icon={topic.icon}
                        ruling={topic.ruling}
                        explanation={topic.explanation}
                        wisdom={topic.wisdom}
                        disadvantage={topic.disadvantage}
                        rulingIcon={topic.icon}
                    />
                ))}
            </div>
        </div>
    );
}
