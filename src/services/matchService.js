import { db } from './firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';

/**
 * Match Service - Manages swipes and matches in Firestore
 * Collections: 'swipes', 'matches'
 */
export const matchService = {
    /**
     * Record a swipe (like or pass)
     * @param {string} swiperId - The user doing the swiping
     * @param {string} swipedId - The profile being swiped on
     * @param {boolean} liked - True if liked, false if passed
     */
    async recordSwipe(swiperId, swipedId, liked) {
        const swipeRef = doc(db, 'swipes', `${swiperId}_${swipedId}`);
        await setDoc(swipeRef, {
            swiperId,
            swipedId,
            liked,
            createdAt: new Date().toISOString()
        });

        // Check for mutual match if this is a like
        if (liked) {
            const mutualMatch = await this.checkMutualMatch(swiperId, swipedId);
            if (mutualMatch) {
                await this.createMatch(swiperId, swipedId);
                return { matched: true };
            }
        }
        return { matched: false };
    },

    /**
     * Check if the other user also liked this user
     */
    async checkMutualMatch(userId1, userId2) {
        const reverseSwipeRef = doc(db, 'swipes', `${userId2}_${userId1}`);
        const reverseSwipe = await getDoc(reverseSwipeRef);

        if (reverseSwipe.exists() && reverseSwipe.data().liked) {
            return true;
        }
        return false;
    },

    /**
     * Create a match between two users
     */
    async createMatch(userId1, userId2) {
        // Sort IDs to create consistent match ID
        const matchId = [userId1, userId2].sort().join('_');
        const matchRef = doc(db, 'matches', matchId);

        await setDoc(matchRef, {
            users: [userId1, userId2],
            createdAt: new Date().toISOString(),
            lastMessage: null,
            lastMessageAt: null
        });

        return matchId;
    },

    /**
     * Get all matches for a user
     */
    async getMatches(userId) {
        const matchesRef = collection(db, 'matches');
        const q = query(
            matchesRef,
            where('users', 'array-contains', userId),
            orderBy('lastMessageAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const matches = [];

        snapshot.forEach((doc) => {
            matches.push({ id: doc.id, ...doc.data() });
        });

        return matches;
    },

    /**
     * Get IDs of profiles the user has already swiped on
     */
    async getSwipedProfileIds(userId) {
        const swipesRef = collection(db, 'swipes');
        const q = query(swipesRef, where('swiperId', '==', userId));
        const snapshot = await getDocs(q);

        const swipedIds = [];
        snapshot.forEach((doc) => {
            swipedIds.push(doc.data().swipedId);
        });

        return swipedIds;
    },

    /**
     * Subscribe to matches in real-time
     */
    subscribeToMatches(userId, callback) {
        const matchesRef = collection(db, 'matches');
        const q = query(
            matchesRef,
            where('users', 'array-contains', userId)
        );

        return onSnapshot(q, (snapshot) => {
            const matches = [];
            snapshot.forEach((doc) => {
                matches.push({ id: doc.id, ...doc.data() });
            });
            callback(matches);
        });
    }
};
