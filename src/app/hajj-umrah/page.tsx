
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Plane, ArrowLeft, Key, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
  de: {
    pageTitle: 'Haddsch & Umrah',
    pageDescription: 'Ein umfassender Leitfaden zu den heiligen Pilgerfahrten nach Mekka.',
    backToFeatures: "Zurück zu den Funktionen",
    sections: [
        {
            title: 'Was ist der Unterschied zwischen Haddsch und Umrah?',
            content: 'Der Haddsch ist die große Pilgerfahrt, eine der fünf Säulen des Islam, und muss zu einer bestimmten Zeit im islamischen Monat Dhul-Hijjah durchgeführt werden. Die Umrah ist die "kleine" Pilgerfahrt und kann zu jeder Zeit des Jahres vollzogen werden. Der Haddsch beinhaltet zusätzliche Rituale wie den Aufenthalt in Arafat, Muzdalifah und Mina, die bei der Umrah nicht vorkommen.'
        },
        {
            title: 'Die drei Arten des Haddsch',
            subsections: [
                {
                    name: 'Haddsch Tamattu',
                    description: 'Der Pilger vollzieht zuerst die Rituale der Umrah, verlässt dann den Weihezustand (Ihram) und tritt am 8. Dhul-Hijjah erneut in den Ihram für die Haddsch-Rituale ein. Dies ist die am häufigsten praktizierte Form.'
                },
                {
                    name: 'Haddsch Qiran',
                    description: 'Der Pilger fasst die Absicht für Haddsch und Umrah gleichzeitig und bleibt im Ihram-Zustand, bis alle Rituale beider Pilgerfahrten abgeschlossen sind.'
                },
                {
                    name: 'Haddsch Ifrad',
                    description: 'Der Pilger fasst nur die Absicht für den Haddsch und vollzieht ausschließlich dessen Rituale.'
                }
            ]
        },
        {
            title: 'Schlüsselrituale des Haddsch & der Umrah',
            subsections: [
                {
                    name: 'Ihram',
                    description: 'Der geweihte Zustand, den ein Pilger vor dem Betreten der heiligen Grenzen (Miqat) annehmen muss. Für Männer besteht die Kleidung aus zwei einfachen, ungenähten weißen Tüchern. Frauen können ihre reguläre, bescheidene Kleidung tragen. Im Ihram sind bestimmte Handlungen wie das Schneiden von Haaren/Nägeln, die Benutzung von Parfüm oder sexuelle Beziehungen verboten.'
                },
                {
                    name: 'Tawaf',
                    description: 'Das siebenmalige Umrunden der Kaaba gegen den Uhrzeigersinn. Jede Runde beginnt und endet am Schwarzen Stein (Hajar al-Aswad). Es ist ein zentraler Akt der Anbetung, der die Einheit der Muslime symbolisiert, die sich um ein Zentrum drehen.'
                },
                {
                    name: 'Sa\'i',
                    description: 'Das siebenmalige Gehen oder Laufen zwischen den Hügeln Safa und Marwa, in Gedenken an Hajars verzweifelte Suche nach Wasser für ihren Sohn Ismail. Es symbolisiert Ausdauer, Hoffnung und Vertrauen in Allah.'
                },
                {
                    name: 'Halaq oder Taqsir',
                    description: 'Das Abrasieren (Halaq) oder Kürzen (Taqsir) der Haare. Dies markiert die Vollendung der Umrah. Beim Haddsch erfolgt dies an einem späteren Zeitpunkt.'
                }
            ]
        },
        {
            title: 'Zusätzliche Rituale nur für den Haddsch',
            subsections: [
                {
                    name: 'Tag von Arafat (9. Dhul-Hijjah)',
                    description: 'Der Höhepunkt des Haddsch. Die Pilger versammeln sich in der Ebene von Arafat und verbringen den Tag von Mittag bis Sonnenuntergang im Gebet, in der Reue und im Gedenken an Allah. Der Prophet (ﷺ) sagte: "Der Haddsch ist Arafat."'
                },
                {
                    name: 'Muzdalifah',
                    description: 'Nach Sonnenuntergang in Arafat begeben sich die Pilger nach Muzdalifah, wo sie die Nacht unter freiem Himmel verbringen und Kieselsteine für die symbolische Steinigung des Teufels sammeln.'
                },
                {
                    name: 'Ramy al-Jamarat (Steinigung des Teufels)',
                    description: 'An den folgenden Tagen in Mina werfen die Pilger die gesammelten Kieselsteine auf drei Säulen (Jamarat), was die Ablehnung des Teufels und seiner Versuchungen symbolisiert, in Gedenken an Ibrahims Standhaftigkeit.'
                },
                {
                    name: 'Hady (Opfertier)',
                    description: 'Pilger, die den Tamattu- oder Qiran-Haddsch vollziehen, schlachten ein Opfertier (z. B. ein Schaf oder eine Ziege) in Gedenken an das Opfer, das Ibrahim zu bringen bereit war. Das Fleisch wird an die Armen verteilt.'
                }
            ]
        }
    ]
  },
  en: {
    pageTitle: 'Hajj & Umrah',
    pageDescription: 'A comprehensive guide to the sacred pilgrimages to Mecca.',
    backToFeatures: "Back to Features",
    sections: [
        {
            title: 'What is the difference between Hajj and Umrah?',
            content: 'Hajj is the major pilgrimage, one of the five pillars of Islam, and must be performed at a specific time in the Islamic month of Dhul-Hijjah. Umrah is the "minor" pilgrimage and can be undertaken at any time of the year. Hajj includes additional rituals such as the stay at Arafat, Muzdalifah, and Mina, which are not part of Umrah.'
        },
        {
            title: 'The Three Types of Hajj',
            subsections: [
                {
                    name: 'Hajj Tamattu',
                    description: 'The pilgrim first performs the rituals of Umrah, then leaves the state of consecration (Ihram), and re-enters Ihram on the 8th of Dhul-Hijjah for the Hajj rituals. This is the most commonly practiced form.'
                },
                {
                    name: 'Hajj Qiran',
                    description: 'The pilgrim intends for Hajj and Umrah simultaneously and remains in the state of Ihram until all rituals of both pilgrimages are completed.'
                },
                {
                    name: 'Hajj Ifrad',
                    description: 'The pilgrim intends only for Hajj and performs only its rituals.'
                }
            ]
        },
        {
            title: 'Key Rituals of Hajj & Umrah',
            subsections: [
                {
                    name: 'Ihram',
                    description: 'The sacred state a pilgrim must enter before crossing the holy boundaries (Miqat). For men, the clothing consists of two simple, unstitched white cloths. Women can wear their regular, modest clothing. In Ihram, certain actions such as cutting hair/nails, using perfume, or sexual relations are forbidden.'
                },
                {
                    name: 'Tawaf',
                    description: 'The circumambulation of the Kaaba seven times in a counter-clockwise direction. Each circuit begins and ends at the Black Stone (Hajar al-Aswad). It is a central act of worship, symbolizing the unity of Muslims revolving around one center.'
                },
                {
                    name: 'Sa\'i',
                    description: 'The act of walking or running seven times between the hills of Safa and Marwa, in commemoration of Hajar\'s desperate search for water for her son Ismail. It symbolizes perseverance, hope, and trust in Allah.'
                },
                {
                    name: 'Halaq or Taqsir',
                    description: 'The shaving (Halaq) or shortening (Taqsir) of the hair. This marks the completion of the Umrah. During Hajj, this is done at a later stage.'
                }
            ]
        },
        {
            title: 'Additional Rituals for Hajj Only',
            subsections: [
                {
                    name: 'Day of Arafat (9th Dhul-Hijjah)',
                    description: 'The climax of the Hajj. Pilgrims gather on the plain of Arafat and spend the day from noon to sunset in prayer, repentance, and remembrance of Allah. The Prophet (ﷺ) said: "The Hajj is Arafat."'
                },
                {
                    name: 'Muzdalifah',
                    description: 'After sunset at Arafat, pilgrims proceed to Muzdalifah, where they spend the night under the open sky and collect pebbles for the symbolic stoning of the devil.'
                },
                {
                    name: 'Ramy al-Jamarat (Stoning of the Devil)',
                    description: 'On the following days in Mina, pilgrims throw the collected pebbles at three pillars (Jamarat), symbolizing the rejection of the devil and his temptations, in commemoration of Ibrahim\'s steadfastness.'
                },
                {
                    name: 'Hady (Sacrificial Animal)',
                    description: 'Pilgrims performing Hajj Tamattu or Qiran slaughter a sacrificial animal (e.g., a sheep or goat) in commemoration of the sacrifice Ibrahim was willing to make. The meat is distributed to the poor.'
                }
            ]
        }
    ]
  }
};


export default function HajjUmrahPage() {
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
            <Plane className="h-10 w-10" />
            {c.pageTitle}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.pageDescription}</p>
      </header>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {c.sections.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-xl text-left hover:no-underline">{item.title}</AccordionTrigger>
                <AccordionContent className="text-base text-foreground/80 px-4 space-y-4">
                  {item.content && <p>{item.content}</p>}
                  {item.subsections && (
                    <div className="space-y-4">
                        {item.subsections.map((sub, subIndex) => (
                            <div key={subIndex} className="pl-4 border-l-2 border-primary/20">
                                <h4 className="font-semibold text-lg">{sub.name}</h4>
                                <p className="text-muted-foreground">{sub.description}</p>
                            </div>
                        ))}
                    </div>
                  )}
                </AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
