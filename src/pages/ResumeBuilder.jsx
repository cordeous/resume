import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { questions } from '../data/questions';
import { generateLatexResume } from '../utils/latexGenerator';
import { downloadPdf } from '../utils/pdfGenerator';
import { generateBusinessCard, downloadQRCodeImage, generateQRCode } from '../utils/qrCodeGenerator';
import LanguageSwitcher from '../components/LanguageSwitcher';
import QRPreviewModal from '../components/QRPreviewModal';
import DownloadModal from '../components/DownloadModal';
import ResumePreviewPanel from '../components/ResumePreviewPanel';
import Logo from '../components/Logo';
import { showToast } from '../components/Toast';
import './ResumeBuilder.css';

const STORAGE_KEY = 'resumebuilder_draft';

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
  const [qrPreviewType, setQrPreviewType] = useState('qr');
  const [qrCodeDataURL, setQrCodeDataURL] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorShakeKey, setErrorShakeKey] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [stepDirection, setStepDirection] = useState(1); // 1 = forward, -1 = backward

  // Load draft from localStorage on mount — hardened against corrupt/stale data
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const draft = JSON.parse(saved);
      if (!draft || typeof draft !== 'object') return;

      if (draft.formData && typeof draft.formData === 'object') setFormData(draft.formData);
      if (Array.isArray(draft.educationList)) setEducationList(draft.educationList);
      if (Array.isArray(draft.experienceList)) setExperienceList(draft.experienceList);
      if (Array.isArray(draft.projectsList)) setProjectsList(draft.projectsList);
      if (Array.isArray(draft.certificationsList)) setCertificationsList(draft.certificationsList);
      if (typeof draft.showCertifications === 'boolean') setShowCertifications(draft.showCertifications);
      // Clamp step to valid range — prevents stale index from a questions update
      if (typeof draft.currentStep === 'number') {
        setCurrentStep(Math.max(0, Math.min(draft.currentStep, questions.length - 1)));
      }
    } catch (_) {
      // Silently discard corrupt stored data — user starts fresh
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save draft to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        formData, educationList, experienceList, projectsList,
        certificationsList, showCertifications, currentStep,
      }));
    } catch (_) {
      // ignore quota errors
    }
  }, [formData, educationList, experienceList, projectsList, certificationsList, showCertifications, currentStep]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const clearDraft = () => {
    if (!window.confirm('Clear your saved draft? All entered data will be lost.')) return;
    localStorage.removeItem(STORAGE_KEY);
    setFormData({});
    setEducationList([]);
    setExperienceList([]);
    setProjectsList([]);
    setCertificationsList([]);
    setShowCertifications(false);
    setCurrentStep(0);
    setFieldErrors({});
    showToast('Draft cleared. Starting fresh.');
  };

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

  // Character limits per field type
  const CHAR_LIMITS = {
    fullName: 120,
    email: 254,
    phone: 30,
    linkedin: 200,
    github: 200,
    university: 150,
    degree: 150,
    location: 100,
    startDate: 30,
    endDate: 30,
    gpa: 20,
    coursework: 500,
    company: 150,
    position: 150,
    responsibilities: 2000,
    languages: 500,
    frameworks: 500,
    tools: 500,
    databases: 500,
    platforms: 500,
    projectName: 150,
    technologies: 500,
    description: 2000,
    name: 150,
    issuer: 150,
    date: 30,
  };

  const handleInputChange = (fieldName, value) => {
    const limit = CHAR_LIMITS[fieldName];
    const clamped = limit ? value.slice(0, limit) : value;
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        [fieldName]: clamped
      }
    }));
    // Clear error for this field on change
    setFieldErrors(prev => ({ ...prev, [fieldName]: null }));
  };

  // Per-field format validators — return an error string or null
  const formatValidators = {
    email: (v) => {
      if (!v) return null;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        ? null
        : 'Enter a valid email address (e.g. you@example.com)';
    },
    tel: (v) => {
      if (!v) return null;
      // Accept digits, spaces, dashes, parens, plus — at least 7 digits total
      const digits = v.replace(/\D/g, '');
      return digits.length >= 7 && digits.length <= 15
        ? null
        : 'Enter a valid phone number';
    },
    url: (v) => {
      if (!v) return null;
      try {
        const u = v.startsWith('http') ? v : `https://${v}`;
        new URL(u);
        return null;
      } catch {
        return 'Enter a valid URL (e.g. linkedin.com/in/yourname)';
      }
    },
  };

  // Validate required + format for the current step
  const validateCurrentStep = () => {
    const sectionData = formData[currentQuestion.id] || {};
    const errors = {};
    let hasError = false;

    for (const field of currentQuestion.fields) {
      const value = sectionData[field.name];
      const strVal = value ? String(value).trim() : '';

      // Required check
      if (field.required && !strVal) {
        errors[field.name] = 'This field is required';
        hasError = true;
        continue;
      }

      // Format check for non-empty optional/required fields
      if (strVal && formatValidators[field.type]) {
        const formatError = formatValidators[field.type](strVal);
        if (formatError) {
          errors[field.name] = formatError;
          hasError = true;
        }
      }
    }

    setFieldErrors(errors);

    if (hasError) {
      setErrorShakeKey(k => k + 1); // re-trigger shake animation
      showToast('Please fix the highlighted fields before continuing.', 'error');
    }

    return !hasError;
  };

  const sortExperience = (list) => {
    return [...list].sort((a, b) => {
      const aPresent = !a.endDate || a.endDate.toLowerCase() === 'present' || a.endDate === '';
      const bPresent = !b.endDate || b.endDate.toLowerCase() === 'present' || b.endDate === '';
      if (aPresent && !bPresent) return -1;
      if (!aPresent && bPresent) return 1;
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
      const entryToEdit = experienceList[index];
      if (formData.experience && Object.keys(formData.experience).length > 0 && editingExperienceIndex === null) {
        // Save unsaved form data first, then find the target entry's new index after sort
        const newList = sortExperience([...experienceList, formData.experience]);
        const newIndex = newList.indexOf(entryToEdit);
        setExperienceList(newList);
        setFormData(prev => ({ ...prev, experience: entryToEdit }));
        setEditingExperienceIndex(newIndex);
      } else {
        setFormData(prev => ({ ...prev, experience: entryToEdit }));
        setEditingExperienceIndex(index);
      }
    } else if (sectionId === 'education') {
      const entryToEdit = educationList[index];
      if (formData.education && Object.keys(formData.education).length > 0 && editingEducationIndex === null) {
        const newList = [...educationList, formData.education];
        const newIndex = newList.indexOf(entryToEdit);
        setEducationList(newList);
        setFormData(prev => ({ ...prev, education: entryToEdit }));
        setEditingEducationIndex(newIndex);
      } else {
        setFormData(prev => ({ ...prev, education: entryToEdit }));
        setEditingEducationIndex(index);
      }
    } else if (sectionId === 'projects') {
      const entryToEdit = projectsList[index];
      if (formData.projects && Object.keys(formData.projects).length > 0 && editingProjectIndex === null) {
        const newList = [...projectsList, formData.projects];
        const newIndex = newList.indexOf(entryToEdit);
        setProjectsList(newList);
        setFormData(prev => ({ ...prev, projects: entryToEdit }));
        setEditingProjectIndex(newIndex);
      } else {
        setFormData(prev => ({ ...prev, projects: entryToEdit }));
        setEditingProjectIndex(index);
      }
    } else if (sectionId === 'certifications') {
      const entryToEdit = certificationsList[index];
      if (formData.certifications && Object.keys(formData.certifications).length > 0 && editingCertIndex === null) {
        const newList = [...certificationsList, formData.certifications];
        const newIndex = newList.indexOf(entryToEdit);
        setCertificationsList(newList);
        setFormData(prev => ({ ...prev, certifications: entryToEdit }));
        setEditingCertIndex(newIndex);
      } else {
        setFormData(prev => ({ ...prev, certifications: entryToEdit }));
        setEditingCertIndex(index);
      }
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
    // Skip validation for optional sections that are hidden
    const isOptionalAndHidden = currentQuestion.optional && !showCertifications;
    if (!isOptionalAndHidden && !validateCurrentStep()) return;

    saveCurrentEntry(currentQuestion.id);

    if (currentStep < questions.length - 1) {
      setFieldErrors({});
      setStepDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      setShowDownloadModal(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setFieldErrors({});
      setStepDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const getResumeData = () => ({
    ...formData,
    educationList,
    experienceList,
    projectsList,
    certificationsList,
    showCertifications
  });

  const withDownloadGuard = (fn) => async (...args) => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await fn(...args);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadLatex = withDownloadGuard(() => {
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
    showToast('LaTeX file downloaded!');
  });

  const handleCopyToClipboard = withDownloadGuard(async () => {
    const latexCode = generateLatexResume(getResumeData());
    try {
      await navigator.clipboard.writeText(latexCode);
      showToast('LaTeX code copied to clipboard!');
    } catch {
      showToast('Failed to copy. Please try again.', 'error');
    }
  });

  const handleOpenInOverleaf = withDownloadGuard(() => {
    const latexCode = generateLatexResume(getResumeData());
    const encoded = encodeURIComponent(latexCode);
    const overleafUrl = `https://www.overleaf.com/docs?snip_uri=data:application/x-tex,${encoded}`;
    window.open(overleafUrl, '_blank');
  });

  const handleDownloadPdf = withDownloadGuard(async () => {
    await downloadPdf(getResumeData());
    showToast('PDF downloaded!');
  });

  const handleDownloadQRCode = withDownloadGuard(async () => {
    try {
      const qrDataURL = await generateQRCode(formData.personal);
      setQrCodeDataURL(qrDataURL);
      setQrPreviewType('qr');
      setShowQRPreview(true);
    } catch (error) {
      showToast('Error generating QR Code. Please try again.', 'error');
      console.error(error);
    }
  });

  const handleDownloadBusinessCard = withDownloadGuard(async () => {
    try {
      const qrDataURL = await generateQRCode(formData.personal);
      setQrCodeDataURL(qrDataURL);
      setQrPreviewType('card');
      setShowQRPreview(true);
    } catch (error) {
      showToast('Error generating business card. Please try again.', 'error');
      console.error(error);
    }
  });

  const handleActualDownload = withDownloadGuard(async () => {
    try {
      if (qrPreviewType === 'qr') {
        await downloadQRCodeImage(formData.personal);
      } else {
        await generateBusinessCard(formData.personal);
      }
    } catch (error) {
      showToast('Download failed. Please try again.', 'error');
      console.error('Download error:', error);
    }
  });

  const currentSectionData = formData[currentQuestion.id] || {};

  return (
    <div className="resume-builder">
      <a href="#builder-main" className="skip-link">Skip to main content</a>

      {/* Header */}
      <header className="builder-header" role="banner">
        <div className="builder-header-content">
          <div className="builder-header-left">
            <button className="home-btn" onClick={() => navigate('/')} aria-label="Back to home">
              ← Home
            </button>
            <div className="builder-logo"><Logo size="small" /></div>
          </div>
          <div className="progress-container" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={questions.length} aria-label={`Step ${currentStep + 1} of ${questions.length}`}>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="progress-text">{currentStep + 1} of {questions.length}</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main id="builder-main" className="builder-content">
        <div className="container builder-grid">
          {/* Form Section */}
          <div className="form-section">
            <AnimatePresence mode="wait" custom={stepDirection}>
              <motion.div
                key={currentStep}
                custom={stepDirection}
                initial={(dir) => ({ opacity: 0, x: dir * 28 })}
                animate={{ opacity: 1, x: 0 }}
                exit={(dir) => ({ opacity: 0, x: dir * -20 })}
                transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
                className="question-card"
              >
                <div className="draft-actions">
                  <button className="clear-draft-btn" onClick={clearDraft} type="button">
                    Clear draft
                  </button>
                </div>
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
                        <div className="saved-entries-list" role="list" aria-label={`Saved ${sectionId} entries`}>
                          <AnimatePresence initial={false}>
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
                              <motion.div
                                key={`${sectionId}-${label}-${i}`}
                                layout
                                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -16, scale: 0.97 }}
                                transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                                className={`saved-entry-item${editingIndex === i ? ' editing' : ''}`}
                                role="listitem"
                              >
                                <div className="saved-entry-info">
                                  <span className="saved-entry-label">{label}</span>
                                  {sublabel && <span className="saved-entry-sublabel">{sublabel}</span>}
                                </div>
                                <div className="saved-entry-actions">
                                  <button
                                    className="entry-action-btn move-btn"
                                    onClick={() => handleMoveEntry(sectionId, i, -1)}
                                    disabled={i === 0}
                                    aria-label={`Move ${label} up`}
                                  >↑</button>
                                  <button
                                    className="entry-action-btn move-btn"
                                    onClick={() => handleMoveEntry(sectionId, i, 1)}
                                    disabled={i === savedList.length - 1}
                                    aria-label={`Move ${label} down`}
                                  >↓</button>
                                  <button
                                    className="entry-action-btn edit-btn"
                                    onClick={() => handleEditEntry(sectionId, i)}
                                    aria-label={`Edit ${label}`}
                                    aria-pressed={editingIndex === i}
                                  >{editingIndex === i ? '✏️' : 'Edit'}</button>
                                  <button
                                    className="entry-action-btn delete-btn"
                                    onClick={() => handleDeleteEntry(sectionId, i)}
                                    aria-label={`Delete ${label}`}
                                  >✕</button>
                                </div>
                              </motion.div>
                            );
                          })}
                          </AnimatePresence>
                        </div>
                      )}

                      <div className="form-fields">
                        {savedList && savedList.length > 0 && (
                          <div className="new-entry-heading" aria-live="polite">
                            {editingIndex !== null ? `Editing entry ${editingIndex + 1}` : 'New entry'}
                          </div>
                        )}
                        {currentQuestion.fields.map((field, index) => {
                          const icon = getFieldIcon(field.name);
                          const errorMsg = fieldErrors[field.name];
                          const inputId = `field-${currentQuestion.id}-${field.name}`;
                          const errorId = `${inputId}-error`;
                          const countId = `${inputId}-count`;
                          const limit = CHAR_LIMITS[field.name];
                          const currentLen = (currentSectionData[field.name] || '').length;
                          const nearLimit = limit && currentLen >= Math.floor(limit * 0.85);
                          const atLimit = limit && currentLen >= limit;
                          const describedBy = [errorMsg ? errorId : null, limit ? countId : null].filter(Boolean).join(' ') || undefined;

                          return (
                            <div key={index} className="form-field">
                              <label className="field-label" htmlFor={inputId}>
                                {field.label}
                                {field.required && <span className="required" aria-hidden="true">*</span>}
                              </label>
                              {field.type === 'textarea' ? (
                                <textarea
                                  key={errorMsg ? errorShakeKey : undefined}
                                  id={inputId}
                                  className={`field-input${errorMsg ? ' field-input--error' : ''}`}
                                  placeholder={field.placeholder}
                                  rows={field.rows || 3}
                                  value={currentSectionData[field.name] || ''}
                                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  aria-required={field.required}
                                  aria-invalid={!!errorMsg || undefined}
                                  aria-describedby={describedBy}
                                  maxLength={limit || undefined}
                                />
                              ) : (
                                <div className={`input-wrapper ${icon ? 'with-icon' : ''}`}>
                                  {icon && <span className="input-icon" aria-hidden="true">{icon}</span>}
                                  <input
                                    key={errorMsg ? errorShakeKey : undefined}
                                    id={inputId}
                                    type={field.type}
                                    className={`field-input${errorMsg ? ' field-input--error' : ''}`}
                                    placeholder={field.placeholder}
                                    value={currentSectionData[field.name] || ''}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                    aria-required={field.required}
                                    aria-invalid={!!errorMsg || undefined}
                                    aria-describedby={describedBy}
                                    maxLength={limit || undefined}
                                    autoComplete={field.name === 'email' ? 'email' : field.name === 'fullName' ? 'name' : field.name === 'phone' ? 'tel' : undefined}
                                  />
                                </div>
                              )}
                              <div className="field-footer">
                                {errorMsg && (
                                  <span id={errorId} className="field-error" role="alert">
                                    {errorMsg}
                                  </span>
                                )}
                                {limit && (nearLimit || atLimit) && (
                                  <span
                                    id={countId}
                                    className={`char-count${atLimit ? ' char-count--limit' : nearLimit ? ' char-count--warn' : ''}`}
                                    aria-live="polite"
                                  >
                                    {currentLen}/{limit}
                                  </span>
                                )}
                              </div>
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
                    aria-label={currentStep === 0 ? 'No previous step' : 'Go back to previous step'}
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
                      <button
                        className="next-btn"
                        onClick={handleNext}
                        disabled={isDownloading}
                        aria-busy={isDownloading}
                      >
                        {currentStep < questions.length - 1 ? 'Next →' : (isDownloading ? 'Preparing…' : 'Download Resume')}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Preview Section */}
          <ResumePreviewPanel
            formData={formData}
            educationList={educationList}
            experienceList={experienceList}
            projectsList={projectsList}
            certificationsList={certificationsList}
            showCertifications={showCertifications}
          />
        </div>
      </main>

      {/* Download Modal */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        onDownloadPdf={handleDownloadPdf}
        onDownloadLatex={handleDownloadLatex}
        onOpenInOverleaf={handleOpenInOverleaf}
        onCopyToClipboard={handleCopyToClipboard}
        onDownloadQRCode={handleDownloadQRCode}
        onDownloadBusinessCard={handleDownloadBusinessCard}
      />

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
