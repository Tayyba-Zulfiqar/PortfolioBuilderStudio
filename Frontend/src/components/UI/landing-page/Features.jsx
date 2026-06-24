import featuresData from '../../../data/featuresData';
import FeatureCard from '../../common/FeatureCard';
import './Features.css';

const Features = () => {


  return (
    <section id="features" className="features-section">
      <div className="container">
        {/* Section Headers */}
        <div className="features-header">
          <h3 className="features-badge-script">everything you need</h3>
          <h2 className="features-section-title">A portfolio that blooms with you</h2>
        </div>

        {/* Features Card Grid */}
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgClass={feature.iconBgClass}
              iconColorClass={feature.iconColorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
