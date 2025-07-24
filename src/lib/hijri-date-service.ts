

'use client';

export interface HijriInfo {
  date: string;
  format: string;
  day: string;
  weekday: {
    en: string;
    ar: string;
  };
  month: {
    number: number;
    en: string;
    ar: string;
  };
  year: string;
}

export interface GregorianInfo {
  date: string;
  format: string;
  day: string;
  weekday: {
    en: string;
  };
  month: {
    number: number;
    en: string;
  };
  year: string;
}

export interface DayData {
  timings: Record<string, string>;
  date: {
    readable: string;
    timestamp: string;
    hijri: HijriInfo;
    gregorian: GregorianInfo;
  };
  meta: any;
}

export interface MonthData {
    code: number;
    status: string;
    data: DayData[];
}


export async function getHijriCalendar(month: number, year: number): Promise<MonthData | null> {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/hijriCalendar/${year}/${month}`);
        if (!response.ok) {
            console.error("Failed to fetch calendar data:", response.status);
            return null;
        }
        const data = await response.json();
        return data as MonthData;
    } catch (error) {
        console.error("Error fetching Hijri calendar:", error);
        return null;
    }
}
