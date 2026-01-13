import React from 'react';
import { MapPin, Info } from 'lucide-react';
import './ProfileCard.css';

const ProfileCard = ({ dog }) => {
    return (
        <div className="profile-card">
            <div
                className="card-image"
                style={{ backgroundImage: `url(${dog.image})` }}
            >
                <div className="card-overlay">
                    <div className="card-content">
                        <div className="card-header">
                            <h2>{dog.name}, {dog.age}</h2>
                            <button
                                className="info-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert(`More info about ${dog.name} coming soon!`);
                                }}
                            >
                                <Info size={20} color="white" />
                            </button>
                        </div>

                        <p className="breed">{dog.breed}</p>

                        <div className="location">
                            <MapPin size={16} />
                            <span>{dog.distance} km away</span>
                        </div>

                        {dog.bio && <p className="bio">"{dog.bio}"</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
