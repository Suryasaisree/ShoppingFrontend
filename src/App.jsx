// App.jsx (or wherever your routes are configured)

import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Admin from './pages/Admin';
import UserLogin from './pages/Login';

import './pages/AdminAuth.css'; // 👈 Make sure this file exists

// 🔒 Protected route for admin
const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.isAdmin) {
    return <Navigate to="/admin-login" />;
  }
  return children;
};

// 🔐 Admin login component with back arrow
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('user', JSON.stringify({ isAdmin: true }));
      navigate('/admin');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="back-arrow" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-auth-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// ✅ Main App component
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
};

export default App;
