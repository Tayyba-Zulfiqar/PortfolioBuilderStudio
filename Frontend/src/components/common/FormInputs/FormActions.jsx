
import './SharedTabStyles.css';

const FormActions = ({
    isSaving,
    isSubmitting,
    isValid = true,
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
                disabled={isSaving || isSubmitting || !isValid}
                onClick={onSave}
            >
                {isSaving || isSubmitting ? savingText : saveText}
            </button>
            {showErrorSummary && !isValid && hasErrors && (
                <p className="form-error" style={{ marginTop: '8px', textAlign: 'center' }}>
                    Please fix the errors above before saving.
                </p>
            )}
        </div>
    );
};

export default FormActions;