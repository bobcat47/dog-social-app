import React, { createContext, useContext, useEffect, useState } from 'react';
import { subscribeToAuthChanges } from '../services/auth';
import { userService } from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges(async (user) => {
            setCurrentUser(user);
            if (user) {
                // Fetch profile
                try {
                    const profile = await userService.getUserProfile(user.uid);
                    setUserProfile(profile);
                } catch (error) {
                    console.error("Error fetching profile:", error);
                    setUserProfile(null);
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Helper to refresh profile (e.g. after creation)
    const refreshProfile = async () => {
        if (currentUser) {
            const profile = await userService.getUserProfile(currentUser.uid);
            setUserProfile(profile);
        }
    };

    const value = {
        currentUser,
        userProfile,
        refreshProfile,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
