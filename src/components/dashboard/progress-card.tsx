
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface ProgressCardProps {
    title: string;
    progress?: {
        [key: string]: any;
    };
    href: string;
    icon: React.ElementType;
}

const content = {
    de: {
        continueReading: "Weiterlesen",
        startReading: "Jetzt anfangen",
    },
    en: {
        continueReading: "Continue Reading",
        startReading: "Start Now",
    }
}

export function ProgressCard({ title, progress, href, icon: Icon }: ProgressCardProps) {
    const { language } = useLanguage();
    const c = content[language];

    const getProgressText = () => {
        if (!progress) return null;
        if (progress.surahName) return `${progress.surahName} (Nr. ${progress.surah})`;
        if (progress.collection) return `${progress.collection}, Nr. ${progress.hadithNumber}`;
        if (progress.chapterTitle) return `${progress.chapterTitle}`;
        return null;
    }

    const progressText = getProgressText();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Icon /> {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {progressText ? (
                    <p className="text-muted-foreground">
                       {progressText}
                    </p>
                ) : (
                    <p className="text-muted-foreground">Kein Fortschritt aufgezeichnet.</p>
                )}
            </CardContent>
            <CardFooter>
                 <Button variant="ghost" asChild>
                    <Link href={href}>{progressText ? c.continueReading : c.startReading} <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
