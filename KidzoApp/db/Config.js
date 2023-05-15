// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm90yaGRE3PcePGFwn5STjmSFIkzRCSHM",
  authDomain: "kidzoapp-56775.firebaseapp.com",
  projectId: "kidzoapp-56775",
  storageBucket: "kidzoapp-56775.appspot.com",
  messagingSenderId: "685443084010",
  appId: "1:685443084010:web:6d4567d2c97e4b288eb193",
  measurementId: "G-DD0ND9P7D7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider, db, firebase };
