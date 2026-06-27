import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { skillSchema } from '../../../../../schemas/portfolioSchemas';
import FormInput from '../../../../common/FormInputs/FormInput';
import FormSelect from '../../../../common/FormInputs/FormSelect';
import '../../../../common/FormInputs/SharedTabStyles.css';

const DEFAULT_SKILL = {
  name: '',
  proficiency: 'Intermediate',
};

const SkillForm = ({ onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillSchema),
    mode: 'all',
    defaultValues: DEFAULT_SKILL,
  });

  const onSubmitForm = (data) => {
    onSave(data);
  };

  const proficiencyOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Expert', label: 'Expert' },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box modal-box--sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Skill 🎀</h2>
          <button 
            className="modal-close" 
            onClick={onClose} 
            id="skill-modal-close"
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="modal-body">
            <FormInput
              label="Skill Name"
              id="skill-name-input"
              placeholder="e.g. React, Figma, Python..."
              error={errors.name}
              required
              autoFocus
              {...register('name')}
            />

            <FormSelect
              label="Proficiency Level"
              id="skill-proficiency-select"
              options={proficiencyOptions}
              error={errors.proficiency}
              required
              {...register('proficiency')}
            />
          </div>

          <div className="modal-footer">
            <button 
              className="btn-cancel" 
              onClick={onClose} 
              type="button"
            >
              Cancel
            </button>
            <button 
              className="btn-save" 
              type="submit" 
              id="skill-save-btn"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
