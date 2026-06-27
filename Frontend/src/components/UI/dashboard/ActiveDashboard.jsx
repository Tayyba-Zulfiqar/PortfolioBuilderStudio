import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { getPortfolioCompleteness, getTemplateLabel } from '../../../utils/portfolioUtils';
import DashboardLayout from './DashboardLayout';
import WelcomeHeader from './WelcomeHeader';
import Button from '../../common/Button';
import './ActiveDashboard.css';

const ClipboardIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6m-7 4h8m-8 4h5m-7 7h10a2 2 0 0 0 2-2V7.8a2 2 0 0 0-.59-1.41l-2.8-2.8A2 2 0 0 0 13.2 3H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const AddIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
  </svg>
);

const showToast = (msg) => {
  const el = document.createElement('div');
  el.className = 'bloom-toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('bloom-toast--show'));
  setTimeout(() => {
    el.classList.remove('bloom-toast--show');
    setTimeout(() => el.remove(), 300);
  }, 2800);
};

const ActiveDashboard = ({ portfolios }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    activePortfolioId,
    createNewPortfolio,
    isSaving,
  } = usePortfolioStore();

  const activePortfolio = portfolios.find(p => String(p._id) === String(activePortfolioId)) || portfolios[0];
  const completeness = getPortfolioCompleteness(activePortfolio);
  const isComplete = completeness.isComplete;

  const handleBuildNew = async () => {
    const res = await createNewPortfolio();
    if (res.success && res.portfolio) {
      showToast('Created a new empty portfolio.');
      navigate(`/settings/${res.portfolio._id}`);
    } else {
      showToast(res.error || 'Failed to create portfolio.');
    }
  };

  const getLastUpdated = (date) => {
    if (!date) return 'Not yet';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="active-dashboard">
        <WelcomeHeader
          tag={`welcome back, ${user?.username || 'lovely'}`}
          title={isComplete ? 'Your Portfolio is Complete!' : 'Your Portfolio is Active!'}
          subtitle={isComplete ? 'Amazing work! Your portfolio is fully built and ready.' : "Here's a quick glance at your beautiful portfolio in progress."}
        />

        <div className="dashboard-cards-grid">
          <div className="dashboard-card dashboard-card--portfolio">
            <div className="dashboard-card__icon-wrap">
              <span className="dashboard-card__icon"><ClipboardIcon /></span>
            </div>
            <h3 className="dashboard-card__title">Your Portfolio</h3>

            <div className="dashboard-card__meta">
              <div className="dashboard-card__meta-row">
                <span className="dashboard-card__label">Name</span>
                <span className="dashboard-card__value">{activePortfolio?.name || 'Untitled'}</span>
              </div>
              <div className="dashboard-card__meta-row">
                <span className="dashboard-card__label">Template</span>
                <span className="dashboard-card__value">
                  <span className="template-dot" style={{ background: activePortfolio?.theme?.primaryColor || '#F4A6B5' }} />
                  {getTemplateLabel(activePortfolio?.template)}
                </span>
              </div>
              <div className="dashboard-card__meta-row">
                <span className="dashboard-card__label">Status</span>
                <span className={`dashboard-card__value status-badge ${activePortfolio?.isPublished ? 'status-badge--published' : 'status-badge--draft'}`}>
                  {activePortfolio?.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="dashboard-card__meta-row">
                <span className="dashboard-card__label">Progress</span>
                <div className="dashboard-card__progress-mini">
                  <div className="dashboard-card__progress-bar">
                    <div
                      className="dashboard-card__progress-fill"
                      style={{ width: `${completeness.progress}%` }}
                    />
                  </div>
                  <span className="dashboard-card__progress-text">{completeness.progress}%</span>
                </div>
              </div>
              <div className="dashboard-card__meta-row">
                <span className="dashboard-card__label">Last Updated</span>
                <span className="dashboard-card__value">{getLastUpdated(activePortfolio?.updatedAt)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => navigate('/library')}
              icon={<ExternalLinkIcon />}
            >
              View Portfolio
            </Button>
          </div>

          <div className="dashboard-card dashboard-card--new">
            <div className="dashboard-card__icon-wrap dashboard-card__icon-wrap--new">
              <span className="dashboard-card__icon dashboard-card__icon--new"><PlusIcon /></span>
            </div>
            <h3 className="dashboard-card__title">Build a New Portfolio</h3>
            <p className="dashboard-card__description">
              Create a fresh portfolio from scratch. Start with a blank canvas and bring your ideas to life.
            </p>

            <Button
              variant="secondary"
              onClick={handleBuildNew}
              disabled={isSaving}
              icon={<AddIcon />}
            >
              {isSaving ? 'Creating...' : 'Start Building'}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActiveDashboard;
