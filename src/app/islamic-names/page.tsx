
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Baby, ArrowLeft, Wand2, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateIslamicName } from '@/ai/flows/generate-islamic-name';
import type { GenerateIslamicNameOutput, NameSuggestionSchema } from '@/ai/flows/generate-islamic-name-types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const names = {
  male: [
    { name: "Muhammad", meaning_de: "Der Gepriesene", meaning_en: "The Praised One" },
    { name: "Ahmad", meaning_de: "Der sehr Lobenswerte", meaning_en: "The Most Praiseworthy" },
    { name: "Ali", meaning_de: "Der Erhabene, Hohe", meaning_en: "The Exalted, High" },
    { name: "Hasan", meaning_de: "Gut, Schön", meaning_en: "Good, Handsome" },
    { name: "Husayn", meaning_de: "Kleiner Hasan, gut", meaning_en: "Little Hasan, good" },
    { name: "Abdullah", meaning_de: "Diener Allahs", meaning_en: "Servant of Allah" },
    { name: "Abdur-Rahman", meaning_de: "Diener des Allerbarmers", meaning_en: "Servant of the Most Merciful" },
    { name: "Omar", meaning_de: "Langes Leben, blühend", meaning_en: "Long life, flourishing" },
    { name: "Uthman", meaning_de: "Name eines Gefährten", meaning_en: "Name of a companion" },
    { name: "Khalid", meaning_de: "Ewig, unsterblich", meaning_en: "Eternal, immortal" },
    { name: "Yusuf", meaning_de: "Name eines Propheten (Joseph)", meaning_en: "Name of a Prophet (Joseph)" },
    { name: "Ibrahim", meaning_de: "Name eines Propheten (Abraham)", meaning_en: "Name of a Prophet (Abraham)" },
  ],
  female: [
    { name: "Aisha", meaning_de: "Lebendig, die Lebende", meaning_en: "Alive, living" },
    { name: "Fatima", meaning_de: "Die sich enthält, entwöhnend", meaning_en: "One who abstains, weaning" },
    { name: "Khadija", meaning_de: "Frühgeborenes Kind", meaning_en: "Premature child" },
    { name: "Maryam", meaning_de: "Name der Mutter von Isa (Maria)", meaning_en: "Name of the mother of Isa (Mary)" },
    { name: "Zaynab", meaning_de: "Name eines duftenden Baumes", meaning_en: "Name of a fragrant tree" },
    { name: "Amina", meaning_de: "Die Vertrauenswürdige, Treue", meaning_en: "The trustworthy, faithful one" },
    { name: "Safiyya", meaning_de: "Die Reine, Aufrichtige", meaning_en: "The pure, sincere one" },
    { name: "Hafsa", meaning_de: "Junge Löwin", meaning_en: "Young lioness" },
    { name: "Sumayyah", meaning_de: "Hoher Rang, erhaben", meaning_en: "High rank, sublime" },
    { name: "Ruqayyah", meaning_de: "Zauber, Anrufung", meaning_en: "Charm, incantation" },
    { name: "Layla", meaning_de: "Nacht", meaning_en: "Night" },
    { name: "Hana", meaning_de: "Glück, Segen", meaning_en: "Happiness, bliss" },
  ]
};

const content = {
    de: {
        title: "Islamische Namen und ihre Bedeutungen",
        description: "Eine Auswahl schöner islamischer Namen für Jungen und Mädchen. Der Prophet (ﷺ) sagte: 'Am Tag der Auferstehung werdet ihr bei euren Namen und den Namen eurer Väter gerufen, also wählt schöne Namen.'",
        backToFeatures: "Zurück zu den Funktionen",
        searchPlaceholder: "Suche nach einem Namen...",
        maleNames: "Namen für Jungen",
        femaleNames: "Namen für Mädchen",
        meaning: "Bedeutung",
        aiTitle: "KI Namens-Generator",
        aiDescription: "Beschreibe eine Bedeutung und lass die KI passende Namen finden.",
        aiGenderLabel: "Geschlecht",
        aiGenderMale: "Männlich",
        aiGenderFemale: "Weiblich",
        aiMeaningLabel: "Gewünschte Bedeutung",
        aiMeaningPlaceholder: "z.B. Geduld, Licht, Mutig",
        aiGenerateButton: "Namen generieren",
        aiGeneratingButton: "Wird generiert...",
        aiResultsTitle: "KI-Vorschläge",
        aiError: "Fehler beim Generieren der Namen. Bitte versuche es erneut.",
        proFeature: "Pro-Funktion"
    },
    en: {
        title: "Islamic Names and Their Meanings",
        description: "A selection of beautiful Islamic names for boys and girls. The Prophet (ﷺ) said: 'On the Day of Resurrection, you will be called by your names and by your fathers' names, so give yourselves good names.'",
        backToFeatures: "Back to Features",
        searchPlaceholder: "Search for a name...",
        maleNames: "Names for Boys",
        femaleNames: "Names for Girls",
        meaning: "Meaning",
        aiTitle: "AI Name Generator",
        aiDescription: "Describe a meaning and let the AI find suitable names.",
        aiGenderLabel: "Gender",
        aiGenderMale: "Male",
        aiGenderFemale: "Female",
        aiMeaningLabel: "Desired Meaning",
        aiMeaningPlaceholder: "e.g., Patience, Light, Brave",
        aiGenerateButton: "Generate Names",
        aiGeneratingButton: "Generating...",
        aiResultsTitle: "AI Suggestions",
        aiError: "Error generating names. Please try again.",
        proFeature: "Pro Feature"
    }
};

const aiFormSchema = z.object({
    gender: z.enum(['male', 'female']),
    meaning: z.string().min(3, { message: "Meaning must be at least 3 characters." }),
});


export default function IslamicNamesPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const [searchTerm, setSearchTerm] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [aiResults, setAiResults] = useState<GenerateIslamicNameOutput | null>(null);
    const [aiError, setAiError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof aiFormSchema>>({
        resolver: zodResolver(aiFormSchema),
        defaultValues: {
            gender: "male",
            meaning: "",
        },
    });

    async function onAiSubmit(data: z.infer<typeof aiFormSchema>) {
        setIsLoading(true);
        setAiError(null);
        setAiResults(null);
        try {
            const result = await generateIslamicName({ ...data, count: 5 });
            setAiResults(result);
        } catch (error) {
            console.error(error);
            setAiError(c.aiError);
        } finally {
            setIsLoading(false);
        }
    }

    const filterNames = (nameList: typeof names.male) => {
        if (!searchTerm) return nameList;
        return nameList.filter(n => n.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filteredMaleNames = filterNames(names.male);
    const filteredFemaleNames = filterNames(names.female);

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Baby className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>

            <div className="max-w-4xl mx-auto mb-12">
                <Card className="border-primary/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                             <Wand2 />
                             {c.aiTitle}
                           </div>
                           <span className="text-sm font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">{c.proFeature}</span>
                        </CardTitle>
                        <CardDescription>{c.aiDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onAiSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{c.aiGenderLabel}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    <SelectItem value="male">{c.aiGenderMale}</SelectItem>
                                                    <SelectItem value="female">{c.aiGenderFemale}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="meaning"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{c.aiMeaningLabel}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={c.aiMeaningPlaceholder} {...field} />
                                                </FormControl>
                                                 <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                     {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {c.aiGeneratingButton}
                                        </>
                                    ) : (
                                        c.aiGenerateButton
                                    )}
                                </Button>
                            </form>
                        </Form>
                         {aiError && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{aiError}</AlertDescription>
                            </Alert>
                        )}
                        {aiResults && aiResults.names.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">{c.aiResultsTitle}</h3>
                                <div className="space-y-2">
                                    {aiResults.names.map(name => (
                                         <Card key={name.name} className="p-3 bg-accent/50">
                                            <p className="font-bold text-lg">{name.name} <span className="font-quranic">({name.arabic})</span></p>
                                            <p className="text-sm text-muted-foreground">{name.meaning}</p>
                                         </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            
            <div className="max-w-4xl mx-auto mb-8">
                <Input 
                    type="search"
                    placeholder={c.searchPlaceholder}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-semibold text-primary mb-4">{c.maleNames}</h2>
                    <div className="space-y-4">
                        {filteredMaleNames.map((name, index) => (
                            <Card key={index}>
                                <CardContent className="p-4 flex justify-between items-center">
                                    <p className="font-semibold text-lg">{name.name}</p>
                                    <p className="text-muted-foreground">{language === 'de' ? name.meaning_de : name.meaning_en}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                 <div>
                    <h2 className="text-2xl font-semibold text-primary mb-4">{c.femaleNames}</h2>
                    <div className="space-y-4">
                        {filteredFemaleNames.map((name, index) => (
                            <Card key={index}>
                                <CardContent className="p-4 flex justify-between items-center">
                                    <p className="font-semibold text-lg">{name.name}</p>
                                    <p className="text-muted-foreground">{language === 'de' ? name.meaning_de : name.meaning_en}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
