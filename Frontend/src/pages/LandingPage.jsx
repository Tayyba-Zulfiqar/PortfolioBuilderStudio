
import Header from '../components/Header';
import Hero from '../components/Hero';
import FloatingShapes from '../components/FloatingShapes';

const LandingPage = () => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <Header />

      {/* Floating Background Shapes */}
      <FloatingShapes />

      {/* Main Hero Section */}
      <Hero />
    </div>
  );
};

export default LandingPage;