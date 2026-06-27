
import { NavLink } from 'react-router-dom';



const DesktopNav = ({ isAuthenticated, handleHomeClick, handleFeaturesClick, isHomeActive, isFeaturesActive }) => {
    return (
        <nav className="nav-links">
            {isAuthenticated ? (
                <>
                    <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                    <NavLink to="/library" className="nav-link">My Library</NavLink>
                    <NavLink to="/explore" className="nav-link">Explore</NavLink>
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
                    <NavLink to="/explore" className="nav-link">Explore</NavLink>
                </>
            )}
        </nav>
    );
};

export default DesktopNav;