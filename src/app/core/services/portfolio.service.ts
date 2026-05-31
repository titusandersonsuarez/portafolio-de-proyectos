import { Injectable, signal } from '@angular/core';

import { Experience } from '../models/experience.model';
import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly _projects = signal<Project[]>([
    {
      id: 'commerce-flow',
      title: 'CommerceFlow',
      description: 'Plataforma de e-commerce con catálogo, carrito y pagos.',
      techStack: ['Angular 17', '.NET 8', 'PostgreSQL', 'Docker'],
      type: 'fullstack',
      featured: true
    },
    {
      id: 'game-engine',
      title: 'Game Engine GoF',
      description: 'Motor de juego didáctico que aplica 8 patrones GoF.',
      techStack: ['Java', 'Patrones GoF'],
      type: 'backend',
      featured: true
    },
    {
      id: 'traffic-analysis',
      title: 'Análisis Accidentes Bucaramanga',
      description: 'Estudio exploratorio de accidentalidad vial en la ciudad.',
      techStack: ['Python', 'Pandas', 'Matplotlib'],
      type: 'embeddable',
      embedPath: 'projects/traffic-analysis.html',
      featured: false
    },
    {
      id: 'ordento-api',
      title: 'Ordento API',
      description: 'API de gestión de órdenes para el sector salud.',
      techStack: ['NestJS', 'Prisma', 'PostgreSQL', 'Docker'],
      type: 'backend',
      featured: false
    }
  ]);

  private readonly _experiences = signal<Experience[]>([
    {
      role: 'Junior Full Stack Developer',
      company: 'CreandoSoft',
      period: '2024 — Presente',
      description:
        'Desarrollo y mantenimiento de SIE y HCE, software empresarial para EPS e IPS del sector salud en Colombia, ' +
        'cubriendo flujos clínicos, administrativos y de facturación.',
      type: 'work',
      techStack: ['Java', 'Spring Boot', '.NET Core', 'Angular', 'PostgreSQL', 'Docker', 'Git'],
      systems: ['SIE', 'HCE'],
      achievements: [
        'Implementación de endpoints REST en Java/Spring Boot y .NET Core para nuevas funcionalidades y módulos de los productos.',
        'Optimización de consultas SQL en PostgreSQL, reduciendo tiempos de respuesta en reportes con alto volumen de datos.',
        'Refactorización de procesos críticos a operaciones asíncronas, mejorando el rendimiento percibido por el usuario.',
        'Diseño y generación de reportes operativos y financieros para áreas administrativas y clínicas.',
        'Participación en revisiones de código y propuestas de mejora en procesos del equipo de desarrollo.'
      ],
      media: {
        type: 'image',
        url: 'img/certificado.jpeg',
        label: 'Certificado CreandoSoft'
      }
    },
    {
      role: 'Ingeniería de Sistemas',
      company: 'Unidades Tecnológicas de Santander (UTS)',
      period: '2021 — 2026',
      description:
        'Formación profesional con énfasis en desarrollo de software, bases de datos relacionales, ' +
        'arquitectura de aplicaciones y análisis de algoritmos. Último semestre en curso.',
      type: 'education',
      achievements: [
        'Proyectos académicos en Java aplicando patrones de diseño (GoF) y principios SOLID.',
        'Modelado y administración de bases de datos relacionales (PostgreSQL, MySQL).',
        'Análisis exploratorio de datos con Python (Pandas, Matplotlib).'
      ],
      media: { type: 'image', url: 'img/diploma.jpeg', label: 'Diploma UTS' }
    }
  ]);

  private readonly _skills = signal<Skill[]>([
    { name: 'Java',        category: 'language',  iconName: 'java',        level: 4 },
    { name: 'TypeScript',  category: 'language',  iconName: 'typescript',  level: 4 },
    { name: 'C#',          category: 'language',  iconName: 'csharp',      level: 3 },
    { name: 'Python',      category: 'language',  iconName: 'python',      level: 2 },
    { name: 'Angular',     category: 'framework', iconName: 'angular',     level: 4 },
    { name: 'Spring Boot', category: 'framework', iconName: 'spring',      level: 4 },
    { name: '.NET Core',   category: 'framework', iconName: 'dotnetcore',  level: 3 },
    { name: 'NestJS',      category: 'framework', iconName: 'nestjs',      level: 3 },
    { name: 'PostgreSQL',  category: 'database',  iconName: 'postgresql',  level: 4 },
    { name: 'Docker',      category: 'tool',      iconName: 'docker',      level: 3 },
    { name: 'Git',         category: 'tool',      iconName: 'git',         level: 4 }
  ]);

  readonly projects = this._projects.asReadonly();
  readonly experiences = this._experiences.asReadonly();
  readonly skills = this._skills.asReadonly();
}
