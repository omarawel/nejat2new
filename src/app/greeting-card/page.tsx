
"use client"

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Wand2, ArrowLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { toPng } from 'html-to-image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { generateGreetingCard } from '@/ai/flows/generate-greeting-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { checkAndDecrementQuota, getUserQuota, UserQuota } from '@/lib/user-usage';
import { UpgradeInlineAlert } from '@/components/upgrade-inline-alert';


const themes = {
    'emerald': { bg: 'bg-emerald-800', text: 'text-white', border: 'border-emerald-600', pattern: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-700 to-emerald-800' },
    'sapphire': { bg: 'bg-blue-900', text: 'text-white', border: 'border-blue-700', pattern: 'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-800 to-blue-900' },
    'gold': { bg: 'bg-yellow-500', text: 'text-yellow-950', border: 'border-yellow-400', pattern: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400 to-yellow-500' },
    'rose': { bg: 'bg-rose-900', text: 'text-white', border: 'border-rose-700', pattern: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-800 to-rose-900' },
    'night': { bg: 'bg-slate-900', text: 'text-white', border: 'border-slate-700', pattern: 'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black' },
};

type ThemeKey = keyof typeof themes;

const greetings = {
    de: {
        eid: "Eid Mubarak! Möge Allah deine guten Taten annehmen.",
        ramadan: "Ramadan Mubarak! Ich wünsche dir einen gesegneten Monat voller Frieden und Besinnung.",
        nikah: "Herzlichen Glückwunsch zur Nikah! Möge Allah eure Ehe mit Liebe und Segen erfüllen."
    },
    en: {
        eid: "Eid Mubarak! May Allah accept your good deeds.",
        ramadan: "Ramadan Mubarak! Wishing you a blessed month of peace and reflection.",
        nikah: "Congratulations on your Nikah! May Allah bless your marriage with love and happiness."
    }
}

type OccasionKey = keyof typeof greetings['de'];

const content = {
    de: {
        title: "Grußkarten-Generator",
        description: "Erstelle und teile wunderschöne islamische Grußkarten für besondere Anlässe.",
        backToFeatures: "Zurück zu den Funktionen",
        occasion: "Anlass",
        eid: "Eid",
        ramadan: "Ramadan",
        nikah: "Hochzeit (Nikah)",
        customMessage: "Persönliche Nachricht",
        customMessagePlaceholder: "Deine persönliche Nachricht hier...",
        from: "Von",
        fromPlaceholder: "Dein Name",
        theme: "Design-Thema",
        emerald: "Smaragd",
        sapphire: "Saphir",
        gold: "Gold",
        rose: "Rose",
        night: "Nacht",
        preview: "Vorschau",
        download: "Karte herunterladen",
        aiSectionTitle: "Mit KI gestalten",
        aiPromptLabel: "Zusätzliche Wünsche für KI",
        aiPromptPlaceholder: "z.B. 'Eine elegante Karte mit goldenen Laternen' oder 'Ein fröhlicher Text für Kinder'",
        aiGenerate: "Mit KI erstellen",
        aiGenerating: "Wird erstellt...",
        aiError: "Fehler bei der KI-Generierung. Bitte versuche es erneut."
    },
    en: {
        title: "Greeting Card Generator",
        description: "Create and share beautiful Islamic greeting cards for special occasions.",
        backToFeatures: "Back to Features",
        occasion: "Occasion",
        eid: "Eid",
        ramadan: "Ramadan",
        nikah: "Wedding (Nikah)",
        customMessage: "Personal Message",
        customMessagePlaceholder: "Your personal message here...",
        from: "From",
        fromPlaceholder: "Your Name",
        theme: "Design Theme",
        emerald: "Emerald",
        sapphire: "Sapphire",
        gold: "Gold",
        rose: "Rose",
        night: "Night",
        preview: "Preview",
        download: "Download Card",
        aiSectionTitle: "Design with AI",
        aiPromptLabel: "Additional wishes for AI",
        aiPromptPlaceholder: "e.g. 'An elegant card with golden lanterns' or 'A cheerful text for children'",
        aiGenerate: "Create with AI",
        aiGenerating: "Creating...",
        aiError: "AI generation failed. Please try again."
    }
}

export default function GreetingCardPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const cardRef = useRef<HTMLDivElement>(null);

    const [occasion, setOccasion] = useState<OccasionKey>('eid');
    const [customMessage, setCustomMessage] = useState('');
    const [fromName, setFromName] = useState('');
    const [theme, setTheme] = useState<ThemeKey>('emerald');

    const [aiPrompt, setAiPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const [user, authLoading] = useAuthState(auth);
    const [quota, setQuota] = useState<UserQuota | null>(null);

     useEffect(() => {
        if (!authLoading) {
            getUserQuota(user?.uid || null).then(setQuota);
        }
    }, [user, authLoading]);

    const handleDownload = () => {
        if (cardRef.current === null) return;

        toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `greeting-card-${occasion}.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('oops, something went wrong!', err);
            });
    };
    
    const handleAiGenerate = async () => {
        setIsGenerating(true);
        setAiError(null);

         const quotaResult = await checkAndDecrementQuota(user?.uid || null);
        if (!quotaResult.success) {
            setQuota(quotaResult.quota);
            setIsGenerating(false);
            return;
        }
        setQuota(quotaResult.quota);

        try {
            const result = await generateGreetingCard({ occasion, customPrompt: aiPrompt });
            setCustomMessage(result.message);
            setGeneratedImage(result.imageUrl);
        } catch (error) {
            console.error(error);
            setAiError(c.aiError);
        } finally {
            setIsGenerating(false);
        }
    }

    const message = customMessage || greetings[language as keyof typeof greetings][occasion];
    const selectedTheme = themes[theme];

    const cardStyle = generatedImage ? { backgroundImage: `url(${generatedImage})` } : {};
    const cardClasses = generatedImage
        ? 'bg-cover bg-center'
        : cn(selectedTheme.bg, selectedTheme.pattern);

    const canSubmit = quota ? quota.remaining > 0 : true;


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
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card>
                    <CardHeader>
                        <CardTitle>Karte gestalten</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="occasion">{c.occasion}</Label>
                            <Select value={occasion} onValueChange={(v) => setOccasion(v as OccasionKey)}>
                                <SelectTrigger id="occasion">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="eid">{c.eid}</SelectItem>
                                    <SelectItem value="ramadan">{c.ramadan}</SelectItem>
                                    <SelectItem value="nikah">{c.nikah}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="customMessage">{c.customMessage}</Label>
                            <Textarea
                                id="customMessage"
                                placeholder={c.customMessagePlaceholder}
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="fromName">{c.from}</Label>
                            <Input
                                id="fromName"
                                placeholder={c.fromPlaceholder}
                                value={fromName}
                                onChange={(e) => setFromName(e.target.value)}
                            />
                        </div>
                         <div>
                            <Label htmlFor="theme">{c.theme}</Label>
                            <Select value={theme} onValueChange={(v) => setTheme(v as ThemeKey)} disabled={!!generatedImage}>
                                <SelectTrigger id="theme">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="emerald">{c.emerald}</SelectItem>
                                    <SelectItem value="sapphire">{c.sapphire}</SelectItem>
                                    <SelectItem value="gold">{c.gold}</SelectItem>
                                    <SelectItem value="rose">{c.rose}</SelectItem>
                                    <SelectItem value="night">{c.night}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="pt-4 border-t">
                            <h3 className="text-lg font-semibold mb-2">{c.aiSectionTitle}</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="ai-prompt">{c.aiPromptLabel}</Label>
                                    <Textarea id="ai-prompt" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder={c.aiPromptPlaceholder} />
                                </div>
                                 <UpgradeInlineAlert quota={quota} isLoggedIn={!!user} />
                                <Button onClick={handleAiGenerate} disabled={isGenerating || !canSubmit} className="w-full">
                                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                    {isGenerating ? c.aiGenerating : c.aiGenerate}
                                </Button>
                                {aiError && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{aiError}</AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </div>

                    </CardContent>
                </Card>
                
                <div className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>{c.preview}</CardTitle></CardHeader>
                        <CardContent>
                             <div
                                ref={cardRef}
                                style={cardStyle}
                                className={cn(
                                    "aspect-[16/9] w-full rounded-lg p-8 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden",
                                    cardClasses
                                )}
                            >
                                {!generatedImage && <div className={cn("absolute inset-0 z-0", selectedTheme.pattern)}></div>}
                                
                                <div className={cn("z-10 p-4 rounded-md", generatedImage ? "bg-black/50" : "")}>
                                    <p className={cn("text-3xl font-quranic mb-4", selectedTheme.text)}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                                    <p className={cn("text-xl leading-relaxed", selectedTheme.text)}>{message}</p>
                                    {fromName && <p className={cn("mt-6 text-lg font-semibold", selectedTheme.text)}>{c.from} {fromName}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Button onClick={handleDownload} className="w-full" size="lg" disabled={isGenerating}>
                        <Download className="mr-2 h-5 w-5" />
                        {c.download}
                    </Button>
                </div>
            </div>
        </div>
    );
}
