import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleAdminRedirect = () => {
    navigate('/admin-login');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          pattern=".{8,}"
          title="Password must be at least 8 characters long"
        />
        <button type="submit">Login</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <button onClick={handleGoogleLogin} className="google-btn">
        Sign in with Google
      </button>

      <p>
        Don't have an account?{' '}
        <span onClick={handleSignupRedirect} className="nav-link">
          Sign up
        </span>
      </p>

      {/* ✅ Admin login button */}
      <p>
        Are you an admin?{' '}
        <span onClick={handleAdminRedirect} className="nav-link">
          Admin Login
        </span>
      </p>
    </div>
  );
};

export default Login;
