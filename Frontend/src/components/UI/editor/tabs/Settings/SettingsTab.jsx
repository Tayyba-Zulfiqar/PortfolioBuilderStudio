import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioStore } from '../../../../../store/portfolioStore';
import { useAuthStore } from '../../../../../store/authStore';
import FormActions from '../../../../common/FormInputs/FormActions';
import TemplateSelector from './TemplateSelector';
import ColorPicker from './ColorPicker';
import CustomUrlField from './CustomUrlField';
import PublishToggle from './PublishToggle';
import DeleteAccount from './DeleteAccount';
import LivePreview from './LivePreview';
import SavePortfolioModal from '../../../dashboard/SavePortfolioModal';
import { PORTFOLIO_SECTIONS } from '../../../../../utils/portfolioUtils';
import './SettingsTab.css';

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

const SettingsTab = ({ portfolio, onShowFullPreview }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isPublished, setIsPublished] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#F4A6B5');
  const [secondaryColor, setSecondaryColor] = useState('#E8B4B8');
  const [showNameModal, setShowNameModal] = useState(false);

  // Check completeness of previous tabs
  const previousSections = ['about', 'projects', 'skills', 'experience', 'education'];
  const incompletePrevious = PORTFOLIO_SECTIONS
    .filter(s => previousSections.includes(s.key))
    .filter(s => !s.check(portfolio));
  const hasIncompletePrevious = incompletePrevious.length > 0;

  // A portfolio is considered "new" (still unnamed) if it has the default
  // auto-generated name "Portfolio #N" and no real content yet.
  const isNewPortfolio = (() => {
    const name = portfolio?.name || '';
    const hasDefaultName = /^Portfolio #\d+$/.test(name) || name === 'My First Portfolio';
    const hasNoContent = !portfolio?.about?.fullName &&
                         (portfolio?.projects?.length || 0) === 0 &&
                         (portfolio?.skills?.length || 0) === 0;
    return hasDefaultName && hasNoContent;
  })();

  useEffect(() => {
    if (portfolio) {
      setSelectedTemplate(portfolio.template || 'modern');
      setIsPublished(portfolio.isPublished || false);
      setPrimaryColor(portfolio.theme?.primaryColor || '#F4A6B5');
      setSecondaryColor(portfolio.theme?.secondaryColor || '#E8B4B8');
    }
  }, [portfolio]);

  const isDirty =
    selectedTemplate !== (portfolio?.template || 'modern') ||
    isPublished !== (portfolio?.isPublished || false) ||
    primaryColor !== (portfolio?.theme?.primaryColor || '#F4A6B5') ||
    secondaryColor !== (portfolio?.theme?.secondaryColor || '#E8B4B8') ||
    isNewPortfolio;

  // Persist settings (and optional name) to the backend
  const persistSettings = async (name) => {
    const payload = {
      template: selectedTemplate,
      isPublished,
      theme: { primaryColor, secondaryColor },
    };
    if (name) payload.name = name;

    const result = await updatePortfolio(payload, portfolio?._id);
    return result;
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (hasIncompletePrevious) {
      showToast('Please complete all previous tabs first! 🌸');
      return;
    }

    // New portfolios must be named before they can be saved.
    if (isNewPortfolio) {
      setShowNameModal(true);
      return;
    }

    const result = await persistSettings();
    if (result.success) {
      showToast('Settings saved! 🌸');
      if (onShowFullPreview) {
        onShowFullPreview();
      }
    } else {
      showToast('Oops! Something went wrong 😢');
    }
  };

  // Called from SavePortfolioModal after the user names the portfolio
  const handleModalSave = async (name) => {
    const result = await persistSettings(name);
    if (result.success) {
      setShowNameModal(false);
      showToast('Portfolio saved! 🌸');
      navigate('/library');
    } else {
      showToast('Oops! Something went wrong 😢');
    }
  };

  const customUrl = `${user?.username || 'yourname'}.bloomportfolio.com`;

  const handleDeleteAccount = () => {
    showToast('Delete Account feature coming soon! 🌸');
  };

  return (
    <form className="settings-tab" onSubmit={handleSave}>
      <h1 className="editor-section-title">Portfolio Settings</h1>

      {/* Validation warning when previous tabs are incomplete */}
      {hasIncompletePrevious && (
        <div className="validation-warning-card">
          <h3 className="validation-warning-card__title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Complete Previous Tabs First 🌸
          </h3>
          <p className="validation-warning-card__text">
            You cannot save settings or templates until you have filled and saved the following previous tabs:
          </p>
          <ul className="validation-warning-card__list">
            {incompletePrevious.map(s => (
              <li key={s.key} className="validation-warning-card__item">
                {s.icon} {s.label} Tab
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reusable Template Selector */}
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onChange={setSelectedTemplate}
      />

      {/* Reusable Color Picker */}
      <ColorPicker
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onPrimaryChange={setPrimaryColor}
        onSecondaryChange={setSecondaryColor}
      />

      {/* Reusable Custom URL Display */}
      <CustomUrlField customUrl={customUrl} />

      {/* Reusable Publish Toggle */}
      <PublishToggle
        isPublished={isPublished}
        onToggle={() => setIsPublished((prev) => !prev)}
      />

      {/* Reusable Delete Account Section */}
      <DeleteAccount onDelete={handleDeleteAccount} />

      {/* Embedded Live Preview */}
      <LivePreview
        portfolio={portfolio}
        onShowFullPreview={onShowFullPreview}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        template={selectedTemplate}
      />

      <FormActions
        isSaving={isSaving}
        isSubmitting={false}
        isValid={!hasIncompletePrevious}
        isDirty={isDirty}
        errors={{}}
        saveText={isNewPortfolio ? 'Save Portfolio' : 'Save Settings'}
        savingText="Saving..."
        showErrorSummary={false}
      />

      {/* Naming modal shown when saving a brand-new portfolio */}
      <SavePortfolioModal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSave={handleModalSave}
        defaultName={portfolio?.name || ''}
        isSaving={isSaving}
      />
    </form>
  );
};

export default SettingsTab;
