
"use client"

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquareQuote, ArrowLeft, Loader2, Share2, Heart, Copy } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { addFavorite } from '@/lib/favorites';
import { toBlob } from 'html-to-image';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons';

interface Post {
  title_de: string;
  title_en: string;
  content_de: string;
  content_en: string;
  source_de: string;
  source_en: string;
}

const posts: Post[] = [
  {
    title_de: "Barmherzigkeit für alle Welten",
    title_en: "Mercy to all Worlds",
    content_de: "Entgegen der falschen Vorstellung eines strengen Führers war der Prophet Muhammad (ﷺ) die Verkörperung von Barmherzigkeit. Allah beschreibt ihn im Koran nicht als Barmherzigkeit nur für Muslime, sondern für 'alle Welten' (21:107). Seine Nachbarn, seine Familie, seine Gefährten, ja sogar seine erbittertsten Feinde erfuhren seine Sanftmut und Vergebung. In Ta'if, als er mit Steinen beworfen und blutig geschlagen wurde, betete er für die Rechtleitung seiner Peiniger, anstatt Rache zu fordern.",
    content_en: "Contrary to the misconception of a stern leader, Prophet Muhammad (ﷺ) was the embodiment of mercy. Allah describes him in the Quran not as a mercy for Muslims only, but for 'all the worlds' (21:107). His neighbors, his family, his companions, and even his staunchest enemies experienced his gentleness and forgiveness. In Ta'if, when he was pelted with stones and beaten until he bled, he prayed for the guidance of his tormentors instead of seeking revenge.",
    source_de: "Koran, 21:107 & Hadith-Überlieferungen",
    source_en: "Quran, 21:107 & Hadith Narrations"
  },
  {
    title_de: "Kein Zwang im Glauben",
    title_en: "No Compulsion in Religion",
    content_de: "Das Bild eines Propheten, der den Islam mit dem Schwert verbreitete, ist historisch falsch und widerspricht dem Koran. Der grundlegende Vers 'Es gibt keinen Zwang im Glauben' (2:256) ist das Fundament der islamischen Lehre zur Religionsfreiheit. Der Prophet (ﷺ) schloss Verträge mit jüdischen und christlichen Stämmen, garantierte ihnen Schutz und die Freiheit, ihre Religion auszuüben. Kriege wurden hauptsächlich zur Verteidigung gegen Angriffe geführt, nicht zur erzwungenen Konversion.",
    content_en: "The image of a prophet who spread Islam by the sword is historically false and contradicts the Quran. The fundamental verse 'There is no compulsion in religion' (2:256) is the foundation of Islamic teaching on religious freedom. The Prophet (ﷺ) made treaties with Jewish and Christian tribes, guaranteeing them protection and the freedom to practice their religion. Wars were fought mainly in self-defense against aggression, not for forced conversion.",
    source_de: "Koran, 2:256",
    source_en: "Quran, 2:256"
  },
  {
    title_de: "Rechte und Ehrung der Frauen",
    title_en: "Rights and Honor for Women",
    content_de: "In einer Zeit, in der Frauen oft als Besitz betrachtet wurden, revolutionierte der Prophet Muhammad (ﷺ) ihren Status. Er verankerte ihre Rechte auf Bildung, Erbe und die Zustimmung zur Ehe. Er selbst war im Haushalt behilflich, nähte seine Kleidung und behandelte seine Ehefrauen mit größter Liebe und Respekt. Sein berühmter Ausspruch 'Die besten von euch sind diejenigen, die am besten zu ihren Frauen sind' setzte einen neuen Maßstab für die Behandlung von Frauen.",
    content_en: "In an era where women were often regarded as property, Prophet Muhammad (ﷺ) revolutionized their status. He established their rights to education, inheritance, and consent in marriage. He himself helped with household chores, mended his own clothes, and treated his wives with the utmost love and respect. His famous saying, 'The best of you are those who are best to their wives,' set a new standard for the treatment of women.",
    source_de: "Hadith-Überlieferungen",
    source_en: "Hadith Narrations"
  },
];


const content = {
    de: {
        title: "Post über den Propheten (ﷺ)",
        backToFeatures: "Zurück zu den Funktionen",
        newPost: "Neuer Beitrag",
        shareError: "Teilen wird von deinem Browser nicht unterstützt.",
        postCopied: "Post-Bild in die Zwischenablage kopiert.",
        favoriteSaved: "Als Favorit gespeichert!",
        loginToSave: "Anmelden, um Favoriten zu speichern.",
        errorSaving: "Fehler beim Speichern des Favoriten.",
        copyImage: "Bild kopieren"
    },
    en: {
        title: "Post about the Prophet (ﷺ)",
        backToFeatures: "Back to Features",
        newPost: "New Post",
        shareError: "Sharing is not supported by your browser.",
        postCopied: "Post image copied to clipboard.",
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

export default function ProphetPostOfTheDayPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const [user] = useAuthState(auth);

    const [post, setPost] = useState<Post | null>(null);
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

    const selectDailyPost = useCallback(() => {
        setLoading(true);
        const dailyIndex = getDailyIndex(posts.length);
        setPost(posts[dailyIndex]);
        setLoading(false);
    }, []);

    useEffect(() => {
        selectDailyPost();
    }, [selectDailyPost]);

     const handleShare = async () => {
        if (!postcardRef.current || !post) return;
        try {
            const blob = await toBlob(postcardRef.current, { pixelRatio: 2 });
            if (!blob) return;

            const file = new File([blob], `post.png`, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: language === 'de' ? post.title_de : post.title_en,
                });
            } else {
                 await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                toast({ description: c.postCopied });
            }
        } catch (error) {
            console.error('Error sharing:', error);
            toast({ variant: 'destructive', description: c.shareError });
        }
    };

    const handleCopyImage = async () => {
        if (!postcardRef.current || !post) return;
        try {
            const blob = await toBlob(postcardRef.current, { pixelRatio: 2 });
            if (!blob) return;
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            toast({ description: c.postCopied });
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
        if (!post) return;
        setIsSaving(true);
        const textToSave = `**${language === 'de' ? post.title_de : post.title_en}**\n\n${language === 'de' ? post.content_de : post.content_en}\n\n*Quelle: ${language === 'de' ? post.source_de : post.source_en}*`;
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
                    className="w-full shadow-2xl bg-card border-amber-200/50 dark:border-amber-800/50 bg-paper-texture"
                >
                    <CardContent className="p-2">
                        <div className="border-4 border-amber-300 dark:border-amber-800 rounded-md p-8 min-h-[400px] flex flex-col items-center justify-center text-center bg-transparent">
                            <h2 className="font-serif text-2xl font-bold mb-2 text-primary">{c.title}</h2>
                            {loading ? (
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            ) : post ? (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-foreground">{language === 'de' ? post.title_de : post.title_en}</h3>
                                    <p className="text-base leading-relaxed text-muted-foreground">{language === 'de' ? post.content_de : post.content_en}</p>
                                    <p className="text-sm text-muted-foreground/80 italic">Source: {language === 'de' ? post.source_de : post.source_en}</p>
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
                {user && <div className="w-full mt-4 grid grid-cols-3 gap-2">
                     <Button variant="outline" aria-label="Share" onClick={handleShare}>
                        <Share2 className="h-5 w-5" />
                    </Button>
                     <Button variant="outline" aria-label="Copy Image" onClick={handleCopyImage}>
                        <Copy className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" aria-label="Favorite" onClick={handleSaveFavorite} disabled={isSaving}>
                       {isSaving ? <Loader2 className="h-5 w-5 animate-spin"/> : <Heart className="h-5 w-5" />}
                    </Button>
                </div>}
            </div>
        </div>
    );
}
