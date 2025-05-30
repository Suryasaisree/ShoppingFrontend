// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuoziJVswFmLhD_yxIh0zcNNLHSXUIWXo",
  authDomain: "shopping-74fc0.firebaseapp.com",
  projectId: "shopping-74fc0",
  storageBucket: "shopping-74fc0.firebasestorage.app",
  messagingSenderId: "443510127135",
  appId: "1:443510127135:web:4268a23f9a1a675c8f732a",
  measurementId: "G-94DL0JTD9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()