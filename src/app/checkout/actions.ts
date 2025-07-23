
'use server';

import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables.
// Ensure this is NOT exposed to the client side.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface PaymentIntentResult {
    clientSecret?: string;
    error?: string;
}

// A map to associate your plan keys with Stripe Price IDs and amounts in cents
const priceMap: { [key: string]: { id: string, amount: number } } = {
    supporter: { id: 'price_1RltQWGXWEMb96gVAEDYSZay', amount: 299 },
    pro: { id: 'price_1RmJ3rGXWEMb96gVBYrwf9DD', amount: 499 },
    patron: { id: 'price_1RltR4GXWEMb96gVOcjACqRR', amount: 999 },
};

// This function now creates a real PaymentIntent on the server.
export async function createPaymentIntent(
    { priceId }: { priceId: string }
): Promise<PaymentIntentResult> {
    
    let amount: number | undefined;
    for (const plan in priceMap) {
        if (priceMap[plan as keyof typeof priceMap].id === priceId) {
            amount = priceMap[plan as keyof typeof priceMap].amount;
            break;
        }
    }

    if (amount === undefined) {
        return { error: 'Invalid price ID provided.' };
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'eur',
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
