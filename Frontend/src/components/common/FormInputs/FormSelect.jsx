import './SharedTabStyles.css';
import React from 'react';

const FormSelect = React.forwardRef(({
    label,
    id,
    options = [],
    placeholder,
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
            <select
                ref={ref}
                id={id}
                className={`form-select ${error ? 'has-error' : ''}`}
                disabled={disabled}
                {...props}
            >
                {placeholder && (
                    <option value="">{placeholder}</option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="form-error">{error.message || error}</p>}
        </div>
    );
});

FormSelect.displayName = 'FormSelect';

export default FormSelect;