
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Palette, PenTool, Gem, LandPlot, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPageContent } from '@/lib/content';
import { Skeleton } from '@/components/ui/skeleton';

// Define the structure of the content for type safety
interface Section {
    key: string;
    title: string;
    content: string;
    image: string;
    hint: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface PageContent {
    title: string;
    description: string;
    sections: Omit<Section, 'icon'>[];
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    calligraphy: PenTool,
    geometry: Gem,
    architecture: LandPlot
};


export default function IslamicArtPage() {
    const { language } = useLanguage();
    const [content, setContent] = useState<PageContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            const pageContent = await getPageContent('islamic-art', language);
            setContent(pageContent);
            setLoading(false);
        };
        fetchContent();
    }, [language]);
    
    if (loading) {
        return (
             <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-8 w-32 mb-8" />
                <header className="text-center mb-12">
                    <Skeleton className="h-10 w-10 mx-auto rounded-full" />
                    <Skeleton className="h-10 w-3/4 mx-auto mt-4" />
                    <Skeleton className="h-6 w-full max-w-3xl mx-auto mt-4" />
                </header>
                 <div className="max-w-4xl mx-auto space-y-12">
                    {[...Array(3)].map((_, i) => (
                         <Card key={i} className="overflow-hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                            <div className="p-6 space-y-4">
                               <Skeleton className="h-7 w-48" />
                               <Skeleton className="h-20 w-full" />
                            </div>
                            <Skeleton className="h-64 md:h-full w-full" />
                        </Card>
                    ))}
                 </div>
             </div>
        )
    }

    if (!content) {
        return <div className="container mx-auto p-8 text-center">Failed to load content.</div>;
    }

    const sectionsWithIcons: Section[] = content.sections.map(section => ({
        ...section,
        icon: iconMap[section.key] || Palette
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {language === 'de' ? 'Zurück zu den Funktionen' : 'Back to Features'}
                </Link>
            </Button>
            <header className="text-center mb-12">
                 <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Palette className="h-10 w-10" />
                    {content.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{content.description}</p>
            </header>
            
            <div className="max-w-4xl mx-auto space-y-12">
                {sectionsWithIcons.map((section, index) => {
                    const Icon = section.icon;
                    return (
                         <Card key={index} className="overflow-hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                            <div className="p-6">
                                <CardHeader className="p-0">
                                    <CardTitle className="flex items-center gap-3">
                                        <Icon className="h-7 w-7 text-primary" />
                                        {section.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 mt-4">
                                    <p className="text-muted-foreground">{section.content}</p>
                                </CardContent>
                            </div>
                            <div className="h-64 md:h-full w-full relative">
                                <Image 
                                    src={section.image} 
                                    alt={section.title} 
                                    fill
                                    className="object-cover"
                                    data-ai-hint={section.hint}
                                />
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
