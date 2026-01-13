import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { MOCK_DOGS } from '../mockData';
import { X, Heart } from 'lucide-react';
import './DiscoverPage.css';

const DiscoverPage = () => {
    // Simple index-based navigation for "swiping"
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentDog = MOCK_DOGS[currentIndex];

    const handleSwipe = (direction) => {
        // In a real app, we'd record the like/pass here
        console.log(`Swiped ${direction} on ${currentDog.name}`);

        // Move to next dog
        if (currentIndex < MOCK_DOGS.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            alert('No more dogs nearby!');
            // Reset for demo purposes
            setCurrentIndex(0);
        }
    };

    if (!currentDog) return <div>Loading...</div>;

    return (
        <div className="discover-page">
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
