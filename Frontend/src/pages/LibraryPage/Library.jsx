import { useEffect } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { getPortfolioCompleteness } from '../../utils/portfolioUtils';
import DashboardLayout from '../../components/UI/dashboard/DashboardLayout';
import WelcomeHeader from '../../components/UI/dashboard/WelcomeHeader';
import LibrarySection from '../../components/UI/library/LibrarySection';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LibraryPage = () => {
  const { portfolios, fetchAllPortfolios, isLoading } = usePortfolioStore();

  useEffect(() => {
    fetchAllPortfolios();
  }, [fetchAllPortfolios]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  // Distribute all portfolios into Completed and Draft lists
  const completedPortfolios = (portfolios || []).filter((p) => getPortfolioCompleteness(p).isComplete);
  const draftPortfolios = (portfolios || []).filter((p) => !getPortfolioCompleteness(p).isComplete);

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