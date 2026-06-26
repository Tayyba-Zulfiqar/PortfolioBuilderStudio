import React from 'react';
import './QuickTips.css';

const QuickTips = ({ tips }) => {
    const defaultTips = [
        { emoji: '🌷', text: 'Add your About section first' },
        { emoji: '✨', text: 'Showcase your best projects' },
        { emoji: '🎀', text: 'Pick a template that matches your style' },
        { emoji: '💖', text: 'Share your link to start collecting love' },
    ];

    const items = tips || defaultTips;

    return (
        <div className="quick-tips">
            <h3 className="tips-title">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: 'var(--brand-pink)' }}>
                    <path d="M12 3c.13 3.6 2.4 5.87 6 6-.13 3.6-2.4 5.87-6 6-.13-3.6-2.4-5.87-6-6 .13-3.6 2.4-5.87 6-6z" />
                    <path d="M21 12c-3.6-.13-5.87-2.4-6-6-.13 3.6-2.4 5.87-6 6 3.6.13 5.87 2.4 6 6 .13-3.6 2.4-5.87 6-6z" />
                </svg>
                Quick Tips
            </h3>
            <ul className="tips-list">
                {items.map((tip, index) => (
                    <li key={index} className="tips-item">
                        <span className="tip-emoji">{tip.emoji}</span>
                        <span>{tip.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickTips;