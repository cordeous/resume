import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaPrint, FaShareAlt } from 'react-icons/fa';
import './QRPreviewModal.css';

const QRPreviewModal = ({ isOpen, onClose, type, qrCodeDataURL, personalInfo, onDownload }) => {
  const [activeTab, setActiveTab] = useState('qr');

  useEffect(() => {
    if (type === 'qr') setActiveTab('qr');
    if (type === 'card') setActiveTab('card');
  }, [type]);

  if (!isOpen) return null;

  const handleDownload = () => {
    onDownload();
    // Don't close modal immediately, let user see confirmation
    setTimeout(() => onClose(), 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share && qrCodeDataURL) {
      try {
        // Convert data URL to blob
        const response = await fetch(qrCodeDataURL);
        const blob = await response.blob();
        const file = new File([blob], 'qr-code.png', { type: 'image/png' });

        await navigator.share({
          title: 'My Contact QR Code',
          text: 'Scan this QR code to get my contact information',
          files: [file]
        });
      } catch (error) {
        console.log('Error sharing:', error);
        alert('Sharing not supported on this device');
      }
    } else {
      alert('Sharing not supported on this device');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="qr-preview-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="qr-preview-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="qr-preview-header">
            <h2 className="qr-preview-title">
              {type === 'qr' ? 'Your Contact QR Code' : 'Your Business Card'}
            </h2>
            <button className="qr-preview-close" onClick={onClose}>✕</button>
          </div>

          <div className="qr-preview-content">
            {type === 'qr' && qrCodeDataURL && (
              <div className="qr-display-container">
                <div className="qr-code-frame">
                  <div className="qr-code-header">
                    <h3>{personalInfo?.fullName || 'Your Name'}</h3>
                    <p>{personalInfo?.email || 'your.email@example.com'}</p>
                  </div>
                  <div className="qr-code-image-wrapper">
                    <img src={qrCodeDataURL} alt="QR Code" className="qr-code-image" />
                  </div>
                  <div className="qr-code-footer">
                    <p className="qr-scan-text">📱 Scan to save contact</p>
                    <div className="qr-contact-info">
                      {personalInfo?.phone && <span>📞 {personalInfo.phone}</span>}
                      {personalInfo?.linkedin && <span>💼 LinkedIn</span>}
                      {personalInfo?.github && <span>🐙 GitHub</span>}
                    </div>
                  </div>
                </div>

                <div className="qr-instructions">
                  <h4>How to use:</h4>
                  <ol>
                    <li>Download the QR code image</li>
                    <li>Add it to your resume, business card, or email signature</li>
                    <li>Anyone can scan it to instantly save your contact info</li>
                  </ol>
                  <div className="qr-use-cases">
                    <div className="use-case">
                      <span className="use-case-icon">📧</span>
                      <span>Email Signature</span>
                    </div>
                    <div className="use-case">
                      <span className="use-case-icon">📄</span>
                      <span>Resume Header</span>
                    </div>
                    <div className="use-case">
                      <span className="use-case-icon">💼</span>
                      <span>Business Card</span>
                    </div>
                    <div className="use-case">
                      <span className="use-case-icon">🌐</span>
                      <span>LinkedIn Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === 'card' && (
              <div className="business-card-preview-container">
                <div className="business-card-display">
                  <div className="card-front">
                    <div className="card-left">
                      <h2 className="card-name">{personalInfo?.fullName || 'Your Name'}</h2>
                      <div className="card-contact">
                        {personalInfo?.email && (
                          <div className="card-contact-item">
                            <span className="contact-icon">📧</span>
                            <span>{personalInfo.email}</span>
                          </div>
                        )}
                        {personalInfo?.phone && (
                          <div className="card-contact-item">
                            <span className="contact-icon">📞</span>
                            <span>{personalInfo.phone}</span>
                          </div>
                        )}
                        {personalInfo?.linkedin && (
                          <div className="card-contact-item">
                            <span className="contact-icon">💼</span>
                            <span>{personalInfo.linkedin.replace('https://', '').substring(0, 25)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card-right">
                      {qrCodeDataURL && (
                        <>
                          <img src={qrCodeDataURL} alt="QR Code" className="card-qr" />
                          <p className="card-qr-label">Scan for contact</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-instructions">
                  <h4>Print-Ready Business Card</h4>
                  <p>Standard size: 3.5" × 2" (89mm × 51mm)</p>
                  <ul>
                    <li>High-quality 300 DPI resolution</li>
                    <li>Professional layout with QR code</li>
                    <li>Ready to print or share digitally</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="qr-preview-actions">
            <button className="qr-action-btn secondary" onClick={handleShare}>
              <FaShareAlt /> Share
            </button>
            <button className="qr-action-btn secondary" onClick={handlePrint}>
              <FaPrint /> Print
            </button>
            <button className="qr-action-btn primary" onClick={handleDownload}>
              <FaDownload /> Download {type === 'qr' ? 'PNG' : 'PDF'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QRPreviewModal;
