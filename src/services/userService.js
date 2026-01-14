import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const userService = {
    // Create or overwrite a user profile
    async createUserProfile(uid, data) {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, {
            ...data,
            id: uid,
            createdAt: new Date().toISOString()
        });
    },

    // Get a user profile by UID
    async getUserProfile(uid) {
        const userRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    },

    // Update specific fields
    async updateUserProfile(uid, data) {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
    }
};
