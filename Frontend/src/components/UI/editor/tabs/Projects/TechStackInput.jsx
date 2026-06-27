import { useState } from 'react';
import '../../../../common/FormInputs/SharedTabStyles.css';

const TechStackInput = ({ value = [], onChange }) => {
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="form-group">
      <label className="form-label">Tech Stack</label>
      <div className="tag-input-wrap">
        <div className="tag-list">
          {value.map((tag) => (
            <span key={tag} className="tag-item">
              {tag}
              <button 
                className="tag-remove" 
                onClick={() => removeTag(tag)} 
                type="button"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
        <div className="tag-input-row">
          <input
            className="form-input tag-input"
            placeholder="React, Node.js... (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
          <button className="tag-add-btn" onClick={addTag} type="button">Add</button>
        </div>
      </div>
    </div>
  );
};

export default TechStackInput;
