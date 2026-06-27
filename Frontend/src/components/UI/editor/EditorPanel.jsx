import { useEffect } from 'react';
import AboutTab from './tabs/About/AboutTab';
import ProjectsTab from './tabs/Projects/ProjectsTab';
import SkillsTab from './tabs/Skills/SkillsTab';
import ExperienceTab from './tabs/Experience/ExperienceTab';
import EducationTab from './tabs/Education/EducationTab';
import SettingsTab from './tabs/Settings/SettingsTab';
import './EditorPanel.css';

/* Icons as inline SVG strings for tabs */
const TABS = [
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    )
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    id: 'education',
    label: 'Education',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 10-10-8L2 10v11a1 1 0 0 0 1 1h6v-5h6v5h6a1 1 0 0 0 1-1V10z" />
      </svg>
    )
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
];

const TAB_COMPONENTS = {
  about: AboutTab,
  projects: ProjectsTab,
  skills: SkillsTab,
  experience: ExperienceTab,
  education: EducationTab,
  settings: SettingsTab,
};

const EditorPanel = ({ activeTab, setActiveTab, portfolio, user, onShowFullPreview }) => {
  const ActiveTabComponent = TAB_COMPONENTS[activeTab];

  useEffect(() => {
    const timer = setTimeout(() => {
      const wrapper = document.querySelector('.editor-panel-wrapper');
      if (wrapper) {
        wrapper.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleNextTab = () => {
    const currentIndex = TABS.findIndex((t) => t.id === activeTab);
    if (currentIndex >= 0 && currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    }
  };

  return (
    <div className="editor-panel-wrapper">
      <div className="editor-panel">
        {/* Tab Navigation */}
        <nav className="editor-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`editor-tab ${activeTab === tab.id ? 'editor-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`editor-tab-${tab.id}`}
            >
              <span className="editor-tab__icon">{tab.icon}</span>
              <span className="editor-tab__label">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Active Tab Content */}
        <div className="editor-content" role="tabpanel" aria-labelledby={`editor-tab-${activeTab}`}>
          <ActiveTabComponent
            portfolio={portfolio}
            user={user}
            onNextTab={handleNextTab}
            onShowFullPreview={onShowFullPreview}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
