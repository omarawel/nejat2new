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
exports.createStripeCheckoutSession = void 0;
const functions = __importStar(require("firebase-functions"));
const stripe_1 = __importDefault(require("stripe"));
const app_1 = require("firebase-admin/app");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
try {
    (0, app_1.initializeApp)();
}
catch (e) {
    console.error("Firebase initialization error", e);
    // If app is already initialized, it will throw, so we catch and ignore.
}
// Initialisiere Stripe mit deinem Secret Key
// Stelle sicher, dass du deine Stripe Secret Key sicher in den Umgebungsvariablen von Firebase Functions speicherst
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
});
exports.createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
    // Überprüfe, ob der Benutzer authentifiziert ist (optional, aber empfohlen)
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Nur authentifizierte Benutzer können Abonnements erstellen.');
    }
    const userId = context.auth.uid;
    const { priceId } = data;
    if (!priceId) {
        throw new functions.https.HttpsError('invalid-argument', 'Die Stripe Preis-ID ist erforderlich.');
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
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Fehler beim Erstellen der Stripe Checkout Session:', error);
        throw new functions.https.HttpsError('internal', 'Fehler beim Erstellen der Checkout Session.', errorMessage);
    }
});
//# sourceMappingURL=stripeCheckout.js.map