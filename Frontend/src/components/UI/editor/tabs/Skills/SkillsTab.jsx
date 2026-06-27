import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { skillSchema } from '../../../../../schemas/portfolioSchemas';
import { usePortfolioStore } from '../../../../../store/portfolioStore';
import SkillCard from './SkillCard';
import SkillForm from './SkillForm';
import FormActions from '../../../../common/FormInputs/FormActions';
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

const SkillsTab = ({ portfolio, onNextTab }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(
      z.object({
        skills: z.array(skillSchema),
      })
    ),
    mode: 'onChange',
    defaultValues: {
      skills: [],
    },
  });

  const { fields: skills, append, remove, update } = useFieldArray({
    control,
    name: 'skills',
  });

  useEffect(() => {
    if (portfolio?.skills) {
      reset({ skills: portfolio.skills });
    }
  }, [portfolio, reset]);

  const handleAddSkill = (skill) => {
    append({ ...skill, _id: Date.now().toString() });
    setModalKey((k) => k + 1);
    setModalOpen(false);
  };

  const handleRemoveSkill = (index) => {
    remove(index);
  };

  const handleProficiencyChange = (index, proficiency) => {
    update(index, { ...skills[index], proficiency });
  };

  const onSubmit = async (data) => {
    const sanitizedSkills = data.skills.map(({ _id, ...rest }) => 
      _id && /^[0-9a-fA-F]{24}$/.test(_id) ? { _id, ...rest } : rest
    );
    const result = await updatePortfolio({ skills: sanitizedSkills });
    if (result.success) {
      showToast('Skills saved! 🚀');
      reset(data);
      if (onNextTab) onNextTab();
    } else {
      showToast('Oops! Something went wrong 😢');
    }
  };

  const openAddModal = () => {
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  return (
    <div className="skills-tab">
      <div className="tab-header-row">
        <h1 className="editor-section-title" style={{ marginBottom: 0 }}>Your Skills</h1>
        <button 
          className="btn-add" 
          onClick={openAddModal} 
          id="add-skill-btn"
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Skill
          <span className="btn-add__emoji">🎀</span>
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">⭐</span>
          <h3>No skills yet</h3>
          <p>Add your skills to showcase your expertise! ✨</p>
          <button 
            className="btn-save" 
            onClick={openAddModal} 
            style={{ marginTop: 12 }}
            type="button"
          >
            Add a Skill
          </button>
        </div>
      ) : (
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.id || skill._id || i}
              skill={skill}
              index={i}
              onRemove={handleRemoveSkill}
              onProficiencyChange={handleProficiencyChange}
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
        <SkillForm
          key={modalKey}
          onSave={handleAddSkill}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SkillsTab;
