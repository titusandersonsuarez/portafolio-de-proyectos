import { Component } from '@angular/core';

import { PERSONAL_INFO } from '../../core/constants/personal-info';
import { ContactForm } from './components/contact-form/contact-form';

@Component({
  selector: 'app-contact-page',
  imports: [ContactForm],
  template: `
    <section class="mx-auto max-w-5xl px-4 py-16">
      <p class="text-brand-600 dark:text-brand-400 font-semibold tracking-wide text-sm">
        Hablemos
      </p>
      <h1 class="mt-2 text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
        Contacto
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
        ¿Tienes un proyecto en mente, una pregunta técnica o una oportunidad laboral?
        Escríbeme y te respondo en máximo 48 horas.
      </p>

      <div class="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr]">

        <aside class="space-y-3">
          <h2 class="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
            Encuéntrame en
          </h2>

          <a [href]="'mailto:' + info.email"
             class="flex items-center gap-3 p-4 rounded-xl border transition-colors
                    bg-white border-slate-200 hover:border-brand-400
                    dark:bg-slate-900 dark:border-slate-800 dark:hover:border-brand-500">
            <span class="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center
                         bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-10 5L2 7"/>
              </svg>
            </span>
            <div class="min-w-0">
              <p class="text-xs text-slate-500 dark:text-slate-400">Email</p>
              <p class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                {{ info.email }}
              </p>
            </div>
          </a>

          @if (info.github) {
            <a [href]="info.github" target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-3 p-4 rounded-xl border transition-colors
                      bg-white border-slate-200 hover:border-brand-400
                      dark:bg-slate-900 dark:border-slate-800 dark:hover:border-brand-500">
              <span class="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center
                           bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.78-.25.78-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                </svg>
              </span>
              <div class="min-w-0">
                <p class="text-xs text-slate-500 dark:text-slate-400">GitHub</p>
                <p class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  &#64;titusandersonsuarez
                </p>
              </div>
            </a>
          }

          @if (info.linkedin) {
            <a [href]="info.linkedin" target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-3 p-4 rounded-xl border transition-colors
                      bg-white border-slate-200 hover:border-brand-400
                      dark:bg-slate-900 dark:border-slate-800 dark:hover:border-brand-500">
              <span class="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center
                           bg-[#0a66c2] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9z"/>
                </svg>
              </span>
              <div class="min-w-0">
                <p class="text-xs text-slate-500 dark:text-slate-400">LinkedIn</p>
                <p class="text-sm font-medium text-slate-900 dark:text-slate-100">Perfil profesional</p>
              </div>
            </a>
          }

          <div class="flex items-center gap-3 p-4 rounded-xl border
                      bg-slate-50 border-slate-200
                      dark:bg-slate-900/50 dark:border-slate-800">
            <span class="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center
                         bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400">Ubicación</p>
              <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ info.location }}</p>
            </div>
          </div>
        </aside>

        <app-contact-form />
      </div>
    </section>
  `
})
export class ContactPage {
  protected readonly info = PERSONAL_INFO;
}
