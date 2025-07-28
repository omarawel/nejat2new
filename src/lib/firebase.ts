
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5jMnxMBVrLlJbLHyvc_SvgbGYT_2-iPU",
  authDomain: "nejat-50nk7.firebaseapp.com",
  projectId: "nejat-50nk7",
  storageBucket: "nejat-50nk7.appspot.com",
  messagingSenderId: "623928651663",
  appId: "1:623928651663:web:8e36d43fd452fbdfc925fa"
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
