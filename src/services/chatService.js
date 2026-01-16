import { db } from './firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    query,
    orderBy,
    onSnapshot,
    limit,
    serverTimestamp
} from 'firebase/firestore';

/**
 * Chat Service - Manages chat messages in Firestore
 * Collection: 'chats/{matchId}/messages'
 */
export const chatService = {
    /**
     * Send a message in a match conversation
     */
    async sendMessage(matchId, senderId, text) {
        const messagesRef = collection(db, 'chats', matchId, 'messages');

        const message = {
            senderId,
            text,
            createdAt: new Date().toISOString(),
            read: false
        };

        const docRef = await addDoc(messagesRef, message);

        // Update last message on match document
        const matchRef = doc(db, 'matches', matchId);
        await updateDoc(matchRef, {
            lastMessage: text,
            lastMessageAt: new Date().toISOString()
        });

        return { id: docRef.id, ...message };
    },

    /**
     * Get messages for a conversation
     */
    async getMessages(matchId, limitCount = 50) {
        const messagesRef = collection(db, 'chats', matchId, 'messages');
        const q = query(
            messagesRef,
            orderBy('createdAt', 'asc'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);
        const messages = [];

        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });

        return messages;
    },

    /**
     * Subscribe to messages in real-time
     */
    subscribeToMessages(matchId, callback) {
        const messagesRef = collection(db, 'chats', matchId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        return onSnapshot(q, (snapshot) => {
            const messages = [];
            snapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            callback(messages);
        });
    },

    /**
     * Get match details including partner profile
     */
    async getMatchWithPartner(matchId, currentUserId) {
        const matchRef = doc(db, 'matches', matchId);
        const matchSnap = await getDoc(matchRef);

        if (!matchSnap.exists()) {
            return null;
        }

        const match = { id: matchSnap.id, ...matchSnap.data() };

        // Find the partner's ID (the other user in the match)
        const partnerId = match.users.find(id => id !== currentUserId);

        // Get partner's profile
        const partnerRef = doc(db, 'profiles', partnerId);
        const partnerSnap = await getDoc(partnerRef);

        if (partnerSnap.exists()) {
            match.partner = { id: partnerSnap.id, ...partnerSnap.data() };
        }

        return match;
    },

    /**
     * Check if partner is a bot (for AI responses)
     */
    async isPartnerBot(matchId, currentUserId) {
        const match = await this.getMatchWithPartner(matchId, currentUserId);
        return match?.partner?.isBot === true;
    }
};
