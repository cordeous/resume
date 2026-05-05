import { memo } from 'react';

const hasContent = (formData, educationList, experienceList, projectsList) =>
  (formData.personal && formData.personal.fullName) ||
  educationList.length > 0 || (formData.education && Object.keys(formData.education).length > 0) ||
  experienceList.length > 0 || (formData.experience && Object.keys(formData.experience).length > 0) ||
  projectsList.length > 0 || (formData.projects && Object.keys(formData.projects).length > 0) ||
  (formData.skills && Object.keys(formData.skills).length > 0);

const ResumePreviewPanel = ({
  formData,
  educationList,
  experienceList,
  projectsList,
  certificationsList,
  showProjects,
  showCertifications,
}) => {
  const showEmpty = !hasContent(formData, educationList, experienceList, projectsList);

  return (
    <aside className="preview-section" aria-label="Live resume preview">
      <h3 className="preview-title">Live Preview</h3>
      <div className="preview-card">
        {showEmpty ? (
          <div className="preview-empty" aria-live="polite">
            <div className="preview-empty-icon" aria-hidden="true">📄</div>
            <p className="preview-empty-text">
              Your resume preview will appear here as you fill in your information.
            </p>
          </div>
        ) : (
        <div className="resume-preview">
          {/* Header */}
          {formData.personal && formData.personal.fullName && (
            <div className="preview-header">
              <h1 className="preview-name">{formData.personal.fullName}</h1>
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
                    <span className="preview-date">{edu.location}</span>
                  </div>
                  <div className="preview-item-subheader">
                    <span>{edu.degree}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</span>
                    <span className="preview-date">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  {edu.coursework && (
                    <div className="preview-bullets">
                      <span><strong>Relevant Coursework:</strong> {edu.coursework}</span>
                    </div>
                  )}
                </div>
              ))}
              {formData.education && Object.keys(formData.education).length > 0 && (
                <div className="preview-section-content">
                  <div className="preview-item-header">
                    <strong>{formData.education.university || 'University'}</strong>
                    <span className="preview-date">{formData.education.location}</span>
                  </div>
                  <div className="preview-item-subheader">
                    <span>{formData.education.degree || 'Degree'}{formData.education.gpa ? ` | GPA: ${formData.education.gpa}` : ''}</span>
                    <span className="preview-date">
                      {formData.education.startDate && `${formData.education.startDate} – ${formData.education.endDate || 'Present'}`}
                    </span>
                  </div>
                  {formData.education.coursework && (
                    <div className="preview-bullets">
                      <span><strong>Relevant Coursework:</strong> {formData.education.coursework}</span>
                    </div>
                  )}
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
                    <span className="preview-date">{exp.startDate} – {exp.endDate}</span>
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
          {showProjects && (projectsList.length > 0 || (formData.projects && Object.keys(formData.projects).length > 0)) && (
            <div className="preview-section-block">
              <h3 className="preview-section-title">Projects</h3>
              {projectsList.map((project, index) => (
                <div key={index} className="preview-section-content">
                  <div className="preview-project-header">
                    <span className="preview-project-title">{project.projectName}</span>
                    {' | '}
                    <span className="preview-project-tech">{project.technologies}</span>
                    {(project.startDate || project.endDate) && (
                      <> <span className="preview-date">{project.startDate} – {project.endDate}</span></>
                    )}
                  </div>
                  <div className="preview-bullets">
                    {project.description?.split('\n').filter(line => line.trim()).map((item, i) => (
                      <div key={i}>{item.replace(/^[•\-\*]\s*/, '')}</div>
                    ))}
                  </div>
                </div>
              ))}
              {formData.projects && Object.keys(formData.projects).length > 0 && (
                <div className="preview-section-content">
                  <div className="preview-project-header">
                    <span className="preview-project-title">{formData.projects.projectName || 'Project Name'}</span>
                    {formData.projects.technologies && (
                      <>{' | '}<span className="preview-project-tech">{formData.projects.technologies}</span></>
                    )}
                    {(formData.projects.startDate || formData.projects.endDate) && (
                      <> <span className="preview-date">{formData.projects.startDate} – {formData.projects.endDate}</span></>
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
                {formData.skills.languages && <div><strong>Languages:</strong> {formData.skills.languages}</div>}
                {formData.skills.frameworks && <div><strong>Frameworks:</strong> {formData.skills.frameworks}</div>}
                {formData.skills.tools && <div><strong>Developer Tools:</strong> {formData.skills.tools}</div>}
                {formData.skills.databases && <div><strong>Libraries:</strong> {formData.skills.databases}</div>}
                {formData.skills.platforms && <div><strong>Enterprise Platforms:</strong> {formData.skills.platforms}</div>}
              </div>
            </div>
          )}

          {/* Certifications */}
          {showCertifications && (certificationsList.length > 0 || (formData.certifications && Object.keys(formData.certifications).length > 0)) && (
            <div className="preview-section-block">
              <h3 className="preview-section-title">Certifications & Achievements</h3>
              {certificationsList.map((cert, index) => (
                <div key={index} className="preview-section-content">
                  <div className="preview-item-header">
                    <strong>{cert.name}</strong>
                    {cert.date && <span className="preview-date">{cert.date}</span>}
                  </div>
                  {cert.issuer && <div className="preview-item-subheader"><span>{cert.issuer}</span></div>}
                  {cert.description && (
                    <div className="preview-bullets">
                      {cert.description.split('\n').filter(line => line.trim()).map((item, i) => (
                        <div key={i}>{item.replace(/^[•\-\*]\s*/, '')}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {formData.certifications && Object.keys(formData.certifications).length > 0 && (
                <div className="preview-section-content">
                  <div className="preview-item-header">
                    <strong>{formData.certifications.name || 'Certification Name'}</strong>
                    {formData.certifications.date && <span className="preview-date">{formData.certifications.date}</span>}
                  </div>
                  {formData.certifications.issuer && (
                    <div className="preview-item-subheader"><span>{formData.certifications.issuer}</span></div>
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
        )}
      </div>
    </aside>
  );
};

export default memo(ResumePreviewPanel);
