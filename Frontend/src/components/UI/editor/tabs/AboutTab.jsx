import { useState, useRef, useEffect } from 'react';
import { usePortfolioStore } from '../../../../store/portfolioStore';
import './AboutTab.css';

/* Toast helper */
const showToast = (msg) => {
  const el = document.createElement('div');
  el.className = 'bloom-toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('bloom-toast--show'));
  setTimeout(() => {
    el.classList.remove('bloom-toast--show');
    setTimeout(() => el.remove(), 300);
  }, 2800);
};

const AboutTab = ({ portfolio }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    headline: '',
    bio: '',
    location: '',
    profilePicture: '',
    github: '',
    linkedin: '',
    twitter: '',
    youtube: '',
  });

  const [previewImage, setPreviewImage] = useState('');

  // Sync form when portfolio data loads
  useEffect(() => {
    if (portfolio) {
      setFormData({
        fullName: portfolio.about?.fullName || '',
        headline: portfolio.about?.headline || '',
        bio: portfolio.about?.bio || '',
        location: portfolio.about?.location || '',
        profilePicture: portfolio.about?.profilePicture || '',
        github: portfolio.socialLinks?.github || '',
        linkedin: portfolio.socialLinks?.linkedin || '',
        twitter: portfolio.socialLinks?.twitter || '',
        youtube: portfolio.socialLinks?.youtube || '',
      });
      setPreviewImage(portfolio.about?.profilePicture || '');
    }
  }, [portfolio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setPreviewImage(base64);
      setFormData((prev) => ({ ...prev, profilePicture: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const payload = {
      about: {
        fullName: formData.fullName,
        headline: formData.headline,
        bio: formData.bio,
        location: formData.location,
        profilePicture: formData.profilePicture,
      },
      socialLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        youtube: formData.youtube,
      }
    };
    const result = await updatePortfolio(payload);
    if (result.success) {
      showToast('Saved! 🌸');
    } else {
      showToast('Oops! Something went wrong 😢');
    }
  };

  const bioMax = 500;

  return (
    <div className="about-tab">
      <h1 className="editor-section-title">Edit Your Portfolio</h1>

      {/* Profile Picture */}
      <div className="about-avatar-row">
        <div className="about-avatar-wrap" onClick={handleImageClick} title="Click to upload a new photo">
          <div className="about-avatar">
            {previewImage ? (
              <img src={previewImage} alt="Profile" />
            ) : (
              <div className="about-avatar__placeholder">🌸</div>
            )}
          </div>
          <div className="about-avatar__plus">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="about-avatar__file-input"
            onChange={handleImageChange}
            id="profile-picture-input"
          />
        </div>
        <div className="about-avatar-info">
          <span className="about-avatar-label">Profile Picture</span>
          <span className="about-avatar-hint">Click to upload a new photo</span>
        </div>
      </div>

      {/* Full Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="about-fullName">Full Name</label>
        <input
          id="about-fullName"
          type="text"
          name="fullName"
          className="form-input"
          placeholder="Sarah Johnson"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      {/* Headline */}
      <div className="form-group">
        <label className="form-label" htmlFor="about-headline">Headline</label>
        <input
          id="about-headline"
          type="text"
          name="headline"
          className="form-input"
          placeholder="Creative Developer & Designer"
          value={formData.headline}
          onChange={handleChange}
        />
      </div>

      {/* Bio */}
      <div className="form-group">
        <label className="form-label" htmlFor="about-bio">Bio</label>
        <textarea
          id="about-bio"
          name="bio"
          className="form-textarea"
          placeholder="Passionate about creating beautiful, functional digital experiences..."
          value={formData.bio}
          onChange={handleChange}
          maxLength={bioMax}
          rows={5}
        />
        <div className="form-char-counter">{formData.bio.length}/{bioMax}</div>
      </div>

      {/* Location */}
      <div className="form-group">
        <label className="form-label" htmlFor="about-location">Location</label>
        <input
          id="about-location"
          type="text"
          name="location"
          className="form-input"
          placeholder="San Francisco, CA"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      {/* Social Links */}
      <h2 className="editor-section-subtitle">Social Links</h2>

      <div className="social-links-list">
        {/* GitHub */}
        <div className="social-link-row">
          <div className="social-link-icon social-link-icon--github">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </div>
          <input
            id="about-github"
            type="url"
            name="github"
            className="form-input"
            placeholder="https://github.com/sarahjohnson"
            value={formData.github}
            onChange={handleChange}
          />
        </div>

        {/* LinkedIn */}
        <div className="social-link-row">
          <div className="social-link-icon social-link-icon--linkedin">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <input
            id="about-linkedin"
            type="url"
            name="linkedin"
            className="form-input"
            placeholder="https://linkedin.com/in/sarahjohnson"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        {/* Twitter / X */}
        <div className="social-link-row">
          <div className="social-link-icon social-link-icon--twitter">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
          <input
            id="about-twitter"
            type="url"
            name="twitter"
            className="form-input"
            placeholder="https://twitter.com/sarahjohnson"
            value={formData.twitter}
            onChange={handleChange}
          />
        </div>

        {/* YouTube */}
        <div className="social-link-row">
          <div className="social-link-icon social-link-icon--youtube">
            <svg width="16" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <input
            id="about-youtube"
            type="url"
            name="youtube"
            className="form-input"
            placeholder="https://youtube.com/@sarahjohnson"
            value={formData.youtube}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="tab-save-row">
        <button
          className="btn-save"
          onClick={handleSave}
          disabled={isSaving}
          id="about-save-btn"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default AboutTab;
