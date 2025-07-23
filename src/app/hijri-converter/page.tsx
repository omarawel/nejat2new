
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        title: "Hijri-Kalender Konverter",
        description: "Wandle Daten zwischen dem gregorianischen und dem islamischen Kalender um.",
        backToFeatures: "Zurück zu den Funktionen",
        gregorianToHijri: "Gregorianisch zu Hijri",
        hijriToGregorian: "Hijri zu Gregorianisch",
        selectDate: "Wähle ein Datum",
        day: "Tag",
        month: "Monat",
        year: "Jahr",
        result: "Ergebnis",
        gregorianDate: "Gregorianisches Datum",
        hijriDate: "Hijri-Datum",
    },
    en: {
        title: "Hijri Calendar Converter",
        description: "Convert dates between the Gregorian and Islamic calendars.",
        backToFeatures: "Back to Features",
        gregorianToHijri: "Gregorian to Hijri",
        hijriToGregorian: "Hijri to Gregorian",
        selectDate: "Select a date",
        day: "Day",
        month: "Month",
        year: "Year",
        result: "Result",
        gregorianDate: "Gregorian Date",
        hijriDate: "Hijri Date",
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


export default function HijriConverterPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const locale = language === 'de' ? de : undefined;

    const [gregorianDate, setGregorianDate] = useState<Date | undefined>(new Date());
    const [hijriResult, setHijriResult] = useState<string>('');

    useEffect(() => {
        if (gregorianDate) {
            const hijri = new HijriDate(gregorianDate);
            const months = language === 'de' ? hijriMonths_de : hijriMonths_en;
            setHijriResult(`${hijri.getDate()} ${months[hijri.getMonth()]} ${hijri.getFullYear()} AH`);
        }
    }, [gregorianDate, language]);

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
                    <ArrowRightLeft className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>

            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>{c.gregorianToHijri}</CardTitle>
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
                                    !gregorianDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {gregorianDate ? format(gregorianDate, "PPP", { locale }) : <span>{c.selectDate}</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={gregorianDate}
                                    onSelect={setGregorianDate}
                                    initialFocus
                                    locale={locale}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                       
                        {hijriResult && (
                             <Card className="bg-accent/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">{c.result}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold">{c.hijriDate}:</p>
                                    <p className="text-2xl text-primary font-bold">{hijriResult}</p>
                                </CardContent>
                             </Card>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
