import React from 'react';

const EducationCard = ({ education, index, onEdit, onDelete }) => {
  const formatYear = (edu) => {
    if (edu.startYear && edu.endYear) return `${edu.startYear} - ${edu.endYear}`;
    if (edu.startYear) return edu.startYear;
    if (edu.endYear) return edu.endYear;
    return '';
  };

  const eduId = education._id || index;

  return (
    <div className="edu-card">
      <div className="edu-card__body">
        <div className="edu-card__top">
          <div>
            <h3 className="edu-card__degree">{education.degree}</h3>
            <p className="edu-card__institution">{education.institution}</p>
            {formatYear(education) && (
              <p className="edu-card__year">{formatYear(education)}</p>
            )}
          </div>
          <div className="edu-card__right">
            {education.gpa && (
              <span className="edu-card__gpa">{education.gpa}</span>
            )}
            <div className="edu-card__actions">
              <button 
                className="icon-btn icon-btn--edit" 
                onClick={() => onEdit(education)} 
                title="Edit" 
                id={`edit-edu-${eduId}`}
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button 
                className="icon-btn icon-btn--delete" 
                onClick={() => onDelete(education)} 
                title="Delete" 
                id={`delete-edu-${eduId}`}
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
      </div>
    </div>
  );
};

export default EducationCard;
