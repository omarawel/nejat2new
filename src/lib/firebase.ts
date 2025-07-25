// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjPIdjsQjUIOogs0LMp_KSuDpD2490HyM",
  authDomain: "nejat-ba9qt.firebaseapp.com",
  projectId: "nejat-ba9qt",
  storageBucket: "nejat-ba9qt.firebasestorage.app",
  messagingSenderId: "727421281697",
  appId: "1:727421281697:web:55de49f0402160105897e0"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
