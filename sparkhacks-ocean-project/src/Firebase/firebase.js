// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "ocean-task-project.firebaseapp.com",
  projectId: "ocean-task-project",
  storageBucket: "ocean-task-project.firebasestorage.app",
  messagingSenderId: "95892150287",
  appId: "1:95892150287:web:3245c86a24be6591e5ab7a",
  measurementId: "G-CY4PJ6P701"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// Adjusted Function to create an account - Now returns a Promise
export function createAcct(email, password) {
    // Return the promise here so it can be used with .then() and .catch() in the component
    return createUserWithEmailAndPassword(auth, email, password);
}

// Email validation function
export function checkEmail(email) {
  const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expression.test(email);
}

// Password validation function
export function checkPass(password) {
  return password.length >= 7;
}

export { app, analytics, auth, database };