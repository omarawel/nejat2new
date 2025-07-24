
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';
import { de, enUS } from 'date-fns/locale';
import Link from 'next/link';
import { getHijriDate } from '@/ai/flows/get-hijri-date';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const content = {
    de: {
        title: "Hijri-Kalender Konverter",
        description: "Wandle Daten zwischen dem gregorianischen und dem islamischen Kalender um.",
        backToFeatures: "Zurück zu den Funktionen",
        gregorianToHijri: "Gregorianisch zu Hijri",
        selectDate: "Wähle ein Datum",
        result: "Ergebnis",
        gregorianDate: "Gregorianisches Datum",
        hijriDate: "Hijri-Datum",
        errorTitle: "Fehler",
        errorDescription: "Das Hijri-Datum konnte nicht berechnet werden. Bitte versuche es später erneut.",
        calculating: "Berechne...",
    },
    en: {
        title: "Hijri Calendar Converter",
        description: "Convert dates between the Gregorian and Islamic calendars.",
        backToFeatures: "Back to Features",
        gregorianToHijri: "Gregorian to Hijri",
        selectDate: "Select a date",
        result: "Result",
        gregorianDate: "Gregorian Date",
        hijriDate: "Hijri Date",
        errorTitle: "Error",
        errorDescription: "Could not calculate the Hijri date. Please try again later.",
        calculating: "Calculating...",
    }
}


export default function HijriConverterPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const locale = language === 'de' ? de : enUS;

    const [gregorianDate, setGregorianDate] = useState<Date | undefined>(new Date());
    const [hijriResult, setHijriResult] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (gregorianDate) {
            const calculateHijri = async () => {
                setLoading(true);
                setError(null);
                try {
                    const result = await getHijriDate({ 
                        date: gregorianDate.toISOString().split('T')[0],
                        language: language,
                     });
                    setHijriResult(result.hijriDate);
                } catch (e) {
                    console.error(e);
                    setError(c.errorDescription);
                    setHijriResult('');
                } finally {
                    setLoading(false);
                }
            }
            calculateHijri();
        } else {
            setHijriResult('');
        }
    }, [gregorianDate, language, c.errorDescription]);

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">
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
                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                       
                        {loading && (
                            <div className="flex items-center justify-center p-4">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                {c.calculating}
                            </div>
                        )}

                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>{c.errorTitle}</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {hijriResult && !loading && (
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
