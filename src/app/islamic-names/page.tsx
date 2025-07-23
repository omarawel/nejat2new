
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Baby, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

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
        meaning: "Bedeutung"
    },
    en: {
        title: "Islamic Names and Their Meanings",
        description: "A selection of beautiful Islamic names for boys and girls. The Prophet (ﷺ) said: 'On the Day of Resurrection, you will be called by your names and by your fathers' names, so give yourselves good names.'",
        backToFeatures: "Back to Features",
        searchPlaceholder: "Search for a name...",
        maleNames: "Names for Boys",
        femaleNames: "Names for Girls",
        meaning: "Meaning"
    }
};

export default function IslamicNamesPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const [searchTerm, setSearchTerm] = useState('');

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
