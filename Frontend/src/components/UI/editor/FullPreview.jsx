import React from 'react';
import './FullPreview.css';

const FullPreview = ({ portfolio, user, onClose }) => {
  const about = portfolio?.about || {};
  const socialLinks = portfolio?.socialLinks || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experience = portfolio?.experience || [];
  const education = portfolio?.education || [];
  const template = portfolio?.template || 'modern';
  const primaryColor = portfolio?.theme?.primaryColor || '#F4A6B5';
  const secondaryColor = portfolio?.theme?.secondaryColor || '#E8B4B8';

  const themeStyles = {
    '--theme-primary': primaryColor,
    '--theme-secondary': secondaryColor,
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="full-preview-mode" style={themeStyles}>
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
        <div id="portfolio-print-area" className={`full-portfolio full-portfolio--${template}`}>
          {/* Header/Hero Section */}
          <header className="portfolio-hero">
            <div className="portfolio-avatar-container">
              {about.profilePicture ? (
                <img src={about.profilePicture} alt={about.fullName} className="portfolio-avatar-img" />
              ) : (
                <div className="portfolio-avatar-placeholder">🌸</div>
              )}
            </div>
            <h1 className="portfolio-name">{about.fullName || 'Your Name'}</h1>
            <p className="portfolio-headline">{about.headline || 'Your Professional Headline'}</p>
            {about.location && (
              <p className="portfolio-location">📍 {about.location}</p>
            )}

            {/* Social Links */}
            {(socialLinks.github || socialLinks.linkedin) && (
              <div className="portfolio-socials">
                {socialLinks.github && (
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="portfolio-social-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="portfolio-social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            )}
          </header>

          <main className="portfolio-main">
            {/* Bio Section */}
            {about.bio && (
              <section className="portfolio-section portfolio-section--bio">
                <h2 className="portfolio-section-title">About Me</h2>
                <p className="portfolio-bio-text">{about.bio}</p>
              </section>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
              <section className="portfolio-section portfolio-section--skills">
                <h2 className="portfolio-section-title">Skills & Expertise</h2>
                <div className="portfolio-skills-grid">
                  {skills.map((skill, index) => (
                    <div key={index} className="portfolio-skill-item">
                      <span className="portfolio-skill-name">{skill.name}</span>
                      <span className={`portfolio-skill-badge portfolio-skill-badge--${skill.proficiency.toLowerCase()}`}>
                        {skill.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <section className="portfolio-section portfolio-section--projects">
                <h2 className="portfolio-section-title">Projects</h2>
                <div className="portfolio-projects-list">
                  {projects.map((project, index) => (
                    <div key={index} className="portfolio-project-item">
                      <div className="portfolio-project-header">
                        <h3 className="portfolio-project-title">{project.title}</h3>
                        <div className="portfolio-project-links">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="View Code">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                              </svg>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="Live Site">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="portfolio-project-desc">{project.description}</p>
                      {project.techStack?.length > 0 && (
                        <div className="portfolio-project-tech">
                          {project.techStack.map((tech, idx) => (
                            <span key={idx} className="portfolio-tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience Section */}
            {experience.length > 0 && (
              <section className="portfolio-section portfolio-section--experience">
                <h2 className="portfolio-section-title">Work Experience</h2>
                <div className="portfolio-experience-timeline">
                  {experience.map((exp, index) => (
                    <div key={index} className="portfolio-experience-item">
                      <div className="portfolio-experience-meta">
                        <h3 className="portfolio-experience-title">{exp.title}</h3>
                        <span className="portfolio-experience-company">🏢 {exp.company}</span>
                        <span className="portfolio-experience-dates">
                          📅 {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="portfolio-experience-desc">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <section className="portfolio-section portfolio-section--education">
                <h2 className="portfolio-section-title">Education</h2>
                <div className="portfolio-education-list">
                  {education.map((edu, index) => (
                    <div key={index} className="portfolio-education-item">
                      <div className="portfolio-education-meta">
                        <h3 className="portfolio-education-degree">{edu.degree}</h3>
                        <span className="portfolio-education-school">🎓 {edu.institution}</span>
                        <span className="portfolio-education-dates">
                          📅 {edu.startYear} - {edu.endYear}
                        </span>
                      </div>
                      {edu.gpa && (
                        <p className="portfolio-education-gpa">Grade Point Average: <strong>{edu.gpa} / 4.00</strong></p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default FullPreview;
