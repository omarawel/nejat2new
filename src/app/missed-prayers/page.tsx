
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
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
                description: "Dies sind die obligatorischen Gebete, die die Grundlage des täglichen Gottesdienstes bilden. Ihre Unterlassung ist eine große Sünde. Sie sind die direkte Verbindung zu Allah und die erste Tat, nach der am Tag des Jüngsten Gerichts gefragt wird.",
                items: [
                    "Die fünf täglichen Gebete (Salawat al-Khams): Fajr (2 Rak&apos;at), Dhuhr (4 Rak&apos;at), Asr (4 Rak&apos;at), Maghrib (3 Rak&apos;at) und Isha (4 Rak&apos;at).",
                    "Freitagsgebet (Salat al-Jumu&apos;ah): Obligatorisch für Männer, wird in der Gemeinschaft in der Moschee anstelle des Dhuhr-Gebets verrichtet."
                ],
                dua: {
                    title: 'Eröffnungs-Dua (Dua al-Istiftah)',
                    context: "Wird nach dem eröffnenden Takbir (Allahu Akbar) und vor der Rezitation von Al-Fatiha gesprochen.",
                    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
                    translation: 'Gepriesen seist Du, o Allah, und mit Deinem Lob. Gesegnet sei Dein Name und erhaben Deine Majestät. Und es gibt keine Gottheit außer Dir.'
                }
            },
            {
                title: "Wajib (Notwendige Gebete)",
                description: "Diese Gebete sind nach einigen Rechtsschulen (insbesondere der hanafitischen) fast so verpflichtend wie Fard. Ihre Unterlassung gilt ebenfalls als sündhaft.",
                items: [
                    "Witr-Gebet: Wird nach dem Isha-Gebet verrichtet, bestehend aus einer ungeraden Anzahl von Rak&apos;at (üblicherweise 1 oder 3). Es schließt die Gebete der Nacht ab.",
                    "Eid-Gebete (Salat al-Eidain): Die Gemeinschaftsgebete für Eid al-Fitr (Fest des Fastenbrechens) und Eid al-Adha (Opferfest)."
                ],
                dua: {
                    title: 'Dua al-Qunut (im Witr-Gebet)',
                    context: "Wird in der letzten Rak&apos;ah des Witr-Gebets vor oder nach dem Ruku rezitiert.",
                    arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلاَ يُقْضَى عَلَيْكَ، وَإِنَّهُ لاَ يَذِلُّ مَنْ وَالَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
                    translation: 'O Allah, leite mich recht mit denen, die Du rechtgeleitet hast, und gewähre mir Wohlbefinden mit denen, denen Du Wohlbefinden gewährt hast. Nimm mich in Deine Obhut mit denen, die Du in Deine Obhut genommen hast. Segne, was Du mir gegeben hast. Schütze mich vor dem Übel dessen, was Du bestimmt hast. Wahrlich, Du allein bestimmst und über Dich wird nicht bestimmt. Wahrlich, erniedrigt wird nicht, wen Du zum Freund nimmst. Gesegnet seist Du, unser Herr, und erhaben.'
                }
            },
            {
                title: "Sunnah (Empfohlene Gebete)",
                description: "Dies sind Gebete, die der Prophet Muhammad (ﷺ) regelmäßig verrichtet hat. Ihre Verrichtung bringt große Belohnung, während ihre Unterlassung keine Sünde ist. Man unterscheidet zwischen stark empfohlenen (Mu&apos;akkadah) und weniger stark empfohlenen (Ghayr Mu&apos;akkadah) Sunnah-Gebeten.",
                items: [
                    "Sunan ar-Rawatib (Mu&apos;akkadah): 12 Rak&apos;at, die mit den Fard-Gebeten verbunden sind: 2 vor Fajr, 4 vor Dhuhr, 2 nach Dhuhr, 2 nach Maghrib, 2 nach Isha.",
                    "Tahajjud (Nachtgebet): Ein freiwilliges Gebet, das im letzten Drittel der Nacht verrichtet wird und als besonders verdienstvoll gilt, da Allah in dieser Zeit Seinen Dienern am nächsten ist.",
                    "Duha-Gebet (Vormittagsgebet): Wird nach Sonnenaufgang bis kurz vor Dhuhr verrichtet. Es gilt als Dankbarkeit für jedes Gelenk im Körper."
                ],
                 dua: {
                    title: 'Dua für Tahajjud (Auszug)',
                    context: "Kann während des Sujud (Niederwerfung) im Tahajjud-Gebet oder nach dem Gebet gesprochen werden.",
                    arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ...',
                    translation: 'O Allah, Dir gebührt alles Lob, Du bist das Licht der Himmel und der Erde und aller, die darin sind...'
                }
            },
            {
                title: "Nafl (Freiwillige Gebete)",
                description: "Dies sind zusätzliche freiwillige Gebete, die ein Muslim jederzeit (außer zu den verbotenen Zeiten) verrichten kann, um näher zu Allah zu kommen und Lücken in den Pflichtgebeten zu füllen.",
                items: [
                    "Tahiyyat al-Masjid: Zwei Rak&apos;at beim Betreten einer Moschee, bevor man sich setzt, als Gruß an das Haus Allahs.",
                    "Salat al-Istikhara: Das Gebet um Führung bei einer wichtigen Entscheidung.",
                    "Salat al-Tasbih: Ein besonderes Gebet, das eine hohe Anzahl an Lobpreisungen beinhaltet und eine große Belohnung verspricht."
                ],
                dua: {
                    title: 'Dua al-Istikhara (Auszug)',
                    context: "Wird nach zwei freiwilligen Rak&apos;at gesprochen, die speziell mit der Absicht der Istikhara gebetet werden.",
                    arabic: 'اللَّهُمَّ إِنِّي أَsْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ...',
                    translation: 'O Allah, ich bitte Dich um Führung durch Dein Wissen und um Kraft durch Deine Macht und ich bitte Dich um Deine unermessliche Gunst...'
                }
            },
            {
                title: "Weitere Anlassgebete",
                description: "Gebete, die zu bestimmten Anlässen verrichtet werden.",
                items: [
                    "Salat al-Janazah (Totengebet): Ein Gemeinschaftsgebet für einen Verstorbenen, um Allah um Vergebung für ihn zu bitten.",
                    "Salat al-Kusuf/Khusuf (Sonnen-/Mondfinsternisgebet): Gebete während einer Sonnen- oder Mondfinsternis als Zeichen der Ehrfurcht vor Allahs Macht.",
                    "Salat al-Istisqa (Gebet um Regen): Ein Gemeinschaftsgebet in Zeiten der Dürre, um Allah um Seine Barmherzigkeit zu bitten."
                ],
                 dua: {
                    title: 'Dua für den Verstorbenen (im Janazah-Gebet)',
                    context: "Wird nach dem dritten Takbir im Janazah-Gebet gesprochen.",
                    arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ...',
                    translation: 'O Allah, vergib ihm, erbarme dich seiner, gewähre ihm Wohlbefinden und verzeihe ihm...'
                }
            }
        ]
    }
};

const TypesOfSalahPage = () => {
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
                                       <li key={i}>{item}</li>
                                   ))}
                               </ul>
                               {section.dua && (
                                   <div className="mt-4 pt-4 border-t border-border/50">
                                       <h4 className="font-semibold text-primary">{section.dua.title}</h4>
                                       {section.dua.context && <p className="text-xs text-muted-foreground mb-2">({section.dua.context})</p>}
                                       <p className="font-quranic text-lg text-right mt-2">{section.dua.arabic}</p>
                                       <p className="text-sm italic text-muted-foreground mt-2">&quot;{section.dua.translation}&quot;</p>
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
