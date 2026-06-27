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
  const [showFullPreview, setShowFullPreview] = useState(false);
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

  if (showFullPreview) {
    return (
      <FullPreview
        portfolio={portfolio}
        user={user}
        onClose={() => setShowFullPreview(false)}
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
        onShowFullPreview={() => setShowFullPreview(true)}
      />
    </div>
  );
};

export default EditorLayout;
