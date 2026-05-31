import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { PERSONAL_INFO } from '../../core/constants/personal-info';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-40 backdrop-blur border-b
                   bg-white/80 border-slate-200
                   dark:bg-slate-950/80 dark:border-slate-800">
      <nav class="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a routerLink="/" class="font-bold text-slate-900 dark:text-slate-100">
          {{ alias }}<span class="text-brand-500">.</span>
        </a>

        <div class="flex items-center gap-6">
          <ul class="hidden md:flex items-center gap-6 text-sm font-medium
                     text-slate-600 dark:text-slate-400">
            <li>
              <a routerLink="/"
                 routerLinkActive="text-brand-600 dark:text-brand-400"
                 [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
            </li>
            <li>
              <a routerLink="/experiencia"
                 routerLinkActive="text-brand-600 dark:text-brand-400">Experiencia</a>
            </li>
            <li>
              <a routerLink="/portafolio"
                 routerLinkActive="text-brand-600 dark:text-brand-400">Portafolio</a>
            </li>
            <li>
              <a routerLink="/contacto"
                 routerLinkActive="text-brand-600 dark:text-brand-400">Contacto</a>
            </li>
          </ul>

          <button
            type="button"
            class="p-2 rounded-lg transition-colors
                   text-slate-600 hover:bg-slate-100
                   dark:text-slate-300 dark:hover:bg-slate-800"
            [attr.aria-label]="theme.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            (click)="theme.toggle()">
            @if (theme.isDark()) {
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/><path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/><path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            }
          </button>
        </div>
      </nav>
    </header>
  `
})
export class Navbar {
  protected readonly alias = PERSONAL_INFO.alias;
  protected readonly theme = inject(ThemeService);
}
