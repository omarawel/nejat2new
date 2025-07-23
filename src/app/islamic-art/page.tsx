
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Palette, PenTool, Gem, LandPlot, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const content = {
    de: {
        title: "Islamische Kunst",
        description: "Entdecke die Schönheit und Vielfalt islamischer Kunstformen, die von einem tiefen Glauben und einer reichen Geschichte geprägt sind.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: PenTool,
                title: "Kalligrafie: Die Kunst der schönen Schrift",
                content: "Die Kalligrafie ist die am höchsten geschätzte Kunstform im Islam. Sie dient der kunstvollen Darstellung des Wortes Allahs aus dem Koran. Stile wie Kufi, Naskh und Thuluth schmücken Moscheen, Manuskripte und Alltagsgegenstände und verwandeln Text in visuelle Poesie.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic calligraphy",
            },
            {
                icon: Gem,
                title: "Geometrische Muster (Arabeske)",
                content: "Islamische Künstler schufen komplexe geometrische Muster, um die Unendlichkeit und die transzendente Natur Allahs darzustellen. Diese Muster, die auf mathematischen Prinzipien basieren, finden sich in Fliesenarbeiten, Holzschnitzereien und Metallarbeiten und symbolisieren die göttliche Ordnung im Universum.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic pattern",
            },
            {
                icon: LandPlot,
                title: "Architektur: Bauten für die Gemeinschaft",
                content: "Die islamische Architektur, von den majestätischen Moscheen mit ihren Kuppeln und Minaretten bis hin zu prächtigen Palästen und Gärten, ist darauf ausgelegt, ein Gefühl der Ehrfurcht und Gemeinschaft zu schaffen. Merkmale wie der Innenhof (Sahn) und die Gebetsnische (Mihrab) sind zentral für das funktionale und spirituelle Design.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic architecture",
            }
        ]
    },
    en: {
        title: "Islamic Art",
        description: "Discover the beauty and diversity of Islamic art forms, shaped by a deep faith and a rich history.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: PenTool,
                title: "Calligraphy: The Art of Beautiful Writing",
                content: "Calligraphy is the most highly regarded art form in Islam. It is used to artistically represent the word of Allah from the Quran. Styles like Kufi, Naskh, and Thuluth adorn mosques, manuscripts, and everyday objects, transforming text into visual poetry.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic calligraphy",
            },
            {
                icon: Gem,
                title: "Geometric Patterns (Arabesque)",
                content: "Islamic artists created complex geometric patterns to represent the infinite and transcendent nature of Allah. These patterns, based on mathematical principles, are found in tilework, woodcarvings, and metalwork, symbolizing the divine order in the universe.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic pattern",
            },
            {
                icon: LandPlot,
                title: "Architecture: Buildings for the Community",
                content: "Islamic architecture, from the majestic mosques with their domes and minarets to magnificent palaces and gardens, is designed to create a sense of awe and community. Features like the courtyard (Sahn) and the prayer niche (Mihrab) are central to the functional and spiritual design.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic architecture",
            }
        ]
    }
};

export default function IslamicArtPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

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
                    <Palette className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-4xl mx-auto space-y-12">
                {c.sections.map((section, index) => (
                    <Card key={index} className="overflow-hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                        <div className="p-6">
                            <CardHeader className="p-0">
                                <CardTitle className="flex items-center gap-3">
                                    <section.icon className="h-7 w-7 text-primary" />
                                    {section.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-4">
                                <p className="text-muted-foreground">{section.content}</p>
                            </CardContent>
                        </div>
                         <div className="h-64 md:h-full w-full">
                            <Image 
                                src={section.image} 
                                alt={section.title} 
                                width={600} 
                                height={400} 
                                className="w-full h-full object-cover"
                                data-ai-hint={section.hint}
                             />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
