import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';
import { generateLatexResume } from '../utils/latexGenerator';
import { downloadPdf } from '../utils/pdfGenerator';
import LanguageSwitcher from '../components/LanguageSwitcher';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [certificationsList, setCertificationsList] = useState([]);
  const [showCertifications, setShowCertifications] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        [fieldName]: value
      }
    }));
  };

  const handleAddAnother = () => {
    // Save current entry and clear form without moving to next step
    if (currentQuestion.id === 'education' && formData.education && Object.keys(formData.education).length > 0) {
      setEducationList(prev => [...prev, formData.education]);
      setFormData(prev => ({ ...prev, education: {} }));
    } else if (currentQuestion.id === 'experience' && formData.experience && Object.keys(formData.experience).length > 0) {
      setExperienceList(prev => [...prev, formData.experience]);
      setFormData(prev => ({ ...prev, experience: {} }));
    } else if (currentQuestion.id === 'projects' && formData.projects && Object.keys(formData.projects).length > 0) {
      setProjectsList(prev => [...prev, formData.projects]);
      setFormData(prev => ({ ...prev, projects: {} }));
    } else if (currentQuestion.id === 'certifications' && formData.certifications && Object.keys(formData.certifications).length > 0) {
      setCertificationsList(prev => [...prev, formData.certifications]);
      setFormData(prev => ({ ...prev, certifications: {} }));
    }
  };

  const handleNext = () => {
    // Save current section data before moving forward
    if (currentQuestion.id === 'education' && formData.education && Object.keys(formData.education).length > 0) {
      setEducationList(prev => [...prev, formData.education]);
      setFormData(prev => ({ ...prev, education: {} }));
    } else if (currentQuestion.id === 'experience' && formData.experience && Object.keys(formData.experience).length > 0) {
      setExperienceList(prev => [...prev, formData.experience]);
      setFormData(prev => ({ ...prev, experience: {} }));
    } else if (currentQuestion.id === 'projects' && formData.projects && Object.keys(formData.projects).length > 0) {
      setProjectsList(prev => [...prev, formData.projects]);
      setFormData(prev => ({ ...prev, projects: {} }));
    } else if (currentQuestion.id === 'certifications' && formData.certifications && Object.keys(formData.certifications).length > 0) {
      setCertificationsList(prev => [...prev, formData.certifications]);
      setFormData(prev => ({ ...prev, certifications: {} }));
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Show download modal
      setShowDownloadModal(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getResumeData = () => {
    return {
      ...formData,
      educationList,
      experienceList,
      projectsList,
      certificationsList,
      showCertifications
    };
  };

  const handleDownloadLatex = () => {
    const latexCode = generateLatexResume(getResumeData());
    const blob = new Blob([latexCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    const latexCode = generateLatexResume(getResumeData());
    navigator.clipboard.writeText(latexCode).then(() => {
      alert('LaTeX code copied to clipboard!');
    });
  };

  const handleOpenInOverleaf = () => {
    const latexCode = generateLatexResume(getResumeData());
    const encoded = encodeURIComponent(latexCode);
    // Overleaf's URL scheme for new documents
    const overleafUrl = `https://www.overleaf.com/docs?snip_uri=data:application/x-tex,${encoded}`;
    window.open(overleafUrl, '_blank');
  };

  const handleDownloadPdf = () => {
    downloadPdf(getResumeData());
  };

  const currentSectionData = formData[currentQuestion.id] || {};

  return (
    <div className="resume-builder">
      {/* Header */}
      <header className="builder-header">
        <div className="builder-header-content">
          <div className="builder-header-left">
            <button className="home-btn" onClick={() => navigate('/')} title="Back to home">
              ← Home
            </button>
            <div className="builder-logo">ResumeBuilder</div>
          </div>
          <div className="progress-container">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="progress-text">{currentStep + 1} of {questions.length}</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <div className="builder-content">
        <div className="container builder-grid">
          {/* Form Section */}
          <div className="form-section">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="question-card"
              >
                <h2 className="question-title">{currentQuestion.title}</h2>
                <p className="question-subtitle">{currentQuestion.subtitle}</p>

                {currentQuestion.optional && (
                  <div className="form-field">
                    <label className="field-label optional-toggle">
                      <input
                        type="checkbox"
                        checked={showCertifications}
                        onChange={(e) => setShowCertifications(e.target.checked)}
                      />
                      <span>Include this section in my resume</span>
                    </label>
                  </div>
                )}

                {(!currentQuestion.optional || showCertifications) && (
                  <div className="form-fields">
                  {currentQuestion.fields.map((field, index) => (
                    <div key={index} className="form-field">
                      <label className="field-label">
                        {field.label}
                        {field.required && <span className="required">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          className="field-input"
                          placeholder={field.placeholder}
                          rows={field.rows || 3}
                          value={currentSectionData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        />
                      ) : (
                        <input
                          type={field.type}
                          className="field-input"
                          placeholder={field.placeholder}
                          value={currentSectionData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
                )}

                <div className="button-row">
                  <button
                    className="back-btn"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                  >
                    ← Back
                  </button>
                  <div className="button-group">
                    {currentQuestion.optional && !showCertifications && (
                      <button className="skip-btn" onClick={handleNext}>
                        Skip →
                      </button>
                    )}
                    {(currentQuestion.id === 'education' || currentQuestion.id === 'experience' || currentQuestion.id === 'projects' || (currentQuestion.id === 'certifications' && showCertifications)) && (
                      <button className="add-another-btn" onClick={handleAddAnother}>
                        + Add Another
                      </button>
                    )}
                    {(!currentQuestion.optional || showCertifications) && (
                      <button className="next-btn" onClick={handleNext}>
                        {currentStep < questions.length - 1 ? 'Next →' : 'Download Resume'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Preview Section */}
          <div className="preview-section">
            <h3 className="preview-title">Live Preview</h3>
            <div className="preview-card">
              <div className="resume-preview">
                {/* Header */}
                {formData.personal && formData.personal.fullName && (
                  <div className="preview-header">
                    <h1 className="preview-name">{formData.personal.fullName || 'Your Name'}</h1>
                    <div className="preview-contact">
                      {formData.personal.phone && <span>{formData.personal.phone}</span>}
                      {formData.personal.email && <span> | {formData.personal.email}</span>}
                      {formData.personal.linkedin && <span> | {formData.personal.linkedin}</span>}
                      {formData.personal.github && <span> | {formData.personal.github}</span>}
                    </div>
                  </div>
                )}

                {/* Education */}
                {(educationList.length > 0 || (formData.education && Object.keys(formData.education).length > 0)) && (
                  <div className="preview-section-block">
                    <h3 className="preview-section-title">Education</h3>
                    {educationList.map((edu, index) => (
                      <div key={index} className="preview-section-content">
                        <div className="preview-item-header">
                          <strong>{edu.university}</strong>
                          <span className="preview-date">
                            {edu.location}
                          </span>
                        </div>
                        <div className="preview-item-subheader">
                          <span>{edu.degree}</span>
                          <span className="preview-date">
                            {edu.startDate} – {edu.endDate}
                          </span>
                        </div>
                      </div>
                    ))}
                    {/* Show current entry being edited */}
                    {formData.education && Object.keys(formData.education).length > 0 && (
                      <div className="preview-section-content">
                        <div className="preview-item-header">
                          <strong>{formData.education.university || 'University'}</strong>
                          <span className="preview-date">
                            {formData.education.location}
                          </span>
                        </div>
                        <div className="preview-item-subheader">
                          <span>{formData.education.degree || 'Degree'}</span>
                          <span className="preview-date">
                            {formData.education.startDate && `${formData.education.startDate} – ${formData.education.endDate || 'Present'}`}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Experience */}
                {(experienceList.length > 0 || (formData.experience && Object.keys(formData.experience).length > 0)) && (
                  <div className="preview-section-block">
                    <h3 className="preview-section-title">Experience</h3>
                    {experienceList.map((exp, index) => (
                      <div key={index} className="preview-section-content">
                        <div className="preview-item-header">
                          <strong>{exp.position}</strong>
                          <span className="preview-date">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        <div className="preview-item-subheader">
                          <span>{exp.company}</span>
                          <span className="preview-date">{exp.location}</span>
                        </div>
                        <div className="preview-bullets">
                          {exp.responsibilities?.split('\n').filter(line => line.trim()).map((item, i) => (
                            <div key={i}>{item.replace(/^[•\-\*]\s*/, '')}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* Show current entry being edited */}
                    {formData.experience && Object.keys(formData.experience).length > 0 && (
                      <div className="preview-section-content">
                        <div className="preview-item-header">
                          <strong>{formData.experience.position || 'Position'}</strong>
                          <span className="preview-date">
                            {formData.experience.startDate && `${formData.experience.startDate} – ${formData.experience.endDate || 'Present'}`}
                          </span>
                        </div>
                        <div className="preview-item-subheader">
                          <span>{formData.experience.company || 'Company'}</span>
                          <span className="preview-date">{formData.experience.location}</span>
                        </div>
                        {formData.experience.responsibilities && (
                          <div className="preview-bullets">
                            {formData.experience.responsibilities.split('\n').filter(line => line.trim()).map((item, i) => (
                              <div key={i}>{item.replace(/^[•\-\*]\s*/, '')}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Projects */}
                {(projectsList.length > 0 || (formData.projects && Object.keys(formData.projects).length > 0)) && (
                  <div className="preview-section-block">
                    <h3 className="preview-section-title">Projects</h3>
                    {projectsList.map((project, index) => (
                      <div key={index} className="preview-section-content">
                        <div className="preview-project-header">
                          <span className="preview-project-title">{project.projectName}</span>
                          {' | '}
                          <span className="preview-project-tech">{project.technologies}</span>
                          {(project.startDate || project.endDate) && (
                            <>
                              {' '}
                              <span className="preview-date">
                                {project.startDate} – {project.endDate}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="preview-bullets">
                          {project.description?.split('\n').filter(line => line.trim()).map((item, i) => (
                            <div key={i}>{item.replace(/^[•\-\*]\s*/, '')}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* Show current entry being edited */}
                    {formData.projects && Object.keys(formData.projects).length > 0 && (
                      <div className="preview-section-content">
                        <div className="preview-project-header">
                          <span className="preview-project-title">{formData.projects.projectName || 'Project Name'}</span>
                          {formData.projects.technologies && (
                            <>
                              {' | '}
                              <span className="preview-project-tech">{formData.projects.technologies}</span>
                            </>
                          )}
                          {(formData.projects.startDate || formData.projects.endDate) && (
                            <>
                              {' '}
                              <span className="preview-date">
                                {formData.projects.startDate} – {formData.projects.endDate}
                              </span>
                            </>
                          )}
                        </div>
                        {formData.projects.description && (
                          <div className="preview-bullets">
                            {formData.projects.description.split('\n').filter(line => line.trim()).map((item, i) => (
                              <div key={i}>{item.replace(/^[•\-\*]\s*/, '')}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Skills */}
                {formData.skills && Object.keys(formData.skills).length > 0 && (
                  <div className="preview-section-block">
                    <h3 className="preview-section-title">Technical Skills</h3>
                    <div className="preview-section-content preview-skills-content">
                      {formData.skills.languages && (
                        <div><strong>Languages:</strong> {formData.skills.languages}</div>
                      )}
                      {formData.skills.frameworks && (
                        <div><strong>Frameworks:</strong> {formData.skills.frameworks}</div>
                      )}
                      {formData.skills.tools && (
                        <div><strong>Developer Tools:</strong> {formData.skills.tools}</div>
                      )}
                      {formData.skills.databases && (
                        <div><strong>Libraries:</strong> {formData.skills.databases}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Certifications & Achievements */}
                {showCertifications && (certificationsList.length > 0 || (formData.certifications && Object.keys(formData.certifications).length > 0)) && (
                  <div className="preview-section-block">
                    <h3 className="preview-section-title">Certifications & Achievements</h3>
                    {certificationsList.map((cert, index) => (
                      <div key={index} className="preview-section-content">
                        <div className="preview-item-header">
                          <strong>{cert.name}</strong>
                          {cert.date && <span className="preview-date">{cert.date}</span>}
                        </div>
                        {cert.issuer && (
                          <div className="preview-item-subheader">
                            <span>{cert.issuer}</span>
                          </div>
                        )}
                        {cert.description && (
                          <div className="preview-bullets">
                            {cert.description.split('\n').filter(line => line.trim()).map((item, i) => (
                              <div key={i}>{item.replace(/^[•\-\*]\s*/, '')}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {/* Show current entry being edited */}
                    {formData.certifications && Object.keys(formData.certifications).length > 0 && (
                      <div className="preview-section-content">
                        <div className="preview-item-header">
                          <strong>{formData.certifications.name || 'Certification Name'}</strong>
                          {formData.certifications.date && <span className="preview-date">{formData.certifications.date}</span>}
                        </div>
                        {formData.certifications.issuer && (
                          <div className="preview-item-subheader">
                            <span>{formData.certifications.issuer}</span>
                          </div>
                        )}
                        {formData.certifications.description && (
                          <div className="preview-bullets">
                            {formData.certifications.description.split('\n').filter(line => line.trim()).map((item, i) => (
                              <div key={i}>{item.replace(/^[•\-\*]\s*/, '')}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDownloadModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">Download Your Resume</h2>
                <p className="modal-subtitle">Choose how you want to export your resume</p>
              </div>

              <div className="download-options">
                <button className="download-option" onClick={handleDownloadPdf}>
                  <span className="download-icon">📥</span>
                  <div className="download-info">
                    <div className="download-title">Download PDF</div>
                    <div className="download-desc">Get a ready-to-submit PDF file instantly</div>
                  </div>
                </button>

                <button className="download-option" onClick={handleDownloadLatex}>
                  <span className="download-icon">📄</span>
                  <div className="download-info">
                    <div className="download-title">Download LaTeX File</div>
                    <div className="download-desc">Get the .tex file to compile locally or upload to Overleaf</div>
                  </div>
                </button>

                <button className="download-option" onClick={handleOpenInOverleaf}>
                  <span className="download-icon">🚀</span>
                  <div className="download-info">
                    <div className="download-title">Open in Overleaf</div>
                    <div className="download-desc">Instantly open your resume in Overleaf to compile to PDF</div>
                  </div>
                </button>

                <button className="download-option" onClick={handleCopyToClipboard}>
                  <span className="download-icon">📋</span>
                  <div className="download-info">
                    <div className="download-title">Copy to Clipboard</div>
                    <div className="download-desc">Copy the LaTeX code to paste anywhere</div>
                  </div>
                </button>
              </div>

              <div className="modal-footer">
                <button className="modal-close-btn" onClick={() => setShowDownloadModal(false)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeBuilder;
