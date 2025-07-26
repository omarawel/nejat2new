// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkJ2-kon7JFWHaWJP9tNi1T3DyKEpT0Zo",
  authDomain: "freelancer-ai-5067c.firebaseapp.com",
  projectId: "freelancer-ai-5067c",
  storageBucket: "freelancer-ai-5067c.appspot.com",
  messagingSenderId: "785521346586",
  appId: "1:785521346586:web:590f1aa0489e7f8bbaa9a3",
  measurementId: "G-BK94SVDKNF"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics if not already initialized
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}


export { app, auth, db, storage, analytics };
