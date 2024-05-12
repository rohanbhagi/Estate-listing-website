// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4aa8f.firebaseapp.com",
  projectId: "mern-estate-4aa8f",
  storageBucket: "mern-estate-4aa8f.appspot.com",
  messagingSenderId: "62671048817",
  appId: "1:62671048817:web:1a4d88d9d0341a7cd58bd0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);