import { useNavigate, useLocation } from 'react-router-dom';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const currentPath = location.pathname;

    // Determine if we're on Spanish or English version
    const isSpanish = currentPath.startsWith('/es');

    // Map routes between English and Spanish
    if (isSpanish) {
      // Switch to English
      if (currentPath === '/es') {
        navigate('/');
      } else if (currentPath === '/es/role-selection') {
        navigate('/role-selection');
      } else if (currentPath === '/es/builder') {
        navigate('/builder');
      }
    } else {
      // Switch to Spanish
      if (currentPath === '/') {
        navigate('/es');
      } else if (currentPath === '/role-selection') {
        navigate('/es/role-selection');
      } else if (currentPath === '/builder') {
        navigate('/es/builder');
      }
    }
  };

  const isSpanish = location.pathname.startsWith('/es');

  return (
    <button className="language-switcher" onClick={toggleLanguage}>
      {isSpanish ? '🇺🇸 EN' : '🇪🇸 ES'}
    </button>
  );
};

export default LanguageSwitcher;
