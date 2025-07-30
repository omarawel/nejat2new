
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { LastReadProgress } from "@/lib/progress";
import { Favorite } from "@/lib/favorites";
import { HatimGroup } from "@/lib/hatim";
import { Progress } from "../ui/progress";

interface ProgressCardProps {
    title: string;
    progress?: LastReadProgress[keyof LastReadProgress];
    favorites?: Favorite[];
    hatimGroups?: HatimGroup[];
    href: string;
    icon: React.ElementType;
}

const content = {
    de: {
        continueReading: "Weiterlesen",
        startReading: "Jetzt anfangen",
        noFavorites: "Keine Favoriten gespeichert.",
        viewAll: "Alle ansehen",
        noHatim: "Du nimmst an keinem Hatim teil.",
        noProgress: "Kein Fortschritt aufgezeichnet.",
        view: "Ansehen"
    },
    en: {
        continueReading: "Continue Reading",
        startReading: "Start Now",
        noFavorites: "No favorites saved.",
        viewAll: "View All",
        noHatim: "You are not participating in any Hatim.",
        noProgress: "No progress recorded.",
        view: "View"
    }
}

export function ProgressCard({ title, progress, favorites, hatimGroups, href, icon: Icon }: ProgressCardProps) {
    const { language } = useLanguage();
    const c = content[language];

    const getProgressText = () => {
        if (!progress) return null;
        if (progress.surahName) return `${progress.surahName} (${progress.surah})`;
        if (progress.hadithNumber) return `Hadith Nr. ${progress.hadithNumber}`;
        if (progress.chapterTitle) return `${progress.chapterTitle}`;
        return null;
    }

    const renderContent = () => {
        if (progress) {
            const text = getProgressText();
            return <p className="text-muted-foreground truncate">{text || c.noProgress}</p>;
        }
        if (favorites) {
            return favorites.length > 0 ? (
                <ul className="space-y-2">
                    {favorites.map(fav => (
                        <li key={fav.id} className="p-2 border rounded-md bg-muted/50 text-sm text-muted-foreground truncate">
                            {fav.text}
                        </li>
                    ))}
                </ul>
            ) : <p className="text-muted-foreground">{c.noFavorites}</p>;
        }
         if (hatimGroups) {
            return hatimGroups.length > 0 ? (
                <ul className="space-y-3">
                    {hatimGroups.map(group => {
                        const completed = group.juzs.filter(j => j.assignedTo).length;
                        const progressValue = (completed / 30) * 100;
                        return (
                            <li key={group.id}>
                                <p className="font-semibold truncate text-sm">{group.title}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Progress value={progressValue} className="w-full h-2" />
                                    <span>{completed}/30</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            ) : <p className="text-muted-foreground">{c.noHatim}</p>;
        }
        return <p className="text-muted-foreground">{c.noProgress}</p>;
    }
    
    const hasContent = progress || (favorites && favorites.length > 0) || (hatimGroups && hatimGroups.length > 0);

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5"/> {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                {renderContent()}
            </CardContent>
            <CardFooter>
                 <Button variant="ghost" asChild className="ml-auto">
                    <Link href={href}>
                        {hasContent ? c.viewAll : c.startReading}
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
