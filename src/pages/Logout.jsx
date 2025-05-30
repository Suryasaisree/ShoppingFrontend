// src/pages/Logout.jsx
import { useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      alert(error.message);
    });
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
