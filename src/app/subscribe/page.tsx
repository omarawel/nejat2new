
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSubscriptionPlans, type SubscriptionPlan } from '@/lib/subscriptions';
import { Loader2 } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';


const content = {
    de: {
        pageTitle: "Wähle deinen Plan",
        pageDescription: "Unterstütze die Weiterentwicklung von Nejat Digital und erhalte Zugang zu exklusiven KI-Funktionen und einer werbefreien Erfahrung.",
        backToFeatures: "Zurück zu den Funktionen",
        currentPlan: "Aktueller Plan",
        choosePlan: "Plan wählen",
        loading: "Lade Pläne...",
        loginToSubscribe: "Bitte melde dich an, um einen Plan zu wählen.",
    },
    en: {
        pageTitle: "Choose Your Plan",
        pageDescription: "Support the continued development of Nejat Digital and get access to exclusive AI features and an ad-free experience.",
        backToFeatures: "Back to Features",
        currentPlan: "Current Plan",
        choosePlan: "Choose Plan",
        loading: "Loading plans...",
        loginToSubscribe: "Please log in to choose a plan.",
    }
}

export default function SubscribePage() {
  const { language } = useLanguage();
  const c = content[language];
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, loadingAuth] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = getSubscriptionPlans((fetchedPlans) => {
        setPlans(fetchedPlans.filter(p => p.active).sort((a,b) => a.createdAt.toMillis() - b.createdAt.toMillis()));
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.pageTitle}</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.pageDescription}</p>
            </header>
            
            {loading || loadingAuth ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map(plan => (
                         <Card key={plan.id} className="flex flex-col">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl text-primary">{plan.name}</CardTitle>
                                <CardDescription className="text-4xl font-bold">{plan.price}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <div className="p-6">
                                <Button asChild className="w-full" disabled={!user}>
                                    <Link href={`/checkout?plan=${plan.name.toLowerCase()}&priceId=${plan.priceId}`}>{c.choosePlan}</Link>
                                </Button>
                                 {!user && <p className="text-xs text-center mt-2 text-muted-foreground">{c.loginToSubscribe}</p>}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}
