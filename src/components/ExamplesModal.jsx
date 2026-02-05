import { motion, AnimatePresence } from 'framer-motion';
import './ExamplesModal.css';

const ExamplesModal = ({ isOpen, onClose }) => {
  const examples = [
    {
      id: 1,
      title: 'Software Engineer Resume',
      role: 'Software Engineering',
      description: 'Modern tech resume optimized for FAANG companies',
      image: '/examples/software-engineer.png',
      preview: {
        name: 'Alex Johnson',
        title: 'Senior Software Engineer | San Francisco, CA',
        contact: 'alex.johnson@email.com | (415) 555-0123 | linkedin.com/in/alexjohnson',
        highlights: [
          'EXPERIENCE',
          'Senior Software Engineer at Google • 2021-Present',
          '• Led microservices migration reducing latency by 40%',
          '• Architected real-time data pipeline processing 10M+ events/day',
          '',
          'Software Engineer at Amazon • 2019-2021',
          '• Built distributed caching system improving response time by 60%',
          '• Mentored 5 junior engineers, conducted 100+ code reviews'
        ]
      }
    },
    {
      id: 2,
      title: 'Data Scientist Resume',
      role: 'Data Science & Analytics',
      description: 'Analytics-focused resume with strong metrics',
      image: '/examples/data-scientist.png',
      preview: {
        name: 'Sarah Chen',
        title: 'Data Scientist | New York, NY',
        contact: 'sarah.chen@email.com | (212) 555-0187 | github.com/sarachen',
        highlights: [
          'EXPERIENCE',
          'Senior Data Scientist at Meta • 2022-Present',
          '• Developed recommendation ML model achieving 95% accuracy',
          '• Analyzed 50M+ user interactions to drive product decisions',
          '',
          'Data Scientist at Netflix • 2020-2022',
          '• Built predictive churn model saving $2M annually',
          '• Published 3 papers in top-tier ML conferences'
        ]
      }
    },
    {
      id: 3,
      title: 'Product Manager Resume',
      role: 'Product Management',
      description: 'Results-driven PM resume with impact metrics',
      image: '/examples/product-manager.png',
      preview: {
        name: 'Michael Rodriguez',
        title: 'Senior Product Manager | Seattle, WA',
        contact: 'mrodriguez@email.com | (206) 555-0194 | linkedin.com/in/mrodriguez',
        highlights: [
          'EXPERIENCE',
          'Senior PM at Microsoft • 2021-Present',
          '• Launched 10+ features reaching 5M+ active users',
          '• Drove 35% YoY revenue growth ($50M ARR)',
          '',
          'Product Manager at Uber • 2019-2021',
          '• Led cross-functional team of 15 across eng, design, data',
          '• Shipped rider safety features reducing incidents by 25%'
        ]
      }
    },
    {
      id: 4,
      title: 'UX Designer Resume',
      role: 'Design & Creative',
      description: 'Creative resume showcasing design thinking',
      image: '/examples/ux-designer.png',
      preview: {
        name: 'Emily Zhang',
        title: 'Senior UX Designer | Austin, TX',
        contact: 'emily.zhang@email.com | (512) 555-0176 | dribbble.com/emilyzhang',
        highlights: [
          'EXPERIENCE',
          'Senior UX Designer at Airbnb • 2022-Present',
          '• Redesigned booking flow, improving conversion by 50%',
          '• Led design system initiative used by 200+ engineers',
          '',
          'UX Designer at Spotify • 2020-2022',
          '• Designed mobile onboarding flow (4.8★ App Store rating)',
          '• Won 2 Webby Awards for innovative interaction design'
        ]
      }
    },
    {
      id: 5,
      title: 'Marketing Manager Resume',
      role: 'Marketing & Growth',
      description: 'Growth-focused resume with ROI emphasis',
      image: '/examples/marketing-manager.png',
      preview: {
        name: 'David Kim',
        title: 'Digital Marketing Manager | Los Angeles, CA',
        contact: 'david.kim@email.com | (323) 555-0165 | linkedin.com/in/davidkim',
        highlights: [
          'EXPERIENCE',
          'Marketing Manager at Shopify • 2021-Present',
          '• Grew user base from 50K to 500K in 18 months',
          '• Managed $2M annual budget across paid/organic channels',
          '',
          'Growth Marketing Lead at Squarespace • 2019-2021',
          '• Achieved 300% ROI on paid campaigns ($5M revenue)',
          '• Built SEO strategy driving 200K monthly organic visits'
        ]
      }
    },
    {
      id: 6,
      title: 'Entry-Level Resume',
      role: 'Recent Graduate',
      description: 'Strong resume for new graduates',
      image: '/examples/entry-level.png',
      preview: {
        name: 'Jessica Williams',
        title: 'Computer Science Graduate | Boston, MA',
        contact: 'j.williams@email.com | (617) 555-0142 | github.com/jesswilliams',
        highlights: [
          'EDUCATION',
          'B.S. Computer Science, MIT • 2022-2026',
          'GPA: 3.9/4.0 | Dean\'s List (4 semesters)',
          '',
          'EXPERIENCE',
          'Software Engineering Intern at Stripe • Summer 2025',
          '• Built payment reconciliation tool processing $10M+',
          '',
          'SWE Intern at Tesla • Summer 2024',
          '• Developed data pipeline reducing processing time by 40%'
        ]
      }
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="examples-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="examples-modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="examples-modal-header">
            <div>
              <h2 className="examples-modal-title">Resume Examples</h2>
              <p className="examples-modal-subtitle">
                Professional templates used by successful candidates
              </p>
            </div>
            <button className="examples-modal-close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="examples-grid">
            {examples.map((example) => (
              <motion.div
                key={example.id}
                className="example-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: example.id * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="example-card-header">
                  <div className="example-placeholder">
                    <div className="example-placeholder-header">
                      <div className="placeholder-name">{example.preview.name}</div>
                      <div className="placeholder-title">{example.preview.title}</div>
                      {example.preview.contact && (
                        <div className="placeholder-contact">{example.preview.contact}</div>
                      )}
                    </div>
                    <div className="example-placeholder-content">
                      {example.preview.highlights.map((highlight, idx) => (
                        <div key={idx} className="placeholder-line">{highlight}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="example-card-body">
                  <h3 className="example-title">{example.title}</h3>
                  <p className="example-role">{example.role}</p>
                  <p className="example-description">{example.description}</p>
                  <button className="example-use-btn">Use This Template →</button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="examples-modal-footer">
            <p>All examples are ATS-friendly and optimized for applicant tracking systems</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExamplesModal;
