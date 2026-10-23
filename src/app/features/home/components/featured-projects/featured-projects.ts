import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, inject, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../../../core/services/language.service';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
  selector: 'app-featured-projects',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-6xl px-4 py-20">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="text-4xl md:text-6xl text-ink dark:text-slate-50" style="font-variation-settings:'wght' 700">
            {{ i18n.t('featured.title') }}
          </h2>
          <p class="mt-3 text-slate-600 dark:text-slate-400 max-w-xl">{{ i18n.t('featured.subtitle') }}</p>
        </div>
        <a routerLink="/portafolio"
           class="text-sm font-medium text-brand-600 dark:text-brand-400 underline underline-offset-4 decoration-mint-500/60 hover:decoration-mint-500">
          {{ i18n.t('featured.all') }}
        </a>
      </div>

      <ul #list class="mt-12 border-t border-slate-300 dark:border-slate-800" [class.is-in]="false">
        @for (p of projects(); track p.id; let i = $index) {
          <li class="row group border-b border-slate-300 dark:border-slate-800" [style.--i]="i">
            <div class="py-8 md:py-10 grid gap-5 md:grid-cols-[1.1fr_1fr] md:gap-10">
              <h3 class="row-title text-3xl md:text-5xl leading-[1.02] text-ink dark:text-slate-50">
                {{ shortTitle(p.title) }}
                <span class="block mt-2 text-base md:text-lg font-sans text-slate-500 dark:text-slate-400" style="font-variation-settings:normal">
                  {{ subtitle(p.title) }}
                </span>
                @if (p.imageUrl) {
                  <img [src]="p.imageUrl" [alt]="p.imageAlt ?? p.title" width="1200" height="750" loading="lazy"
                       class="shot mt-6 w-full rounded-xl border border-slate-300 dark:border-slate-800"/>
                }
              </h3>
              <div>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ p.description }}</p>
                <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  @for (tech of p.techStack; track tech; let last = $last) {
                    <span class="text-mint-600 dark:text-mint-400 font-medium">{{ tech }}</span>@if (!last) {<span>, </span>}
                  }
                </p>
                @if (p.githubUrl) {
                  <a [href]="p.githubUrl" target="_blank" rel="noopener noreferrer"
                     class="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border
                            border-ink text-ink hover:bg-ink hover:text-white
                            dark:border-slate-300 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-ink transition-colors">
                    {{ i18n.t('featured.code') }}
                  </a>
                }
              </div>
            </div>
          </li>
        }
      </ul>
    </section>
  `,
  styles: [`
    .row-title { font-variation-settings: 'wght' 560, 'opsz' 96; transition: font-variation-settings .45s cubic-bezier(.2,.7,.2,1); }
    .row:hover .row-title, .row:focus-within .row-title { font-variation-settings: 'wght' 800, 'opsz' 96; }
    .shot { transition: transform .5s cubic-bezier(.2,.7,.2,1); transform-origin: left center; }
    .row:hover .shot { transform: scale(1.015); }
    .row { opacity: 0; transform: translateY(28px); }
    ul.is-in .row {
      opacity: 1; transform: none;
      transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
      transition-delay: calc(var(--i) * 120ms);
    }
    @media (prefers-reduced-motion: reduce) { .row { opacity: 1; transform: none; } }
  `]
})
export class FeaturedProjects implements AfterViewInit, OnDestroy {
  protected readonly i18n = inject(LanguageService);
  protected readonly projects = inject(PortfolioService).featuredProjects;
  private readonly list = viewChild.required<ElementRef<HTMLUListElement>>('list');
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;

  protected shortTitle(t: string): string { return t.split(' — ')[0]; }
  protected subtitle(t: string): string { return t.split(' — ')[1] ?? ''; }

  ngAfterViewInit(): void {
    const el = this.list().nativeElement;
    if (!this.isBrowser || !('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    this.observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { el.classList.add('is-in'); this.observer?.disconnect(); }
    }, { threshold: 0.1 });
    this.observer.observe(el);
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}
