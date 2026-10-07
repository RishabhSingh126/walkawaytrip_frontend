// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIkJqJBorB4s0mddedhdpKum2c6_WA5Lk",
  authDomain: "walkawaytrip.firebaseapp.com",
  projectId: "walkawaytrip",
  storageBucket: "walkawaytrip.firebasestorage.app",
  messagingSenderId: "751184115261",
  appId: "1:751184115261:web:ced9f85ec9dd9408e01c54",
  measurementId: "G-9VVYNDYC73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseAuth);
export const auth = getAuth(app);