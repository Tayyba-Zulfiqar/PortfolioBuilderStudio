import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { projectSchema } from '../../../../../schemas/portfolioSchemas';
import { usePortfolioStore } from '../../../../../store/portfolioStore';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import FormActions from '../../../../common/FormInputs/FormActions';
import './ProjectsTab.css';

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
      <h2 className="modal-title" style={{ marginBottom: 12 }}>Delete Project? 🗑️</h2>
      <p style={{ fontSize: 14, color: 'var(--color-bloom-text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
        Are you sure you want to delete <strong>"{label}"</strong>? This action cannot be undone.
      </p>
      <div className="modal-footer">
        <button className="btn-cancel" onClick={onCancel} type="button">Cancel</button>
        <button 
          className="btn-save btn-danger" 
          onClick={onConfirm} 
          id="project-confirm-delete"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const ProjectsTab = ({ portfolio, onNextTab }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
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
        projects: z.array(projectSchema),
      })
    ),
    mode: 'onChange',
    defaultValues: {
      projects: [],
    },
  });

  const { fields: projects, append, remove, update } = useFieldArray({
    control,
    name: 'projects',
  });

  useEffect(() => {
    if (portfolio?.projects) {
      reset({ projects: portfolio.projects });
    }
  }, [portfolio, reset]);

  const openAddModal = () => {
    setEditingProject(null);
    setEditingProjectIndex(null);
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const openEditModal = (proj, index) => {
    setEditingProject(proj);
    setEditingProjectIndex(index);
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const handleSaveProject = (formData) => {
    if (editingProjectIndex !== null) {
      update(editingProjectIndex, formData);
    } else {
      append(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (proj, index) => {
    setDeleteTarget({ proj, index });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      remove(deleteTarget.index);
    }
    setDeleteTarget(null);
  };

  const onSubmit = async (data) => {
    const sanitizedProjects = data.projects.map(({ _id, ...rest }) => 
      _id && /^[0-9a-fA-F]{24}$/.test(_id) ? { _id, ...rest } : rest
    );
    const result = await updatePortfolio({ projects: sanitizedProjects });
    if (result.success) {
      showToast('Projects saved! 🚀');
      reset(data);
      if (onNextTab) onNextTab();
    } else {
      showToast('Oops! Something went wrong 😢');
    }
  };

  return (
    <div className="projects-tab">
      <div className="tab-header-row">
        <h1 className="editor-section-title" style={{ marginBottom: 0 }}>Your Projects</h1>
        <button 
          className="btn-add" 
          onClick={openAddModal} 
          id="add-project-btn"
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Project
          <span className="btn-add__emoji">✨</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🗂️</span>
          <h3>No projects yet</h3>
          <p>Add your first project to showcase your work! ✨</p>
          <button 
            className="btn-save" 
            onClick={openAddModal} 
            style={{ marginTop: 12 }}
            type="button"
          >
            Add a Project
          </button>
        </div>
      ) : (
        <div className="project-cards">
          {projects.map((proj, index) => (
            <ProjectCard
              key={proj.id || proj._id || index}
              project={proj}
              index={index}
              onEdit={openEditModal}
              onDelete={handleDelete}
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
        <ProjectForm
          key={modalKey}
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => setModalOpen(false)}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          label={deleteTarget.proj?.title || ''}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default ProjectsTab;
