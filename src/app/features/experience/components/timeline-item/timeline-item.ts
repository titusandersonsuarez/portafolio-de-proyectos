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

        @if (data().techStack?.length) {
          <ul class="mt-4 flex flex-wrap gap-1.5">
            @for (tech of data().techStack; track tech) {
              <li class="px-2 py-0.5 text-xs rounded
                         bg-slate-100 text-slate-700
                         dark:bg-slate-800 dark:text-slate-300">{{ tech }}</li>
            }
          </ul>
        }
      </article>
    </div>
  `
})
export class TimelineItem {
  readonly data = input.required<Experience>();

  protected readonly isWork = computed(() => this.data().type === 'work');
}
