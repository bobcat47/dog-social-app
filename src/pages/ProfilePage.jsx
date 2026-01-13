import React, { useState } from 'react';
import { Camera, Edit2 } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        name: 'Barnaby',
        age: '3',
        breed: 'Golden Retriever',
        bio: 'Love tennis balls and swimming! Looking for a running buddy.',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile saved!');
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar-container">
                    <img src={profile.image} alt={profile.name} className="profile-avatar" />
                    <label htmlFor="avatar-upload" className="edit-avatar-btn">
                        <Camera size={20} />
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const url = URL.createObjectURL(e.target.files[0]);
                                setProfile(prev => ({ ...prev, image: url }));
                            }
                        }}
                    />
                </div>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={profile.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Breed</label>
                        <input
                            type="text"
                            name="breed"
                            value={profile.breed}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>

                <div className="settings-section">
                    <h3>Discovery Settings</h3>
                    <div className="setting-item">
                        <span>Maximum Distance</span>
                        <span>10 km</span>
                    </div>
                    <div className="setting-item">
                        <span>Age Range</span>
                        <span>1 - 5</span>
                    </div>
                </div>

                <button type="submit" className="save-btn">
                    Save Profile
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
