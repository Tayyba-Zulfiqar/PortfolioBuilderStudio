import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../../../store/portfolioStore';
import EducationCard from './EducationCard';
import EducationForm from './EducationForm';
import FormActions from '../../../../common/FormInputs/FormActions';
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

/* Delete Confirmation Modal */
const ConfirmDeleteModal = ({ onConfirm, onCancel, label }) => (
  <div className="modal-backdrop" onClick={onCancel}>
    <div className="modal-box modal-box--sm" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-title" style={{ marginBottom: 12 }}>Delete Education? 🗑️</h2>
      <p style={{ fontSize: 14, color: 'var(--color-bloom-text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
        Are you sure you want to remove <strong>"{label}"</strong>?
      </p>
      <div className="modal-footer">
        <button className="btn-cancel" onClick={onCancel} type="button">Cancel</button>
        <button 
          className="btn-save btn-danger" 
          onClick={onConfirm} 
          id="edu-confirm-delete"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const EducationTab = ({ portfolio, onNextTab }) => {
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
  const [modalKey, setModalKey] = useState(0);

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (portfolio?.education) {
      setEducations(mapEdu(portfolio.education));
      setIsDirty(false);
    }
  }, [portfolio]);

  const openAdd = () => {
    setEditingEdu(null);
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const openEdit = (edu) => {
    setEditingEdu(edu);
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const handleSaveEdu = (formData) => {
    let updated;
    if (editingEdu?._id) {
      updated = educations.map((e) => e._id === editingEdu._id ? { ...editingEdu, ...formData } : e);
    } else {
      updated = [...educations, { ...formData, _id: Date.now().toString() }];
    }
    setEducations(updated);
    setIsDirty(true);
    setModalOpen(false);
  };

  const confirmDelete = () => {
    setEducations((prev) => prev.filter((e) => e._id !== deleteTarget._id));
    setIsDirty(true);
    setDeleteTarget(null);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    // Map back to backend schema
    const mapped = educations.map((e) => {
      const item = {
        degree: e.degree,
        institution: e.institution,
        year: e.startYear && e.endYear ? `${e.startYear}-${e.endYear}` : e.startYear || e.endYear || '',
        gpa: parseFloat(e.gpa) || undefined,
      };
      if (e._id && /^[0-9a-fA-F]{24}$/.test(e._id)) {
        item._id = e._id;
      }
      return item;
    });
    const result = await updatePortfolio({ education: mapped });
    if (result.success) {
      showToast('Education saved! 🎓');
      setIsDirty(false);
      if (onNextTab) onNextTab();
    } else {
      showToast('Oops! Something went wrong 😢');
    }
  };

  return (
    <div className="education-tab">
      <div className="tab-header-row">
        <h1 className="editor-section-title" style={{ marginBottom: 0 }}>Education</h1>
        <button 
          className="btn-add" 
          onClick={openAdd} 
          id="add-education-btn"
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Education
          <span className="btn-add__emoji">✨</span>
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🎓</span>
          <h3>No education yet</h3>
          <p>Add your educational background! ✨</p>
          <button 
            className="btn-save" 
            onClick={openAdd} 
            style={{ marginTop: 12 }}
            type="button"
          >
            Add Education
          </button>
        </div>
      ) : (
        <div className="edu-cards">
          {educations.map((edu, i) => (
            <EducationCard
              key={edu._id || i}
              education={edu}
              index={i}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <form onSubmit={handleSave}>
        <FormActions
          isSaving={isSaving}
          isSubmitting={false}
          isValid={true}
          isDirty={isDirty}
          errors={{}}
          saveText="Save Changes"
          savingText="Saving..."
          showErrorSummary={false}
        />
      </form>

      {modalOpen && (
        <EducationForm
          key={modalKey}
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
