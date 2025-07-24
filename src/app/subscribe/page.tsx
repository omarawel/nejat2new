
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Check, X } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSubscriptionPlans, type SubscriptionPlan } from '@/lib/subscriptions';
import { Loader2 } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';


const content = {
    de: {
        pageTitle: "Wähle deinen Plan",
        pageDescription: "Unterstütze die Weiterentwicklung von Nejat Digital und erhalte Zugang zu exklusiven KI-Funktionen und einer werbefreien Erfahrung.",
        backToFeatures: "Zurück zu den Funktionen",
        currentPlan: "Aktueller Plan",
        choosePlan: "Plan wählen",
        loading: "Lade Pläne...",
        loginToSubscribe: "Bitte melde dich an, um einen Plan zu wählen.",
        compareTitle: "Vergleiche die Pläne",
        compareFeature: "Feature",
        compareFree: "Kostenlos",
        compareSupporter: "Unterstützer",
        comparePro: "Pro",
        comparePatron: "Patron",
    },
    en: {
        pageTitle: "Choose Your Plan",
        pageDescription: "Support the continued development of Nejat Digital and get access to exclusive AI features and an ad-free experience.",
        backToFeatures: "Back to Features",
        currentPlan: "Current Plan",
        choosePlan: "Choose Plan",
        loading: "Loading plans...",
        loginToSubscribe: "Please log in to choose a plan.",
        compareTitle: "Compare Plans",
        compareFeature: "Feature",
        compareFree: "Free",
        compareSupporter: "Supporter",
        comparePro: "Pro",
        comparePatron: "Patron",
    }
}

const defaultPlans: Omit<SubscriptionPlan, 'id' | 'createdAt' >[] = [
    {
        name: "Supporter",
        price: "2,99€/Monat",
        priceId: "price_1PgK9qRx5XJz4yY5t0s5XJ8G",
        features: ["15 KI-Anfragen pro Monat", "Werbefreie Erfahrung", "Unterstütze die Entwicklung"],
        active: true,
        aiRequestLimit: 15
    },
    {
        name: "Pro",
        price: "4,99€/Monat",
        priceId: "price_1PgKAERx5XJz4yY5j8g5gK5f",
        features: ["30 KI-Anfragen pro Monat", "Alle Supporter-Vorteile", "Offline-Zugriff für Koran"],
        active: true,
        aiRequestLimit: 30
    },
    {
        name: "Patron",
        price: "9,99€/Monat",
        priceId: "price_1PgKARRx5XJz4yY5q5f8gS7a",
        features: ["75 KI-Anfragen pro Monat", "Alle Pro-Vorteile", "Früher Zugriff auf neue Features"],
        active: true,
        aiRequestLimit: 75
    }
]

const allFeatures = {
    de: [
        { feature: "Wissensseiten (Propheten, Sahaba etc.)", free: true, supporter: true, pro: true, patron: true },
        { feature: "Gebetszeiten & Qibla Kompass", free: true, supporter: true, pro: true, patron: true },
        { feature: "Dhikr, Dua & Tasbih Zähler", free: true, supporter: true, pro: true, patron: true },
        { feature: "KI-Anfragen / Monat", free: "3", supporter: "15", pro: "30", patron: "75" },
        { feature: "Werbefreie Erfahrung", free: false, supporter: true, pro: true, patron: true },
        { feature: "Entwicklung unterstützen", free: false, supporter: true, pro: true, patron: true },
        { feature: "Auswendiglernen-Tool", free: false, supporter: true, pro: true, patron: true },
        { feature: "Koran Offline-Zugriff", free: false, supporter: false, pro: true, patron: true },
        { feature: "Früher Zugriff auf neue Features", free: false, supporter: false, pro: false, patron: true },
    ],
    en: [
        { feature: "Knowledge Pages (Prophets, Sahaba etc.)", free: true, supporter: true, pro: true, patron: true },
        { feature: "Prayer Times & Qibla Compass", free: true, supporter: true, pro: true, patron: true },
        { feature: "Dhikr, Dua & Tasbih Counter", free: true, supporter: true, pro: true, patron: true },
        { feature: "AI Requests / Month", free: "3", supporter: "15", pro: "30", patron: "75" },
        { feature: "Ad-free Experience", free: false, supporter: true, pro: true, patron: true },
        { feature: "Support Development", free: false, supporter: true, pro: true, patron: true },
        { feature: "Memorization Tool", free: false, supporter: true, pro: true, patron: true },
        { feature: "Quran Offline Access", free: false, supporter: false, pro: true, patron: true },
        { feature: "Early Access to New Features", free: false, supporter: false, pro: false, patron: true },
    ]
}


export default function SubscribePage() {
  const { language } = useLanguage();
  const c = content[language];
  const featuresList = allFeatures[language];

  const [plans, setPlans] = useState<Omit<SubscriptionPlan, 'id' | 'createdAt' >[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, loadingAuth] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = getSubscriptionPlans((fetchedPlans) => {
        const activePlans = fetchedPlans.filter(p => p.active).sort((a,b) => a.createdAt.toMillis() - b.createdAt.toMillis());
        if (activePlans.length > 0) {
            setPlans(activePlans);
        } else {
            setPlans(defaultPlans);
        }
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-5xl mx-auto">
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
                <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map(plan => (
                         <Card key={plan.name} className="flex flex-col">
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

                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center mb-8">{c.compareTitle}</h2>
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40%] text-lg">{c.compareFeature}</TableHead>
                                    <TableHead className="text-center text-lg">{c.compareFree}</TableHead>
                                    <TableHead className="text-center text-lg">{c.compareSupporter}</TableHead>
                                    <TableHead className="text-center text-lg text-primary">{c.comparePro}</TableHead>
                                    <TableHead className="text-center text-lg">{c.comparePatron}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {featuresList.map((item, index) => (
                                    <TableRow key={index} className="hover:bg-muted/50">
                                        <TableCell className="font-semibold">{item.feature}</TableCell>
                                        <TableCell className="text-center">
                                            {typeof item.free === 'boolean' ? 
                                                item.free ? <Check className="mx-auto h-6 w-6 text-green-500" /> : <X className="mx-auto h-6 w-6 text-muted-foreground" />
                                                : <span className="font-bold">{item.free}</span>
                                            }
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {typeof item.supporter === 'boolean' ? 
                                                item.supporter ? <Check className="mx-auto h-6 w-6 text-green-500" /> : <X className="mx-auto h-6 w-6 text-muted-foreground" />
                                                : <span className="font-bold">{item.supporter}</span>
                                            }
                                        </TableCell>
                                        <TableCell className="text-center bg-primary/10">
                                            {typeof item.pro === 'boolean' ? 
                                                item.pro ? <Check className="mx-auto h-6 w-6 text-primary" /> : <X className="mx-auto h-6 w-6 text-muted-foreground" />
                                                : <span className="font-bold text-primary">{item.pro}</span>
                                            }
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {typeof item.patron === 'boolean' ? 
                                                item.patron ? <Check className="mx-auto h-6 w-6 text-green-500" /> : <X className="mx-auto h-6 w-6 text-muted-foreground" />
                                                : <span className="font-bold">{item.patron}</span>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
                </>
            )}
        </div>
    </div>
  );
}
