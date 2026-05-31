import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PERSONAL_INFO } from '../../../../core/constants/personal-info';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden">
      <div class="mx-auto max-w-6xl px-4 py-20 md:py-28
                  grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 items-center">

        <div>
          <p class="text-brand-600 dark:text-brand-400 font-semibold tracking-wide">
            Hola, soy
          </p>
          <h1 class="mt-2 text-5xl md:text-7xl font-bold tracking-tight
                     text-slate-900 dark:text-slate-50 leading-[1.05]">
            Anderson<br/>Suárez<span class="text-brand-500">.</span>
          </h1>
          <p class="mt-6 text-xl text-slate-700 dark:text-slate-300 font-medium">
            {{ info.role }}
          </p>
          <p class="mt-3 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
            {{ info.tagline }}
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/portafolio"
               class="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium
                      bg-brand-600 text-white hover:bg-brand-700 transition-colors
                      shadow-sm shadow-brand-600/30">
              Ver proyectos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
            <a routerLink="/contacto"
               class="inline-flex items-center px-5 py-3 rounded-lg font-medium border transition-colors
                      border-slate-300 text-slate-700 hover:bg-slate-100
                      dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
              Contactar
            </a>
          </div>
        </div>

        <div class="relative justify-self-center md:justify-self-end">
          <div class="absolute -inset-4 bg-brand-500/20 dark:bg-brand-500/10 rounded-3xl blur-2xl"
               aria-hidden="true"></div>
          <div class="relative w-56 h-56 md:w-72 md:h-72 rounded-3xl overflow-hidden
                      border-2 shadow-xl
                      border-white dark:border-slate-800
                      bg-slate-100 dark:bg-slate-800">
            <img [src]="photoUrl"
                 [alt]="'Foto de ' + info.name"
                 class="w-full h-full object-cover"
                 loading="eager"/>
          </div>
        </div>

      </div>
    </section>
  `
})
export class Hero {
  protected readonly info = PERSONAL_INFO;
  protected readonly photoUrl = PERSONAL_INFO.photoUrl;
}
