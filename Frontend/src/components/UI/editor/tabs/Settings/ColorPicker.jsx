import React from 'react';

const ColorPicker = ({ primaryColor, secondaryColor, onPrimaryChange, onSecondaryChange }) => {
  return (
    <div className="settings-section">
      <div className="color-pickers-row">
        <div className="color-picker-group">
          <label className="settings-label" htmlFor="primary-color-input">Primary Color</label>
          <div className="color-picker-wrap">
            <input
              type="color"
              id="primary-color-input"
              className="color-swatch-input"
              value={primaryColor}
              onChange={(e) => onPrimaryChange(e.target.value)}
            />
            <span className="color-hex">{primaryColor?.toUpperCase()}</span>
          </div>
        </div>

        <div className="color-picker-group">
          <label className="settings-label" htmlFor="secondary-color-input">Secondary Color</label>
          <div className="color-picker-wrap">
            <input
              type="color"
              id="secondary-color-input"
              className="color-swatch-input"
              value={secondaryColor}
              onChange={(e) => onSecondaryChange(e.target.value)}
            />
            <span className="color-hex">{secondaryColor?.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
