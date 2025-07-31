
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Volume2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const content = {
    de: {
        pageTitle: "Der Gebetsruf (Azan)",
        pageDescription: "Lerne die Worte, die Bedeutung und die Geschichte des islamischen Rufs zum Gebet.",
        backToFeatures: "Zurück zu den Funktionen",
        historyTitle: "Geschichte & Bedeutung",
        historyContent: "Der Azan wurde im ersten Jahr nach der Hidschra (Auswanderung nach Medina) durch einen wahren Traum des Gefährten Abdullah ibn Zayd (ra) eingeführt. Er ist eine öffentliche Verkündung, die die Muslime fünfmal täglich zum gemeinschaftlichen Gebet ruft. Er symbolisiert die Einheit der Gemeinschaft und ist eine ständige Erinnerung an Allah.",
        wordsTitle: "Die Worte des Azan",
        words: [
            { arabic: "ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar (4x)", meaning: "Allah ist der Größte" },
            { arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "Ashhadu an la ilaha illallah (2x)", meaning: "Ich bezeuge, dass es keine Gottheit außer Allah gibt" },
            { arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ", transliteration: "Ashhadu anna Muhammadan Rasulullah (2x)", meaning: "Ich bezeuge, dass Muhammad der Gesandte Allahs ist" },
            { arabic: "حَيَّ عَلَى ٱلصَّلَاةِ", transliteration: "Hayya 'ala s-Salah (2x)", meaning: "Eilt zum Gebet" },
            { arabic: "حَيَّ عَلَى ٱلْفَلَاحِ", transliteration: "Hayya 'ala l-Falah (2x)", meaning: "Eilt zum Erfolg" },
            { arabic: "ٱلصَّلَاةُ خَيْرٌ مِنَ ٱلنَّوْمِ", transliteration: "As-salatu khayrun minan-nawm (2x, nur Fajr)", meaning: "Das Gebet ist besser als der Schlaf" },
            { arabic: "ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar (2x)", meaning: "Allah ist der Größte" },
            { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "La ilaha illallah (1x)", meaning: "Es gibt keine Gottheit außer Allah" }
        ],
        duaTitle: "Bittgebet nach dem Azan",
        duaContent: "Nachdem der Gebetsruf beendet ist, ist es Sunnah, Segenswünsche auf den Propheten (ﷺ) zu sprechen und das folgende Dua zu rezitieren:",
        dua: {
            arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
            transliteration: "Allahumma Rabba hadhihi-d-da'wat-it-tammah, was-salat-il-qa'imah, ati Muhammadan-il-wasilata wal-fadilah, wab'ath-hu maqaman mahmudan-il-ladhi wa'adtah.",
            meaning: "O Allah, Herr dieses vollkommenen Rufes und des bevorstehenden Gebets, gewähre Muhammad die Wasilah (eine hohe Stufe im Paradies) und die Fadhilah (eine besondere Ehre) und erhebe ihn zu dem gepriesenen Rang, den Du ihm versprochen hast."
        },
        stylesTitle: "Verschiedene Azan-Stile",
        stylesDescription: "Höre dir die wunderschönen Rezitationen des Azan aus verschiedenen Teilen der Welt an."
    },
    en: {
        pageTitle: "The Call to Prayer (Adhan)",
        pageDescription: "Learn the words, meaning, and history of the Islamic call to prayer.",
        backToFeatures: "Back to Features",
        historyTitle: "History & Significance",
        historyContent: "The Adhan was instituted in the first year after the Hijra (migration to Medina) through a true dream of the companion Abdullah ibn Zayd (ra). It is a public proclamation that calls Muslims to congregational prayer five times a day. It symbolizes the unity of the community and is a constant reminder of Allah.",
        wordsTitle: "The Words of the Adhan",
        words: [
            { arabic: "ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar (4x)", meaning: "Allah is the Greatest" },
            { arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "Ashhadu an la ilaha illallah (2x)", meaning: "I bear witness that there is no deity but Allah" },
            { arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ", transliteration: "Ashhadu anna Muhammadan Rasulullah (2x)", meaning: "I bear witness that Muhammad is the Messenger of Allah" },
            { arabic: "حَيَّ عَلَى ٱلصَّلَاةِ", transliteration: "Hayya 'ala s-Salah (2x)", meaning: "Hasten to the prayer" },
            { arabic: "حَيَّ عَلَى ٱلْفَلَاحِ", transliteration: "Hayya 'ala l-Falah (2x)", meaning: "Hasten to success" },
            { arabic: "ٱلصَّلَاةُ خَيْرٌ مِنَ ٱلنَّوْمِ", transliteration: "As-salatu khayrun minan-nawm (2x, Fajr only)", meaning: "Prayer is better than sleep" },
            { arabic: "ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar (2x)", meaning: "Allah is the Greatest" },
            { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "La ilaha illallah (1x)", meaning: "There is no deity but Allah" }
        ],
        duaTitle: "Supplication after the Adhan",
        duaContent: "After the call to prayer is finished, it is Sunnah to send blessings upon the Prophet (ﷺ) and recite the following Dua:",
        dua: {
            arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
            transliteration: "Allahumma Rabba hadhihi-d-da'wat-it-tammah, was-salat-il-qa'imah, ati Muhammadan-il-wasilata wal-fadilah, wab'ath-hu maqaman mahmudan-il-ladhi wa'adtah.",
            meaning: "O Allah, Lord of this perfect call and the prayer to be offered, grant Muhammad the Wasilah (a high station in Paradise) and Fadhilah (a special honor) and raise him to the praiseworthy station that You have promised him."
        },
        stylesTitle: "Different Adhan Styles",
        stylesDescription: "Listen to the beautiful recitations of the Adhan from different parts of the world."
    }
}

const AudioPlayer = ({ title }: { title: string }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    // In a real app, you'd pass the audio URL here.
    // const [isPlaying, setIsPlaying] = useState(false);
    // const togglePlay = () => { setIsPlaying(!isPlaying); ... }

    return (
        <Card className="flex items-center p-4 bg-muted/50">
            <div className="flex-grow">
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">Audio Sample</p>
            </div>
            <Button variant="ghost" size="icon" disabled>
                <PlayCircle className="h-6 w-6" />
            </Button>
        </Card>
    );
}

export default function AzanPage() {
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

        <div className="max-w-4xl mx-auto space-y-8">
             <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                <AccordionItem value="item-0">
                    <AccordionTrigger className="text-2xl">{c.historyTitle}</AccordionTrigger>
                    <AccordionContent className="text-lg text-muted-foreground">
                        {c.historyContent}
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl">{c.wordsTitle}</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            {c.words.map((word, index) => (
                                <div key={index} className="p-4 border-b">
                                    <p className="text-3xl font-quranic text-right">{word.arabic}</p>
                                    <p className="text-muted-foreground italic text-right mt-1">{word.transliteration}</p>
                                    <p className="text-foreground/80 text-right mt-2">&quot;{word.meaning}&quot;</p>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-2xl">{c.duaTitle}</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <p className="text-lg text-muted-foreground">{c.duaContent}</p>
                         <Card className="bg-primary/5">
                            <CardContent className="p-6 space-y-3">
                                <p className="text-3xl font-quranic text-right">{c.dua.arabic}</p>
                                <p className="text-muted-foreground italic text-right">{c.dua.transliteration}</p>
                                <p className="text-foreground/80 text-right mt-2">&quot;{c.dua.meaning}&quot;</p>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
             </Accordion>

             <Card>
                <CardHeader>
                    <CardTitle>{c.stylesTitle}</CardTitle>
                    <CardDescription>{c.stylesDescription}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <AudioPlayer title="Azan Makkah" />
                   <AudioPlayer title="Azan Madinah" />
                   <AudioPlayer title="Azan Turkey" />
                   <AudioPlayer title="Azan Egypt" />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
