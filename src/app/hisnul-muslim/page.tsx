
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Shield } from 'lucide-react';

const hisnulMuslimData = {
  de: {
    title: "Hisnul Muslim",
    description: "Eine Festung für den Muslim – eine Sammlung authentischer Bittgebete aus dem Koran und der Sunnah.",
    searchPlaceholder: "Suche nach einem Bittgebet...",
    chapters: [
      {
        title: "Beim Aufwachen",
        duas: [
          {
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
            translation: "Alles Lob gebührt Allah, der uns wiederbelebt hat, nachdem Er uns hat sterben lassen, und zu Ihm ist die Auferstehung."
          }
        ]
      },
      {
        title: "Beim Anziehen eines Kleidungsstücks",
        duas: [
          {
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
            transliteration: "Alhamdu lillahil-ladhi kasani hadha (ath-thawba) wa razaqanihi min ghayri hawlin minni wa la quwwatin.",
            translation: "Alles Lob gebührt Allah, der mich mit diesem (Kleidungsstück) bekleidet und es mir ohne mein Zutun und meine Kraft gewährt hat."
          }
        ]
      },
       {
        title: "Vor dem Betreten der Toilette",
        duas: [
          {
            arabic: "بِسْمِ اللهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
            transliteration: "Bismillah, Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith.",
            translation: "Im Namen Allahs. O Allah, ich suche Zuflucht bei Dir vor den männlichen und weiblichen Übeln (Dämonen)."
          }
        ]
      },
      {
        title: "Beim Verlassen des Hauses",
        duas: [
          {
            arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
            transliteration: "Bismillahi, tawakkaltu 'ala-Llah, wa la hawla wa la quwwata illa billah.",
            translation: "Im Namen Allahs, ich vertraue auf Allah, und es gibt keine Macht noch Kraft außer bei Allah."
          }
        ]
      },
      {
        title: "Bei Sorgen und Kummer",
        duas: [
            {
                arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
                transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal.",
                translation: "O Allah, ich suche Zuflucht bei Dir vor Sorge und Kummer, vor Unfähigkeit und Faulheit, vor Geiz und Feigheit, vor der Last der Schulden und der Überwältigung durch Menschen."
            }
        ]
      },
    ]
  },
  en: {
    title: "Hisnul Muslim",
    description: "Fortress of the Muslim - a collection of authentic supplications from the Quran and Sunnah.",
    searchPlaceholder: "Search for a supplication...",
    chapters: [
       {
        title: "When Waking Up",
        duas: [
          {
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
            translation: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection."
          }
        ]
      },
      {
        title: "When Wearing a Garment",
        duas: [
          {
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
            transliteration: "Alhamdu lillahil-ladhi kasani hadha (ath-thawba) wa razaqanihi min ghayri hawlin minni wa la quwwatin.",
            translation: "All praise is for Allah who has clothed me with this (garment) and provided it for me without any strength or power on my part."
          }
        ]
      },
      {
        title: "Before Entering the Toilet",
        duas: [
          {
            arabic: "بِسْمِ اللهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
            transliteration: "Bismillah, Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith.",
            translation: "In the name of Allah. O Allah, I seek refuge in You from the male and female evils (devils)."
          }
        ]
      },
      {
        title: "When Leaving the Home",
        duas: [
          {
            arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
            transliteration: "Bismillahi, tawakkaltu 'ala-Llah, wa la hawla wa la quwwata illa billah.",
            translation: "In the name of Allah, I trust in Allah, and there is no might nor power except with Allah."
          }
        ]
      },
       {
        title: "For Worry and Grief",
        duas: [
            {
                arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
                transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal.",
                translation: "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from stinginess and cowardice, from the burden of debt and from being overpowered by men."
            }
        ]
      },
    ]
  }
};

export default function HisnulMuslimPage() {
  const { language } = useLanguage();
  const c = hisnulMuslimData[language] || hisnulMuslimData.de;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChapters = c.chapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.duas.some(dua => dua.translation.toLowerCase().includes(searchTerm.toLowerCase()))
  ).map(chapter => ({
    ...chapter,
    duas: chapter.duas.filter(dua => 
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        dua.translation.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
            <Shield className="h-10 w-10" />
            {c.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <Input 
                type="text"
                placeholder={c.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
            />
        </div>
        
        {filteredChapters.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
            {filteredChapters.map((chapter, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left hover:no-underline">{chapter.title}</AccordionTrigger>
                <AccordionContent className="px-4 space-y-6">
                    {chapter.duas.map((dua, duaIndex) => (
                        <div key={duaIndex} className="border-b last:border-b-0 pb-4">
                            <p className="text-2xl font-quranic text-right tracking-wide leading-relaxed">{dua.arabic}</p>
                            <p className="text-muted-foreground italic mt-2">{dua.transliteration}</p>
                            <p className="text-foreground/90 mt-1">"{dua.translation}"</p>
                        </div>
                    ))}
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        ) : (
            <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                    <p>Keine Ergebnisse für "{searchTerm}" gefunden.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}

