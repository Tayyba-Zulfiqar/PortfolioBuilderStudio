import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h1>🌸 Bloom Portfolio Studio</h1>
            <p>Build your story, beautifully.</p>
            <Link to="/signup">Get Started</Link>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default LandingPage;