
"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Target, ClipboardList, Wand2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { checkAndDecrementQuota, getUserQuota, UserQuota } from '@/lib/user-usage';
import { UpgradeInlineAlert } from '@/components/upgrade-inline-alert';


const content = {
    de: {
        pageTitle: "KI-Lernpfad-Generator",
        pageDescription: "Erhalte einen personalisierten Lernplan, der auf deine Ziele und dein Wissen zugeschnitten ist.",
        backToFeatures: "Zurück zu den Funktionen",
        formTitle: "Erstelle deinen persönlichen Lernpfad",
        levelLabel: "Mein aktuelles Wissenslevel",
        levelPlaceholder: "z.B. Anfänger, Konvertit, Fortgeschritten",
        goalsLabel: "Meine Lernziele",
        goalsPlaceholder: "z.B. Ich möchte das Gebet lernen, die Geschichte der Propheten verstehen, mein Wissen über Fiqh vertiefen...",
        generateButton: "Meinen Lernpfad erstellen",
        generatingButton: "Wird erstellt...",
        resultTitle: "Dein personalisierter Lernpfad",
        resultDescription: "Die KI hat basierend auf deinen Eingaben den folgenden Lernpfad erstellt:",
        step: "Schritt"
    },
    en: {
        pageTitle: "AI Learning Path Generator",
        pageDescription: "Get a personalized learning plan tailored to your goals and knowledge.",
        backToFeatures: "Back to Features",
        formTitle: "Create Your Personal Learning Path",
        levelLabel: "My Current Knowledge Level",
        levelPlaceholder: "e.g., Beginner, Revert, Advanced",
        goalsLabel: "My Learning Goals",
        goalsPlaceholder: "e.g., I want to learn the prayer, understand the stories of the prophets, deepen my knowledge of Fiqh...",
        generateButton: "Create My Learning Path",
        generatingButton: "Generating...",
        resultTitle: "Your Personalized Learning Path",
        resultDescription: "Based on your input, the AI has created the following learning path:",
        step: "Step"
    }
}


export default function LearningPathPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  const [user, authLoading] = useAuthState(auth);
  const [quota, setQuota] = useState<UserQuota | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
        getUserQuota(user?.uid || null).then(setQuota);
    }
  }, [user, authLoading]);
  
  const canSubmit = quota ? quota.remaining > 0 : true;

  const handleGenerate = async () => {
      setIsLoading(true);
      const quotaResult = await checkAndDecrementQuota(user?.uid || null);
       if (!quotaResult.success) {
            setQuota(quotaResult.quota);
            setIsLoading(false);
            return;
        }
      setQuota(quotaResult.quota);
      // AI generation logic would go here
      setTimeout(() => setIsLoading(false), 2000); // Simulate AI call
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
             <h1 className="text-4xl font-bold tracking-tight text-primary">
                {c.pageTitle}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.pageDescription}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>{c.formTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <label htmlFor="level" className="flex items-center gap-2 font-medium"><User /> {c.levelLabel}</label>
                        <Input id="level" placeholder={c.levelPlaceholder} />
                    </div>
                     <div className="space-y-2">
                        <label htmlFor="goals" className="flex items-center gap-2 font-medium"><Target /> {c.goalsLabel}</label>
                        <Textarea id="goals" placeholder={c.goalsPlaceholder} rows={5} />
                    </div>
                    <UpgradeInlineAlert quota={quota} isLoggedIn={!!user} />
                </CardContent>
                <CardFooter>
                     <Button className="w-full" disabled={isLoading || !canSubmit} onClick={handleGenerate}>
                        {isLoading ? (
                           <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {c.generatingButton}
                           </>
                        ) : (
                           <>
                             <Wand2 className="mr-2 h-4 w-4" />
                             {c.generateButton}
                           </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <Card className="bg-muted/30">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ClipboardList /> {c.resultTitle}</CardTitle>
                    <CardDescription>{c.resultDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                        </div>
                    ) : (
                        <p className="text-sm text-center text-muted-foreground">Die Ergebnisse der KI werden hier angezeigt.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
