import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { experienceSchema } from '../../../../../schemas/portfolioSchemas';
import FormInput from '../../../../common/FormInputs/FormInput';
import FormTextarea from '../../../../common/FormInputs/FormTextarea';
import '../../../../common/FormInputs/SharedTabStyles.css';

const EMPTY_EXP = {
  title: '',
  company: '',
  startDate: '',
  endDate: '',
  description: '',
  logo: '',
};

const ExperienceForm = ({ experience, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(experienceSchema),
    mode: 'all',
    defaultValues: experience
      ? {
          title: experience.title || '',
          company: experience.company || '',
          startDate: experience.startDate || '',
          endDate: experience.endDate || '',
          description: experience.description || '',
          logo: experience.logo || '',
        }
      : EMPTY_EXP,
  });

  const [isCurrent, setIsCurrent] = useState(
    experience ? (!experience.endDate || experience.endDate.toLowerCase() === 'present') : false
  );

  const handleCurrentChange = (e) => {
    setIsCurrent(e.target.checked);
    if (e.target.checked) {
      setValue('endDate', 'Present', { shouldValidate: true });
      clearErrors('endDate');
    } else {
      setValue('endDate', '', { shouldValidate: true });
    }
  };

  const onSubmitForm = (data) => {
    onSave({ ...experience, ...data });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {experience?._id ? 'Edit Experience' : 'Add Experience'} 💼
          </h2>
          <button 
            className="modal-close" 
            onClick={onClose} 
            id="exp-modal-close"
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="modal-body">
            <FormInput
              label="Job Title"
              id="exp-title-input"
              placeholder="Senior Frontend Developer"
              error={errors.title}
              required
              {...register('title')}
            />

            <FormInput
              label="Company"
              id="exp-company-input"
              placeholder="Bloom Technologies"
              error={errors.company}
              required
              {...register('company')}
            />

            <div className="exp-date-row" style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <div className="form-group">
                      <label className="form-label" htmlFor="exp-start-input">
                        Start Date<span className="required-star">*</span>
                      </label>
                      <div className="form-input-wrapper">
                        <DatePicker
                          id="exp-start-input"
                          selected={field.value && !isNaN(new Date(field.value).getTime()) ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                          dateFormat="MM/dd/yyyy"
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={30}
                          dropdownMode="select"
                          className={`form-input ${errors.startDate ? 'has-error' : ''}`}
                          placeholderText="Select start date"
                        />
                      </div>
                      {errors.startDate && <p className="form-error">{errors.startDate.message}</p>}
                    </div>
                  )}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {isCurrent ? (
                  <FormInput
                    label="End Date"
                    id="exp-end-input"
                    type="text"
                    disabled={true}
                    error={errors.endDate}
                    {...register('endDate')}
                  />
                ) : (
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <div className="form-group">
                        <label className="form-label" htmlFor="exp-end-input">
                          End Date
                        </label>
                        <div className="form-input-wrapper">
                          <DatePicker
                            id="exp-end-input"
                            selected={field.value && field.value !== 'Present' && !isNaN(new Date(field.value).getTime()) ? new Date(field.value) : null}
                            onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                            dateFormat="MM/dd/yyyy"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={30}
                            dropdownMode="select"
                            className={`form-input ${errors.endDate ? 'has-error' : ''}`}
                            placeholderText="Select end date"
                          />
                        </div>
                        {errors.endDate && <p className="form-error">{errors.endDate.message}</p>}
                      </div>
                    )}
                  />
                )}
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: '14px', color: 'var(--color-bloom-text-muted)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={isCurrent} 
                    onChange={handleCurrentChange} 
                  />
                  I currently work here
                </label>
              </div>
            </div>

            <FormTextarea
              label="Description"
              id="exp-desc-input"
              placeholder="Leading frontend development for a portfolio platform used by 10,000+ creatives..."
              error={errors.description}
              rows={4}
              {...register('description')}
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
              id="exp-save-btn"
            >
              {experience?._id ? 'Update Experience' : 'Add Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
