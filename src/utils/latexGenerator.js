export const generateLatexResume = (data) => {
  const { personal, education, experienceList, skills, projectsList } = data;

  // Extract contact info
  const phone = personal?.phone || 'xxx-xxx-xxxx';
  const email = personal?.email || 'email@example.com';
  const linkedin = personal?.linkedin ? `linkedin.com/in/${personal.linkedin.split('/').pop()}` : 'linkedin.com/in/username';
  const github = personal?.github ? `github.com/${personal.github.split('/').pop()}` : 'github.com/username';

  // Generate education section
  const educationSection = education ? `
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {${education.university || 'University Name'}}{${education.location || 'City, State'}}
      {${education.degree || 'Degree'}}{${education.startDate || 'Start'} -- ${education.endDate || 'End'}}
  \\resumeSubHeadingListEnd
` : '';

  // Generate experience section
  const experienceSection = experienceList && experienceList.length > 0 ? `
\\section{Experience}
  \\resumeSubHeadingListStart
${experienceList.map(exp => `
    \\resumeSubheading
      {${exp.position || 'Position'}}{${exp.startDate || 'Start'} -- ${exp.endDate || 'End'}}
      {${exp.company || 'Company'}}{${exp.location || 'Location'}}
      \\resumeItemListStart
${exp.responsibilities?.split('\\n').filter(line => line.trim()).map(line => `        \\resumeItem{${line.replace(/^[•\-\*]\s*/, '')}}`).join('\n') || '        \\resumeItem{Responsibility description}'}
      \\resumeItemListEnd
`).join('')}
  \\resumeSubHeadingListEnd
` : '';

  // Generate projects section
  const projectsSection = projectsList && projectsList.length > 0 ? `
\\section{Projects}
    \\resumeSubHeadingListStart
${projectsList.map(project => `
      \\resumeProjectHeading
          {\\textbf{${project.projectName || 'Project Name'}} $|$ \\emph{${project.technologies || 'Technologies'}}}{${project.startDate || ''} -- ${project.endDate || ''}}
          \\resumeItemListStart
${project.description?.split('\\n').filter(line => line.trim()).map(line => `            \\resumeItem{${line.replace(/^[•\-\*]\s*/, '')}}`).join('\n') || '            \\resumeItem{Project description}'}
          \\resumeItemListEnd
`).join('')}
    \\resumeSubHeadingListEnd
` : '';

  // Generate skills section
  const skillsSection = skills ? `
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skills.languages ? `     \\textbf{Languages}{: ${skills.languages}} \\\\\n` : ''}${skills.frameworks ? `     \\textbf{Frameworks}{: ${skills.frameworks}} \\\\\n` : ''}${skills.tools ? `     \\textbf{Developer Tools}{: ${skills.tools}} \\\\\n` : ''}${skills.databases ? `     \\textbf{Libraries}{: ${skills.databases}}` : ''}
    }}
 \\end{itemize}
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
    \\textbf{\\Huge \\scshape ${personal?.fullName || 'Your Name'}} \\\\ \\vspace{1pt}
    \\small ${phone} $|$ \\href{mailto:${email}}{\\underline{${email}}} $|$
    \\href{https://${linkedin}}{\\underline{${linkedin}}} $|$
    \\href{https://${github}}{\\underline{${github}}}
\\end{center}

${educationSection}
${experienceSection}
${projectsSection}
${skillsSection}

%-------------------------------------------
\\end{document}`;

  return latexTemplate;
};
