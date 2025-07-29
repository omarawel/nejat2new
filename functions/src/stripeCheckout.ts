
import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { initializeApp } from 'firebase-admin/app';
import * as dotenv from 'dotenv';

dotenv.config();

try {
  initializeApp();
} catch (e) {
  console.error("Firebase initialization error", e);
  // If app is already initialized, it will throw, so we catch and ignore.
}

// Initialisiere Stripe mit deinem Secret Key
// Stelle sicher, dass du deine Stripe Secret Key sicher in den Umgebungsvariablen von Firebase Functions speicherst
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20', 
});

export const createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
  // Überprüfe, ob der Benutzer authentifiziert ist (optional, aber empfohlen)
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Nur authentifizierte Benutzer können Abonnements erstellen.'
    );
  }
  
  const userId = context.auth.uid;
  const { priceId } = data;

  if (!priceId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Die Stripe Preis-ID ist erforderlich.'
    );
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
          userId: userId // Pass the Firebase UID to the subscription
        }
      },
      success_url: `${process.env.APP_URL}/profile?success=true`,
      cancel_url: `${process.env.APP_URL}/subscribe?canceled=true`,
    });

    return { id: session.id };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Fehler beim Erstellen der Stripe Checkout Session:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Fehler beim Erstellen der Checkout Session.',
      errorMessage
    );
  }
});
