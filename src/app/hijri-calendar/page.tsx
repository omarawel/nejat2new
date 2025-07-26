"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';
import DateObject from 'react-date-object';
import { cn } from '@/lib/utils';

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

  const [currentDate, setCurrentDate] = useState(new DateObject({ calendar: "islamic", locale: locale }));
  
  useEffect(() => {
    setCurrentDate(new DateObject({ calendar: "islamic", locale: locale }));
  }, [locale]);

  const goToPreviousMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const firstDay = useMemo(() => new DateObject(currentDate).setDay(1), [currentDate]);
  const daysInMonth = firstDay.daysInMonth;
  const dayOfWeek = firstDay.weekDay.index;

  const calendarDays = useMemo(() => {
    return Array(daysInMonth + dayOfWeek).fill(null).map((_, index) => {
        if (index < dayOfWeek) return null;
        return new DateObject(firstDay).setDay(index - dayOfWeek + 1);
    });
  }, [firstDay, daysInMonth, dayOfWeek]);
  
  const today = new DateObject({ calendar: "islamic" });

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
                        {c.days.map(day => <div key={day} className="w-10 h-10 flex items-center justify-center">{day}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 mt-2">
                        {calendarDays.map((day, index) => (
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
                                        <span className="text-xs text-muted-foreground">{day.convert().format("D")}</span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
