
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';
import DateObject from 'react-date-object';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Import the necessary calendars and locales
import "react-date-object/calendars/islamic"
import "react-date-object/calendars/gregorian"
import "react-date-object/locales/de"
import "react-date-object/locales/en"


const content = {
    de: {
        pageTitle: "Islamischer Kalender",
        pageDescription: "Behalte den Überblick über wichtige Daten mit dem Hijri-Kalender.",
        backToFeatures: "Zurück zu den Funktionen",
        days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        locale: 'de'
    },
    en: {
        pageTitle: "Islamic Calendar",
        pageDescription: "Keep track of important dates with the Hijri calendar.",
        backToFeatures: "Back to Features",
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        locale: 'en'
    }
}

export default function HijriCalendarPage() {
  const { language } = useLanguage();
  const c = content[language];
  const locale = language === 'de' ? 'de' : 'en';

  const [currentDate, setCurrentDate] = useState<DateObject | null>(null);
  
  useEffect(() => {
    setCurrentDate(new DateObject({ calendar: "islamic", locale: locale }));
  }, [locale]);

  const goToPreviousMonth = () => {
    if (currentDate) {
      setCurrentDate(new DateObject(currentDate).subtract(1, "month"));
    }
  };
  const goToNextMonth = () => {
    if (currentDate) {
      setCurrentDate(new DateObject(currentDate).add(1, "month"));
    }
  };

  const firstDay = useMemo(() => {
      if (!currentDate) return null;
      return new DateObject(currentDate).setDay(1);
  }, [currentDate]);

  const daysInMonth = firstDay?.daysInMonth;
  const dayOfWeek = firstDay?.weekDay.index;

  const calendarDays = useMemo(() => {
    if (typeof daysInMonth !== 'number' || typeof dayOfWeek !== 'number' || !firstDay) return [];
    
    // Ensure the array length is valid
    const arrayLength = daysInMonth + dayOfWeek;
    if (arrayLength < 0 || !Number.isInteger(arrayLength)) {
      return [];
    }
    
    return Array(arrayLength).fill(null).map((_, index) => {
        if (index < dayOfWeek) return null;
        return new DateObject(firstDay).setDay(index - dayOfWeek + 1);
    });
  }, [firstDay, daysInMonth, dayOfWeek]);
  
  const today = new DateObject({ calendar: "islamic" });

  if (!currentDate) {
      return (
          <div className="container mx-auto px-4 py-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-lg mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                    <CardDescription>{c.pageDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                        <Button variant="outline" size="icon" onClick={goToPreviousMonth}><ChevronLeft /></Button>
                        <h3 className="text-xl font-semibold text-primary">{currentDate.format("MMMM YYYY")}</h3>
                        <Button variant="outline" size="icon" onClick={goToNextMonth}><ChevronRight /></Button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center font-semibold text-muted-foreground">
                        {c.days.map(day => <div key={day} className="w-full h-10 flex items-center justify-center">{day}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 mt-2">
                        {calendarDays.length > 0 ? calendarDays.map((day, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-2 text-center rounded-md h-16 flex flex-col justify-center items-center w-full",
                                    day ? "cursor-pointer hover:bg-accent" : "bg-transparent",
                                    day && (day.day === 13 || day.day === 14 || day.day === 15) ? 'bg-amber-100 dark:bg-amber-900/50' : '',
                                    day && day.format() === today.format() ? 'bg-primary text-primary-foreground' : ''
                                )}
                            >
                                {day && (
                                    <>
                                        <span className="font-bold text-lg">{day.format("d")}</span>
                                        <span className="text-xs text-muted-foreground">{new DateObject(day).convert('gregorian').format("D")}</span>
                                    </>
                                )}
                            </div>
                        )) : (
                            [...Array(35)].map((_, i) => <Skeleton key={i} className="h-16 w-full"/>)
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
