import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = () => {


  return (
    <section className="container hero-container">
      {/* Script top logo header text */}
      <h2 className="hero-badge-top">BloomPortfolio</h2>

      {/* Main Title: Build Your Dream Portfolio */}
      <h1 className="hero-title">
        Build Your <em>Dream</em> Portfolio
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle">
        Create a beautiful portfolio that tells your story — soft, dreamy, and unmistakably you.
      </p>

      {/* Hero CTA Buttons */}
      <div className="hero-actions">
        <Link to="/signup">
          <Button variant="primary">
            Start Your Journey
          </Button>
        </Link>
        <Link to="/explore">
          <Button variant="secondary" >
            See Examples
          </Button>
        </Link>
      </div>


    </section>
  );
};

export default Hero;
