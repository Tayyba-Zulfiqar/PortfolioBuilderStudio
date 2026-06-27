import PortfolioCard from './PortfolioCard';
import EmptySection from './EmptySection';
import './LibrarySection.css';

const SECTION_META = {
  completed: {
    icon: '✅',
    title: 'Completed Portfolios',
    subtitle: 'All sections filled and settings saved — ready to share with the world.',
    accentClass: 'library-section--completed',
  },
  draft: {
    icon: '📝',
    title: 'Drafts',
    subtitle: 'Portfolios still in progress. Come back and finish them any time.',
    accentClass: 'library-section--draft',
  },
};

const LibrarySection = ({ type, portfolios }) => {
  const meta = SECTION_META[type];

  return (
    <section className={`library-section ${meta.accentClass}`}>
      {/* Section header */}
      <div className="library-section__header">
        <div className="library-section__heading-row">
          <span className="library-section__icon">{meta.icon}</span>
          <div>
            <h2 className="library-section__title">{meta.title}</h2>
            <p className="library-section__subtitle">{meta.subtitle}</p>
          </div>
        </div>
        <div className="library-section__count">
          {portfolios.length} {portfolios.length === 1 ? 'portfolio' : 'portfolios'}
        </div>
      </div>

      {/* Grid or empty state */}
      {portfolios.length === 0 ? (
        <EmptySection type={type} />
      ) : (
        <div className="library-section__grid">
          {portfolios.map((p, i) => (
            <PortfolioCard key={p._id || i} portfolio={p} type={type} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LibrarySection;
