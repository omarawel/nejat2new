
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { ArrowLeft, Star, Moon, Sun, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        pageTitle: "Arten des Gebets (Salah)",
        pageDescription: "Ein Überblick über die verschiedenen Kategorien von Gebeten im Islam.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                title: "Fard (Pflichtgebete)",
                description: "Dies sind die obligatorischen Gebete, die die Grundlage des täglichen Gottesdienstes bilden. Ihre Unterlassung ist eine große Sünde.",
                items: [
                    "**Die fünf täglichen Gebete (Salawat al-Khams):** Fajr (2 Rak'at), Dhuhr (4 Rak'at), Asr (4 Rak'at), Maghrib (3 Rak'at) und Isha (4 Rak'at).",
                    "**Freitagsgebet (Salat al-Jumu'ah):** Obligatorisch für Männer, wird in der Gemeinschaft in der Moschee anstelle des Dhuhr-Gebets verrichtet."
                ]
            },
            {
                title: "Wajib (Notwendige Gebete)",
                description: "Diese Gebete sind nach einigen Rechtsschulen (insbesondere der hanafitischen) fast so verpflichtend wie Fard. Ihre Unterlassung gilt ebenfalls als sündhaft.",
                items: [
                    "**Witr-Gebet:** Wird nach dem Isha-Gebet verrichtet, bestehend aus einer ungeraden Anzahl von Rak'at (üblicherweise 1 oder 3).",
                    "**Eid-Gebete (Salat al-Eidain):** Die Gebete für Eid al-Fitr und Eid al-Adha."
                ]
            },
            {
                title: "Sunnah (Empfohlene Gebete)",
                description: "Dies sind Gebete, die der Prophet Muhammad (ﷺ) regelmäßig verrichtet hat. Ihre Verrichtung bringt große Belohnung, während ihre Unterlassung keine Sünde ist. Man unterscheidet zwischen stark empfohlenen (Mu'akkadah) und weniger stark empfohlenen (Ghayr Mu'akkadah) Sunnah-Gebeten.",
                items: [
                    "**Sunan ar-Rawatib (Mu'akkadah):** 12 Rak'at, die mit den Fard-Gebeten verbunden sind: 2 vor Fajr, 4 vor Dhuhr, 2 nach Dhuhr, 2 nach Maghrib, 2 nach Isha.",
                    "**Tahajjud (Nachtgebet):** Ein freiwilliges Gebet, das im letzten Drittel der Nacht verrichtet wird und als besonders verdienstvoll gilt.",
                    "**Duha-Gebet (Vormittagsgebet):** Wird nach Sonnenaufgang bis kurz vor Dhuhr verrichtet."
                ]
            },
            {
                title: "Nafl (Freiwillige Gebete)",
                description: "Dies sind zusätzliche freiwillige Gebete, die ein Muslim jederzeit (außer zu den verbotenen Zeiten) verrichten kann, um näher zu Allah zu kommen.",
                items: [
                    "**Tahiyyat al-Masjid:** Zwei Rak'at beim Betreten einer Moschee, bevor man sich setzt.",
                    "**Salat al-Istikhara:** Das Gebet um Führung bei einer Entscheidung.",
                    "**Salat al-Tasbih:** Ein besonderes Gebet, das eine hohe Anzahl an Lobpreisungen beinhaltet."
                ]
            },
            {
                title: "Weitere Anlassgebete",
                description: "Gebete, die zu bestimmten Anlässen verrichtet werden.",
                items: [
                    "**Salat al-Janazah (Totengebet):** Ein Gemeinschaftsgebet für einen Verstorbenen.",
                    "**Salat al-Kusuf/Khusuf (Sonnen-/Mondfinsternisgebet):** Gebete während einer Sonnen- oder Mondfinsternis.",
                    "**Salat al-Istisqa (Gebet um Regen):** Ein Gemeinschaftsgebet in Zeiten der Dürre."
                ]
            }
        ]
    },
    en: {
        pageTitle: "Types of Prayer (Salah)",
        pageDescription: "An overview of the different categories of prayers in Islam.",
        backToFeatures: "Back to Features",
        sections: [
            {
                title: "Fard (Obligatory Prayers)",
                description: "These are the mandatory prayers that form the basis of daily worship. Neglecting them is a major sin.",
                items: [
                    "**The five daily prayers (Salawat al-Khams):** Fajr (2 Rak'at), Dhuhr (4 Rak'at), Asr (4 Rak'at), Maghrib (3 Rak'at), and Isha (4 Rak'at).",
                    "**Friday Prayer (Salat al-Jumu'ah):** Obligatory for men, performed in congregation at the mosque instead of the Dhuhr prayer."
                ]
            },
            {
                title: "Wajib (Necessary Prayers)",
                description: "According to some schools of thought (especially the Hanafi school), these prayers are almost as obligatory as Fard. Neglecting them is also considered sinful.",
                items: [
                    "**Witr Prayer:** Performed after the Isha prayer, consisting of an odd number of Rak'at (usually 1 or 3).",
                    "**Eid Prayers (Salat al-Eidain):** The prayers for Eid al-Fitr and Eid al-Adha."
                ]
            },
            {
                title: "Sunnah (Recommended Prayers)",
                description: "These are prayers that the Prophet Muhammad (ﷺ) regularly performed. Performing them brings great reward, while omitting them is not a sin. A distinction is made between highly recommended (Mu'akkadah) and less emphasized (Ghayr Mu'akkadah) Sunnah prayers.",
                items: [
                    "**Sunan ar-Rawatib (Mu'akkadah):** 12 Rak'at associated with the Fard prayers: 2 before Fajr, 4 before Dhuhr, 2 after Dhuhr, 2 after Maghrib, 2 after Isha.",
                    "**Tahajjud (Night Prayer):** A voluntary prayer performed in the last third of the night, considered particularly meritorious.",
                    "**Duha Prayer (Forenoon Prayer):** Performed after sunrise until just before Dhuhr."
                ]
            },
            {
                title: "Nafl (Voluntary Prayers)",
                description: "These are additional voluntary prayers that a Muslim can perform at any time (except during the forbidden times) to draw closer to Allah.",
                items: [
                    "**Tahiyyat al-Masjid:** Two Rak'at upon entering a mosque before sitting down.",
                    "**Salat al-Istikhara:** The prayer for guidance in making a decision.",
                    "**Salat al-Tasbih:** A special prayer involving a high number of praises."
                ]
            },
             {
                title: "Other Occasional Prayers",
                description: "Prayers performed on specific occasions.",
                items: [
                    "**Salat al-Janazah (Funeral Prayer):** A communal prayer for a deceased person.",
                    "**Salat al-Kusuf/Khusuf (Eclipse Prayers):** Prayers during a solar or lunar eclipse.",
                    "**Salat al-Istisqa (Prayer for Rain):** A communal prayer in times of drought."
                ]
            }
        ]
    }
};

export default function TypesOfSalahPage() {
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
                    {c.pageTitle}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.pageDescription}</p>
            </header>
            
            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {c.sections.map((section, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-xl text-left hover:no-underline">{section.title}</AccordionTrigger>
                            <AccordionContent className="px-4 space-y-4">
                               <p className="text-muted-foreground">{section.description}</p>
                               <ul className="list-disc list-inside space-y-2">
                                   {section.items.map((item, i) => (
                                       <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                                   ))}
                               </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
