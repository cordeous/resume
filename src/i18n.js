import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Landing Page
      "nav.howItWorks": "How It Works",
      "nav.features": "Features",
      "nav.pricing": "Pricing",
      "nav.signIn": "Sign In",
      "hero.badge": "✨ Built with LaTeX for Perfect Typography",
      "hero.title": "Build Your Professional Resume in Minutes",
      "hero.subtitle": "Answer a few questions and get a perfectly formatted resume using industry-standard LaTeX templates. No design experience needed.",
      "hero.cta.primary": "Build My Resume →",
      "hero.cta.secondary": "See Examples",

      // How It Works
      "howItWorks.title": "How It Works",
      "howItWorks.subtitle": "Three simple steps to your perfect resume",
      "howItWorks.step1.title": "Answer Questions",
      "howItWorks.step1.desc": "Tell us about your education, experience, skills, and projects through our guided questionnaire.",
      "howItWorks.step2.title": "Preview & Edit",
      "howItWorks.step2.desc": "Review your generated resume and make any adjustments before downloading.",
      "howItWorks.step3.title": "Download & Apply",
      "howItWorks.step3.desc": "Export your perfectly formatted resume as PDF and start applying to your dream jobs.",

      // Features
      "features.title": "Why Choose Our Resume Builder?",
      "features.subtitle": "Professional results powered by LaTeX typography",
      "features.latex.title": "LaTeX Quality",
      "features.latex.desc": "Industry-standard formatting using the same LaTeX engine trusted by academics and professionals worldwide.",
      "features.noDesign.title": "No Design Skills Needed",
      "features.noDesign.desc": "Just answer questions about your background. We handle all the typography, spacing, and formatting automatically.",
      "features.ats.title": "ATS-Friendly",
      "features.ats.desc": "Clean, parseable format that passes Applicant Tracking Systems while maintaining professional appearance.",
      "features.pdf.title": "Instant PDF Export",
      "features.pdf.desc": "Download your resume as a PDF ready to submit to employers. No watermarks, no signup required.",

      // Final CTA
      "finalCta.title": "Ready to Build Your Resume?",
      "finalCta.subtitle": "Join thousands of job seekers who landed their dream jobs with our professional resumes",
      "finalCta.button": "Get Started Free",

      // Footer
      "footer.tagline": "Professional resumes powered by LaTeX",
      "footer.product": "Product",
      "footer.company": "Company",
      "footer.links.features": "Features",
      "footer.links.templates": "Templates",
      "footer.links.pricing": "Pricing",
      "footer.links.about": "About",
      "footer.links.contact": "Contact",
      "footer.copyright": "© 2026 ResumeBuilder. All rights reserved.",

      // Resume Builder
      "builder.logo": "ResumeBuilder",
      "builder.progress": "{{current}} of {{total}}",
      "builder.back": "← Back",
      "builder.next": "Next →",
      "builder.download": "Download Resume",
      "builder.preview": "Live Preview",

      // Role Selection
      "role.title": "What role are you applying for?",
      "role.subtitle": "We'll provide tailored suggestions to make your resume stand out",
      "role.placeholder": "e.g., Software Engineer, Marketing Manager, Data Analyst",
      "role.or": "Or choose from popular roles:",
      "role.software": "Software Engineer",
      "role.data": "Data Scientist",
      "role.marketing": "Marketing Manager",
      "role.designer": "Product Designer",
      "role.sales": "Sales Representative",
      "role.other": "Other",
      "role.continue": "Continue",
      "role.skip": "Skip for now",

      // Download Modal
      "download.title": "Download Your Resume",
      "download.subtitle": "Choose how you want to export your resume",
      "download.pdf.title": "Download PDF",
      "download.pdf.desc": "Get a ready-to-submit PDF file instantly",
      "download.latex.title": "Download LaTeX File",
      "download.latex.desc": "Get the .tex file to compile locally or upload to Overleaf",
      "download.overleaf.title": "Open in Overleaf",
      "download.overleaf.desc": "Instantly open your resume in Overleaf to compile to PDF",
      "download.copy.title": "Copy to Clipboard",
      "download.copy.desc": "Copy the LaTeX code to paste anywhere",
      "download.close": "Close",

      // Suggestions
      "suggestions.title": "Suggestions",
      "suggestions.forRole": "For {{role}}",
      "suggestions.improve": "Ways to improve your resume:",
      "suggestions.missing": "Missing Information",
      "suggestions.weak": "Could Be Stronger",
      "suggestions.good": "Looking Good!"
    }
  },
  es: {
    translation: {
      // Landing Page
      "nav.howItWorks": "Cómo Funciona",
      "nav.features": "Características",
      "nav.pricing": "Precios",
      "nav.signIn": "Iniciar Sesión",
      "hero.badge": "✨ Construido con LaTeX para Tipografía Perfecta",
      "hero.title": "Crea Tu Currículum Profesional en Minutos",
      "hero.subtitle": "Responde algunas preguntas y obtén un currículum perfectamente formateado usando plantillas LaTeX estándar de la industria. No se necesita experiencia en diseño.",
      "hero.cta.primary": "Crear Mi Currículum →",
      "hero.cta.secondary": "Ver Ejemplos",

      // How It Works
      "howItWorks.title": "Cómo Funciona",
      "howItWorks.subtitle": "Tres simples pasos para tu currículum perfecto",
      "howItWorks.step1.title": "Responde Preguntas",
      "howItWorks.step1.desc": "Cuéntanos sobre tu educación, experiencia, habilidades y proyectos a través de nuestro cuestionario guiado.",
      "howItWorks.step2.title": "Vista Previa y Editar",
      "howItWorks.step2.desc": "Revisa tu currículum generado y haz cualquier ajuste antes de descargarlo.",
      "howItWorks.step3.title": "Descargar y Aplicar",
      "howItWorks.step3.desc": "Exporta tu currículum perfectamente formateado como PDF y comienza a aplicar a tus trabajos soñados.",

      // Features
      "features.title": "¿Por Qué Elegir Nuestro Creador de Currículums?",
      "features.subtitle": "Resultados profesionales impulsados por tipografía LaTeX",
      "features.latex.title": "Calidad LaTeX",
      "features.latex.desc": "Formato estándar de la industria usando el mismo motor LaTeX confiable para académicos y profesionales en todo el mundo.",
      "features.noDesign.title": "No Se Necesitan Habilidades de Diseño",
      "features.noDesign.desc": "Solo responde preguntas sobre tu experiencia. Nosotros nos encargamos de toda la tipografía, espaciado y formato automáticamente.",
      "features.ats.title": "Compatible con ATS",
      "features.ats.desc": "Formato limpio y analizable que pasa los Sistemas de Seguimiento de Candidatos mientras mantiene una apariencia profesional.",
      "features.pdf.title": "Exportación Instantánea a PDF",
      "features.pdf.desc": "Descarga tu currículum como PDF listo para enviar a empleadores. Sin marcas de agua, sin necesidad de registro.",

      // Final CTA
      "finalCta.title": "¿Listo para Crear Tu Currículum?",
      "finalCta.subtitle": "Únete a miles de buscadores de empleo que consiguieron sus trabajos soñados con nuestros currículums profesionales",
      "finalCta.button": "Comenzar Gratis",

      // Footer
      "footer.tagline": "Currículums profesionales impulsados por LaTeX",
      "footer.product": "Producto",
      "footer.company": "Empresa",
      "footer.links.features": "Características",
      "footer.links.templates": "Plantillas",
      "footer.links.pricing": "Precios",
      "footer.links.about": "Acerca de",
      "footer.links.contact": "Contacto",
      "footer.copyright": "© 2026 ResumeBuilder. Todos los derechos reservados.",

      // Resume Builder
      "builder.logo": "CreadorCV",
      "builder.progress": "{{current}} de {{total}}",
      "builder.back": "← Atrás",
      "builder.next": "Siguiente →",
      "builder.download": "Descargar Currículum",
      "builder.preview": "Vista Previa en Vivo",

      // Role Selection
      "role.title": "¿Para qué puesto estás aplicando?",
      "role.subtitle": "Proporcionaremos sugerencias personalizadas para destacar tu currículum",
      "role.placeholder": "ej., Ingeniero de Software, Gerente de Marketing, Analista de Datos",
      "role.or": "O elige entre los roles populares:",
      "role.software": "Ingeniero de Software",
      "role.data": "Científico de Datos",
      "role.marketing": "Gerente de Marketing",
      "role.designer": "Diseñador de Productos",
      "role.sales": "Representante de Ventas",
      "role.other": "Otro",
      "role.continue": "Continuar",
      "role.skip": "Omitir por ahora",

      // Download Modal
      "download.title": "Descargar Tu Currículum",
      "download.subtitle": "Elige cómo quieres exportar tu currículum",
      "download.pdf.title": "Descargar PDF",
      "download.pdf.desc": "Obtén un archivo PDF listo para enviar instantáneamente",
      "download.latex.title": "Descargar Archivo LaTeX",
      "download.latex.desc": "Obtén el archivo .tex para compilar localmente o subir a Overleaf",
      "download.overleaf.title": "Abrir en Overleaf",
      "download.overleaf.desc": "Abre instantáneamente tu currículum en Overleaf para compilar a PDF",
      "download.copy.title": "Copiar al Portapapeles",
      "download.copy.desc": "Copia el código LaTeX para pegar en cualquier lugar",
      "download.close": "Cerrar",

      // Suggestions
      "suggestions.title": "Sugerencias",
      "suggestions.forRole": "Para {{role}}",
      "suggestions.improve": "Formas de mejorar tu currículum:",
      "suggestions.missing": "Información Faltante",
      "suggestions.weak": "Podría Ser Más Fuerte",
      "suggestions.good": "¡Se Ve Bien!"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
