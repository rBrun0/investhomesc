import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";
import { getApp } from "firebase/app";
import { getFunctions } from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyBm8TPJ7TA44sUfYmyBGX-CMy7dhgs_13U",
  authDomain: "invest-home-b3281.firebaseapp.com",
  projectId: "invest-home-b3281",
  storageBucket: "invest-home-b3281.firebasestorage.app",
  messagingSenderId: "293868287767",
  appId: "1:293868287767:web:a8096b0bba275b4a0b2952",
  measurementId: "G-83H9B0GY14"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);
const storageRef = ref(storage)
const functions = getFunctions(app);

export {db, auth, storage, storageRef, functions}