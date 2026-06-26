import './Logo.css';

const Logo = ({ onClick, style, className = '', iconOnly = false, iconClassName = '' }) => {
  const SvgIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={iconClassName || "logo-icon"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Central pistil */}
      <circle cx="12" cy="12" r="2.5" />
      {/* Top Petal */}
      <path d="M12 9.5C12 7.5 13.5 6 15 6C16.5 6 17 7.5 15.5 9C14.5 10 13.5 11 12 12" />
      {/* Right Petal */}
      <path d="M14.5 12C16.5 12 18 13.5 18 15C18 16.5 16.5 17 15 15.5C14 14.5 13 13.5 12 12" />
      {/* Bottom Petal */}
      <path d="M12 14.5C12 16.5 10.5 18 9 18C7.5 18 7 16.5 8.5 15C9.5 14 10.5 13 12 12" />
      {/* Left Petal */}
      <path d="M9.5 12C7.5 12 6 10.5 6 9C6 7.5 7.5 7 9 8.5C10 9.5 11 10.5 12 12" />
      {/* Inner details for clover-like bloom */}
      <path d="M12 7v10M7 12h10" opacity="0.3" />
    </svg>
  );

  if (iconOnly) {
    return SvgIcon;
  }

  return (
    <div className={`logo-container ${className}`} onClick={onClick} style={style}>
      <div className="logo-icon-wrapper">
        {SvgIcon}
      </div>
      <span className="logo-text">BloomPortfolio</span>
    </div>
  );
};

export default Logo;
