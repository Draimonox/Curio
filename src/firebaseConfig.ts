// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// firebaseConfig.ts
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getFirestore, Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKLw9xthJ5s8UwDpBqmAAIhAfSAl_UDxc",
  authDomain: "curio-bd4d2.firebaseapp.com",
  projectId: "curio-bd4d2",
  storageBucket: "curio-bd4d2.firebasestorage.app",
  messagingSenderId: "504855252803",
  appId: "1:504855252803:web:87dd8e483ff679b7cee9f6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage
const storage: FirebaseStorage = getStorage(firebaseApp);

// Initialize Firestore
const db: Firestore = getFirestore(firebaseApp);

export { firebaseApp, storage, db };
