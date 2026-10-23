import { Injectable, computed, inject, signal } from '@angular/core';

import { Experience, ExperienceMedia } from '../models/experience.model';
import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';
import { LanguageService, Localized } from './language.service';

/** Proyecto con textos en ambos idiomas; el servicio entrega la versión del idioma actual. */
type ProjectSource = Omit<Project, 'title' | 'description'> & { title: Localized; description: Localized };

type ExperienceSource = Omit<Experience, 'role' | 'period' | 'description' | 'achievements' | 'media'> & {
  role: Localized;
  period: Localized;
  description: Localized;
  achievements?: { es: string[]; en: string[] };
  media?: Omit<ExperienceMedia, 'label'> & { label: Localized };
};

const PROJECTS: ProjectSource[] = [
  {
    id: 'barberhub',
    title: { es: 'BarberHub — SaaS multitenant de reservas', en: 'BarberHub — multitenant booking SaaS' },
    description: {
      es:
        'Cada barbería tiene su página de reservas y su panel, aislados en una misma base de datos con @TenantId de Hibernate. ' +
        'Disponibilidad real por barbero, protección contra citas dobles con bloqueo pesimista y restricción EXCLUDE de PostgreSQL, ' +
        'roles con JWT y 19 pruebas de integración.',
      en:
        'Each barbershop gets its own booking page and admin panel, isolated in a shared database with Hibernate @TenantId. ' +
        'Real per-barber availability, double-booking protection with pessimistic locking and a PostgreSQL EXCLUDE constraint, ' +
        'JWT roles and 19 integration tests.'
    },
    techStack: ['Java 21', 'Spring Boot', 'Angular', 'PostgreSQL', 'Docker'],
    type: 'fullstack',
    githubUrl: 'https://github.com/titusandersonsuarez/Sistema-Multitenant-de-Barber-as',
    featured: true
  },
  {
    id: 'nogal',
    title: { es: 'Nogal — tienda y panel para fábrica de muebles', en: 'Nogal — store and back office for a furniture factory' },
    description: {
      es:
        'Sistema real para una fábrica de muebles en Bogotá: tienda con catálogo, ficha con visor AR 3D, carrito y pagos con Wompi, ' +
        'más un panel interno con dashboard de ventas, pedidos, producción e inventario. Incluye asistente con IA (Gemini) sobre el catálogo.',
      en:
        'Real system for a furniture factory in Bogotá: storefront with catalog, product page with 3D AR viewer, cart and Wompi payments, ' +
        'plus a back office with sales dashboard, orders, production and inventory. Includes an AI assistant (Gemini) over the catalog.'
    },
    techStack: ['.NET 9', 'React 18', 'TypeScript', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    type: 'fullstack',
    githubUrl: 'https://github.com/titusandersonsuarez/sistema_venta_muebles',
    featured: true
  },
  {
    id: 'prescriptions-app',
    title: { es: 'Sistema de Prescripciones Médicas', en: 'Medical Prescriptions System' },
    description: {
      es:
        'Plataforma full stack para gestión de prescripciones: doctores las emiten, pacientes las consumen y admins supervisan. ' +
        'Incluye PDFs con QR para verificación, dashboard con métricas y 3 roles con acceso aislado mediante JWT.',
      en:
        'Full stack platform for managing prescriptions: doctors issue them, patients redeem them and admins supervise. ' +
        'Includes PDFs with QR codes for verification, a metrics dashboard and 3 roles with isolated access via JWT.'
    },
    techStack: ['Next.js 15', 'React 19', 'NestJS 11', 'Prisma 6', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    type: 'fullstack',
    githubUrl: 'https://github.com/titusandersonsuarez/prescriptions-app',
    featured: true
  },
  {
    id: 'leadgym-ai',
    title: { es: 'LeadGym AI — agentes de IA para prospección', en: 'LeadGym AI — AI agents for lead generation' },
    description: {
      es:
        'Tres agentes orquestados con Semantic Kernel buscan gimnasios locales, auditan cómo reciben reservas y redactan ' +
        'un correo comercial con Gemini. Interfaz web con el progreso de los agentes en vivo (Server-Sent Events) y ' +
        'revisión de cada borrador antes de enviarlo.',
      en:
        'Three agents orchestrated with Semantic Kernel find local gyms, audit how they take bookings and write ' +
        'a sales email with Gemini. Web UI that streams the agents\' progress live (Server-Sent Events) and lets ' +
        'you review each draft before sending it.'
    },
    techStack: ['C#', '.NET 8', 'ASP.NET Core', 'Semantic Kernel', 'Gemini API', 'Docker'],
    type: 'fullstack',
    githubUrl: 'https://github.com/titusandersonsuarez/leadgym-ai',
    imageUrl: 'img/projects/leadgym.webp',
    imageAlt: 'Interfaz de LeadGym AI con los tres agentes y borradores de correo para revisar',
    featured: true
  },
  {
    id: 'game-engine',
    title: { es: 'Game Engine GoF', en: 'Game Engine GoF' },
    description: {
      es: 'Motor de juego didáctico que aplica 8 patrones GoF.',
      en: 'Educational game engine that applies 8 GoF design patterns.'
    },
    techStack: ['Java', 'Patrones GoF'],
    type: 'backend',
    featured: false
  },
  {
    id: 'traffic-analysis',
    title: { es: 'Análisis Accidentes Bucaramanga', en: 'Bucaramanga Traffic Accidents Analysis' },
    description: {
      es: 'Estudio exploratorio de accidentalidad vial en la ciudad.',
      en: 'Exploratory study of road accidents in the city.'
    },
    techStack: ['Python', 'Pandas', 'Matplotlib'],
    type: 'embeddable',
    embedPath: 'projects/traffic-analysis.html',
    featured: false
  }
];

const EXPERIENCES: ExperienceSource[] = [
  {
    role: { es: 'Desarrollador Junior', en: 'Junior Developer' },
    company: 'CreandoSoft',
    period: { es: 'Ago 2024 — Dic 2025', en: 'Aug 2024 — Dec 2025' },
    description: {
      es:
        'Desarrollo y mantenimiento de SIE y HCE, plataforma web para EPS e IPS del sector salud en Colombia, ' +
        'cubriendo flujos clínicos, administrativos y de facturación. Prestación de servicios de agosto a diciembre de 2024 ' +
        'y contrato a término fijo trimestral desde enero de 2025.',
      en:
        'Development and maintenance of SIE and HCE, a web platform used by healthcare providers (EPS and IPS) in Colombia, ' +
        'covering clinical, administrative and billing workflows. Contractor from August to December 2024, ' +
        'then fixed-term contract renewed quarterly from January 2025.'
    },
    type: 'work',
    techStack: ['Java', 'Spring Boot', '.NET Core', 'JavaScript', 'PostgreSQL', 'JasperReports', 'Crystal Reports', 'Git'],
    systems: ['SIE', 'HCE'],
    achievements: {
      es: [
        'Diseñé, desarrollé y mantuve módulos críticos de la plataforma, asegurando alta disponibilidad y apego a normativas sanitarias.',
        'Optimicé consultas SQL y componentes backend con Java y Spring Boot, mejorando el rendimiento de funcionalidades clave.',
        'Diseñé e integré reportes empresariales y dinámicos con JasperReports y Crystal Reports para la gestión operativa y médica.',
        'Implementé nuevas funcionalidades en el frontend y refactoricé código legacy para mejorar la experiencia de los profesionales de la salud.',
        'Trabajé en células Scrum (dailies, plannings y retrospectivas) con entregas cada dos semanas.',
        'Escribí pruebas unitarias y documentación técnica de los procesos y componentes del sistema.'
      ],
      en: [
        'Designed, developed and maintained critical modules of the platform, ensuring high availability and compliance with health regulations.',
        'Optimized SQL queries and backend components with Java and Spring Boot, improving the performance of key features.',
        'Designed and integrated dynamic enterprise reports with JasperReports and Crystal Reports for operational and clinical workflows.',
        'Implemented new frontend features and refactored legacy code to improve the experience of healthcare professionals.',
        'Worked in Scrum teams (dailies, plannings and retrospectives) delivering in bi-weekly sprints.',
        'Wrote unit tests and technical documentation for the system processes and components.'
      ]
    },
    media: {
      type: 'image',
      url: 'img/certificado.jpeg',
      label: { es: 'Certificado CreandoSoft', en: 'CreandoSoft certificate' }
    }
  },
  {
    role: { es: 'Ingeniería de Sistemas (graduado)', en: 'B.S. in Systems Engineering (graduated)' },
    company: 'Unidades Tecnológicas de Santander (UTS)',
    period: { es: '2021 — 2026', en: '2021 — 2026' },
    description: {
      es:
        'Formación profesional con énfasis en desarrollo de software, bases de datos relacionales, ' +
        'arquitectura de aplicaciones y análisis de algoritmos.',
      en:
        'Professional degree focused on software development, relational databases, ' +
        'application architecture and algorithm analysis.'
    },
    type: 'education',
    achievements: {
      es: [
        'Proyectos académicos en Java aplicando patrones de diseño (GoF) y principios SOLID.',
        'Modelado y administración de bases de datos relacionales (PostgreSQL, MySQL).',
        'Análisis exploratorio de datos con Python (Pandas, Matplotlib).'
      ],
      en: [
        'Academic projects in Java applying GoF design patterns and SOLID principles.',
        'Modeling and administration of relational databases (PostgreSQL, MySQL).',
        'Exploratory data analysis with Python (Pandas, Matplotlib).'
      ]
    },
    media: {
      type: 'image',
      url: 'img/diploma.jpeg',
      label: {
        es: 'Diploma de Tecnólogo en Desarrollo de Sistemas Informáticos (2024)',
        en: 'Technologist diploma in Information Systems Development (2024)'
      }
    }
  }
];

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly language = inject(LanguageService);

  private readonly _skills = signal<Skill[]>([
    { name: 'Java',        category: 'language',  iconName: 'java',        level: 4 },
    { name: 'TypeScript',  category: 'language',  iconName: 'typescript',  level: 4 },
    { name: 'C#',          category: 'language',  iconName: 'csharp',      level: 3 },
    { name: 'Python',      category: 'language',  iconName: 'python',      level: 2 },
    { name: 'Angular',     category: 'framework', iconName: 'angular',     level: 4 },
    { name: 'Spring Boot', category: 'framework', iconName: 'spring',      level: 4 },
    { name: '.NET Core',   category: 'framework', iconName: 'dotnetcore',  level: 3 },
    { name: 'NestJS',      category: 'framework', iconName: 'nestjs',      level: 3 },
    { name: 'PostgreSQL',  category: 'database',  iconName: 'postgresql',         level: 4 },
    { name: 'MySQL',       category: 'database',  iconName: 'mysql',              level: 3 },
    { name: 'SQL Server',  category: 'database',  iconName: 'microsoftsqlserver', level: 3 },
    { name: 'MongoDB',     category: 'database',  iconName: 'mongodb',            level: 2 },
    { name: 'Docker',      category: 'tool',      iconName: 'docker',             level: 3 },
    { name: 'Git',         category: 'tool',      iconName: 'git',                level: 4 }
  ]);

  readonly projects = computed<Project[]>(() => {
    const lang = this.language.lang();
    return PROJECTS.map(p => ({ ...p, title: p.title[lang], description: p.description[lang] }));
  });

  readonly featuredProjects = computed(() => this.projects().filter(p => p.featured));

  readonly experiences = computed<Experience[]>(() => {
    const lang = this.language.lang();
    return EXPERIENCES.map(e => ({
      ...e,
      role: e.role[lang],
      period: e.period[lang],
      description: e.description[lang],
      achievements: e.achievements?.[lang],
      media: e.media ? { ...e.media, label: e.media.label[lang] } : undefined
    }));
  });

  readonly skills = this._skills.asReadonly();
}
