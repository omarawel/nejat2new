
"use client"

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Mail, Wand2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { toPng } from 'html-to-image';
import { cn } from '@/lib/utils';

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
        download: "Karte herunterladen"
    },
    en: {
        title: "Greeting Card Generator",
        description: "Create and share beautiful Islamic greeting cards for special occasions.",
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
        download: "Download Card"
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

    const handleDownload = () => {
        if (cardRef.current === null) return;

        toPng(cardRef.current, { cacheBust: true })
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
    
    const message = customMessage || greetings[language][occasion];
    const selectedTheme = themes[theme];

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                 <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Mail className="h-10 w-10" />
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
                            <Select value={theme} onValueChange={(v) => setTheme(v as ThemeKey)}>
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
                    </CardContent>
                </Card>
                
                <div className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>{c.preview}</CardTitle></CardHeader>
                        <CardContent>
                            <div
                                ref={cardRef}
                                className={cn(
                                    "aspect-[16/9] w-full rounded-lg p-8 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden",
                                    selectedTheme.bg, selectedTheme.text
                                )}
                            >
                                <div className={cn("absolute inset-0 z-0", selectedTheme.pattern)}></div>
                                <div className="z-10">
                                    <p className="text-3xl font-quranic mb-4">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                                    <p className="text-xl leading-relaxed">{message}</p>
                                    {fromName && <p className="mt-6 text-lg font-semibold">{c.from} {fromName}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Button onClick={handleDownload} className="w-full" size="lg">
                        <Download className="mr-2 h-5 w-5" />
                        {c.download}
                    </Button>
                </div>
            </div>
        </div>
    );
}
