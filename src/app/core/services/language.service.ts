import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

import { TRANSLATIONS, TranslationKey } from '../i18n/translations';

export type Lang = 'es' | 'en';

/** Texto en los dos idiomas del sitio. */
export interface Localized {
  es: string;
  en: string;
}

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  private readonly _lang = signal<Lang>(this.readInitialLang());

  readonly lang = this._lang.asReadonly();
  readonly isEnglish = computed(() => this._lang() === 'en');

  constructor() {
    effect(() => {
      const lang = this._lang();
      this.document.documentElement.lang = lang;
      try {
        this.document.defaultView?.localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // localStorage no disponible (modo privado)
      }
    });
  }

  set(lang: Lang): void {
    this._lang.set(lang);
  }

  toggle(): void {
    this._lang.update(l => (l === 'es' ? 'en' : 'es'));
  }

  /** Texto de interfaz por clave. Se re-evalúa cuando cambia el idioma. */
  t(key: TranslationKey): string {
    return TRANSLATIONS[key][this._lang()];
  }

  /** Elige el idioma actual de un texto bilingüe. */
  pick(text: Localized): string {
    return text[this._lang()];
  }

  private readInitialLang(): Lang {
    const win = this.document.defaultView;
    if (!win) return 'es';
    try {
      const stored = win.localStorage.getItem(STORAGE_KEY);
      if (stored === 'es' || stored === 'en') return stored;
    } catch {
      // ignorar
    }
    return win.navigator?.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
  }
}
