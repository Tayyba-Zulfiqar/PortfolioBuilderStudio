import React from 'react';
import './FullPreview.css';
import { ProfessionalTemplate, CreativeTemplate, MinimalTemplate } from '../../../templates/index';

const FullPreview = ({ portfolio, user, onClose }) => {
  const template = portfolio?.template || 'professional';

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (template) {
      case 'professional':
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
    <div className="full-preview-mode">
      {/* Top Preview Controls (Hidden in Print) */}
      <div className="full-preview-controls">
        <button type="button" className="full-preview-back-btn" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Settings
        </button>
        <div className="full-preview-title-bar">
          Portfolio Full Preview Mode 🌸
        </div>
        <button type="button" className="full-preview-pdf-btn" onClick={handlePrint}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </button>
      </div>

      {/* Main Print and View Area */}
      <div className="full-preview-content-wrapper">
        <div id="portfolio-print-area">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default FullPreview;
