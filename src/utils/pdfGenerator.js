/** Ensure a value is a safe non-empty string for jsPDF text calls */
const safe = (v) => (v != null && String(v).trim() ? String(v).trim() : '');

export const generatePdfResume = async (data) => {
  const { jsPDF } = await import('jspdf');
  const { personal, education, educationList, experienceList, skills, projectsList, certificationsList, showProjects, showCertifications } = data || {};

  // Create new PDF document (Letter size: 8.5" x 11")
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter'
  });

  let yPos = 0.65; // Start position from top (in inches)
  const leftMargin = 0.65;
  const rightMargin = 7.85; // 8.5 - 0.65
  const pageWidth = 8.5;
  const lineHeight = 0.175;   // space between lines within a block
  const sectionGap = 0.22;   // space between sections
  const entryGap = 0.18;     // space between entries within a section
  const bulletIndent = 0.22; // bullet left indent
  const bulletText = 0.38;   // bullet text start

  // Helper function to add text
  const addText = (text, x, y, options = {}) => {
    const {
      size = 11,
      font = 'times',
      style = 'normal',
      align = 'left',
      maxWidth = rightMargin - leftMargin
    } = options;

    doc.setFont(font, style);
    doc.setFontSize(size);
    doc.text(text, x, y, { align, maxWidth });
  };

  // Header - Name
  if (personal?.fullName) {
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    const safeName = safe(personal.fullName).toUpperCase() || 'YOUR NAME';
    doc.text(safeName, pageWidth / 2, yPos, { align: 'center' });
    yPos += 0.28;

    // Contact Info — only include non-empty fields
    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    const contactParts = [personal.phone, personal.email, personal.linkedin, personal.github]
      .map(safe)
      .filter(Boolean);
    if (contactParts.length > 0) {
      const contactInfo = contactParts.join(' | ');
      const wrapped = doc.splitTextToSize(contactInfo, rightMargin - leftMargin);
      wrapped.forEach(line => {
        doc.text(line, pageWidth / 2, yPos, { align: 'center' });
        yPos += lineHeight;
      });
      yPos += 0.1;
    } else {
      yPos += 0.1;
    }
  }

  // Education Section - support both educationList and single education
  const educationEntries = educationList && educationList.length > 0 ? educationList : (education && Object.keys(education).length > 0 ? [education] : []);
  if (educationEntries.length > 0) {
    // Section header with line
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('EDUCATION', leftMargin, yPos);
    doc.setLineWidth(0.01);
    doc.line(leftMargin, yPos + 0.05, rightMargin, yPos + 0.05);
    yPos += 0.18;

    educationEntries.forEach((edu, index) => {
      // University name and location
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      if (safe(edu.university)) doc.text(safe(edu.university), leftMargin, yPos);
      doc.setFont('times', 'italic');
      if (safe(edu.location)) doc.text(safe(edu.location), rightMargin, yPos, { align: 'right' });
      yPos += lineHeight;

      // Degree (with GPA inline) and dates
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      const degreeText = safe(edu.degree) + (safe(edu.gpa) ? ` | GPA: ${safe(edu.gpa)}` : '');
      if (degreeText) doc.text(degreeText, leftMargin, yPos);
      const dateRange = [safe(edu.startDate), safe(edu.endDate)].filter(Boolean).join(' – ');
      if (dateRange) doc.text(dateRange, rightMargin, yPos, { align: 'right' });
      yPos += lineHeight;

      // Relevant Coursework
      if (safe(edu.coursework)) {
        doc.setFont('times', 'normal');
        doc.setFontSize(10);
        const label = 'Relevant Coursework: ';
        const labelWidth = doc.getTextWidth(label);
        doc.setFont('times', 'bold');
        doc.text(label, leftMargin, yPos);
        doc.setFont('times', 'normal');
        const wrapped = doc.splitTextToSize(safe(edu.coursework), rightMargin - leftMargin - labelWidth);
        wrapped.forEach((line, i) => {
          doc.text(line, i === 0 ? leftMargin + labelWidth : leftMargin, yPos);
          if (i < wrapped.length - 1) yPos += lineHeight;
        });
        yPos += lineHeight;
      }

      if (index < educationEntries.length - 1) yPos += entryGap;
    });

    yPos += sectionGap;
  }

  // Experience Section
  if (experienceList && experienceList.length > 0) {
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('EXPERIENCE', leftMargin, yPos);
    doc.setLineWidth(0.01);
    doc.line(leftMargin, yPos + 0.05, rightMargin, yPos + 0.05);
    yPos += 0.18;

    experienceList.forEach((exp, index) => {
      // Check if we need a new page
      if (yPos > 10) {
        doc.addPage();
        yPos = 0.7;
      }

      // Position and dates
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      if (safe(exp.position)) doc.text(safe(exp.position), leftMargin, yPos);
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      const expDateRange = [safe(exp.startDate), safe(exp.endDate)].filter(Boolean).join(' – ');
      if (expDateRange) doc.text(expDateRange, rightMargin, yPos, { align: 'right' });
      yPos += lineHeight;

      // Company and location
      doc.setFont('times', 'italic');
      if (safe(exp.company)) doc.text(safe(exp.company), leftMargin, yPos);
      if (safe(exp.location)) doc.text(safe(exp.location), rightMargin, yPos, { align: 'right' });
      yPos += lineHeight;

      // Responsibilities (bullets)
      if (exp.responsibilities) {
        const bullets = exp.responsibilities.split('\n').filter(line => line.trim());
        doc.setFont('times', 'normal');
        doc.setFontSize(10);

        bullets.forEach(bullet => {
          const cleanBullet = bullet.replace(/^[•\-\*]\s*/, '');
          const lines = doc.splitTextToSize(cleanBullet, rightMargin - leftMargin - bulletText);

          lines.forEach((line, lineIndex) => {
            if (lineIndex === 0) {
              doc.text('•', leftMargin + bulletIndent, yPos);
              doc.text(line, leftMargin + bulletText, yPos);
            } else {
              doc.text(line, leftMargin + bulletText, yPos);
            }
            yPos += lineHeight;
          });
        });
      }

      yPos += entryGap;
    });
    yPos += sectionGap - entryGap; // net section gap after last entry
  }

  // Projects Section
  if (showProjects && projectsList && projectsList.length > 0) {
    // Check if we need a new page
    if (yPos > 9.5) {
      doc.addPage();
      yPos = 0.7;
    }

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('PROJECTS', leftMargin, yPos);
    doc.setLineWidth(0.01);
    doc.line(leftMargin, yPos + 0.05, rightMargin, yPos + 0.05);
    yPos += 0.18;

    projectsList.forEach((project) => {
      // Check if we need a new page
      if (yPos > 10) {
        doc.addPage();
        yPos = 0.7;
      }

      // Project name and technologies
      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      const projectName = safe(project.projectName) || 'Project';
      const projectHeader = `${projectName} | `;
      const headerWidth = doc.getTextWidth(projectHeader);

      doc.text(projectHeader, leftMargin, yPos);
      doc.setFont('times', 'italic');
      if (safe(project.technologies)) doc.text(safe(project.technologies), leftMargin + headerWidth, yPos);

      const projDateRange = [safe(project.startDate), safe(project.endDate)].filter(Boolean).join(' – ');
      if (projDateRange) {
        doc.text(projDateRange, rightMargin, yPos, { align: 'right' });
      }
      yPos += lineHeight;

      // Project description (bullets)
      if (project.description) {
        const bullets = project.description.split('\n').filter(line => line.trim());
        doc.setFont('times', 'normal');
        doc.setFontSize(10);

        bullets.forEach(bullet => {
          const cleanBullet = bullet.replace(/^[•\-\*]\s*/, '');
          const lines = doc.splitTextToSize(cleanBullet, rightMargin - leftMargin - bulletText);

          lines.forEach((line, lineIndex) => {
            if (lineIndex === 0) {
              doc.text('•', leftMargin + bulletIndent, yPos);
              doc.text(line, leftMargin + bulletText, yPos);
            } else {
              doc.text(line, leftMargin + bulletText, yPos);
            }
            yPos += lineHeight;
          });
        });
      }

      yPos += entryGap;
    });
    yPos += sectionGap - entryGap;
  }

  // Technical Skills Section
  if (skills && Object.keys(skills).length > 0) {
    // Check if we need a new page
    if (yPos > 9.5) {
      doc.addPage();
      yPos = 0.7;
    }

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('TECHNICAL SKILLS', leftMargin, yPos);
    doc.setLineWidth(0.01);
    doc.line(leftMargin, yPos + 0.05, rightMargin, yPos + 0.05);
    yPos += 0.18;

    doc.setFont('times', 'normal');
    doc.setFontSize(10);

    const skillLines = [];
    if (skills.languages) skillLines.push(`Languages: ${skills.languages}`);
    if (skills.frameworks) skillLines.push(`Frameworks: ${skills.frameworks}`);
    if (skills.tools) skillLines.push(`Developer Tools: ${skills.tools}`);
    if (skills.databases) skillLines.push(`Libraries: ${skills.databases}`);
    if (skills.platforms) skillLines.push(`Enterprise Platforms: ${skills.platforms}`);

    skillLines.forEach(line => {
      const [label, value] = line.split(': ');
      doc.setFont('times', 'bold');
      const labelWidth = doc.getTextWidth(label + ': ');
      doc.text(label + ': ', leftMargin, yPos);
      doc.setFont('times', 'normal');

      const wrappedText = doc.splitTextToSize(value, rightMargin - leftMargin - labelWidth);
      wrappedText.forEach((textLine, index) => {
        if (index === 0) {
          doc.text(textLine, leftMargin + labelWidth, yPos);
        } else {
          yPos += lineHeight;
          doc.text(textLine, leftMargin, yPos);
        }
      });
      yPos += lineHeight;
    });
    yPos += sectionGap - lineHeight;
  }

  // Certifications & Achievements Section
  if (showCertifications && certificationsList && certificationsList.length > 0) {
    // Check if we need a new page
    if (yPos > 9.5) {
      doc.addPage();
      yPos = 0.7;
    }

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('CERTIFICATIONS & ACHIEVEMENTS', leftMargin, yPos);
    doc.setLineWidth(0.01);
    doc.line(leftMargin, yPos + 0.05, rightMargin, yPos + 0.05);
    yPos += 0.18;

    certificationsList.forEach((cert, index) => {
      // Check if we need a new page
      if (yPos > 10) {
        doc.addPage();
        yPos = 0.7;
      }

      // Certification name and date
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      if (safe(cert.name)) doc.text(safe(cert.name), leftMargin, yPos);
      if (safe(cert.date)) {
        doc.setFont('times', 'italic');
        doc.setFontSize(10);
        doc.text(safe(cert.date), rightMargin, yPos, { align: 'right' });
      }
      yPos += lineHeight;

      // Issuer
      if (safe(cert.issuer)) {
        doc.setFont('times', 'italic');
        doc.setFontSize(10);
        doc.text(safe(cert.issuer), leftMargin, yPos);
        yPos += lineHeight;
      }

      // Description (bullets)
      if (cert.description) {
        const bullets = cert.description.split('\n').filter(line => line.trim());
        doc.setFont('times', 'normal');
        doc.setFontSize(10);

        bullets.forEach(bullet => {
          const cleanBullet = bullet.replace(/^[•\-\*]\s*/, '');
          const lines = doc.splitTextToSize(cleanBullet, rightMargin - leftMargin - bulletText);

          lines.forEach((line, lineIndex) => {
            if (lineIndex === 0) {
              doc.text('•', leftMargin + bulletIndent, yPos);
              doc.text(line, leftMargin + bulletText, yPos);
            } else {
              doc.text(line, leftMargin + bulletText, yPos);
            }
            yPos += lineHeight;
          });
        });
      }

      if (index < certificationsList.length - 1) yPos += entryGap;
    });
  }

  return doc;
};

export const downloadPdf = async (data, filename = 'resume.pdf') => {
  const doc = await generatePdfResume(data);
  doc.save(filename);
};
