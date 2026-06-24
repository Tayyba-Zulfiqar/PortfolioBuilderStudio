import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            <h1>🌸 404 - Page Not Found</h1>
            <p>Oops! This page doesn't exist.</p>
            <Link to="/">Go Home</Link>
        </div>
    );
};

export default NotFoundPage;