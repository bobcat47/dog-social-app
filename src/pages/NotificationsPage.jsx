import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Star, Bell } from 'lucide-react';
import NotificationService from '../services/NotificationService';
import './NotificationsPage.css';

const NotificationItem = ({ notification }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'like': return <Heart size={16} fill="var(--primary)" />;
            case 'match': return <Star size={16} fill="#FFD700" color="#FFD700" />;
            case 'message': return <MessageCircle size={16} />;
            default: return <Bell size={16} />;
        }
    };

    return (
        <div className={`notification-item ${!notification.read ? 'unread' : ''}`}>
            {notification.userImage ? (
                <img src={notification.userImage} alt={notification.user || 'User'} className="notification-avatar" />
            ) : (
                <div className="notification-avatar" style={{ backgroundColor: '#ddd' }} />
            )}

            <div className="notification-content">
                <div className="notification-text">
                    {notification.user && <span className="user-name">{notification.user} </span>}
                    {notification.body || notification.content}
                </div>
                <div className="notification-time">{notification.time}</div>
            </div>
            <div className="notification-icon">
                {getIcon()}
            </div>
        </div>
    );
};

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);

    const loadNotifications = () => {
        setNotifications(NotificationService.getHistory());
    };

    useEffect(() => {
        loadNotifications();

        // Listen for new notifications
        window.addEventListener('notification-update', loadNotifications);
        return () => window.removeEventListener('notification-update', loadNotifications);
    }, []);

    const handleMarkAllRead = () => {
        NotificationService.markAllAsRead();
    };

    return (
        <div className="notifications-page">
            <div className="notifications-header">
                <h2>Notifications</h2>
                <button className="mark-read-btn" onClick={handleMarkAllRead}>Mark all as read</button>
            </div>
            <div className="notifications-list">
                {notifications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        No notifications yet
                    </div>
                ) : (
                    notifications.map(notification => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
