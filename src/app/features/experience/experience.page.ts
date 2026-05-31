import { Component, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { TimelineItem } from './components/timeline-item/timeline-item';

@Component({
  selector: 'app-experience-page',
  imports: [TimelineItem, ScrollAnimateDirective],
  template: `
    <section class="mx-auto max-w-4xl px-4 py-16">
      <p class="text-brand-600 dark:text-brand-400 font-semibold tracking-wide text-sm">
        Trayectoria
      </p>
      <h1 class="mt-2 text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
        Experiencia & Educación
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        De estudiante de Ingeniería de Sistemas a Junior Developer en producción.
      </p>

      <div appScrollAnimate class="relative mt-12">
        <div
          class="absolute left-[7px] top-2 bottom-2 w-0.5
                 bg-slate-200 dark:bg-slate-800"
          aria-hidden="true"></div>

        <ol class="relative space-y-8">
          @for (item of experiences(); track item.company) {
            <li>
              <app-timeline-item [data]="item" />
            </li>
          }
        </ol>
      </div>
    </section>
  `
})
export class ExperiencePage {
  private readonly portfolio = inject(PortfolioService);
  protected readonly experiences = this.portfolio.experiences;
}
