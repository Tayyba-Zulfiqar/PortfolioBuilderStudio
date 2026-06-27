import React from 'react';

const PublishToggle = ({ isPublished, onToggle }) => {
  return (
    <div className="settings-section">
      <div className="publish-row">
        <div className="publish-info">
          <h3 className="publish-title">Publish Portfolio</h3>
          <p className="publish-desc">Make your portfolio visible to the world</p>
        </div>
        <button
          type="button"
          className={`toggle-switch ${isPublished ? 'toggle-switch--on' : ''}`}
          onClick={onToggle}
          role="switch"
          aria-checked={isPublished}
          id="publish-toggle"
        >
          <span className="toggle-thumb" />
        </button>
      </div>
    </div>
  );
};

export default PublishToggle;
