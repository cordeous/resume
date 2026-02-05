# ResumeBuilder

A modern React application that helps users build professional resumes using LaTeX templates. The app features a guided questionnaire interface that collects user information and generates a perfectly formatted LaTeX resume document.

## Features

- 🎨 **Beautiful Landing Page** - Modern, responsive design with smooth animations
- 📝 **Interactive Questionnaire** - Step-by-step form to collect resume information
- 👁️ **Live Preview** - See your resume update in real-time as you fill out the form
- 📄 **LaTeX Export** - Generate industry-standard LaTeX resume files
- 📱 **Mobile Friendly** - Fully responsive design that works on all devices
- ✨ **Modern Effects** - Smooth transitions and hover effects using Framer Motion
- 🌍 **Bilingual Support** - Full English and Spanish language support
- 📋 **Resume Examples** - View professional resume examples from various industries
- 🎯 **Role Selection** - Get tailored suggestions based on your career field
- 📊 **Certifications Section** - Optional section for certifications and achievements
- 📱 **QR Code Generator** - Generate QR codes with your contact information
- 💼 **Business Cards** - Create professional business cards with integrated QR codes
- 🎨 **Professional Previews** - Preview QR codes and business cards before downloading

## Tech Stack

- **React 19.2.0** - UI framework with latest features
- **Vite 7.3.1** - Build tool and dev server
- **React Router DOM** - Client-side navigation
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Icon library for social media and UI elements
- **QRCode.js** - QR code generation library
- **jsPDF** - PDF generation for business cards
- **CSS Variables** - Consistent design system
- **Pencil Extension** - Professional UI design tool

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

The resume builder guides you through multiple sections:

1. **Role Selection** - Choose your career field for tailored suggestions
2. **Personal Information** - Name, email, phone, LinkedIn, GitHub with social icons
3. **Education** - University, degree, location, dates (add multiple entries)
4. **Work Experience** - Company, position, responsibilities (add multiple entries)
5. **Technical Skills** - Languages, frameworks, tools, databases
6. **Projects** - Project name, technologies, description (add multiple entries)
7. **Certifications & Achievements** - Optional section for additional credentials

As you fill out each section, the live preview on the right updates automatically to show how your resume will look.

### QR Codes & Business Cards

Generate professional contact materials:
- **QR Codes** - Create scannable QR codes with your contact information in vCard format
- **Business Cards** - Generate print-ready business cards (3.5" × 2") with integrated QR codes
- **Preview First** - View professional previews before downloading
- **Multiple Actions** - Share, print, or download your materials

### Exporting Your Resume

After completing all sections, you have multiple export options:

1. **Download LaTeX (.tex)** - Get the raw LaTeX source file
2. **Copy to Clipboard** - Copy LaTeX code directly
3. **Open in Overleaf** - Launch directly in Overleaf for online editing
4. **Download PDF** - Generate PDF directly in the browser
5. **Download QR Code** - Get a PNG image of your contact QR code
6. **Download Business Card** - Get a print-ready PDF business card

The LaTeX files can be compiled with:
- **Overleaf** (online, recommended)
- **pdflatex** (local installation)
- Any standard LaTeX compiler

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
│   ├── components/            # Reusable React components
│   │   ├── ExamplesModal.jsx  # Resume examples showcase
│   │   ├── QRPreviewModal.jsx # QR code and business card previews
│   │   └── LanguageSwitcher.jsx # Language toggle component
│   ├── data/                  # Question definitions
│   │   ├── questions.js       # English questionnaire
│   │   └── questionsES.js     # Spanish questionnaire
│   ├── pages/                 # Page components
│   │   ├── LandingPage.jsx    # English landing page
│   │   ├── LandingPageES.jsx  # Spanish landing page
│   │   ├── ResumeBuilder.jsx  # English builder
│   │   ├── ResumeBuilderES.jsx # Spanish builder
│   │   ├── RoleSelection.jsx  # Career field selection
│   │   └── *.css              # Component styles
│   ├── utils/                 # Utility functions
│   │   ├── latexGenerator.js  # LaTeX generation logic
│   │   ├── pdfGenerator.js    # PDF generation
│   │   └── qrCodeGenerator.js # QR code and business card generation
│   ├── App.jsx                # Main app with routing
│   ├── index.css              # Global styles and design system
│   └── main.jsx               # Entry point
├── public/                    # Static assets
├── pencil-new.pen            # Pencil design file with UI mockups
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

## Recent Updates

### Version 2.0 Features
- ✅ Bilingual support (English/Spanish)
- ✅ Professional resume examples from 6 different industries
- ✅ QR code generation with vCard format
- ✅ Business card creation with QR codes
- ✅ Preview modals for QR codes and business cards
- ✅ Social media icons for contact fields
- ✅ Optional certifications section
- ✅ Mobile-responsive design throughout
- ✅ Role selection with career field suggestions

## Future Enhancements

Potential features for future versions:
- Multiple LaTeX templates to choose from
- Save/load resume data to local storage
- User accounts and cloud storage
- Export to other formats (Word, Markdown)
- AI-powered resume review and suggestions
- Cover letter generation
- Resume scoring and ATS optimization tips

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
