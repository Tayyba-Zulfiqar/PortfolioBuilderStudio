import React from 'react';

const CustomUrlField = ({ customUrl }) => {
  return (
    <div className="settings-section">
      <label className="settings-label">Custom URL</label>
      <div className="custom-url-box">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-bloom-pink)" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="custom-url-text">{customUrl}</span>
      </div>
    </div>
  );
};

export default CustomUrlField;
