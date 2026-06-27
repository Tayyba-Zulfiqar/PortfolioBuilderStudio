import React from 'react';

const DeleteAccount = ({ onDelete }) => {
  return (
    <div className="settings-section settings-section--danger">
      <button type="button" className="delete-account-btn" id="delete-account-btn" onClick={onDelete}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        </svg>
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
