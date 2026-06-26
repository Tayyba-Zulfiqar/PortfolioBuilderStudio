import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Header from './components/common/Header';
import PublicRoutes from './components/common/PublicRoutes';

// Import pages 
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/AuthPage/SignupPage';
import LoginPage from './pages/AuthPage/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import LibraryPage from './pages/LibraryPage/Library';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* Public Routes - Redirect to dashboard if logged in */}
                <Route path="/" element={
                    <PublicRoutes><LandingPage /></PublicRoutes>
                } />
                <Route path="/signup" element={
                    <PublicRoutes><SignupPage /></PublicRoutes>
                } />
                <Route path="/login" element={
                    <PublicRoutes><LoginPage /></PublicRoutes>
                } />

                {/* Protected Routes - Redirect to login if not logged in */}
                <Route path="/dashboard" element={
                    <ProtectedRoute><DashboardPage /></ProtectedRoute>
                } />
                <Route path="/library" element={
                    <ProtectedRoute><LibraryPage /></ProtectedRoute>
                } />
                <Route path="/analytics" element={
                    <ProtectedRoute><AnalyticsPage /></ProtectedRoute>
                } />
                <Route path="/settings" element={
                    <ProtectedRoute><SettingsPage /></ProtectedRoute>
                } />

                {/* Public Routes - Always accessible */}
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/:username" element={<PublicPortfolioPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;