import { useNavigate } from 'react-router-dom';
import { getTemplateLabel, getPortfolioCompleteness } from '../../../utils/portfolioUtils';
import './PortfolioCard.css';

/* Mini template thumbnail - SVG illustration per template */
const TemplateThumbnail = ({ template, primaryColor, secondaryColor }) => {
  const pc = primaryColor || '#F4A6B5';
  const sc = secondaryColor || '#E8B4B8';

  if (template === 'creative') {
    return (
      <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" className="portfolio-card__thumb-svg">
        <rect width="200" height="130" fill="#fff" />
        <rect width="200" height="42" fill={`url(#cg-${template})`} />
        <defs>
          <linearGradient id={`cg-${template}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={pc} />
            <stop offset="100%" stopColor={sc} />
          </linearGradient>
        </defs>
        <rect x="10" y="12" width="80" height="8" rx="4" fill="rgba(255,255,255,0.8)" />
        <rect x="10" y="24" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.55)" />
        <rect x="10" y="52" width="52" height="4" rx="2" fill={pc} opacity="0.7" />
        <rect x="10" y="60" width="80" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="10" y="67" width="65" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="10" y="80" width="52" height="4" rx="2" fill={pc} opacity="0.7" />
        <rect x="10" y="89" width="75" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="105" y="52" width="52" height="4" rx="2" fill={pc} opacity="0.7" />
        <rect x="105" y="60" width="80" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="105" y="67" width="65" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="105" y="80" width="40" height="14" rx="7" fill={pc} opacity="0.25" />
        <rect x="150" y="80" width="38" height="14" rx="7" fill={sc} opacity="0.25" />
      </svg>
    );
  }

  if (template === 'minimal') {
    return (
      <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" className="portfolio-card__thumb-svg">
        <rect width="200" height="130" fill="#fff" />
        <rect x="60" y="14" width="80" height="8" rx="4" fill="#382A2A" opacity="0.8" />
        <rect x="75" y="26" width="50" height="5" rx="2.5" fill="#685B5B" opacity="0.5" />
        <rect x="80" y="36" width="40" height="3" rx="1.5" fill={pc} />
        <rect x="10" y="50" width="170" height="1" fill="#E8D7D6" />
        <rect x="10" y="60" width="52" height="4" rx="2" fill="#382A2A" opacity="0.6" />
        <rect x="10" y="68" width="80" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="10" y="75" width="65" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="105" y="60" width="52" height="4" rx="2" fill="#382A2A" opacity="0.6" />
        <rect x="105" y="68" width="75" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="105" y="75" width="60" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="10" y="90" width="52" height="4" rx="2" fill="#382A2A" opacity="0.6" />
        <rect x="10" y="98" width="80" height="3" rx="1.5" fill="#E8D7D6" />
        <rect x="10" y="105" width="55" height="3" rx="1.5" fill="#E8D7D6" />
      </svg>
    );
  }

  // Professional / modern (default)
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" className="portfolio-card__thumb-svg">
      <rect width="200" height="130" fill="#fff" />
      <rect width="200" height="42" fill={`url(#pg-${template || 'modern'})`} />
      <defs>
        <linearGradient id={`pg-${template || 'modern'}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={pc} />
          <stop offset="100%" stopColor={sc} />
        </linearGradient>
      </defs>
      <rect x="50" y="12" width="100" height="8" rx="4" fill="rgba(255,255,255,0.85)" />
      <rect x="65" y="24" width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.55)" />
      <rect x="10" y="52" width="1" height="70" fill="#F0E3E2" />
      <rect x="15" y="58" width="52" height="4" rx="2" fill={pc} opacity="0.6" />
      <rect x="15" y="66" width="60" height="3" rx="1.5" fill="#E8D7D6" />
      <rect x="15" y="73" width="50" height="3" rx="1.5" fill="#E8D7D6" />
      <rect x="15" y="86" width="52" height="4" rx="2" fill={pc} opacity="0.6" />
      <rect x="15" y="94" width="60" height="3" rx="1.5" fill="#E8D7D6" />
      <rect x="75" y="52" width="1" height="70" fill="#F0E3E2" />
      <rect x="82" y="58" width="52" height="4" rx="2" fill={pc} opacity="0.6" />
      <rect x="82" y="66" width="100" height="3" rx="1.5" fill="#E8D7D6" />
      <rect x="82" y="73" width="80" height="3" rx="1.5" fill="#E8D7D6" />
      <rect x="82" y="86" width="52" height="4" rx="2" fill={pc} opacity="0.6" />
      <rect x="82" y="94" width="95" height="3" rx="1.5" fill="#E8D7D6" />
      <rect x="82" y="101" width="70" height="3" rx="1.5" fill="#E8D7D6" />
    </svg>
  );
};

const PortfolioCard = ({ portfolio, type, onDelete }) => {
  const navigate = useNavigate();
  const isSaved = type === 'saved';
  const cardPortfolio = isSaved ? portfolio?.portfolio : portfolio;
  const { completedSections, missingSections, progress } = getPortfolioCompleteness(cardPortfolio);
  const name = cardPortfolio?.about?.fullName || cardPortfolio?.name || 'Untitled Portfolio';
  const template = cardPortfolio?.template || 'modern';
  const primaryColor = cardPortfolio?.theme?.primaryColor || '#F4A6B5';
  const secondaryColor = cardPortfolio?.theme?.secondaryColor || '#E8B4B8';
  const portfolioId = cardPortfolio?._id || portfolio?._id;
  const badgeText = type === 'completed' ? 'Complete' : isSaved ? 'Saved' : 'Draft';

  return (
    <article className={`portfolio-card portfolio-card--${type}`}>
      {/* Template thumbnail */}
      <div className="portfolio-card__thumb">
        <TemplateThumbnail template={template} primaryColor={primaryColor} secondaryColor={secondaryColor} />
        <div className={`portfolio-card__badge portfolio-card__badge--${type}`}>
          {badgeText}
        </div>
      </div>

      {/* Card body */}
      <div className="portfolio-card__body">
        <h3 className="portfolio-card__name">{name}</h3>
        <p className="portfolio-card__template">
          <span className="portfolio-card__template-dot" style={{ background: primaryColor }} />
          {getTemplateLabel(template)} Template{isSaved && portfolio?.username ? ` by ${portfolio.username}` : ''}
        </p>

        {/* Progress bar — always shown; full green for completed */}
        <div className="portfolio-card__progress-wrap">
          <div className="portfolio-card__progress-bar">
            <div
              className="portfolio-card__progress-fill"
              style={{ width: `${progress}%`, background: type === 'completed' ? '#82c9a5' : primaryColor }}
            />
          </div>
          <span className="portfolio-card__progress-label">{progress}% complete</span>
        </div>

        {/* Completed sections chips */}
        <div className="portfolio-card__sections">
          {completedSections.map((s) => (
            <span key={s.key} className="portfolio-card__chip portfolio-card__chip--done">
              {s.icon} {s.label}
            </span>
          ))}
          {missingSections.map((s) => (
            <span key={s.key} className="portfolio-card__chip portfolio-card__chip--missing">
              {s.icon} {s.label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="portfolio-card__actions">
          <button
            type="button"
            className="portfolio-card__btn portfolio-card__btn--primary"
            onClick={() => navigate(isSaved ? `/preview/${portfolioId}` : `/settings/${portfolioId}`)}
          >
            {type === 'completed' ? 'Edit Portfolio' : isSaved ? 'Preview Portfolio' : 'Continue Editing'}
          </button>
          {type === 'completed' && (
            <button
              type="button"
              className="portfolio-card__btn portfolio-card__btn--secondary"
              onClick={() => navigate(`/preview/${portfolioId}`)}
              title="Open full preview"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="portfolio-card__btn portfolio-card__btn--danger"
              onClick={() => onDelete(portfolio)}
            >
              {isSaved ? 'Remove' : 'Delete'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default PortfolioCard;

