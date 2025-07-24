
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, doc, deleteDoc, updateDoc, Timestamp, orderBy } from 'firebase/firestore';

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
  isRead: boolean;
}

// Add a new contact submission
export const addContactSubmission = (submission: Omit<ContactSubmission, 'id' | 'createdAt' | 'isRead'>) => {
  if (!submission.name || !submission.email || !submission.subject || !submission.message) {
    throw new Error('All fields are required for contact submission');
  }
  const submissionsCol = collection(db, 'contactSubmissions');
  return addDoc(submissionsCol, {
    ...submission,
    isRead: false,
    createdAt: Timestamp.now(),
  });
};

// Get real-time updates for all submissions
export const getSubmissions = (callback: (submissions: ContactSubmission[]) => void) => {
  const submissionsCol = collection(db, 'contactSubmissions');
  const q = query(submissionsCol, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const submissions: ContactSubmission[] = [];
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() } as ContactSubmission);
    });
    callback(submissions);
  }, (error) => {
      console.error("Error fetching submissions:", error)
      callback([])
  });

  return unsubscribe;
};

// Update a submission (e.g., mark as read)
export const updateSubmission = (submissionId: string, data: Partial<Omit<ContactSubmission, 'id' | 'createdAt'>>) => {
    if (!submissionId) {
        throw new Error("Submission ID is required for update.");
    }
    const submissionDoc = doc(db, 'contactSubmissions', submissionId);
    return updateDoc(submissionDoc, data);
};

// Delete a submission
export const deleteSubmission = (submissionId: string) => {
  if (!submissionId) {
    throw new Error('Submission ID cannot be empty');
  }
  const submissionDoc = doc(db, 'contactSubmissions', submissionId);
  return deleteDoc(submissionDoc);
};
