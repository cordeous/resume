export const questions = [
  {
    id: 'personal',
    title: 'Tell us about yourself',
    subtitle: "Let's start with your basic information",
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'xxx-xxx-xxxx', required: false },
      { name: 'linkedin', label: 'LinkedIn URL', type: 'url', placeholder: 'linkedin.com/in/johndoe', required: false },
      { name: 'github', label: 'GitHub URL', type: 'url', placeholder: 'github.com/johndoe', required: false },
    ]
  },
  {
    id: 'education',
    title: 'Education',
    subtitle: 'Tell us about your educational background',
    fields: [
      { name: 'university', label: 'University/College', type: 'text', placeholder: 'University Name', required: true },
      { name: 'degree', label: 'Degree', type: 'text', placeholder: 'Bachelor of Science in Computer Science', required: true },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'City, State', required: true },
      { name: 'startDate', label: 'Start Date', type: 'text', placeholder: 'Aug. 2018', required: true },
      { name: 'endDate', label: 'End Date', type: 'text', placeholder: 'May 2021', required: true },
      { name: 'gpa', label: 'GPA (optional)', type: 'text', placeholder: '3.8/4.0', required: false },
    ]
  },
  {
    id: 'experience',
    title: 'Work Experience',
    subtitle: 'Share your professional experience',
    fields: [
      { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Company Inc.', required: true },
      { name: 'position', label: 'Position', type: 'text', placeholder: 'Software Engineer', required: true },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'City, State', required: true },
      { name: 'startDate', label: 'Start Date', type: 'text', placeholder: 'June 2020', required: true },
      { name: 'endDate', label: 'End Date', type: 'text', placeholder: 'Present', required: true },
      { name: 'responsibilities', label: 'Key Responsibilities (one per line)', type: 'textarea', placeholder: '• Led development of...\\n• Implemented...\\n• Collaborated with...', required: true, rows: 5 },
    ]
  },
  {
    id: 'skills',
    title: 'Technical Skills',
    subtitle: 'What technologies and tools do you know?',
    fields: [
      { name: 'languages', label: 'Programming Languages', type: 'text', placeholder: 'JavaScript, Python, Java', required: true },
      { name: 'frameworks', label: 'Frameworks & Libraries', type: 'text', placeholder: 'React, Node.js, Express', required: false },
      { name: 'tools', label: 'Developer Tools', type: 'text', placeholder: 'Git, Docker, AWS', required: false },
      { name: 'databases', label: 'Databases', type: 'text', placeholder: 'PostgreSQL, MongoDB', required: false },
      { name: 'platforms', label: 'Enterprise Platforms', type: 'text', placeholder: 'Salesforce, SAP, ServiceNow', required: false },
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'Showcase your best work',
    fields: [
      { name: 'projectName', label: 'Project Name', type: 'text', placeholder: 'My Awesome Project', required: true },
      { name: 'technologies', label: 'Technologies Used', type: 'text', placeholder: 'React, Node.js, MongoDB', required: true },
      { name: 'startDate', label: 'Start Date', type: 'text', placeholder: 'June 2020', required: false },
      { name: 'endDate', label: 'End Date', type: 'text', placeholder: 'May 2020', required: false },
      { name: 'description', label: 'Project Description (bullet points, one per line)', type: 'textarea', placeholder: '• Built a full-stack web application...\\n• Implemented user authentication...\\n• Deployed to AWS...', required: true, rows: 4 },
    ]
  },
  {
    id: 'certifications',
    title: 'Certifications & Achievements',
    subtitle: 'Optional: Add your certifications, awards, or achievements',
    optional: true,
    fields: [
      { name: 'name', label: 'Certification/Achievement Name', type: 'text', placeholder: 'AWS Certified Developer Associate', required: true },
      { name: 'issuer', label: 'Issuing Organization', type: 'text', placeholder: 'Amazon Web Services', required: false },
      { name: 'date', label: 'Date Obtained', type: 'text', placeholder: 'June 2023', required: false },
      { name: 'description', label: 'Description (optional)', type: 'textarea', placeholder: 'Brief description or details about the certification', required: false, rows: 2 },
    ]
  }
];
