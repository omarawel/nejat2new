
"use client"

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, BookOpen, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

interface Hadith {
  hadith_english: string;
  hadith_arabic: string;
  book: string;
  chapter: string;
  narrator: string;
}

const hadithCollection: Hadith[] = [
  {
    hadith_english: "The Prophet (ﷺ) said, 'The best among you are those who have the best character and manners.'",
    hadith_arabic: "قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏ \"‏ إِنَّ خِيَارَكُمْ أَحَاسِنُكُمْ أَخْلاَقًا ‏\"‏",
    book: "Sahih al-Bukhari",
    chapter: "Book of Good Manners and Form (Al-Adab)",
    narrator: "Narrated `Abdullah bin `Amr"
  },
  {
    hadith_english: "Actions are but by intentions and every man shall have only that which he intended.",
    hadith_arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    book: "Sahih al-Bukhari",
    chapter: "Book of Revelation",
    narrator: "Narrated 'Umar bin Al-Khattab"
  },
  {
    hadith_english: "None of you will have faith till he wishes for his (Muslim) brother what he likes for himself.",
    hadith_arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    book: "Sahih al-Bukhari",
    chapter: "Book of Belief",
    narrator: "Narrated Anas"
  },
   {
    hadith_english: "The Prophet (ﷺ) said: 'The strong man is not the one who can wrestle, but the strong man is the one who can control himself at the time of anger.'",
    hadith_arabic: "قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏\"‏ لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ ‏\"‏‏.‏",
    book: "Sahih Muslim",
    chapter: "The Book of Virtue, Enjoining Good Manners, and Joining of the Ties of Kinship",
    narrator: "Narrated Abu Hurairah"
  },
  {
    hadith_english: "He who is not merciful to others, will not be treated mercifully.",
    hadith_arabic: "مَنْ لاَ يَرْحَمُ لاَ يُرْحَمُ",
    book: "Sahih al-Bukhari",
    chapter: "Book of Good Manners and Form (Al-Adab)",
    narrator: "Narrated Abu Huraira"
  }
];


const content = {
    de: {
        title: "Hadith des Tages",
        description: "Eine tägliche Weisheit aus den Überlieferungen des Propheten Muhammad (ﷺ).",
        newHadith: "Neuer Hadith",
        narrated: "Überliefert von"
    },
    en: {
        title: "Hadith of the Day",
        description: "A daily wisdom from the traditions of the Prophet Muhammad (ﷺ).",
        newHadith: "New Hadith",
        narrated: "Narrated by"
    }
}

export default function HadithOfTheDayPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    const [hadith, setHadith] = useState<Hadith | null>(null);
    const [loading, setLoading] = useState(true);

    const getNewHadith = useCallback(() => {
        setLoading(true);
        // In a real app, you might fetch this from an API. Here we'll simulate a delay.
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * hadithCollection.length);
            let newHadith = hadithCollection[randomIndex];
            // Ensure we don't show the same hadith twice in a row
            if (hadith && newHadith.hadith_english === hadith.hadith_english) {
                 newHadith = hadithCollection[(randomIndex + 1) % hadithCollection.length];
            }
            setHadith(newHadith);
            setLoading(false);
        }, 500);
    }, [hadith]);

    useEffect(() => {
        getNewHadith();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center flex-grow">
            <Card className="w-full max-w-2xl text-center shadow-xl">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <BookOpen className="h-10 w-10 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold">{c.title}</CardTitle>
                    <CardDescription className="text-lg">{c.description}</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[250px] flex items-center justify-center">
                    {loading ? (
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    ) : hadith ? (
                        <div className="space-y-6">
                            <p className="text-3xl font-quranic text-right tracking-wide leading-relaxed">{hadith.hadith_arabic}</p>
                            <p className="text-lg leading-relaxed text-foreground/90">"{hadith.hadith_english}"</p>
                            <p className="text-sm text-muted-foreground">{c.narrated} {hadith.narrator} [{hadith.book}, {hadith.chapter}]</p>
                        </div>
                    ) : null}
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <Button onClick={getNewHadith} disabled={loading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        {c.newHadith}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

