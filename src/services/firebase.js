import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with actual config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAf841xzJamXVuWYfEJmkFIzY701xh11TQ",
    authDomain: "dog-social-antigravity.firebaseapp.com",
    projectId: "dog-social-antigravity",
    storageBucket: "dog-social-antigravity.firebasestorage.app",
    messagingSenderId: "166589699796",
    appId: "1:166589699796:web:c68a68170b173dd1410d41"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
