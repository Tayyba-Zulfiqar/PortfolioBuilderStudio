
import { Link, NavLink } from 'react-router-dom';
import Button from '../Button';


const MobileNav = ({
    isAuthenticated,
    mobileMenuOpen,
    setMobileMenuOpen,
    handleLogoutClick,
    handleHomeClick,
    handleFeaturesClick,
    handleTemplatesClick,
    isHomeActive,
    isFeaturesActive,
    isTemplatesActive,
}) => {
    if (!mobileMenuOpen) return null;

    return (
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
    );
};

export default MobileNav;