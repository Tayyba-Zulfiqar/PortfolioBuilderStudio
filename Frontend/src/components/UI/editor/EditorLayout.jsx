import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { useAuthStore } from '../../../store/authStore';
import EditorPanel from './EditorPanel';
import FullPreview from './FullPreview';
import LoadingSpinner from '../../common/LoadingSpinner';
import FloatingShapes from '../landing-page/FloatingShapes';
import './EditorLayout.css';

const EditorLayout = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [fullPreviewConfig, setFullPreviewConfig] = useState(null);
  const { portfolio, fetchPortfolio, isLoading } = usePortfolioStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  if (isLoading) {
    return (
      <div className="editor-loading">
        <LoadingSpinner />
        <p>Loading your portfolio... 🌸</p>
      </div>
    );
  }

  if (fullPreviewConfig) {
    const mergedPortfolio = {
      ...portfolio,
      template: fullPreviewConfig.template || portfolio?.template,
      theme: {
        ...portfolio?.theme,
        primaryColor: fullPreviewConfig.primaryColor || portfolio?.theme?.primaryColor,
        secondaryColor: fullPreviewConfig.secondaryColor || portfolio?.theme?.secondaryColor,
      }
    };

    return (
      <FullPreview
        portfolio={mergedPortfolio}
        user={user}
        onClose={() => setFullPreviewConfig(null)}
      />
    );
  }

  return (
    <div className="editor-layout" style={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />
      <EditorPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        portfolio={portfolio}
        user={user}
        onShowFullPreview={(overrides) => setFullPreviewConfig(overrides || {})}
      />
    </div>
  );
};

export default EditorLayout;
