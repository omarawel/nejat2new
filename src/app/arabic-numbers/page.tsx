
"use client"

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, Loader, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const content = {
    de: {
        title: "Arabische Zahlen",
        description: "Lerne die arabischen Zahlen von 1-20 oder wandle eine beliebige Zahl um.",
        backToFeatures: "Zurück zu den Funktionen",
        learnTitle: "Lerne die Zahlen 1-20",
        memorize: "Lernen",
        numeral: "Ziffer",
        name: "Name",
        number: "Zahl",
        converterTitle: "Zahlenkonverter",
        converterDescription: "Gib eine beliebige Zahl ein, um ihre arabische Schreibweise und Aussprache zu lernen.",
        numberLabel: "Zahl eingeben",
        numberPlaceholder: "z.B. 1995",
        convertButton: "Umwandeln",
        resultTitle: "Ergebnis",
        transliteration: "Transliteration",
        conversionError: "Die Zahl konnte nicht umgewandelt werden. Bitte versuche es mit einer gültigen Zahl.",
        inputRequired: "Bitte gib eine Zahl ein.",
        tooLarge: "Die Zahl ist zu groß. Bitte gib eine Zahl kleiner als 1.000.000 ein.",
        play: "Abspielen"
    },
    en: {
        title: "Arabic Numbers",
        description: "Learn the Arabic numbers from 1-20 or convert any number.",
        backToFeatures: "Back to Features",
        learnTitle: "Learn the Numbers 1-20",
        memorize: "Memorize",
        numeral: "Numeral",
        name: "Name",
        number: "Number",
        converterTitle: "Number Converter",
        converterDescription: "Enter any number to learn its Arabic writing and pronunciation.",
        numberLabel: "Enter Number",
        numberPlaceholder: "e.g. 1995",
        convertButton: "Convert",
        resultTitle: "Result",
        transliteration: "Transliteration",
        conversionError: "Could not convert the number. Please try a valid number.",
        inputRequired: "Please enter a number.",
        tooLarge: "Number is too large. Please enter a number less than 1,000,000.",
        play: "Play"
    }
}

const easternArabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

function toEasternArabic(num: number): string {
    return num.toString().split('').map(digit => easternArabicNumerals[parseInt(digit)]).join('');
}

const staticNumbers = Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const transliterations = {
        de: numberToWords(num, 'de'),
        en: numberToWords(num, 'en')
    }
    return {
        number: num,
        numeral: toEasternArabic(num),
        name_de: transliterations.de,
        name_en: transliterations.en,
    };
});


function numberToWords(num: number, lang: 'de' | 'en'): string {
    if (num === 0) return lang === 'de' ? 'Sifr' : 'Sifr';
    if (num >= 1000000) return '';
    
    // Using a simplified transliteration for this example. A full library would be needed for perfect grammar.
    const units: Record<number, string> = {
        1: 'Wahid', 2: 'Ithnan', 3: 'Thalatha', 4: 'Arba\'a', 5: 'Khamsa', 6: 'Sittah', 7: 'Sab\'a', 8: 'Thamaniyah', 9: 'Tis\'a'
    };
    const tens: Record<number, string> = {
        10: 'Asharah', 20: 'Ishrun', 30: 'Thalathun', 40: 'Arba\'un', 50: 'Khamsun', 60: 'Sittun', 70: 'Sab\'un', 80: 'Thamanun', 90: 'Tis\'un'
    };
    const teens: Record<number, string> = {
        11: 'Ahada Ashar', 12: 'Ithna Ashar', 13: 'Thalathata Ashar', 14: 'Arba\'ata Ashar', 15: 'Khamsata Ashar', 16: 'Sittata Ashar', 17: 'Sab\'ata Ashar', 18: 'Thamaniyata Ashar', 19: 'Tis\'ata Ashar'
    };

    let words = [];

    if (num >= 1000) {
        const thousands = Math.floor(num / 1000);
        if (thousands === 1) words.push('Alf');
        else if (thousands === 2) words.push('Alfayn');
        else if (thousands >= 3 && thousands <= 10) words.push(units[thousands] + ' Alaf');
        else {
             words.push(numberToWords(thousands, lang) + ' Alf');
        }
        num %= 1000;
    }

    if (num >= 100) {
        const hundreds = Math.floor(num / 100);
        if (hundreds === 1) words.push('Mi\'ah');
        else if (hundreds === 2) words.push('Mi\'atayn');
        else words.push(units[hundreds] + ' Mi\'ah');
        num %= 100;
    }

    if (num > 0) {
        if (num > 0 && words.length > 0) words.push('wa');

        if (num < 10) {
            words.push(units[num]);
        } else if (num >= 11 && num <= 19) {
            words.push(teens[num]);
        } else if (num % 10 === 0) {
            words.push(tens[num]);
        } else {
            const unit = num % 10;
            const ten = Math.floor(num / 10) * 10;
            words.push(units[unit], 'wa', tens[ten]);
        }
    }

    return words.join(' ');
}


const FormSchema = z.object({
  number: z.number().min(0, "Number must be positive.").max(999999, "Number must be less than 1,000,000."),
})


export default function ArabicNumbersPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  const [result, setResult] = useState<{ numeral: string, transliteration: string, original: number } | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [conversionError, setConversionError] = useState<string | null>(null);
  const [hiddenRows, setHiddenRows] = useState<Record<string, boolean>>({});


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      number: undefined,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const num = data.number;
    setConversionError(null);
    setResult(null);

    const transliteration = numberToWords(num, language);
    if (!transliteration) {
        setConversionError(c.tooLarge);
        return;
    }

    const numeral = toEasternArabic(num);
    setResult({ numeral, transliteration, original: num });
  }

  const handlePlayAudio = async (textToPlay: string, id: string) => {
    if (playingAudio === id) {
        audioRef.current?.pause();
        setPlayingAudio(null);
        return;
    }
    setLoadingAudio(id);
    setAudioUrl(null);
    setPlayingAudio(null);

    try {
      const { audio } = await textToSpeech(textToPlay);
      setAudioUrl(audio);
      setPlayingAudio(id);
    } catch (err) {
      console.error("Failed to get audio", err);
    } finally {
      setLoadingAudio(null);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [audioUrl]);

  const toggleRowVisibility = (id: string) => {
    setHiddenRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
       {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setPlayingAudio(null)}
        />
      )}
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {c.backToFeatures}
        </Link>
      </Button>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{c.description}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
            <CardHeader>
                <CardTitle>{c.learnTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {staticNumbers.map((item) => {
                        const id = `static-${item.number}`;
                        const isHidden = hiddenRows[id];
                        const isPlaying = playingAudio === id;
                        const isLoading = loadingAudio === id;
                        const name = language === 'de' ? item.name_de : item.name_en;

                        return (
                            <Card key={id} className="p-4 flex flex-col items-center justify-between">
                                <p className="text-3xl font-quranic font-bold text-primary">{item.numeral}</p>
                                <div className={cn("text-center mt-2", isHidden && 'opacity-0')}>
                                    <p className="font-semibold">{item.number}</p>
                                    <p className="text-sm text-muted-foreground">{name}</p>
                                </div>
                                <div className="flex items-center mt-3">
                                    <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(name, id)} disabled={isLoading}>
                                        {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : (isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />)}
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => toggleRowVisibility(id)}>
                                        {isHidden ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                    </Button>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </CardContent>
        </Card>


        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{c.converterTitle}</CardTitle>
                    <CardDescription>{c.converterDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{c.numberLabel}</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        placeholder={c.numberPlaceholder} 
                                        {...field}
                                        onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full">{c.convertButton}</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {result && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            {c.resultTitle}
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handlePlayAudio(result.transliteration, `result-${result.original}`)} 
                                disabled={loadingAudio === `result-${result.original}`}
                            >
                                {loadingAudio === `result-${result.original}` ? <Loader className="h-5 w-5 animate-spin" /> : (playingAudio === `result-${result.original}` ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />)}
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">{c.numeral}</h3>
                            <p className="text-4xl font-bold text-primary text-right font-quranic">{result.numeral}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">{c.transliteration}</h3>
                            <p className="text-xl font-semibold">{result.transliteration}</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {conversionError && (
                <p className="text-destructive text-center mt-4">{conversionError}</p>
            )}
        </div>
      </div>
    </div>
  );
}
