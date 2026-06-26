
import Header from '../landing-page/Header';
import FloatingShapes from '../landing-page/FloatingShapes';
import Logo from '../../common/Logo';
import './AuthCard.css';


const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="auth-page-container">

      <Header />

      <FloatingShapes />

      {/* Form Content Wrapper */}
      <div className="auth-content-wrapper">
        <div className="auth-card">
          {/* Centered Brand Title */}
          <div className="auth-card-logo-container">
            <Logo style={{ flexDirection: 'column', gap: '8px', cursor: 'default' }} />
          </div>

          {/* Form Header */}
          <h2 className="auth-card-title">{title}</h2>
          <p className="auth-card-subtitle">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
