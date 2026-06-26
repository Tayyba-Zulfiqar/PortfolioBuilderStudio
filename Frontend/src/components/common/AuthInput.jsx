import React from 'react';
import './AuthInput.css';

const AuthInput = React.forwardRef(({
  icon,
  error,
  disabled,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="auth-input-group">
      <div className={`auth-input-wrapper ${error ? 'error' : ''} ${className}`}>
        {icon}
        <input
          ref={ref}
          className="auth-input"
          disabled={disabled}
          {...props}
        />
      </div>
      {error && (
        <span className="auth-error-message">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

AuthInput.displayName = 'AuthInput';

export default AuthInput;
