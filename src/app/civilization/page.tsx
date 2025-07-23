
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const content = {
    de: {
        pageTitle: "Islamische Zivilisation",
        pageDescription: "Entdecke die reichen Beiträge der islamischen Zivilisation zu Wissenschaft, Kunst und Kultur.",
        backToFeatures: "Zurück zu den Funktionen",
        comingSoon: "Funktion in Entwicklung",
        infoText: "Diese Funktion befindet sich derzeit in der Entwicklung. Bald wirst du hier eine interaktive Zeitachse und Artikel über das Goldene Zeitalter des Islam, berühmte Gelehrte wie Ibn Sina und Al-Khwarizmi und die Auswirkungen auf die moderne Welt finden.",
        explore: "Entdecken"
    },
    en: {
        pageTitle: "Islamic Civilization",
        pageDescription: "Discover the rich contributions of Islamic civilization to science, art, and culture.",
        backToFeatures: "Back to Features",
        comingSoon: "Feature in Development",
        infoText: "This feature is currently under development. Soon you will find an interactive timeline and articles here about the Golden Age of Islam, famous scholars like Ibn Sina and Al-Khwarizmi, and the impact on the modern world.",
        explore: "Explore"
    }
}


export default function CivilizationPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <Card className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <Building2 className="h-12 w-12 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                    <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>{c.comingSoon}</AlertTitle>
                        <AlertDescription>
                            {c.infoText}
                        </AlertDescription>
                    </Alert>
                    <Button disabled>{c.explore}</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
