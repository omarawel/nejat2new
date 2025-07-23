
import { db, auth } from './firebase';
import { collection, addDoc, onSnapshot, query, where, doc, deleteDoc, Timestamp } from 'firebase/firestore';

export interface Favorite {
  id: string;
  text: string;
  createdAt: Timestamp;
}

// Add a new favorite for a user
export const addFavorite = (userId: string, text: string) => {
  if (!userId || !text.trim()) {
    throw new Error('User ID and text cannot be empty');
  }
  const favoritesCol = collection(db, 'users', userId, 'favorites');
  return addDoc(favoritesCol, {
    text: text,
    createdAt: Timestamp.now(),
  });
};

// Get real-time updates for a user's favorites
export const getFavorites = (userId: string, callback: (favorites: Favorite[]) => void) => {
  const favoritesCol = collection(db, 'users', userId, 'favorites');
  const q = query(favoritesCol);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const favorites: Favorite[] = [];
    querySnapshot.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() } as Favorite);
    });
    // Sort by creation date, newest first
    favorites.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    callback(favorites);
  }, (error) => {
      console.error("Error fetching favorites:", error)
      callback([])
  });

  return unsubscribe; // Return the unsubscribe function to clean up the listener
};


// Delete a favorite
export const deleteFavorite = (userId: string, favoriteId: string) => {
  if (!userId || !favoriteId) {
    throw new Error('User ID and Favorite ID cannot be empty');
  }
  const favoriteDoc = doc(db, 'users', userId, 'favorites', favoriteId);
  return deleteDoc(favoriteDoc);
};
