import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import LanguageSwitcher from '../components/LanguageSwitcher';
import AppShowcase from '../components/AppShowcase';
import ExamplesModal from '../components/ExamplesModal';
import Logo from '../components/Logo';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showExamples, setShowExamples] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Shared easing — ease-out-expo for confident, decisive motion
  const easeOutExpo = [0.16, 1, 0.3, 1];
  const easeOutQuart = [0.25, 1, 0.5, 1];

  // Used as spread props on standalone elements
  const fadeIn = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: easeOutExpo }
  };

  // Used as variants on stagger-child elements
  const itemVariant = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } }
  };

  const staggerChildren = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      }
    }
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="landing-page">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header */}
      <motion.header
        className="header"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: easeOutQuart }}
        role="banner"
      >
        <div className="container header-content">
          <div className="logo"><Logo /></div>
          <nav className="nav" aria-label="Main navigation">
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, '#how-it-works')}>How It Works</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Features</a>
          </nav>
          <div className="header-actions">
            <LanguageSwitcher />
            <button
              className="sign-in-btn"
              onClick={() => navigate('/role-selection')}
              aria-label="Get started building your resume"
            >
              Build My Resume
            </button>
            <button
              className={`mobile-menu-btn${mobileNavOpen ? ' open' : ''}`}
              aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileNavOpen(o => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {mobileNavOpen && (
            <motion.nav
              id="mobile-nav"
              className="mobile-nav-drawer open"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <a href="#how-it-works" onClick={(e) => { handleSmoothScroll(e, '#how-it-works'); setMobileNavOpen(false); }}>How It Works</a>
              <a href="#features" onClick={(e) => { handleSmoothScroll(e, '#features'); setMobileNavOpen(false); }}>Features</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/role-selection'); }}>Build My Resume</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main id="main-content">

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="container hero-content"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
          }}
        >
          <motion.div
            className="hero-badge"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } } }}
          >
            LaTeX → PDF in seconds. No design experience needed.
          </motion.div>
          <motion.h1
            className="hero-title"
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } } }}
          >
            Build Your Professional Resume in Minutes
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutExpo } } }}
          >
            Answer a few questions and get a perfectly formatted resume using industry-standard LaTeX templates. No design experience needed.
          </motion.p>
          <motion.div
            className="hero-cta"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } } }}
          >
            <motion.button
              className="primary-btn"
              onClick={() => navigate('/role-selection')}
              whileHover={{ y: -3, transition: { duration: 0.18, ease: easeOutQuart } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            >
              Build My Resume →
            </motion.button>
            <button
              className="examples-link"
              onClick={() => setShowExamples(true)}
            >
              See examples →
            </button>
          </motion.div>
          <motion.div
            className="hero-image"
            variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } } }}
          >
            <ResumePreview />
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Three simple steps to your perfect resume</p>
          </motion.div>
          <motion.div
            className="steps-grid simple"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                num: '1',
                title: 'Pick Your Role',
                desc: 'Tell us your job title — we tailor the resume to what hiring managers expect',
                color: '#3D8A5A'
              },
              {
                num: '2',
                title: 'Fill In Your Details',
                desc: 'A guided form walks you through education, experience, and skills step by step',
                color: '#3D8A5A'
              },
              {
                num: '3',
                title: 'Download & Apply',
                desc: 'Export as PDF, raw LaTeX, or open directly in Overleaf',
                color: '#3D8A5A'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="step-card"
                variants={itemVariant}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: easeOutQuart } }}
              >
                <div className="step-num" style={{ backgroundColor: step.color }}>
                  {step.num}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <motion.div
            className="stats-grid"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { value: '90%+', label: 'of companies use ATS filters your resume must pass' },
              { value: '< 10 min', label: 'to build a complete, formatted resume from scratch' },
              { value: '3 formats', label: 'PDF, LaTeX source, and one-click Overleaf import' },
              { value: '100%', label: 'free — no account required to build or download' },
            ].map((stat, i) => (
              <motion.div key={i} className="stat-item" variants={itemVariant}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* See It In Action */}
      <section id="showcase" className="showcase-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <h2 className="section-title">See It In Action</h2>
            <p className="section-subtitle">From blank form to professional resume in minutes</p>
          </motion.div>
          <AppShowcase />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle">Built for people who want results, not another editor to learn</p>
          </motion.div>
          <motion.div
            className="features-grid simple"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: '📐',
                title: 'LaTeX Quality',
                desc: 'Professional typography trusted worldwide'
              },
              {
                icon: '👁️',
                title: 'Live Preview',
                desc: 'See changes instantly as you type'
              },
              {
                icon: '📦',
                title: 'Multiple Formats',
                desc: 'PDF, LaTeX, or Overleaf export'
              },
              {
                icon: '🤖',
                title: 'Smart Suggestions',
                desc: 'Role-based resume improvements'
              },
              {
                icon: '➕',
                title: 'Unlimited Entries',
                desc: 'Add multiple jobs, schools, projects'
              },
              {
                icon: '🌐',
                title: 'Bilingual',
                desc: 'English and Spanish support'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card compact"
                variants={itemVariant}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: easeOutQuart } }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container final-cta-content">
          <motion.h2
            className="final-cta-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            Ready to Build Your Resume?
          </motion.h2>
          <motion.p
            className="final-cta-subtitle"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.09, ease: easeOutExpo }}
          >
            Built by engineers who got tired of fighting Word formatting. Your resume should look this good too.
          </motion.p>
          <motion.button
            className="final-cta-btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.16, ease: easeOutExpo }}
            whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2, ease: easeOutQuart } }}
            whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
            onClick={() => navigate('/role-selection')}
          >
            Get Started Free
          </motion.button>
        </div>
      </section>

      </main>{/* end main */}

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo"><Logo variant="light" /></div>
              <p className="footer-tagline">Professional resumes powered by LaTeX</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4 className="footer-col-title">Product</h4>
                <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Features</a>
                <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, '#how-it-works')}>How It Works</a>
              </div>
              <div className="footer-col">
                <h4 className="footer-col-title">Get Started</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/role-selection'); }}>Build Resume</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setShowExamples(true); }}>See Examples</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 ResumeBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Examples Modal */}
      <ExamplesModal isOpen={showExamples} onClose={() => setShowExamples(false)} />
    </div>
  );
};

export default LandingPage;
