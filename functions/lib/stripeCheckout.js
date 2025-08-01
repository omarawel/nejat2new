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
// Initialize Firebase Admin SDK
try {
    (0, app_1.initializeApp)();
}
catch (e) {
    // Errors if already initialized, which is fine.
    console.info("Firebase already initialized.");
}
exports.createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
    var _a, _b;
    // Ensure the user is authenticated.
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to create a subscription.');
    }
    const userId = context.auth.uid;
    const { priceId } = data;
    if (!priceId) {
        throw new functions.https.HttpsError('invalid-argument', 'The Stripe Price ID is required.');
    }
    // Get environment configuration
    const stripeSecretKey = (_a = functions.config().stripe) === null || _a === void 0 ? void 0 : _a.secret_key;
    const appUrl = (_b = functions.config().app) === null || _b === void 0 ? void 0 : _b.url;
    if (!stripeSecretKey) {
        console.error("Stripe secret key is not set in Firebase functions config.");
        throw new functions.https.HttpsError('internal', 'Stripe secret key is not configured.');
    }
    if (!appUrl) {
        console.error("App URL is not set in Firebase functions config.");
        throw new functions.https.HttpsError('internal', 'Application URL is not configured.');
    }
    // Initialize Stripe within the function call
    const stripe = new stripe_1.default(stripeSecretKey, {
        apiVersion: '2024-06-20',
    });
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
                    userId: userId // Pass the Firebase UID to the subscription metadata
                }
            },
            client_reference_id: userId, // Also pass it as client_reference_id for checkout.session.completed
            success_url: `${appUrl}/profile?success=true`,
            cancel_url: `${appUrl}/subscribe?canceled=true`,
        });
        return { id: session.id };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error creating Stripe Checkout Session:', error);
        throw new functions.https.HttpsError('internal', 'Failed to create Checkout Session.', errorMessage);
    }
});
//# sourceMappingURL=stripeCheckout.js.map