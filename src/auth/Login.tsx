import React, { useState } from 'react';
import { login } from './authFeatures';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    try {
      login(email, password);
    } catch (error) {
      setMessage("Error logging in: " + error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <a>Don't have an account? </a>
      <a href='/register'>Register</a>
      {message && <h3>{message}</h3>}
    </div>
  );
};

