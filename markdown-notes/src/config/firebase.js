// Import the functions needed from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"


// my web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIuh_pppzYleBT5A61GALhh74oc-iaaGg",
  authDomain: "notesmd-react.firebaseapp.com",
  projectId: "notesmd-react",
  storageBucket: "notesmd-react.appspot.com",
  messagingSenderId: "25614240661",
  appId: "1:25614240661:web:a47ee7b6bcd941b6a3849c"
};


const app = initializeApp(firebaseConfig);                  // Initialize Firebase
export const db = getFirestore(app)                         // get the instance associated with our app and store it in db
export const notesCollection = collection(db, "notes")      // creates a refrence to our notes collection

