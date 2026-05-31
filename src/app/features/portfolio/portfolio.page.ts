import { DOCUMENT } from '@angular/common';
import { Component, HostListener, computed, effect, inject, signal } from '@angular/core';

import { Project } from '../../core/models/project.model';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ProjectCard } from './components/project-card/project-card';
import { ProjectPanel } from './components/project-panel/project-panel';
import { TechFilter } from './components/tech-filter/tech-filter';

@Component({
  selector: 'app-portfolio-page',
  imports: [ProjectCard, ProjectPanel, TechFilter],
  template: `
    <section class="mx-auto max-w-6xl px-4 py-16">
      <p class="text-brand-600 dark:text-brand-400 font-semibold tracking-wide text-sm">
        Trabajos
      </p>
      <h1 class="mt-2 text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
        Portafolio
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Una selección de proyectos en los que he trabajado. Haz click para ver el detalle.
      </p>

      <div class="mt-8">
        <app-tech-filter
          [techs]="allTechs()"
          [active]="activeTechs()"
          (toggle)="toggleTech($event)"
          (clear)="clearFilters()" />
      </div>

      @if (filteredProjects().length > 0) {
        <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (project of filteredProjects(); track project.id) {
            <li>
              <app-project-card
                [project]="project"
                (open)="openProject($event)" />
            </li>
          }
        </ul>
      } @else {
        <p class="mt-12 text-center text-slate-500 dark:text-slate-400">
          Ningún proyecto coincide con los filtros activos.
        </p>
      }
    </section>

    <app-project-panel
      [project]="selectedProject()"
      (close)="closePanel()" />
  `
})
export class PortfolioPage {
  private readonly portfolio = inject(PortfolioService);
  private readonly document = inject(DOCUMENT);

  private readonly _activeTechs = signal<ReadonlySet<string>>(new Set());

  readonly activeTechs = this._activeTechs.asReadonly();
  readonly selectedProject = signal<Project | null>(null);

  readonly allTechs = computed(() => {
    const techs = new Set<string>();
    for (const p of this.portfolio.projects()) {
      for (const t of p.techStack) techs.add(t);
    }
    return [...techs].sort((a, b) => a.localeCompare(b));
  });

  readonly filteredProjects = computed(() => {
    const active = this._activeTechs();
    const projects = this.portfolio.projects();
    if (active.size === 0) return projects;
    return projects.filter(p => p.techStack.some(t => active.has(t)));
  });

  constructor() {
    effect(() => {
      const open = this.selectedProject() !== null;
      this.document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  toggleTech(tech: string): void {
    this._activeTechs.update(set => {
      const next = new Set(set);
      if (next.has(tech)) next.delete(tech);
      else next.add(tech);
      return next;
    });
  }

  clearFilters(): void {
    this._activeTechs.set(new Set());
  }

  openProject(project: Project): void {
    this.selectedProject.set(project);
  }

  closePanel(): void {
    this.selectedProject.set(null);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.selectedProject()) this.closePanel();
  }
}
