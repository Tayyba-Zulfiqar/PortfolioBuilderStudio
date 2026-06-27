import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../../store/portfolioStore';
import './ExperienceTab.css';

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

const EMPTY_EXP = {
  title: '',
  company: '',
  startDate: '',
  endDate: '',
  description: '',
  logo: '',
};

/* Company logo placeholder colors */
const LOGO_COLORS = ['#1a1a2e', '#0d7377', '#6b2fa0', '#c0392b', '#e67e22', '#27ae60'];

/* Experience Modal */
const ExperienceModal = ({ experience, onSave, onClose }) => {
  const [form, setForm] = useState(experience || EMPTY_EXP);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {experience?._id ? 'Edit Experience' : 'Add Experience'} 💼
          </h2>
          <button className="modal-close" onClick={onClose} id="exp-modal-close">✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Job Title *</label>
            <input
              className="form-input"
              name="title"
              placeholder="Senior Frontend Developer"
              value={form.title}
              onChange={handleChange}
              id="exp-title-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Company *</label>
            <input
              className="form-input"
              name="company"
              placeholder="Bloom Technologies"
              value={form.company}
              onChange={handleChange}
              id="exp-company-input"
            />
          </div>
          <div className="exp-date-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Start Date</label>
              <input
                className="form-input"
                name="startDate"
                type="text"
                placeholder="Jan 2022 or 2022"
                value={form.startDate}
                onChange={handleChange}
                id="exp-start-input"
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">End Date</label>
              <input
                className="form-input"
                name="endDate"
                type="text"
                placeholder="Dec 2023 or Present"
                value={form.endDate}
                onChange={handleChange}
                id="exp-end-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              name="description"
              placeholder="Leading frontend development for a portfolio platform used by 10,000+ creatives..."
              value={form.description}
              onChange={handleChange}
              rows={4}
              id="exp-desc-input"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="btn-save"
            onClick={() => { if (form.title.trim()) onSave(form); }}
            id="exp-save-btn"
          >
            {experience?._id ? 'Update Experience' : 'Add Experience'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* Delete Confirm */
const ConfirmDeleteModal = ({ onConfirm, onCancel, label }) => (
  <div className="modal-backdrop" onClick={onCancel}>
    <div className="modal-box modal-box--sm" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-title" style={{ marginBottom: 12 }}>Delete Experience? 🗑️</h2>
      <p style={{ fontSize: 14, color: 'var(--color-bloom-text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
        Are you sure you want to remove <strong>"{label}"</strong>?
      </p>
      <div className="modal-footer">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn-save btn-danger" onClick={onConfirm} id="exp-confirm-delete">Delete</button>
      </div>
    </div>
  </div>
);

const ExperienceTab = ({ portfolio, onNextTab }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const [experiences, setExperiences] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (portfolio?.experience) setExperiences(portfolio.experience);
  }, [portfolio]);

  const openAdd = () => { setEditingExp(null); setModalOpen(true); };
  const openEdit = (exp) => { setEditingExp(exp); setModalOpen(true); };

  const handleSaveExp = (formData) => {
    let updated;
    if (editingExp?._id) {
      updated = experiences.map((e) => e._id === editingExp._id ? { ...editingExp, ...formData } : e);
    } else {
      updated = [...experiences, { ...formData, _id: Date.now().toString() }];
    }
    setExperiences(updated);
    setModalOpen(false);
  };

  const confirmDelete = () => {
    setExperiences((prev) => prev.filter((e) => e._id !== deleteTarget._id));
    setDeleteTarget(null);
  };

  const handleSave = async () => {
    const result = await updatePortfolio({ experience: experiences });
    if (result.success) {
      showToast('Experience saved! 🌸');
      if (onNextTab) onNextTab();
    }
    else showToast('Oops! Something went wrong 😢');
  };

  /* Format date range */
  const formatDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.endDate || 'Present';
    if (!start) return end;
    return `${start} - ${end}`;
  };

  return (
    <div className="experience-tab">
      <div className="tab-header-row">
        <h1 className="editor-section-title" style={{ marginBottom: 0 }}>Work Experience</h1>
        <button className="btn-add" onClick={openAdd} id="add-experience-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Experience
          <span className="btn-add__emoji">✨</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">💼</span>
          <h3>No experience yet</h3>
          <p>Add your first experience! ✨</p>
          <button className="btn-save" onClick={openAdd} style={{ marginTop: 12 }}>Add Experience</button>
        </div>
      ) : (
        <div className="exp-cards">
          {experiences.map((exp, i) => {
            const logoColor = LOGO_COLORS[i % LOGO_COLORS.length];
            const initials = exp.company?.slice(0, 1).toUpperCase() || '?';
            return (
              <div className="exp-card" key={exp._id || i}>
                {/* Company logo/initials */}
                <div className="exp-card__logo" style={{ background: logoColor }}>
                  <span className="exp-card__logo-letter">{initials}</span>
                </div>

                <div className="exp-card__body">
                  <div className="exp-card__top">
                    <div>
                      <h3 className="exp-card__title">{exp.title}</h3>
                      <p className="exp-card__company">{exp.company}</p>
                    </div>
                    <div className="exp-card__right">
                      <span className="exp-card__date">{formatDate(exp)}</span>
                      <div className="exp-card__actions">
                        <button className="icon-btn icon-btn--edit" onClick={() => openEdit(exp)} title="Edit" id={`edit-exp-${exp._id}`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button className="icon-btn icon-btn--delete" onClick={() => setDeleteTarget(exp)} title="Delete" id={`delete-exp-${exp._id}`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="exp-card__desc">{exp.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="tab-save-row">
        <button className="btn-save" onClick={handleSave} disabled={isSaving} id="experience-save-btn">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {modalOpen && (
        <ExperienceModal
          experience={editingExp}
          onSave={handleSaveExp}
          onClose={() => setModalOpen(false)}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          label={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default ExperienceTab;
