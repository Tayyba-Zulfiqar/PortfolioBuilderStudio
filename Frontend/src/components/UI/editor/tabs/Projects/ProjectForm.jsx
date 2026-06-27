import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '../../../../../schemas/portfolioSchemas';
import FormInput from '../../../../common/FormInputs/FormInput';
import FormTextarea from '../../../../common/FormInputs/FormTextarea';
import TechStackInput from './TechStackInput';
import '../../../../common/FormInputs/SharedTabStyles.css';

const getEmptyProject = () => ({
  title: '',
  description: '',
  techStack: [],
  liveUrl: '',
  githubUrl: '',
  images: [],
});

const ProjectForm = ({ project, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(projectSchema),
    mode: 'all',
    defaultValues: project
      ? {
          title: project.title || '',
          description: project.description || '',
          techStack: project.techStack || [],
          liveUrl: project.liveUrl || '',
          githubUrl: project.githubUrl || '',
          images: project.images || [],
        }
      : getEmptyProject(),
  });

  const onSubmitForm = (data) => {
    onSave({ ...project, ...data });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {project?._id ? 'Edit Project' : 'Add New Project'} ✨
          </h2>
          <button 
            className="modal-close" 
            onClick={onClose} 
            id="project-modal-close"
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="modal-body">
            <FormInput
              label="Project Title"
              id="project-title"
              placeholder="Bloom E-Commerce"
              error={errors.title}
              required
              {...register('title')}
            />

            <FormTextarea
              label="Description"
              id="project-description"
              placeholder="A beautiful e-commerce platform..."
              error={errors.description}
              rows={3}
              required
              {...register('description')}
            />

            <Controller
              control={control}
              name="techStack"
              render={({ field: { value, onChange } }) => (
                <TechStackInput value={value} onChange={onChange} />
              )}
            />

            <FormInput
              label="Live URL"
              id="project-liveUrl"
              placeholder="https://bloom-shop.com"
              error={errors.liveUrl}
              {...register('liveUrl')}
            />

            <FormInput
              label="GitHub URL"
              id="project-githubUrl"
              placeholder="https://github.com/you/bloom-shop"
              error={errors.githubUrl}
              {...register('githubUrl')}
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
              id="project-save-btn"
            >
              {project?._id ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
