import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../../store/portfolioStore';
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

const EMPTY_PROJECT = {
  title: '',
  description: '',
  techStack: [],
  liveUrl: '',
  githubUrl: '',
};

/* Modal Component */
const ProjectModal = ({ project, onSave, onClose }) => {
  const [form, setForm] = useState(project || EMPTY_PROJECT);
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.techStack.includes(tag)) {
      setForm((prev) => ({ ...prev, techStack: [...prev.techStack, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setForm((prev) => ({ ...prev, techStack: prev.techStack.filter((t) => t !== tag) }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addTag(); }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{project?._id ? 'Edit Project' : 'Add New Project'} ✨</h2>
          <button className="modal-close" onClick={onClose} id="project-modal-close">✕</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input className="form-input" name="title" placeholder="Bloom E-Commerce" value={form.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" name="description" placeholder="A beautiful e-commerce platform..." value={form.description} onChange={handleChange} rows={3} />
          </div>
          <div className="form-group">
            <label className="form-label">Tech Stack</label>
            <div className="tag-input-wrap">
              <div className="tag-list">
                {form.techStack.map((tag) => (
                  <span key={tag} className="tag-item">
                    {tag}
                    <button className="tag-remove" onClick={() => removeTag(tag)}>✕</button>
                  </span>
                ))}
              </div>
              <div className="tag-input-row">
                <input
                  className="form-input tag-input"
                  placeholder="React, Node.js... (press Enter)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <button className="tag-add-btn" onClick={addTag} type="button">Add</button>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Live URL</label>
            <input className="form-input" name="liveUrl" placeholder="https://bloom-shop.com" value={form.liveUrl} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input className="form-input" name="githubUrl" placeholder="https://github.com/you/bloom-shop" value={form.githubUrl} onChange={handleChange} />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={() => onSave(form)} id="project-save-btn">
            {project?._id ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* Delete Confirmation */
const ConfirmDeleteModal = ({ onConfirm, onCancel, label }) => (
  <div className="modal-backdrop" onClick={onCancel}>
    <div className="modal-box modal-box--sm" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-title" style={{ marginBottom: 12 }}>Delete Project? 🗑️</h2>
      <p style={{ fontSize: 14, color: 'var(--color-bloom-text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
        Are you sure you want to delete <strong>"{label}"</strong>? This action cannot be undone.
      </p>
      <div className="modal-footer">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn-save btn-danger" onClick={onConfirm} id="project-confirm-delete">Delete</button>
      </div>
    </div>
  </div>
);

const ProjectsTab = ({ portfolio, onNextTab }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (portfolio?.projects) setProjects(portfolio.projects);
  }, [portfolio]);

  const openAddModal = () => { setEditingProject(null); setModalOpen(true); };
  const openEditModal = (proj) => { setEditingProject(proj); setModalOpen(true); };

  const handleSaveProject = (formData) => {
    if (!formData.title.trim()) return;
    let updated;
    if (editingProject?._id) {
      updated = projects.map((p) => (p._id === editingProject._id ? { ...editingProject, ...formData } : p));
    } else {
      updated = [...projects, { ...formData, _id: Date.now().toString() }];
    }
    setProjects(updated);
    setModalOpen(false);
  };

  const handleDelete = (proj) => setDeleteTarget(proj);
  const confirmDelete = () => {
    setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
    setDeleteTarget(null);
  };

  const handleSave = async () => {
    const result = await updatePortfolio({ projects });
    if (result.success) {
      showToast('Projects saved! 🌸');
      if (onNextTab) onNextTab();
    }
    else showToast('Oops! Something went wrong 😢');
  };

  return (
    <div className="projects-tab">
      <div className="tab-header-row">
        <h1 className="editor-section-title" style={{ marginBottom: 0 }}>Your Projects</h1>
        <button className="btn-add" onClick={openAddModal} id="add-project-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New Project
          <span className="btn-add__emoji">✨</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🗂️</span>
          <h3>No projects yet</h3>
          <p>Add your first project to showcase your work! ✨</p>
          <button className="btn-save" onClick={openAddModal} style={{ marginTop: 12 }}>Add a Project</button>
        </div>
      ) : (
        <div className="project-cards">
          {projects.map((proj) => (
            <div className="project-card" key={proj._id}>
              <div className="project-card__drag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="6" r="1" fill="currentColor"/><circle cx="15" cy="6" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="18" r="1" fill="currentColor"/><circle cx="15" cy="18" r="1" fill="currentColor"/></svg>
              </div>
              <div className="project-card__body">
                <div className="project-card__top">
                  <h3 className="project-card__title">{proj.title}</h3>
                  <div className="project-card__actions">
                    <button className="icon-btn icon-btn--edit" onClick={() => openEditModal(proj)} title="Edit">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button className="icon-btn icon-btn--delete" onClick={() => handleDelete(proj)} title="Delete">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </div>
                </div>
                {proj.description && <p className="project-card__desc">{proj.description}</p>}
                {proj.techStack?.length > 0 && (
                  <div className="project-card__tags">
                    {proj.techStack.map((t) => <span key={t} className="tag-item tag-item--view">{t}</span>)}
                  </div>
                )}
                <div className="project-card__urls">
                  {proj.liveUrl && <span className="project-url">🔗 {proj.liveUrl}</span>}
                  {proj.githubUrl && <span className="project-url">💻 {proj.githubUrl}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="tab-save-row">
        <button className="btn-save" onClick={handleSave} disabled={isSaving} id="projects-save-btn">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {modalOpen && (
        <ProjectModal
          project={editingProject}
          onSave={handleSaveProject}
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

export default ProjectsTab;
