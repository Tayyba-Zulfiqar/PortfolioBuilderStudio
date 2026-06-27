import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { experienceSchema } from '../../../../../schemas/portfolioSchemas';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [editingExpIndex, setEditingExpIndex] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modalKey, setModalKey] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(
      z.object({
        experience: z.array(experienceSchema),
      })
    ),
    mode: 'onChange',
    defaultValues: {
      experience: [],
    },
  });

  const { fields: experiences, append, remove, update } = useFieldArray({
    control,
    name: 'experience',
  });

  useEffect(() => {
    if (portfolio?.experience) {
      reset({ experience: portfolio.experience });
    }
  }, [portfolio, reset]);

  const openAdd = () => {
    setEditingExp(null);
    setEditingExpIndex(null);
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const openEdit = (exp, index) => {
    setEditingExp(exp);
    setEditingExpIndex(index);
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const handleSaveExp = (formData) => {
    if (editingExpIndex !== null) {
      update(editingExpIndex, formData);
    } else {
      append(formData);
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      remove(deleteTarget.index);
    }
    setDeleteTarget(null);
  };

  const onSubmit = async (data) => {
    const sanitizedExperience = data.experience.map(({ _id, ...rest }) => {
      const exp = _id && /^[0-9a-fA-F]{24}$/.test(_id) ? { _id, ...rest } : rest;
      if (exp.endDate === 'Present' || exp.endDate === '') {
        exp.endDate = null;
      }
      return exp;
    });
    const result = await updatePortfolio({ experience: sanitizedExperience });
    if (result.success) {
      showToast('Experience saved! 🌸');
      reset(data);
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
              key={exp.id || exp._id || i}
              experience={exp}
              index={i}
              onEdit={openEdit}
              onDelete={(target) => setDeleteTarget({ exp: target, index: i })}
            />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormActions
          isSaving={isSaving}
          isSubmitting={isSubmitting}
          isValid={isValid}
          isDirty={isDirty}
          errors={errors}
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
          label={deleteTarget.exp?.company || ''}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default ExperienceTab;
