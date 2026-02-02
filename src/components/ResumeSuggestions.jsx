import { useTranslation } from 'react-i18next';
import './ResumeSuggestions.css';

const ResumeSuggestions = ({ role, formData, experienceList, projectsList }) => {
  const { t } = useTranslation();

  const generateSuggestions = () => {
    const suggestions = [];

    // Role-specific suggestions
    const roleSuggestions = {
      'Software Engineer': [
        'Include specific programming languages and frameworks',
        'Highlight open source contributions or GitHub projects',
        'Quantify impact (e.g., "Improved performance by 40%")',
        'Mention agile/scrum experience',
        'Include technical certifications'
      ],
      'Data Scientist': [
        'List statistical analysis tools (R, Python, SQL)',
        'Highlight machine learning projects',
        'Include links to Kaggle competitions or datasets',
        'Mention A/B testing experience',
        'Quantify data insights with metrics'
      ],
      'Marketing Manager': [
        'Include campaign ROI metrics',
        'Highlight social media growth percentages',
        'Mention marketing automation tools',
        'Show brand awareness improvements',
        'Include content creation experience'
      ],
      'Product Designer': [
        'Include portfolio link',
        'Mention design tools (Figma, Sketch, Adobe)',
        'Highlight user research experience',
        'Show metrics on user satisfaction improvements',
        'Include design system experience'
      ]
    };

    // Get role-specific tips
    const roleKey = Object.keys(roleSuggestions).find(key =>
      role?.toLowerCase().includes(key.toLowerCase())
    );

    if (roleKey) {
      roleSuggestions[roleKey].forEach(tip => {
        suggestions.push({ type: 'tip', message: tip });
      });
    }

    // Check for missing sections
    if (!formData.personal?.linkedin && !formData.personal?.github) {
      suggestions.push({
        type: 'missing',
        message: 'Add LinkedIn or GitHub profile for credibility'
      });
    }

    if (experienceList.length === 0) {
      suggestions.push({
        type: 'missing',
        message: 'Add work experience to showcase your career'
      });
    }

    if (projectsList.length === 0) {
      suggestions.push({
        type: 'missing',
        message: 'Include projects to demonstrate practical skills'
      });
    }

    if (!formData.skills?.languages) {
      suggestions.push({
        type: 'missing',
        message: 'List your technical skills and tools'
      });
    }

    // Check for weak content
    experienceList.forEach((exp, index) => {
      if (exp.responsibilities && exp.responsibilities.split('\n').length < 3) {
        suggestions.push({
          type: 'weak',
          message: `Add more details to experience #${index + 1} (aim for 3-5 bullet points)`
        });
      }
    });

    return suggestions;
  };

  const suggestions = generateSuggestions();

  if (!role || suggestions.length === 0) return null;

  return (
    <div className="suggestions-panel">
      <div className="suggestions-header">
        <h3 className="suggestions-title">{t('suggestions.title')}</h3>
        {role && <span className="suggestions-role">{t('suggestions.forRole', { role })}</span>}
      </div>

      <div className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <div key={index} className={`suggestion-item suggestion-${suggestion.type}`}>
            <span className="suggestion-icon">
              {suggestion.type === 'missing' && '⚠️'}
              {suggestion.type === 'weak' && '💡'}
              {suggestion.type === 'tip' && '✨'}
            </span>
            <span className="suggestion-text">{suggestion.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeSuggestions;
