
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Volume2, BrainCircuit } from 'lucide-react';
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
        pageTitle: "Der Gebetsruf (Azan & Iqamah)",
        pageDescription: "Lerne die Worte, die Bedeutung und die Geschichte des islamischen Rufs zum Gebet.",
        backToFeatures: "Zurück zu den Funktionen",
        memorize: "Lernen",
        historyTitle: "Geschichte & Bedeutung",
        historyContent: "Der Azan wurde im ersten Jahr nach der Hidschra (Auswanderung nach Medina) durch einen wahren Traum des Gefährten Abdullah ibn Zayd (ra) eingeführt. Der erste Muezzin des Islam war Bilal ibn Rabah (ra), der vom Propheten (ﷺ) für seine klangvolle und schöne Stimme ausgewählt wurde. Der Azan ist eine öffentliche Verkündung, die die Muslime fünfmal täglich zum gemeinschaftlichen Gebet ruft. Er symbolisiert die Einheit der Gemeinschaft und ist eine ständige Erinnerung an Allah.",
        etiquetteTitle: "Was sagt man während des Azan?",
        etiquetteContent: "Es ist Sunnah, dem Muezzin aufmerksam zuzuhören und seine Worte zu wiederholen. Eine Ausnahme gibt es:",
        etiquettePhrase: {
          when: "Wenn der Muezzin 'Hayya 'ala s-Salah' oder 'Hayya 'ala l-Falah' sagt, antwortet man:",
          arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ",
          transliteration: "La hawla wa la quwwata illa billah",
          meaning: "Es gibt keine Macht noch Kraft außer bei Allah."
        },
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
        iqamahTitle: "Die Worte der Iqamah",
        iqamahContent: "Die Iqamah ist der zweite Ruf zum Gebet, der unmittelbar vor dem Beginn des Gemeinschaftsgebets (Salah) gesprochen wird. Sie signalisiert, dass das Gebet nun beginnt.",
        iqamahWords: [
            { arabic: "ٱللَّٰهُ أَكْبَرُ، ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar, Allahu Akbar", meaning: "Allah ist der Größte, Allah ist der Größte" },
            { arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "Ashhadu an la ilaha illallah", meaning: "Ich bezeuge, dass es keine Gottheit außer Allah gibt" },
            { arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ", transliteration: "Ashhadu anna Muhammadan Rasulullah", meaning: "Ich bezeuge, dass Muhammad der Gesandte Allahs ist" },
            { arabic: "حَيَّ عَلَى ٱلصَّلَاةِ", transliteration: "Hayya 'ala s-Salah", meaning: "Eilt zum Gebet" },
            { arabic: "حَيَّ عَلَى ٱلْفَلَاحِ", transliteration: "Hayya 'ala l-Falah", meaning: "Eilt zum Erfolg" },
            { arabic: "قَدْ قَامَتِ ٱلصَّلَاةُ، قَدْ قَامَتِ ٱلصَّلَاةُ", transliteration: "Qad qamatis-Salah, Qad qamatis-Salah", meaning: "Das Gebet hat begonnen, das Gebet hat begonnen" },
            { arabic: "ٱللَّٰهُ أَكْبَرُ، ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar, Allahu Akbar", meaning: "Allah ist der Größte, Allah ist der Größte" },
            { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "La ilaha illallah", meaning: "Es gibt keine Gottheit außer Allah" }
        ],
        duaTitle: "Bittgebet nach dem Azan",
        duaContent: "Nachdem der Gebetsruf beendet ist, ist es Sunnah, Segenswünsche auf den Propheten (ﷺ) zu sprechen und das folgende Dua zu rezitieren:",
        dua: {
            arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
            transliteration: "Allahumma Rabba hadhihi-d-da'wat-it-tammah, was-salat-il-qa'imah, ati Muhammadan-il-wasilata wal-fadilah, wab'ath-hu maqaman mahmudan-il-ladhi wa'adtah.",
            meaning: "O Allah, Herr dieses vollkommenen Rufes und des bevorstehenden Gebets, gewähre Muhammad die Wasilah (eine hohe Stufe im Paradies) und die Fadhilah (eine besondere Ehre) und erhebe ihn zu dem gepriesenen Rang, den Du ihm versprochen hast."
        },
    },
    en: {
        pageTitle: "The Call to Prayer (Adhan & Iqamah)",
        pageDescription: "Learn the words, meaning, and history of the Islamic call to prayer.",
        backToFeatures: "Back to Features",
        memorize: "Memorize",
        historyTitle: "History & Significance",
        historyContent: "The Adhan was instituted in the first year after the Hijra (migration to Medina) through a true dream of the companion Abdullah ibn Zayd (ra). The first Muezzin of Islam was Bilal ibn Rabah (ra), chosen by the Prophet (ﷺ) for his resonant and beautiful voice. The Adhan is a public proclamation that calls Muslims to congregational prayer five times a day. It symbolizes the unity of the community and is a constant reminder of Allah.",
        etiquetteTitle: "What to Say During the Adhan",
        etiquetteContent: "It is Sunnah to listen attentively to the Muezzin and repeat his words. There is one exception:",
        etiquettePhrase: {
          when: "When the Muezzin says 'Hayya 'ala s-Salah' or 'Hayya 'ala l-Falah', one should respond:",
          arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ",
          transliteration: "La hawla wa la quwwata illa billah",
          meaning: "There is no power and no strength except with Allah."
        },
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
        iqamahTitle: "The Words of the Iqamah",
        iqamahContent: "The Iqamah is the second call to prayer, recited immediately before the congregational prayer (Salah) begins. It signals that the prayer is about to start.",
        iqamahWords: [
            { arabic: "ٱللَّٰهُ أَكْبَرُ، ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar, Allahu Akbar", meaning: "Allah is the Greatest, Allah is the Greatest" },
            { arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "Ashhadu an la ilaha illallah", meaning: "I bear witness that there is no deity but Allah" },
            { arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ", transliteration: "Ashhadu anna Muhammadan Rasulullah", meaning: "I bear witness that Muhammad is the Messenger of Allah" },
            { arabic: "حَيَّ عَلَى ٱلصَّلَاةِ", transliteration: "Hayya 'ala s-Salah", meaning: "Hasten to the prayer" },
            { arabic: "حَيَّ عَلَى ٱلْفَلَاحِ", transliteration: "Hayya 'ala l-Falah", meaning: "Hasten to success" },
            { arabic: "قَدْ قَامَتِ ٱلصَّلَاةُ، قَدْ قَامَتِ ٱلصَّلَاةُ", transliteration: "Qad qamatis-Salah, Qad qamatis-Salah", meaning: "The prayer has begun, the prayer has begun" },
            { arabic: "ٱللَّٰهُ أَكْبَرُ، ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar, Allahu Akbar", meaning: "Allah is the Greatest, Allah is the Greatest" },
            { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "La ilaha illallah", meaning: "There is no deity but Allah" }
        ],
        duaTitle: "Supplication after the Adhan",
        duaContent: "After the call to prayer is finished, it is Sunnah to send blessings upon the Prophet (ﷺ) and recite the following Dua:",
        dua: {
            arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
            transliteration: "Allahumma Rabba hadhihi-d-da'wat-it-tammah, was-salat-il-qa'imah, ati Muhammadan-il-wasilata wal-fadilah, wab'ath-hu maqaman mahmudan-il-ladhi wa'adtah.",
            meaning: "O Allah, Lord of this perfect call and the prayer to be offered, grant Muhammad the Wasilah (a high station in Paradise) and Fadhilah (a special honor) and raise him to the praiseworthy station that You have promised him."
        },
    }
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
                    <AccordionTrigger className="text-2xl hover:no-underline">{c.historyTitle}</AccordionTrigger>
                    <AccordionContent className="text-lg text-muted-foreground">
                        {c.historyContent}
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl text-left hover:no-underline">{c.etiquetteTitle}</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                         <p className="text-lg text-muted-foreground">{c.etiquetteContent}</p>
                         <Card className="bg-primary/5">
                            <CardContent className="p-4 space-y-2">
                                <p className="text-sm text-muted-foreground">{c.etiquettePhrase.when}</p>
                                <p className="text-2xl font-quranic text-right">{c.etiquettePhrase.arabic}</p>
                                <p className="text-muted-foreground italic text-right">{c.etiquettePhrase.transliteration}</p>
                                <p className="text-foreground/80 text-right mt-1">&quot;{c.etiquettePhrase.meaning}&quot;</p>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-2">
                    <AccordionTrigger className="text-2xl hover:no-underline">{c.wordsTitle}</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            {c.words.map((word, index) => (
                                <Card key={index} className="p-4 border-b">
                                    <p className="text-3xl font-quranic text-right">{word.arabic}</p>
                                    <p className="text-muted-foreground italic text-right mt-1">{word.transliteration}</p>
                                    <p className="text-foreground/80 text-right mt-2">&quot;{word.meaning}&quot;</p>
                                    <div className="flex justify-end mt-2">
                                         <Button variant="ghost" size="sm" asChild>
                                            <Link href={{ pathname: '/memorization', query: { text: `${word.arabic}\n\n${word.meaning}` } }}>
                                                <BrainCircuit className="mr-2 h-4 w-4" />
                                                {c.memorize}
                                            </Link>
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                    <AccordionTrigger className="text-2xl hover:no-underline">{c.iqamahTitle}</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                         <p className="text-lg text-muted-foreground">{c.iqamahContent}</p>
                          <div className="space-y-4">
                            {c.iqamahWords.map((word, index) => (
                                <Card key={index} className="p-4 border-b">
                                    <p className="text-3xl font-quranic text-right">{word.arabic}</p>
                                    <p className="text-muted-foreground italic text-right mt-1">{word.transliteration}</p>
                                    <p className="text-foreground/80 text-right mt-2">&quot;{word.meaning}&quot;</p>
                                    <div className="flex justify-end mt-2">
                                         <Button variant="ghost" size="sm" asChild>
                                            <Link href={{ pathname: '/memorization', query: { text: `${word.arabic}\n\n${word.meaning}` } }}>
                                                <BrainCircuit className="mr-2 h-4 w-4" />
                                                {c.memorize}
                                            </Link>
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-2xl hover:no-underline">{c.duaTitle}</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <p className="text-lg text-muted-foreground">{c.duaContent}</p>
                         <Card className="bg-primary/5">
                            <CardContent className="p-6 space-y-3">
                                <p className="text-3xl font-quranic text-right">{c.dua.arabic}</p>
                                <p className="text-muted-foreground italic text-right">{c.dua.transliteration}</p>
                                <p className="text-foreground/80 text-right mt-2">&quot;{c.dua.meaning}&quot;</p>
                                 <div className="flex justify-end mt-2">
                                     <Button variant="ghost" size="sm" asChild>
                                        <Link href={{ pathname: '/memorization', query: { text: `${c.dua.arabic}\n\n${c.dua.meaning}` } }}>
                                            <BrainCircuit className="mr-2 h-4 w-4" />
                                            {c.memorize}
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
             </Accordion>
        </div>
    </div>
  );
}

    