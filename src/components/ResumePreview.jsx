const ResumePreview = () => {
  return (
    <svg
      viewBox="0 0 600 750"
      style={{ width: '100%', height: '100%' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Paper Background */}
      <rect width="600" height="750" fill="#FFFFFF" />

      {/* Header */}
      <text
        x="300"
        y="50"
        textAnchor="middle"
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        JOHN DOE
      </text>
      <text
        x="300"
        y="70"
        textAnchor="middle"
        style={{
          fontSize: '11px',
          fill: '#6D6C6A',
          fontFamily: 'serif'
        }}
      >
        john@example.com | 123-456-7890 | linkedin.com/in/johndoe
      </text>

      {/* Education Section */}
      <line x1="40" y1="100" x2="560" y2="100" stroke="#1A1918" strokeWidth="1" />
      <text
        x="40"
        y="120"
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          fill: '#1A1918',
          fontFamily: 'serif',
          letterSpacing: '2px'
        }}
      >
        EDUCATION
      </text>
      <text
        x="40"
        y="145"
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        University Name
      </text>
      <text
        x="560"
        y="145"
        textAnchor="end"
        style={{
          fontSize: '11px',
          fontStyle: 'italic',
          fill: '#6D6C6A',
          fontFamily: 'serif'
        }}
      >
        City, State
      </text>
      <text
        x="40"
        y="162"
        style={{
          fontSize: '11px',
          fontStyle: 'italic',
          fill: '#6D6C6A',
          fontFamily: 'serif'
        }}
      >
        Bachelor of Science in Computer Science
      </text>
      <text
        x="560"
        y="162"
        textAnchor="end"
        style={{
          fontSize: '11px',
          fontStyle: 'italic',
          fill: '#6D6C6A',
          fontFamily: 'serif'
        }}
      >
        Aug. 2018 – May 2021
      </text>

      {/* Experience Section */}
      <line x1="40" y1="185" x2="560" y2="185" stroke="#1A1918" strokeWidth="1" />
      <text
        x="40"
        y="205"
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          fill: '#1A1918',
          fontFamily: 'serif',
          letterSpacing: '2px'
        }}
      >
        EXPERIENCE
      </text>
      <text
        x="40"
        y="230"
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        Software Engineer
      </text>
      <text
        x="560"
        y="230"
        textAnchor="end"
        style={{
          fontSize: '11px',
          fontStyle: 'italic',
          fill: '#6D6C6A',
          fontFamily: 'serif'
        }}
      >
        June 2021 – Present
      </text>
      <text
        x="40"
        y="247"
        style={{
          fontSize: '11px',
          fontStyle: 'italic',
          fill: '#6D6C6A',
          fontFamily: 'serif'
        }}
      >
        Tech Company Inc.
      </text>
      <text
        x="560"
        y="247"
        textAnchor="end"
        style={{
          fontSize: '11px',
          fontStyle: 'italic',
          fill: '#6D6C6A',
          fontFamily: 'serif'
        }}
      >
        San Francisco, CA
      </text>

      {/* Bullet Points */}
      <circle cx="45" cy="263" r="2" fill="#1A1918" />
      <text
        x="55"
        y="267"
        style={{
          fontSize: '10px',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        Developed and maintained full-stack web applications using React and Node.js
      </text>
      <circle cx="45" cy="280" r="2" fill="#1A1918" />
      <text
        x="55"
        y="284"
        style={{
          fontSize: '10px',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        Collaborated with cross-functional teams to deliver high-quality software solutions
      </text>
      <circle cx="45" cy="297" r="2" fill="#1A1918" />
      <text
        x="55"
        y="301"
        style={{
          fontSize: '10px',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        Improved application performance by 40% through optimization techniques
      </text>

      {/* Projects Section */}
      <line x1="40" y1="325" x2="560" y2="325" stroke="#1A1918" strokeWidth="1" />
      <text
        x="40"
        y="345"
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          fill: '#1A1918',
          fontFamily: 'serif',
          letterSpacing: '2px'
        }}
      >
        PROJECTS
      </text>
      <text
        x="40"
        y="370"
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        Portfolio Website
      </text>
      <text
        x="150"
        y="370"
        style={{
          fontSize: '11px',
          fontStyle: 'italic',
          fill: '#6D6C6A',
          fontFamily: 'serif'
        }}
      >
        | React, TypeScript, Tailwind CSS
      </text>
      <circle cx="45" cy="383" r="2" fill="#1A1918" />
      <text
        x="55"
        y="387"
        style={{
          fontSize: '10px',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        Built a responsive portfolio website showcasing projects and skills
      </text>
      <circle cx="45" cy="400" r="2" fill="#1A1918" />
      <text
        x="55"
        y="404"
        style={{
          fontSize: '10px',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        Implemented modern design patterns and best practices
      </text>

      {/* Skills Section */}
      <line x1="40" y1="425" x2="560" y2="425" stroke="#1A1918" strokeWidth="1" />
      <text
        x="40"
        y="445"
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          fill: '#1A1918',
          fontFamily: 'serif',
          letterSpacing: '2px'
        }}
      >
        TECHNICAL SKILLS
      </text>
      <text
        x="40"
        y="467"
        style={{
          fontSize: '10px',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        <tspan fontWeight="bold">Languages:</tspan> JavaScript, Python, Java, C++, SQL
      </text>
      <text
        x="40"
        y="482"
        style={{
          fontSize: '10px',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        <tspan fontWeight="bold">Frameworks:</tspan> React, Node.js, Express, Django, Flask
      </text>
      <text
        x="40"
        y="497"
        style={{
          fontSize: '10px',
          fill: '#1A1918',
          fontFamily: 'serif'
        }}
      >
        <tspan fontWeight="bold">Tools:</tspan> Git, Docker, AWS, MongoDB, PostgreSQL
      </text>

      {/* Decorative shadow at bottom */}
      <defs>
        <linearGradient id="shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="720" width="600" height="30" fill="url(#shadow)" />
    </svg>
  );
};

export default ResumePreview;
