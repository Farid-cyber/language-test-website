import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdYdzrO7dRJh8JKvzxOQhbfRuE6O97iQo",
  authDomain: "language-test-system.firebaseapp.com",
  projectId: "language-test-system",
  storageBucket: "language-test-system.firebasestorage.app",
  messagingSenderId: "203440239824",
  appId: "1:203440239824:web:4582bf7357542372631ad5",
  measurementId: "G-M64QSNG8BH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
