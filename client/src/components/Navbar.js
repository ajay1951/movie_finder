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
    window.location.reload(); // Force reload to clear all state
  };

  return (
    <nav className="navbar">
      {/* --- Left Side of Navbar --- */}
      <div className="navbar-left">
        <NavLink to="/">Home</NavLink>
        {/* Conditionally render the "Watch Later" link only if logged in */}
        {token && (
          <NavLink to="/watch-later">Watch Later</NavLink>
        )}
      </div>

      {/* --- Right Side of Navbar --- */}
      <div className="navbar-right">
        {token ? (
          // If logged in, show the Logout button
          <button onClick={onLogout} className="logout-btn">Logout</button>
        ) : (
          // If not logged in, show Login and Register links
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;