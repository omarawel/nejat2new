import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const surahs = [
  {
    number: 1,
    name: "Al-Fatihah",
    translation: "The Opening",
    verses: [
      {
        id: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
        transliteration: "Bismillāhi r-raḥmāni r-raḥīm",
        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      },
      {
        id: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Al ḥamdu lillāhi rabbi l-ʿālamīn",
        translation: "All praise is due to Allah, Lord of the worlds.",
      },
      {
        id: 3,
        arabic: "الرَّحْمَـٰنِ الرَّحِيمِ",
        transliteration: "Ar raḥmāni r-raḥīm",
        translation: "The Entirely Merciful, the Especially Merciful,",
      },
    ],
  },
  {
    number: 112,
    name: "Al-Ikhlas",
    translation: "The Sincerity",
    verses: [
      {
        id: 1,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        transliteration: "Qul huwa l-lāhu aḥad",
        translation: "Say, 'He is Allah, the One.'",
      },
      {
        id: 2,
        arabic: "اللَّهُ الصَّمَدُ",
        transliteration: "Allāhu ṣ-ṣamad",
        translation: "Allah, the Eternal Refuge.",
      },
      {
        id: 3,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        transliteration: "Lam yalid wa lam yūlad",
        translation: "He neither begets nor is born,",
      },
      {
        id: 4,
        arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        transliteration: "Wa lam yaku l-lahū kufuwan aḥad",
        translation: "Nor is there to Him any equivalent.",
      },
    ],
  },
];

export default function QuranPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">The Holy Quran</h1>
        <p className="text-muted-foreground mt-2">Browse, read, and reflect upon the words of Allah.</p>
      </header>

      <Card>
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {surahs.map((surah) => (
              <AccordionItem value={`item-${surah.number}`} key={surah.number}>
                <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">{surah.number}</span>
                    <div>
                      <p className="font-semibold text-left">{surah.name}</p>
                      <p className="text-sm text-muted-foreground text-left">{surah.translation}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="divide-y divide-border">
                  {surah.verses.map((verse) => (
                    <div key={verse.id} className="px-6 py-4 space-y-3">
                      <p className="text-2xl font-quranic text-right tracking-wide leading-relaxed">{verse.arabic}</p>
                      <p className="text-muted-foreground italic">{verse.transliteration}</p>
                      <p className="text-foreground/90">{verse.translation}</p>
                    </div>
                  ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
