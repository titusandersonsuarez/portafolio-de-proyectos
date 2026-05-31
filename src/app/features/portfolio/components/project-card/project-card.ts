import { Component, computed, input, output } from '@angular/core';

import { Project, ProjectType } from '../../../../core/models/project.model';

const TYPE_LABEL: Record<ProjectType, string> = {
  embeddable: 'Embebido',
  backend:    'Backend',
  fullstack:  'Full Stack'
};

@Component({
  selector: 'app-project-card',
  template: `
    <button
      type="button"
      (click)="open.emit(project())"
      class="group w-full text-left p-5 rounded-xl border shadow-sm flex flex-col
             bg-white border-slate-200 hover:border-brand-400 hover:shadow-md hover:-translate-y-0.5
             dark:bg-slate-900 dark:border-slate-800 dark:hover:border-brand-500
             transition-all duration-200">
      <header class="flex items-center justify-between gap-3">
        <span class="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full
                     bg-slate-100 text-slate-700
                     dark:bg-slate-800 dark:text-slate-300">
          {{ typeLabel() }}
        </span>
        @if (project().featured) {
          <span class="text-xs font-medium text-amber-600 dark:text-amber-400 inline-flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Destacado
          </span>
        }
      </header>

      <h3 class="mt-3 font-semibold text-slate-900 dark:text-slate-100
                 group-hover:text-brand-600 dark:group-hover:text-brand-400
                 transition-colors">
        {{ project().title }}
      </h3>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 flex-1">
        {{ project().description }}
      </p>

      <ul class="mt-4 flex flex-wrap gap-1.5">
        @for (tech of project().techStack; track tech) {
          <li class="px-2 py-0.5 text-xs rounded
                     bg-slate-100 text-slate-700
                     dark:bg-slate-800 dark:text-slate-300">{{ tech }}</li>
        }
      </ul>

      <div class="mt-4 text-sm font-medium text-brand-600 dark:text-brand-400 inline-flex items-center gap-1
                  opacity-0 group-hover:opacity-100 transition-opacity">
        Ver detalle
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
      </div>
    </button>
  `
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly open = output<Project>();

  protected readonly typeLabel = computed(() => TYPE_LABEL[this.project().type]);
}
