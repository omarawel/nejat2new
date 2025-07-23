
"use client"

import { Suspense } from 'react';
import StripeCheckoutWrapper from '@/components/stripe-checkout-wrapper';
import { useLanguage } from '@/components/language-provider';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Kasse",
        description: "Schließe dein Abonnement ab.",
        loading: "Plan wird geladen...",
        plan: "Plan",
        price: "Preis",
        back: "Zurück zu den Plänen",
        plans: {
            supporter: { name: "Unterstützer", price: "2,99€/Monat" },
            pro: { name: "Pro", price: "4,99€/Monat" },
            patron: { name: "Patron", price: "9,99€/Monat" }
        },
        invalidPlan: "Ungültiger Plan ausgewählt."
    },
    en: {
        title: "Checkout",
        description: "Complete your subscription.",
        loading: "Loading plan...",
        plan: "Plan",
        price: "Price",
        back: "Back to Plans",
        plans: {
            supporter: { name: "Supporter", price: "€2.99/month" },
            pro: { name: "Pro", price: "€4.99/month" },
            patron: { name: "Patron", price: "€9.99/month" }
        },
        invalidPlan: "Invalid plan selected."
    }
}

function CheckoutPageContent() {
    const { language } = useLanguage();
    const c = content[language];
    const searchParams = useSearchParams();
    const planKey = searchParams.get('plan') as keyof typeof c.plans | null;
    const priceId = searchParams.get('priceId');

    if (!planKey || !c.plans[planKey] || !priceId) {
        return (
            <div className="text-center">
                <p className="text-destructive mb-4">{c.invalidPlan}</p>
                <Button variant="outline" asChild>
                    <Link href="/subscribe">{c.back}</Link>
                </Button>
            </div>
        );
    }
    
    const selectedPlan = c.plans[planKey];

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6 p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">{c.plan}: {selectedPlan.name}</span>
                        <span className="font-bold text-primary">{selectedPlan.price}</span>
                    </div>
                </div>
                <StripeCheckoutWrapper priceId={priceId} />
            </CardContent>
        </Card>
    );
}


export default function CheckoutPage() {
    return (
        <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
            <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-primary" />}>
                <CheckoutPageContent />
            </Suspense>
        </div>
    );
}
