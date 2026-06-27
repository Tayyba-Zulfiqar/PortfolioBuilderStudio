import { useEffect } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { getPortfolioCompleteness, hasPortfolioUserContent } from '../../utils/portfolioUtils';
import DashboardLayout from '../../components/UI/dashboard/DashboardLayout';
import WelcomeHeader from '../../components/UI/dashboard/WelcomeHeader';
import LibrarySection from '../../components/UI/library/LibrarySection';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LibraryPage = () => {
  const {
    portfolios,
    savedPortfolios,
    fetchAllPortfolios,
    fetchSavedPortfolios,
    deleteUserPortfolio,
    unsaveCommunityPortfolio,
    isLoading,
  } = usePortfolioStore();

  useEffect(() => {
    fetchAllPortfolios();
    fetchSavedPortfolios();
  }, [fetchAllPortfolios, fetchSavedPortfolios]);

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
  const visiblePortfolios = (portfolios || []).filter(hasPortfolioUserContent);
  const completedPortfolios = visiblePortfolios.filter((p) => getPortfolioCompleteness(p).isComplete);
  const draftPortfolios = visiblePortfolios.filter((p) => !getPortfolioCompleteness(p).isComplete);

  const handleDeleteOwned = async (portfolio) => {
    const name = portfolio?.about?.fullName || portfolio?.name || 'this portfolio';
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    await deleteUserPortfolio(portfolio._id);
  };

  const handleRemoveSaved = async (item) => {
    await unsaveCommunityPortfolio(item._id);
  };

  return (
    <DashboardLayout>
      <div className="library-page">
        <WelcomeHeader
          tag="your portfolio collections"
          title="Library Studio 🌸"
          subtitle="View, edit, and export your completed portfolios or drafts from one single place."
        />

        {/* Completed Portfolios Section */}
        <LibrarySection type="completed" portfolios={completedPortfolios} onDelete={handleDeleteOwned} />

        {/* Draft Portfolios Section */}
        <LibrarySection type="draft" portfolios={draftPortfolios} onDelete={handleDeleteOwned} />

        {/* Saved Portfolios Section */}
        <LibrarySection type="saved" portfolios={savedPortfolios || []} onDelete={handleRemoveSaved} />
      </div>
    </DashboardLayout>
  );
};

export default LibraryPage;
