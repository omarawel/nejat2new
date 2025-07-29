import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// This function now checks for an `isAdmin` field in a user's document
// in the 'users' collection. This is more flexible than a hardcoded list.
export const isAdmin = async (uid: string | null): Promise<boolean> => {
    if (!uid) {
        return false;
    }
    
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists() && userDoc.data().isAdmin === true) {
            return true;
        }
        
        return false;
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
}
