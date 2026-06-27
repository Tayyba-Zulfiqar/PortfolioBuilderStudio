import { useNavigate } from 'react-router-dom';
import './EmptySection.css';

const EmptySection = ({ type }) => {
  const navigate = useNavigate();

  const content =
    type === 'completed'
      ? {
          emoji: '🌸',
          title: 'No Completed Portfolios Yet',
          subtitle:
            'Fill in all sections — About, Projects, Skills, Experience, Education — and save your Settings to see your portfolio here.',
          btnLabel: 'Finish My Portfolio',
          btnSecondary: null,
          redirectTo: '/settings',
        }
      : type === 'saved'
      ? {
          emoji: '⭐',
          title: 'No saved',
          subtitle: 'Explore community portfolios and save them here for design inspiration.',
          btnLabel: 'Start Exploring',
          btnSecondary: null,
          redirectTo: '/explore',
        }
      : {
          emoji: '✏️',
          title: 'No Drafts in Progress',
          subtitle: 'Start building your portfolio! Any sections you save will appear here as a draft until everything is complete.',
          btnLabel: 'Start Building',
          btnSecondary: null,
          redirectTo: '/settings',
        };

  return (
    <div className="empty-section">
      <div className="empty-section__icon">{content.emoji}</div>
      <h3 className="empty-section__title">{content.title}</h3>
      <p className="empty-section__subtitle">{content.subtitle}</p>
      <button
        type="button"
        className="empty-section__btn"
        onClick={() => navigate(content.redirectTo)}
      >
        {content.btnLabel}
      </button>
    </div>
  );
};

export default EmptySection;
