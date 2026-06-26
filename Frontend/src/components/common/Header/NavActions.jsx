
import { Link } from 'react-router-dom';
import Button from '../Button';


const NavActions = ({ isAuthenticated, handleLogoutClick }) => {
    return (
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
    );
};

export default NavActions;