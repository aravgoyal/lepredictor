import React, { useState } from 'react';
import { register } from './authFeatures';

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = () => {
        try {
            register(email, password, confirm);
        } catch (error) {
            setMessage("Error registering: " + error);
        }
      };

    return (
    <div>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm Password" />
        <button onClick={handleRegister}>Register</button>
        <a>Already have an account? </a>
        <a href='/'>Login</a>
        {message && <h3>{message}</h3>}
    </div>
    );
}