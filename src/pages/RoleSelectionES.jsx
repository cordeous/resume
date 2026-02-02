import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '../components/LanguageSwitcher';
import './RoleSelection.css';

const RoleSelectionES = ({ onRoleSelect }) => {
  const navigate = useNavigate();
  const [customRole, setCustomRole] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedRoleName, setSelectedRoleName] = useState('');

  const popularRoles = [
    { id: 'software', label: 'Ingeniero de Software', icon: '💻' },
    { id: 'data', label: 'Científico de Datos', icon: '📊' },
    { id: 'marketing', label: 'Gerente de Marketing', icon: '📈' },
    { id: 'designer', label: 'Diseñador de Productos', icon: '🎨' },
    { id: 'sales', label: 'Representante de Ventas', icon: '💼' },
    { id: 'other', label: 'Otro', icon: '🔧' }
  ];

  // Extended list of role suggestions for autocomplete (in Spanish)
  const allRoles = [
    'Ingeniero de Software', 'Científico de Datos', 'Gerente de Marketing', 'Diseñador de Productos', 'Representante de Ventas',
    'Desarrollador Frontend', 'Desarrollador Backend', 'Desarrollador Full Stack', 'Ingeniero DevOps', 'Ingeniero Cloud',
    'Ingeniero de Machine Learning', 'Analista de Datos', 'Analista de Negocios', 'Gerente de Producto', 'Gerente de Proyecto',
    'Diseñador UX', 'Diseñador UI', 'Diseñador Gráfico', 'Redactor de Contenido', 'Redactor Técnico',
    'Especialista en Marketing Digital', 'Especialista en SEO', 'Gerente de Redes Sociales', 'Gerente de Cuentas',
    'Gerente de Éxito del Cliente', 'Arquitecto de Software', 'Administrador de Base de Datos', 'Ingeniero de Redes',
    'Analista de Ciberseguridad', 'Ingeniero de Aseguramiento de Calidad', 'Administrador de Sistemas', 'Especialista en Soporte TI'
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
      navigate('/es/builder');
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
    navigate('/es/builder');
  };

  return (
    <div className="role-selection">
      {/* Header with Language Switcher */}
      <div className="role-header">
        <div className="role-header-content">
          <div className="role-logo">CreadorCV</div>
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
              <h1 className="role-title">¿Para qué puesto estás aplicando?</h1>
              <p className="role-subtitle">Proporcionaremos sugerencias personalizadas para destacar tu currículum</p>

              <div className="role-input-section">
                <div className="role-input-wrapper">
                  <input
                    type="text"
                    className="role-input"
                    placeholder="ej., Ingeniero de Software, Gerente de Marketing, Analista de Datos"
                    value={customRole}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCustomRole()}
                  />
                  {customRole.trim() && (
                    <span className="role-input-feedback">
                      ✓ {customRole.trim().length} caracteres
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
                  Continuar
                </button>
              </div>

              <div className="role-divider">
                <span>O elige entre los roles populares:</span>
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
                Omitir por ahora
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
                <h2 className="role-feedback-title">¡Perfecto!</h2>
                <p className="role-feedback-text">
                  Creando tu currículum para: <strong>{selectedRoleName}</strong>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoleSelectionES;
