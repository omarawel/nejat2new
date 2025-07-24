
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowRightLeft, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/components/language-provider';
import HijriDate from 'hijri-date/lib/safe';
import { cn } from '@/lib/utils';
import { de } from 'date-fns/locale';
import Link from 'next/link';

const content = {
    de: {
        title: "Islamischer Kalender",
        description: "Wandle Daten zwischen dem gregorianischen und dem islamischen Kalender um und sieh dir den heutigen Tag an.",
        backToFeatures: "Zurück zu den Funktionen",
        gregorianToHijri: "Gregorianisch zu Hijri",
        selectDate: "Wähle ein Datum",
        result: "Ergebnis",
        gregorianDate: "Gregorianisches Datum",
        hijriDate: "Hijri-Datum",
        today: "Heute",
    },
    en: {
        title: "Islamic Calendar",
        description: "Convert dates between the Gregorian and Islamic calendars and view today's date.",
        backToFeatures: "Back to Features",
        gregorianToHijri: "Gregorian to Hijri",
        selectDate: "Select a date",
        result: "Result",
        gregorianDate: "Gregorian Date",
        hijriDate: "Hijri Date",
        today: "Today",
    }
}

const hijriMonths_en = [
    "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
    "Jumada al-ula", "Jumada al-ukhra", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

const hijriMonths_de = [
    "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
    "Dschumada al-ula", "Dschumada al-uchra", "Radschab", "Scha'ban",
    "Ramadan", "Schawwal", "Dhu l-qaʿda", "Dhu l-hiddscha"
];

function formatHijriDate(hijri: HijriDate, lang: 'de' | 'en'): string {
    const year = hijri.getFullYear();
    // Add a check to prevent "undefined" from being displayed.
    if (isNaN(year)) {
        return '';
    }
    const months = lang === 'de' ? hijriMonths_de : hijriMonths_en;
    return `${hijri.getDate()} ${months[hijri.getMonth()]} ${year} AH`;
}


export default function IslamicCalendarPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const locale = language === 'de' ? de : undefined;

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [conversionResult, setConversionResult] = useState<string>('');
    const [todayHijri, setTodayHijri] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const today = new HijriDate();
            setTodayHijri(formatHijriDate(today, language));
            
            if (selectedDate) {
                const hijri = new HijriDate(selectedDate);
                setConversionResult(formatHijriDate(hijri, language));
            }
        }
    }, [selectedDate, language, isClient]);

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <CalendarIcon className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>

            <div className="max-w-md mx-auto space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>{c.today}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-lg font-semibold">{isClient ? format(new Date(), 'PPP', { locale }) : '...'}</p>
                        <p className="text-2xl text-primary font-bold">{isClient ? todayHijri : '...'}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ArrowRightLeft className="h-5 w-5"/>{c.gregorianToHijri}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <label className="text-sm font-medium">{c.gregorianDate}</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !selectedDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {selectedDate ? format(selectedDate, "PPP", { locale }) : <span>{c.selectDate}</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    initialFocus
                                    locale={locale}
                                    captionLayout="dropdown-buttons"
                                    fromYear={1900}
                                    toYear={2100}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                       
                        {conversionResult && (
                             <Card className="bg-accent/50">
                                <CardHeader>
                                    <CardTitle className="text-base">{c.result}</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="font-semibold text-sm text-muted-foreground">{c.hijriDate}:</p>
                                    <p className="text-xl text-primary font-bold">{conversionResult}</p>
                                </CardContent>
                             </Card>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
