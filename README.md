# ResumeBuilder

A modern React application that helps users build professional resumes using LaTeX templates. The app features a guided questionnaire interface that collects user information and generates a perfectly formatted LaTeX resume document.

## Features

- 🎨 **Beautiful Landing Page** - Modern, responsive design with smooth animations
- 📝 **Interactive Questionnaire** - Step-by-step form to collect resume information
- 👁️ **Live Preview** - See your resume update in real-time as you fill out the form
- 📄 **LaTeX Export** - Generate industry-standard LaTeX resume files
- 📱 **Mobile Friendly** - Fully responsive design that works on all devices
- ✨ **Modern Effects** - Smooth transitions and hover effects using Framer Motion

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Framer Motion** - Animations
- **CSS Variables** - Design system

## Getting Started

### Prerequisites

- Node.js (v20.19+ or v22.12+ recommended)
- npm or yarn

### Installation

1. Navigate to the project directory
```bash
cd resume-builder
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Landing Page

The landing page provides an overview of the application with:
- Hero section with call-to-action
- "How It Works" section explaining the 3-step process
- Features section highlighting key benefits
- Final CTA to get started
- Footer with links

Click "Build My Resume" to start creating your resume.

### Resume Builder

The resume builder guides you through 5 sections:

1. **Personal Information** - Name, email, phone, LinkedIn, GitHub
2. **Education** - University, degree, location, dates
3. **Work Experience** - Company, position, responsibilities
4. **Technical Skills** - Languages, frameworks, tools, databases
5. **Projects** - Project name, technologies, description

As you fill out each section, the live preview on the right updates automatically to show how your resume will look.

### Exporting Your Resume

After completing all sections, click "Download Resume" to export your resume as a `.tex` file. You can then:

1. **Compile with LaTeX** - Use Overleaf, pdflatex, or any LaTeX compiler
2. **Generate PDF** - The LaTeX file will compile to a professional PDF resume
3. **Submit to Jobs** - Use the PDF to apply to positions

## LaTeX Template

The application uses the popular [Jake's Resume](https://github.com/jakegut/resume) template, which is based on the [sb2nov/resume](https://github.com/sb2nov/resume) template. This template is:

- ✅ ATS-friendly (Applicant Tracking System)
- ✅ Clean and professional
- ✅ Industry-standard formatting
- ✅ Trusted by thousands of job seekers

## Project Structure

```
resume-builder/
├── src/
│   ├── components/         # Reusable React components
│   ├── data/              # Question definitions
│   │   └── questions.js   # Resume questionnaire structure
│   ├── pages/             # Page components
│   │   ├── LandingPage.jsx
│   │   ├── LandingPage.css
│   │   ├── ResumeBuilder.jsx
│   │   └── ResumeBuilder.css
│   ├── utils/             # Utility functions
│   │   └── latexGenerator.js  # LaTeX generation logic
│   ├── App.jsx            # Main app with routing
│   ├── index.css          # Global styles and design system
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── package.json
└── README.md
```

## Design System

The application uses a warm, professional design system with:

### Colors
- Primary Background: `#F5F4F1` (Warm cream)
- Surface: `#FFFFFF` (White)
- Text Primary: `#1A1918` (Dark gray)
- Text Secondary: `#6D6C6A` (Medium gray)
- Accent Primary: `#3D8A5A` (Green)
- Accent Warm: `#D89575` (Terracotta)

### Typography
- Font Family: Outfit (Google Fonts)
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- Uses CSS variables for consistent spacing
- Mobile-responsive adjustments

## Building for Production

To build the application for production:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to Netlify's deployment interface

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/resume-builder"
}
```

3. Deploy:
```bash
npm run deploy
```

## Future Enhancements

Potential features for future versions:
- Multiple LaTeX templates to choose from
- PDF generation directly in the browser
- Save/load resume data
- User accounts and cloud storage
- Export to other formats (Word, Markdown)
- Resume review and suggestions
- Cover letter generation

## License

MIT

## Credits

- LaTeX Template: [Jake's Resume](https://github.com/jakegut/resume) by Jake Gutierrez
- Based on: [sb2nov/resume](https://github.com/sb2nov/resume)
- Animations: [Framer Motion](https://www.framer.com/motion/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React + Vite
