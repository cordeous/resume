import { motion } from 'framer-motion';
import './AppShowcase.css';

const AppShowcase = () => {
  return (
    <div className="app-showcase">
      <div className="showcase-grid">
        <motion.div
          className="showcase-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="showcase-screen">
            <div className="screen-mockup">
              <div className="screen-header">
                <div className="screen-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="screen-content">
                <div className="form-mockup">
                  <div className="mockup-title">Personal Information</div>
                  <div className="mockup-field"></div>
                  <div className="mockup-field"></div>
                  <div className="mockup-field short"></div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="showcase-title">Easy Form Filling</h3>
          <p className="showcase-desc">Guided questionnaire with real-time preview</p>
        </motion.div>

        <motion.div
          className="showcase-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="showcase-screen">
            <div className="screen-mockup">
              <div className="screen-header">
                <div className="screen-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="screen-content">
                <div className="resume-mockup">
                  <div className="mockup-header">JOHN DOE</div>
                  <div className="mockup-line"></div>
                  <div className="mockup-line short"></div>
                  <div className="mockup-section-title">EXPERIENCE</div>
                  <div className="mockup-line"></div>
                  <div className="mockup-line"></div>
                  <div className="mockup-line short"></div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="showcase-title">Professional Preview</h3>
          <p className="showcase-desc">See your resume update instantly</p>
        </motion.div>

        <motion.div
          className="showcase-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="showcase-screen">
            <div className="screen-mockup">
              <div className="screen-header">
                <div className="screen-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="screen-content download-mockup">
                <div className="download-icon">📥</div>
                <div className="mockup-title small">Download PDF</div>
                <div className="download-icon">📄</div>
                <div className="mockup-title small">LaTeX File</div>
                <div className="download-icon">🚀</div>
                <div className="mockup-title small">Overleaf</div>
              </div>
            </div>
          </div>
          <h3 className="showcase-title">Multiple Formats</h3>
          <p className="showcase-desc">Export as PDF, LaTeX, or Overleaf</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AppShowcase;
