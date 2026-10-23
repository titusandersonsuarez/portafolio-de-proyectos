import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy,
  PLATFORM_ID, inject, input, viewChildren
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Nombre con tipografía variable: cada letra gana peso cuando el cursor se acerca
 * y la palabra se comprime al hacer scroll. En pantallas táctiles hace una onda al cargar.
 * Con "reducir movimiento" se queda estático.
 */
@Component({
  selector: 'app-kinetic-name',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="sr-only">{{ lines().join(' ') }}</span>
    <span aria-hidden="true" class="block">
      @for (line of lines(); track $index; let li = $index) {
        <span class="kn-line block whitespace-nowrap">
          @for (ch of chars(line); track $index) {
            <span #letter class="kn-letter inline-block">{{ ch === ' ' ? ' ' : ch }}</span>
          }
        </span>
      }
    </span>
  `,
  styles: [`
    :host { display: block; font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
    .kn-letter {
      font-variation-settings: 'wght' var(--w, 700), 'opsz' 96;
      will-change: font-variation-settings, transform;
    }
  `]
})
export class KineticName implements AfterViewInit, OnDestroy {
  readonly lines = input.required<string[]>();

  private readonly letters = viewChildren<ElementRef<HTMLSpanElement>>('letter');
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private raf = 0;
  private pointer: { x: number; y: number } | null = null;
  private weights: number[] = [];
  private cleanup: Array<() => void> = [];

  protected chars(line: string): string[] {
    return [...line];
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const els = this.letters().map(l => l.nativeElement);
    this.weights = els.map(() => 300);
    const canHover = window.matchMedia('(hover: hover)').matches;
    const start = performance.now();

    this.zone.runOutsideAngular(() => {
      const onMove = (e: PointerEvent) => { this.pointer = { x: e.clientX, y: e.clientY }; };
      const onLeave = () => { this.pointer = null; };
      if (canHover) {
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);
        this.cleanup.push(() => {
          window.removeEventListener('pointermove', onMove);
          document.removeEventListener('pointerleave', onLeave);
        });
      }

      const tick = (now: number) => {
        const t = (now - start) / 1000;
        const rects = els.map(el => el.getBoundingClientRect());
        const hostRect = this.host.nativeElement.getBoundingClientRect();

        els.forEach((el, i) => {
          // Entrada: onda de izquierda a derecha durante el primer segundo y medio.
          const intro = Math.min(1, Math.max(0, (t - i * 0.045) / 0.5));
          let target = 300 + 450 * intro; // reposo: 750

          if (this.pointer) {
            const r = rects[i];
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            const d = Math.hypot(this.pointer.x - cx, this.pointer.y - cy);
            const f = Math.max(0, 1 - d / 420);
            const smooth = f * f * (3 - 2 * f);
            target = 380 + 440 * smooth;
          } else if (!canHover && t > 1.6) {
            // Táctil: respiración lenta que recorre la palabra.
            target = 600 + 180 * Math.sin(t * 1.6 - i * 0.35);
          }

          this.weights[i] += (target - this.weights[i]) * 0.18;
          el.style.setProperty('--w', this.weights[i].toFixed(0));
        });

        // Scroll: la palabra se comprime y sube a medida que sales del hero.
        const p = Math.min(1, Math.max(0, -hostRect.top / (hostRect.height * 2.2)));
        this.host.nativeElement.style.transform = `translateY(${(-p * 40).toFixed(1)}px)`;
        this.host.nativeElement.style.letterSpacing = `${(-0.02 - p * 0.06).toFixed(3)}em`;
        this.host.nativeElement.style.opacity = (1 - p * 0.85).toFixed(3);

        this.raf = requestAnimationFrame(tick);
      };
      this.raf = requestAnimationFrame(tick);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.cleanup.forEach(fn => fn());
  }
}
