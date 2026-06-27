import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../../../store/portfolioStore';
import ExperienceCard from './ExperienceCard';
import ExperienceForm from './ExperienceForm';
import FormActions from '../../../../common/FormInputs/FormActions';
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

/* Delete Confirmation Modal */
const ConfirmDeleteModal = ({ onConfirm, onCancel, label }) => (
  <div className="modal-backdrop" onClick={onCancel}>
    <div className="modal-box modal-box--sm" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-title" style={{ marginBottom: 12 }}>Delete Experience? 🗑️</h2>
      <p style={{ fontSize: 14, color: 'var(--color-bloom-text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
        Are you sure you want to remove <strong>"{label}"</strong>?
      </p>
      <div className="modal-footer">
        <button className="btn-cancel" onClick={onCancel} type="button">Cancel</button>
        <button 
          className="btn-save btn-danger" 
          onClick={onConfirm} 
          id="exp-confirm-delete"
          type="button"
        >
          Delete
        </button>
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
  const [modalKey, setModalKey] = useState(0);

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (portfolio?.experience) {
      setExperiences(portfolio.experience);
      setIsDirty(false);
    }
  }, [portfolio]);

  const openAdd = () => {
    setEditingExp(null);
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const openEdit = (exp) => {
    setEditingExp(exp);
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const handleSaveExp = (formData) => {
    let updated;
    if (editingExp?._id) {
      updated = experiences.map((e) => e._id === editingExp._id ? { ...editingExp, ...formData } : e);
    } else {
      updated = [...experiences, { ...formData, _id: Date.now().toString() }];
    }
    setExperiences(updated);
    setIsDirty(true);
    setModalOpen(false);
  };

  const confirmDelete = () => {
    setExperiences((prev) => prev.filter((e) => e._id !== deleteTarget._id));
    setIsDirty(true);
    setDeleteTarget(null);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    const sanitizedExperience = experiences.map(({ _id, ...rest }) => {
      const exp = _id && /^[0-9a-fA-F]{24}$/.test(_id) ? { _id, ...rest } : rest;
      if (exp.endDate === 'Present' || exp.endDate === '') {
        exp.endDate = null;
      }
      return exp;
    });
    const result = await updatePortfolio({ experience: sanitizedExperience });
    if (result.success) {
      showToast('Experience saved! 🌸');
      setIsDirty(false);
      if (onNextTab) onNextTab();
    } else {
      showToast('Oops! Something went wrong 😢');
    }
  };

  return (
    <div className="experience-tab">
      <div className="tab-header-row">
        <h1 className="editor-section-title" style={{ marginBottom: 0 }}>Work Experience</h1>
        <button 
          className="btn-add" 
          onClick={openAdd} 
          id="add-experience-btn"
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Experience
          <span className="btn-add__emoji">✨</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">💼</span>
          <h3>No experience yet</h3>
          <p>Add your first experience! ✨</p>
          <button 
            className="btn-save" 
            onClick={openAdd} 
            style={{ marginTop: 12 }}
            type="button"
          >
            Add Experience
          </button>
        </div>
      ) : (
        <div className="exp-cards">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp._id || i}
              experience={exp}
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
        <ExperienceForm
          key={modalKey}
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
