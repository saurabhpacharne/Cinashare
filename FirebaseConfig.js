
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyChpWeDLib3HLYBLYCSwRQpsU4JOyN4MxY",
  authDomain: "cineshare-5944e.firebaseapp.com",
  projectId: "cineshare-5944e",
  storageBucket: "cineshare-5944e.appspot.com",
  messagingSenderId: "299894671915",
  appId: "1:299894671915:web:359701fb829767ad56f86e"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
