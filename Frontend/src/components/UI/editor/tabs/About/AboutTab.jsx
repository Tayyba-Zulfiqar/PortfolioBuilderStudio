import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aboutAndSocialSchema } from '../../../../../schemas/portfolioSchemas';
import { usePortfolioStore } from '../../../../../store/portfolioStore';
import ProfilePictureUpload from './ProfilePictureUpload';
import SocialLinksInput from './SocialLinksInput';
import './AboutTab.css';
import './SharedTabStyles.css'


const AboutTab = ({ portfolio, onNextTab }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const [previewImage, setPreviewImage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(aboutAndSocialSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      headline: '',
      bio: '',
      location: '',
      profilePicture: '',
      github: '',
      linkedin: '',
      twitter: '',
      youtube: '',
    },
  });

  const bioValue = watch('bio') || '';
  const bioMax = 500;

  // Load portfolio data
  useEffect(() => {
    if (portfolio) {
      reset({
        fullName: portfolio.about?.fullName || '',
        headline: portfolio.about?.headline || '',
        bio: portfolio.about?.bio || '',
        location: portfolio.about?.location || '',
        profilePicture: portfolio.about?.profilePicture || '',
        github: portfolio.socialLinks?.github || '',
        linkedin: portfolio.socialLinks?.linkedin || '',
        twitter: portfolio.socialLinks?.twitter || '',
        youtube: portfolio.socialLinks?.youtube || '',
      });
      setPreviewImage(portfolio.about?.profilePicture || '');
    }
  }, [portfolio, reset]);

  const handleImageChange = (base64) => {
    setPreviewImage(base64);
    setValue('profilePicture', base64, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const { github, linkedin, twitter, youtube, ...aboutData } = data;

    const payload = {
      about: {
        fullName: aboutData.fullName || '',
        headline: aboutData.headline || '',
        bio: aboutData.bio || '',
        location: aboutData.location || '',
        profilePicture: aboutData.profilePicture || '',
      },
      socialLinks: {
        github: github || '',
        linkedin: linkedin || '',
        twitter: twitter || '',
        youtube: youtube || '',
      },
    };

    const result = await updatePortfolio(payload);
    if (result.success) {
      alert('Saved! 🌸');
      if (onNextTab) onNextTab();
    } else {
      alert('Something went wrong 😢');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="about-tab">
      <h1 className="editor-section-title">Edit Your Portfolio</h1>

      <ProfilePictureUpload
        previewImage={previewImage}
        onImageChange={handleImageChange}
      />

      {/* Full Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="about-fullName">Full Name</label>
        <input
          id="about-fullName"
          type="text"
          className={`form-input ${errors.fullName ? 'has-error' : ''}`}
          placeholder="Sarah Johnson"
          {...register('fullName')}
        />
        {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
      </div>

      {/* Headline */}
      <div className="form-group">
        <label className="form-label" htmlFor="about-headline">Headline</label>
        <input
          id="about-headline"
          type="text"
          className={`form-input ${errors.headline ? 'has-error' : ''}`}
          placeholder="Creative Developer & Designer"
          {...register('headline')}
        />
        {errors.headline && <p className="form-error">{errors.headline.message}</p>}
      </div>

      {/* Bio */}
      <div className="form-group">
        <label className="form-label" htmlFor="about-bio">Bio</label>
        <textarea
          id="about-bio"
          className={`form-textarea ${errors.bio ? 'has-error' : ''}`}
          placeholder="Passionate about creating beautiful, functional digital experiences..."
          maxLength={bioMax}
          rows={5}
          {...register('bio')}
        />
        <div className="form-char-counter">{bioValue.length}/{bioMax}</div>
        {errors.bio && <p className="form-error">{errors.bio.message}</p>}
      </div>

      {/* Location */}
      <div className="form-group">
        <label className="form-label" htmlFor="about-location">Location</label>
        <input
          id="about-location"
          type="text"
          className={`form-input ${errors.location ? 'has-error' : ''}`}
          placeholder="San Francisco, CA"
          {...register('location')}
        />
        {errors.location && <p className="form-error">{errors.location.message}</p>}
      </div>

      {/* Social Links */}
      <SocialLinksInput register={register} errors={errors} />

      {/* Save Button */}
      <div className="tab-save-row">
        <button
          type="submit"
          className="btn-save"
          disabled={isSaving || isSubmitting}
        >
          {isSaving || isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        {!isValid && Object.keys(errors).length > 0 && (
          <p className="form-error" style={{ marginTop: '8px', textAlign: 'center' }}>
            Please fix the errors above before saving.
          </p>
        )}
      </div>
    </form>
  );
};

export default AboutTab;