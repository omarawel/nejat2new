
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, doc, deleteDoc, updateDoc, Timestamp, orderBy } from 'firebase/firestore';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  priceId: string; // Stripe Price ID
  aiRequestLimit: number; // Monthly AI request limit
  active: boolean; // Annahme: Pläne sind aktiv, basierend auf dem Bild
  createdAt: Timestamp; // Wird beibehalten
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
    // HARDCODED Pläne basierend auf dem Bild - ERSETZE DIES DURCH DAS LADEN AUS DEINER DATENBANK
    const hardcodedPlans: SubscriptionPlan[] = [
      {
        id: 'supporter',
        name: 'Supporter',
        price: '2,99€/Monat',
        features: ['15 KI-Anfragen pro Monat', 'Werbefreie Erfahrung', 'Unterstütze die Entwicklung'],
        priceId: 'price_1RltQWGXWEMb96gVAEDYSZay', // ERSETZE DIES
        aiRequestLimit: 15,
        active: true,
        createdAt: Timestamp.now(), // Dummy Timestamp
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '4,99€/Monat',
        features: ['30 KI-Anfragen pro Monat', 'Alle Supporter-Vorteile', 'Offline-Zugriff für Koran'],
        priceId: 'price_1RmJ3rGXWEMb96gVBYrwf9DD', // ERSETZE DIES
        aiRequestLimit: 30,
        active: true,
        createdAt: Timestamp.now(), // Dummy Timestamp
      },
      {
        id: 'patron',
        name: 'Patron',
        price: '9,99€/Monat',
        features: ['75 KI-Anfragen pro Monat', 'Alle Pro-Vorteile', 'Früher Zugriff auf neue Features'],
        priceId: 'YOUR_STRIPE_PATRON_PRICE_ID', // ERSETZE DIES
        aiRequestLimit: 75,
        active: true,
        createdAt: Timestamp.now(), // Dummy Timestamp
      },
    ];
    callback(hardcodedPlans); // Verwende die hardcoded Pläne
  }, (error) => {
      console.error("Error fetching subscription plans:", error);
      callback([]);
  });

  return unsubscribe;
};

// Add a new subscription plan
export const addSubscriptionPlan = (plan: Omit<SubscriptionPlan, 'id' | 'createdAt'>) => {
  if (!plan.name || !plan.price || !plan.priceId) {
    throw new Error('Plan data is incomplete');
  }
  const plansCol = collection(db, 'subscriptionPlans');
  return addDoc(plansCol, {
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
