
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, doc, updateDoc, arrayUnion, arrayRemove, Timestamp, orderBy, getDoc } from 'firebase/firestore';

export interface Juz {
  id: number;
  assignedTo: string | null;
}

export interface HatimGroup {
  id: string;
  title: string;
  description: string;
  juzs: Juz[];
  createdAt: Timestamp;
}

// Get real-time updates for all hatim groups
export const getHatimGroups = (callback: (groups: HatimGroup[]) => void) => {
  const groupsCol = collection(db, 'hatimGroups');
  const q = query(groupsCol, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const groups: HatimGroup[] = [];
    querySnapshot.forEach((doc) => {
      groups.push({ id: doc.id, ...doc.data() } as HatimGroup);
    });
    callback(groups);
  }, (error) => {
      console.error("Error fetching hatim groups:", error)
      callback([])
  });

  return unsubscribe;
};

// Create a new hatim group
export const createHatimGroup = (title: string, description: string) => {
  const groupsCol = collection(db, 'hatimGroups');
  const initialJuzs: Juz[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    assignedTo: null,
  }));
  return addDoc(groupsCol, {
    title,
    description,
    juzs: initialJuzs,
    createdAt: Timestamp.now(),
  });
};

// Assign a Juz to a user
export const takeJuz = async (groupId: string, juzId: number, userName: string) => {
    const groupRef = doc(db, 'hatimGroups', groupId);
    const docSnap = await getDoc(groupRef);

    if (docSnap.exists()) {
        const groupData = docSnap.data() as Omit<HatimGroup, 'id'>;
        const newJuzs = groupData.juzs.map(juz => {
            if (juz.id === juzId && !juz.assignedTo) {
                return { ...juz, assignedTo: userName };
            }
            return juz;
        });
        
        // Check if the update is valid (another user might have taken it)
        const currentJuz = groupData.juzs.find(j => j.id === juzId);
        if (currentJuz && !currentJuz.assignedTo) {
            return updateDoc(groupRef, { juzs: newJuzs });
        } else {
            throw new Error("Juz is already taken.");
        }
    } else {
        throw new Error("Group not found.");
    }
}

// Release a Juz
export const releaseJuz = async (groupId: string, juzId: number) => {
    const groupRef = doc(db, 'hatimGroups', groupId);
    const docSnap = await getDoc(groupRef);
     if (docSnap.exists()) {
        const groupData = docSnap.data() as Omit<HatimGroup, 'id'>;
        const newJuzs = groupData.juzs.map(juz => {
            if (juz.id === juzId) {
                return { ...juz, assignedTo: null };
            }
            return juz;
        });
        return updateDoc(groupRef, { juzs: newJuzs });
    } else {
        throw new Error("Group not found.");
    }
}
