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
      role: 'Junior Software Developer',
      company: 'CreandoSoft',
      period: '2024 — Presente',
      description: 'Desarrollo de aplicaciones web en el sector salud.',
      type: 'work',
      techStack: ['Java', 'Spring Boot', 'Angular', '.NET Core', 'PostgreSQL', 'Docker']
    },
    {
      role: 'Ingeniería de Sistemas',
      company: 'Unidades Tecnológicas de Santander (UTS)',
      period: '2021 — 2026',
      description: 'Último semestre. Énfasis en desarrollo de software y bases de datos.',
      type: 'education'
    }
  ]);

  private readonly _skills = signal<Skill[]>([
    { name: 'Java',        category: 'language',  iconName: 'java',        level: 4 },
    { name: 'TypeScript',  category: 'language',  iconName: 'typescript',  level: 4 },
    { name: 'C#',          category: 'language',  iconName: 'csharp',      level: 3 },
    { name: 'Python',      category: 'language',  iconName: 'python',      level: 3 },
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
