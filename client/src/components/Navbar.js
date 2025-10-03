// client/src/components/Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); // Force reload to clear state
  };

  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      {token ? (
        <>
          <NavLink to="/watch-later">Watch Later</NavLink>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;