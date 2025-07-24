
"use client"

import React, { useEffect, useState } from 'react';
import { getSubscriptionPlans, type SubscriptionPlan } from '@/lib/subscriptions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const content = {
    de: {
        title: "Wähle deinen Plan",
        description: "Unterstütze die Weiterentwicklung von Nejat Digital und erhalte Zugang zu exklusiven KI-Funktionen und einer werbefreien Erfahrung.",
        backToFeatures: "Zurück zu den Funktionen",
        choosePlan: "Plan wählen",
        loading: "Pläne werden geladen...",
        error: "Fehler beim Laden der Pläne. Bitte versuche es später erneut.",
        currentPlan: "Aktueller Plan"
    },
    en: {
        title: "Choose Your Plan",
        description: "Support the continued development of Nejat Digital and get access to exclusive AI features and an ad-free experience.",
        backToFeatures: "Back to Features",
        choosePlan: "Choose Plan",
        loading: "Loading plans...",
        error: "Error loading plans. Please try again later.",
        currentPlan: "Current Plan"
    }
}

export default function SubscribePage() {
    const { language } = useLanguage();
    const c = content[language];
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = getSubscriptionPlans((fetchedPlans) => {
            setPlans(fetchedPlans.filter(p => p.active).sort((a,b) => a.price.localeCompare(b.price, undefined, {numeric: true})));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto py-8 text-center flex-grow flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }
     if (error) {
        return <div className="container mx-auto py-8 text-center text-red-500">{c.error}</div>;
    }


    return (
        <div className="container mx-auto px-4 py-8 flex-grow">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plans.map((plan, index) => (
                    <Card key={plan.id} className={cn("flex flex-col", index === 1 && "border-primary shadow-lg")}>
                        <CardHeader>
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription className="text-4xl font-bold text-primary">{plan.price}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                             <Button asChild className="w-full" size="lg">
                                <Link href={`/checkout?plan=${plan.name.toLowerCase()}&priceId=${plan.priceId}`}>
                                    {c.choosePlan}
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};
