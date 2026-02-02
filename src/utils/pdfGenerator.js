import { jsPDF } from 'jspdf';

export const generatePdfResume = (data) => {
  const { personal, education, experienceList, skills, projectsList } = data;

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
    doc.text(personal.fullName.toUpperCase(), pageWidth / 2, yPos, { align: 'center' });
    yPos += 0.15;

    // Contact Info
    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    const contactInfo = [
      personal.phone,
      personal.email,
      personal.linkedin,
      personal.github
    ].filter(Boolean).join(' | ');
    doc.text(contactInfo, pageWidth / 2, yPos, { align: 'center' });
    yPos += 0.35;
  }

  // Education Section
  if (education && Object.keys(education).length > 0) {
    // Section header with line
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('EDUCATION', leftMargin, yPos);
    doc.setLineWidth(0.01);
    doc.line(leftMargin, yPos + 0.05, rightMargin, yPos + 0.05);
    yPos += 0.25;

    // University name and location
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text(education.university || '', leftMargin, yPos);
    doc.setFont('times', 'italic');
    doc.text(education.location || '', rightMargin, yPos, { align: 'right' });
    yPos += 0.15;

    // Degree and dates
    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.text(education.degree || '', leftMargin, yPos);
    doc.text(`${education.startDate} – ${education.endDate}`, rightMargin, yPos, { align: 'right' });
    yPos += 0.3;
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
      doc.text(exp.position || '', leftMargin, yPos);
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      doc.text(`${exp.startDate} – ${exp.endDate}`, rightMargin, yPos, { align: 'right' });
      yPos += 0.15;

      // Company and location
      doc.setFont('times', 'italic');
      doc.text(exp.company || '', leftMargin, yPos);
      doc.text(exp.location || '', rightMargin, yPos, { align: 'right' });
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
      const projectHeader = `${project.projectName} | `;
      const headerWidth = doc.getTextWidth(projectHeader);

      doc.text(projectHeader, leftMargin, yPos);
      doc.setFont('times', 'italic');
      doc.text(project.technologies || '', leftMargin + headerWidth, yPos);

      if (project.startDate || project.endDate) {
        doc.text(`${project.startDate} – ${project.endDate}`, rightMargin, yPos, { align: 'right' });
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

  return doc;
};

export const downloadPdf = (data, filename = 'resume.pdf') => {
  const doc = generatePdfResume(data);
  doc.save(filename);
};
