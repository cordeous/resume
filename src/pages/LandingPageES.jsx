import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import LanguageSwitcher from '../components/LanguageSwitcher';
import AppShowcase from '../components/AppShowcase';
import ExamplesModal from '../components/ExamplesModal';
import Logo from '../components/Logo';
import './LandingPage.css';

const LandingPageES = () => {
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
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, '#how-it-works')}>Cómo Funciona</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Características</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')}>Precios</a>
          </nav>
          <div className="header-actions">
            <LanguageSwitcher />
            <button className="sign-in-btn">Iniciar Sesión</button>
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
            ✨ Construido con LaTeX para Tipografía Perfecta
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Crea Tu Currículum Profesional en Minutos
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Responde algunas preguntas y obtén un currículum perfectamente formateado usando plantillas LaTeX estándar de la industria. No se necesita experiencia en diseño.
          </motion.p>
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              className="primary-btn"
              onClick={() => navigate('/es/role-selection')}
            >
              Crear Mi Currículum →
            </button>
            <button className="secondary-btn" onClick={() => setShowExamples(true)}>
              Ver Ejemplos
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
            <h2 className="section-title">Cómo Funciona</h2>
            <p className="section-subtitle">Tres simples pasos para tu currículum perfecto</p>
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
                title: 'Responde Preguntas',
                desc: 'Completa un formulario guiado con tu información',
                color: '#3D8A5A'
              },
              {
                num: '2',
                title: 'Vista Previa en Tiempo Real',
                desc: 'Ve tu currículum actualizarse instantáneamente mientras escribes',
                color: '#D89575'
              },
              {
                num: '3',
                title: 'Descargar y Aplicar',
                desc: 'Exporta como PDF, LaTeX, o abre en Overleaf',
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
            <h2 className="section-title">Por Qué Importa</h2>
            <p className="section-subtitle">Obtén más entrevistas con un currículum profesional</p>
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
                title: 'Pasa ATS',
                desc: 'Más del 90% de las empresas usan filtros ATS'
              },
              {
                icon: '💼',
                title: 'Destácate',
                desc: 'Tipografía profesional en LaTeX'
              },
              {
                icon: '📈',
                title: 'Más Respuestas',
                desc: '40% de aumento en solicitudes de entrevista'
              },
              {
                icon: '⚡',
                title: 'Ahorra Tiempo',
                desc: 'Crea en menos de 10 minutos'
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
            <h2 className="section-title">¿Por Qué Elegir Nuestro Creador de Currículums?</h2>
            <p className="section-subtitle">Resultados profesionales impulsados por tipografía LaTeX</p>
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
                title: 'Calidad LaTeX',
                desc: 'Tipografía profesional confiable mundialmente'
              },
              {
                icon: '👁️',
                title: 'Vista Previa en Vivo',
                desc: 'Ve los cambios instantáneamente mientras escribes'
              },
              {
                icon: '📦',
                title: 'Múltiples Formatos',
                desc: 'Exporta a PDF, LaTeX, o Overleaf'
              },
              {
                icon: '🤖',
                title: 'Sugerencias Inteligentes',
                desc: 'Mejoras de currículum basadas en el rol'
              },
              {
                icon: '➕',
                title: 'Entradas Ilimitadas',
                desc: 'Agrega múltiples trabajos, escuelas, proyectos'
              },
              {
                icon: '🌐',
                title: 'Bilingüe',
                desc: 'Soporte en inglés y español'
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
            ¿Listo para Crear Tu Currículum?
          </motion.h2>
          <motion.p
            className="final-cta-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Únete a miles de buscadores de empleo que consiguieron sus trabajos soñados con nuestros currículums profesionales
          </motion.p>
          <motion.button
            className="final-cta-btn"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/es/role-selection')}
          >
            Comenzar Gratis
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo"><Logo variant="light" /></div>
              <p className="footer-tagline">Currículums profesionales impulsados por LaTeX</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4 className="footer-col-title">Producto</h4>
                <a href="#features">Características</a>
                <a href="#templates">Plantillas</a>
                <a href="#pricing">Precios</a>
              </div>
              <div className="footer-col">
                <h4 className="footer-col-title">Empresa</h4>
                <a href="#about">Acerca de</a>
                <a href="#contact">Contacto</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 CreadorCV. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Examples Modal */}
      <ExamplesModal isOpen={showExamples} onClose={() => setShowExamples(false)} />
    </div>
  );
};

export default LandingPageES;
