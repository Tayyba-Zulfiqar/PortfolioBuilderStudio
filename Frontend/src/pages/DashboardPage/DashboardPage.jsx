import { useEffect } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import EmptyDashboard from '../../components/UI/dashboard/EmptyDashboard';
import ActiveDashboard from '../../components/UI/dashboard/ActiveDashboard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DashboardPage = () => {
  const { portfolio, fetchPortfolio, isLoading } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Determine if user has content in their portfolio
  const isFirstTime =
    !portfolio ||
    (!portfolio.about?.headline &&
      (!portfolio.projects || portfolio.projects.length === 0) &&
      (!portfolio.skills || portfolio.skills.length === 0));

  return isFirstTime ? <EmptyDashboard /> : <ActiveDashboard portfolio={portfolio} />;
};

export default DashboardPage;