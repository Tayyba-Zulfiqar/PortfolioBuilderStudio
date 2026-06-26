
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import DashboardLayout from './DashboardLayout';
import WelcomeHeader from './WelcomeHeader';
import Button from '../../common/Button';
import './ActiveDashboard.css';

const ActiveDashboard = ({ portfolio }) => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    return (
        <DashboardLayout>
            <div className="active-dashboard">
                <WelcomeHeader
                    tag={`welcome back, ${user?.username || 'lovely'}`}
                    title="Your Portfolio is Active! 🌸"
                    subtitle="Here's a quick glance at your beautiful portfolio."
                />

                <div className="active-card">
                    <div className="active-stats">
                        <div className="stat-item">
                            <span className="stat-label">Template</span>
                            <span className="stat-value">{portfolio?.template || 'Modern'}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-label">Status</span>
                            <span className={`stat-value ${portfolio?.isPublished ? 'published' : 'draft'}`}>
                                {portfolio?.isPublished ? '🚀 Published' : '📝 Draft'}
                            </span>
                        </div>
                    </div>

                    <div className="active-actions">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/settings')}
                        >
                            Edit Portfolio
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate(`/${user?.username}`)}
                        >
                            View Live Site 🌐
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ActiveDashboard;