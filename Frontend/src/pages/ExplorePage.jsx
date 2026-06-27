import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioAPI } from '../services/api';
import { usePortfolioStore } from '../store/portfolioStore';
import { useAuthStore } from '../store/authStore';
import ExploreHero from '../components/UI/explore/ExploreHero';
import FeaturedPortfolios from '../components/UI/explore/FeaturedPortfolios';
import FullPreview from '../components/UI/editor/FullPreview';
import ConfirmationModal from '../components/common/ConfirmationModal';
import FloatingShapes from '../components/UI/landing-page/FloatingShapes';
import '../components/UI/explore/Explore.css';

const ExplorePage = () => {
    const navigate = useNavigate();
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { saveCommunityPortfolio, isSaving } = usePortfolioStore();
    const { isAuthenticated } = useAuthStore();

    const fetchExplorePortfolios = useCallback(async () => {
        try {
            setIsLoading(true);
            setError('');
            const response = await portfolioAPI.getExplorePortfolios();
            setPortfolios(response.data.data.portfolios || []);
        } catch (err) {
            console.error('Failed to load explore portfolios:', err);
            setError(err.response?.data?.message || 'Failed to load community portfolios');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExplorePortfolios();
    }, [fetchExplorePortfolios]);

    const handleSave = async (item) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        const result = await saveCommunityPortfolio(item._id);
        if (result.success) {
            setPortfolios((current) =>
                current.map((portfolio) =>
                    String(portfolio._id) === String(item._id) ? { ...portfolio, isSaved: true } : portfolio
                )
            );
        } else {
            setError(result.error || 'Failed to save portfolio');
        }
    };

    return (
        <main className="explore-page">
            <FloatingShapes />
            <ExploreHero />
            <FeaturedPortfolios
                portfolios={portfolios}
                isLoading={isLoading}
                error={error}
                onRetry={fetchExplorePortfolios}
                onView={setSelectedPortfolio}
                onSave={handleSave}
                isSaving={isSaving}
            />

            {selectedPortfolio && (
                <FullPreview
                    portfolio={selectedPortfolio}
                    onClose={() => setSelectedPortfolio(null)}
                    backLabel="Back to Explore"
                    title="Portfolio Full Preview"
                />
            )}

            <ConfirmationModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onConfirm={() => navigate('/login')}
                title="Log In Required 🌸"
                message="Please log in or sign up to save community portfolios to your library."
                confirmText="Log In"
                cancelText="Cancel"
                variant="default"
            />
        </main>
    );
};

export default ExplorePage;
