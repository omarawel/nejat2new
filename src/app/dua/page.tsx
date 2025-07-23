
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const duaData = {
  de: {
    title: "Sammlung von Bittgebeten (Dua)",
    description: "Wichtige Bittgebete für verschiedene Anlässe im Leben eines Muslims.",
    backToFeatures: "Zurück zu den Funktionen",
    duas: [
      {
        category: "Morgens & Abends",
        items: [
          {
            title: "Beim Aufwachen",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
            translation: "Alles Lob gebührt Allah, der uns wiederbelebt hat, nachdem Er uns hat sterben lassen, und zu Ihm ist die Auferstehung."
          },
          {
            title: "Vor dem Schlafen",
            arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
            transliteration: "Bismika Allahumma amutu wa ahya.",
            translation: "In Deinem Namen, o Allah, sterbe ich und lebe ich."
          }
        ]
      },
      {
        category: "Essen & Trinken",
        items: [
          {
            title: "Vor dem Essen",
            arabic: "بِسْمِ اللهِ",
            transliteration: "Bismillah.",
            translation: "Im Namen Allahs."
          },
          {
            title: "Nach dem Essen",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
            transliteration: "Alhamdu lillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwatin.",
            translation: "Alles Lob gebührt Allah, der mich dies hat essen lassen und mich damit versorgt hat, ohne Macht und Kraft meinerseits."
          }
        ]
      },
      {
        category: "Tägliche Handlungen",
        items: [
          {
            title: "Beim Betreten des Hauses",
            arabic: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى اللهِ رَبَّنَا تَوَكَّلْنَا",
            transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala-Lahi rabbina tawakkalna.",
            translation: "Im Namen Allahs treten wir ein, und im Namen Allahs treten wir aus, und auf Allah, unseren Herrn, vertrauen wir."
          },
          {
            title: "Beim Verlassen des Hauses",
            arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
            transliteration: "Bismillahi, tawakkaltu 'ala-Llah, wa la hawla wa la quwwata illa billah.",
            translation: "Im Namen Allahs, ich vertraue auf Allah, und es gibt keine Macht noch Kraft außer bei Allah."
          },
          {
            title: "Vor dem Betreten der Toilette",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
            transliteration: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith.",
            translation: "O Allah, ich suche Zuflucht bei Dir vor den männlichen und weiblichen Übeln (Dämonen)."
          },
          {
            title: "Nach dem Verlassen der Toilette",
            arabic: "غُفْرَانَكَ",
            transliteration: "Ghufranaka.",
            translation: "(Ich bitte um) Deine Vergebung."
          }
        ]
      },
       {
        category: "Schutz & Sorgen",
        items: [
            {
                title: "Bei Sorgen und Kummer",
                arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَзَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
                transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal.",
                translation: "O Allah, ich suche Zuflucht bei Dir vor Sorge und Kummer, vor Unfähigkeit und Faulheit, vor Geiz und Feigheit, vor der Last der Schulden und der Überwältigung durch Menschen."
            },
            {
                title: "Für einen Kranken",
                arabic: "أَسْأَلُ اللهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
                transliteration: "As'alullahal-'Adhima Rabbal-'Arshil-'Adhimi an yashfiyak.",
                translation: "Ich bitte Allah, den Gewaltigen, den Herrn des gewaltigen Throns, dich zu heilen. (7-mal sagen)"
            }
        ]
      }
    ]
  },
  en: {
    title: "Collection of Supplications (Dua)",
    description: "Important supplications for various occasions in a Muslim's life.",
    backToFeatures: "Back to Features",
    duas: [
       {
        category: "Morning & Evening",
        items: [
          {
            title: "When Waking Up",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
            translation: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection."
          },
          {
            title: "Before Sleeping",
            arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
            transliteration: "Bismika Allahumma amutu wa ahya.",
            translation: "In Your name O Allah, I die and I live."
          }
        ]
      },
      {
        category: "Food & Drink",
        items: [
          {
            title: "Before Eating",
            arabic: "بِسْمِ اللهِ",
            transliteration: "Bismillah.",
            translation: "In the name of Allah."
          },
          {
            title: "After Eating",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
            transliteration: "Alhamdu lillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwatin.",
            translation: "All praise is for Allah who fed me this and provided it for me without any might nor power from myself."
          }
        ]
      },
      {
        category: "Daily Actions",
        items: [
          {
            title: "When Entering the House",
            arabic: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى اللهِ رَبَّنَا تَوَكَّلْنَا",
            transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala-Lahi rabbina tawakkalna.",
            translation: "In the name of Allah we enter, and in the name of Allah we leave, and upon Allah our Lord we rely."
          },
          {
            title: "When Leaving the House",
            arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
            transliteration: "Bismillahi, tawakkaltu 'ala-Llah, wa la hawla wa la quwwata illa billah.",
            translation: "In the name of Allah, I trust in Allah, and there is no might nor power except with Allah."
          },
          {
            title: "Before Entering the Toilet",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
            transliteration: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith.",
            translation: "O Allah, I seek refuge in You from the male and female evils (devils)."
          },
          {
            title: "After Leaving the Toilet",
            arabic: "غُفْرَانَكَ",
            transliteration: "Ghufranaka.",
            translation: "(I seek) Your forgiveness."
          }
        ]
      },
       {
        category: "Protection & Worries",
        items: [
            {
                title: "For Worry and Grief",
                arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَзَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
                transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal.",
                translation: "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from stinginess and cowardice, from the burden of debt and from being overpowered by men."
            },
            {
                title: "For a Sick Person",
                arabic: "أَسْأَلُ اللهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
                transliteration: "As'alullahal-'Adhima Rabbal-'Arshil-'Adhimi an yashfiyak.",
                translation: "I ask Allah, the Mighty, the Lord of the Mighty Throne, to heal you. (Say 7 times)"
            }
        ]
      }
    ]
  }
};

export default function DuaPage() {
  const { language } = useLanguage();
  const content = duaData[language] || duaData.de;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {content.backToFeatures}
        </Link>
      </Button>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{content.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{content.description}</p>
      </header>
      <div className="max-w-4xl mx-auto">
        {content.duas.map((category, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4 pb-2 border-b">{category.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.items.map((dua, duaIndex) => (
                <AccordionItem key={duaIndex} value={`item-${index}-${duaIndex}`}>
                  <AccordionTrigger className="text-lg text-left hover:no-underline">{dua.title}</AccordionTrigger>
                  <AccordionContent className="px-4 space-y-4">
                    <p className="text-2xl font-quranic text-right tracking-wide leading-relaxed">{dua.arabic}</p>
                    <p className="text-muted-foreground italic">{dua.transliteration}</p>
                    <p className="text-foreground/90">"{dua.translation}"</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
