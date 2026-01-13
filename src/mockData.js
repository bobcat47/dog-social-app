export const MOCK_DOGS = [
    {
        id: 1,
        name: 'Barnaby',
        age: 3,
        breed: 'Golden Retriever',
        distance: 2.5,
        bio: 'Love tennis balls and swimming! Looking for a running buddy.',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        name: 'Luna',
        age: 2,
        breed: 'French Bulldog',
        distance: 0.8,
        bio: 'Small but mighty. I snore a little bit.',
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        name: 'Rocky',
        age: 5,
        breed: 'German Shepherd',
        distance: 5.1,
        bio: 'Very well trained. I fetch anything.',
        image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800'
    }
];

export const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'like',
        user: 'Luna',
        userImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
        content: 'liked your photo',
        time: '2m ago',
        read: false
    },
    {
        id: 2,
        type: 'match',
        user: 'Rocky',
        userImage: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800',
        content: 'It\'s a match! Say hello 👋',
        time: '1h ago',
        read: false
    },
    {
        id: 3,
        type: 'message',
        user: 'Barnaby',
        userImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
        content: 'sent you a message',
        time: '3h ago',
        read: true
    }
];
