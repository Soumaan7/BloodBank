import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiCmDiJkvHx2wTiB61qAHy6spkM75qw18",
  authDomain: "bloodbank-b4fd9.firebaseapp.com",
  projectId: "bloodbank-b4fd9",
  storageBucket: "bloodbank-b4fd9.appspot.com", // ✅ Corrected
  messagingSenderId: "172520327730",
  appId: "1:172520327730:web:6738f58c880d211b5aca2b",
  measurementId: "G-5Q0VQQPW1C",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const isAdmin = (email: string | null | undefined) => {
  const adminEmails = ["admin@bloodconnect.com"];
  return email ? adminEmails.includes(email) : false;
};

export default app;
