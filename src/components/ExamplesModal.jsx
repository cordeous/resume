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
        title: 'Senior Software Engineer',
        highlights: [
          'Led development of microservices architecture',
          '5+ years experience with React, Node.js, AWS',
          'Increased system performance by 40%'
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
        title: 'Data Scientist',
        highlights: [
          'Built ML models with 95% accuracy',
          'Expert in Python, TensorFlow, SQL',
          'Published 3 research papers'
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
        title: 'Senior Product Manager',
        highlights: [
          'Launched 10+ features affecting 1M+ users',
          'Increased revenue by 35% YoY',
          'Led cross-functional teams of 15+'
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
        title: 'Senior UX Designer',
        highlights: [
          'Redesigned app with 50% better UX metrics',
          'Expert in Figma, Adobe Creative Suite',
          'Won 2 design awards'
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
        title: 'Digital Marketing Manager',
        highlights: [
          'Grew user base from 10K to 500K',
          'Managed $2M+ annual marketing budget',
          'Achieved 300% ROI on campaigns'
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
        title: 'Computer Science Graduate',
        highlights: [
          'GPA: 3.9/4.0, Dean\'s List',
          '3 internships at tech companies',
          'Built 5+ personal projects'
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
                    </div>
                    <div className="example-placeholder-content">
                      {example.preview.highlights.map((highlight, idx) => (
                        <div key={idx} className="placeholder-line">• {highlight}</div>
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
