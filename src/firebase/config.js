// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaaAxncNp1O8C0dsDGPvS9UnnlRz46YjE",
  authDomain: "react-cursos-e093a.firebaseapp.com",
  projectId: "react-cursos-e093a",
  storageBucket: "react-cursos-e093a.appspot.com",
  messagingSenderId: "509343014262",
  appId: "1:509343014262:web:d78597effdbcfed36aee57"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp)