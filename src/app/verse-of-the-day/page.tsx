
"use client"

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Metadata } from 'next';

interface Verse {
  verse_en: string;
  verse_de: string;
  verse_ar: string;
  surah_en: string;
  surah_de: string;
  reference: string;
}

const verses: Verse[] = [
  {
    verse_en: "And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?",
    verse_de: "Und Wir haben den Koran ja leicht zum Bedenken gemacht. Aber gibt es jemanden, der bedenkt?",
    verse_ar: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ",
    surah_en: "Al-Qamar",
    surah_de: "Al-Qamar",
    reference: "54:17"
  },
  {
    verse_en: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    verse_de: "So gedenkt Meiner, damit Ich eurer gedenke, und seid Mir dankbar und verleugnet Mich nicht.",
    verse_ar: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    surah_en: "Al-Baqarah",
    surah_de: "Al-Baqara",
    reference: "2:152"
  },
  {
    verse_en: "Indeed, in the remembrance of Allah do hearts find rest.",
    verse_de: "Wahrlich, im Gedenken an Allah finden die Herzen Ruhe.",
    verse_ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    surah_en: "Ar-Ra'd",
    surah_de: "Ar-Ra'd",
    reference: "13:28"
  },
   {
    verse_en: "And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive [to Allah].",
    verse_de: "Und sucht Hilfe in der Geduld und im Gebet, und wahrlich, es ist schwer, außer für die Demütigen.",
    verse_ar: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ",
    surah_en: "Al-Baqarah",
    surah_de: "Al-Baqara",
    reference: "2:45"
  },
  {
    verse_en: "Allah does not charge a soul except [with that within] its capacity.",
    verse_de: "Allah erlegt keiner Seele mehr auf, als sie zu leisten vermag.",
    verse_ar: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    surah_en: "Al-Baqarah",
    surah_de: "Al-Baqara",
    reference: "2:286"
  }
];


const content = {
    de: {
        title: "Vers des Tages",
        description: "Eine tägliche Inspiration aus dem Heiligen Koran, um den Glauben zu stärken und über die Worte Allahs nachzudenken.",
        backToFeatures: "Zurück zu den Funktionen",
        newVerse: "Neuer Vers",
        surah: "Sure",
        intro: "Der Koran ist eine Quelle der Rechtleitung, Barmherzigkeit und Weisheit. Ein einziger Vers kann das Herz berühren, den Verstand erleuchten und den Weg für den Tag weisen. Diese Funktion bietet dir täglich einen neuen, inspirierenden Vers, um deine Verbindung zum Buch Allahs zu vertiefen."
    },
    en: {
        title: "Verse of the Day",
        description: "A daily inspiration from the Holy Quran to strengthen faith and reflect upon the words of Allah.",
        backToFeatures: "Back to Features",
        newVerse: "New Verse",
        surah: "Surah",
        intro: "The Quran is a source of guidance, mercy, and wisdom. a single verse can touch the heart, enlighten the mind, and guide one's way for the day. This feature offers you a new, inspiring verse daily to deepen your connection with the Book of Allah."
    }
}

export default function VerseOfTheDayPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    const [verse, setVerse] = useState<Verse | null>(null);
    const [loading, setLoading] = useState(true);

    const getNewVerse = useCallback(() => {
        setLoading(true);
        // Simulate API fetch delay
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * verses.length);
            let newVerse = verses[randomIndex];
            if (verse && newVerse.verse_ar === verse.verse_ar) {
                 newVerse = verses[(randomIndex + 1) % verses.length];
            }
            setVerse(newVerse);
            setLoading(false);
        }, 500);
    }, [verse]);

    useEffect(() => {
        getNewVerse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-grow">
            <div className="w-full max-w-2xl">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {c.backToFeatures}
                    </Link>
                </Button>
                <header className="text-center mb-6">
                     <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                     <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.intro}</p>
                </header>
                <Card className="w-full text-center shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{c.title}</CardTitle>
                        <CardDescription className="text-lg">{c.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-[250px] flex items-center justify-center">
                        {loading ? (
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        ) : verse ? (
                            <div className="space-y-6">
                                <p className="text-3xl font-quranic text-right tracking-wide leading-relaxed">{verse.verse_ar}</p>
                                <p className="text-lg leading-relaxed text-foreground/90">"{language === 'de' ? verse.verse_de : verse.verse_en}"</p>
                                <p className="text-sm text-muted-foreground">{c.surah} {language === 'de' ? verse.surah_de : verse.surah_en}, {verse.reference}</p>
                            </div>
                        ) : null}
                    </CardContent>
                    <CardFooter className="flex justify-center p-6">
                        <Button onClick={getNewVerse} disabled={loading}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            {c.newVerse}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
