
'use client';

import React, { useEffect, useState } from 'react';
import { getSubscriptionPlans, SubscriptionPlan } from '@/lib/subscriptions';
import { useLanguage } from '@/components/language-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Check, Star, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const content = {
    de: {
        title: "Wähle deinen Plan",
        description: "Schalte mit Nejat Pro exklusive KI-Funktionen und eine werbefreie Erfahrung frei und unterstütze die Weiterentwicklung der App.",
        choosePlan: "Plan wählen",
        loadingPlans: "Pläne werden geladen...",
        errorLoading: "Fehler beim Laden der Pläne:",
        redirecting: "Leite weiter...",
        notAvailable: "Nicht verfügbar",
        errorRedirect: "Fehler bei der Weiterleitung zum Checkout.",
        feature: "Feature",
        free: "Kostenlos",
        supporter: "Unterstützer",
        pro: "Pro",
        patron: "Patron",
        compareTitle: "Vergleiche die Pläne",
        compareDescription: "Finde den perfekten Plan für deine Bedürfnisse.",
    },
    en: {
        title: "Choose Your Plan",
        description: "Unlock exclusive AI features and an ad-free experience with Nejat Pro, and support the app's continued development.",
        choosePlan: "Choose Plan",
        loadingPlans: "Loading plans...",
        errorLoading: "Error loading plans:",
        redirecting: "Redirecting...",
        notAvailable: "Not Available",
        errorRedirect: "Failed to redirect to checkout.",
        feature: "Feature",
        free: "Free",
        supporter: "Supporter",
        pro: "Pro",
        patron: "Patron",
        compareTitle: "Compare the Plans",
        compareDescription: "Find the perfect plan for your needs.",
    }
}

const features = [
    { key: 'quran_hadith_access', de: 'Vollständiger Koran & Hadith-Zugriff', en: 'Full Quran & Hadith Access' },
    { key: 'qibla_prayer_times', de: 'Qibla-Kompass & Gebetszeiten', en: 'Qibla Compass & Prayer Times' },
    { key: 'islamic_knowledge', de: 'Islamische Wissensbibliothek', en: 'Islamic Knowledge Library' },
    { key: 'basic_tools', de: 'Grundlegende Tools (Tasbih, Tracker)', en: 'Basic Tools (Tasbih, Trackers)' },
    { key: 'ai_requests', de: 'KI-Anfragen / Monat', en: 'AI Requests / Month' },
    { key: 'support_dev', de: 'Entwicklung unterstützen', en: 'Support Development' },
    { key: 'memorization_tool', de: 'auswendiglernen begrenzt', en: 'Memorization Tool' },
    { key: 'ad_free', de: 'Werbefreie Erfahrung', en: 'Ad-free Experience' },
    { key: 'quran_offline', de: 'Koran Offline-Zugriff', en: 'Quran Offline Access' },
    { key: 'early_access', de: 'Früher Zugriff auf neue Features', en: 'Early Access to new Features' },
];

const planFeatures: Record<string, Record<string, any>> = {
    free: {
        quran_hadith_access: true,
        qibla_prayer_times: true,
        islamic_knowledge: true,
        basic_tools: true,
        ai_requests: 3,
        support_dev: false,
        memorization_tool: false,
        ad_free: false,
        quran_offline: false,
        early_access: false,
    },
    supporter: {
        quran_hadith_access: true,
        qibla_prayer_times: true,
        islamic_knowledge: true,
        basic_tools: true,
        ai_requests: 15,
        support_dev: true,
        memorization_tool: false,
        ad_free: false,
        quran_offline: false,
        early_access: false,
    },
    pro: {
        quran_hadith_access: true,
        qibla_prayer_times: true,
        islamic_knowledge: true,
        basic_tools: true,
        ai_requests: 30,
        support_dev: true,
        memorization_tool: true,
        ad_free: true,
        quran_offline: true,
        early_access: false,
    },
    patron: {
        quran_hadith_access: true,
        qibla_prayer_times: true,
        islamic_knowledge: true,
        basic_tools: true,
        ai_requests: 75,
        support_dev: true,
        memorization_tool: true,
        ad_free: true,
        quran_offline: true,
        early_access: true,
    }
};

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

    const handleSubscribe = (planId: string) => {
        if (!user) {
            router.push('/login?redirect=/subscribe');
            return;
        }
        
        const selectedPlan = subscriptionPlans.find(p => p.id.toLowerCase() === planId.toLowerCase());

        if (!selectedPlan || !selectedPlan.stripeLink) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Payment link is not available for this plan yet.'
            });
            return;
        }

        setLoadingRedirect(planId);
        window.location.href = selectedPlan.stripeLink;
    };


    if (loadingPlans && subscriptionPlans.length === 0) {
        return <div className="container mx-auto py-8 text-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (error) {
        return <div className="container mx-auto py-8 text-center text-destructive">{c.errorLoading} {error}</div>;
    }

    const plansInOrder = ['free', 'supporter', 'pro', 'patron'];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto text-center">
                 <h1 className="text-3xl md:text-4xl font-bold mb-4">{c.title}</h1>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                    {c.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {subscriptionPlans.map((plan) => (
                        <Card key={plan.id} className={cn("flex flex-col", plan.id === 'pro' && "border-primary border-2 shadow-lg")}>
                            <CardHeader>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription className="text-4xl font-bold text-primary">{plan.price}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-2 text-left">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-start gap-2">
                                            <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => handleSubscribe(plan.id)}
                                    className="w-full"
                                    variant={plan.id === 'pro' ? 'default' : 'outline'}
                                    disabled={!!loadingRedirect}
                                >
                                    {loadingRedirect === plan.id ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                       <Star className="mr-2 h-4 w-4" />
                                    )}
                                    {c.choosePlan}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>


                <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.compareTitle}</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {c.compareDescription}
                </p>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/3 text-base text-left">{c.feature}</TableHead>
                                    {plansInOrder.map(planKey => (
                                         <TableHead key={planKey} className={cn("text-center text-base", planKey === 'pro' && 'text-primary')}>
                                            {c[planKey as keyof typeof c]}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {features.map(feature => (
                                    <TableRow key={feature.key}>
                                        <TableCell className="font-medium text-left">{feature[language]}</TableCell>
                                        {plansInOrder.map(planKey => (
                                            <TableCell key={`${feature.key}-${planKey}`} className={cn("text-center", planKey === 'pro' && 'bg-primary/5')}>
                                                {typeof planFeatures[planKey][feature.key] === 'boolean' ? (
                                                     planFeatures[planKey][feature.key] ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                ) : (
                                                    <span className="font-semibold">{planFeatures[planKey][feature.key]}</span>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell></TableCell>
                                     {plansInOrder.map(planKey => (
                                        <TableCell key={`btn-${planKey}`} className={cn("text-center p-4", planKey === 'pro' && 'bg-primary/5')}>
                                           {planKey !== 'free' && (
                                               <Button
                                                    onClick={() => handleSubscribe(planKey)}
                                                    className="w-full"
                                                    variant={planKey === 'pro' ? 'default' : 'outline'}
                                                    disabled={!!loadingRedirect}
                                                >
                                                    {loadingRedirect === planKey ? (
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    ) : (
                                                       <Star className="mr-2 h-4 w-4" />
                                                    )}
                                                    {c.choosePlan}
                                                </Button>
                                           )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SubscribePage;
