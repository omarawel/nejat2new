/**
 * Export all functions from a single file to make it easy to manage.
 */

import { initializeApp } from 'firebase-admin/app';

initializeApp();

export { createStripeCheckoutSession } from './stripeCheckout';
export { stripeWebhook } from './stripeWebhook';
