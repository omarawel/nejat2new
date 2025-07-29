
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wand2, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { checkAndDecrementQuota, canAccessFeature, getUserQuota, UserQuota } from '@/lib/user-usage';
import { UpgradeInlineAlert } from '@/components/upgrade-inline-alert';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const content = {
    de: {
        pageTitle: "KI Vers-Finder",
        pageDescription: "Finde Koranverse, indem du ihre Bedeutung beschreibst oder ein Stichwort eingibst.",
        backToFeatures: "Zurück zu den Funktionen",
        searchPlaceholder: "Beschreibe einen Vers oder ein Thema...\nz.B. 'Der Vers über Geduld bei einem Schicksalsschlag' oder 'Verse über die Erschaffung des Menschen'",
        findVerse: "Verse finden",
        findingVerse: "Verse werden gesucht...",
        resultsTitle: "Gefundene Verse",
        resultsPlaceholder: "Die von der KI gefundenen Verse und ihre Erklärungen werden hier angezeigt.",
        errorFinding: "Fehler beim Finden der Verse. Bitte versuche es erneut.",
        proFeature: "Diese Funktion ist für Pro-Abonnenten verfügbar.",
        upgradeButton: "Jetzt upgraden",
        loginRequired: "Anmeldung erforderlich",
        loginToUse: "Bitte melde dich an, um diese Funktion zu nutzen."
    },
    en: {
        pageTitle: "AI Verse Finder",
        pageDescription: "Find Quranic verses by describing their meaning or entering a keyword.",
        backToFeatures: "Back to Features",
        searchPlaceholder: "Describe a verse or topic...\ne.g., 'The verse about patience during hardship' or 'verses about the creation of man'",
        findVerse: "Find Verses",
        findingVerse: "Finding verses...",
        resultsTitle: "Found Verses",
        resultsPlaceholder: "The verses and explanations found by the AI will be displayed here.",
        errorFinding: "Error finding verses. Please try again.",
        proFeature: "This feature is available for Pro subscribers.",
        upgradeButton: "Upgrade Now",
        loginRequired: "Login Required",
        loginToUse: "Please log in to use this feature."
    }
}


export default function VerseFinderPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  const [user, authLoading] = useAuthState(auth);
  const [hasAccess, setHasAccess] = useState(false);
  const [loadingAccess, setLoadingAccess] = useState(true);
  const [quota, setQuota] = useState<UserQuota | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [results, setResults] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
        canAccessFeature(user?.uid || null, 'verse_finder').then(access => {
            setHasAccess(access);
            setLoadingAccess(false);
        });
        getUserQuota(user?.uid || null).then(setQuota);
    }
  }, [user, authLoading]);

  const handleFindVerse = async () => {
    if (!description.trim()) return;
    setIsLoading(true);
    setError(null);
    setResults(null);
    
    const quotaResult = await checkAndDecrementQuota(user?.uid || null);
    if (!quotaResult.success) {
        setQuota(quotaResult.quota);
        setIsLoading(false);
        return;
    }
    setQuota(quotaResult.quota);

    // Placeholder for actual AI call
    setTimeout(() => {
        // In a real app, you would set the results from the AI here.
        // For now, we'll just simulate the end of loading.
        setIsLoading(false);
    }, 2000);
  }

  const canSubmit = quota ? quota.remaining > 0 : true;

   const renderContent = () => {
        if (authLoading || loadingAccess) {
            return (
                <div className="flex-grow flex items-center justify-center mt-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            )
        }

        if (!user) {
            return (
                 <Card className="max-w-md text-center mx-auto mt-12">
                    <CardHeader><CardTitle>{c.loginRequired}</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{c.loginToUse}</p>
                        <Button asChild><Link href="/login">{c.backToFeatures}</Link></Button>
                    </CardContent>
                </Card>
            )
        }

        if (!hasAccess) {
            return (
                <Card className="max-w-md text-center mx-auto mt-12">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2"><Sparkles className="text-primary"/>{c.proFeature}</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">{c.proFeature}</p>
                         <Button asChild><Link href="/subscribe">{c.upgradeButton}</Link></Button>
                    </CardContent>
                </Card>
            )
        }

        return (
            <>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                        <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea 
                            placeholder={c.searchPlaceholder}
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                        />
                        <UpgradeInlineAlert quota={quota} isLoggedIn={!!user} />
                        <Button className="w-full" disabled={isLoading || !description.trim() || !canSubmit} onClick={handleFindVerse}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {c.findingVerse}
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    {c.findVerse}
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                 {(isLoading || results || error) && (
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>{c.resultsTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading && (
                                <div className="flex items-center justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            )}
                            {error && (
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            {results ? (
                                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                                    {results}
                                </div>
                            ) : !isLoading && !error && (
                                <div className="p-4 text-center border-2 border-dashed rounded-lg text-muted-foreground">
                                    {c.resultsPlaceholder}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </>
        )
   }


  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="w-full max-w-2xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            {renderContent()}
        </div>
    </div>
  );
}
