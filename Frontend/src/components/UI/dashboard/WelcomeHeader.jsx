import React from 'react';
import './WelcomeHeader.css';

const WelcomeHeader = ({ tag = "welcome, lovely", title, subtitle }) => {
    return (
        <div className="welcome-header">
            <div className="welcome-tag">{tag}</div>
            <h1 className="welcome-title">
                <svg viewBox="0 0 24 24" className="sparkle-left" fill="currentColor">
                    <path d="M12 3c.13 3.6 2.4 5.87 6 6-.13 3.6-2.4 5.87-6 6-.13-3.6-2.4-5.87-6-6 .13-3.6 2.4-5.87 6-6z" />
                    <path d="M21 12c-3.6-.13-5.87-2.4-6-6-.13 3.6-2.4 5.87-6 6 3.6.13 5.87 2.4 6 6 .13-3.6 2.4-5.87 6-6z" />
                </svg>
                {title}
                <svg viewBox="0 0 24 24" className="sparkle-right" fill="currentColor">
                    <path d="M12 3c.13 3.6 2.4 5.87 6 6-.13 3.6-2.4 5.87-6 6-.13-3.6-2.4-5.87-6-6 .13-3.6 2.4-5.87 6-6z" />
                    <path d="M21 12c-3.6-.13-5.87-2.4-6-6-.13 3.6-2.4 5.87-6 6 3.6.13 5.87 2.4 6 6 .13-3.6 2.4-5.87 6-6z" />
                </svg>
            </h1>
            {subtitle && <p className="welcome-subtitle">{subtitle}</p>}
        </div>
    );
};

export default WelcomeHeader;