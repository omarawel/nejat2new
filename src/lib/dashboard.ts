
import { db } from './firebase';
import { doc, setDoc, onSnapshot, DocumentData, Timestamp } from 'firebase/firestore';

export interface DashboardConfig {
  selectedTools: string[];
  updatedAt?: Timestamp;
}

// Get real-time updates for a user's dashboard configuration
export const getUserDashboard = (userId: string, callback: (config: DashboardConfig | null) => void, isAdmin: boolean = false) => {
  const collectionName = isAdmin ? 'admin' : 'config';
  const docRef = doc(db, 'users', userId, collectionName, 'dashboard');

  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as DashboardConfig);
    } else {
      // If no config exists, return a default or empty state
      callback({ selectedTools: [] });
    }
  }, (error) => {
      console.error(`Error fetching ${collectionName} dashboard config:`, error);
      callback(null);
  });

  return unsubscribe; // Return the unsubscribe function to clean up the listener
};

// Update or create a user's dashboard configuration
export const updateUserDashboard = (userId: string, config: DashboardConfig, isAdmin: boolean = false) => {
  if (!userId) {
    throw new Error('User ID cannot be empty');
  }
  const collectionName = isAdmin ? 'admin' : 'config';
  const docRef = doc(db, 'users', userId, collectionName, 'dashboard');
  return setDoc(docRef, { 
    ...config,
    updatedAt: Timestamp.now() 
  }, { merge: true });
};
