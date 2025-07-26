
"use client"

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquareQuote, ArrowLeft, Loader2, Share2, Heart } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { addFavorite } from '@/lib/favorites';
import { toBlob } from 'html-to-image';

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
        errorSaving: "Fehler beim Speichern des Favoriten."
    },
    en: {
        title: "Post about the Prophet (ﷺ)",
        backToFeatures: "Back to Features",
        newPost: "New Post",
        shareError: "Sharing is not supported by your browser.",
        postCopied: "Post image copied to clipboard.",
        favoriteSaved: "Saved to favorites!",
        loginToSave: "Login to save favorites.",
        errorSaving: "Error saving favorite."
    }
}

export default function ProphetPostOfTheDayPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const [user, authLoading] = useAuthState(auth);

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const postcardRef = useRef<HTMLDivElement>(null);

    const getNewPost = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * posts.length);
            let newPost = posts[randomIndex];
            if (post && newPost.title_en === post.title_en) {
                 newPost = posts[(randomIndex + 1) % posts.length];
            }
            setPost(newPost);
            setLoading(false);
        }, 300);
    }, [post]);

    useEffect(() => {
        getNewPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    
    const handleSaveFavorite = async () => {
        if (!post) return;
        if (!user) {
            toast({
                variant: 'destructive',
                title: c.loginToSave,
                description: <Button variant="secondary" size="sm" asChild className="mt-2"><Link href="/login">Login</Link></Button>
            });
            return;
        }

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
       <div className="flex-grow w-full flex flex-col bg-background">
             <div className="flex-grow w-full bg-emerald-50 dark:bg-emerald-950/30 rounded-b-[3rem] p-4 relative">
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
                    className="w-full max-w-2xl mx-auto text-center shadow-2xl bg-card border-emerald-200/50 dark:border-emerald-800/50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 dark:from-emerald-900 to-card"
                >
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="min-h-[250px] flex items-center justify-center p-6">
                        {loading ? (
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        ) : post ? (
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary">{language === 'de' ? post.title_de : post.title_en}</h3>
                                <p className="text-base leading-relaxed text-foreground/90">{language === 'de' ? post.content_de : post.content_en}</p>
                                <p className="text-sm text-muted-foreground italic">Quelle: {language === 'de' ? post.source_de : post.source_en}</p>
                            </div>
                        ) : null}
                    </CardContent>
                     <CardFooter className="justify-end p-2 pr-4">
                        <p className="text-xs text-muted-foreground">Nejat Pro</p>
                    </CardFooter>
                </Card>
                 <div className="w-full max-w-2xl mx-auto mt-4 grid grid-cols-3 gap-2">
                    <Button variant="outline" className="col-span-1" onClick={getNewPost} disabled={loading || authLoading || !user}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        {c.newPost}
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
