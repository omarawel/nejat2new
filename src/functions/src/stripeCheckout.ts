import * as functions from 'firebase-functions';
import Stripe from 'stripe';

// Initialisiere Stripe mit deinem Secret Key
// Stelle sicher, dass du deine Stripe Secret Key sicher in den Umgebungsvariablen von Firebase Functions speicherst
const stripe = new Stripe(functions.config().stripe.secret_key, {
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
      success_url: `${functions.config().app.url}/profile?success=true`,
      cancel_url: `${functions.config().app.url}/subscribe?canceled=true`,
    });

    return { id: session.id };
  } catch (error: any) {
    console.error('Fehler beim Erstellen der Stripe Checkout Session:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Fehler beim Erstellen der Checkout Session.',
      error.message
    );
  }
});
