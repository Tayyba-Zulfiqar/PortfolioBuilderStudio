import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { educationFormSchema } from '../../../../../schemas/portfolioSchemas';
import FormInput from '../../../../common/FormInputs/FormInput';
import '../../../../common/FormInputs/SharedTabStyles.css';
import './EducationForm.css';

const EMPTY_EDU = {
  degree: '',
  institution: '',
  startYear: '',
  endYear: '',
  gpa: '',
};

const EducationForm = ({ education, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(educationFormSchema),
    mode: 'all',
    defaultValues: education
      ? {
          degree: education.degree || '',
          institution: education.institution || '',
          startYear: education.startYear || '',
          endYear: education.endYear || '',
          gpa: education.gpa || '',
        }
      : EMPTY_EDU,
  });

  const onSubmitForm = (data) => {
    onSave({ ...education, ...data });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {education?._id ? 'Edit Education' : 'Add Education'} 🎓
          </h2>
          <button 
            className="modal-close" 
            onClick={onClose} 
            id="edu-modal-close"
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="modal-body">
            <FormInput
              label="Degree / Qualification"
              id="edu-degree-input"
              placeholder="B.S. Computer Science"
              error={errors.degree}
              required
              {...register('degree')}
            />

            <FormInput
              label="Institution"
              id="edu-institution-input"
              placeholder="Stanford University"
              error={errors.institution}
              required
              {...register('institution')}
            />

            <div className="exp-date-row">
              <FormInput
                label="Start Year"
                id="edu-start-input"
                placeholder="2016"
                error={errors.startYear}
                required
                {...register('startYear')}
              />

              <FormInput
                label="End Year"
                id="edu-end-input"
                placeholder="2020 or Present"
                error={errors.endYear}
                required
                {...register('endYear')}
              />
            </div>

            <FormInput
              label="GPA (optional)"
              id="edu-gpa-input"
              placeholder="3.8/4.0"
              error={errors.gpa}
              {...register('gpa')}
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
              id="edu-save-btn"
            >
              {education?._id ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;
