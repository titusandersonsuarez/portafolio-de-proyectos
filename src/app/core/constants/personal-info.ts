export const PERSONAL_INFO = {
  name: 'Anderson David Suárez Bernal',
  alias: 'Titus',
  role: {
    es: 'Ingeniero de Sistemas · Full Stack Developer',
    en: 'Systems Engineer · Full Stack Developer'
  },
  tagline: {
    es: 'Construyo aplicaciones web para el sector salud con Java, Spring Boot y Angular.',
    en: 'I build web applications for the healthcare sector with Java, Spring Boot and Angular.'
  },
  location: 'Colombia',
  email: 'titusandersonsuarez@gmail.com',
  github: 'https://github.com/titusandersonsuarez',
  linkedin: 'https://www.linkedin.com/in/anderson-suarez-150597239',
  whatsapp: {
    number: '573188785198',
    display: '+57 318 878 5198',
    url: 'https://wa.me/573188785198'
  },
  instagram: {
    handle: '@6393.anderson',
    url: 'https://www.instagram.com/6393.anderson/'
  },
  cvs: [
    { lang: 'es', label: 'Español', url: 'pdf/CV_Anderson_Suarez_ES.pdf' },
    { lang: 'en', label: 'English', url: 'pdf/CV_Anderson_Suarez_EN.pdf' }
  ],
  photoUrl: 'img/profile.webp',
  yearsOfExperience: 2,
  summary: {
    es:
      'Ingeniero de Sistemas de las Unidades Tecnológicas de Santander (UTS) y 2 años de experiencia desarrollando aplicaciones ' +
      'web en producción: software para el sector salud y sistemas propios en uso real para negocios en Colombia. Especializado en backend con Java (Spring Boot) y bases de datos ' +
      'relacionales y no relacionales, con conocimientos sólidos en frontend (Angular), reportes empresariales y prácticas ' +
      'DevOps como Docker e integración continua. Trabajo con metodologías ágiles (Scrum) y me gusta construir software que ' +
      'la gente usa de verdad.',
    en:
      'Systems Engineer from Unidades Tecnológicas de Santander (UTS) with 2 years of experience building web applications ' +
      'in production: healthcare software and my own systems in real use by businesses in Colombia. Specialized in backend development with Java (Spring Boot) and relational and ' +
      'non-relational databases, with solid knowledge of frontend (Angular), enterprise reporting and DevOps practices such ' +
      'as Docker and continuous integration. I work with Agile methodologies (Scrum) and enjoy building software that people ' +
      'actually use.'
  }
} as const;
