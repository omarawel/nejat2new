
import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { initializeApp } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
try {
  initializeApp();
} catch (e) {
  // Errors if already initialized, which is fine.
  console.info("Firebase already initialized.");
}

// Get Stripe secret key from environment configuration
const stripeSecretKey = functions.config().stripe?.secret_key;
if (!stripeSecretKey) {
  console.error("Stripe secret key is not set in Firebase functions config.");
  throw new Error("Stripe secret key is not configured.");
}

// Initialize Stripe with secret key
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20', 
});

export const createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to create a subscription.'
    );
  }
  
  const userId = context.auth.uid;
  const { priceId } = data;

  if (!priceId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The Stripe Price ID is required.'
    );
  }
  
  const appUrl = functions.config().app?.url;
  if (!appUrl) {
    console.error("App URL is not set in Firebase functions config.");
    throw new functions.https.HttpsError('internal', 'Application URL is not configured.');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        metadata: {
          userId: userId 
        }
      },
      client_reference_id: userId,
      success_url: `${appUrl}/profile?success=true`,
      cancel_url: `${appUrl}/subscribe?canceled=true`,
    });

    return { id: session.id };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error creating Stripe Checkout Session:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to create Checkout Session.',
      errorMessage
    );
  }
});
