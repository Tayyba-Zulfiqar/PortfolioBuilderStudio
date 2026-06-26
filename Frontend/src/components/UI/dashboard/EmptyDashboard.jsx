
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import WelcomeHeader from './WelcomeHeader';
import QuickTips from './QuickTips';
import Button from '../../common/Button';
import Logo from '../../common/Logo';
import './EmptyDashboard.css';

const EmptyDashboard = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="empty-dashboard">
                <WelcomeHeader
                    tag="welcome, lovely"
                    title="Welcome to Bloom Portfolio Studio"
                    subtitle="Your dreamy little corner of the internet starts here."
                />

                <div className="empty-card">
                    <div className="badge">
                        <Logo iconOnly={true} iconClassName="badge-icon" />
                    </div>

                    <h2 className="card-title">Build Your First Portfolio</h2>
                    <p className="card-subtitle">
                        You don't have a portfolio yet. Let's create something beautiful together! 🌷
                    </p>

                    <div className="btn-group">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/settings')}
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            }
                        >
                            Start Building
                        </Button>

                    </div>

                    <QuickTips />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EmptyDashboard;