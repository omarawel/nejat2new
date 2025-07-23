
'use server';

import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables.
// Ensure this is NOT exposed to the client side.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface PaymentIntentResult {
    clientSecret?: string;
    error?: string;
}

// A map to associate your plan keys with Stripe Price IDs
// This should ideally be managed in a database or a secure config file.
const priceMap: { [key: string]: string } = {
    supporter: 'price_1RltQWGXWEMb96gVAEDYSZay',
    pro: 'price_1RmJ3rGXWEMb96gVBYrwf9DD',
    patron: 'price_1RltR4GXWEMb96gVOcjACqRR',
};

// This function now creates a real PaymentIntent on the server.
export async function createPaymentIntent(
    { priceId }: { priceId: string }
): Promise<PaymentIntentResult> {
    
    // Find the corresponding price amount from your price map.
    // In a real subscription model, you might fetch price details from Stripe.
    // For this example, we'll set a placeholder amount. You should adjust this
    // to fetch the real amount for the given priceId from Stripe.
    let amount = 299; // Default amount
    if (priceId === priceMap.supporter) amount = 299; // 2.99€
    if (priceId === priceMap.pro) amount = 499; // 4.99€
    if (priceId === priceMap.patron) amount = 999; // 9.99€

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
