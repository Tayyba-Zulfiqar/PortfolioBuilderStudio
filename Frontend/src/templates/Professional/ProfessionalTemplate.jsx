
import './ProfessionalTemplate.css';

const ProfessionalTemplate = ({ data }) => {
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
        <div className="template-professional" style={{ '--primary-color': primaryColor, '--secondary-color': secondaryColor }}>
            {/* ===== HEADER ===== */}
            <header className="professional-header">
                <div className="professional-header-content">
                    <h1 className="professional-name">{about.fullName || 'Your Name'}</h1>
                    <p className="professional-title">{about.headline || 'Professional Title'}</p>
                </div>
            </header>

            {/* ===== MAIN CONTENT ===== */}
            <div className="professional-body">
                {/* ===== LEFT COLUMN ===== */}
                <div className="professional-left">
                    {/* Contact */}
                    <section className="professional-section">
                        <h3 className="professional-section-title">Contact</h3>
                        <div className="professional-contact">
                            {about.location && (
                                <p className="professional-contact-item">📍 {about.location}</p>
                            )}
                            {socialLinks.email && (
                                <p className="professional-contact-item">✉️ {socialLinks.email}</p>
                            )}
                            {socialLinks.phone && (
                                <p className="professional-contact-item">📞 {socialLinks.phone}</p>
                            )}
                            {socialLinks.github && (
                                <p className="professional-contact-item">💻 {socialLinks.github}</p>
                            )}
                            {socialLinks.linkedin && (
                                <p className="professional-contact-item">🔗 {socialLinks.linkedin}</p>
                            )}
                        </div>
                    </section>

                    {/* About */}
                    {about.bio && (
                        <section className="professional-section">
                            <h3 className="professional-section-title">About Me</h3>
                            <p className="professional-about-text">{about.bio}</p>
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="professional-section">
                            <h3 className="professional-section-title">Skills</h3>
                            <div className="professional-skills">
                                {skills.map((skill, index) => (
                                    <span key={index} className="professional-skill-tag">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="professional-section">
                            <h3 className="professional-section-title">Education</h3>
                            {education.map((edu, index) => (
                                <div key={index} className="professional-education-item">
                                    <p className="professional-education-degree">{edu.degree}</p>
                                    <p className="professional-education-institution">{edu.institution}</p>
                                    {edu.year && (
                                        <p className="professional-education-year">{edu.year}</p>
                                    )}
                                    {edu.gpa && (
                                        <p className="professional-education-gpa">GPA: {edu.gpa}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}
                </div>

                {/* ===== RIGHT COLUMN ===== */}
                <div className="professional-right">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="professional-section">
                            <h3 className="professional-section-title">Experience</h3>
                            {experience.map((exp, index) => (
                                <div key={index} className="professional-experience-item">
                                    <div className="professional-experience-header">
                                        <h4 className="professional-experience-title">{exp.title}</h4>
                                        <p className="professional-experience-company">{exp.company}</p>
                                        <p className="professional-experience-date">
                                            {exp.startDate && new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                                        </p>
                                    </div>
                                    {exp.description && (
                                        <p className="professional-experience-description">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section className="professional-section">
                            <h3 className="professional-section-title">Projects</h3>
                            {projects.map((project, index) => (
                                <div key={index} className="professional-project-item">
                                    <h4 className="professional-project-title">{project.title}</h4>
                                    {project.description && (
                                        <p className="professional-project-description">{project.description}</p>
                                    )}
                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="professional-project-tech">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="professional-tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="professional-project-links">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">🔗 Live Demo</a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">💻 GitHub</a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>

            {/* ===== FOOTER ===== */}
            <footer className="professional-footer">
                <p>Built with 🌸 Bloom Portfolio Studio</p>
            </footer>
        </div>
    );
};

export default ProfessionalTemplate;