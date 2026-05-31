import { Component, computed, input } from '@angular/core';

import { Experience } from '../../../../core/models/experience.model';

@Component({
  selector: 'app-timeline-item',
  template: `
    <div class="relative pl-10">
      <span
        class="absolute left-0 top-6 w-4 h-4 rounded-full ring-4 transition-colors
               ring-slate-50 dark:ring-slate-950"
        [class.bg-brand-500]="isWork()"
        [class.bg-amber-500]="!isWork()"
        aria-hidden="true"></span>

      <article class="p-5 rounded-xl border shadow-sm
                      bg-white border-slate-200
                      dark:bg-slate-900 dark:border-slate-800">

        <header class="flex items-center justify-between gap-3 flex-wrap">
          <span
            class="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full"
            [class]="isWork()
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
              : 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'">
            {{ isWork() ? 'Trabajo' : 'Educación' }}
          </span>
          <time class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {{ data().period }}
          </time>
        </header>

        <h3 class="mt-3 font-semibold text-slate-900 dark:text-slate-100">
          {{ data().role }}
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ data().company }}</p>
        <p class="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
          {{ data().description }}
        </p>

        @if (data().systems?.length) {
          <div class="mt-4">
            <h4 class="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Productos
            </h4>
            <ul class="flex flex-wrap gap-1.5">
              @for (system of data().systems; track system) {
                <li class="px-2 py-0.5 text-xs font-semibold rounded
                           bg-purple-50 text-purple-700
                           dark:bg-purple-900/40 dark:text-purple-300">{{ system }}</li>
              }
            </ul>
          </div>
        }

        @if (data().achievements?.length) {
          <div class="mt-4">
            <h4 class="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2">
              {{ isWork() ? 'Logros y responsabilidades' : 'Áreas de enfoque' }}
            </h4>
            <ul class="space-y-1.5">
              @for (item of data().achievements; track item) {
                <li class="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span class="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-brand-500 dark:bg-brand-400" aria-hidden="true"></span>
                  <span>{{ item }}</span>
                </li>
              }
            </ul>
          </div>
        }

        @if (data().techStack?.length) {
          <div class="mt-4">
            <h4 class="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Stack
            </h4>
            <ul class="flex flex-wrap gap-1.5">
              @for (tech of data().techStack; track tech) {
                <li class="px-2 py-0.5 text-xs rounded
                           bg-slate-100 text-slate-700
                           dark:bg-slate-800 dark:text-slate-300">{{ tech }}</li>
              }
            </ul>
          </div>
        }

        @if (data().media; as media) {
          <div class="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 class="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2">
              {{ media.label }}
            </h4>
            @if (media.type === 'image') {
              <a [href]="media.url" target="_blank" rel="noopener"
                 class="block rounded-lg overflow-hidden border transition-all
                        border-slate-200 hover:border-brand-400
                        dark:border-slate-800 dark:hover:border-brand-500
                        hover:shadow-md max-w-xs">
                <img [src]="media.url" [alt]="media.label"
                     class="w-full h-auto block"
                     loading="lazy"/>
              </a>
              <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Click para ver en tamaño completo
              </p>
            } @else {
              <a [href]="media.url" target="_blank" rel="noopener"
                 class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
                        border-slate-300 text-slate-700 hover:bg-slate-100
                        dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800
                        transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                Abrir {{ media.label }}
              </a>
            }
          </div>
        }
      </article>
    </div>
  `
})
export class TimelineItem {
  readonly data = input.required<Experience>();

  protected readonly isWork = computed(() => this.data().type === 'work');
}
