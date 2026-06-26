import React from 'react';
import FloatingShapes from '../UI/landing-page/FloatingShapes';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-container">
            <FloatingShapes />
            <div className="dashboard-content container">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;