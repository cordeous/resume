import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Logo from '../components/Logo';
import './RoleSelection.css';

const RoleSelection = ({ onRoleSelect }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [customRole, setCustomRole] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedRoleName, setSelectedRoleName] = useState('');
  const suggestionsRef = useRef(null);

  const popularRoles = [
    { id: 'software', label: t('role.software'), icon: '💻' },
    { id: 'data', label: t('role.data'), icon: '📊' },
    { id: 'marketing', label: t('role.marketing'), icon: '📈' },
    { id: 'designer', label: t('role.designer'), icon: '🎨' },
    { id: 'sales', label: t('role.sales'), icon: '💼' },
    { id: 'other', label: t('role.other'), icon: '🔧' }
  ];

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
    setActiveSuggestionIndex(-1);

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
    setActiveSuggestionIndex(-1);
    handleRoleSelect(suggestion);
  };

  const handleSkip = () => {
    onRoleSelect(null);
    navigate('/builder');
  };

  // Keyboard navigation for autocomplete dropdown (M1)
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) {
      if (e.key === 'Enter') handleCustomRole();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestionIndex >= 0) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
      } else {
        handleCustomRole();
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
  };

  const listboxId = 'role-suggestions-listbox';
  const activeDescendantId = activeSuggestionIndex >= 0 ? `role-suggestion-${activeSuggestionIndex}` : undefined;

  return (
    <div className="role-selection">
      {/* Header */}
      <header className="role-header" role="banner">
        <div className="role-header-content">
          <div className="role-logo"><Logo /></div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="role-container">
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
                    onKeyDown={handleKeyDown}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={suggestions.length > 0}
                    aria-controls={listboxId}
                    aria-activedescendant={activeDescendantId}
                    aria-label={t('role.placeholder')}
                  />
                  {customRole.trim() && (
                    <span className="role-input-feedback" aria-hidden="true">
                      ✓ {customRole.trim().length} characters
                    </span>
                  )}
                  {suggestions.length > 0 && (
                    <motion.ul
                      id={listboxId}
                      ref={suggestionsRef}
                      className="role-suggestions"
                      role="listbox"
                      aria-label="Role suggestions"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          id={`role-suggestion-${index}`}
                          className={`role-suggestion-item${activeSuggestionIndex === index ? ' role-suggestion-item--active' : ''}`}
                          role="option"
                          aria-selected={activeSuggestionIndex === index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          onMouseEnter={() => setActiveSuggestionIndex(index)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
                <button
                  className="role-continue-btn"
                  onClick={handleCustomRole}
                  disabled={!customRole.trim()}
                  aria-label={customRole.trim() ? `Continue with ${customRole}` : 'Enter a role to continue'}
                >
                  {t('role.continue')}
                </button>
              </div>

              <div className="role-divider" aria-hidden="true">
                <span>or pick a popular role</span>
              </div>

              <div className="role-grid" role="group" aria-label="Popular roles">
                {popularRoles.map((role) => (
                  <motion.button
                    key={role.id}
                    className="role-card"
                    onClick={() => handleRoleSelect(role.label)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Select ${role.label}`}
                  >
                    <span className="role-icon" aria-hidden="true">{role.icon}</span>
                    <span className="role-label">{role.label}</span>
                  </motion.button>
                ))}
              </div>

              <button className="role-skip-btn" onClick={handleSkip}>
                Skip for now — role-specific tips won't be available
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
              role="status"
              aria-live="polite"
            >
              <div className="role-feedback">
                <div className="role-feedback-icon" aria-hidden="true">✓</div>
                <h2 className="role-feedback-title">{t('role.feedback.title')}</h2>
                <p className="role-feedback-text">
                  {t('role.feedback.text')} <strong>{selectedRoleName}</strong>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default RoleSelection;
