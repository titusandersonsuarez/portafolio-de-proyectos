import { Component } from '@angular/core';

import { PERSONAL_INFO } from '../../core/constants/personal-info';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="mt-16 border-t
                   bg-white border-slate-200
                   dark:bg-slate-950 dark:border-slate-800">
      <div class="mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-2
                  text-slate-500 dark:text-slate-400">
        <p>&copy; {{ year }} {{ name }} — Bucaramanga, Colombia</p>
        <p class="text-slate-400 dark:text-slate-500">Built with Angular {{ angularVersion }} + Tailwind</p>
      </div>
    </footer>
  `
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly name = PERSONAL_INFO.name;
  protected readonly angularVersion = 21;
}
