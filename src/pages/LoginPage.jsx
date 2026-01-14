import React, { useState } from 'react';
import { loginUser } from '../services/auth';
import { Dog } from 'lucide-react';
import '../components/Layout.css'; // Reuse basic styles

const LoginPage = ({ onNavigateSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
        } catch (err) {
            setError('Failed to login. Check your credentials.');
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <div style={{ marginBottom: '40px', color: 'var(--primary)' }}>
                <Dog size={64} />
            </div>
            <h1 style={{ marginBottom: '24px' }}>Welcome Back</h1>

            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    required
                />

                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

                <button type="submit" style={{ padding: '12px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>
                    Log In
                </button>
            </form>

            <p style={{ marginTop: '24px', color: '#666' }}>
                Don't have an account? <button onClick={onNavigateSignup} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</button>
            </p>
        </div>
    );
};

export default LoginPage;
