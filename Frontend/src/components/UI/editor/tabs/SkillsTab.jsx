import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../../store/portfolioStore';
import './SkillsTab.css';

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

const PROFICIENCY_COLORS = {
  Expert: { bg: '#dcf5e4', text: '#2d7a4f' },
  Intermediate: { bg: '#ede9f8', text: '#6d4c9e' },
  Beginner: { bg: '#fce4ec', text: '#c0546a' },
};

/* Skill dot colors */
const SKILL_DOT_COLORS = ['#E58B9D', '#D4C5D9', '#A8D5BA', '#F4A6B5', '#c3aed6', '#e8b4b8'];

const AddSkillModal = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [proficiency, setProficiency] = useState('Intermediate');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), proficiency });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box modal-box--sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Skill 🎀</h2>
          <button className="modal-close" onClick={onClose} id="skill-modal-close">✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Skill Name *</label>
            <input
              className="form-input"
              placeholder="e.g. React, Figma, Python..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
              id="skill-name-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Proficiency Level</label>
            <select
              className="form-select"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              id="skill-proficiency-select"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave} id="skill-save-btn">Add Skill</button>
        </div>
      </div>
    </div>
  );
};

const SkillsTab = ({ portfolio, onNextTab }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (portfolio?.skills) setSkills(portfolio.skills);
  }, [portfolio]);

  const handleAddSkill = (skill) => {
    setSkills((prev) => [...prev, { ...skill, _id: Date.now().toString() }]);
    setModalOpen(false);
  };

  const handleRemoveSkill = (id) => {
    setSkills((prev) => prev.filter((s) => s._id !== id));
  };

  const handleProficiencyChange = (id, proficiency) => {
    setSkills((prev) => prev.map((s) => s._id === id ? { ...s, proficiency } : s));
  };

  const handleSave = async () => {
    const result = await updatePortfolio({ skills });
    if (result.success) {
      showToast('Skills saved! 🌸');
      if (onNextTab) onNextTab();
    }
    else showToast('Oops! Something went wrong 😢');
  };

  return (
    <div className="skills-tab">
      <div className="tab-header-row">
        <h1 className="editor-section-title" style={{ marginBottom: 0 }}>Your Skills</h1>
        <button className="btn-add" onClick={() => setModalOpen(true)} id="add-skill-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Skill
          <span className="btn-add__emoji">🎀</span>
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">⭐</span>
          <h3>No skills yet</h3>
          <p>Add your skills to showcase your expertise! ✨</p>
          <button className="btn-save" onClick={() => setModalOpen(true)} style={{ marginTop: 12 }}>Add a Skill</button>
        </div>
      ) : (
        <div className="skills-grid">
          {skills.map((skill, i) => {
            const colors = PROFICIENCY_COLORS[skill.proficiency] || PROFICIENCY_COLORS.Intermediate;
            const dotColor = SKILL_DOT_COLORS[i % SKILL_DOT_COLORS.length];
            return (
              <div className="skill-card" key={skill._id || i}>
                <span className="skill-dot" style={{ background: dotColor }} />
                <span className="skill-name">{skill.name}</span>
                <span
                  className="skill-badge"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {skill.proficiency}
                </span>
                <select
                  className="skill-proficiency-select"
                  value={skill.proficiency}
                  onChange={(e) => handleProficiencyChange(skill._id || i, e.target.value)}
                  title="Change proficiency"
                  id={`skill-proficiency-${skill._id || i}`}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  className="skill-remove"
                  onClick={() => handleRemoveSkill(skill._id || i)}
                  title="Remove skill"
                  id={`skill-remove-${skill._id || i}`}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="tab-save-row">
        <button className="btn-save" onClick={handleSave} disabled={isSaving} id="skills-save-btn">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {modalOpen && (
        <AddSkillModal
          onSave={handleAddSkill}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SkillsTab;
