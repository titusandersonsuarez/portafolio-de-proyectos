import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-tech-filter',
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-sm font-medium text-slate-500 dark:text-slate-400 mr-1">
        Filtrar:
      </span>

      @for (tech of techs(); track tech) {
        @let isActive = active().has(tech);
        <button
          type="button"
          (click)="toggle.emit(tech)"
          [attr.aria-pressed]="isActive"
          class="px-3 py-1 text-sm rounded-full border transition-colors"
          [class]="isActive
            ? 'bg-brand-600 text-white border-brand-600 hover:bg-brand-700'
            : 'bg-white text-slate-700 border-slate-200 hover:border-brand-400 hover:text-brand-600
               dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:border-brand-500 dark:hover:text-brand-300'">
          {{ tech }}
        </button>
      }

      @if (hasActive()) {
        <button
          type="button"
          (click)="clear.emit()"
          class="ml-1 px-3 py-1 text-sm rounded-full inline-flex items-center gap-1
                 text-slate-500 hover:text-slate-700
                 dark:text-slate-400 dark:hover:text-slate-200">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
          Limpiar
        </button>
      }
    </div>
  `
})
export class TechFilter {
  readonly techs = input.required<string[]>();
  readonly active = input.required<ReadonlySet<string>>();

  readonly toggle = output<string>();
  readonly clear = output<void>();

  protected readonly hasActive = computed(() => this.active().size > 0);
}
