
import { db } from './firebase';
import { doc, setDoc, onSnapshot, DocumentData, Timestamp } from 'firebase/firestore';

export interface DashboardConfig {
  selectedTools: string[];
  updatedAt?: Timestamp;
}

// Get real-time updates for a user's dashboard configuration
export const getUserDashboard = (userId: string, callback: (config: DashboardConfig | null) => void) => {
  const docRef = doc(db, 'users', userId, 'config', 'dashboard');

  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as DashboardConfig);
    } else {
      // If no config exists, return a default or empty state
      callback({ selectedTools: [] });
    }
  }, (error) => {
      console.error("Error fetching dashboard config:", error);
      callback(null);
  });

  return unsubscribe; // Return the unsubscribe function to clean up the listener
};

// Update or create a user's dashboard configuration
export const updateUserDashboard = (userId: string, config: DashboardConfig) => {
  if (!userId) {
    throw new Error('User ID cannot be empty');
  }
  const docRef = doc(db, 'users', userId, 'config', 'dashboard');
  return setDoc(docRef, { 
    ...config,
    updatedAt: Timestamp.now() 
  }, { merge: true });
};
