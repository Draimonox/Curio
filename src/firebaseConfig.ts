// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// firebaseConfig.ts
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getFirestore, Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbE-sO9YZKwuv4fkJNn4E9Y5ON9-BxENY",
  authDomain: "blogup-ee20a.firebaseapp.com",
  projectId: "blogup-ee20a",
  storageBucket: "blogup-ee20a.appspot.com",
  messagingSenderId: "116595688263",
  appId: "1:116595688263:web:765c495171dd7c66320262",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage
const storage: FirebaseStorage = getStorage(firebaseApp);

// Initialize Firestore
const db: Firestore = getFirestore(firebaseApp);

export { firebaseApp, storage, db };
