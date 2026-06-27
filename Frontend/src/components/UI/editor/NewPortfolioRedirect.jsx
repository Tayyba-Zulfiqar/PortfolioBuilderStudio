import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioStore } from '../../../store/portfolioStore';
import LoadingSpinner from '../../common/LoadingSpinner';

/**
 * /portfolio/new
 *
 * Creates a brand-new empty portfolio in the backend on mount, then redirects
 * the user into the editor at /settings/:id. Shows a friendly loader while the
 * portfolio is being created.
 *
 * This keeps the "new portfolio" flow explicit via its own route while reusing
 * the existing SettingsPage / EditorLayout for the actual editing experience.
 */
const NewPortfolioRedirect = () => {
  const navigate = useNavigate();
  const { createNewPortfolio } = usePortfolioStore();
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const run = async () => {
      const res = await createNewPortfolio();
      if (!active) return;
      if (res.success && res.portfolio?._id) {
        navigate(`/settings/${res.portfolio._id}`, { replace: true });
      } else {
        setError(res.error || 'Failed to create portfolio');
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [createNewPortfolio, navigate]);

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          gap: '1rem',
        }}
      >
        <p style={{ fontFamily: 'var(--font-sans)', color: '#c93b4e' }}>{error} 😢</p>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{
            fontFamily: 'var(--font-sans)',
            background: 'var(--color-bloom-pink)',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '10px 22px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        gap: '1rem',
      }}
    >
      <LoadingSpinner />
      <p style={{ fontFamily: 'var(--font-sans)', color: '#685B5B' }}>
        Preparing a fresh canvas for you... 🌸
      </p>
    </div>
  );
};

export default NewPortfolioRedirect;
