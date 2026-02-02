import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

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
          <div className="logo">ResumeBuilder</div>
          <nav className="nav">
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, '#how-it-works')}>How It Works</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Features</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')}>Pricing</a>
          </nav>
          <button className="sign-in-btn">Sign In</button>
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
              onClick={() => navigate('/builder')}
            >
              Build My Resume →
            </button>
            <button className="secondary-btn">See Examples</button>
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
            className="steps-grid"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                num: '1',
                title: 'Answer Questions',
                desc: 'Tell us about your education, experience, skills, and projects through our guided questionnaire.',
                color: '#3D8A5A'
              },
              {
                num: '2',
                title: 'Preview & Edit',
                desc: 'Review your generated resume and make any adjustments before downloading.',
                color: '#D89575'
              },
              {
                num: '3',
                title: 'Download & Apply',
                desc: 'Export your perfectly formatted resume as PDF and start applying to your dream jobs.',
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
            className="features-grid"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: 'LaTeX Quality',
                desc: 'Industry-standard formatting using the same LaTeX engine trusted by academics and professionals worldwide.'
              },
              {
                title: 'No Design Skills Needed',
                desc: 'Just answer questions about your background. We handle all the typography, spacing, and formatting automatically.'
              },
              {
                title: 'ATS-Friendly',
                desc: 'Clean, parseable format that passes Applicant Tracking Systems while maintaining professional appearance.'
              },
              {
                title: 'Instant PDF Export',
                desc: 'Download your resume as a PDF ready to submit to employers. No watermarks, no signup required.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
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
            onClick={() => navigate('/builder')}
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
              <div className="footer-logo">ResumeBuilder</div>
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
    </div>
  );
};

export default LandingPage;
