import LoadingSpinner from '../../common/LoadingSpinner';
import ExplorePortfolioCard from './ExplorePortfolioCard';

const SectionSparkle = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M16 3l2.8 8.2L27 14l-8.2 2.8L16 25l-2.8-8.2L5 14l8.2-2.8L16 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M7 2.5l1.2 3.3L11.5 7 8.2 8.2 7 11.5 5.8 8.2 2.5 7l3.3-1.2L7 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const FeaturedPortfolios = ({ portfolios, isLoading, error, onRetry, onView }) => {
  const hasPortfolios = portfolios.length > 0;

  return (
    <section className="explore-featured" aria-labelledby="featured-title">
      <div className="explore-featured__heading">
        <div className="explore-featured__title">
          <SectionSparkle />
          <h2 id="featured-title">Featured Portfolios</h2>
        </div>
        <div className="explore-featured__line" />
      </div>

      {isLoading && (
        <div className="explore-state">
          <LoadingSpinner />
          <p>Loading community portfolios...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="explore-state">
          <h3>Could not load portfolios</h3>
          <p>{error}</p>
          <button type="button" onClick={onRetry}>Try again</button>
        </div>
      )}

      {!isLoading && !error && !hasPortfolios && (
        <div className="explore-state">
          <h3>No published portfolios yet</h3>
          <p>Published community portfolios will appear here as creators share their work.</p>
        </div>
      )}

      {!isLoading && !error && hasPortfolios && (
        <div className="explore-grid">
          {portfolios.map((item) => (
            <ExplorePortfolioCard
              key={`${item.username}-${item._id}`}
              item={item}
              onView={onView}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedPortfolios;
