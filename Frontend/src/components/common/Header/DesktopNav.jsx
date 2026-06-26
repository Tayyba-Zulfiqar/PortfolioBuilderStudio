
import { NavLink } from 'react-router-dom';


const DesktopNav = ({ isAuthenticated, handleHomeClick, handleFeaturesClick, handleTemplatesClick, isHomeActive, isFeaturesActive, isTemplatesActive }) => {
    return (
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
    );
};

export default DesktopNav;