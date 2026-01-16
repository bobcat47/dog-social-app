/**
 * Seed Script: Generate 80 AI Test Dog Profiles
 * Run with: node scripts/seedProfiles.mjs
 * 
 * Prerequisites:
 * 1. Firebase Admin SDK initialized
 * 2. Service account key at ./serviceAccountKey.json
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, existsSync } from 'fs';

// Check for service account key
const keyPath = './serviceAccountKey.json';
if (!existsSync(keyPath)) {
    console.log(`
=================================================================
SERVICE ACCOUNT KEY REQUIRED
=================================================================
To run this script, you need a Firebase service account key:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save as: ${keyPath}
4. Run this script again

Or use the Firebase Console to manually add profiles.
=================================================================
`);
    process.exit(1);
}

// Initialize Firebase Admin
const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf8'));
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

// Dog breed database with realistic characteristics
const DOG_BREEDS = [
    { breed: 'Golden Retriever', energy: 'high', size: 'large', traits: ['friendly', 'loyal', 'playful'] },
    { breed: 'French Bulldog', energy: 'low', size: 'small', traits: ['affectionate', 'adaptable', 'snuggly'] },
    { breed: 'German Shepherd', energy: 'high', size: 'large', traits: ['intelligent', 'protective', 'confident'] },
    { breed: 'Labrador Retriever', energy: 'high', size: 'large', traits: ['outgoing', 'active', 'family-friendly'] },
    { breed: 'Beagle', energy: 'medium', size: 'medium', traits: ['curious', 'merry', 'friendly'] },
    { breed: 'Poodle', energy: 'medium', size: 'medium', traits: ['smart', 'proud', 'elegant'] },
    { breed: 'Bulldog', energy: 'low', size: 'medium', traits: ['calm', 'courageous', 'loyal'] },
    { breed: 'Rottweiler', energy: 'medium', size: 'large', traits: ['confident', 'loyal', 'loving'] },
    { breed: 'Yorkshire Terrier', energy: 'medium', size: 'small', traits: ['feisty', 'affectionate', 'sprightly'] },
    { breed: 'Boxer', energy: 'high', size: 'large', traits: ['fun-loving', 'bright', 'active'] },
    { breed: 'Dachshund', energy: 'medium', size: 'small', traits: ['clever', 'spunky', 'curious'] },
    { breed: 'Siberian Husky', energy: 'high', size: 'large', traits: ['outgoing', 'mischievous', 'loyal'] },
    { breed: 'Great Dane', energy: 'medium', size: 'giant', traits: ['friendly', 'patient', 'dependable'] },
    { breed: 'Doberman Pinscher', energy: 'high', size: 'large', traits: ['loyal', 'fearless', 'alert'] },
    { breed: 'Shih Tzu', energy: 'low', size: 'small', traits: ['affectionate', 'playful', 'outgoing'] },
    { breed: 'Australian Shepherd', energy: 'high', size: 'medium', traits: ['smart', 'work-oriented', 'exuberant'] },
    { breed: 'Cavalier King Charles Spaniel', energy: 'medium', size: 'small', traits: ['gentle', 'graceful', 'affectionate'] },
    { breed: 'Pomeranian', energy: 'medium', size: 'small', traits: ['lively', 'bold', 'inquisitive'] },
    { breed: 'Boston Terrier', energy: 'medium', size: 'small', traits: ['friendly', 'bright', 'amusing'] },
    { breed: 'Border Collie', energy: 'high', size: 'medium', traits: ['smart', 'energetic', 'athletic'] }
];

// Dog name database
const DOG_NAMES = [
    'Max', 'Bella', 'Charlie', 'Luna', 'Cooper', 'Daisy', 'Buddy', 'Sadie', 'Rocky', 'Lucy',
    'Bear', 'Molly', 'Duke', 'Bailey', 'Tucker', 'Maggie', 'Jack', 'Sophie', 'Oliver', 'Chloe',
    'Murphy', 'Penny', 'Leo', 'Zoey', 'Winston', 'Stella', 'Teddy', 'Lily', 'Bentley', 'Rosie',
    'Milo', 'Ruby', 'Zeus', 'Lola', 'Oscar', 'Gracie', 'Bruno', 'Coco', 'Archie', 'Willow',
    'Louie', 'Pepper', 'Henry', 'Nala', 'Gus', 'Ellie', 'Sam', 'Hazel', 'Beau', 'Abby',
    'Finn', 'Piper', 'Apollo', 'Roxy', 'Ollie', 'Ginger', 'Ace', 'Scout', 'Blu', 'Millie',
    'Rex', 'Winnie', 'Rusty', 'Emma', 'Thor', 'Belle', 'Jasper', 'Maddie', 'Koda', 'Layla',
    'Bandit', 'Annie', 'Toby', 'Remi', 'Jackson', 'Dixie', 'Riley', 'Harper', 'Harley', 'Athena'
];

// Curated dog images from Unsplash (diverse, high quality)
const DOG_IMAGES = [
    'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1587560699334-bea93391dcef?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=800'
];

// Bio templates for variety
const BIO_TEMPLATES = [
    "Love long walks and belly rubs! Looking for a friend to explore the park with.",
    "Tennis balls are my weakness. I could play fetch all day!",
    "They say I'm a good boy. Want to find out? 🐾",
    "Just a pupper looking for my best friend. I promise to share my toys!",
    "Beach lover and professional stick collector. Let's go on an adventure!",
    "I give the best snuggles. Couch potato looking for a cuddle buddy.",
    "Certified tail-wagger and treat enthusiast. Let's be friends!",
    "I've been told I'm very photogenic. Swipe right to see more!",
    "Looking for someone to share sunny afternoon naps with.",
    "My hobbies include chasing squirrels and making new friends.",
    "Professional zoomies champion. Can you keep up?",
    "I believe every walk should be an adventure. Join me!",
    "They call me the neighborhood greeter. I love making new friends!",
    "Part-time lap dog, full-time best friend material.",
    "I've mastered sit, stay, and steal hearts. 💕",
    "Adventure buddy seeking partner in crime for park shenanigans.",
    "My love language is treats and head scratches.",
    "Early morning walks and evening snuggles - that's my perfect day!",
    "Warning: May cause excessive happiness and tail wags.",
    "Looking for a friend who appreciates a good nap and better treats."
];

// Personality traits for AI conversation context
const PERSONALITY_TYPES = [
    { type: 'playful', phrases: ['Wanna play?', 'I love games!', 'Chase me!'], emoji: '🎾' },
    { type: 'cuddly', phrases: ['Snuggle time?', 'I give great hugs!', 'Couch buddy!'], emoji: '🤗' },
    { type: 'adventurous', phrases: ['Let\'s explore!', 'New trails?', 'Adventure awaits!'], emoji: '🏔️' },
    { type: 'foodie', phrases: ['Treats?', 'Snack time!', 'I love food!'], emoji: '🦴' },
    { type: 'social', phrases: ['Let\'s meet!', 'Park date?', 'Make friends!'], emoji: '🐕' },
    { type: 'calm', phrases: ['Peaceful walks?', 'Quiet time', 'Relax with me'], emoji: '😌' },
    { type: 'energetic', phrases: ['Zoomies!', 'Run with me!', 'So much energy!'], emoji: '⚡' },
    { type: 'loyal', phrases: ['Best friends!', 'I\'ll always be there', 'Forever pals'], emoji: '❤️' }
];

function generateProfile(index) {
    const name = DOG_NAMES[index % DOG_NAMES.length];
    const breedInfo = DOG_BREEDS[index % DOG_BREEDS.length];
    const image = DOG_IMAGES[index % DOG_IMAGES.length];
    const bio = BIO_TEMPLATES[index % BIO_TEMPLATES.length];
    const personality = PERSONALITY_TYPES[index % PERSONALITY_TYPES.length];
    const age = Math.floor(Math.random() * 12) + 1; // 1-12 years
    const distance = (Math.random() * 10).toFixed(1); // 0-10 miles

    return {
        name,
        breed: breedInfo.breed,
        age,
        bio,
        image,
        distance: parseFloat(distance),
        isBot: true,
        personality: personality.type,
        traits: breedInfo.traits,
        energy: breedInfo.energy,
        size: breedInfo.size,
        aiContext: {
            personality: personality.type,
            commonPhrases: personality.phrases,
            emoji: personality.emoji,
            breed: breedInfo.breed,
            traits: breedInfo.traits
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}

async function seedProfiles() {
    console.log('🐕 Starting to seed 80 AI dog profiles...\n');

    const batch = db.batch();
    const profiles = [];

    for (let i = 0; i < 80; i++) {
        const profile = generateProfile(i);
        const docRef = db.collection('profiles').doc(`bot_${i.toString().padStart(3, '0')}`);
        batch.set(docRef, profile);
        profiles.push(profile);
        console.log(`  Created: ${profile.name} the ${profile.breed} (${profile.personality})`);
    }

    try {
        await batch.commit();
        console.log('\n✅ Successfully seeded 80 AI dog profiles!');
        console.log('\nProfile summary:');
        console.log(`  - Total: 80 profiles`);
        console.log(`  - Ages: 1-12 years`);
        console.log(`  - Distances: 0-10 miles`);
        console.log(`  - All marked as isBot: true`);
        console.log('\nYou can now run the app and see these profiles in Discover!');
    } catch (error) {
        console.error('❌ Error seeding profiles:', error);
        process.exit(1);
    }
}

seedProfiles();
