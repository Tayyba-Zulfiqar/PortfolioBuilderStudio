import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from './Logo';
import Button from './Button';
import { useAuthStore } from '../../store/authStore';
import ConfirmationModal from './ConfirmationModal';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="header-wrapper">
      <div className="container navbar">
        {/* Left Side: Logo */}
        <Logo onClick={handleLogoClick} />

        {/* Center Navigation Links */}
        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/library" className="nav-link">My Library</Link>  {/* ✅ FIXED */}
              <Link to="/explore" className="nav-link">Explore</Link>
              <Link to="/analytics" className="nav-link">Analytics</Link>
            </>
          ) : (
            <>
              <a href="/#features" className="nav-link">Features</a>
              <a href="/#templates" className="nav-link">Templates</a>
              <Link to="/explore" className="nav-link">Explore</Link>
            </>
          )}
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {isAuthenticated ? (
            <Button variant="secondary" onClick={handleLogoutClick}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login" className="nav-login">
                Login
              </Link>
              <Link to="/signup">
                <Button variant="primary">Get started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
          <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none' }}></span>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/library" className="nav-link" onClick={() => setMobileMenuOpen(false)}>  {/* ✅ FIXED */}
                My Library
              </Link>
              <Link to="/explore" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Explore
              </Link>
              <Link to="/analytics" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Analytics
              </Link>
              <div className="mobile-divider"></div>
              <Button variant="secondary" onClick={handleLogoutClick} style={{ width: '100%' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <a href="/#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="/#templates" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Templates
              </a>
              <Link to="/explore" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Explore
              </Link>
              <div className="mobile-divider"></div>
              <Link to="/login" className="nav-login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" style={{ width: '100%' }}>Get started</Button>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Reusable Confirmation Modal for Logout */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        title="Log Out? 🌸"
        message="You're about to log out. Any unsaved changes will be lost."
        confirmText="Logout"
        cancelText="Stay"
        variant="default"
      />
    </header>
  );
};

export default Header;