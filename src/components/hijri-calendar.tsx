
"use client"

import { useEffect, useState } from 'react';
import { getHijriCalendar, type DayData } from '@/lib/hijri-date-service';
import { useLanguage } from './language-provider';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

const content = {
    de: {
        weekdays: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    },
    en: {
        weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    }
}

const DayCard = ({ dayData, isToday }: { dayData: DayData | null, isToday: boolean }) => {
    if (!dayData) {
        return <div className="p-2 border border-transparent"></div>;
    }

    const { gregorian, hijri } = dayData.date;

    return (
        <Card className={cn("h-28 flex flex-col", isToday && "border-primary")}>
            <div className="flex-grow p-2 text-left">
                <p className="text-sm font-bold">{gregorian.day}</p>
            </div>
            <div className={cn("p-2 text-right text-xs bg-muted/50", isToday && "bg-primary/10 text-primary")}>
                <p className="font-semibold">{hijri.day} {hijri.month.en}</p>
            </div>
        </Card>
    );
};

export const HijriCalendar = ({ year, month }: { year: number, month: number }) => {
    const { language } = useLanguage();
    const c = content[language];

    const [calendarData, setCalendarData] = useState<DayData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCalendar = async () => {
            setLoading(true);
            const data = await getHijriCalendar(month, year);
            if (data?.data) {
                setCalendarData(data.data);
            }
            setLoading(false);
        };
        fetchCalendar();
    }, [year, month]);

    const today = new Date();
    const todayString = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    const firstDayOfMonth = calendarData.length > 0 ? (new Date(calendarData[0].date.gregorian.date.split('-').reverse().join('-')).getDay() + 6) % 7 : 0;

    return (
        <Card>
            <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center font-semibold text-muted-foreground text-sm mb-2">
                    {c.weekdays.map(day => <div key={day}>{day}</div>)}
                </div>
                {loading ? (
                     <div className="grid grid-cols-7 gap-2">
                        {[...Array(35)].map((_, i) => <Skeleton key={i} className="h-28" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => <DayCard key={`empty-${i}`} dayData={null} isToday={false} />)}
                        {calendarData.map(day => (
                            <DayCard 
                                key={day.date.readable}
                                dayData={day}
                                isToday={day.date.gregorian.date === todayString}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
