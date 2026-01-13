import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with actual config from Firebase Console
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "pawmatch-app.firebaseapp.com",
    projectId: "pawmatch-app",
    storageBucket: "pawmatch-app.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
