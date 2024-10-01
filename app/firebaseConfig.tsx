import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";
import { getApp } from "firebase/app";
import { getFunctions } from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyCl5oshnpWv3O0cMnHA32acw4jbkQc1OcE",
  authDomain: "dfatto-a05ca.firebaseapp.com",
  projectId: "dfatto-a05ca",
  storageBucket: "dfatto-a05ca.appspot.com",
  messagingSenderId: "426411354472",
  appId: "1:426411354472:web:24a889e7358e121ee6cedd",
  measurementId: "G-7ZN4M5BCVG"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);
const storageRef = ref(storage)
const functions = getFunctions(app);

export {db, auth, storage, storageRef, functions}