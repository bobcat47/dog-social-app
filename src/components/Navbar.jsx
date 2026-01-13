import React from 'react';
import { Heart, MessageCircle, User, Dog, Bell } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ activeTab, onTabChange }) => {
    return (
        <nav className="navbar">
            <button
                className={`nav-item ${activeTab === 'discover' ? 'active' : ''}`}
                onClick={() => onTabChange('discover')}
            >
                <Dog size={24} />
                <span>Discover</span>
            </button>

            <button
                className={`nav-item ${activeTab === 'matches' ? 'active' : ''}`}
                onClick={() => onTabChange('matches')}
            >
                <Heart size={24} />
                <span>Matches</span>
            </button>

            <button
                className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => onTabChange('chat')}
            >
                <MessageCircle size={24} />
                <span>Chat</span>
            </button>

            <button
                className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => onTabChange('notifications')}
            >
                <Bell size={24} />
                <span>Activity</span>
            </button>

            <button
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => onTabChange('profile')}
            >
                <User size={24} />
                <span>Profile</span>
            </button>
        </nav>
    );
};

export default Navbar;
