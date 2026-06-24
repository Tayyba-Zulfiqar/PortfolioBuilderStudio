import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  onClick,
  icon,
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  );
};

export default Button;
