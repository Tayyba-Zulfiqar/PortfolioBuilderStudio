
import './SharedTabStyles.css';

const FormActions = ({
    isSaving,
    isSubmitting,
    isValid = true,
    isDirty = true,
    errors = {},
    onSave,
    saveText = 'Save Changes',
    savingText = 'Saving...',
    showErrorSummary = true,
    className = '',
}) => {
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className={`tab-save-row ${className}`}>
            <button
                type="submit"
                className="btn-save"
                disabled={isSaving || isSubmitting || !isValid || !isDirty}
                onClick={onSave}
            >
                {isSaving || isSubmitting ? savingText : saveText}
            </button>
            
            {showErrorSummary && !isValid && hasErrors && (
                <p className="form-error" style={{ marginTop: '8px', textAlign: 'center' }}>
                    Please fix the errors above before saving.
                </p>
            )}

            {!isDirty && isValid && (
                <p className="form-message" style={{ marginTop: '8px', textAlign: 'center', fontSize: '14px', color: 'var(--color-bloom-text-muted)' }}>
                    No changes to save
                </p>
            )}
        </div>
    );
};

export default FormActions;