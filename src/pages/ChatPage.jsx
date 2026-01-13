import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft } from 'lucide-react';
import './ChatPage.css';

const MOCK_MESSAGES = [
    { id: 1, text: 'Hi! Your dog is so cute!', sender: 'them' },
    { id: 2, text: 'Thanks! He loves to play fetch.', sender: 'me' },
    { id: 3, text: 'Mine too! We should meet up at the park sometime.', sender: 'them' },
];

const ChatPage = ({ onBack }) => {
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: input,
            sender: 'me'
        };

        setMessages([...messages, newMessage]);
        setInput('');
    };

    return (
        <div className="chat-page">
            <header className="chat-header">
                <button className="back-btn" onClick={() => onBack && onBack('matches')}>
                    <ChevronLeft size={24} />
                </button>
                <div className="chat-user-info">
                    <img
                        src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=100"
                        alt="Dog"
                        className="chat-avatar"
                    />
                    <h3>Barnaby</h3>
                </div>
            </header>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" disabled={!input.trim()}>
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatPage;
