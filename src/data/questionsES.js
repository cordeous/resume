export const questionsES = [
  {
    id: 'personal',
    title: 'Cuéntanos sobre ti',
    subtitle: 'Comencemos con tu información básica',
    fields: [
      { name: 'fullName', label: 'Nombre Completo', type: 'text', placeholder: 'Juan Pérez', required: true },
      { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'juan@ejemplo.com', required: true },
      { name: 'phone', label: 'Número de Teléfono', type: 'tel', placeholder: 'xxx-xxx-xxxx', required: false },
      { name: 'linkedin', label: 'URL de LinkedIn', type: 'url', placeholder: 'linkedin.com/in/juanperez', required: false },
      { name: 'github', label: 'URL de GitHub', type: 'url', placeholder: 'github.com/juanperez', required: false },
    ]
  },
  {
    id: 'education',
    title: 'Educación',
    subtitle: 'Cuéntanos sobre tu formación académica',
    fields: [
      { name: 'university', label: 'Universidad/Colegio', type: 'text', placeholder: 'Nombre de la Universidad', required: true },
      { name: 'degree', label: 'Título', type: 'text', placeholder: 'Licenciatura en Ciencias de la Computación', required: true },
      { name: 'location', label: 'Ubicación', type: 'text', placeholder: 'Ciudad, Estado', required: true },
      { name: 'startDate', label: 'Fecha de Inicio', type: 'text', placeholder: 'Ago. 2018', required: true },
      { name: 'endDate', label: 'Fecha de Finalización', type: 'text', placeholder: 'Mayo 2021', required: true },
      { name: 'gpa', label: 'Promedio (opcional)', type: 'text', placeholder: '3.8/4.0', required: false },
    ]
  },
  {
    id: 'experience',
    title: 'Experiencia Laboral',
    subtitle: 'Comparte tu experiencia profesional',
    fields: [
      { name: 'company', label: 'Nombre de la Empresa', type: 'text', placeholder: 'Empresa S.A.', required: true },
      { name: 'position', label: 'Puesto', type: 'text', placeholder: 'Ingeniero de Software', required: true },
      { name: 'location', label: 'Ubicación', type: 'text', placeholder: 'Ciudad, Estado', required: true },
      { name: 'startDate', label: 'Fecha de Inicio', type: 'text', placeholder: 'Junio 2020', required: true },
      { name: 'endDate', label: 'Fecha de Finalización', type: 'text', placeholder: 'Presente', required: true },
      { name: 'responsibilities', label: 'Responsabilidades Clave (una por línea)', type: 'textarea', placeholder: '• Lideré el desarrollo de...\\n• Implementé...\\n• Colaboré con...', required: true, rows: 5 },
    ]
  },
  {
    id: 'skills',
    title: 'Habilidades Técnicas',
    subtitle: '¿Qué tecnologías y herramientas conoces?',
    fields: [
      { name: 'languages', label: 'Lenguajes de Programación', type: 'text', placeholder: 'JavaScript, Python, Java', required: true },
      { name: 'frameworks', label: 'Frameworks y Librerías', type: 'text', placeholder: 'React, Node.js, Express', required: false },
      { name: 'tools', label: 'Herramientas de Desarrollo', type: 'text', placeholder: 'Git, Docker, AWS', required: false },
      { name: 'databases', label: 'Bases de Datos', type: 'text', placeholder: 'PostgreSQL, MongoDB', required: false },
    ]
  },
  {
    id: 'projects',
    title: 'Proyectos',
    subtitle: 'Muestra tu mejor trabajo',
    fields: [
      { name: 'projectName', label: 'Nombre del Proyecto', type: 'text', placeholder: 'Mi Proyecto Increíble', required: true },
      { name: 'technologies', label: 'Tecnologías Utilizadas', type: 'text', placeholder: 'React, Node.js, MongoDB', required: true },
      { name: 'startDate', label: 'Fecha de Inicio', type: 'text', placeholder: 'Junio 2020', required: false },
      { name: 'endDate', label: 'Fecha de Finalización', type: 'text', placeholder: 'Mayo 2020', required: false },
      { name: 'description', label: 'Descripción del Proyecto (puntos, uno por línea)', type: 'textarea', placeholder: '• Construí una aplicación web full-stack...\\n• Implementé autenticación de usuarios...\\n• Desplegué en AWS...', required: true, rows: 4 },
    ]
  }
];
