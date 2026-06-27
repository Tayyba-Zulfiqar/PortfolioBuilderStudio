import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import WelcomeHeader from './WelcomeHeader';
import QuickTips from './QuickTips';
import Button from '../../common/Button';
import Logo from '../../common/Logo';
import './EmptyDashboard.css';

const EditIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.23 5.23l3.54 3.54m-2.04-5.04a2.5 2.5 0 1 1 3.54 3.54L6.5 21.04H3v-3.57L16.73 3.73z" />
    </svg>
);

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
                        You don't have a portfolio yet. Let's create something beautiful together.
                    </p>

                    <div className="btn-group">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/portfolio/new')}
                            icon={<EditIcon />}
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
