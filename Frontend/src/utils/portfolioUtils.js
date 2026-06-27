// Utility: determines portfolio section completeness and overall status
export const PORTFOLIO_SECTIONS = [
  {
    key: 'about',
    label: 'About',
    icon: '👤',
    route: '/settings',
    check: (p) =>
      !!(p?.about?.fullName && p?.about?.headline && p?.about?.bio && p?.about?.location),
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: '🚀',
    route: '/settings',
    check: (p) => (p?.projects?.length || 0) > 0,
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: '⚡',
    route: '/settings',
    check: (p) => (p?.skills?.length || 0) > 0,
  },
  {
    key: 'experience',
    label: 'Experience',
    icon: '💼',
    route: '/settings',
    check: (p) => (p?.experience?.length || 0) > 0,
  },
  {
    key: 'education',
    label: 'Education',
    icon: '🎓',
    route: '/settings',
    check: (p) => (p?.education?.length || 0) > 0,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: '🎨',
    route: '/settings',
    check: (p) => !!(p?.template),
  },
];

/**
 * Returns completeness metadata for a portfolio object.
 * @param {object} portfolio
 * @returns {{ isComplete: boolean, completedSections: string[], missingSections: string[], progress: number }}
 */
export const getPortfolioCompleteness = (portfolio) => {
  if (!portfolio) {
    return { isComplete: false, completedSections: [], missingSections: PORTFOLIO_SECTIONS, progress: 0 };
  }

  const completed = PORTFOLIO_SECTIONS.filter((s) => s.check(portfolio));
  const missing = PORTFOLIO_SECTIONS.filter((s) => !s.check(portfolio));
  const progress = Math.round((completed.length / PORTFOLIO_SECTIONS.length) * 100);

  return {
    isComplete: missing.length === 0,
    completedSections: completed,
    missingSections: missing,
    progress,
  };
};

const DEFAULT_THEME = { primaryColor: '#F4A6B5', secondaryColor: '#E8B4B8' };

const hasText = (value) => typeof value === 'string' && value.trim().length > 0;

const hasUsefulObjectValue = (item, ignoredKeys = []) => {
  if (!item || typeof item !== 'object') return false;

  return Object.entries(item).some(([key, value]) => {
    if (key === '_id' || key === 'id' || ignoredKeys.includes(key)) return false;
    if (Array.isArray(value)) return value.some((entry) => hasText(entry) || hasUsefulObjectValue(entry));
    if (typeof value === 'string') return hasText(value);
    if (typeof value === 'number' || typeof value === 'boolean') return value !== null;
    if (value && typeof value === 'object') return hasUsefulObjectValue(value);
    return false;
  });
};

export const isDefaultPortfolioName = (name = '') =>
  !hasText(name) || name === 'My Portfolio' || name === 'My First Portfolio' || /^Portfolio #\d+$/.test(name);

export const hasPortfolioUserContent = (portfolio) => {
  if (!portfolio) return false;

  const hasAbout = ['fullName', 'headline', 'bio', 'location', 'profilePicture'].some((key) =>
    hasText(portfolio.about?.[key])
  );
  const hasSocial = ['github', 'linkedin'].some((key) => hasText(portfolio.socialLinks?.[key]));
  const hasCollections = ['projects', 'skills', 'experience', 'education'].some((key) =>
    Array.isArray(portfolio[key]) && portfolio[key].some((item) => hasUsefulObjectValue(item, ['proficiency']))
  );
  const hasCustomSettings =
    (hasText(portfolio.name) && !isDefaultPortfolioName(portfolio.name)) ||
    (portfolio.template && portfolio.template !== 'modern') ||
    (portfolio.theme?.primaryColor && portfolio.theme.primaryColor !== DEFAULT_THEME.primaryColor) ||
    (portfolio.theme?.secondaryColor && portfolio.theme.secondaryColor !== DEFAULT_THEME.secondaryColor) ||
    portfolio.isPublished === true;

  return hasAbout || hasSocial || hasCollections || hasCustomSettings;
};

/**
 * Returns a display label for the template key.
 */
export const getTemplateLabel = (template) => {
  const labels = {
    modern: 'Professional',
    professional: 'Professional',
    creative: 'Creative',
    minimal: 'Minimal',
  };
  return labels[template] || 'Professional';
};
