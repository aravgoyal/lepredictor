import React, { useState } from 'react';
import { login } from './authFeatures';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      setMessage("Invalid credentials");
    }
  };
  
  const handleReset = () => {
    window.location.href = "/ResetPassword";
  }

  return (
    <div className="login-container">
      <h1>Momentum</h1>
      <input className='login-email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className='login-password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className='login-button' onClick={handleLogin}>Login</button>
      <div className='register-account'>
        <a onClick={handleReset}>Forgot Password?</a>
        <br />
        <br />
        <a>Don't have an account? </a>
        <a href='/register'>Register</a>
      </div>
      {message && <h3>{message}</h3>}
    </div>
  );
};

