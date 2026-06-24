
import './FloatingShapes.css';

const FloatingShapes = () => {
  // Flower/clover shape path
  const FlowerPath = () => (
    <svg viewBox="0 0 24 24" className="shape-svg">
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5C12 7.5 13.5 6 15 6C16.5 6 17 7.5 15.5 9C14.5 10 13.5 11 12 12" />
      <path d="M14.5 12C16.5 12 18 13.5 18 15C18 16.5 16.5 17 15 15.5C14 14.5 13 13.5 12 12" />
      <path d="M12 14.5C12 16.5 10.5 18 9 18C7.5 18 7 16.5 8.5 15C9.5 14 10.5 13 12 12" />
      <path d="M9.5 12C7.5 12 6 10.5 6 9C6 7.5 7.5 7 9 8.5C10 9.5 11 10.5 12 12" />
    </svg>
  );

  // Sparkle / 4-pointed Star shape path
  const SparklePath = () => (
    <svg viewBox="0 0 24 24" className="shape-svg">
      <path d="M12 3c.13 3.6 2.4 5.87 6 6-.13 3.6-2.4 5.87-6 6-.13-3.6-2.4-5.87-6-6 .13-3.6 2.4-5.87 6-6z" />
      <path d="M5 5l1.5 1.5M19 5l-1.5 1.5M5 19l1.5-1.5M19 19l-1.5-1.5" opacity="0.4" />
    </svg>
  );

  // Heart shape path
  const HeartPath = () => (
    <svg viewBox="0 0 24 24" className="shape-svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  return (
    <div className="floating-shapes-container">
      {/* Middle Left: Flower Clover */}
      <div className="floating-shape shape-1">
        <FlowerPath />
      </div>

      {/* Middle Right: Sparkle */}
      <div className="floating-shape shape-2">
        <SparklePath />
      </div>

      {/* Bottom Left: Heart */}
      <div className="floating-shape shape-3">
        <HeartPath />
      </div>

      {/* Bottom Right: Flower Clover */}
      <div className="floating-shape shape-4">
        <FlowerPath />
      </div>

      {/* Top Right: Sparkle */}
      <div className="floating-shape shape-5">
        <SparklePath />
      </div>

      {/* Bottom Middle-Right: Flower Clover */}
      <div className="floating-shape shape-6">
        <FlowerPath />
      </div>

      {/* Bottom Middle-Left: Sparkle */}
      <div className="floating-shape shape-7">
        <SparklePath />
      </div>
    </div>
  );
};

export default FloatingShapes;
