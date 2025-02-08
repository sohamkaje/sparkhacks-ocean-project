// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {  
  apiKey: "AIzaSyD2dOFOS111YZ-zibekBsrxJ4qLus0lhPE",
  authDomain: "recipe-maker-423a7.firebaseapp.com",
  projectId: "recipe-maker-423a7",
  storageBucket: "recipe-maker-423a7.appspot.com",
  messagingSenderId: "329579428591",
  appId: "1:329579428591:web:0dab792c312ef090c5b91a",
  measurementId: "G-MBQB6QSXC6"
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