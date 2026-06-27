import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, index, onEdit, onDelete }) => {
  return (
    <div className="project-card">
      <div className="project-card__drag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="6" r="1" fill="currentColor" />
          <circle cx="15" cy="6" r="1" fill="currentColor" />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
          <circle cx="9" cy="18" r="1" fill="currentColor" />
          <circle cx="15" cy="18" r="1" fill="currentColor" />
        </svg>
      </div>
      <div className="project-card__body">
        <div className="project-card__top">
          <h3 className="project-card__title">{project.title}</h3>
          <div className="project-card__actions">
            <button 
              className="icon-btn icon-btn--edit" 
              onClick={() => onEdit(project, index)} 
              title="Edit"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button 
              className="icon-btn icon-btn--delete" 
              onClick={() => onDelete(project, index)} 
              title="Delete"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        </div>
        {project.description && <p className="project-card__desc">{project.description}</p>}
        {project.techStack?.length > 0 && (
          <div className="project-card__tags">
            {project.techStack.map((t) => (
              <span key={t} className="tag-item tag-item--view">{t}</span>
            ))}
          </div>
        )}
        <div className="project-card__urls">
          {project.liveUrl && <span className="project-url">🔗 {project.liveUrl}</span>}
          {project.githubUrl && <span className="project-url">💻 {project.githubUrl}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
