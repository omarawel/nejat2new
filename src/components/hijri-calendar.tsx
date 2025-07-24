
"use client"

import { useEffect, useState } from 'react';
import { getHijriCalendar, type DayData } from '@/lib/hijri-date-service';
import { useLanguage } from './language-provider';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, WifiOff } from 'lucide-react';

const content = {
    de: {
        weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        hijriMonths: [ "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani", "Dschumada al-ula", "Dschumada al-uchra", "Radschab", "Scha'ban", "Ramadan", "Schawwal", "Dhu l-qaʿda", "Dhu l-hiddscha"],
        error: "Kalender konnte nicht geladen werden"
    },
    en: {
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        hijriMonths: [ "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani", "Jumada al-ula", "Jumada al-ukhra", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"],
        error: "Could not load calendar"
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
        <Card className={cn("h-28 flex flex-col justify-between", isToday && "border-2 border-primary bg-primary/10")}>
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

export const HijriCalendar = ({ year, month, onMonthChange, currentDate }: { year: number, month: number, onMonthChange: (newDate: Date) => void, currentDate: Date }) => {
    const { language } = useLanguage();
    const c = content[language];

    const [calendarData, setCalendarData] = useState<DayData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCalendar = async () => {
            setLoading(true);
            setError(null);
            const data = await getHijriCalendar(month, year);
            if (data?.data) {
                setCalendarData(data.data);
            } else {
                setError(c.error);
            }
            setLoading(false);
        };
        fetchCalendar();
    }, [year, month, c.error]);

    const changeMonth = (amount: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + amount);
        onMonthChange(newDate);
    };

    const today = new Date();
    const todayString = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    const firstDayOfMonth = calendarData.length > 0 ? new Date(year, month - 1, 1).getDay() : 0; // 0=Sun, 1=Mon, ...
    
    const getCalendarHeader = () => {
        if (!calendarData || calendarData.length === 0) return "";
        
        const primaryHijriMonthIndex = calendarData[15]?.date.hijri.month.number - 1;
        if (primaryHijriMonthIndex === undefined || primaryHijriMonthIndex < 0) return "";
        
        const primaryHijriMonth = c.hijriMonths[primaryHijriMonthIndex];
        const primaryHijriYear = calendarData[15].date.hijri.year;

        const gregorianMonth = currentDate.toLocaleString(language, { month: 'long', year: 'numeric' });

        return `${primaryHijriMonth} ${primaryHijriYear} / ${gregorianMonth}`;
    }


    return (
        <Card>
             <div className="flex justify-center items-center gap-4 p-4">
                <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-2xl font-semibold text-center w-64">
                    {loading ? <Skeleton className="h-8 w-full" /> : getCalendarHeader()}
                </h2>
                <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center font-semibold text-muted-foreground text-sm mb-2">
                    {c.weekdays.map(day => <div key={day}>{day}</div>)}
                </div>
                {loading ? (
                     <div className="grid grid-cols-7 gap-2">
                        {[...Array(35)].map((_, i) => <Skeleton key={i} className="h-28" />)}
                    </div>
                ) : error ? (
                    <div className="col-span-7 flex flex-col items-center justify-center p-8 text-destructive">
                        <WifiOff className="h-8 w-8 mb-2" />
                        <p>{error}</p>
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
