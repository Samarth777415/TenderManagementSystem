import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthToggle = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <h3 className="logo">TenderSystem</h3>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
        <Link to="/" className="home">
          <li>Home</li>
        </Link>
        <Link to="/about" className="about">
          <li>About</li>
        </Link>
        <Link to="/contact" className="contact">
          <li>Contact</li>
        </Link>
        {!isAuthenticated ? (
          <Link to="/login" className="login">
            <li>Login</li>
          </Link>
        ) : (
          <>
            <Link to="/new-tender" className="create-tender">
              <li>Create Tender</li>
            </Link>
            <Link to="/dashboard" className="dashboard">
              <li>Dashboard</li>
            </Link>
            <li className="logout" onClick={handleAuthToggle}>
              Logout
            </li>
          </>
        )}
        
      </ul>
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
    </nav>
  );
};

export default Navbar;
