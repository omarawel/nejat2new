
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
                    "Die fünf täglichen Gebete (Salawat al-Khams): Fajr (2 Rak'at), Dhuhr (4 Rak'at), Asr (4 Rak'at), Maghrib (3 Rak'at) und Isha (4 Rak'at).",
                    "Freitagsgebet (Salat al-Jumu'ah): Obligatorisch für Männer, wird in der Gemeinschaft in der Moschee anstelle des Dhuhr-Gebets verrichtet."
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
                    "Witr-Gebet: Wird nach dem Isha-Gebet verrichtet, bestehend aus einer ungeraden Anzahl von Rak'at (üblicherweise 1 oder 3). Es schließt die Gebete der Nacht ab.",
                    "Eid-Gebete (Salat al-Eidain): Die Gemeinschaftsgebete für Eid al-Fitr (Fest des Fastenbrechens) und Eid al-Adha (Opferfest)."
                ],
                dua: {
                    title: 'Dua al-Qunut (im Witr-Gebet)',
                    context: "Wird in der letzten Rak'ah des Witr-Gebets vor oder nach dem Ruku rezitiert.",
                    arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلاَ يُقْضَى عَلَيْكَ، وَإِنَّهُ لاَ يَذِلُّ مَنْ وَالَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
                    translation: 'O Allah, leite mich recht mit denen, die Du rechtgeleitet hast, und gewähre mir Wohlbefinden mit denen, denen Du Wohlbefinden gewährt hast. Nimm mich in Deine Obhut mit denen, die Du in Deine Obhut genommen hast. Segne, was Du mir gegeben hast. Schütze mich vor dem Übel dessen, was Du bestimmt hast. Wahrlich, Du allein bestimmst und über Dich wird nicht bestimmt. Wahrlich, erniedrigt wird nicht, wen Du zum Freund nimmst. Gesegnet seist Du, unser Herr, und erhaben.'
                }
            },
            {
                title: "Sunnah (Empfohlene Gebete)",
                description: "Dies sind Gebete, die der Prophet Muhammad (ﷺ) regelmäßig verrichtet hat. Ihre Verrichtung bringt große Belohnung, während ihre Unterlassung keine Sünde ist. Man unterscheidet zwischen stark empfohlenen (Mu'akkadah) und weniger stark empfohlenen (Ghayr Mu'akkadah) Sunnah-Gebeten.",
                items: [
                    "Sunan ar-Rawatib (Mu'akkadah): 12 Rak'at, die mit den Fard-Gebeten verbunden sind: 2 vor Fajr, 4 vor Dhuhr, 2 nach Dhuhr, 2 nach Maghrib, 2 nach Isha.",
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
                    "Tahiyyat al-Masjid: Zwei Rak'at beim Betreten einer Moschee, bevor man sich setzt, als Gruß an das Haus Allahs.",
                    "Salat al-Istikhara: Das Gebet um Führung bei einer wichtigen Entscheidung.",
                    "Salat al-Tasbih: Ein besonderes Gebet, das eine hohe Anzahl an Lobpreisungen beinhaltet und eine große Belohnung verspricht."
                ],
                dua: {
                    title: 'Dua al-Istikhara (Auszug)',
                    context: "Wird nach zwei freiwilligen Rak'at gesprochen, die speziell mit der Absicht der Istikhara gebetet werden.",
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
    },
    en: {
        pageTitle: "Types of Prayer (Salah)",
        pageDescription: "An overview of the different categories of prayers in Islam.",
        backToFeatures: "Back to Features",
        sections: [
            {
                title: "Fard (Obligatory Prayers)",
                description: "These are the mandatory prayers that form the basis of daily worship. Neglecting them is a major sin. They are the direct connection to Allah and the first deed to be questioned on the Day of Judgment.",
                items: [
                    "The five daily prayers (Salawat al-Khams): Fajr (2 Rak'at), Dhuhr (4 Rak'at), Asr (4 Rak'at), Maghrib (3 Rak'at), and Isha (4 Rak'at).",
                    "Friday Prayer (Salat al-Jumu'ah): Obligatory for men, performed in congregation at the mosque instead of the Dhuhr prayer."
                ],
                 dua: {
                    title: 'Opening Dua (Dua al-Istiftah)',
                    context: "Recited after the opening Takbir (Allahu Akbar) and before the recitation of Al-Fatiha.",
                    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
                    translation: 'Glory is to You, O Allah, and with Your praise. Blessed is Your name and exalted is Your majesty. And there is no deity other than You.'
                }
            },
            {
                title: "Wajib (Necessary Prayers)",
                description: "According to some schools of thought (especially the Hanafi school), these prayers are almost as obligatory as Fard. Neglecting them is also considered sinful.",
                items: [
                    "Witr Prayer: Performed after the Isha prayer, consisting of an odd number of Rak'at (usually 1 or 3). It concludes the prayers of the night.",
                    "Eid Prayers (Salat al-Eidain): The congregational prayers for Eid al-Fitr (Festival of Breaking the Fast) and Eid al-Adha (Festival of Sacrifice)."
                ],
                 dua: {
                    title: 'Dua al-Qunut (in Witr Prayer)',
                    context: "Recited in the last Rak'ah of the Witr prayer, before or after the Ruku.",
                    arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلاَ يُقْضَى عَلَيْكَ، وَإِنَّهُ لاَ يَذِلُّ مَنْ وَالَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
                    translation: 'O Allah, guide me with those whom You have guided, and grant me well-being with those whom You have granted well-being. Take me into Your charge with those whom You have taken into Your charge. Bless me in what You have given. Protect me from the evil of what You have decreed. Verily, You decree and none can decree over You. Verily, he whom You show allegiance to is not abased. Blessed are You, our Lord, and Exalted.'
                }
            },
            {
                title: "Sunnah (Recommended Prayers)",
                description: "These are prayers that the Prophet Muhammad (ﷺ) regularly performed. Performing them brings great reward, while omitting them is not a sin. A distinction is made between highly recommended (Mu'akkadah) and less emphasized (Ghayr Mu'akkadah) Sunnah prayers.",
                items: [
                    "Sunan ar-Rawatib (Mu'akkadah): 12 Rak'at associated with the Fard prayers: 2 before Fajr, 4 before Dhuhr, 2 after Dhuhr, 2 after Maghrib, 2 after Isha.",
                    "Tahajjud (Night Prayer): A voluntary prayer performed in the last third of the night, considered particularly meritorious as Allah is closest to His servants during this time.",
                    "Duha Prayer (Forenoon Prayer): Performed after sunrise until just before Dhuhr. It is considered an act of gratitude for every joint in the body."
                ],
                 dua: {
                    title: 'Dua for Tahajjud (Excerpt)',
                    context: "Can be recited during Sujud (prostration) in the Tahajjud prayer or after the prayer.",
                    arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ...',
                    translation: 'O Allah, to You be all praise, You are the Light of the heavens and the earth and all that is in them...'
                }
            },
            {
                title: "Nafl (Voluntary Prayers)",
                description: "These are additional voluntary prayers that a Muslim can perform at any time (except during the forbidden times) to draw closer to Allah and to fill any gaps in the obligatory prayers.",
                items: [
                    "Tahiyyat al-Masjid: Two Rak'at upon entering a mosque before sitting down, as a greeting to the House of Allah.",
                    "Salat al-Istikhara: The prayer for guidance in making an important decision.",
                    "Salat al-Tasbih: A special prayer involving a high number of praises and promising a great reward."
                ],
                dua: {
                    title: 'Dua al-Istikhara (Excerpt)',
                    context: "Recited after praying two voluntary Rak'at specifically with the intention of Istikhara.",
                    arabic: 'اللَّهُمَّ إِنِّي أَsْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ...',
                    translation: 'O Allah, I seek guidance from Your knowledge, and Power from Your Might, and I ask for Your great blessings...'
                }
            },
             {
                title: "Other Occasional Prayers",
                description: "Prayers performed on specific occasions.",
                items: [
                    "Salat al-Janazah (Funeral Prayer): A communal prayer for a deceased person, asking Allah for their forgiveness.",
                    "Salat al-Kusuf/Khusuf (Eclipse Prayers): Prayers during a solar or lunar eclipse as a sign of awe of Allah's power.",
                    "Salat al-Istisqa (Prayer for Rain): A communal prayer in times of drought to ask Allah for His mercy."
                ],
                 dua: {
                    title: 'Dua for the Deceased (in Janazah Prayer)',
                    context: "Recited after the third Takbir in the Janazah prayer.",
                    arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ...',
                    translation: 'O Allah, forgive him and have mercy on him, grant him well-being and pardon him...'
                }
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
