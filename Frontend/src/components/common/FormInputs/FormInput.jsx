import './SharedTabStyles.css';
import React from 'react';

const FormInput = React.forwardRef(({
    label,
    id,
    type = 'text',
    placeholder,
    icon,
    error,
    disabled,
    required,
    className = '',
    ...props
}, ref) => {
    return (
        <div className={`form-group ${className}`}>
            {label && (
                <label className="form-label" htmlFor={id}>
                    {label}
                    {required && <span className="required-star">*</span>}
                </label>
            )}
            <div className="form-input-wrapper">
                {icon && <span className="form-input-icon">{icon}</span>}
                <input
                    ref={ref}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className={`form-input ${icon ? 'with-icon' : ''} ${error ? 'has-error' : ''}`}
                    disabled={disabled}
                    {...props}
                />
            </div>
            {error && <p className="form-error">{error.message || error}</p>}
        </div>
    );
});

FormInput.displayName = 'FormInput';

export default FormInput;