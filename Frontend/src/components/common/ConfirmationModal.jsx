import React, { useEffect } from 'react';
import './ConfirmationModal.css';

/**
 * Reusable Confirmation Modal component matching the Bloom Portfolio aesthetic
 * 
 * @param {object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {Function} props.onClose - Action when closed without confirming
 * @param {Function} props.onConfirm - Action when confirmed
 * @param {string} [props.title="Are You Sure?"] - Optional modal title
 * @param {string} [props.message] - Optional explanation text
 * @param {string} [props.confirmText="Confirm"] - Text on the primary action button
 * @param {string} [props.cancelText="Cancel"] - Text on the cancel button
 * @param {'danger' | 'warning' | 'default'} [props.variant="default"] - Styling theme for primary button
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are You Sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
}) => {
  
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Lock background scrolling
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} // Stop propagation to avoid closing modal when clicking card
      >
        <h3 className="modal-title">{title}</h3>
        {message && <p className="modal-message">{message}</p>}
        
        <div className="modal-actions">
          <button 
            type="button" 
            className="modal-btn modal-btn-cancel" 
            onClick={onClose}
          >
            {cancelText}
          </button>
          
          <button 
            type="button" 
            className={`modal-btn modal-btn-confirm variant-${variant}`} 
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
