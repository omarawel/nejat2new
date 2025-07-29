
import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
try {
  initializeApp();
} catch (e) {
  console.error("Firebase initialization error", e);
}

const db = getFirestore();

// Initialize Stripe with secret key from Firebase config
const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2024-06-20',
});

const endpointSecret = functions.config().stripe.webhook_secret;

export const stripeWebhook = functions.https.onRequest(async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    if (!sig) {
      throw new Error('No Stripe signature found!');
    }
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error('Webhook signature verification failed.', message);
    response.status(400).send(`Webhook Error: ${message}`);
    return;
  }

  // Handle the event
  try {
    let userId: string | null = null;
    let subscription: Stripe.Subscription | null = null;

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            userId = session.client_reference_id; // Get user ID from the session

            if (session.mode === 'subscription' && session.subscription) {
                if (!userId) {
                    console.error('User ID not found in checkout session:', session.id);
                    break;
                }
                subscription = await stripe.subscriptions.retrieve(session.subscription as string);
            }
            break;
            
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
             subscription = event.data.object as Stripe.Subscription;
             userId = subscription.metadata.userId;
            break;
    }

    if (subscription && userId) {
        const subscriptionData = {
            planId: subscription.items.data[0]?.price.metadata.planId || subscription.items.data[0]?.price.lookup_key || 'unknown',
            status: subscription.status,
            current_period_end: Timestamp.fromMillis(subscription.current_period_end * 1000),
        };
        await db.collection('users').doc(userId).collection('subscriptions').doc('current').set(subscriptionData, { merge: true });
    }
    
    // Return a 200 response to acknowledge receipt of the event
    response.status(200).send();
  } catch (err) {
      console.error('Error handling webhook event:', err);
      response.status(500).send('Internal Server Error');
  }
});
