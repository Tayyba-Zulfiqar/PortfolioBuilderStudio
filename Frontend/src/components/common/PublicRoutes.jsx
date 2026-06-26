import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const PublicRoutes = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    // If user is logged in, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoutes;