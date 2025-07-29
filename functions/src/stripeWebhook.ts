
import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { initializeApp, App } from 'firebase-admin/app';
import * as dotenv from 'dotenv';

dotenv.config();

let app: App;
try {
  app = initializeApp();
} catch (e) {
  console.error("Firebase initialization error", e);
  // If app is already initialized, it will throw, so we catch and ignore.
}

const db = getFirestore();

// Make sure to set your Stripe secret key and webhook secret in your Firebase environment configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

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
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            
            if (session.mode === 'subscription' && session.customer && session.subscription) {
                const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
                const userId = subscription.metadata.userId;

                if (!userId) {
                    console.error('User ID not found in subscription metadata for session:', session.id);
                    break;
                }

                const subscriptionData = {
                    planId: subscription.items.data[0].price.metadata.planId || 'unknown',
                    status: subscription.status,
                    current_period_end: Timestamp.fromMillis(subscription.current_period_end * 1000),
                };

                // Store subscription info in a subcollection for the user
                await db.collection('users').doc(userId).collection('subscriptions').doc('current').set(subscriptionData);
            }
            break;
            
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
        case 'customer.subscription.canceled':
             const subscription = event.data.object as Stripe.Subscription;
             const userId = subscription.metadata.userId;

             if (!userId) {
                console.error('User ID not found in subscription metadata for subscription:', subscription.id);
                break;
             }
            
             const updatedSubData = {
                 planId: subscription.items.data[0].price.metadata.planId || 'unknown',
                 status: subscription.status,
                 current_period_end: Timestamp.fromMillis(subscription.current_period_end * 1000),
             };
             await db.collection('users').doc(userId).collection('subscriptions').doc('current').set(updatedSubData, { merge: true });
            break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    // Return a 200 response to acknowledge receipt of the event
    response.status(200).send();
  } catch (err) {
      console.error('Error handling webhook event:', err);
      response.status(500).send('Internal Server Error');
  }
});
