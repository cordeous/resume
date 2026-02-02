import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './RoleSelection.css';

const RoleSelection = ({ onRoleSelect }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [customRole, setCustomRole] = useState('');

  const popularRoles = [
    { id: 'software', label: t('role.software'), icon: '💻' },
    { id: 'data', label: t('role.data'), icon: '📊' },
    { id: 'marketing', label: t('role.marketing'), icon: '📈' },
    { id: 'designer', label: t('role.designer'), icon: '🎨' },
    { id: 'sales', label: t('role.sales'), icon: '💼' },
    { id: 'other', label: t('role.other'), icon: '🔧' }
  ];

  const handleRoleSelect = (role) => {
    onRoleSelect(role);
    navigate('/builder');
  };

  const handleCustomRole = () => {
    if (customRole.trim()) {
      onRoleSelect(customRole.trim());
      navigate('/builder');
    }
  };

  const handleSkip = () => {
    onRoleSelect(null);
    navigate('/builder');
  };

  return (
    <div className="role-selection">
      <div className="role-container">
        <motion.div
          className="role-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="role-title">{t('role.title')}</h1>
          <p className="role-subtitle">{t('role.subtitle')}</p>

          <div className="role-input-section">
            <input
              type="text"
              className="role-input"
              placeholder={t('role.placeholder')}
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCustomRole()}
            />
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
      </div>
    </div>
  );
};

export default RoleSelection;
