import React from 'react';

const LOGO_COLORS = ['#1a1a2e', '#0d7377', '#6b2fa0', '#c0392b', '#e67e22', '#27ae60'];

const ExperienceCard = ({ experience, index, onEdit, onDelete }) => {
  const logoColor = LOGO_COLORS[index % LOGO_COLORS.length];
  const initials = experience.company?.slice(0, 1).toUpperCase() || '?';

  const formatDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.endDate || 'Present';
    if (!start) return end;
    return `${start} - ${end}`;
  };

  const expId = experience._id || index;

  return (
    <div className="exp-card">
      <div className="exp-card__logo" style={{ background: logoColor }}>
        <span className="exp-card__logo-letter">{initials}</span>
      </div>

      <div className="exp-card__body">
        <div className="exp-card__top">
          <div>
            <h3 className="exp-card__title">{experience.title}</h3>
            <p className="exp-card__company">{experience.company}</p>
          </div>
          <div className="exp-card__right">
            <span className="exp-card__date">{formatDate(experience)}</span>
            <div className="exp-card__actions">
              <button 
                className="icon-btn icon-btn--edit" 
                onClick={() => onEdit(experience)} 
                title="Edit" 
                id={`edit-exp-${expId}`}
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button 
                className="icon-btn icon-btn--delete" 
                onClick={() => onDelete(experience)} 
                title="Delete" 
                id={`delete-exp-${expId}`}
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {experience.description && (
          <p className="exp-card__desc">{experience.description}</p>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
