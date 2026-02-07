import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
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
      {/* Header */}
      <motion.header
        className="header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container header-content">
          <div className="logo"><Logo /></div>
          <nav className="nav">
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, '#how-it-works')}>How It Works</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Features</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')}>Pricing</a>
          </nav>
          <div className="header-actions">
            <LanguageSwitcher />
            <button className="sign-in-btn">Sign In</button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <motion.div
            className="hero-badge"
            {...fadeIn}
          >
            ✨ Built with LaTeX for Perfect Typography
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Build Your Professional Resume in Minutes
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Answer a few questions and get a perfectly formatted resume using industry-standard LaTeX templates. No design experience needed.
          </motion.p>
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              className="primary-btn"
              onClick={() => navigate('/role-selection')}
            >
              Build My Resume →
            </button>
            <button className="secondary-btn" onClick={() => setShowExamples(true)}>
              See Examples
            </button>
          </motion.div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <ResumePreview />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
                title: 'Answer Questions',
                desc: 'Fill out a guided form with your information',
                color: '#3D8A5A'
              },
              {
                num: '2',
                title: 'Preview in Real-Time',
                desc: 'See your resume update instantly as you type',
                color: '#D89575'
              },
              {
                num: '3',
                title: 'Download & Apply',
                desc: 'Export as PDF, LaTeX, or open in Overleaf',
                color: '#3D8A5A'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="step-card"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="step-num" style={{ backgroundColor: step.color }}>
                  {step.num}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Add App Showcase */}
          <AppShowcase />
        </div>
      </section>

      {/* Career Benefits */}
      <section className="career-benefits">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why It Matters</h2>
            <p className="section-subtitle">Get more interviews with a professional resume</p>
          </motion.div>
          <motion.div
            className="benefits-grid compact"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: '🎯',
                title: 'Pass ATS',
                desc: '90%+ of companies use ATS filters'
              },
              {
                icon: '💼',
                title: 'Stand Out',
                desc: 'Professional LaTeX typography'
              },
              {
                icon: '📈',
                title: 'More Callbacks',
                desc: '40% increase in interview requests'
              },
              {
                icon: '⚡',
                title: 'Save Time',
                desc: 'Build in under 10 minutes'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-card compact"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-desc">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose Our Resume Builder?</h2>
            <p className="section-subtitle">Professional results powered by LaTeX typography</p>
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
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Build Your Resume?
          </motion.h2>
          <motion.p
            className="final-cta-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join thousands of job seekers who landed their dream jobs with our professional resumes
          </motion.p>
          <motion.button
            className="final-cta-btn"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/role-selection')}
          >
            Get Started Free
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo"><Logo variant="light" /></div>
              <p className="footer-tagline">Professional resumes powered by LaTeX</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4 className="footer-col-title">Product</h4>
                <a href="#features">Features</a>
                <a href="#templates">Templates</a>
                <a href="#pricing">Pricing</a>
              </div>
              <div className="footer-col">
                <h4 className="footer-col-title">Company</h4>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
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
