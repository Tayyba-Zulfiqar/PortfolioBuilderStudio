
import Header from '../components/UI/landing-page/Header';
import Hero from '../components/UI/landing-page/Hero';
import Features from '../components/UI/landing-page/Features';
import FloatingShapes from '../components/UI/landing-page/FloatingShapes';

const LandingPage = () => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <Header />

      {/* Floating Background Shapes */}
      <FloatingShapes />

      {/* Main Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />
    </div>
  );
};

export default LandingPage;