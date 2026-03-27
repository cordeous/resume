/** Ensure a value is a safe non-empty string for jsPDF text calls */
const safe = (v) => (v != null && String(v).trim() ? String(v).trim() : '');

export const generatePdfResume = async (data) => {
  const { jsPDF } = await import('jspdf');
  const { personal, education, educationList, experienceList, skills, projectsList, certificationsList, showCertifications } = data || {};

  // Create new PDF document (Letter size: 8.5" x 11")
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter'
  });

  let yPos = 0.7; // Start position from top (in inches)
  const leftMargin = 0.7;
  const rightMargin = 7.8; // 8.5 - 0.7
  const pageWidth = 8.5;

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
    doc.setFontSize(26);
    const safeName = safe(personal.fullName).toUpperCase() || 'YOUR NAME';
    doc.text(safeName, pageWidth / 2, yPos, { align: 'center' });
    yPos += 0.15;

    // Contact Info — only include non-empty fields
    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    const contactParts = [personal.phone, personal.email, personal.linkedin, personal.github]
      .map(safe)
      .filter(Boolean);
    if (contactParts.length > 0) {
      const contactInfo = contactParts.join(' | ');
      // Split to multiple lines if too long
      const wrapped = doc.splitTextToSize(contactInfo, rightMargin - leftMargin);
      wrapped.forEach(line => {
        doc.text(line, pageWidth / 2, yPos, { align: 'center' });
        yPos += 0.14;
      });
      yPos += 0.1;
    } else {
      yPos += 0.35;
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
    yPos += 0.25;

    educationEntries.forEach((edu, index) => {
      // University name and location
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      if (safe(edu.university)) doc.text(safe(edu.university), leftMargin, yPos);
      doc.setFont('times', 'italic');
      if (safe(edu.location)) doc.text(safe(edu.location), rightMargin, yPos, { align: 'right' });
      yPos += 0.15;

      // Degree and dates
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      if (safe(edu.degree)) doc.text(safe(edu.degree), leftMargin, yPos);
      const dateRange = [safe(edu.startDate), safe(edu.endDate)].filter(Boolean).join(' – ');
      if (dateRange) doc.text(dateRange, rightMargin, yPos, { align: 'right' });
      yPos += 0.25;

      // Add space between entries if not the last one
      if (index < educationEntries.length - 1) {
        yPos += 0.05;
      }
    });

    yPos += 0.05;
  }

  // Experience Section
  if (experienceList && experienceList.length > 0) {
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('EXPERIENCE', leftMargin, yPos);
    doc.setLineWidth(0.01);
    doc.line(leftMargin, yPos + 0.05, rightMargin, yPos + 0.05);
    yPos += 0.25;

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
      yPos += 0.15;

      // Company and location
      doc.setFont('times', 'italic');
      if (safe(exp.company)) doc.text(safe(exp.company), leftMargin, yPos);
      if (safe(exp.location)) doc.text(safe(exp.location), rightMargin, yPos, { align: 'right' });
      yPos += 0.15;

      // Responsibilities (bullets)
      if (exp.responsibilities) {
        const bullets = exp.responsibilities.split('\n').filter(line => line.trim());
        doc.setFont('times', 'normal');
        doc.setFontSize(10);

        bullets.forEach(bullet => {
          const cleanBullet = bullet.replace(/^[•\-\*]\s*/, '');
          const lines = doc.splitTextToSize(cleanBullet, rightMargin - leftMargin - 0.2);

          lines.forEach((line, lineIndex) => {
            if (lineIndex === 0) {
              doc.text('•', leftMargin + 0.1, yPos);
              doc.text(line, leftMargin + 0.25, yPos);
            } else {
              doc.text(line, leftMargin + 0.25, yPos);
            }
            yPos += 0.15;
          });
        });
      }

      yPos += 0.1;
    });
  }

  // Projects Section
  if (projectsList && projectsList.length > 0) {
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
    yPos += 0.25;

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
      yPos += 0.15;

      // Project description (bullets)
      if (project.description) {
        const bullets = project.description.split('\n').filter(line => line.trim());
        doc.setFont('times', 'normal');
        doc.setFontSize(10);

        bullets.forEach(bullet => {
          const cleanBullet = bullet.replace(/^[•\-\*]\s*/, '');
          const lines = doc.splitTextToSize(cleanBullet, rightMargin - leftMargin - 0.2);

          lines.forEach((line, lineIndex) => {
            if (lineIndex === 0) {
              doc.text('•', leftMargin + 0.1, yPos);
              doc.text(line, leftMargin + 0.25, yPos);
            } else {
              doc.text(line, leftMargin + 0.25, yPos);
            }
            yPos += 0.15;
          });
        });
      }

      yPos += 0.1;
    });
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
    yPos += 0.25;

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
          yPos += 0.15;
          doc.text(textLine, leftMargin, yPos);
        }
      });
      yPos += 0.15;
    });
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
    yPos += 0.25;

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
      yPos += 0.15;

      // Issuer
      if (safe(cert.issuer)) {
        doc.setFont('times', 'italic');
        doc.setFontSize(10);
        doc.text(safe(cert.issuer), leftMargin, yPos);
        yPos += 0.15;
      }

      // Description (bullets)
      if (cert.description) {
        const bullets = cert.description.split('\n').filter(line => line.trim());
        doc.setFont('times', 'normal');
        doc.setFontSize(10);

        bullets.forEach(bullet => {
          const cleanBullet = bullet.replace(/^[•\-\*]\s*/, '');
          const lines = doc.splitTextToSize(cleanBullet, rightMargin - leftMargin - 0.2);

          lines.forEach((line, lineIndex) => {
            if (lineIndex === 0) {
              doc.text('•', leftMargin + 0.1, yPos);
              doc.text(line, leftMargin + 0.25, yPos);
            } else {
              doc.text(line, leftMargin + 0.25, yPos);
            }
            yPos += 0.15;
          });
        });
      }

      yPos += 0.1;

      // Add space between entries if not the last one
      if (index < certificationsList.length - 1) {
        yPos += 0.05;
      }
    });
  }

  return doc;
};

export const downloadPdf = async (data, filename = 'resume.pdf') => {
  const doc = await generatePdfResume(data);
  doc.save(filename);
};
