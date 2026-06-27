import './SharedTabStyles.css';
import React from 'react';

const FormTextarea = React.forwardRef(({
    label,
    id,
    placeholder,
    error,
    disabled,
    required,
    rows = 4,
    maxLength,
    charCount = 0,
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
            <textarea
                ref={ref}
                id={id}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                className={`form-textarea ${error ? 'has-error' : ''}`}
                disabled={disabled}
                {...props}
            />
            {maxLength && (
                <div className="form-char-counter">
                    {charCount}/{maxLength}
                </div>
            )}
            {error && <p className="form-error">{error.message || error}</p>}
        </div>
    );
});

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;