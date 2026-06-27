import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../../store/portfolioStore';
import { useAuthStore } from '../../../../store/authStore';
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

const TEMPLATES = [
  {
    id: 'elegant',
    label: 'Elegant',
    icon: '🌸',
    bgFrom: '#FFF8F7',
    bgTo: '#FADADD',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    icon: '🤍',
    bgFrom: '#fafafa',
    bgTo: '#f0f0f0',
  },
  {
    id: 'creative',
    label: 'Creative',
    icon: '🎨',
    bgFrom: '#f3e8ff',
    bgTo: '#fce4ec',
  },
];

const SettingsTab = ({ portfolio, onNextTab }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const { user } = useAuthStore();

  const [selectedTemplate, setSelectedTemplate] = useState('elegant');
  const [isPublished, setIsPublished] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#F4A6B5');
  const [secondaryColor, setSecondaryColor] = useState('#E8B4B8');

  useEffect(() => {
    if (portfolio) {
      setSelectedTemplate(portfolio.template || 'elegant');
      setIsPublished(portfolio.isPublished || false);
      setPrimaryColor(portfolio.theme?.primaryColor || '#F4A6B5');
      setSecondaryColor(portfolio.theme?.secondaryColor || '#E8B4B8');
    }
  }, [portfolio]);

  const handleSave = async () => {
    const result = await updatePortfolio({
      template: selectedTemplate,
      isPublished,
      theme: { primaryColor, secondaryColor },
    });
    if (result.success) {
      showToast('Settings saved! 🌸');
      if (onNextTab) onNextTab();
    }
    else showToast('Oops! Something went wrong 😢');
  };

  const customUrl = `${user?.username || 'yourname'}.bloomportfolio.com`;

  return (
    <div className="settings-tab">
      <h1 className="editor-section-title">Portfolio Settings</h1>

      {/* Template Selection */}
      <div className="settings-section">
        <p className="settings-label">Choose Template</p>
        <div className="template-grid">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              className={`template-card ${selectedTemplate === tpl.id ? 'template-card--active' : ''}`}
              onClick={() => setSelectedTemplate(tpl.id)}
              id={`template-${tpl.id}`}
            >
              <div
                className="template-card__preview"
                style={{
                  background: `linear-gradient(135deg, ${tpl.bgFrom} 0%, ${tpl.bgTo} 100%)`
                }}
              >
                {/* Mini flower SVG */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ opacity: 0.5 }}
                >
                  <path
                    d="M12 2C12 2 9 5 9 8C9 9.66 10.34 11 12 11C13.66 11 15 9.66 15 8C15 5 12 2 12 2Z"
                    fill="var(--color-bloom-pink)"
                  />
                  <path
                    d="M12 22C12 22 9 19 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 19 12 22 12 22Z"
                    fill="var(--color-bloom-pink)"
                  />
                  <path
                    d="M2 12C2 12 5 9 8 9C9.66 9 11 10.34 11 12C11 13.66 9.66 15 8 15C5 15 2 12 2 12Z"
                    fill="var(--color-bloom-pink)"
                  />
                  <path
                    d="M22 12C22 12 19 9 16 9C14.34 9 13 10.34 13 12C13 13.66 14.34 15 16 15C19 15 22 12 22 12Z"
                    fill="var(--color-bloom-pink)"
                  />
                  <circle cx="12" cy="12" r="2.5" fill="var(--color-bloom-pink-light)" />
                </svg>
              </div>
              <span className="template-card__label">{tpl.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Pickers */}
      <div className="settings-section">
        <div className="color-pickers-row">
          <div className="color-picker-group">
            <label className="settings-label" htmlFor="primary-color-input">Primary Color</label>
            <div className="color-picker-wrap">
              <input
                type="color"
                id="primary-color-input"
                className="color-swatch-input"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
              <span className="color-hex">{primaryColor.toUpperCase()}</span>
            </div>
          </div>

          <div className="color-picker-group">
            <label className="settings-label" htmlFor="secondary-color-input">Secondary Color</label>
            <div className="color-picker-wrap">
              <input
                type="color"
                id="secondary-color-input"
                className="color-swatch-input"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
              <span className="color-hex">{secondaryColor.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom URL */}
      <div className="settings-section">
        <label className="settings-label">Custom URL</label>
        <div className="custom-url-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-bloom-pink)" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span className="custom-url-text">{customUrl}</span>
        </div>
      </div>

      {/* Publish Toggle */}
      <div className="settings-section">
        <div className="publish-row">
          <div className="publish-info">
            <h3 className="publish-title">Publish Portfolio</h3>
            <p className="publish-desc">Make your portfolio visible to the world</p>
          </div>
          <button
            className={`toggle-switch ${isPublished ? 'toggle-switch--on' : ''}`}
            onClick={() => setIsPublished((prev) => !prev)}
            role="switch"
            aria-checked={isPublished}
            id="publish-toggle"
          >
            <span className="toggle-thumb" />
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="settings-section settings-section--danger">
        <button className="delete-account-btn" id="delete-account-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          </svg>
          Delete Account
        </button>
      </div>

      {/* Save */}
      <div className="tab-save-row">
        <button className="btn-save" onClick={handleSave} disabled={isSaving} id="settings-save-btn">
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
