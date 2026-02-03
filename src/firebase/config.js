// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQo1VJAM5sfna9t4tJ83aqk3p-NWMkdNU",
  authDomain: "crossneuron-bca3d.firebaseapp.com",
  projectId: "crossneuron-bca3d",
  storageBucket: "crossneuron-bca3d.firebasestorage.app",
  messagingSenderId: "33472829509",
  appId: "1:33472829509:web:f545f863eef5ac6e312b2c",
  measurementId: "G-73VZRBEGRZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);  
export const googleProvider= new GoogleAuthProvider(); 
const analytics = getAnalytics(app);