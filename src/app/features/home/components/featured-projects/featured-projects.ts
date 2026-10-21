import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../../../core/services/language.service';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-featured-projects',
  imports: [RouterLink, ScrollAnimateDirective],
  template: `
    <section appScrollAnimate
             class="mx-auto max-w-6xl px-4 py-16 border-t
                    border-slate-200 dark:border-slate-800">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-brand-600 dark:text-brand-400 font-semibold tracking-wide text-sm">
            {{ i18n.t('featured.eyebrow') }}
          </p>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
            {{ i18n.t('featured.title') }}
          </h2>
          <p class="mt-2 text-slate-600 dark:text-slate-400">{{ i18n.t('featured.subtitle') }}</p>
        </div>
        <a routerLink="/portafolio"
           class="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
          {{ i18n.t('featured.all') }}
        </a>
      </div>

      <ul class="mt-10 grid gap-6 md:grid-cols-3">
        @for (p of projects(); track p.id) {
          <li class="flex flex-col p-6 rounded-xl border
                     bg-white border-slate-200
                     dark:bg-slate-900 dark:border-slate-800">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ p.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 flex-1">{{ p.description }}</p>
            <ul class="mt-4 flex flex-wrap gap-1.5">
              @for (tech of p.techStack; track tech) {
                <li class="px-2 py-0.5 text-xs rounded
                           bg-slate-100 text-slate-700
                           dark:bg-slate-800 dark:text-slate-300">{{ tech }}</li>
              }
            </ul>
            @if (p.githubUrl) {
              <a [href]="p.githubUrl" target="_blank" rel="noopener noreferrer"
                 class="mt-5 inline-flex items-center gap-2 self-start px-4 py-2 rounded-lg text-sm font-medium
                        bg-slate-900 text-white hover:bg-slate-800
                        dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white
                        transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.78-.25.78-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                </svg>
                {{ i18n.t('featured.code') }}
              </a>
            }
          </li>
        }
      </ul>
    </section>
  `
})
export class FeaturedProjects {
  protected readonly i18n = inject(LanguageService);
  protected readonly projects = inject(PortfolioService).featuredProjects;
}
