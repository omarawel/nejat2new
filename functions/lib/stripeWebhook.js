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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = void 0;
const functions = __importStar(require("firebase-functions"));
const stripe_1 = __importDefault(require("stripe"));
const firestore_1 = require("firebase-admin/firestore");
const app_1 = require("firebase-admin/app");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let app;
try {
    app = (0, app_1.initializeApp)();
}
catch (e) {
    console.error("Firebase initialization error", e);
    // If app is already initialized, it will throw, so we catch and ignore.
}
const db = (0, firestore_1.getFirestore)();
// Make sure to set your Stripe secret key and webhook secret in your Firebase environment configuration
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
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
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                if (session.mode === 'subscription' && session.customer && session.subscription) {
                    const subscription = await stripe.subscriptions.retrieve(session.subscription);
                    const userId = subscription.metadata.userId;
                    if (!userId) {
                        console.error('User ID not found in subscription metadata for session:', session.id);
                        break;
                    }
                    const subscriptionData = {
                        planId: subscription.items.data[0].price.metadata.planId || 'unknown',
                        status: subscription.status,
                        current_period_end: firestore_1.Timestamp.fromMillis(subscription.current_period_end * 1000),
                    };
                    // Store subscription info in a subcollection for the user
                    await db.collection('users').doc(userId).collection('subscriptions').doc('current').set(subscriptionData);
                }
                break;
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
            case 'customer.subscription.canceled':
                const subscription = event.data.object;
                const userId = subscription.metadata.userId;
                if (!userId) {
                    console.error('User ID not found in subscription metadata for subscription:', subscription.id);
                    break;
                }
                const updatedSubData = {
                    planId: subscription.items.data[0].price.metadata.planId || 'unknown',
                    status: subscription.status,
                    current_period_end: firestore_1.Timestamp.fromMillis(subscription.current_period_end * 1000),
                };
                await db.collection('users').doc(userId).collection('subscriptions').doc('current').set(updatedSubData, { merge: true });
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
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