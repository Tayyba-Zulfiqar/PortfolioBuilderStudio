import React from 'react';
import './MinimalTemplate.css';

const MinimalTemplate = ({ data }) => {
    const {
        about = {},
        socialLinks = {},
        projects = [],
        skills = [],
        experience = [],
        education = [],
        theme = { primaryColor: '#F4A6B5', secondaryColor: '#E8B4B8' },
    } = data;

    const primaryColor = theme?.primaryColor || '#F4A6B5';
    const secondaryColor = theme?.secondaryColor || '#E8B4B8';

    return (
        <div className="template-minimal" style={{ '--primary-color': primaryColor, '--secondary-color': secondaryColor }}>
            {/* ===== HEADER ===== */}
            <header className="minimal-header">
                <h1 className="minimal-name">{about.fullName || 'Your Name'}</h1>
                <p className="minimal-title">{about.headline || 'Professional Title'}</p>
                <div className="minimal-header-divider"></div>
            </header>

            {/* ===== BODY ===== */}
            <div className="minimal-body">
                {/* ===== LEFT COLUMN ===== */}
                <div className="minimal-left">
                    {/* Contact */}
                    <section className="minimal-section">
                        <h3 className="minimal-section-title">Contact</h3>
                        <div className="minimal-contact">
                            {socialLinks.email && (
                                <p className="minimal-contact-item">✉️ {socialLinks.email}</p>
                            )}
                            {socialLinks.phone && (
                                <p className="minimal-contact-item">📞 {socialLinks.phone}</p>
                            )}
                            {socialLinks.github && (
                                <p className="minimal-contact-item">💻 {socialLinks.github}</p>
                            )}
                            {socialLinks.linkedin && (
                                <p className="minimal-contact-item">🔗 {socialLinks.linkedin}</p>
                            )}
                            {about.location && (
                                <p className="minimal-contact-item">📍 {about.location}</p>
                            )}
                        </div>
                    </section>

                    {/* Skills / Expertise */}
                    {skills.length > 0 && (
                        <section className="minimal-section">
                            <h3 className="minimal-section-title">Expertise</h3>
                            <div className="minimal-skills">
                                {skills.map((skill, index) => (
                                    <span key={index} className="minimal-skill-tag">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="minimal-section">
                            <h3 className="minimal-section-title">Education</h3>
                            {education.map((edu, index) => (
                                <div key={index} className="minimal-education-item">
                                    <p className="minimal-education-year">{edu.year}</p>
                                    <p className="minimal-education-institution">{edu.institution}</p>
                                    <p className="minimal-education-degree">{edu.degree}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Languages (from skills with proficiency or custom field) */}
                    {/* This can be extended if you have a languages field */}
                </div>

                {/* ===== RIGHT COLUMN ===== */}
                <div className="minimal-right">
                    {/* About */}
                    {about.bio && (
                        <section className="minimal-section">
                            <h3 className="minimal-section-title">About Me</h3>
                            <p className="minimal-about-text">{about.bio}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="minimal-section">
                            <h3 className="minimal-section-title">Experience</h3>
                            {experience.map((exp, index) => (
                                <div key={index} className="minimal-experience-item">
                                    <div className="minimal-experience-header">
                                        <h4 className="minimal-experience-title">{exp.title}</h4>
                                        <p className="minimal-experience-company">{exp.company}</p>
                                        <p className="minimal-experience-date">
                                            {exp.startDate && new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                                        </p>
                                    </div>
                                    {exp.description && (
                                        <p className="minimal-experience-description">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section className="minimal-section">
                            <h3 className="minimal-section-title">Projects</h3>
                            {projects.map((project, index) => (
                                <div key={index} className="minimal-project-item">
                                    <h4 className="minimal-project-title">{project.title}</h4>
                                    {project.description && (
                                        <p className="minimal-project-description">{project.description}</p>
                                    )}
                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="minimal-project-tech">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="minimal-tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>

            {/* ===== FOOTER ===== */}
            <footer className="minimal-footer">
                <p>🌸 Built with Bloom Portfolio Studio</p>
            </footer>
        </div>
    );
};

export default MinimalTemplate;