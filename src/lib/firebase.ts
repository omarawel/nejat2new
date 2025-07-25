// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "nejat-ba9qt",
  "appId": "1:727421281697:web:55de49f0402160105897e0",
  "storageBucket": "nejat-ba9qt.appspot.com",
  "apiKey": "AIzaSyBjPIdjsQjUIOogs0LMp_KSuDpD2490HyM",
  "authDomain": "nejat-ba9qt.firebaseapp.com",
  "measurementId": "G-S3XQ0KYYJ6",
  "messagingSenderId": "727421281697"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
