
import { db } from './firebase';
import { doc, getDoc, setDoc, Timestamp, increment } from 'firebase/firestore';
import { getSubscriptionPlans, type SubscriptionPlan } from './subscriptions';

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

const FREE_TIER_LIMIT = 3;

// Helper to get all available subscription plans once
let plans: SubscriptionPlan[] = [];
const getPlans = async () => {
    if (plans.length === 0) {
       return new Promise<SubscriptionPlan[]>((resolve) => {
            const unsubscribe = getSubscriptionPlans((fetchedPlans) => {
                plans = fetchedPlans;
                unsubscribe();
                resolve(plans);
            });
       });
    }
    return Promise.resolve(plans);
}

// Get a user's current subscription status from the `subscriptions` subcollection
export const getUserSubscription = async (userId: string): Promise<UserSubscription | null> => {
    const subDocRef = doc(db, 'users', userId, 'subscriptions', 'current');
    const docSnap = await getDoc(subDocRef);
    if (docSnap.exists()) {
        return docSnap.data() as UserSubscription;
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
    if (!userId) {
        // Not logged in, deny access
        return { success: false, quota: { limit: 0, remaining: 0 } };
    }

    const allPlans = await getPlans();
    const subscription = await getUserSubscription(userId);
    const usage = await getUserUsage(userId);
    const now = new Date();
    
    let currentPlan: SubscriptionPlan | undefined;
    let limit = FREE_TIER_LIMIT; // Default to free tier limit

    if (subscription && subscription.status === 'active') {
        currentPlan = allPlans.find(p => p.id === subscription.planId);
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
        return { success: false, quota: { limit, remaining } };
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
        return { limit: 0, remaining: 0 };
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
