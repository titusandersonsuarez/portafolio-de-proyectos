import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PERSONAL_INFO } from '../../core/constants/personal-info';
import { TranslationKey } from '../../core/i18n/translations';
import { LanguageService } from '../../core/services/language.service';
import { ThemeService } from '../../core/services/theme.service';

interface NavLink {
  path: string;
  label: TranslationKey;
  exact: boolean;
}

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

        <div class="flex items-center gap-2 md:gap-6">
          <ul class="hidden md:flex items-center gap-6 text-sm font-medium
                     text-slate-600 dark:text-slate-400">
            @for (link of links; track link.path) {
              <li>
                <a [routerLink]="link.path"
                   routerLinkActive="text-brand-600 dark:text-brand-400"
                   [routerLinkActiveOptions]="{ exact: link.exact }">{{ i18n.t(link.label) }}</a>
              </li>
            }
          </ul>

          <div class="flex items-center gap-1">
            <button
              type="button"
              class="h-9 px-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors
                     text-slate-600 hover:bg-slate-100
                     dark:text-slate-300 dark:hover:bg-slate-800"
              [attr.aria-label]="i18n.t('nav.switchLang')"
              [title]="i18n.t('nav.switchLang')"
              (click)="i18n.toggle()">
              <span [class]="i18n.isEnglish() ? '' : 'text-brand-600 dark:text-brand-400'">ES</span>
              <span class="text-slate-300 dark:text-slate-600 mx-0.5">/</span>
              <span [class]="i18n.isEnglish() ? 'text-brand-600 dark:text-brand-400' : ''">EN</span>
            </button>

            <button
              type="button"
              class="p-2 rounded-lg transition-colors
                     text-slate-600 hover:bg-slate-100
                     dark:text-slate-300 dark:hover:bg-slate-800"
              [attr.aria-label]="theme.isDark() ? i18n.t('nav.toLight') : i18n.t('nav.toDark')"
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

            <button
              type="button"
              class="md:hidden p-2 rounded-lg transition-colors
                     text-slate-600 hover:bg-slate-100
                     dark:text-slate-300 dark:hover:bg-slate-800"
              [attr.aria-label]="menuOpen() ? i18n.t('nav.closeMenu') : i18n.t('nav.openMenu')"
              [attr.aria-expanded]="menuOpen()"
              aria-controls="mobile-menu"
              (click)="menuOpen.set(!menuOpen())">
              @if (menuOpen()) {
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              } @else {
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16"/>
                </svg>
              }
            </button>
          </div>
        </div>
      </nav>

      @if (menuOpen()) {
        <ul id="mobile-menu"
            class="md:hidden border-t px-4 py-2 text-base font-medium
                   border-slate-200 bg-white text-slate-700
                   dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
          @for (link of links; track link.path) {
            <li>
              <a [routerLink]="link.path"
                 routerLinkActive="text-brand-600 dark:text-brand-400"
                 [routerLinkActiveOptions]="{ exact: link.exact }"
                 class="block py-3">{{ i18n.t(link.label) }}</a>
            </li>
          }
        </ul>
      }
    </header>
  `
})
export class Navbar {
  protected readonly alias = PERSONAL_INFO.alias;
  protected readonly theme = inject(ThemeService);
  protected readonly i18n = inject(LanguageService);
  protected readonly menuOpen = signal(false);

  protected readonly links: NavLink[] = [
    { path: '/', label: 'nav.home', exact: true },
    { path: '/experiencia', label: 'nav.experience', exact: false },
    { path: '/portafolio', label: 'nav.portfolio', exact: false },
    { path: '/contacto', label: 'nav.contact', exact: false }
  ];

  constructor() {
    inject(Router).events
      .pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.menuOpen.set(false));
  }
}
