import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { X, Heart, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { profileService } from '../services/profileService';
import { matchService } from '../services/matchService';
import './DiscoverPage.css';

const DiscoverPage = () => {
    const { currentUser } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [matchPopup, setMatchPopup] = useState(null);

    useEffect(() => {
        loadProfiles();
    }, [currentUser]);

    const loadProfiles = async () => {
        if (!currentUser) return;

        setLoading(true);
        try {
            // Get IDs of profiles already swiped
            const swipedIds = await matchService.getSwipedProfileIds(currentUser.uid);

            // Get profiles excluding already swiped and self
            const discoverable = await profileService.getDiscoverProfiles(
                currentUser.uid,
                swipedIds
            );

            setProfiles(discoverable);
            setCurrentIndex(0);
        } catch (error) {
            console.error('Error loading profiles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSwipe = async (direction) => {
        const currentDog = profiles[currentIndex];
        if (!currentDog || !currentUser) return;

        const liked = direction === 'right';

        try {
            const result = await matchService.recordSwipe(
                currentUser.uid,
                currentDog.id,
                liked
            );

            if (result.matched) {
                // Show match popup
                setMatchPopup(currentDog);
                setTimeout(() => setMatchPopup(null), 3000);
            }
        } catch (error) {
            console.error('Error recording swipe:', error);
        }

        // Move to next profile
        if (currentIndex < profiles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Reload profiles when we've gone through all
            loadProfiles();
        }
    };

    if (loading) {
        return (
            <div className="discover-page loading">
                <Loader size={48} className="spinner" />
                <p>Finding dogs near you...</p>
            </div>
        );
    }

    const currentDog = profiles[currentIndex];

    if (!currentDog) {
        return (
            <div className="discover-page empty">
                <div className="empty-state">
                    <h2>🐕 No more dogs nearby!</h2>
                    <p>Check back later for new profiles.</p>
                    <button onClick={loadProfiles} className="refresh-btn">
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="discover-page">
            {matchPopup && (
                <div className="match-popup">
                    <h2>🎉 It's a Match!</h2>
                    <p>You and {matchPopup.name} liked each other!</p>
                </div>
            )}

            <div className="card-container">
                <ProfileCard dog={currentDog} />
            </div>

            <div className="action-buttons">
                <button
                    className="action-btn pass"
                    onClick={() => handleSwipe('left')}
                    aria-label="Pass"
                >
                    <X size={32} />
                </button>

                <button
                    className="action-btn like"
                    onClick={() => handleSwipe('right')}
                    aria-label="Like"
                >
                    <Heart size={32} fill="currentColor" />
                </button>
            </div>
        </div>
    );
};

export default DiscoverPage;
