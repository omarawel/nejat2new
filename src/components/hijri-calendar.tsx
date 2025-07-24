
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
        hijriMonths: [ "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani", "Dschumada al-ula", "Dschumada al-uchra", "Radschab", "Scha'ban", "Ramadan", "Schawwal", "Dhu l-qaʿda", "Dhu l-hiddscha"]
    },
    en: {
        weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        hijriMonths: [ "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani", "Jumada al-ula", "Jumada al-ukhra", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"]
    }
}

const DayCard = ({ dayData, isToday }: { dayData: DayData | null, isToday: boolean }) => {
    const { language } = useLanguage();
    const c = content[language];
    
    if (!dayData) {
        return <div className="p-2 border border-transparent"></div>;
    }

    const { gregorian, hijri } = dayData.date;
    const hijriMonthName = c.hijriMonths[hijri.month.number - 1];

    return (
        <Card className={cn("h-28 flex flex-col justify-between", isToday && "border-primary bg-accent/50")}>
            <div className="p-2 text-left">
                <p className="font-bold text-lg">{gregorian.day}</p>
            </div>
            <div className={cn("p-2 text-right text-xs bg-muted/50 text-muted-foreground", isToday && "bg-primary/10 text-primary font-semibold")}>
                <p>{hijri.day}</p>
                 <p className="truncate">{hijriMonthName}</p>
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
    const todayString = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    const firstDayOfWeek = calendarData.length > 0 ? (new Date(year, month - 1, 1).getDay() + 6) % 7 : 0; // 0=Mon, 6=Sun

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
                        {Array.from({ length: firstDayOfWeek }).map((_, i) => <DayCard key={`empty-${i}`} dayData={null} isToday={false} />)}
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
