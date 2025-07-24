
'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { getSubscriptionPlans, SubscriptionPlan } from '@/lib/subscriptions';
import { useLanguage } from '@/components/language-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createPaymentIntent } from '../checkout/actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const content = {
    de: {
        title: "Wähle deinen Plan",
        description: "Unterstütze die Weiterentwicklung von Nejat Digital und erhalte Zugang zu exklusiven KI-Funktionen und einer werbefreien Erfahrung.",
        choosePlan: "Plan wählen",
        loadingPlans: "Pläne werden geladen...",
        errorLoading: "Fehler beim Laden der Pläne:",
        redirecting: "Leite weiter...",
        notAvailable: "Nicht verfügbar",
        errorRedirect: "Fehler bei der Weiterleitung zum Checkout."
    },
    en: {
        title: "Choose Your Plan",
        description: "Support the continued development of Nejat Digital and get access to exclusive AI features and an ad-free experience.",
        choosePlan: "Choose Plan",
        loadingPlans: "Loading plans...",
        errorLoading: "Error loading plans:",
        redirecting: "Redirecting...",
        notAvailable: "Not Available",
        errorRedirect: "Failed to redirect to checkout."
    }
}

const SubscribePage: React.FC = () => {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const router = useRouter();

    const [user] = useAuthState(auth);
    const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [loadingRedirect, setLoadingRedirect] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = getSubscriptionPlans((plans) => {
            setSubscriptionPlans(plans.filter(p => p.active).sort((a,b) => a.aiRequestLimit - b.aiRequestLimit));
            setLoadingPlans(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubscribe = async (plan: SubscriptionPlan) => {
        if (!user) {
            router.push('/login?redirect=/subscribe');
            return;
        }
        setLoadingRedirect(plan.priceId);

        try {
            const planKey = Object.entries(c.plans || {}).find(([_, p]) => p.name === plan.name)?.[0];
            router.push(`/checkout?plan=${planKey}&priceId=${plan.priceId}`);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: c.errorRedirect
            });
            console.error(error);
            setLoadingRedirect(null);
        }
    };


    if (loadingPlans && subscriptionPlans.length === 0) {
        return <div className="container mx-auto py-8 text-center">{c.loadingPlans}</div>;
    }

    if (error) {
        return <div className="container mx-auto py-8 text-center text-destructive">{c.errorLoading} {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{c.title}</h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {c.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {subscriptionPlans.map((plan, index) => (
                        <Card key={plan.id} className={cn("flex flex-col", { 'border-primary shadow-lg': index === 1 })}>
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">{plan.name}</CardTitle>
                                <CardDescription className="text-3xl font-bold">{plan.price}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start text-muted-foreground">
                                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => handleSubscribe(plan)}
                                    className="w-full"
                                    disabled={!plan.active || !!loadingRedirect}
                                >
                                    {loadingRedirect === plan.priceId ? c.redirecting : c.choosePlan}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscribePage;
