
import { db } from './firebase';
import { doc, getDoc, setDoc, Timestamp, increment } from 'firebase/firestore';
import { getSubscriptionPlans, type SubscriptionPlan } from './subscriptions';
import { isAdmin } from './admin';
import { allTools } from './tools';


export interface UserUsage {
  aiRequestCount: number;
  lastRequestDate: Timestamp;
}

export interface UserSubscription {
    planId: string;
    status: 'active' | 'canceled' | 'past_due';
    current_period_end: Timestamp;
}

export interface UserQuota {
    limit: number;
    remaining: number;
}

export type FeatureKey = (typeof allTools)[number]['key'];

const FREE_TIER_LIMIT = 3;

// Helper to get all available subscription plans once
let plans: SubscriptionPlan[] = [];
const getPlans = async (): Promise<SubscriptionPlan[]> => {
    if (plans.length === 0) {
       // This function now resolves a promise directly since getSubscriptionPlans is synchronous.
       return new Promise<SubscriptionPlan[]>((resolve) => {
            getSubscriptionPlans((fetchedPlans) => {
                plans = fetchedPlans;
                resolve(plans);
            });
       });
    }
    return Promise.resolve(plans);
}

// Get a user's current subscription status from the `subscriptions` subcollection
export const getUserSubscription = async (userId: string): Promise<UserSubscription | null> => {
    if (!userId) return null;
    const subDocRef = doc(db, 'users', userId, 'subscriptions', 'current');
    
    try {
        const docSnap = await getDoc(subDocRef);
        if (docSnap.exists()) {
            return docSnap.data() as UserSubscription;
        }
    } catch (error) {
        console.error("Error fetching user subscription:", error);
    }

    return null;
}

// Get a user's current AI usage stats
export const getUserUsage = async (userId: string): Promise<UserUsage> => {
    const usageDocRef = doc(db, 'users', userId, 'usage', 'ai');
    const docSnap = await getDoc(usageDocRef);
    if (docSnap.exists()) {
        return docSnap.data() as UserUsage;
    }
    // Default usage if none exists
    return {
        aiRequestCount: 0,
        lastRequestDate: Timestamp.fromMillis(0),
    };
}


// This is the main function to check and update a user's quota
export const checkAndDecrementQuota = async (userId: string | null): Promise<{ success: boolean; quota: UserQuota }> => {
    if (userId && await isAdmin(userId)) {
        return { success: true, quota: { limit: Infinity, remaining: Infinity } };
    }
    
    if (!userId) {
        // Not logged in, check free tier quota from local storage or session
        // For simplicity, we'll give 3 requests to non-logged-in users.
        // A more robust solution might use a session or local storage with a timestamp.
        const sessionRequests = parseInt(sessionStorage.getItem('freeRequests') || '0', 10);
        const quota = { limit: FREE_TIER_LIMIT, remaining: FREE_TIER_LIMIT - sessionRequests };

        if (quota.remaining <= 0) {
            return { success: false, quota };
        }
        
        sessionStorage.setItem('freeRequests', (sessionRequests + 1).toString());
        return { success: true, quota: { ...quota, remaining: quota.remaining - 1 } };
    }

    const allPlans = await getPlans();
    const subscription = await getUserSubscription(userId);
    const usage = await getUserUsage(userId);
    const now = new Date();
    
    let limit = FREE_TIER_LIMIT; // Default to free tier limit

    if (subscription && subscription.status === 'active') {
        const currentPlan = allPlans.find(p => p.id === subscription.planId);
        if (currentPlan) {
            limit = currentPlan.aiRequestLimit;
        }
    }

    const lastRequestDate = usage.lastRequestDate.toDate();
    let currentCount = usage.aiRequestCount;

    // Reset count if it's a new month
    if (now.getMonth() !== lastRequestDate.getMonth() || now.getFullYear() !== lastRequestDate.getFullYear()) {
        currentCount = 0;
    }
    
    const remaining = limit - currentCount;

    if (remaining <= 0) {
        return { success: false, quota: { limit, remaining: 0 } };
    }
    
    // If quota is available, decrement it
    const usageDocRef = doc(db, 'users', userId, 'usage', 'ai');
    await setDoc(usageDocRef, {
        aiRequestCount: increment(1),
        lastRequestDate: Timestamp.now()
    }, { merge: true });

    return { success: true, quota: { limit, remaining: remaining - 1 } };
}

// Get only the user's quota without decrementing it
export const getUserQuota = async (userId: string | null): Promise<UserQuota> => {
     if (!userId) {
        const sessionRequests = parseInt(sessionStorage.getItem('freeRequests') || '0', 10);
        return { limit: FREE_TIER_LIMIT, remaining: Math.max(0, FREE_TIER_LIMIT - sessionRequests) };
    }

    if (await isAdmin(userId)) {
        return { limit: Infinity, remaining: Infinity };
    }

    const allPlans = await getPlans();
    const subscription = await getUserSubscription(userId);
    const usage = await getUserUsage(userId);
    const now = new Date();

    let limit = FREE_TIER_LIMIT;
    
    if (subscription && subscription.status === 'active') {
        const currentPlan = allPlans.find(p => p.id === subscription.planId);
        if (currentPlan) {
            limit = currentPlan.aiRequestLimit;
        }
    }
    
    const lastRequestDate = usage.lastRequestDate.toDate();
    let currentCount = usage.aiRequestCount;

    if (now.getMonth() !== lastRequestDate.getMonth() || now.getFullYear() !== lastRequestDate.getFullYear()) {
        currentCount = 0;
    }

    return { limit, remaining: Math.max(0, limit - currentCount) };
}

// This is a list of features that require a "pro" or "patron" subscription.
const proFeatures: FeatureKey[] = [
    'memorization',
    'quran', // For offline access
    'dua_generator',
    'greeting_card',
    'islamic_names', // AI part
    'quiz', // AI part
    'verse_finder',
    'insights',
    'learning_path_generator'
];


// Check for specific feature access
export const canAccessFeature = async (userId: string | null, featureKey: FeatureKey): Promise<boolean> => {
    // Free features are always accessible
    if (!proFeatures.includes(featureKey)) {
        return true;
    }
    
    // If it's a pro feature, user must be logged in.
    if (!userId) return false;
    
    // Admins have access to everything.
    if (await isAdmin(userId)) return true;

    const subscription = await getUserSubscription(userId);
    if (!subscription || subscription.status !== 'active') return false;

    // Check if the user's plan is 'pro' or 'patron'
    return subscription.planId === 'pro' || subscription.planId === 'patron';
};
