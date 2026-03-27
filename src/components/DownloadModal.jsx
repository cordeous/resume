import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQrcode } from 'react-icons/fa';

const DownloadModal = ({
  isOpen,
  onClose,
  onDownloadPdf,
  onDownloadLatex,
  onOpenInOverleaf,
  onCopyToClipboard,
  onDownloadQRCode,
  onDownloadBusinessCard,
}) => {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Focus the modal when it opens
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.div
            ref={modalRef}
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-modal-title"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="download-modal-title" className="modal-title">Download Your Resume</h2>
              <p className="modal-subtitle">Choose how you want to export your resume</p>
            </div>

            <div className="download-options">
              <button className="download-option" onClick={onDownloadPdf}>
                <span className="download-icon" aria-hidden="true">📥</span>
                <div className="download-info">
                  <div className="download-title">Download PDF</div>
                  <div className="download-desc">Get a ready-to-submit PDF file instantly</div>
                </div>
              </button>

              <button className="download-option" onClick={onDownloadLatex}>
                <span className="download-icon" aria-hidden="true">📄</span>
                <div className="download-info">
                  <div className="download-title">Download LaTeX File</div>
                  <div className="download-desc">Get the .tex file to compile locally or upload to Overleaf</div>
                </div>
              </button>

              <button className="download-option" onClick={onOpenInOverleaf}>
                <span className="download-icon" aria-hidden="true">🚀</span>
                <div className="download-info">
                  <div className="download-title">Open in Overleaf</div>
                  <div className="download-desc">Instantly open your resume in Overleaf to compile to PDF</div>
                </div>
              </button>

              <button className="download-option" onClick={onCopyToClipboard}>
                <span className="download-icon" aria-hidden="true">📋</span>
                <div className="download-info">
                  <div className="download-title">Copy to Clipboard</div>
                  <div className="download-desc">Copy the LaTeX code to paste anywhere</div>
                </div>
              </button>

              <button className="download-option" onClick={onDownloadQRCode}>
                <span className="download-icon" aria-hidden="true"><FaQrcode size={24} /></span>
                <div className="download-info">
                  <div className="download-title">Download QR Code</div>
                  <div className="download-desc">Get a QR code with your contact information</div>
                </div>
              </button>

              <button className="download-option" onClick={onDownloadBusinessCard}>
                <span className="download-icon" aria-hidden="true">💼</span>
                <div className="download-info">
                  <div className="download-title">Business Card PDF</div>
                  <div className="download-desc">Generate a printable business card with QR code</div>
                </div>
              </button>
            </div>

            <div className="modal-footer">
              <button ref={closeBtnRef} className="modal-close-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DownloadModal;
