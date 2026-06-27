// frontend/src/components/dashboard/editor/tabs/AboutTab.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aboutAndSocialSchema } from '../../../../../schemas/portfolioSchemas';
import { usePortfolioStore } from '../../../../../store/portfolioStore';
import FormInput from '../../../../common/FormInputs/FormInput';
import FormTextarea from '../../../../common/FormInputs/FormTextarea';
import FormActions from '../../../../common/FormInputs/FormActions';
import ProfilePictureUpload from './ProfilePictureUpload';
import SocialLinksInput from './SocialLinksInput';
import './AboutTab.css';
import '../../../../common/FormInputs/SharedTabStyles.css';

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

const AboutTab = ({ portfolio, onNextTab }) => {
  const { updatePortfolio, isSaving } = usePortfolioStore();
  const [previewImage, setPreviewImage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid, isDirty },
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
    setValue('profilePicture', base64, { shouldValidate: true, shouldDirty: true });
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
      showToast('Saved! 🌸');
      reset(data); // Reset form with the saved data to clear isDirty state
      if (onNextTab) onNextTab();
    } else {
      showToast('Something went wrong 😢');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="about-tab">
      <h1 className="editor-section-title">Edit Your Portfolio</h1>

      <ProfilePictureUpload
        previewImage={previewImage}
        onImageChange={handleImageChange}
      />

      <FormInput
        label="Full Name"
        id="about-fullName"
        placeholder="Sarah Johnson"
        error={errors.fullName}
        required
        {...register('fullName')}
      />

      <FormInput
        label="Headline"
        id="about-headline"
        placeholder="Creative Developer & Designer"
        error={errors.headline}
        required
        {...register('headline')}
      />

      <FormTextarea
        label="Bio"
        id="about-bio"
        placeholder="Passionate about creating beautiful, functional digital experiences..."
        error={errors.bio}
        rows={5}
        maxLength={bioMax}
        charCount={bioValue.length}
        required
        {...register('bio')}
      />

      <FormInput
        label="Location"
        id="about-location"
        placeholder="San Francisco, CA"
        error={errors.location}
        required
        {...register('location')}
      />

      <SocialLinksInput register={register} errors={errors} />
      <FormActions
        isSaving={isSaving}
        isSubmitting={isSubmitting}
        isValid={isValid}
        isDirty={isDirty}
        errors={errors}
        saveText="Save Changes"
        savingText="Saving..."
      />
    </form>
  );
};

export default AboutTab;