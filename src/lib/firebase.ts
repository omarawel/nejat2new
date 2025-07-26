// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0fLgP_1axHefYp9J1yS024jP6f1l9Iaw",
  authDomain: "nejat-3.firebaseapp.com",
  projectId: "nejat-3",
  storageBucket: "nejat-3.appspot.com",
  messagingSenderId: "175027558661",
  appId: "1:175027558661:web:16e378d38b55635817290f"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
