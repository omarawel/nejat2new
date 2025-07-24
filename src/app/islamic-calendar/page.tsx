
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
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

export default function IslamicCalendarPage() {
    const { language } = useLanguage();
    const c = content[language];
    
    // State now only holds the Gregorian year and month for fetching
    const [viewDate, setViewDate] = useState(new Date());
    
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth() + 1; // 1-12 for API

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
                 <HijriCalendar 
                    year={year} 
                    month={month} 
                    onMonthChange={(newDate) => setViewDate(newDate)} 
                    currentDate={viewDate}
                />
            </div>
        </div>
    );
}
