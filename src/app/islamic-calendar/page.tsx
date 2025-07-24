
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { HijriCalendar } from '@/components/hijri-calendar';

const content = {
    de: {
        title: "Islamischer Kalender",
        description: "Navigiere durch die islamischen Monate und sieh dir wichtige Daten an.",
        backToFeatures: "Zurück zu den Funktionen",
    },
    en: {
        title: "Islamic Calendar",
        description: "Navigate through the Islamic months and view important dates.",
        backToFeatures: "Back to Features",
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

export default function IslamicCalendarPage() {
    const { language } = useLanguage();
    const c = content[language];
    
    const [date, setDate] = useState(new Date());
    
    const changeMonth = (amount: number) => {
        setDate(currentDate => {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
    };
    
    // We need to use Gregorian month and year for the API call
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() is 0-indexed

    // For display, we can use a Hijri conversion library or the API data
    const monthName = (language === 'de' ? hijriMonths_de : hijriMonths_en)[new Date(date).getMonth()];
    const displayYear = date.getFullYear();

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <CalendarIcon className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-4">
                <div className="flex justify-center items-center gap-4 mb-4">
                    <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-2xl font-semibold text-center w-64">{monthName} {displayYear}</h2>
                    <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <HijriCalendar year={year} month={month} />
            </div>
        </div>
    );
}
