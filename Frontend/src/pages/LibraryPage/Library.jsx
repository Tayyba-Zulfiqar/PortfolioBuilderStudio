import { useEffect } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { getPortfolioCompleteness } from '../../utils/portfolioUtils';
import DashboardLayout from '../../components/UI/dashboard/DashboardLayout';
import WelcomeHeader from '../../components/UI/dashboard/WelcomeHeader';
import LibrarySection from '../../components/UI/library/LibrarySection';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LibraryPage = () => {
  const { portfolio, fetchPortfolio, isLoading } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  // Determine completeness
  const completeness = getPortfolioCompleteness(portfolio);
  const isComplete = completeness.isComplete;

  // Distribute portfolios into Completed and Draft lists
  // Since the user currently has one active portfolio, we place it in the correct section
  // and keep the other section empty to trigger its EmptyState.
  const completedPortfolios = portfolio && isComplete ? [portfolio] : [];
  const draftPortfolios = portfolio && !isComplete ? [portfolio] : [];

  return (
    <DashboardLayout>
      <div className="library-page">
        <WelcomeHeader
          tag="your portfolio collections"
          title="Library Studio 🌸"
          subtitle="View, edit, and export your completed portfolios or drafts from one single place."
        />

        {/* Completed Portfolios Section */}
        <LibrarySection type="completed" portfolios={completedPortfolios} />

        {/* Draft Portfolios Section */}
        <LibrarySection type="draft" portfolios={draftPortfolios} />
      </div>
    </DashboardLayout>
  );
};

export default LibraryPage;