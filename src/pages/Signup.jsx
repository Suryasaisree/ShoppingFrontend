// src/pages/Signup.jsx
import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      navigate('/login'); // Redirect to login after signup
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Redirect to home after Google signup
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
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

        <button type="submit">Sign Up</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <button onClick={handleGoogleSignup} className="google-btn">
        Sign up with Google
      </button>

      <p>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} className="nav-link">
          Login
        </span>
      </p>

      <p>
        Are you an admin?{' '}
        <span onClick={() => navigate('/admin-login')} className="nav-link">
          Admin Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
