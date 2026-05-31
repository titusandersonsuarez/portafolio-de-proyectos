import { Component, computed, inject } from '@angular/core';

import { Skill, SkillCategory } from '../../../../core/models/skill.model';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  language:  'Lenguajes',
  framework: 'Frameworks',
  database:  'Bases de datos',
  tool:      'Herramientas',
  cloud:     'Cloud'
};

const CATEGORY_ORDER: SkillCategory[] = ['language', 'framework', 'database', 'tool', 'cloud'];

@Component({
  selector: 'app-skills-grid',
  imports: [ScrollAnimateDirective],
  template: `
    <section appScrollAnimate
             class="mx-auto max-w-6xl px-4 py-16 border-t
                    border-slate-200 dark:border-slate-800">
      <p class="text-brand-600 dark:text-brand-400 font-semibold tracking-wide text-sm">
        Skills
      </p>
      <h2 class="mt-2 text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
        Tecnologías con las que trabajo.
      </h2>

      <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        @for (group of groups(); track group.category) {
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider
                       text-slate-500 dark:text-slate-400">
              {{ group.label }}
            </h3>
            <ul class="mt-4 space-y-2">
              @for (skill of group.skills; track skill.name) {
                <li class="flex items-center gap-3 p-2.5 rounded-lg border
                           bg-white border-slate-200 hover:border-brand-300 hover:shadow-sm
                           dark:bg-slate-900 dark:border-slate-800 dark:hover:border-brand-700
                           transition-colors">
                  @if (skill.iconName) {
                    <img [src]="iconUrl(skill.iconName)"
                         [alt]="skill.name"
                         width="22" height="22"
                         class="flex-shrink-0"
                         loading="lazy"/>
                  }
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {{ skill.name }}
                  </span>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `
})
export class SkillsGrid {
  private readonly portfolio = inject(PortfolioService);

  protected readonly groups = computed<SkillGroup[]>(() => {
    const skills = this.portfolio.skills();
    return CATEGORY_ORDER
      .map(category => ({
        category,
        label: CATEGORY_LABELS[category],
        skills: skills.filter(s => s.category === category)
      }))
      .filter(group => group.skills.length > 0);
  });

  protected iconUrl(name: string): string {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;
  }
}
