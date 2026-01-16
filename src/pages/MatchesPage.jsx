import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { matchService } from '../services/matchService';
import { profileService } from '../services/profileService';
import { Loader } from 'lucide-react';
import './MatchesPage.css';

const MatchesPage = ({ setActiveTab, setSelectedMatch }) => {
    const { currentUser } = useAuth();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        // Subscribe to real-time match updates
        const unsubscribe = matchService.subscribeToMatches(
            currentUser.uid,
            async (matchList) => {
                // Enrich matches with partner profiles
                const enrichedMatches = await Promise.all(
                    matchList.map(async (match) => {
                        const partnerId = match.users.find(id => id !== currentUser.uid);
                        const partner = await profileService.getProfile(partnerId);
                        return { ...match, partner };
                    })
                );

                // Sort by most recent message
                enrichedMatches.sort((a, b) => {
                    if (!a.lastMessageAt) return 1;
                    if (!b.lastMessageAt) return -1;
                    return new Date(b.lastMessageAt) - new Date(a.lastMessageAt);
                });

                setMatches(enrichedMatches);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser]);

    const handleOpenChat = (match) => {
        if (setSelectedMatch) {
            setSelectedMatch(match);
        }
        setActiveTab('chat');
    };

    if (loading) {
        return (
            <div className="matches-page loading">
                <Loader size={48} className="spinner" />
                <p>Loading matches...</p>
            </div>
        );
    }

    if (matches.length === 0) {
        return (
            <div className="matches-page">
                <header className="page-header">
                    <h1>Matches</h1>
                    <p>Your furry friends</p>
                </header>
                <div className="empty-matches">
                    <h3>🐾 No matches yet</h3>
                    <p>Keep swiping to find your perfect playmate!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="matches-page">
            <header className="page-header">
                <h1>Matches</h1>
                <p>Your furry friends</p>
            </header>

            <div className="matches-grid">
                <div className="matches-row">
                    {matches.map(match => (
                        <div
                            key={match.id}
                            className="match-circle"
                            onClick={() => handleOpenChat(match)}
                        >
                            <img
                                src={match.partner?.image || 'https://via.placeholder.com/100'}
                                alt={match.partner?.name || 'Match'}
                            />
                            <span>{match.partner?.name || 'Unknown'}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="messages-section">
                <h3>Messages</h3>
                <div className="message-list">
                    {matches.map(match => (
                        <div
                            key={match.id}
                            className="message-item"
                            onClick={() => handleOpenChat(match)}
                        >
                            <img
                                src={match.partner?.image || 'https://via.placeholder.com/50'}
                                alt={match.partner?.name || 'Match'}
                                className="avatar-sm"
                            />
                            <div className="message-info">
                                <h4>{match.partner?.name || 'Unknown'}</h4>
                                <p>{match.lastMessage || 'New match! Say hello 👋'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatchesPage;
