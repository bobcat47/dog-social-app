import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { chatService } from '../services/chatService';
import './ChatPage.css';

const ChatPage = ({ onBack, selectedMatch }) => {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    const matchId = selectedMatch?.id;
    const partner = selectedMatch?.partner;

    useEffect(() => {
        if (!matchId) {
            setLoading(false);
            return;
        }

        // Subscribe to real-time messages
        const unsubscribe = chatService.subscribeToMessages(matchId, (msgs) => {
            setMessages(msgs);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [matchId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || !matchId || !currentUser) return;

        setSending(true);
        try {
            await chatService.sendMessage(matchId, currentUser.uid, input.trim());
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    if (!matchId) {
        return (
            <div className="chat-page">
                <header className="chat-header">
                    <button className="back-btn" onClick={() => onBack && onBack('matches')}>
                        <ChevronLeft size={24} />
                    </button>
                    <div className="chat-user-info">
                        <h3>Select a match to chat</h3>
                    </div>
                </header>
                <div className="chat-messages empty">
                    <p>No conversation selected</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-page">
            <header className="chat-header">
                <button className="back-btn" onClick={() => onBack && onBack('matches')}>
                    <ChevronLeft size={24} />
                </button>
                <div className="chat-user-info">
                    <img
                        src={partner?.image || 'https://via.placeholder.com/100'}
                        alt={partner?.name || 'Match'}
                        className="chat-avatar"
                    />
                    <h3>{partner?.name || 'Unknown'}</h3>
                    {partner?.isBot && <span className="bot-badge">🤖</span>}
                </div>
            </header>

            <div className="chat-messages">
                {loading ? (
                    <div className="loading-messages">
                        <Loader size={24} className="spinner" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="no-messages">
                        <p>Say hello to {partner?.name}! 👋</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message-bubble ${msg.senderId === currentUser?.uid ? 'me' : 'them'}`}
                        >
                            {msg.text}
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={sending}
                />
                <button type="submit" disabled={!input.trim() || sending}>
                    {sending ? <Loader size={20} className="spinner" /> : <Send size={20} />}
                </button>
            </form>
        </div>
    );
};

export default ChatPage;
