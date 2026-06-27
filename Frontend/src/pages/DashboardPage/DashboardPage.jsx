import { useEffect } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import EmptyDashboard from '../../components/UI/dashboard/EmptyDashboard';
import ActiveDashboard from '../../components/UI/dashboard/ActiveDashboard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DashboardPage = () => {
  const { portfolios, fetchAllPortfolios, isLoading } = usePortfolioStore();

  useEffect(() => {
    fetchAllPortfolios();
  }, [fetchAllPortfolios]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <LoadingSpinner />
      </div>
    );
  }

  const hasPortfolios = portfolios && portfolios.length > 0;

  return hasPortfolios ? <ActiveDashboard portfolios={portfolios} /> : <EmptyDashboard />;
};

export default DashboardPage;