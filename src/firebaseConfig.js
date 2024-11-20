// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY, // Your Firebase API Key
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN, // Auth domain for Firebase authentication
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID, // Your Firebase project ID
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET, // Storage bucket for Firebase
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID, // Messaging sender ID
  appId: process.env.EXPO_PUBLIC_APP_ID, // Firebase App ID
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID, // Optional: Firebase Analytics Measurement ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage services
const firestore = getFirestore(app); // Firestore database instance
//const storage = getStorage(app); // Firebase Storage instance

// Export initialized Firebase app, Firestore, and Storage
export {firestore};
