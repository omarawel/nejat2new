
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, doc, deleteDoc, updateDoc, Timestamp, orderBy, setDoc } from 'firebase/firestore';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  priceId: string; // Stripe Price ID
  stripeLink: string; // Direct Stripe Payment Link
  aiRequestLimit: number; // Monthly AI request limit
  active: boolean; 
  createdAt: Timestamp; 
}

// Get real-time updates for all subscription plans
export const getSubscriptionPlans = (callback: (plans: SubscriptionPlan[]) => void) => {
  const plansCol = collection(db, 'subscriptionPlans');
  const q = query(plansCol, orderBy('createdAt', 'asc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const plans: SubscriptionPlan[] = [];
    querySnapshot.forEach((doc) => {
        plans.push({ id: doc.id, ...doc.data() } as SubscriptionPlan);
    });
     // Manually sort by a predefined order
    const order = ['supporter', 'pro', 'patron'];
    plans.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

    callback(plans);
  }, (error) => {
      console.error("Error fetching subscription plans:", error)
      callback([])
  });

  return unsubscribe;
};

// Add a new subscription plan
export const addSubscriptionPlan = (id: string, plan: Omit<SubscriptionPlan, 'id' | 'createdAt'>) => {
  if (!id || !plan.name || !plan.price || !plan.priceId) {
    throw new Error('Plan data is incomplete');
  }
  const plansCol = collection(db, 'subscriptionPlans');
  return setDoc(doc(plansCol, id), {
    ...plan,
    createdAt: Timestamp.now(),
  });
};

// Update an existing subscription plan
export const updateSubscriptionPlan = (planId: string, data: Partial<Omit<SubscriptionPlan, 'id' | 'createdAt'>>) => {
    if (!planId) {
        throw new Error("Plan ID is required for update.");
    }
    const planDoc = doc(db, 'subscriptionPlans', planId);
    return updateDoc(planDoc, data);
};

// Delete a subscription plan
export const deleteSubscriptionPlan = (planId: string) => {
  if (!planId) {
    throw new Error('Plan ID cannot be empty');
  }
  const planDoc = doc(db, 'subscriptionPlans', planId);
  return deleteDoc(planDoc);
};
