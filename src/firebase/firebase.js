// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv2gKNs5I5ySu5tDGJGttGt5iafZp3Gh0",
  authDomain: "instagram-clone-47313.firebaseapp.com",
  projectId: "instagram-clone-47313",
  storageBucket: "instagram-clone-47313.appspot.com",
  messagingSenderId: "77696080605",
  appId: "1:77696080605:web:f1abff3fc65b72f4dc5934",
  measurementId: "G-DEQ6KFNPNH",
};

// Initialize Firebase

!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export default db;

export { auth, provider, storage };
