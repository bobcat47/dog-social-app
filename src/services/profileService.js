import { db } from './firebase';
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    query, 
    where, 
    orderBy, 
    limit 
} from 'firebase/firestore';

/**
 * Profile Service - Manages dog profiles in Firestore
 * Collection: 'profiles'
 */
export const profileService = {
    /**
     * Get all profiles except the current user's and already swiped profiles
     */
    async getDiscoverProfiles(currentUserId, excludeIds = []) {
        const profilesRef = collection(db, 'profiles');
        const snapshot = await getDocs(profilesRef);
        
        const profiles = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            // Exclude current user and already swiped profiles
            if (doc.id !== currentUserId && !excludeIds.includes(doc.id)) {
                profiles.push({ id: doc.id, ...data });
            }
        });
        
        return profiles;
    },

    /**
     * Get a single profile by ID
     */
    async getProfile(profileId) {
        const docRef = doc(db, 'profiles', profileId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },

    /**
     * Create or update a profile
     */
    async saveProfile(profileId, data) {
        const docRef = doc(db, 'profiles', profileId);
        await setDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    },

    /**
     * Get bot profiles (for AI matching)
     */
    async getBotProfiles(limitCount = 80) {
        const profilesRef = collection(db, 'profiles');
        const q = query(
            profilesRef, 
            where('isBot', '==', true),
            limit(limitCount)
        );
        const snapshot = await getDocs(q);
        
        const profiles = [];
        snapshot.forEach((doc) => {
            profiles.push({ id: doc.id, ...doc.data() });
        });
        
        return profiles;
    }
};
