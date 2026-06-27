import { useCallback, useEffect, useState } from 'react';
import { portfolioAPI } from '../services/api';
import ExploreHero from '../components/UI/explore/ExploreHero';
import FeaturedPortfolios from '../components/UI/explore/FeaturedPortfolios';
import FullPreview from '../components/UI/editor/FullPreview';
import '../components/UI/explore/Explore.css';

const ExplorePage = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

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

    return (
        <main className="explore-page">
            <ExploreHero />
            <FeaturedPortfolios
                portfolios={portfolios}
                isLoading={isLoading}
                error={error}
                onRetry={fetchExplorePortfolios}
                onView={setSelectedPortfolio}
            />

            {selectedPortfolio && (
                <FullPreview
                    portfolio={selectedPortfolio}
                    onClose={() => setSelectedPortfolio(null)}
                    backLabel="Back to Explore"
                    title="Portfolio Full Preview"
                />
            )}
        </main>
    );
};

export default ExplorePage;
