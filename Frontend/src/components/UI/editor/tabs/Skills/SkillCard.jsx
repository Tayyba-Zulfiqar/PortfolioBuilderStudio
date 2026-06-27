import React from 'react';
import './SkillCard.css';

const PROFICIENCY_COLORS = {
  Expert: { bg: '#dcf5e4', text: '#2d7a4f' },
  Intermediate: { bg: '#ede9f8', text: '#6d4c9e' },
  Beginner: { bg: '#fce4ec', text: '#c0546a' },
};

const SKILL_DOT_COLORS = ['#E58B9D', '#D4C5D9', '#A8D5BA', '#F4A6B5', '#c3aed6', '#e8b4b8'];

const SkillCard = ({ skill, index, onRemove, onProficiencyChange }) => {
  const colors = PROFICIENCY_COLORS[skill.proficiency] || PROFICIENCY_COLORS.Intermediate;
  const dotColor = SKILL_DOT_COLORS[index % SKILL_DOT_COLORS.length];
  const skillId = skill._id || index;

  return (
    <div className="skill-card">
      <span className="skill-dot" style={{ background: dotColor }} />
      <span className="skill-name">{skill.name}</span>
      <span
        className="skill-badge"
        style={{ background: colors.bg, color: colors.text }}
      >
        {skill.proficiency}
      </span>
      <select
        className="skill-proficiency-select"
        value={skill.proficiency}
        onChange={(e) => onProficiencyChange(index, e.target.value)}
        title="Change proficiency"
        id={`skill-proficiency-${skillId}`}
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select>
      <button
        className="skill-remove"
        onClick={() => onRemove(index)}
        title="Remove skill"
        id={`skill-remove-${skillId}`}
        type="button"
      >
        ✕
      </button>
    </div>
  );
};

export default SkillCard;
