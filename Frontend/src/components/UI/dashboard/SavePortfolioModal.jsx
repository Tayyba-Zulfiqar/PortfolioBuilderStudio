import { useState, useEffect } from 'react';
import { portfolioNameSchema } from '../../../schemas/portfolioSchemas';
import './SavePortfolioModal.css';

/**
 * Modal for naming a new portfolio before saving.
 * Reuses the ConfirmationModal visual patterns (overlay, card, animations).
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {Function} props.onClose - Action when closed / cancelled
 * @param {Function} props.onSave - Called with the validated name string
 * @param {string} [props.defaultName] - Pre-fill the input (e.g. "Portfolio #2")
 * @param {boolean} [props.isSaving] - Disable inputs while saving
 */
const SavePortfolioModal = ({
  isOpen,
  onClose,
  onSave,
  defaultName = '',
  isSaving = false,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(defaultName);
      setError('');
    }
  }, [isOpen, defaultName]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSaving) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isSaving]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setName(value);
      setError('');
    }
  };

  const handleSave = () => {
    const trimmed = name.trim();

    const result = portfolioNameSchema.safeParse(trimmed);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    onSave(result.data);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (!isSaving) onClose(); }}>
      <div className="save-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Icon */}
        <div className="save-modal-icon">🌸</div>

        {/* Title */}
        <h3 className="modal-title">Name Your Portfolio 🌸</h3>
        <p className="modal-message">
          Give your portfolio a name so you can find it later.
        </p>

        {/* Input */}
        <div className="save-modal-field">
          <label htmlFor="portfolio-name" className="save-modal-label">
            Portfolio Name
          </label>
          <input
            id="portfolio-name"
            type="text"
            className={`save-modal-input ${error ? 'has-error' : ''}`}
            placeholder="e.g. My Professional Portfolio"
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isSaving}
            autoFocus
          />
          <div className="save-modal-field-footer">
            {error && <span className="save-modal-error">{error}</span>}
            <span className="save-modal-char-count">{name.length}/50</span>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-actions">
          <button
            type="button"
            className="modal-btn modal-btn-cancel"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="button"
            className="modal-btn modal-btn-confirm variant-default"
            onClick={handleSave}
            disabled={isSaving || name.trim().length < 3}
          >
            {isSaving ? 'Saving...' : 'Save Portfolio'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavePortfolioModal;
