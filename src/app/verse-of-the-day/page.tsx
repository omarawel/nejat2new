
"use client"

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, ArrowLeft, Share2, Heart, BookOpen, Copy } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { addFavorite } from '@/lib/favorites';
import { toBlob } from 'html-to-image';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons';

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
        errorSaving: "Fehler beim Speichern des Favoriten.",
        copyImage: "Bild kopieren"
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
        errorSaving: "Error saving favorite.",
        copyImage: "Copy Image"
    }
}

const getDailyIndex = (arrayLength: number) => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return dayOfYear % arrayLength;
};


export default function VerseOfTheDayPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const [user, loadingAuth] = useAuthState(auth);

    const [verse, setVerse] = useState<Verse | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const postcardRef = useRef<HTMLDivElement>(null);

    const showLoginToast = () => {
        toast({
            title: c.loginToSave,
            variant: 'destructive',
            description: <Button variant="secondary" size="sm" asChild className="mt-2"><Link href="/login">Login</Link></Button>,
        });
    }

    const selectDailyVerse = useCallback(() => {
        setLoading(true);
        const dailyIndex = getDailyIndex(verses.length);
        setVerse(verses[dailyIndex]);
        setLoading(false);
    }, []);

    useEffect(() => {
        selectDailyVerse();
    }, [selectDailyVerse]);

    const handleShare = async () => {
        if (!postcardRef.current || !verse) return;
        try {
            const blob = await toBlob(postcardRef.current, { pixelRatio: 2 });
            if (!blob) return;

            const file = new File([blob], `verse-${verse.reference}.png`, { type: 'image/png' });
            
            const shareData = {
                files: [file],
                title: c.title,
                text: `"${language === 'de' ? verse.verse_de : verse.verse_en}" - Quran ${verse.reference}`
            };

            const canShare = navigator.canShare && navigator.canShare(shareData);

            if (canShare) {
                await navigator.share(shareData);
            } else {
                 await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                toast({ description: c.verseCopied });
            }
        } catch (error) {
            console.error('Error sharing:', error);
            if (error instanceof Error && error.name === 'NotAllowedError') {
                 try {
                     const blob = await toBlob(postcardRef.current, { pixelRatio: 2 });
                     if (!blob) return;
                     await navigator.clipboard.write([ new ClipboardItem({ 'image/png': blob }) ]);
                     toast({ description: c.verseCopied });
                 } catch (copyError) {
                      toast({ variant: 'destructive', description: c.shareError });
                 }
            } else {
                 toast({ variant: 'destructive', description: c.shareError });
            }
        }
    };
    
    const handleCopyImage = async () => {
        if (!postcardRef.current || !verse) return;
        try {
            const blob = await toBlob(postcardRef.current, { pixelRatio: 2 });
            if (!blob) return;
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            toast({ description: c.verseCopied });
        } catch (error) {
            console.error('Error copying image:', error);
            toast({ variant: 'destructive', description: c.shareError });
        }
    };
    
    const handleSaveFavorite = async () => {
        if (!user) {
            showLoginToast();
            return;
        }
        if (!verse) return;
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
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-grow">
             <div className="w-full max-w-2xl">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {c.backToFeatures}
                    </Link>
                </Button>
                <Card 
                    ref={postcardRef}
                    className="w-full shadow-2xl bg-card border-amber-200/50 dark:border-amber-800/50 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/old-paper-dark.png')]"
                >
                    <CardContent className="p-2">
                        <div className="border-4 border-amber-300 dark:border-amber-800 rounded-md p-6 min-h-[300px] flex flex-col items-center justify-center text-center bg-transparent">
                            {loading ? (
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            ) : verse ? (
                                <div className="space-y-6">
                                    <p className="text-3xl font-quranic text-center tracking-wide leading-relaxed">{verse.verse_ar}</p>
                                    <p className="text-lg leading-relaxed text-foreground/90">&quot;{language === 'de' ? verse.verse_de : verse.verse_en}&quot;</p>
                                    <p className="text-sm text-muted-foreground">{c.surah} {language === 'de' ? verse.surah_de : verse.surah_en}, {verse.reference}</p>
                                </div>
                            ) : null}
                            <div className="flex-grow" />
                            <div className="relative pt-4 mt-auto">
                                <div className="relative inline-block">
                                     <Link href="/" className="flex items-center gap-1 text-sm font-bold text-muted-foreground/80">
                                      <Logo className="h-4 w-4"/> Nejat
                                    </Link>
                                    <Badge variant="default" className="absolute -top-3.5 -right-7 h-auto px-1.5 py-0.5 text-[10px] font-bold">Pro</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <div className="w-full mt-4 grid grid-cols-4 gap-2">
                    <Button variant="outline" aria-label={c.newVerse} onClick={selectDailyVerse}>
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" aria-label="Share" onClick={handleShare}>
                        <Share2 className="h-5 w-5" />
                    </Button>
                     <Button variant="outline" aria-label="Copy Image" onClick={handleCopyImage}>
                        <Copy className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" aria-label="Favorite" onClick={handleSaveFavorite} disabled={isSaving || loadingAuth}>
                       {isSaving ? <Loader2 className="h-5 w-5 animate-spin"/> : <Heart className="h-5 w-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
