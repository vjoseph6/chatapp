// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlqPciq-Gee81LUVJPdU7yaPUi1x_z1n4",
  authDomain: "chatapp-5baf6.firebaseapp.com",
  projectId: "chatapp-5baf6",
  storageBucket: "chatapp-5baf6.appspot.com",
  messagingSenderId: "706688339866",
  appId: "1:706688339866:web:f7a55a5a0a79255fe93423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);