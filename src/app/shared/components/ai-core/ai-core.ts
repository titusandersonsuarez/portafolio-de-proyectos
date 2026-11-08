import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy,
  PLATFORM_ID, inject, viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

/**
 * "Núcleo de IA": esfera wireframe con partículas en órbita.
 * - Gira hacia el cursor (o el dedo en táctil).
 * - Las partículas se apartan cuando el cursor se acerca.
 * - Clic / toque en el hero lanza un anillo de escaneo.
 * Se pausa fuera de pantalla o con la pestaña oculta, sigue el tema claro/oscuro
 * y con "reducir movimiento" se queda en un solo cuadro estático.
 */
@Component({
  selector: 'app-ai-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas class="block w-full h-full" aria-hidden="true"></canvas>`,
  styles: [`
    :host { display: block; pointer-events: none; opacity: 0; transition: opacity 1.2s ease; }
    :host(.ready) { opacity: 1; }
  `]
})
export class AiCore implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private renderer?: THREE.WebGLRenderer;
  private raf = 0;
  private cleanup: Array<() => void> = [];
  private disposables: Array<{ dispose(): void }> = [];

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.zone.runOutsideAngular(() => {
      try {
        this.init();
      } catch {
        // WebGL no disponible: el hero se ve igual sin el núcleo.
      }
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.cleanup.forEach(fn => fn());
    this.disposables.forEach(d => d.dispose());
    this.renderer?.dispose();
  }

  private init(): void {
    const canvas = this.canvasRef().nativeElement;
    const hostEl: HTMLElement = this.host.nativeElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 4 || window.matchMedia('(pointer: coarse)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowEnd, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 8;

    // ---------- Núcleo ----------
    const core = new THREE.Group();
    scene.add(core);
    const tilt = new THREE.Group(); // rotación hacia el cursor
    core.add(tilt);

    const outerGeo = new THREE.IcosahedronGeometry(1.55, 2);
    const outerMat = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.35 });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    tilt.add(outer);

    const innerGeo = new THREE.IcosahedronGeometry(0.95, 1);
    const innerMat = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.55 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    tilt.add(inner);

    const nodeTex = this.dotTexture();
    const nodesMat = new THREE.PointsMaterial({ size: 0.11, map: nodeTex, transparent: true, depthWrite: false });
    const nodes = new THREE.Points(innerGeo, nodesMat);
    inner.add(nodes);

    const heartGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const heartMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9 });
    const heart = new THREE.Mesh(heartGeo, heartMat);
    tilt.add(heart);

    const haloMat = new THREE.SpriteMaterial({ map: nodeTex, transparent: true, depthWrite: false, opacity: 0.55 });
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(2.2);
    tilt.add(halo);

    const ringGeo = new THREE.TorusGeometry(2.05, 0.008, 6, 160);
    const ringMatA = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5 });
    const ringMatB = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.35 });
    const ringA = new THREE.Mesh(ringGeo, ringMatA);
    const ringB = new THREE.Mesh(ringGeo, ringMatB);
    ringA.rotation.x = Math.PI / 2.4;
    ringB.rotation.set(Math.PI / 3, Math.PI / 4, 0);
    ringB.scale.setScalar(1.12);
    tilt.add(ringA, ringB);

    // ---------- Partículas en órbita ----------
    const COUNT = lowEnd ? 450 : 1100;
    const base = new Float32Array(COUNT * 3);   // posición de órbita
    const offset = new Float32Array(COUNT * 3); // desplazamiento por repulsión
    const speed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = 1.9 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      base[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
      base[i * 3 + 2] = r * Math.cos(phi);
      speed[i] = (0.08 + Math.random() * 0.22) * (Math.random() < 0.5 ? 1 : -1) / (r * 0.5);
    }
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(COUNT * 3);
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.055, map: nodeTex, transparent: true, depthWrite: false, opacity: 0.9 });
    const particles = new THREE.Points(pGeo, pMat);
    core.add(particles);

    // ---------- Anillos de escaneo ----------
    const scanGeo = new THREE.RingGeometry(0.98, 1, 96);
    const scans: Array<{ mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; t: number }> = [];
    let pulse = 0;

    this.disposables.push(outerGeo, outerMat, innerGeo, innerMat, nodesMat, nodeTex, heartGeo, heartMat,
      haloMat, ringGeo, ringMatA, ringMatB, pGeo, pMat, scanGeo);

    // ---------- Tema ----------
    const materials = { outerMat, innerMat, nodesMat, heartMat, haloMat, ringMatA, ringMatB, pMat };
    let scanColor = new THREE.Color();
    const applyTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      const brand = new THREE.Color(dark ? 0x58a5ff : 0x1664f0);
      const mint = new THREE.Color(dark ? 0x3ee0b0 : 0x0ea47a);
      const blend = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      materials.outerMat.color.copy(brand);
      materials.innerMat.color.copy(mint);
      materials.nodesMat.color.copy(mint);
      materials.heartMat.color.copy(mint);
      materials.haloMat.color.copy(mint);
      materials.ringMatA.color.copy(brand);
      materials.ringMatB.color.copy(mint);
      materials.pMat.color.copy(dark ? brand.clone().lerp(mint, 0.35) : brand);
      materials.haloMat.opacity = dark ? 0.55 : 0.25;
      Object.values(materials).forEach(m => { m.blending = blend; m.needsUpdate = true; });
      scanColor = mint;
      scans.forEach(s => s.mat.color.copy(mint));
    };
    applyTheme();
    const themeObserver = new MutationObserver(() => { applyTheme(); if (reduceMotion) render(0); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    this.cleanup.push(() => themeObserver.disconnect());

    // ---------- Tamaño y posición ----------
    let visibleW = 1;
    let visibleH = 1;
    const resize = () => {
      const w = hostEl.clientWidth || 1;
      const h = hostEl.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      visibleW = visibleH * camera.aspect;
      if (camera.aspect > 1.1) {
        // Escritorio: a la derecha, sin tapar el nombre.
        core.position.set(visibleW * 0.27, visibleH * 0.08, 0);
        core.scale.setScalar(Math.min(1.15, visibleH / 7));
        canvas.style.opacity = '1';
      } else {
        // Móvil: arriba a la derecha, más pequeño.
        core.position.set(visibleW * 0.22, visibleH * 0.26, 0);
        core.scale.setScalar(Math.min(0.8, visibleW / 6.5));
        canvas.style.opacity = '0.6'; // detrás del nombre: más tenue para que se lea
      }
      if (reduceMotion) render(0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(hostEl);
    this.cleanup.push(() => ro.disconnect());

    // ---------- Entrada del puntero ----------
    const pointer = new THREE.Vector2(0, 0);   // -1..1 relativo al canvas
    const pointerWorld = new THREE.Vector3(999, 999, 0);
    let pointerActive = false;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) { pointerActive = false; return; }
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
      pointerWorld.set(pointer.x * visibleW / 2, pointer.y * visibleH / 2, 0);
      pointerActive = true;
    };
    const onLeave = () => { pointerActive = false; };
    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, input, textarea, select')) return;
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      onMove(e);
      const mat = new THREE.MeshBasicMaterial({
        color: scanColor, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false,
        blending: document.documentElement.classList.contains('dark') ? THREE.AdditiveBlending : THREE.NormalBlending
      });
      const mesh = new THREE.Mesh(scanGeo, mat);
      mesh.quaternion.copy(camera.quaternion);
      core.add(mesh);
      scans.push({ mesh, mat, t: 0 });
      pulse = 1;
      if (reduceMotion) { core.remove(mesh); mat.dispose(); scans.pop(); }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    this.cleanup.push(() => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
    });

    // ---------- Render ----------
    const tmp = new THREE.Vector3();
    const local = new THREE.Vector3();
    let lastT = 0;
    let rotY = 0;

    const render = (time: number) => {
      const t = time / 1000;
      const dt = Math.min(0.05, t - lastT || 0.016);
      lastT = t;

      // Rotación propia + inclinación hacia el cursor.
      outer.rotation.y += dt * 0.12;
      outer.rotation.x += dt * 0.05;
      inner.rotation.y -= dt * 0.25;
      inner.rotation.z += dt * 0.1;
      ringA.rotation.z += dt * 0.35;
      ringB.rotation.z -= dt * 0.22;
      const aimX = pointerActive ? -pointer.y * 0.5 : 0;
      const aimY = pointerActive ? pointer.x * 0.7 : 0;
      tilt.rotation.x += (aimX - tilt.rotation.x) * 0.06;
      tilt.rotation.y += (aimY - tilt.rotation.y) * 0.06;

      // Latido del corazón + pulso del clic.
      pulse = Math.max(0, pulse - dt * 1.4);
      const beat = 1 + Math.sin(t * 2.4) * 0.06 + pulse * 0.6;
      heart.scale.setScalar(beat);
      halo.scale.setScalar(2.2 * beat + pulse * 1.5);

      // Partículas: órbita + repulsión del cursor.
      rotY += dt;
      local.copy(pointerWorld).sub(core.position).divideScalar(core.scale.x);
      const repel = pointerActive ? 1.3 : 0;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const a = rotY * speed[i];
        const c = Math.cos(a), s = Math.sin(a);
        const bx = base[i3] * c - base[i3 + 2] * s;
        const by = base[i3 + 1];
        const bz = base[i3] * s + base[i3 + 2] * c;

        let ox = offset[i3], oy = offset[i3 + 1], oz = offset[i3 + 2];
        if (repel) {
          const dx = bx + ox - local.x;
          const dy = by + oy - local.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < repel * repel) {
            const d = Math.sqrt(d2) || 0.001;
            const f = (1 - d / repel) * 0.28;
            ox += (dx / d) * f; oy += (dy / d) * f; oz += f * 0.4;
          }
        }
        // Explosión breve con el clic.
        if (pulse > 0.85) {
          tmp.set(bx, by, bz).normalize().multiplyScalar(0.12);
          ox += tmp.x; oy += tmp.y; oz += tmp.z;
        }
        ox *= 0.94; oy *= 0.94; oz *= 0.94;
        offset[i3] = ox; offset[i3 + 1] = oy; offset[i3 + 2] = oz;
        pPos[i3] = bx + ox; pPos[i3 + 1] = by + oy; pPos[i3 + 2] = bz + oz;
      }
      pGeo.attributes['position'].needsUpdate = true;

      // Anillos de escaneo que se expanden y desvanecen.
      for (let i = scans.length - 1; i >= 0; i--) {
        const sc = scans[i];
        sc.t += dt;
        const k = sc.t / 1.4;
        sc.mesh.scale.setScalar(0.4 + k * 4.2);
        sc.mat.opacity = Math.max(0, 0.9 * (1 - k));
        if (k >= 1) { core.remove(sc.mesh); sc.mat.dispose(); scans.splice(i, 1); }
      }

      renderer.render(scene, camera);
    };

    resize();

    if (reduceMotion) {
      render(0);
      hostEl.classList.add('ready');
      return;
    }

    // Pausa fuera de pantalla o con la pestaña oculta.
    let onScreen = true;
    const loop = (time: number) => { render(time); this.raf = requestAnimationFrame(loop); };
    const sync = () => {
      cancelAnimationFrame(this.raf);
      if (onScreen && !document.hidden) { lastT = 0; this.raf = requestAnimationFrame(loop); }
    };
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    io.observe(hostEl);
    document.addEventListener('visibilitychange', sync);
    this.cleanup.push(() => { io.disconnect(); document.removeEventListener('visibilitychange', sync); });

    requestAnimationFrame(() => hostEl.classList.add('ready'));
  }

  /** Textura circular suave para puntos y halo. */
  private dotTexture(): THREE.Texture {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.75)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }
}
