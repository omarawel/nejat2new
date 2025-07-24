import * as functions from 'firebase-functions';
import Stripe from 'stripe';

// Initialisiere Stripe mit deinem Secret Key
// Stelle sicher, dass du deine Stripe Secret Key sicher in den Umgebungsvariablen von Firebase Functions speicherst
const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2020-08-27', // Verwende die API-Version, die für dein Projekt am besten geeignet ist
});

export const createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
  // Überprüfe, ob der Benutzer authentifiziert ist (optional, aber empfohlen)
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Nur authentifizierte Benutzer können Abonnements erstellen.'
    );
  }

  const { priceId } = data;

  if (!priceId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Die Stripe Preis-ID ist erforderlich.'
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Oder andere Zahlungsmethoden
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription', // Da es sich um Abo-Pläne handelt
      success_url: `${functions.config().app.url}/subscribe?success=true&session_id={CHECKOUT_SESSION_ID}`, // URL nach erfolgreicher Zahlung
      cancel_url: `${functions.config().app.url}/subscribe?canceled=true`, // URL bei Abbruch der Zahlung
      // Optional: Füge Kundeninformationen hinzu, wenn du bereits einen Stripe-Kunden hast
      // customer: userId, // Ersetze userId durch die tatsächliche Stripe Kunden-ID des Benutzers
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
