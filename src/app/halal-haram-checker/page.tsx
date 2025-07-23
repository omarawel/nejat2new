
"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Search, CheckCircle, XCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

// This is a simplified list for demonstration purposes. A real app would use a comprehensive database.
const ingredientDatabase: Record<string, { status: 'halal' | 'haram' | 'mushbooh', reason_en: string, reason_de: string }> = {
    // Halal
    'agar': { status: 'halal', reason_en: 'A plant-based gelling agent.', reason_de: 'Ein pflanzliches Geliermittel.' },
    'vanilla extract': { status: 'halal', reason_en: 'If made without alcohol or with synthetic/non-beverage alcohol, it is halal.', reason_de: 'Wenn ohne Alkohol oder mit synthetischem/nicht trinkbarem Alkohol hergestellt, ist es halal.' },
    'beef': { status: 'halal', reason_en: 'Considered halal if slaughtered according to Islamic law (Zabiha).', reason_de: 'Gilt als halal, wenn nach islamischem Recht (Zabiha) geschlachtet.' },
    'chicken': { status: 'halal', reason_en: 'Considered halal if slaughtered according to Islamic law (Zabiha).', reason_de: 'Gilt als halal, wenn nach islamischem Recht (Zabiha) geschlachtet.' },
    'pectin': { status: 'halal', reason_en: 'A plant-based gelling agent derived from fruits.', reason_de: 'Ein pflanzliches Geliermittel, das aus Früchten gewonnen wird.' },

    // Haram
    'pork': { status: 'haram', reason_en: 'Pork and its by-products are explicitly forbidden in the Quran.', reason_de: 'Schweinefleisch und seine Nebenprodukte sind im Koran ausdrücklich verboten.' },
    'gelatin': { status: 'haram', reason_en: 'Often derived from pork or non-Zabiha beef. Fish gelatin is halal.', reason_de: 'Oft aus Schweinefleisch oder nicht-Zabiha-Rindfleisch gewonnen. Fischgelatine ist halal.' },
    'carmine': { status: 'haram', reason_en: 'A red dye made from crushed cochineal insects.', reason_de: 'Ein roter Farbstoff, der aus zerkleinerten Cochenille-Insekten hergestellt wird.' },
    'lard': { status: 'haram', reason_en: 'Fat from a pig.', reason_de: 'Fett vom Schwein.' },
    'alcohol': { status: 'haram', reason_en: 'Alcoholic beverages and food containing it as an ingredient are forbidden.', reason_de: 'Alkoholische Getränke und Lebensmittel, die es als Zutat enthalten, sind verboten.' },
    
    // Mushbooh (Doubtful)
    'whey': { status: 'mushbooh', reason_en: 'Can be halal or haram depending on the enzyme (rennet) used. Microbial or plant-based rennet is halal.', reason_de: 'Kann halal oder haram sein, abhängig vom verwendeten Enzym (Lab). Mikrobielles oder pflanzliches Lab ist halal.' },
    'glycerin': { status: 'mushbooh', reason_en: 'Can be derived from animal fat (haram if pork) or plants (halal).', reason_de: 'Kann aus tierischem Fett (haram bei Schwein) oder Pflanzen (halal) gewonnen werden.' },
    'mono- and diglycerides': { status: 'mushbooh', reason_en: 'Emulsifiers that can be from animal or plant sources. Plant-based is halal.', reason_de: 'Emulgatoren, die aus tierischen oder pflanzlichen Quellen stammen können. Pflanzlich ist halal.' },
    'enzymes': { status: 'mushbooh', reason_en: 'Can be from animal, plant, or microbial sources. The source determines its status.', reason_de: 'Können aus tierischen, pflanzlichen oder mikrobiellen Quellen stammen. Die Quelle bestimmt den Status.' },
};

const content = {
    de: {
        title: "Halal & Haram Checker",
        description: "Gib eine Zutat ein, um ihren islamischen Status zu überprüfen. (Dies ist ein Demo-Tool und dient nur zur Veranschaulichung.)",
        backToFeatures: "Zurück zu den Funktionen",
        formTitle: "Zutat prüfen",
        ingredientLabel: "Zutat",
        ingredientPlaceholder: "z.B. Gelatine, Karmin, Molke...",
        checkButton: "Prüfen",
        checkingButton: "Prüfe...",
        resultTitle: "Ergebnis",
        halal: "Halal",
        haram: "Haram",
        mushbooh: "Zweifelhaft (Mushbooh)",
        notFound: "Zutat nicht in der Datenbank gefunden.",
    },
    en: {
        title: "Halal & Haram Checker",
        description: "Enter an ingredient to check its Islamic status. (This is a demo tool for illustrative purposes only.)",
        backToFeatures: "Back to Features",
        formTitle: "Check Ingredient",
        ingredientLabel: "Ingredient",
        ingredientPlaceholder: "e.g., gelatin, carmine, whey...",
        checkButton: "Check",
        checkingButton: "Checking...",
        resultTitle: "Result",
        halal: "Halal",
        haram: "Haram",
        mushbooh: "Doubtful (Mushbooh)",
        notFound: "Ingredient not found in the database.",
    }
};

type Result = {
    status: 'halal' | 'haram' | 'mushbooh' | 'not_found';
    reason: string;
    ingredient: string;
};

const FormSchema = z.object({
  ingredient: z.string().min(2, "Please enter at least 2 characters."),
});

export default function HalalHaramCheckerPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    const [result, setResult] = useState<Result | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { ingredient: "" },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setResult(null);
        
        // Simulate API call/database lookup
        setTimeout(() => {
            const searchTerm = data.ingredient.toLowerCase().trim();
            const found = ingredientDatabase[searchTerm];
            if (found) {
                setResult({
                    status: found.status,
                    reason: language === 'de' ? found.reason_de : found.reason_en,
                    ingredient: data.ingredient,
                });
            } else {
                 setResult({
                    status: 'not_found',
                    reason: c.notFound,
                    ingredient: data.ingredient,
                });
            }
            setIsLoading(false);
        }, 750);
    }
    
    const ResultCard = ({ result }: { result: Result }) => {
        let Icon, title, cardClass, iconClass;
        switch (result.status) {
            case 'halal':
                Icon = CheckCircle;
                title = c.halal;
                cardClass = 'border-green-500 bg-green-500/10';
                iconClass = 'text-green-500';
                break;
            case 'haram':
                Icon = XCircle;
                title = c.haram;
                cardClass = 'border-red-500 bg-red-500/10';
                iconClass = 'text-red-500';
                break;
            case 'mushbooh':
                Icon = AlertTriangle;
                title = c.mushbooh;
                cardClass = 'border-amber-500 bg-amber-500/10';
                iconClass = 'text-amber-500';
                break;
            default:
                Icon = Search;
                title = c.notFound
                cardClass = 'border-muted';
                iconClass = 'text-muted-foreground';
        }

        return (
             <Card className={cardClass}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Icon className={`h-8 w-8 ${iconClass}`} />
                        <span>{title}: <span className="font-normal">{result.ingredient}</span></span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{result.reason}</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>

            <div className="max-w-xl mx-auto space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{c.formTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="ingredient"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{c.ingredientLabel}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={c.ingredientPlaceholder} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{c.checkingButton}</>
                                    ) : (
                                        <><Search className="mr-2 h-4 w-4" />{c.checkButton}</>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {result && <ResultCard result={result} />}
            </div>
        </div>
    );
}
