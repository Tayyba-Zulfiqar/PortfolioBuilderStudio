import { ProfessionalTemplate, CreativeTemplate, MinimalTemplate } from '../../../../../templates/index'
import './LivePreview.css'

const LivePreview = ({ portfolio, onShowFullPreview, primaryColor, secondaryColor, template }) => {
  // Merge portfolio data with selected theme colors
  const previewData = {
    ...portfolio,
    theme: {
      primaryColor: primaryColor || portfolio?.theme?.primaryColor || '#F4A6B5',
      secondaryColor: secondaryColor || portfolio?.theme?.secondaryColor || '#E8B4B8',
    },
  };



  const renderTemplate = () => {
    switch (template) {
      case 'professional':
      case 'modern':
        return <ProfessionalTemplate data={previewData} />;
      case 'creative':
        return <CreativeTemplate data={previewData} />;
      case 'minimal':
        return <MinimalTemplate data={previewData} />;
      default:
        return <ProfessionalTemplate data={previewData} />;
    }
  };
  return (
    <div className="settings-section live-preview-section">
      <div className="live-preview-header">
        <span className="live-preview-title">🌸 Live Preview</span>
        <button
          type="button"
          className="live-preview-view-full-btn"
          onClick={() => onShowFullPreview?.({ template, primaryColor, secondaryColor })}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          View Full
        </button>
      </div>

      <div className="live-preview-card">
        <div className="live-preview-content">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default LivePreview;