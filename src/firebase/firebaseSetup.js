import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_API_KEY),
  authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_MESSAGING_ID),
  appId: String(import.meta.env.VITE_APP_ID),
  measurementId: String(import.meta.env.VITE_MEASUREMENT_ID),
};
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const database = getFirestore(app);
export { app, firebaseAuth, database };
