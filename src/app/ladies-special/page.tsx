
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { Sparkles, ArrowLeft, Heart, Droplets, BookHeart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
  de: {
    pageTitle: "Ladies Special",
    pageDescription: "Ein Bereich mit Wissen und Inspiration, speziell für muslimische Frauen.",
    backToFeatures: "Zurück zu den Funktionen",
    sections: [
      {
        icon: Heart,
        title: "Der Status der Frau im Islam",
        content: "Der Islam hat die Frau geehrt und ihr wichtige Rechte und eine hohe Stellung in der Gesellschaft eingeräumt. Sie ist als Tochter eine Barmherzigkeit, als Ehefrau die Vervollständigung des halben Glaubens ihres Mannes und als Mutter liegt das Paradies unter ihren Füßen. Der Koran und die Sunnah betonen immer wieder die Gleichwertigkeit von Mann und Frau vor Allah in Bezug auf ihre Taten und ihre Belohnung."
      },
      {
        icon: Droplets,
        title: "Fiqh der Menstruation (Hayd)",
        content: "Das Verständnis der Regeln bezüglich der Menstruation ist für eine muslimische Frau von großer Bedeutung. Während dieser Zeit ist sie vom rituellen Gebet (Salah) und dem Fasten befreit. Diese müssen nicht nachgeholt werden. Sie kann jedoch weiterhin Dhikr (Gedenken an Allah), Dua (Bittgebete) machen und den Koran lesen, ohne den Mushaf direkt zu berühren. Nach Beendigung der Periode ist eine Ganzkörperwaschung (Ghusl) erforderlich, um den Zustand der rituellen Reinheit wiederzuerlangen."
      },
      {
        icon: BookHeart,
        title: "Inspirierende Frauen: Khadijah (ra)",
        content: "Khadijah bint Khuwaylid (radiallahu 'anha) war die erste Ehefrau des Propheten Muhammad (ﷺ) und die erste Person, die zum Islam konvertierte. Sie war eine erfolgreiche, unabhängige Geschäftsfrau und bekannt für ihre Weisheit und ihren edlen Charakter. Sie war die größte Stütze des Propheten in den Anfangsjahren der Offenbarung, spendete ihm Trost, bestärkte ihn und setzte ihr gesamtes Vermögen für die Sache des Islam ein. Ihre Liebe und ihr Vertrauen waren eine Quelle großer Kraft für den Propheten."
      },
       {
        icon: Shield,
        title: "Die Bedeutung des Hijab",
        content: "Der Hijab ist weit mehr als nur ein Kopftuch; er ist ein Ausdruck des Glaubens, der Identität und der Selbstachtung. Er ist ein Akt des Gehorsams gegenüber Allah und symbolisiert Bescheidenheit und Würde. Der Hijab schützt die Frau davor, auf ihr Äußeres reduziert zu werden, und lenkt den Fokus auf ihren Intellekt, ihren Charakter und ihre Persönlichkeit. Es ist eine bewusste Entscheidung, die die spirituelle und innere Schönheit über die äußere stellt."
      },
       {
        icon: Heart,
        title: "Dua für eine rechtschaffene Familie",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama.",
        translation: "Unser Herr, schenke uns an unseren Gattinnen und unseren Nachkommen Freude für die Augen und mache uns zu einem Vorbild für die Gottesfürchtigen. (Sure Al-Furqan, 25:74)"
      }
    ]
  },
  en: {
    pageTitle: "Ladies Special",
    pageDescription: "A section with knowledge and inspiration, especially for Muslim women.",
    backToFeatures: "Back to Features",
    sections: [
      {
        icon: Heart,
        title: "The Status of Women in Islam",
        content: "Islam has honored women, granting them important rights and a high status in society. As a daughter, she is a source of mercy; as a wife, she completes half of her husband's faith; and as a mother, Paradise lies at her feet. The Quran and Sunnah repeatedly emphasize the equality of men and women before Allah in terms of their deeds and their reward."
      },
      {
        icon: Droplets,
        title: "Fiqh of Menstruation (Hayd)",
        content: "Understanding the rules concerning menstruation is of great importance for a Muslim woman. During this time, she is exempt from ritual prayer (Salah) and fasting, which do not need to be made up. However, she can continue to perform Dhikr (remembrance of Allah), make Dua (supplications), and read the Quran without directly touching the Mushaf. After the period ends, a full-body ritual bath (Ghusl) is required to regain a state of ritual purity."
      },
      {
        icon: BookHeart,
        title: "Inspiring Women: Khadijah (ra)",
        content: "Khadijah bint Khuwaylid (radiAllahu 'anha) was the first wife of the Prophet Muhammad (ﷺ) and the first person to convert to Islam. She was a successful, independent businesswoman known for her wisdom and noble character. She was the Prophet's greatest supporter in the early years of revelation, providing him comfort, encouragement, and using all her wealth for the cause of Islam. Her love and trust were a source of great strength for the Prophet."
      },
       {
        icon: Shield,
        title: "The Meaning of Hijab",
        content: "Hijab is much more than just a headscarf; it is an expression of faith, identity, and self-respect. It is an act of obedience to Allah and symbolizes modesty and dignity. The Hijab protects a woman from being judged on her appearance and shifts the focus to her intellect, character, and personality. It is a conscious choice that prioritizes spiritual and inner beauty over a superficial one."
      },
      {
        icon: Heart,
        title: "Dua for a Righteous Family",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama.",
        translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous. (Surah Al-Furqan, 25:74)"
      }
    ]
  }
}

export default function LadiesSpecialPage() {
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
                <Sparkles className="h-10 w-10" />
                {c.pageTitle}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.pageDescription}</p>
        </header>
        
        <div className="max-w-3xl mx-auto">
             <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {c.sections.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-xl text-left hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <Icon className="h-6 w-6 text-primary" />
                                    <span>{item.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-foreground/80 px-4 space-y-4">
                              <p>{item.content}</p>
                              {item.arabic && (
                                <div className="pt-2">
                                  <p className="text-xl font-quranic text-right">{item.arabic}</p>
                                  <p className="text-sm italic text-muted-foreground text-right">{item.transliteration}</p>
                                  <p className="text-sm text-muted-foreground text-right mt-1">"{item.translation}"</p>
                                </div>
                              )}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    </div>
  );
}
