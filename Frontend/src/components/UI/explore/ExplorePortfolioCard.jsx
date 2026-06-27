import Logo from '../../common/Logo';

const templateLabels = {
  modern: 'Creative',
  professional: 'Creative',
  minimal: 'Minimal',
  creative: 'Elegant',
};

const formatViews = (views = 0) => {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(views >= 10000 ? 0 : 1)}K`;
  }

  return views.toString();
};

const getDisplayImage = (portfolio) => {
  return portfolio?.about?.profilePicture || portfolio?.projects?.find((project) => project.images?.[0])?.images?.[0] || '';
};

const getInitials = (name) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return initials || 'BP';
};

const SparkleSmall = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 1.5l1.8 5.1L16 8.4l-5.2 1.8L9 15.5l-1.8-5.3L2 8.4l5.2-1.8L9 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M3.8 1.8l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5v16l-6-3.5-6 3.5v-16z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExplorePortfolioCard = ({ item, onView }) => {
  const portfolio = item.portfolio;
  const name = portfolio?.about?.fullName || portfolio?.name || item.username || 'Bloom Creator';
  const headline = portfolio?.about?.headline || 'Portfolio Creator';
  const bio = portfolio?.about?.bio || 'Creating thoughtful work and sharing it with the Bloom community.';
  const image = getDisplayImage(portfolio);
  const skills = portfolio?.skills?.slice(0, 3).map((skill) => skill.name).filter(Boolean) || [];
  const label = templateLabels[portfolio?.template] || 'Creative';

  return (
    <article className="explore-card">
      <div className="explore-card__profile">
        <div className="explore-card__avatar" aria-hidden="true">
          {image ? (
            <img src={image} alt="" />
          ) : (
            <span>{getInitials(name)}</span>
          )}
        </div>

        <div className="explore-card__intro">
          <div className="explore-card__title-row">
            <h2>{name}</h2>
            <span className={`explore-card__badge explore-card__badge--${portfolio?.template || 'modern'}`}>
              {label}
            </span>
          </div>
          <p className="explore-card__headline">{headline}</p>
          <p className="explore-card__bio">{bio}</p>
        </div>
      </div>

      <div className="explore-card__meta">
        <SparkleSmall />
        <span>{formatViews(item.views)} views</span>
      </div>

      <div className="explore-card__skills" aria-label={`${name} skills`}>
        {skills.length > 0 ? (
          skills.map((skill) => <span key={skill}>{skill}</span>)
        ) : (
          <span>{portfolio?.template || 'Portfolio'}</span>
        )}
      </div>

      <div className="explore-card__actions">
        <button type="button" className="explore-card__view-btn" onClick={() => onView(portfolio)}>
          View
          <Logo iconOnly iconClassName="explore-card__view-icon" />
        </button>
        <button type="button" className="explore-card__save-btn" aria-label={`Save ${name}`}>
          <BookmarkIcon />
        </button>
      </div>
    </article>
  );
};

export default ExplorePortfolioCard;
