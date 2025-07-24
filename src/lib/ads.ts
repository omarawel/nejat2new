
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, doc, deleteDoc, updateDoc, Timestamp, orderBy, where } from 'firebase/firestore';

export interface Ad {
  id: string;
  slotId: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  actionButtonText: string;
  createdAt: Timestamp;
}

// Get real-time updates for all ads
export const getAds = (callback: (ads: Ad[]) => void) => {
  const adsCol = collection(db, 'ads');
  const q = query(adsCol, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const ads: Ad[] = [];
    querySnapshot.forEach((doc) => {
      ads.push({ id: doc.id, ...doc.data() } as Ad);
    });
    callback(ads);
  }, (error) => {
      console.error("Error fetching ads:", error)
      callback([])
  });

  return unsubscribe;
};

// Add a new ad
export const addAd = async (ad: Omit<Ad, 'id' | 'createdAt'>) => {
  try {
    if (!ad.slotId || !ad.imageUrl || !ad.linkUrl || !ad.title) {
      console.error("Ad data is incomplete:", ad);
      throw new Error('Ad data is incomplete');
    }
    
    console.log("Attempting to add ad:", ad);
    const adsCol = collection(db, 'ads');
    const docRef = await addDoc(adsCol, {
      ...ad,
      createdAt: Timestamp.now(),
    });
    console.log("Ad created successfully with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Firestore error while adding ad:", error);
    // This will re-throw the error so the calling component can catch it.
    throw error;
  }
};


// Update an existing ad
export const updateAd = (adId: string, data: Partial<Omit<Ad, 'id' | 'createdAt'>>) => {
    if (!adId) {
        throw new Error("Ad ID is required for update.");
    }
    const adDoc = doc(db, 'ads', adId);
    return updateDoc(adDoc, data);
};

// Delete an ad
export const deleteAd = (adId: string) => {
  if (!adId) {
    throw new Error('Ad ID cannot be empty');
  }
  const adDoc = doc(db, 'ads', adId);
  return deleteDoc(adDoc);
};

// Get a single ad by slot ID (for display in the app)
export const getAdBySlot = (slotId: string, callback: (ad: Ad | null) => void) => {
    const adsCol = collection(db, 'ads');
    const q = query(adsCol, where('slotId', '==', slotId));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
            const adDoc = querySnapshot.docs[0];
            callback({ id: adDoc.id, ...adDoc.data() } as Ad);
        } else {
            callback(null);
        }
    }, (error) => {
        console.error(`Error fetching ad for slot ${slotId}:`, error);
        callback(null);
    });

    return unsubscribe;
}
