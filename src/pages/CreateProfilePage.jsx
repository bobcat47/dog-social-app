import React, { useState } from 'react';
import { userService } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';

const CreateProfilePage = () => {
    const { currentUser, refreshProfile } = useAuth();
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800'); // Default dog

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        try {
            await userService.createUserProfile(currentUser.uid, {
                name,
                breed,
                age: parseInt(age),
                bio,
                image
            });
            // Update context to trigger redirect to main app
            await refreshProfile();
        } catch (error) {
            console.error('Error creating profile:', error);
            alert('Failed to create profile');
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Create Your Profile</h1>
            <p style={{ marginBottom: '24px', color: '#666' }}>Tell us about your dog!</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Dog's Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        required
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Breed</label>
                    <input
                        type="text"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        required
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        required
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Photo URL</label>
                    <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        placeholder="https://..."
                    />
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Using a default image if left blank.</p>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px' }}
                        placeholder="What does your dog like?"
                    />
                </div>

                <button type="submit" style={{ marginTop: '16px', padding: '16px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                    Start Swiping
                </button>
            </form>
        </div>
    );
};

export default CreateProfilePage;
