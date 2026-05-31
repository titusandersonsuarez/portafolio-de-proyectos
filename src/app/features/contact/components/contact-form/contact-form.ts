import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { environment } from '../../../../../environments/environment';

type SubmitStatus = 'idle' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" novalidate
          class="p-6 rounded-xl border shadow-sm space-y-4
                 bg-white border-slate-200
                 dark:bg-slate-900 dark:border-slate-800">

      <div>
        <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Nombre
        </label>
        <input id="name" type="text" formControlName="name" autocomplete="name"
               class="mt-1 block w-full px-3 py-2 rounded-lg border text-sm
                      bg-white border-slate-300 text-slate-900
                      focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
                      dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"/>
        @if (showError('name', 'required')) {
          <p class="mt-1 text-xs text-red-600 dark:text-red-400">El nombre es obligatorio.</p>
        }
        @if (showError('name', 'minlength')) {
          <p class="mt-1 text-xs text-red-600 dark:text-red-400">Mínimo 2 caracteres.</p>
        }
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email
        </label>
        <input id="email" type="email" formControlName="email" autocomplete="email"
               class="mt-1 block w-full px-3 py-2 rounded-lg border text-sm
                      bg-white border-slate-300 text-slate-900
                      focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
                      dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"/>
        @if (showError('email', 'required')) {
          <p class="mt-1 text-xs text-red-600 dark:text-red-400">El email es obligatorio.</p>
        }
        @if (showError('email', 'email')) {
          <p class="mt-1 text-xs text-red-600 dark:text-red-400">Formato de email inválido.</p>
        }
      </div>

      <div>
        <label for="subject" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Asunto
        </label>
        <input id="subject" type="text" formControlName="subject"
               class="mt-1 block w-full px-3 py-2 rounded-lg border text-sm
                      bg-white border-slate-300 text-slate-900
                      focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
                      dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"/>
        @if (showError('subject', 'required')) {
          <p class="mt-1 text-xs text-red-600 dark:text-red-400">El asunto es obligatorio.</p>
        }
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Mensaje
        </label>
        <textarea id="message" formControlName="message" rows="5"
                  class="mt-1 block w-full px-3 py-2 rounded-lg border text-sm resize-y
                         bg-white border-slate-300 text-slate-900
                         focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
                         dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"></textarea>
        @if (showError('message', 'required')) {
          <p class="mt-1 text-xs text-red-600 dark:text-red-400">El mensaje es obligatorio.</p>
        }
        @if (showError('message', 'minlength')) {
          <p class="mt-1 text-xs text-red-600 dark:text-red-400">Mínimo 10 caracteres.</p>
        }
      </div>

      @if (status() === 'success') {
        <p class="text-sm p-3 rounded-lg bg-green-50 text-green-700 border border-green-200
                  dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
          ✓ Mensaje enviado. Te contesto pronto.
        </p>
      }
      @if (status() === 'error') {
        <p class="text-sm p-3 rounded-lg bg-red-50 text-red-700 border border-red-200
                  dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
          Hubo un error al enviar. Intenta de nuevo o escríbeme directo al email.
        </p>
      }

      <button type="submit" [disabled]="submitting()"
              class="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg font-medium
                     bg-brand-600 text-white hover:bg-brand-700 transition-colors
                     disabled:opacity-60 disabled:cursor-not-allowed">
        @if (submitting()) {
          <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke-linecap="round"/>
          </svg>
          Enviando…
        } @else {
          Enviar mensaje
        }
      </button>
    </form>
  `
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  protected readonly submitting = signal(false);
  protected readonly status = signal<SubmitStatus>('idle');

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.status.set('idle');

    try {
      const res = await fetch(environment.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(this.form.getRawValue())
      });

      if (!res.ok) throw new Error(`Formspree returned ${res.status}`);

      this.status.set('success');
      this.form.reset();
    } catch {
      this.status.set('error');
    } finally {
      this.submitting.set(false);
    }
  }

  protected showError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!ctrl && ctrl.touched && ctrl.hasError(error);
  }
}
