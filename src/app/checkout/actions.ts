
'use server';

import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables.
// Ensure this is NOT exposed to the client side.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface PaymentIntentResult {
    clientSecret?: string;
    error?: string;
}

// This function now creates a real PaymentIntent on the server.
export async function createPaymentIntent(
    { priceId }: { priceId: string }
): Promise<PaymentIntentResult> {
    
    if (!priceId) {
        return { error: 'Price ID is required.' };
    }

    try {
        // Retrieve the price details from Stripe to get the amount
        const price = await stripe.prices.retrieve(priceId);

        if (!price || price.unit_amount === null) {
            return { error: 'Invalid price ID or price has no amount.' };
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: price.unit_amount,
            currency: price.currency,
            automatic_payment_methods: {
              enabled: true,
            },
        });
      
        return { clientSecret: paymentIntent.client_secret ?? undefined };

    } catch (e: unknown) {
        const error = e as Error;
        console.error("Stripe Error:", error.message);
        return { error: error.message };
    }
}
