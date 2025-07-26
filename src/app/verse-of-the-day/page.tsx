
"use client"

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, ArrowLeft, Share2, Heart, BookOpen } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { addFavorite } from '@/lib/favorites';
import { toBlob } from 'html-to-image';

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
        intro: "Der Koran ist eine Quelle der Rechtleitung, Barmherzigkeit und Weisheit. Ein einziger Vers kann das Herz berühren, den Verstand erleuchten und den Weg für den Tag weisen. Diese Funktion bietet dir täglich einen neuen, inspirierenden Vers, um deine Verbindung zum Buch Allahs zu vertiefen.",
        shareError: "Teilen wird von deinem Browser nicht unterstützt.",
        verseCopied: "Vers-Bild in die Zwischenablage kopiert.",
        favoriteSaved: "Als Favorit gespeichert!",
        loginToSave: "Anmelden, um Favoriten zu speichern.",
        errorSaving: "Fehler beim Speichern des Favoriten."
    },
    en: {
        title: "Verse of the Day",
        description: "A daily inspiration from the Holy Quran to strengthen faith and reflect upon the words of Allah.",
        backToFeatures: "Back to Features",
        newVerse: "New Verse",
        surah: "Surah",
        intro: "The Quran is a source of guidance, mercy, and wisdom. a single verse can touch the heart, enlighten the mind, and guide one's way for the day. This feature offers you a new, inspiring verse daily to deepen your connection with the Book of Allah.",
        shareError: "Sharing is not supported by your browser.",
        verseCopied: "Verse image copied to clipboard.",
        favoriteSaved: "Saved to favorites!",
        loginToSave: "Login to save favorites.",
        errorSaving: "Error saving favorite."
    }
}

export default function VerseOfTheDayPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const { toast } = useToast();
    const [user, authLoading] = useAuthState(auth);

    const [verse, setVerse] = useState<Verse | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const postcardRef = useRef<HTMLDivElement>(null);

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
        }, 300);
    }, [verse]);

    useEffect(() => {
        getNewVerse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleShare = async () => {
        if (!postcardRef.current || !verse) return;
        try {
            const blob = await toBlob(postcardRef.current, { pixelRatio: 2 });
            if (!blob) return;

            const file = new File([blob], `verse-${verse.reference}.png`, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: c.title,
                });
            } else {
                 await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                toast({ description: c.verseCopied });
            }
        } catch (error) {
            console.error('Error sharing:', error);
            toast({ variant: 'destructive', description: c.shareError });
        }
    };
    
    const handleSaveFavorite = async () => {
        if (!verse) return;
        if (!user) {
            toast({
                variant: 'destructive',
                title: c.loginToSave,
                description: <Button variant="secondary" size="sm" asChild className="mt-2"><Link href="/login">Login</Link></Button>
            });
            return;
        }
        setIsSaving(true);
        const textToSave = `Quran, ${c.surah} ${language === 'de' ? verse.surah_de : verse.surah_en}, ${verse.reference}\n\n"${language === 'de' ? verse.verse_de : verse.verse_en}"`;
        try {
            await addFavorite(user.uid, textToSave);
            toast({ title: c.favoriteSaved });
        } catch (error) {
            console.error("Error saving favorite: ", error);
            toast({ variant: 'destructive', title: c.errorSaving });
        } finally {
            setIsSaving(false);
        }
    }


    return (
        <div className="flex-grow w-full flex flex-col bg-background">
             <div className="flex-grow w-full bg-slate-100 dark:bg-slate-900/50 rounded-b-[3rem] p-4 relative">
                 <div className="container mx-auto">
                    <Button asChild variant="ghost" className="absolute top-4 left-4">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {c.backToFeatures}
                        </Link>
                    </Button>
                 </div>
             </div>
             <div className="container mx-auto px-4 -mt-24 sm:-mt-32 z-10">
                <Card 
                    ref={postcardRef} 
                    className="w-full max-w-2xl mx-auto text-center shadow-2xl bg-card bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 dark:from-slate-800/40 to-card"
                >
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="min-h-[250px] flex items-center justify-center p-6">
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
                     <CardFooter className="justify-end p-2 pr-4">
                        <p className="text-xs text-muted-foreground">Nejat Pro</p>
                    </CardFooter>
                </Card>
                 <div className="w-full max-w-2xl mx-auto mt-4 grid grid-cols-3 gap-2">
                    <Button variant="outline" className="col-span-1" onClick={getNewVerse} disabled={loading || authLoading || !user}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        {c.newVerse}
                    </Button>
                    <Button variant="outline" aria-label="Share" onClick={handleShare} disabled={authLoading || !user}>
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" aria-label="Favorite" onClick={handleSaveFavorite} disabled={isSaving || authLoading}>
                       {isSaving ? <Loader2 className="h-5 w-5 animate-spin"/> : <Heart className="h-5 w-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
