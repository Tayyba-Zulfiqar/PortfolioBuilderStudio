import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../../store/portfolioStore';
import './EducationTab.css';

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

const EMPTY_EDU = {
  degree: '',
  institution: '',
  startYear: '',
  endYear: '',
  gpa: '',
};

/* Education Modal */
const EducationModal = ({ education, onSave, onClose }) => {
  const [form, setForm] = useState(education || EMPTY_EDU);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {education?._id ? 'Edit Education' : 'Add Education'} 🎓
          </h2>
          <button className="modal-close" onClick={onClose} id="edu-modal-close">✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Degree / Qualification *</label>
            <input
              className="form-input"
              name="degree"
              placeholder="B.S. Computer Science"
              value={form.degree}
              onChange={handleChange}
              id="edu-degree-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Institution *</label>
            <input
              className="form-input"
              name="institution"
              placeholder="Stanford University"
              value={form.institution}
              onChange={handleChange}
              id="edu-institution-input"
            />
          </div>
          <div className="exp-date-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Start Year</label>
              <input
                className="form-input"
                name="startYear"
                type="text"
                placeholder="2016"
                value={form.startYear}
                onChange={handleChange}
                id="edu-start-input"
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">End Year</label>
              <input
                className="form-input"
                name="endYear"
                type="text"
                placeholder="2020 or Present"
                value={form.endYear}
                onChange={handleChange}
                id="edu-end-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">GPA (optional)</label>
            <input
              className="form-input"
              name="gpa"
              type="text"
              placeholder="3.8/4.0"
              value={form.gpa}
              onChange={handleChange}
              id="edu-gpa-input"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="btn-save"
            onClick={() => { if (form.degree.trim()) onSave(form); }}
            id="edu-save-btn"
          >
            {education?._id ? 'Update Education' : 'Add Education'}
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
      <h2 className="modal-title" style={{ marginBottom: 12 }}>Delete Education? 🗑️</h2>
      <p style={{ fontSize: 14, color: 'var(--color-bloom-text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
        Are you sure you want to remove <strong>"{label}"</strong>?
      </p>
      <div className="modal-footer">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn-save btn-danger" onClick={onConfirm} id="edu-confirm-delete">Delete</button>
      </div>
    </div>
  </div>
);

const EducationTab = ({ portfolio }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();

  const mapEdu = (list) => (list || []).map((e) => ({
    ...e,
    startYear: e.startYear || (e.year ? String(e.year).split('-')[0] : ''),
    endYear: e.endYear || (e.year ? String(e.year).split('-')[1] || '' : ''),
    gpa: e.gpa ? String(e.gpa) : '',
    _id: e._id || Date.now().toString(),
  }));

  const [educations, setEducations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (portfolio?.education) setEducations(mapEdu(portfolio.education));
  }, [portfolio]);

  const openAdd = () => { setEditingEdu(null); setModalOpen(true); };
  const openEdit = (edu) => { setEditingEdu(edu); setModalOpen(true); };

  const handleSaveEdu = (formData) => {
    let updated;
    if (editingEdu?._id) {
      updated = educations.map((e) => e._id === editingEdu._id ? { ...editingEdu, ...formData } : e);
    } else {
      updated = [...educations, { ...formData, _id: Date.now().toString() }];
    }
    setEducations(updated);
    setModalOpen(false);
  };

  const confirmDelete = () => {
    setEducations((prev) => prev.filter((e) => e._id !== deleteTarget._id));
    setDeleteTarget(null);
  };

  const handleSave = async () => {
    // Map back to backend schema
    const mapped = educations.map((e) => ({
      degree: e.degree,
      institution: e.institution,
      year: e.startYear && e.endYear ? `${e.startYear}-${e.endYear}` : e.startYear || e.endYear || '',
      gpa: parseFloat(e.gpa) || undefined,
    }));
    const result = await updatePortfolio({ education: mapped });
    if (result.success) showToast('Education saved! 🌸');
    else showToast('Oops! Something went wrong 😢');
  };

  const formatYear = (edu) => {
    if (edu.startYear && edu.endYear) return `${edu.startYear} - ${edu.endYear}`;
    if (edu.startYear) return edu.startYear;
    if (edu.endYear) return edu.endYear;
    return '';
  };

  return (
    <div className="education-tab">
      <div className="tab-header-row">
        <h1 className="editor-section-title" style={{ marginBottom: 0 }}>Education</h1>
        <button className="btn-add" onClick={openAdd} id="add-education-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Education
          <span className="btn-add__emoji">✨</span>
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🎓</span>
          <h3>No education yet</h3>
          <p>Add your educational background! ✨</p>
          <button className="btn-save" onClick={openAdd} style={{ marginTop: 12 }}>Add Education</button>
        </div>
      ) : (
        <div className="edu-cards">
          {educations.map((edu, i) => (
            <div className="edu-card" key={edu._id || i}>
              <div className="edu-card__body">
                <div className="edu-card__top">
                  <div>
                    <h3 className="edu-card__degree">{edu.degree}</h3>
                    <p className="edu-card__institution">{edu.institution}</p>
                    {formatYear(edu) && (
                      <p className="edu-card__year">{formatYear(edu)}</p>
                    )}
                  </div>
                  <div className="edu-card__right">
                    {edu.gpa && (
                      <span className="edu-card__gpa">{edu.gpa}</span>
                    )}
                    <div className="edu-card__actions">
                      <button className="icon-btn icon-btn--edit" onClick={() => openEdit(edu)} title="Edit" id={`edit-edu-${edu._id}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="icon-btn icon-btn--delete" onClick={() => setDeleteTarget(edu)} title="Delete" id={`delete-edu-${edu._id}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="tab-save-row">
        <button className="btn-save" onClick={handleSave} disabled={isSaving} id="education-save-btn">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {modalOpen && (
        <EducationModal
          education={editingEdu}
          onSave={handleSaveEdu}
          onClose={() => setModalOpen(false)}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          label={deleteTarget.degree}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default EducationTab;
