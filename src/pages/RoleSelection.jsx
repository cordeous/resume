import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '../components/LanguageSwitcher';
import './RoleSelection.css';

const RoleSelection = ({ onRoleSelect }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [customRole, setCustomRole] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedRoleName, setSelectedRoleName] = useState('');

  const popularRoles = [
    { id: 'software', label: t('role.software'), icon: '💻' },
    { id: 'data', label: t('role.data'), icon: '📊' },
    { id: 'marketing', label: t('role.marketing'), icon: '📈' },
    { id: 'designer', label: t('role.designer'), icon: '🎨' },
    { id: 'sales', label: t('role.sales'), icon: '💼' },
    { id: 'other', label: t('role.other'), icon: '🔧' }
  ];

  // Extended list of role suggestions for autocomplete
  const allRoles = [
    'Software Engineer', 'Data Scientist', 'Marketing Manager', 'Product Designer', 'Sales Representative',
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Cloud Engineer',
    'Machine Learning Engineer', 'Data Analyst', 'Business Analyst', 'Product Manager', 'Project Manager',
    'UX Designer', 'UI Designer', 'Graphic Designer', 'Content Writer', 'Technical Writer',
    'Digital Marketing Specialist', 'SEO Specialist', 'Social Media Manager', 'Account Manager',
    'Customer Success Manager', 'Software Architect', 'Database Administrator', 'Network Engineer',
    'Cybersecurity Analyst', 'Quality Assurance Engineer', 'System Administrator', 'IT Support Specialist'
  ];

  const handleInputChange = (value) => {
    setCustomRole(value);

    // Generate suggestions based on input
    if (value.trim().length > 1) {
      const filtered = allRoles.filter(role =>
        role.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRoleName(role);
    setShowFeedback(true);
    onRoleSelect(role);

    // Animate transition with feedback
    setTimeout(() => {
      navigate('/builder');
    }, 800);
  };

  const handleCustomRole = () => {
    if (customRole.trim()) {
      handleRoleSelect(customRole.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCustomRole(suggestion);
    setSuggestions([]);
    handleRoleSelect(suggestion);
  };

  const handleSkip = () => {
    onRoleSelect(null);
    navigate('/builder');
  };

  return (
    <div className="role-selection">
      {/* Header with Language Switcher */}
      <div className="role-header">
        <div className="role-header-content">
          <div className="role-logo">ResumeBuilder</div>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="role-container">
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key="form"
              className="role-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
            <>
              <h1 className="role-title">{t('role.title')}</h1>
              <p className="role-subtitle">{t('role.subtitle')}</p>

              <div className="role-input-section">
                <div className="role-input-wrapper">
                  <input
                    type="text"
                    className="role-input"
                    placeholder={t('role.placeholder')}
                    value={customRole}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCustomRole()}
                  />
                  {customRole.trim() && (
                    <span className="role-input-feedback">
                      ✓ {customRole.trim().length} characters
                    </span>
                  )}
                  {suggestions.length > 0 && (
                    <motion.div
                      className="role-suggestions"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="role-suggestion-item"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
                <button
                  className="role-continue-btn"
                  onClick={handleCustomRole}
                  disabled={!customRole.trim()}
                >
                  {t('role.continue')}
                </button>
              </div>

              <div className="role-divider">
                <span>{t('role.or')}</span>
              </div>

              <div className="role-grid">
                {popularRoles.map((role) => (
                  <motion.button
                    key={role.id}
                    className="role-card"
                    onClick={() => handleRoleSelect(role.label)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="role-icon">{role.icon}</span>
                    <span className="role-label">{role.label}</span>
                  </motion.button>
                ))}
              </div>

              <button className="role-skip-btn" onClick={handleSkip}>
                {t('role.skip')}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              className="role-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="role-feedback">
                <div className="role-feedback-icon">✓</div>
                <h2 className="role-feedback-title">{t('role.feedback.title')}</h2>
                <p className="role-feedback-text">
                  {t('role.feedback.text')} <strong>{selectedRoleName}</strong>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoleSelection;
