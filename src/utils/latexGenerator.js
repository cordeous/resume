/**
 * Escape characters that have special meaning in LaTeX.
 * Must be applied to every user-supplied string before embedding in .tex output.
 */
const escapeLaTeX = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

export const generateLatexResume = (data) => {
  const { personal, education, educationList, experienceList, skills, projectsList, certificationsList, showCertifications } = data;

  // Extract contact info — escape for LaTeX safety
  const name = escapeLaTeX(personal?.fullName || 'Your Name');
  const phone = escapeLaTeX(personal?.phone || 'xxx-xxx-xxxx');
  const email = personal?.email || 'email@example.com'; // used raw in \href
  const emailDisplay = escapeLaTeX(email);
  const linkedinRaw = personal?.linkedin
    ? `linkedin.com/in/${personal.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//i, '').replace(/\/$/, '')}`
    : 'linkedin.com/in/username';
  const githubRaw = personal?.github
    ? `github.com/${personal.github.replace(/https?:\/\/(www\.)?github\.com\//i, '').replace(/\/$/, '')}`
    : 'github.com/username';
  const linkedin = escapeLaTeX(linkedinRaw);
  const github = escapeLaTeX(githubRaw);

  // Helper: split bullet text and escape each line
  const escapeBullets = (text) =>
    (text || '').split('\n').filter(line => line.trim())
      .map(line => escapeLaTeX(line.replace(/^[•\-\*]\s*/, '')));

  // Generate education section - support both educationList and single education
  const educationEntries = educationList && educationList.length > 0 ? educationList : (education ? [education] : []);
  const educationSection = educationEntries.length > 0 ? `
\\section{Education}
  \\resumeSubHeadingListStart
${educationEntries.map(edu => `    \\resumeSubheading
      {${escapeLaTeX(edu.university || 'University Name')}}{${escapeLaTeX(edu.location || 'City, State')}}
      {${escapeLaTeX(edu.degree || 'Degree')}}{${escapeLaTeX(edu.startDate || 'Start')} -- ${escapeLaTeX(edu.endDate || 'End')}}`).join('\n')}
  \\resumeSubHeadingListEnd
` : '';

  // Generate experience section
  const experienceSection = experienceList && experienceList.length > 0 ? `
\\section{Experience}
  \\resumeSubHeadingListStart
${experienceList.map(exp => {
    const bullets = escapeBullets(exp.responsibilities);
    const bulletLines = bullets.length > 0
      ? bullets.map(b => `        \\resumeItem{${b}}`).join('\n')
      : '        \\resumeItem{Responsibility description}';
    return `
    \\resumeSubheading
      {${escapeLaTeX(exp.position || 'Position')}}{${escapeLaTeX(exp.startDate || 'Start')} -- ${escapeLaTeX(exp.endDate || 'End')}}
      {${escapeLaTeX(exp.company || 'Company')}}{${escapeLaTeX(exp.location || 'Location')}}
      \\resumeItemListStart
${bulletLines}
      \\resumeItemListEnd
`;
  }).join('')}
  \\resumeSubHeadingListEnd
` : '';

  // Generate projects section
  const projectsSection = projectsList && projectsList.length > 0 ? `
\\section{Projects}
    \\resumeSubHeadingListStart
${projectsList.map(project => {
    const bullets = escapeBullets(project.description);
    const bulletLines = bullets.length > 0
      ? bullets.map(b => `            \\resumeItem{${b}}`).join('\n')
      : '            \\resumeItem{Project description}';
    const dateRange = (project.startDate || project.endDate)
      ? `${escapeLaTeX(project.startDate || '')} -- ${escapeLaTeX(project.endDate || '')}`
      : '';
    return `
      \\resumeProjectHeading
          {\\textbf{${escapeLaTeX(project.projectName || 'Project Name')}} $|$ \\emph{${escapeLaTeX(project.technologies || 'Technologies')}}}{${dateRange}}
          \\resumeItemListStart
${bulletLines}
          \\resumeItemListEnd
`;
  }).join('')}
    \\resumeSubHeadingListEnd
` : '';

  // Generate skills section
  const skillsSection = skills ? `
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skills.languages ? `     \\textbf{Languages}{: ${escapeLaTeX(skills.languages)}} \\\\\n` : ''}${skills.frameworks ? `     \\textbf{Frameworks}{: ${escapeLaTeX(skills.frameworks)}} \\\\\n` : ''}${skills.tools ? `     \\textbf{Developer Tools}{: ${escapeLaTeX(skills.tools)}} \\\\\n` : ''}${skills.databases ? `     \\textbf{Libraries}{: ${escapeLaTeX(skills.databases)}} \\\\\n` : ''}${skills.platforms ? `     \\textbf{Enterprise Platforms}{: ${escapeLaTeX(skills.platforms)}}` : ''}
    }}
 \\end{itemize}
` : '';

  // Generate certifications section
  const certificationsSection = showCertifications && certificationsList && certificationsList.length > 0 ? `
\\section{Certifications \\& Achievements}
  \\resumeSubHeadingListStart
${certificationsList.map(cert => {
    const bullets = escapeBullets(cert.description);
    const bulletBlock = bullets.length > 0 ? `
      \\resumeItemListStart
${bullets.map(b => `        \\resumeItem{${b}}`).join('\n')}
      \\resumeItemListEnd` : '';
    return `    \\resumeSubheading
      {${escapeLaTeX(cert.name || 'Certification Name')}}{${escapeLaTeX(cert.date || '')}}
      {${escapeLaTeX(cert.issuer || '')}}{}${bulletBlock}`;
  }).join('\n')}
  \\resumeSubHeadingListEnd
` : '';

  // Full LaTeX template
  const latexTemplate = `%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${name}} \\\\ \\vspace{1pt}
    \\small ${phone} $|$ \\href{mailto:${email}}{\\underline{${emailDisplay}}} $|$
    \\href{https://${linkedinRaw}}{\\underline{${linkedin}}} $|$
    \\href{https://${githubRaw}}{\\underline{${github}}}
\\end{center}

${educationSection}
${experienceSection}
${projectsSection}
${skillsSection}
${certificationsSection}

%-------------------------------------------
\\end{document}`;

  return latexTemplate;
};
