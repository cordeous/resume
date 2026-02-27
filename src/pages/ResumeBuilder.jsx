import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaPhone, FaEnvelope, FaGlobe, FaQrcode } from 'react-icons/fa';
import { questions } from '../data/questions';
import { generateLatexResume } from '../utils/latexGenerator';
import { downloadPdf } from '../utils/pdfGenerator';
import { generateBusinessCard, downloadQRCodeImage, generateQRCode } from '../utils/qrCodeGenerator';
import LanguageSwitcher from '../components/LanguageSwitcher';
import QRPreviewModal from '../components/QRPreviewModal';
import Logo from '../components/Logo';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [certificationsList, setCertificationsList] = useState([]);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingCertIndex, setEditingCertIndex] = useState(null);
  const [showCertifications, setShowCertifications] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showQRPreview, setShowQRPreview] = useState(false);
  const [qrPreviewType, setQrPreviewType] = useState('qr'); // 'qr' or 'card'
  const [qrCodeDataURL, setQrCodeDataURL] = useState(null);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  // Get icon for social/contact fields
  const getFieldIcon = (fieldName) => {
    const icons = {
      phone: <FaPhone />,
      email: <FaEnvelope />,
      linkedin: <FaLinkedin />,
      github: <FaGithub />,
      website: <FaGlobe />
    };
    return icons[fieldName] || null;
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        [fieldName]: value
      }
    }));
  };

  // Sort experience: Present/active jobs first, then by most recent start date
  const sortExperience = (list) => {
    return [...list].sort((a, b) => {
      const aPresent = !a.endDate || a.endDate.toLowerCase() === 'present' || a.endDate === '';
      const bPresent = !b.endDate || b.endDate.toLowerCase() === 'present' || b.endDate === '';
      if (aPresent && !bPresent) return -1;
      if (!aPresent && bPresent) return 1;
      // Both present or both not present: sort by startDate descending
      return (b.startDate || '').localeCompare(a.startDate || '');
    });
  };

  const saveCurrentEntry = (sectionId) => {
    if (sectionId === 'education' && formData.education && Object.keys(formData.education).length > 0) {
      if (editingEducationIndex !== null) {
        setEducationList(prev => prev.map((e, i) => i === editingEducationIndex ? formData.education : e));
        setEditingEducationIndex(null);
      } else {
        setEducationList(prev => [...prev, formData.education]);
      }
      setFormData(prev => ({ ...prev, education: {} }));
    } else if (sectionId === 'experience' && formData.experience && Object.keys(formData.experience).length > 0) {
      if (editingExperienceIndex !== null) {
        setExperienceList(prev => sortExperience(prev.map((e, i) => i === editingExperienceIndex ? formData.experience : e)));
        setEditingExperienceIndex(null);
      } else {
        setExperienceList(prev => sortExperience([...prev, formData.experience]));
      }
      setFormData(prev => ({ ...prev, experience: {} }));
    } else if (sectionId === 'projects' && formData.projects && Object.keys(formData.projects).length > 0) {
      if (editingProjectIndex !== null) {
        setProjectsList(prev => prev.map((e, i) => i === editingProjectIndex ? formData.projects : e));
        setEditingProjectIndex(null);
      } else {
        setProjectsList(prev => [...prev, formData.projects]);
      }
      setFormData(prev => ({ ...prev, projects: {} }));
    } else if (sectionId === 'certifications' && formData.certifications && Object.keys(formData.certifications).length > 0) {
      if (editingCertIndex !== null) {
        setCertificationsList(prev => prev.map((e, i) => i === editingCertIndex ? formData.certifications : e));
        setEditingCertIndex(null);
      } else {
        setCertificationsList(prev => [...prev, formData.certifications]);
      }
      setFormData(prev => ({ ...prev, certifications: {} }));
    }
  };

  const handleAddAnother = () => {
    saveCurrentEntry(currentQuestion.id);
  };

  const handleEditEntry = (sectionId, index) => {
    if (sectionId === 'experience') {
      // Save current draft if any
      if (formData.experience && Object.keys(formData.experience).length > 0 && editingExperienceIndex === null) {
        setExperienceList(prev => sortExperience([...prev, formData.experience]));
      }
      setFormData(prev => ({ ...prev, experience: experienceList[index] }));
      setEditingExperienceIndex(index);
    } else if (sectionId === 'education') {
      if (formData.education && Object.keys(formData.education).length > 0 && editingEducationIndex === null) {
        setEducationList(prev => [...prev, formData.education]);
      }
      setFormData(prev => ({ ...prev, education: educationList[index] }));
      setEditingEducationIndex(index);
    } else if (sectionId === 'projects') {
      if (formData.projects && Object.keys(formData.projects).length > 0 && editingProjectIndex === null) {
        setProjectsList(prev => [...prev, formData.projects]);
      }
      setFormData(prev => ({ ...prev, projects: projectsList[index] }));
      setEditingProjectIndex(index);
    } else if (sectionId === 'certifications') {
      if (formData.certifications && Object.keys(formData.certifications).length > 0 && editingCertIndex === null) {
        setCertificationsList(prev => [...prev, formData.certifications]);
      }
      setFormData(prev => ({ ...prev, certifications: certificationsList[index] }));
      setEditingCertIndex(index);
    }
  };

  const handleDeleteEntry = (sectionId, index) => {
    if (sectionId === 'experience') {
      setExperienceList(prev => prev.filter((_, i) => i !== index));
      if (editingExperienceIndex === index) {
        setEditingExperienceIndex(null);
        setFormData(prev => ({ ...prev, experience: {} }));
      } else if (editingExperienceIndex > index) {
        setEditingExperienceIndex(prev => prev - 1);
      }
    } else if (sectionId === 'education') {
      setEducationList(prev => prev.filter((_, i) => i !== index));
      if (editingEducationIndex === index) {
        setEditingEducationIndex(null);
        setFormData(prev => ({ ...prev, education: {} }));
      } else if (editingEducationIndex > index) {
        setEditingEducationIndex(prev => prev - 1);
      }
    } else if (sectionId === 'projects') {
      setProjectsList(prev => prev.filter((_, i) => i !== index));
      if (editingProjectIndex === index) {
        setEditingProjectIndex(null);
        setFormData(prev => ({ ...prev, projects: {} }));
      } else if (editingProjectIndex > index) {
        setEditingProjectIndex(prev => prev - 1);
      }
    } else if (sectionId === 'certifications') {
      setCertificationsList(prev => prev.filter((_, i) => i !== index));
      if (editingCertIndex === index) {
        setEditingCertIndex(null);
        setFormData(prev => ({ ...prev, certifications: {} }));
      } else if (editingCertIndex > index) {
        setEditingCertIndex(prev => prev - 1);
      }
    }
  };

  const handleMoveEntry = (sectionId, index, direction) => {
    const move = (list, setList) => {
      const newList = [...list];
      const target = index + direction;
      if (target < 0 || target >= newList.length) return;
      [newList[index], newList[target]] = [newList[target], newList[index]];
      setList(newList);
    };
    if (sectionId === 'experience') move(experienceList, setExperienceList);
    else if (sectionId === 'education') move(educationList, setEducationList);
    else if (sectionId === 'projects') move(projectsList, setProjectsList);
    else if (sectionId === 'certifications') move(certificationsList, setCertificationsList);
  };

  const handleNext = () => {
    saveCurrentEntry(currentQuestion.id);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
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

  const handleDownloadQRCode = async () => {
    try {
      const qrDataURL = await generateQRCode(formData.personal);
      setQrCodeDataURL(qrDataURL);
      setQrPreviewType('qr');
      setShowQRPreview(true);
    } catch (error) {
      alert('Error generating QR Code. Please try again.');
      console.error(error);
    }
  };

  const handleDownloadBusinessCard = async () => {
    try {
      const qrDataURL = await generateQRCode(formData.personal);
      setQrCodeDataURL(qrDataURL);
      setQrPreviewType('card');
      setShowQRPreview(true);
    } catch (error) {
      alert('Error generating business card. Please try again.');
      console.error(error);
    }
  };

  const handleActualDownload = async () => {
    try {
      if (qrPreviewType === 'qr') {
        await downloadQRCodeImage(formData.personal);
      } else {
        await generateBusinessCard(formData.personal);
      }
    } catch (error) {
      console.error('Download error:', error);
    }
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
            <div className="builder-logo"><Logo size="small" /></div>
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

                {(!currentQuestion.optional || showCertifications) && (() => {
                  const sectionId = currentQuestion.id;
                  const savedList =
                    sectionId === 'experience' ? experienceList :
                    sectionId === 'education' ? educationList :
                    sectionId === 'projects' ? projectsList :
                    sectionId === 'certifications' ? certificationsList : null;
                  const editingIndex =
                    sectionId === 'experience' ? editingExperienceIndex :
                    sectionId === 'education' ? editingEducationIndex :
                    sectionId === 'projects' ? editingProjectIndex :
                    sectionId === 'certifications' ? editingCertIndex : null;

                  return (
                    <>
                      {savedList && savedList.length > 0 && (
                        <div className="saved-entries-list">
                          {savedList.map((entry, i) => {
                            const label =
                              sectionId === 'experience' ? (entry.position || entry.company || `Entry ${i + 1}`) :
                              sectionId === 'education' ? (entry.university || entry.degree || `Entry ${i + 1}`) :
                              sectionId === 'projects' ? (entry.projectName || `Entry ${i + 1}`) :
                              (entry.name || `Entry ${i + 1}`);
                            const sublabel =
                              sectionId === 'experience' ? (entry.company || '') :
                              sectionId === 'education' ? (entry.degree || '') :
                              sectionId === 'projects' ? (entry.technologies || '') :
                              (entry.issuer || '');
                            return (
                              <div key={i} className={`saved-entry-item${editingIndex === i ? ' editing' : ''}`}>
                                <div className="saved-entry-info">
                                  <span className="saved-entry-label">{label}</span>
                                  {sublabel && <span className="saved-entry-sublabel">{sublabel}</span>}
                                </div>
                                <div className="saved-entry-actions">
                                  <button
                                    className="entry-action-btn move-btn"
                                    onClick={() => handleMoveEntry(sectionId, i, -1)}
                                    disabled={i === 0}
                                    title="Move up"
                                  >↑</button>
                                  <button
                                    className="entry-action-btn move-btn"
                                    onClick={() => handleMoveEntry(sectionId, i, 1)}
                                    disabled={i === savedList.length - 1}
                                    title="Move down"
                                  >↓</button>
                                  <button
                                    className="entry-action-btn edit-btn"
                                    onClick={() => handleEditEntry(sectionId, i)}
                                    title="Edit"
                                  >{editingIndex === i ? '✏️' : 'Edit'}</button>
                                  <button
                                    className="entry-action-btn delete-btn"
                                    onClick={() => handleDeleteEntry(sectionId, i)}
                                    title="Delete"
                                  >✕</button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="form-fields">
                        {savedList && savedList.length > 0 && (
                          <div className="new-entry-heading">
                            {editingIndex !== null ? `Editing entry ${editingIndex + 1}` : 'New entry'}
                          </div>
                        )}
                        {currentQuestion.fields.map((field, index) => {
                          const icon = getFieldIcon(field.name);
                          return (
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
                                <div className={`input-wrapper ${icon ? 'with-icon' : ''}`}>
                                  {icon && <span className="input-icon">{icon}</span>}
                                  <input
                                    type={field.type}
                                    className="field-input"
                                    placeholder={field.placeholder}
                                    value={currentSectionData[field.name] || ''}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}

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

                <button className="download-option" onClick={handleDownloadQRCode}>
                  <span className="download-icon"><FaQrcode size={24} /></span>
                  <div className="download-info">
                    <div className="download-title">Download QR Code</div>
                    <div className="download-desc">Get a QR code with your contact information</div>
                  </div>
                </button>

                <button className="download-option" onClick={handleDownloadBusinessCard}>
                  <span className="download-icon">💼</span>
                  <div className="download-info">
                    <div className="download-title">Business Card PDF</div>
                    <div className="download-desc">Generate a printable business card with QR code</div>
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

      {/* QR Code Preview Modal */}
      <QRPreviewModal
        isOpen={showQRPreview}
        onClose={() => setShowQRPreview(false)}
        type={qrPreviewType}
        qrCodeDataURL={qrCodeDataURL}
        personalInfo={formData.personal}
        onDownload={handleActualDownload}
      />
    </div>
  );
};

export default ResumeBuilder;
