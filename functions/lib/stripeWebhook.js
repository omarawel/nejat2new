"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = void 0;
const functions = __importStar(require("firebase-functions"));
const stripe_1 = __importDefault(require("stripe"));
const firestore_1 = require("firebase-admin/firestore");
const app_1 = require("firebase-admin/app");
// Initialize Firebase Admin SDK
try {
    (0, app_1.initializeApp)();
}
catch (e) {
    console.info("Firebase already initialized.");
}
const db = (0, firestore_1.getFirestore)();
// Initialize Stripe with secret key from environment configuration
const stripeSecretKey = functions.config().stripe?.secret_key;
if (!stripeSecretKey) {
    console.error("Stripe secret key is not set in Firebase functions config.");
    throw new Error("Stripe secret key is not configured.");
}
const stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: '2024-06-20',
});
// Get webhook secret from environment configuration
const endpointSecret = functions.config().stripe?.webhook_secret;
if (!endpointSecret) {
    console.error("Stripe webhook secret is not set in Firebase functions config.");
    throw new Error("Stripe webhook secret is not configured.");
}
exports.stripeWebhook = functions.https.onRequest(async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        if (!sig) {
            throw new Error('No Stripe signature found!');
        }
        event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Webhook signature verification failed.', message);
        response.status(400).send(`Webhook Error: ${message}`);
        return;
    }
    // Handle the event
    try {
        let userId = null;
        let subscription = null;
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                // Get user ID from the session for new subscriptions
                userId = session.client_reference_id;
                if (session.mode === 'subscription' && session.subscription) {
                    if (!userId) {
                        console.error('User ID not found in checkout session:', session.id);
                        break;
                    }
                    subscription = await stripe.subscriptions.retrieve(session.subscription);
                    // Important: Ensure the subscription has the userId in metadata for future events
                    if (subscription.metadata.userId !== userId) {
                        await stripe.subscriptions.update(subscription.id, { metadata: { userId: userId } });
                    }
                }
                break;
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                subscription = event.data.object;
                // For recurring events, get userId from the subscription metadata
                userId = subscription.metadata.userId;
                break;
        }
        if (subscription && userId) {
            const plan = subscription.items.data[0]?.price;
            const subscriptionData = {
                planId: plan?.metadata.planId || plan?.lookup_key || 'unknown',
                status: subscription.status,
                current_period_end: firestore_1.Timestamp.fromMillis(subscription.current_period_end * 1000),
            };
            await db.collection('users').doc(userId).collection('subscriptions').doc('current').set(subscriptionData, { merge: true });
        }
        // Return a 200 response to acknowledge receipt of the event
        response.status(200).send();
    }
    catch (err) {
        console.error('Error handling webhook event:', err);
        response.status(500).send('Internal Server Error');
    }
});
//# sourceMappingURL=stripeWebhook.js.map