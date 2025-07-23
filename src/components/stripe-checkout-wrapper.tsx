
"use client"

import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useEffect, FormEvent } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createPaymentIntent } from '@/app/checkout/actions';
import { useLanguage } from './language-provider';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const content = {
    de: {
        submit: "Sicher bezahlen",
        submitting: "Wird verarbeitet...",
        errorTitle: "Zahlung fehlgeschlagen",
        errorMessage: "Ein unerwarteter Fehler ist aufgetreten.",
        successTitle: "Zahlung erfolgreich!",
        successMessage: "Vielen Dank für deine Unterstützung!",
        formNotReady: "Zahlungsformular ist noch nicht bereit.",
    },
    en: {
        submit: "Pay Securely",
        submitting: "Processing...",
        errorTitle: "Payment failed",
        errorMessage: "An unexpected error occurred.",
        successTitle: "Payment Successful!",
        successMessage: "Thank you for your support!",
        formNotReady: "Payment form is not ready yet.",
    }
};

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast();
    const { language } = useLanguage();
    const c = content[language];

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            toast({ variant: 'destructive', title: c.errorTitle, description: c.formNotReady });
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // TODO: Update this URL to your actual post-payment success page
                return_url: `${window.location.origin}/`,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || c.errorMessage);
        } else {
            setMessage(c.errorMessage);
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Button disabled={isLoading || !stripe || !elements} id="submit" className="w-full mt-6">
                <span id="button-text">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {c.submitting}
                        </>
                    ) : (
                        c.submit
                    )}
                </span>
            </Button>
            {message && <div id="payment-message" className="text-destructive text-sm mt-2">{message}</div>}
        </form>
    );
}


export default function StripeCheckoutWrapper({ priceId }: { priceId: string }) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if (priceId) {
            createPaymentIntent({ priceId })
                .then(data => {
                    if (data.clientSecret) {
                        setClientSecret(data.clientSecret)
                    }
                });
        }
    }, [priceId]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    if (!clientSecret) {
        return <div className="flex justify-center items-center h-24"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}
