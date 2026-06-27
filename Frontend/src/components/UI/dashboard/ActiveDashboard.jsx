import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { getPortfolioCompleteness, getTemplateLabel } from '../../../utils/portfolioUtils';
import DashboardLayout from './DashboardLayout';
import WelcomeHeader from './WelcomeHeader';
import Button from '../../common/Button';
import ConfirmationModal from '../../common/ConfirmationModal';
import './ActiveDashboard.css';

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
    deleteUserPortfolio, 
    makePortfolioActive,
    isSaving 
  } = usePortfolioStore();

  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Find active portfolio
  const activePortfolio = portfolios.find(p => String(p._id) === String(activePortfolioId)) || portfolios[0];

  const completeness = getPortfolioCompleteness(activePortfolio);
  const isComplete = completeness.isComplete;

  const handleBuildNew = async () => {
    const res = await createNewPortfolio();
    if (res.success && res.portfolio) {
      showToast('Created new empty portfolio! 🌸');
      navigate(`/settings/${res.portfolio._id}`);
    } else {
      showToast(res.error || 'Failed to create portfolio 😢');
    }
  };

  const handleActivate = async (id, name) => {
    const res = await makePortfolioActive(id);
    if (res.success) {
      showToast(`"${name}" is now active! 🚀`);
    } else {
      showToast('Failed to change active portfolio 😢');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    const res = await deleteUserPortfolio(deleteTargetId);
    setIsDeleting(false);
    setDeleteTargetId(null);
    if (res.success) {
      showToast('Portfolio deleted! 🌸');
    } else {
      showToast(res.error || 'Failed to delete portfolio 😢');
    }
  };

  return (
    <DashboardLayout>
      <div className="active-dashboard">
        <WelcomeHeader
          tag={`welcome back, ${user?.username || 'lovely'}`}
          title={isComplete ? "Your Portfolio is Complete! 🎉" : "Your Portfolio is Active! 🌸"}
          subtitle={isComplete ? "Amazing work! Your portfolio is fully built and ready." : "Here's a quick glance at your beautiful portfolio in progress."}
        />

        {/* Active Portfolio Hero Card */}
        <div className="active-card">
          <div className="active-card__header">
            <span className="active-card__badge">Active Portfolio</span>
            <h2 className="active-card__title">{activePortfolio?.name}</h2>
          </div>
          
          <div className="active-stats">
            <div className="stat-item">
              <span className="stat-label">Template</span>
              <span className="stat-value">{getTemplateLabel(activePortfolio?.template)}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-label">Progress</span>
              <span className="stat-value">{completeness.progress}%</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-label">Status</span>
              <span className={`stat-value ${activePortfolio?.isPublished ? 'published' : 'draft'}`}>
                {activePortfolio?.isPublished ? '🚀 Published' : '📝 Draft'}
              </span>
            </div>
          </div>

          <div className="active-actions">
            <Button
              variant="primary"
              onClick={() => navigate(`/settings/${activePortfolio?._id}`)}
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              }
            >
              Edit Portfolio
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(`/${user?.username}`)}
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              }
            >
              View Live Site 🌐
            </Button>
          </div>
        </div>

        {/* Portfolios Management List Section */}
        <div className="portfolios-list-section">
          <div className="portfolios-list-header">
            <h3 className="portfolios-list-title">My Collections</h3>
            <button
              type="button"
              className="dashboard-new-btn"
              onClick={handleBuildNew}
              disabled={isSaving}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Build New Portfolio
            </button>
          </div>

          <div className="portfolios-grid">
            {portfolios.map((p) => {
              const isActive = String(p._id) === String(activePortfolioId);
              const pCompleteness = getPortfolioCompleteness(p);
              
              return (
                <div key={p._id} className={`portfolio-row-card ${isActive ? 'active-row' : ''}`}>
                  <div className="portfolio-row-card__info">
                    <div className="portfolio-row-card__name-row">
                      <h4 className="portfolio-row-card__name">{p.name}</h4>
                      {isActive && <span className="active-tag-badge">Active</span>}
                    </div>
                    <p className="portfolio-row-card__meta">
                      Template: {getTemplateLabel(p.template)} • Progress: {pCompleteness.progress}%
                    </p>
                  </div>
                  
                  <div className="portfolio-row-card__actions">
                    {!isActive && (
                      <button
                        type="button"
                        className="row-action-btn row-action-btn--activate"
                        onClick={() => handleActivate(p._id, p.name)}
                        title="Make Active Public Portfolio"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      type="button"
                      className="row-action-btn row-action-btn--edit"
                      onClick={() => navigate(`/settings/${p._id}`)}
                    >
                      Edit
                    </button>
                    {portfolios.length > 1 && (
                      <button
                        type="button"
                        className="row-action-btn row-action-btn--delete"
                        onClick={() => setDeleteTargetId(p._id)}
                        title="Delete Portfolio"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={!!deleteTargetId}
          onClose={() => setDeleteTargetId(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Portfolio? ⚠️"
          message="Are you sure you want to delete this portfolio? This action is permanent and cannot be undone."
          confirmText={isDeleting ? 'Deleting...' : 'Delete'}
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    </DashboardLayout>
  );
};

export default ActiveDashboard;