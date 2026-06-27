
import './CreativeTemplate.css';

const CreativeTemplate = ({ data }) => {
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
        <div className="template-creative" style={{ '--primary-color': primaryColor, '--secondary-color': secondaryColor }}>
            {/* ===== HEADER ===== */}
            <header className="creative-header">
                <div className="creative-header-bg"></div>
                <div className="creative-header-content">
                    <h1 className="creative-name">{about.fullName || 'Your Name'}</h1>
                    <p className="creative-title">{about.headline || 'Professional Title'}</p>
                </div>
            </header>

            {/* ===== BODY ===== */}
            <div className="creative-body">
                {/* ===== LEFT COLUMN ===== */}
                <div className="creative-left">
                    {/* About */}
                    {about.bio && (
                        <section className="creative-section">
                            <h3 className="creative-section-title">About Me</h3>
                            <p className="creative-about-text">{about.bio}</p>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="creative-section">
                            <h3 className="creative-section-title">Education</h3>
                            {education.map((edu, index) => (
                                <div key={index} className="creative-education-item">
                                    <p className="creative-education-institution">{edu.institution}</p>
                                    {edu.year && (
                                        <p className="creative-education-year">{edu.year}</p>
                                    )}
                                    <p className="creative-education-degree">{edu.degree}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Contact */}
                    <section className="creative-section">
                        <h3 className="creative-section-title">Contact</h3>
                        <div className="creative-contact">
                            {socialLinks.email && (
                                <p className="creative-contact-item">✉️ {socialLinks.email}</p>
                            )}
                            {socialLinks.phone && (
                                <p className="creative-contact-item">📞 {socialLinks.phone}</p>
                            )}
                            {socialLinks.github && (
                                <p className="creative-contact-item">💻 {socialLinks.github}</p>
                            )}
                            {socialLinks.linkedin && (
                                <p className="creative-contact-item">🔗 {socialLinks.linkedin}</p>
                            )}
                            {about.location && (
                                <p className="creative-contact-item">📍 {about.location}</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* ===== RIGHT COLUMN ===== */}
                <div className="creative-right">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="creative-section">
                            <h3 className="creative-section-title">Experience</h3>
                            {experience.map((exp, index) => (
                                <div key={index} className="creative-experience-item">
                                    <div className="creative-experience-header">
                                        <h4 className="creative-experience-title">{exp.title}</h4>
                                        <p className="creative-experience-company">{exp.company}</p>
                                        <p className="creative-experience-date">
                                            {exp.startDate && new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                                        </p>
                                    </div>
                                    {exp.description && (
                                        <p className="creative-experience-description">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="creative-section">
                            <h3 className="creative-section-title">Skills</h3>
                            <div className="creative-skills">
                                {skills.map((skill, index) => (
                                    <span key={index} className="creative-skill-tag">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section className="creative-section">
                            <h3 className="creative-section-title">Projects</h3>
                            {projects.map((project, index) => (
                                <div key={index} className="creative-project-item">
                                    <h4 className="creative-project-title">{project.title}</h4>
                                    {project.description && (
                                        <p className="creative-project-description">{project.description}</p>
                                    )}
                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="creative-project-tech">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="creative-tech-tag">{tech}</span>
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
            <footer className="creative-footer">
                <p>🌸 Built with Bloom Portfolio Studio</p>
            </footer>
        </div>
    );
};

export default CreativeTemplate;