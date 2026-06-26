import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../schemas/authSchemas';
import AuthInput from '../../common/AuthInput'
import Button from '../../common/Button';
import './AuthForm.css';


const LoginForm = ({ onSubmit, isLoading }) => {
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const handleFormSubmit = async (data) => {
    setApiError(null);
    const result = await onSubmit(data);
    if (result && !result.success) {
      setApiError(result.error || 'Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="auth-form" noValidate>
      {/* API Errors Banner */}
      {apiError && (
        <div className="auth-alert">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span>{apiError}</span>
        </div>
      )}

      {/* Email Input */}
      <AuthInput
        type="email"
        placeholder="sarah@example.com"
        disabled={isLoading || isSubmitting}
        error={errors.email}
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="auth-icon" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        }
        {...register('email')}
      />

      {/* Password Input */}
      <AuthInput
        type="password"
        placeholder="••••••••••"
        disabled={isLoading || isSubmitting}
        error={errors.password}
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="auth-icon" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        }
        {...register('password')}
      />

      {/* Extras Row */}
      <div className="auth-extras">
        <label className="auth-checkbox-label">
          <input
            type="checkbox"
            className="auth-checkbox"
            disabled={isLoading || isSubmitting}
          />
          <span>Remember me</span>
        </label>
        <Link to="/forgot-password" className="auth-forgot-link">
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="auth-submit-btn"
        disabled={isLoading || isSubmitting}
      >
        {isLoading || isSubmitting ? (
          <span className="auth-spinner"></span>
        ) : (
          'Login 🌹'
        )}
      </Button>

      {/* Redirect Link */}
      <p className="auth-footer">
        New here?
        <Link to="/signup" className="auth-footer-link">
          Create Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
