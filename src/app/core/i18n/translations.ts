/**
 * Textos de interfaz del sitio en español e inglés.
 * El contenido (proyectos, experiencia, perfil) vive en portfolio.service.ts y personal-info.ts.
 */
export const TRANSLATIONS = {
  // Navegación
  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.experience': { es: 'Experiencia', en: 'Experience' },
  'nav.portfolio': { es: 'Portafolio', en: 'Projects' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },
  'nav.openMenu': { es: 'Abrir menú', en: 'Open menu' },
  'nav.closeMenu': { es: 'Cerrar menú', en: 'Close menu' },
  'nav.toLight': { es: 'Cambiar a modo claro', en: 'Switch to light mode' },
  'nav.toDark': { es: 'Cambiar a modo oscuro', en: 'Switch to dark mode' },
  'nav.switchLang': { es: 'Ver en inglés', en: 'Ver en español' },

  // Hero
  'hero.greeting': { es: 'Hola, soy', en: "Hi, I'm" },
  'hero.viewProjects': { es: 'Ver proyectos', en: 'View projects' },
  'hero.contact': { es: 'Contactar', en: 'Get in touch' },
  'hero.downloadCv': { es: 'Descargar CV:', en: 'Download CV:' },
  'hero.photoAlt': { es: 'Foto de', en: 'Photo of' },

  // Sobre mí
  'about.eyebrow': { es: 'Sobre mí', en: 'About me' },
  'about.title': { es: 'Construyendo software con propósito.', en: 'Building software with purpose.' },
  'about.years': { es: 'años de experiencia profesional', en: 'years of professional experience' },
  'about.projects': { es: 'proyectos en portafolio', en: 'projects in portfolio' },
  'about.techs': { es: 'tecnologías en el stack', en: 'technologies in my stack' },

  // Proyectos destacados (inicio)
  'featured.eyebrow': { es: 'Proyectos', en: 'Projects' },
  'featured.title': { es: 'Lo que he construido.', en: "What I've built." },
  'featured.subtitle': {
    es: 'Proyectos con código publicado, pruebas y despliegue con Docker.',
    en: 'Projects with published code, tests and Docker deployment.'
  },
  'featured.code': { es: 'Ver código', en: 'View code' },
  'featured.all': { es: 'Ver todos los proyectos', en: 'See all projects' },

  // Skills
  'skills.title': { es: 'Tecnologías con las que trabajo.', en: 'Technologies I work with.' },
  'skills.language': { es: 'Lenguajes', en: 'Languages' },
  'skills.framework': { es: 'Frameworks', en: 'Frameworks' },
  'skills.database': { es: 'Bases de datos', en: 'Databases' },
  'skills.tool': { es: 'Herramientas', en: 'Tools' },
  'skills.cloud': { es: 'Cloud', en: 'Cloud' },

  // Experiencia
  'exp.eyebrow': { es: 'Trayectoria', en: 'Career' },
  'exp.title': { es: 'Experiencia y educación', en: 'Experience & education' },
  'exp.subtitle': {
    es: 'Ingeniero de Sistemas con experiencia en software para el sector salud.',
    en: 'Systems Engineer with experience building healthcare software.'
  },
  'exp.work': { es: 'Trabajo', en: 'Work' },
  'exp.education': { es: 'Educación', en: 'Education' },
  'exp.products': { es: 'Productos', en: 'Products' },
  'exp.achievements': { es: 'Logros y responsabilidades', en: 'Achievements & responsibilities' },
  'exp.focus': { es: 'Áreas de enfoque', en: 'Focus areas' },
  'exp.clickToEnlarge': { es: 'Click para ver en tamaño completo', en: 'Click to view full size' },
  'exp.open': { es: 'Abrir', en: 'Open' },

  // Portafolio
  'pf.eyebrow': { es: 'Trabajos', en: 'Work' },
  'pf.title': { es: 'Portafolio', en: 'Projects' },
  'pf.subtitle': {
    es: 'Una selección de proyectos en los que he trabajado. Haz click para ver el detalle.',
    en: "A selection of projects I've worked on. Click one to see the details."
  },
  'pf.empty': { es: 'Ningún proyecto coincide con los filtros activos.', en: 'No projects match the active filters.' },
  'pf.filter': { es: 'Filtrar:', en: 'Filter:' },
  'pf.clear': { es: 'Limpiar', en: 'Clear' },
  'pf.featured': { es: 'Destacado', en: 'Featured' },
  'pf.details': { es: 'Ver detalle', en: 'View details' },
  'pf.type.embeddable': { es: 'Embebido', en: 'Embedded' },
  'pf.type.backend': { es: 'Backend', en: 'Backend' },
  'pf.type.fullstack': { es: 'Full Stack', en: 'Full Stack' },
  'pf.panel.embeddable': { es: 'Proyecto embebido', en: 'Embedded project' },
  'pf.panel.backend': { es: 'Proyecto backend', en: 'Backend project' },
  'pf.panel.fullstack': { es: 'Proyecto full stack', en: 'Full stack project' },
  'pf.panel.default': { es: 'Detalle de proyecto', en: 'Project details' },
  'pf.panel.close': { es: 'Cerrar', en: 'Close' },
  'pf.panel.liveDemo': { es: 'Demo en vivo', en: 'Live demo' },
  'pf.panel.isBackend': {
    es: 'Este proyecto es una API / servicio backend. Para verlo en acción revisa el código fuente en GitHub.',
    en: 'This project is an API / backend service. Check the source code on GitHub to see it in action.'
  },
  'pf.panel.isFullstack': {
    es: 'Este proyecto es una aplicación full stack. Para verlo en acción revisa el código fuente en GitHub.',
    en: 'This project is a full stack application. Check the source code on GitHub to see it in action.'
  },
  'pf.panel.source': { es: 'Código fuente', en: 'Source code' },
  'pf.panel.openDemo': { es: 'Abrir demo', en: 'Open demo' },
  'pf.panel.private': {
    es: 'Producto comercial en uso: el código es privado. Escríbeme y te muestro una demo.',
    en: 'Commercial product in use: source code is private. Reach out and I will show you a demo.'
  },
  'pf.panel.noLinks': { es: 'Proyecto académico sin código publicado.', en: 'Academic project, code not published.' },

  // Contacto
  'contact.eyebrow': { es: 'Hablemos', en: "Let's talk" },
  'contact.title': { es: 'Contacto', en: 'Contact' },
  'contact.subtitle': {
    es: '¿Tienes un proyecto en mente, una pregunta técnica o una oportunidad laboral? Escríbeme y te respondo en máximo 48 horas.',
    en: 'Have a project in mind, a technical question or a job opportunity? Write to me and I will reply within 48 hours.'
  },
  'contact.findMe': { es: 'Encuéntrame en', en: 'Find me on' },
  'contact.linkedinProfile': { es: 'Perfil profesional', en: 'Professional profile' },
  'contact.location': { es: 'Ubicación', en: 'Location' },
  'form.name': { es: 'Nombre', en: 'Name' },
  'form.email': { es: 'Email', en: 'Email' },
  'form.subject': { es: 'Asunto', en: 'Subject' },
  'form.message': { es: 'Mensaje', en: 'Message' },
  'form.nameRequired': { es: 'El nombre es obligatorio.', en: 'Name is required.' },
  'form.nameMin': { es: 'Mínimo 2 caracteres.', en: 'At least 2 characters.' },
  'form.emailRequired': { es: 'El email es obligatorio.', en: 'Email is required.' },
  'form.emailInvalid': { es: 'Formato de email inválido.', en: 'Invalid email format.' },
  'form.subjectRequired': { es: 'El asunto es obligatorio.', en: 'Subject is required.' },
  'form.messageRequired': { es: 'El mensaje es obligatorio.', en: 'Message is required.' },
  'form.messageMin': { es: 'Mínimo 10 caracteres.', en: 'At least 10 characters.' },
  'form.success': { es: 'Mensaje enviado. Te contesto pronto.', en: 'Message sent. I will get back to you soon.' },
  'form.error': {
    es: 'No se pudo enviar. Intenta de nuevo o escríbeme directo al email.',
    en: "Couldn't send it. Try again or email me directly."
  },
  'form.sending': { es: 'Enviando…', en: 'Sending…' },
  'form.send': { es: 'Enviar mensaje', en: 'Send message' },

  // Footer
  'footer.builtWith': { es: 'Hecho con Angular 21 + Tailwind', en: 'Built with Angular 21 + Tailwind' }
} as const satisfies Record<string, { es: string; en: string }>;

export type TranslationKey = keyof typeof TRANSLATIONS;
