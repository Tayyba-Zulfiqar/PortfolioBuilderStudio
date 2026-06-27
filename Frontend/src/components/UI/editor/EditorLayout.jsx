import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { useAuthStore } from '../../../store/authStore';
import EditorPanel from './EditorPanel';
import PreviewPanel from './PreviewPanel';
import LoadingSpinner from '../../common/LoadingSpinner';
import FloatingShapes from '../landing-page/FloatingShapes';
import './EditorLayout.css';

const EditorLayout = () => {
  const [activeTab, setActiveTab] = useState('about');
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

  return (
    <div className={`editor-layout ${activeTab === 'settings' ? 'editor-layout--split' : ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />
      <EditorPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        portfolio={portfolio}
        user={user}
      />
      {activeTab === 'settings' && (
        <PreviewPanel portfolio={portfolio} user={user} />
      )}
    </div>
  );
};

export default EditorLayout;
