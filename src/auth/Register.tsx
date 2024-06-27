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
        <div className="login-container">
        <h1>Register</h1>
        <input className='register-email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className='register-password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input className="register-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm Password" />
        <button className='register-button' onClick={handleRegister}>Register</button>
        <div className='login-account'>
          <a>Already have an account? </a>
          <a href='/'>Login</a>
        </div>
        {message && <h3>{message}</h3>}
      </div>
    );
}