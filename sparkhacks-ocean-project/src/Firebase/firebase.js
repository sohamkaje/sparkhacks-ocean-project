// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2PE8X1H5qQ7P_Ja7j1Vs17-fHmc7pViY",
  authDomain: "ocean-task-project.firebaseapp.com",
  projectId: "ocean-task-project",
  storageBucket: "ocean-task-project.firebasestorage.app",
  messagingSenderId: "95892150287",
  appId: "1:95892150287:web:3245c86a24be6591e5ab7a",
  measurementId: "G-CY4PJ6P701"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider};