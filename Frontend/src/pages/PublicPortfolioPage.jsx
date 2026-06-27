import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioAPI } from '../services/api';
import { ProfessionalTemplate, CreativeTemplate, MinimalTemplate } from '../templates/index';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './PublicPortfolioPage.css';

/**
 * Public portfolio page shown at /:username
 *
 * Fetches the user's active, published portfolio and renders it with the
 * appropriate template. If the portfolio is private or the user doesn't exist,
 * a friendly "not available" state is shown.
 *
 * Note: this route is always public (no auth), so the global Header nav is
 * still rendered by the Router. The portfolio itself fills the page below it.
 */
const PublicPortfolioPage = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await portfolioAPI.getPublicPortfolio(username);
        setPortfolio(response.data.data.portfolio);
      } catch (err) {
        console.error('Failed to fetch public portfolio:', err);
        setError(err.response?.data?.message || 'Portfolio not found');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPublicPortfolio();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="public-portfolio-loading">
        <LoadingSpinner />
        <p>Loading portfolio... 🌸</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="public-portfolio-error">
        <div className="public-portfolio-error__icon">🌷</div>
        <h2>Portfolio Not Available</h2>
        <p>
          {error ||
            "This portfolio doesn't exist or hasn't been published yet."}
        </p>
      </div>
    );
  }

  const template = portfolio.template || 'modern';

  const renderTemplate = () => {
    switch (template) {
      case 'professional':
      case 'modern':
        return <ProfessionalTemplate data={portfolio} />;
      case 'creative':
        return <CreativeTemplate data={portfolio} />;
      case 'minimal':
        return <MinimalTemplate data={portfolio} />;
      default:
        return <ProfessionalTemplate data={portfolio} />;
    }
  };

  return (
    <div className="public-portfolio-wrapper">
      <div className="public-portfolio-content">
        <div className="public-portfolio-container">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolioPage;
