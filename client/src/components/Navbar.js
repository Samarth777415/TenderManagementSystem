import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, ChevronDown, User } from 'lucide-react';
import { useAuth } from './AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(true);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <FileText size={24} />
        <Link to="/" className="logo">TenderVault</Link>
      </div>

      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/prising">Pricing</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/new-tender">Create Tender</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>

      <div className="nav-auth">
        {isAuthenticated ? (
          <div className="dropdown-container">
            <button 
              className="dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User className="mr-2" size={20} />
              Profile
              <ChevronDown className="ml-2" size={16} />
            </button>
            {(isDropdownOpen || !isMobileView) && (
              <div className={`dropdown-menu ${isMobileView ? 'mobile-dropdown' : ''}`}>
                
                <Link to="/personal-tenders">Personal Tenders</Link>
                
                <button className="dropdown-trigger" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="login-btn">Log in</Link>
            <Link to="/signup" className="signup-btn">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;