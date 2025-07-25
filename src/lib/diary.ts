
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, doc, deleteDoc, updateDoc, Timestamp, orderBy } from 'firebase/firestore';

export interface DiaryEntry {
  id?: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}

// Add a new diary entry
export const addDiaryEntry = (userId: string, entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => {
  if (!userId) throw new Error('User ID is required.');
  const entriesCol = collection(db, 'users', userId, 'diaryEntries');
  return addDoc(entriesCol, {
    ...entry,
    createdAt: Timestamp.now(),
  });
};

// Get real-time updates for all diary entries
export const getDiaryEntries = (userId: string, callback: (entries: DiaryEntry[]) => void) => {
    if (!userId) {
        callback([]);
        return () => {}; // Return an empty unsubscribe function
    }
  const entriesCol = collection(db, 'users', userId, 'diaryEntries');
  const q = query(entriesCol, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const entries: DiaryEntry[] = [];
    querySnapshot.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() } as DiaryEntry);
    });
    callback(entries);
  }, (error) => {
      console.error("Error fetching diary entries:", error)
      callback([])
  });

  return unsubscribe;
};

// Update a diary entry
export const updateDiaryEntry = (userId: string, entryId: string, data: Partial<Omit<DiaryEntry, 'id' | 'createdAt'>>) => {
    if (!userId || !entryId) throw new Error("User ID and Entry ID are required for update.");
    const entryDoc = doc(db, 'users', userId, 'diaryEntries', entryId);
    return updateDoc(entryDoc, data);
};

// Delete a diary entry
export const deleteDiaryEntry = (userId: string, entryId: string) => {
  if (!userId || !entryId) throw new Error('User ID and Entry ID cannot be empty');
  const entryDoc = doc(db, 'users', userId, 'diaryEntries', entryId);
  return deleteDoc(entryDoc);
};
