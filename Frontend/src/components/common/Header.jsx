import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const currentPath = location.pathname;
  const currentHash = location.hash;

  // Handle logo click - always navigate to home
  const handleLogoClick = () => {
    if (currentPath === '/' && !currentHash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setMobileMenuOpen(false);
  };

  // Handle logout modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  // Handle Home navigation - scrolls to top if already on home
  const handleHomeClick = (e) => {
    e.preventDefault();
    // Update the URL without hash
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Handle Features navigation with hash
  const handleFeaturesClick = (e) => {
    e.preventDefault();
    // Update the URL with hash
    window.history.pushState(null, '', '/#features');
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Handle Templates navigation with hash
  const handleTemplatesClick = (e) => {
    e.preventDefault();
    // Update the URL with hash
    window.history.pushState(null, '', '/#templates');
    const templatesSection = document.getElementById('templates');
    if (templatesSection) {
      templatesSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Reset scroll position when navigating to home from other pages
  useEffect(() => {
    // If we just navigated to home and there's no hash, scroll to top
    if (currentPath === '/' && !currentHash) {
      window.scrollTo({ top: 0 });
    }

    // If we navigated to home with a hash, scroll to that element
    if (currentPath === '/' && currentHash) {
      const element = document.getElementById(currentHash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [currentPath, currentHash]);

  // Check if a nav link should be active
  const isHomeActive = currentPath === '/' && !currentHash;
  const isFeaturesActive = currentPath === '/' && currentHash === '#features';
  const isTemplatesActive = currentPath === '/' && currentHash === '#templates';

  return (
    <header className="header-wrapper">
      <div className="container navbar">
        {/* Left Side: Logo */}
        <Logo onClick={handleLogoClick} />

        {/* Center Navigation Links */}
        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
              <NavLink to="/library" className="nav-link">My Library</NavLink>
              <NavLink to="/explore" className="nav-link">Explore</NavLink>
              <NavLink to="/analytics" className="nav-link">Analytics</NavLink>
            </>
          ) : (
            <>
              <a
                href="/"
                className={`nav-link ${isHomeActive ? 'active' : ''}`}
                onClick={handleHomeClick}
              >
                Home
              </a>
              <a
                href="/#features"
                className={`nav-link ${isFeaturesActive ? 'active' : ''}`}
                onClick={handleFeaturesClick}
              >
                Features
              </a>
              <a
                href="/#templates"
                className={`nav-link ${isTemplatesActive ? 'active' : ''}`}
                onClick={handleTemplatesClick}
              >
                Templates
              </a>
              <NavLink to="/explore" className="nav-link">Explore</NavLink>
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
              <NavLink to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/library" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                My Library
              </NavLink>
              <NavLink to="/explore" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Explore
              </NavLink>
              <NavLink to="/analytics" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Analytics
              </NavLink>
              <div className="mobile-divider"></div>
              <Button variant="secondary" onClick={handleLogoutClick} style={{ width: '100%' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <a
                href="/"
                className={`nav-link ${isHomeActive ? 'active' : ''}`}
                onClick={handleHomeClick}
              >
                Home
              </a>
              <a
                href="/#features"
                className={`nav-link ${isFeaturesActive ? 'active' : ''}`}
                onClick={handleFeaturesClick}
              >
                Features
              </a>
              <a
                href="/#templates"
                className={`nav-link ${isTemplatesActive ? 'active' : ''}`}
                onClick={handleTemplatesClick}
              >
                Templates
              </a>
              <NavLink to="/explore" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Explore
              </NavLink>
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