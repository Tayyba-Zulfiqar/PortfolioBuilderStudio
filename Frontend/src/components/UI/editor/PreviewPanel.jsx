import './PreviewPanel.css';

const PreviewPanel = ({ portfolio, user }) => {
  const about = portfolio?.about || {};
  const template = portfolio?.template || 'elegant';

  return (
    <div className="preview-panel">
      <div className="preview-panel__header">
        <span className="preview-dot preview-dot--red" />
        <span className="preview-dot preview-dot--yellow" />
        <span className="preview-dot preview-dot--green" />
        <span className="preview-label">Live Preview 🌸</span>
      </div>

      <div className={`preview-body preview-body--${template}`}>
        {/* Profile Section */}
        <div className="preview-profile">
          <div className="preview-avatar">
            {about.profilePicture ? (
              <img src={about.profilePicture} alt="Profile" />
            ) : (
              <div className="preview-avatar__placeholder">🌸</div>
            )}
          </div>
          <div className="preview-profile__info">
            <h2 className="preview-name">{about.fullName || 'Your Name'}</h2>
            <p className="preview-headline">{about.headline || 'Your Headline'}</p>
            {about.location && (
              <p className="preview-location">📍 {about.location}</p>
            )}
          </div>
        </div>

        {/* Bio */}
        {about.bio && (
          <div className="preview-section">
            <p className="preview-bio">{about.bio}</p>
          </div>
        )}

        {/* Skills */}
        {portfolio?.skills?.length > 0 && (
          <div className="preview-section">
            <h3 className="preview-section__title">Skills</h3>
            <div className="preview-skills">
              {portfolio.skills.slice(0, 6).map((skill, i) => (
                <span key={i} className="preview-skill-tag">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {portfolio?.projects?.length > 0 && (
          <div className="preview-section">
            <h3 className="preview-section__title">Projects</h3>
            {portfolio.projects.slice(0, 2).map((project, i) => (
              <div key={i} className="preview-project-card">
                <h4 className="preview-project__title">{project.title}</h4>
                <p className="preview-project__desc">{project.description?.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!about.fullName && !portfolio?.skills?.length && !portfolio?.projects?.length && (
          <div className="preview-empty">
            <span className="preview-empty__icon">🌷</span>
            <p>Fill in your details to see a live preview!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
