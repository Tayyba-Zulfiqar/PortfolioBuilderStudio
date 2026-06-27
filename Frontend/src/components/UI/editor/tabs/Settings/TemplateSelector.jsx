import React from 'react';

const TEMPLATES = [
  {
    id: 'modern',
    label: 'Elegant',
    bgFrom: '#FFF8F7',
    bgTo: '#FADADD',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    bgFrom: '#fafafa',
    bgTo: '#f0f0f0',
  },
  {
    id: 'creative',
    label: 'Creative',
    bgFrom: '#f3e8ff',
    bgTo: '#fce4ec',
  },
];

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  return (
    <div className="settings-section">
      <p className="settings-label">Choose Template</p>
      <div className="template-grid">
        {TEMPLATES.map((tpl) => (
          <button
            type="button"
            key={tpl.id}
            className={`template-card ${selectedTemplate === tpl.id ? 'template-card--active' : ''}`}
            onClick={() => onChange(tpl.id)}
            id={`template-${tpl.id}`}
          >
            <div
              className="template-card__preview"
              style={{
                background: `linear-gradient(135deg, ${tpl.bgFrom} 0%, ${tpl.bgTo} 100%)`
              }}
            >
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
  );
};

export default TemplateSelector;
