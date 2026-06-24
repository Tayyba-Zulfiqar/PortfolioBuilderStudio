import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ icon, title, description, iconBgClass = '', iconColorClass = '' }) => {
  return (
    <div className="feature-card">
      {/* Icon Wrapper with Custom Background and Color class */}
      <div className={`feature-card-icon-wrapper ${iconBgClass}`}>
        <span className={`feature-card-icon ${iconColorClass}`}>
          {icon}
        </span>
      </div>
      
      {/* Title */}
      <h3 className="feature-card-title">{title}</h3>
      
      {/* Description */}
      <p className="feature-card-description">{description}</p>
    </div>
  );
};

export default FeatureCard;
