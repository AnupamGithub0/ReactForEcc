// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJzg3JgYUN7yZ-h6CwhLsQuvqOh2hi4Ho",
  authDomain: "video-e73a9.firebaseapp.com",
  projectId: "video-e73a9",
  storageBucket: "video-e73a9.appspot.com",
  messagingSenderId: "485148621628",
  appId: "1:485148621628:web:37c767018c8b415d987c39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider

export default app;