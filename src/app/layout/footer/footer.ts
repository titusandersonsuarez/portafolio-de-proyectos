import { Component } from '@angular/core';

import { PERSONAL_INFO } from '../../core/constants/personal-info';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="mt-16 border-t
                   bg-white border-slate-200
                   dark:bg-slate-950 dark:border-slate-800">
      <div class="mx-auto max-w-6xl px-4 py-8 space-y-5">

        <ul class="flex flex-wrap items-center justify-center gap-3">
          <li>
            <a [href]="'mailto:' + info.email" aria-label="Email"
               class="flex items-center justify-center w-10 h-10 rounded-lg transition-colors
                      text-slate-500 hover:bg-slate-100 hover:text-brand-600
                      dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-10 5L2 7"/>
              </svg>
            </a>
          </li>
          @if (info.github) {
            <li>
              <a [href]="info.github" target="_blank" rel="noopener" aria-label="GitHub"
                 class="flex items-center justify-center w-10 h-10 rounded-lg transition-colors
                        text-slate-500 hover:bg-slate-100 hover:text-brand-600
                        dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.78-.25.78-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                </svg>
              </a>
            </li>
          }
          @if (info.linkedin) {
            <li>
              <a [href]="info.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"
                 class="flex items-center justify-center w-10 h-10 rounded-lg transition-colors
                        text-slate-500 hover:bg-slate-100 hover:text-brand-600
                        dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9z"/>
                </svg>
              </a>
            </li>
          }
          <li>
            <a [href]="info.whatsapp.url" target="_blank" rel="noopener" aria-label="WhatsApp"
               class="flex items-center justify-center w-10 h-10 rounded-lg transition-colors
                      text-slate-500 hover:bg-slate-100 hover:text-brand-600
                      dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
          </li>
          <li>
            <a [href]="info.instagram.url" target="_blank" rel="noopener" aria-label="Instagram"
               class="flex items-center justify-center w-10 h-10 rounded-lg transition-colors
                      text-slate-500 hover:bg-slate-100 hover:text-brand-600
                      dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </li>
        </ul>

        <div class="text-sm flex flex-col md:flex-row items-center justify-between gap-2
                    text-slate-500 dark:text-slate-400">
          <p>&copy; {{ year }} {{ name }} — Bucaramanga, Colombia</p>
          <p class="text-slate-400 dark:text-slate-500">Built with Angular {{ angularVersion }} + Tailwind</p>
        </div>
      </div>
    </footer>
  `
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly name = PERSONAL_INFO.name;
  protected readonly info = PERSONAL_INFO;
  protected readonly angularVersion = 21;
}
