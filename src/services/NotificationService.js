import { LocalNotifications } from '@capacitor/local-notifications';

const STORAGE_KEY = 'dog_social_notifications';

const NotificationService = {
    // Request permission to send notifications
    async requestPermissions() {
        const result = await LocalNotifications.requestPermissions();
        return result.display;
    },

    // Schedule a local notification
    async schedule(title, body, type = 'general', data = {}) {
        // 1. Create the native notification
        const id = new Date().getTime(); // Simple ID generation

        try {
            await LocalNotifications.schedule({
                notifications: [
                    {
                        title,
                        body,
                        id,
                        schedule: { at: new Date(Date.now() + 1000) }, // 1 second delay
                        sound: null,
                        attachments: null,
                        actionTypeId: "",
                        extra: {
                            type,
                            ...data
                        }
                    }
                ]
            });
        } catch (e) {
            console.warn('Notification scheduling failed (likely running on web):', e);
        }

        // 2. Persist to local storage for "In-App" history
        this.saveToHistory({
            id,
            title,
            body,
            type,
            time: 'Just now', // simplistic for now
            timestamp: Date.now(),
            read: false,
            data
        });

        return id;
    },

    // Save notification to localStorage
    saveToHistory(notification) {
        const history = this.getHistory();
        const newHistory = [notification, ...history];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));

        // Dispatch custom event so UI can update
        window.dispatchEvent(new Event('notification-update'));
    },

    // Get all notifications
    getHistory() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    // Mark all as read
    markAllAsRead() {
        const history = this.getHistory();
        const updated = history.map(n => ({ ...n, read: true }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('notification-update'));
    },

    // Clear all history (debug)
    clear() {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event('notification-update'));
    }
};

export default NotificationService;
