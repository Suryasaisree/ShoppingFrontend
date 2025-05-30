// Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import '../pages/Home.css';

const Navbar = ({ cartCount, onCartClick }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Get user display name or fallback to email prefix
  const getUserGreeting = () => {
    if (!user) return '';
    if (user.displayName) return `Hello, ${user.displayName}`;
    if (user.email) {
      const name = user.email.split('@')[0];
      return `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}`;
    }
    return 'Hello';
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);          // Sign the user out
      navigate('/login');           // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>🛒 ShopEase</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {!user ? (
          <>
            <button className="cart-button" onClick={() => navigate('/login')}>Login</button>
            <button className="cart-button" onClick={() => navigate('/signup')}>Signup</button>
          </>
        ) : (
          <>
            <span style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{getUserGreeting()}</span>
            <button className="cart-button" onClick={onCartClick}>
              View Cart ({cartCount})
            </button>
            <button className="cart-button" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
