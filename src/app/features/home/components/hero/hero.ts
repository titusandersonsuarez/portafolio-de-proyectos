import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PERSONAL_INFO } from '../../../../core/constants/personal-info';
import { LanguageService } from '../../../../core/services/language.service';
import { KineticName } from '../../../../shared/components/kinetic-name/kinetic-name';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, KineticName],
  template: `
    <section class="relative overflow-hidden">
      <div class="mx-auto max-w-6xl px-4 pt-14 pb-20 md:pt-20 md:pb-28 min-h-[calc(100svh-4rem)] flex flex-col justify-center">

        <div class="flex items-center gap-4">
          <div class="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
            <span class="absolute inset-0 rounded-full ring-2 ring-mint-500 animate-[ping_2.4s_ease-out_1]" aria-hidden="true"></span>
            <img [src]="photoUrl"
                 [alt]="i18n.t('hero.photoAlt') + ' ' + info.name"
                 class="relative w-full h-full rounded-full object-cover ring-2 ring-mint-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-950"
                 loading="eager"/>
          </div>
          <p class="text-base md:text-lg text-slate-600 dark:text-slate-400">
            {{ i18n.t('hero.greeting') }}
          </p>
        </div>

        <h1 class="mt-4 text-[clamp(3.6rem,19vw,14rem)] leading-[0.86] text-ink dark:text-slate-50">
          <app-kinetic-name [lines]="['Anderson', 'Suárez']" />
        </h1>

        <div class="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div class="max-w-xl">
            <p class="font-display text-2xl md:text-3xl text-ink dark:text-slate-100" style="font-variation-settings:'wght' 500">
              {{ i18n.pick(info.role) }}
            </p>
            <p class="mt-3 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ i18n.pick(info.tagline) }}
            </p>
          </div>

          <div class="flex flex-col gap-3 md:items-end">
            <div class="flex flex-wrap gap-3">
              <a routerLink="/portafolio"
                 class="inline-flex items-center px-6 py-3.5 rounded-full font-medium
                        bg-brand-600 text-white hover:bg-brand-700 transition-colors
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                {{ i18n.t('hero.viewProjects') }}
              </a>
              <a routerLink="/contacto"
                 class="inline-flex items-center px-6 py-3.5 rounded-full font-medium border transition-colors
                        border-slate-300 text-ink hover:border-ink
                        dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-300
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                {{ i18n.t('hero.contact') }}
              </a>
            </div>
            @if (cvs.length > 0) {
              <p class="text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-3">
                <span>{{ i18n.t('hero.downloadCv') }}</span>
                @for (cv of cvs; track cv.url) {
                  <a [href]="cv.url" target="_blank" rel="noopener" [attr.hreflang]="cv.lang"
                     class="font-medium text-brand-600 dark:text-brand-400 underline underline-offset-4 decoration-mint-500/60 hover:decoration-mint-500">
                    {{ cv.label }}
                  </a>
                }
              </p>
            }
          </div>
        </div>

      </div>
    </section>
  `
})
export class Hero {
  protected readonly info = PERSONAL_INFO;
  protected readonly photoUrl = PERSONAL_INFO.photoUrl;
  protected readonly cvs = PERSONAL_INFO.cvs;
  protected readonly i18n = inject(LanguageService);
}
