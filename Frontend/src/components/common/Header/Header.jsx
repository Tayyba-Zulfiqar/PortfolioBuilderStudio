import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import Logo from '../Logo';
import ConfirmationModal from '../ConfirmationModal';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import NavActions from './NavActions';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const currentHash = location.hash;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { isAuthenticated, logout, user } = useAuthStore();

    // Check active states
    const isHomeActive = currentPath === '/' && !currentHash;
    const isFeaturesActive = currentPath === '/' && currentHash === '#features';
    const isTemplatesActive = currentPath === '/' && currentHash === '#templates';

    // --- Handlers ---
    const handleLogoClick = () => {
        if (currentPath === '/' && !currentHash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
        setMobileMenuOpen(false);
    };

    const handleLogoutClick = () => setShowLogoutModal(true);

    const handleConfirmLogout = () => {
        logout();
        setShowLogoutModal(false);
        setMobileMenuOpen(false);
        navigate('/');
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        window.history.pushState(null, '', '/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    const handleFeaturesClick = (e) => {
        e.preventDefault();
        window.history.pushState(null, '', '/#features');
        const element = document.getElementById('features');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    const handleTemplatesClick = (e) => {
        e.preventDefault();
        window.history.pushState(null, '', '/#templates');
        const element = document.getElementById('templates');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    // --- Effects ---
    useEffect(() => {
        if (currentPath === '/' && !currentHash) {
            window.scrollTo({ top: 0 });
        }

        if (currentPath === '/' && currentHash) {
            const element = document.getElementById(currentHash.replace('#', ''));
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [currentPath, currentHash]);

    // --- Render ---
    return (
        <header className="header-wrapper">
            <div className="container navbar">
                <Logo onClick={handleLogoClick} />

                <DesktopNav
                    isAuthenticated={isAuthenticated}
                    handleHomeClick={handleHomeClick}
                    handleFeaturesClick={handleFeaturesClick}
                    handleTemplatesClick={handleTemplatesClick}
                    isHomeActive={isHomeActive}
                    isFeaturesActive={isFeaturesActive}
                    isTemplatesActive={isTemplatesActive}
                />

                <NavActions
                    isAuthenticated={isAuthenticated}
                    handleLogoutClick={handleLogoutClick}
                />

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

            <MobileNav
                isAuthenticated={isAuthenticated}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                handleLogoutClick={handleLogoutClick}
                handleHomeClick={handleHomeClick}
                handleFeaturesClick={handleFeaturesClick}
                handleTemplatesClick={handleTemplatesClick}
                isHomeActive={isHomeActive}
                isFeaturesActive={isFeaturesActive}
                isTemplatesActive={isTemplatesActive}
            />

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