import { Component, computed, inject, input, output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Project, ProjectType } from '../../../../core/models/project.model';

const TYPE_LABEL: Record<ProjectType, string> = {
  embeddable: 'Proyecto embebido',
  backend:    'Proyecto backend',
  fullstack:  'Proyecto full stack'
};

@Component({
  selector: 'app-project-panel',
  template: `
    @let p = project();
    @let isOpen = p !== null;

    <div
      class="fixed inset-0 z-50 transition-opacity duration-300"
      [class]="isOpen
        ? 'bg-slate-900/50 backdrop-blur-sm opacity-100'
        : 'opacity-0 pointer-events-none'"
      (click)="close.emit()"
      aria-hidden="true">
    </div>

    <aside
      class="fixed top-0 right-0 z-50 h-full w-full max-w-[640px]
             shadow-2xl transition-transform duration-300 ease-out
             bg-white dark:bg-slate-900
             border-l border-slate-200 dark:border-slate-800
             flex flex-col"
      [class]="isOpen ? 'translate-x-0' : 'translate-x-full'"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="p?.title ?? 'Detalle de proyecto'">

      @if (p) {
        <header class="flex items-start justify-between gap-4 p-6 border-b
                       border-slate-200 dark:border-slate-800">
          <div class="min-w-0">
            <p class="text-xs uppercase tracking-wider font-semibold text-brand-600 dark:text-brand-400">
              {{ typeLabel() }}
            </p>
            <h2 class="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
              {{ p.title }}
            </h2>
          </div>
          <button
            type="button"
            (click)="close.emit()"
            aria-label="Cerrar"
            class="flex-shrink-0 p-2 rounded-lg
                   text-slate-500 hover:bg-slate-100
                   dark:text-slate-400 dark:hover:bg-slate-800
                   transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </header>

        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            {{ p.description }}
          </p>

          <div>
            <h3 class="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Stack
            </h3>
            <ul class="mt-2 flex flex-wrap gap-1.5">
              @for (tech of p.techStack; track tech) {
                <li class="px-2 py-0.5 text-xs rounded
                           bg-slate-100 text-slate-700
                           dark:bg-slate-800 dark:text-slate-300">{{ tech }}</li>
              }
            </ul>
          </div>

          @if (p.type === 'embeddable' && safeEmbedUrl()) {
            <div>
              <h3 class="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Demo en vivo
              </h3>
              <div class="aspect-video w-full rounded-lg overflow-hidden border
                          border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <iframe
                  [src]="safeEmbedUrl()"
                  [title]="p.title"
                  class="w-full h-full"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"></iframe>
              </div>
            </div>
          }

          @if (p.type !== 'embeddable') {
            <div class="p-4 rounded-lg border border-dashed
                        border-slate-300 dark:border-slate-700
                        text-sm text-slate-600 dark:text-slate-400">
              Este proyecto es {{ p.type === 'backend' ? 'una API / servicio backend' : 'una aplicación full stack' }}.
              Para verlo en acción revisa el código fuente en GitHub
              @if (p.demoUrl) { o abre la demo en vivo }.
            </div>
          }
        </div>

        <footer class="flex flex-wrap gap-3 p-6 border-t
                       border-slate-200 dark:border-slate-800">
          @if (p.githubUrl) {
            <a [href]="p.githubUrl" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                      bg-slate-900 text-white hover:bg-slate-800
                      dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white
                      transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.78-.25.78-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
              </svg>
              Código fuente
            </a>
          }
          @if (p.demoUrl) {
            <a [href]="p.demoUrl" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium border
                      border-slate-300 text-slate-700 hover:bg-slate-100
                      dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800
                      transition-colors">
              Abrir demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
              </svg>
            </a>
          }
          @if (!p.githubUrl && !p.demoUrl) {
            <p class="text-sm text-slate-400 dark:text-slate-500 italic">
              Enlaces de código y demo pendientes de completar.
            </p>
          }
        </footer>
      }
    </aside>
  `
})
export class ProjectPanel {
  private readonly sanitizer = inject(DomSanitizer);

  readonly project = input.required<Project | null>();
  readonly close = output<void>();

  protected readonly typeLabel = computed(() => {
    const p = this.project();
    return p ? TYPE_LABEL[p.type] : '';
  });

  protected readonly safeEmbedUrl = computed<SafeResourceUrl | null>(() => {
    const p = this.project();
    if (!p?.embedPath) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(p.embedPath);
  });
}
