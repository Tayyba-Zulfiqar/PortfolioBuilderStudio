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
