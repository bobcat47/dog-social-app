import React from 'react';
import './MatchesPage.css';

const MOCK_MATCHES = [
    { id: 1, name: 'Luna', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200', lastMessage: 'Bark bark!' },
    { id: 3, name: 'Rocky', image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=200', lastMessage: 'See you at the park?' },
    { id: 4, name: 'Bella', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200', lastMessage: 'New match! Say hello.' },
];

import NotificationService from '../services/NotificationService';

const MatchesPage = ({ setActiveTab }) => {
    const handleSimulateMatch = async () => {
        // Pick a random dog name
        const names = ['Barnaby', 'Luna', 'Rocky', 'Coco', 'Max'];
        const randomName = names[Math.floor(Math.random() * names.length)];

        await NotificationService.schedule(
            'New Match! 🎉',
            `You matched with ${randomName}. Say hello!`,
            'match',
            { user: randomName }
        );
        alert('Notification triggered! Check your device notification center or the Activity tab.');
    };

    return (
        <div className="matches-page">
            <header className="page-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Matches</h1>
                        <p>Your furry friends</p>
                    </div>
                    <button onClick={handleSimulateMatch} style={{ padding: '8px', fontSize: '12px', background: '#eee', border: 'none', borderRadius: '8px' }}>
                        Simulate Match
                    </button>
                </div>
            </header>

            <div className="matches-grid">
                <div className="matches-row">
                    {MOCK_MATCHES.map(dog => (
                        <div key={dog.id} className="match-circle" onClick={() => setActiveTab('chat')}>
                            <img src={dog.image} alt={dog.name} />
                            <span>{dog.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="messages-section">
                <h3>Messages</h3>
                <div className="message-list">
                    {MOCK_MATCHES.map(dog => (
                        <div key={dog.id} className="message-item" onClick={() => setActiveTab('chat')}>
                            <img src={dog.image} alt={dog.name} className="avatar-sm" />
                            <div className="message-info">
                                <h4>{dog.name}</h4>
                                <p>{dog.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatchesPage;
