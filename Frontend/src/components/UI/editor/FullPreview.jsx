import { useRef, useState } from 'react';
import './FullPreview.css';
import { ProfessionalTemplate, CreativeTemplate, MinimalTemplate } from '../../../templates/index';

const FullPreview = ({
  portfolio,
  onClose,
  backLabel = 'Back to Settings',
  title = 'Portfolio Full Preview Mode 🌸',
  showDownload = true,
}) => {
  const template = portfolio?.template || 'modern';
  const printAreaRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    const element = printAreaRef.current;
    if (!element) return;

    setIsGenerating(true);

    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;

      const name = portfolio?.about?.fullName || 'portfolio';
      const filename = `${name.replace(/\s+/g, '_')}_portfolio.pdf`;

      const options = {
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,            // 2× resolution for crisp text
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: element.scrollWidth,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: ['css', 'legacy'] },
      };

      await html2pdf().set(options).from(element).save();
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderTemplate = () => {
    switch (template) {
      case 'professional':
      case 'modern':
        return <ProfessionalTemplate data={portfolio} />;
      case 'creative':
        return <CreativeTemplate data={portfolio} />;
      case 'minimal':
        return <MinimalTemplate data={portfolio} />;
      default:
        return <ProfessionalTemplate data={portfolio} />;
    }
  };

  return (
    <div className="full-preview-mode">
      {/* Top Preview Controls */}
      <div className="full-preview-controls">
        <button type="button" className="full-preview-back-btn" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {backLabel}
        </button>
        <div className="full-preview-title-bar">
          {title}
        </div>
        {showDownload ? (
        <button
          type="button"
          className="full-preview-pdf-btn"
          onClick={handleDownloadPDF}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </>
          )}
        </button>
        ) : (
          <div className="full-preview-control-spacer" />
        )}
      </div>

      {/* Main Preview Area */}
      <div className="full-preview-content-wrapper">
        {/* This ref is captured by html2pdf — only the portfolio renders inside */}
        <div id="portfolio-print-area" ref={printAreaRef}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default FullPreview;
