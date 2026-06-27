import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProfessionalTemplate, CreativeTemplate, MinimalTemplate } from '../../templates/index';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './PreviewPage.css';

const PreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/portfolio/preview/${id}`);
        setPortfolio(response.data.data.portfolio);
      } catch (err) {
        console.error('Failed to fetch preview data:', err);
        setError(err.response?.data?.message || 'Failed to load preview');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPreviewData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="preview-page-loading">
        <LoadingSpinner />
        <p>Loading preview... 🌸</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="preview-page-error">
        <h2>Oops! 😢</h2>
        <p>{error || 'Portfolio not found'}</p>
        <button type="button" className="btn-back" onClick={() => navigate('/library')}>
          Go to Library
        </button>
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
    <div className="preview-page-wrapper">
      {/* Top Banner (read-only view header) */}
      <div className="preview-page-header-bar">
        <button type="button" className="preview-back-btn" onClick={() => navigate('/library')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Library
        </button>
        <div className="preview-banner-title">
          Viewing Portfolio: <strong>{portfolio.name}</strong> (Read-Only Preview) 🌸
        </div>
        <div style={{ width: '130px' }} /> {/* Spacer for centering title */}
      </div>

      {/* Rendered Template */}
      <div className="preview-page-content">
        <div className="preview-page-container">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
