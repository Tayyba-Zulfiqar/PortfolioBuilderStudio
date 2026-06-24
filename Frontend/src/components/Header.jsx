import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from './Logo';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header-wrapper">
      <div className="container navbar">
        {/* Left Side: Logo */}
        <Logo onClick={handleLogoClick} />

        {/* Center Navigation Links */}
        <nav className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#templates" className="nav-link">Templates</a>
          <Link to="/explore" className="nav-link">Explore</Link>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <Link to="/login" className="nav-login">
            Login
          </Link>
          <Link to="/signup">
            <Button variant="primary">Get started</Button>
          </Link>
        </div>

        {/* Responsive Mobile Menu Button */}
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

      {/* Mobile Drawer (Simplistic styling, hidden by default) */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-color)',
            borderBottom: '1px solid var(--border-light)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            zIndex: 99,
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <a
            href="#features"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'block', fontSize: '18px' }}
          >
            Features
          </a>
          <a
            href="#templates"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'block', fontSize: '18px' }}
          >
            Templates
          </a>
          <Link
            to="/explore"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'block', fontSize: '18px' }}
          >
            Explore
          </Link>
          <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '8px 0' }}></div>
          <Link
            to="/login"
            className="nav-login"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'block', fontSize: '18px', textAlign: 'center' }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'block' }}
          >
            <Button variant="primary" style={{ width: '100%' }}>Get started</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
