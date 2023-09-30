import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzo-eivbEOnnqNPl5faKx1GVrYT-oaCEQ",
  authDomain: "expense-tracker-5f901.firebaseapp.com",
  projectId: "expense-tracker-5f901",
  storageBucket: "expense-tracker-5f901.appspot.com",
  messagingSenderId: "449401365304",
  appId: "1:449401365304:web:9f474c6ebccf7c5e4617cd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
