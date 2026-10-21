import { Component, computed, inject } from '@angular/core';

import { PERSONAL_INFO } from '../../../../core/constants/personal-info';
import { LanguageService } from '../../../../core/services/language.service';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-about',
  imports: [ScrollAnimateDirective],
  template: `
    <section appScrollAnimate
             class="mx-auto max-w-6xl px-4 py-16 border-t
                    border-slate-200 dark:border-slate-800">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <div class="md:col-span-2">
          <p class="text-brand-600 dark:text-brand-400 font-semibold tracking-wide text-sm">
            {{ i18n.t('about.eyebrow') }}
          </p>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
            {{ i18n.t('about.title') }}
          </h2>
          <p class="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
            {{ i18n.pick(info.summary) }}
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-1 gap-4 content-start">
          <div class="p-5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <p class="text-3xl font-bold text-brand-600 dark:text-brand-400">~{{ info.yearsOfExperience }}</p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ i18n.t('about.years') }}</p>
          </div>
          <div class="p-5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <p class="text-3xl font-bold text-brand-600 dark:text-brand-400">{{ projectsCount() }}</p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ i18n.t('about.projects') }}</p>
          </div>
          <div class="p-5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <p class="text-3xl font-bold text-brand-600 dark:text-brand-400">{{ skillsCount() }}</p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ i18n.t('about.techs') }}</p>
          </div>
        </div>

      </div>
    </section>
  `
})
export class About {
  private readonly portfolio = inject(PortfolioService);

  protected readonly info = PERSONAL_INFO;
  protected readonly i18n = inject(LanguageService);
  protected readonly projectsCount = computed(() => this.portfolio.projects().length);
  protected readonly skillsCount = computed(() => this.portfolio.skills().length);
}
