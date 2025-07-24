
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Loader2, AlertTriangle, Wand2, CalendarCheck2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { getHijriDate } from '@/ai/flows/get-hijri-date';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


const content = {
    de: {
        pageTitle: "Hijri-Datum-Konverter",
        pageDescription: "Wandle ein gregorianisches Datum einfach in das entsprechende Hijri-Datum um.",
        backToFeatures: "Zurück zu den Funktionen",
        gregorianDate: "Gregorianisches Datum",
        pickDate: "Wähle ein Datum",
        convert: "Umwandeln",
        converting: "Wird umgewandelt...",
        result: "Ergebnis",
        hijriDate: "Hijri-Datum:",
        errorTitle: "Fehler",
        errorDescription: "Das Hijri-Datum konnte nicht berechnet werden. Bitte versuche es später erneut.",
    },
    en: {
        pageTitle: "Hijri Date Converter",
        pageDescription: "Easily convert a Gregorian date to its corresponding Hijri date.",
        backToFeatures: "Back to Features",
        gregorianDate: "Gregorian Date",
        pickDate: "Pick a date",
        convert: "Convert",
        converting: "Converting...",
        result: "Result",
        hijriDate: "Hijri Date:",
        errorTitle: "Error",
        errorDescription: "Could not calculate the Hijri date. Please try again later.",
    }
}


export default function HijriConverterPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [hijriResult, setHijriResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleConvert = async () => {
        if (!date) return;
        
        setIsLoading(true);
        setError(null);
        setHijriResult(null);

        try {
            const formattedDate = format(date, 'yyyy-MM-dd');
            const result = await getHijriDate({ date: formattedDate, language: language as 'de' | 'en' });
            setHijriResult(result.hijriDate);
        } catch(e) {
            console.error(e);
            setError(c.errorDescription);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
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
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="date">{c.gregorianDate}</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={"w-full justify-start text-left font-normal mt-1"}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>{c.pickDate}</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Button className="w-full" onClick={handleConvert} disabled={isLoading || !date}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {c.converting}
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    {c.convert}
                                </>
                            )}
                        </Button>
                    </CardContent>
                    {(hijriResult || error) && (
                        <CardFooter className="flex-col items-start">
                            <h3 className="font-semibold mb-2">{c.result}</h3>
                            {error && (
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>{c.errorTitle}</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                             {hijriResult && (
                                <div className="p-4 bg-muted rounded-md w-full flex items-center justify-between">
                                    <span className="font-semibold">{c.hijriDate}</span>
                                    <span className="text-lg font-bold text-primary">{hijriResult}</span>
                                </div>
                            )}
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    );
}
