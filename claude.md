# CLAUDE.md — anderson-portfolio

## Contexto del proyecto
Portafolio personal de **Anderson David Suárez Bernal**, estudiante de último semestre de Ingeniería de Sistemas en UTS (Bucaramanga, Colombia) y Junior Software Developer con ~1.5 años de experiencia en CreandoSoft.

El objetivo es tener una **SPA profesional desplegada en GitHub Pages** que sirva como presentación personal, CV interactivo y portafolio de proyectos funcionales.

---

## Stack técnico

- **Framework:** Angular 21+ (standalone components, signals — sin NgModules)
- **Estilos:** Tailwind CSS v3
- **Lenguaje:** TypeScript strict
- **Package manager:** pnpm (único permitido en este repo)
- **Testing:** Vitest + jsdom (configurado por el scaffold de Angular 21)
- **Deploy:** GitHub Pages vía `angular-cli-ghpages`
- **Containerización:** Docker (dev con hot reload + prod con nginx)
- **Node:** >= 20

---

## Arquitectura

**Feature-based + Standalone components.** No se usa MVC clásico (es un patrón server-side) ni NgModules (deprecados a favor de standalone). El modelo es:

- **Modelo** → interfaces en `core/models/` + estado en servicios (`signal()` / `computed()`)
- **Vista** → templates HTML de los componentes
- **Lógica de presentación** → clase TypeScript del componente
- **Lógica de negocio / datos** → servicios en `core/services/` o servicios locales de feature

Cada **feature** es una carpeta autocontenida con sus componentes, servicios locales y rutas hijas. Esto facilita borrar/mover features completas sin romper otras.

---

## Estructura de carpetas

```
src/
├── app/
│   ├── core/                       # singleton: modelos, servicios globales, guards, interceptors
│   │   ├── constants/
│   │   │   └── personal-info.ts
│   │   ├── models/
│   │   │   ├── project.model.ts
│   │   │   ├── experience.model.ts
│   │   │   └── skill.model.ts
│   │   └── services/
│   │       └── portfolio.service.ts
│   │
│   ├── shared/                     # reutilizable entre features (sin estado de negocio)
│   │   ├── ui/                     # componentes presentacionales puros
│   │   ├── directives/
│   │   │   └── scroll-animate.directive.ts
│   │   └── pipes/
│   │
│   ├── features/                   # cada página = feature autocontenida
│   │   ├── home/
│   │   │   ├── components/         # subcomponentes solo de home (hero, about, skills-grid)
│   │   │   ├── home.page.ts
│   │   │   └── home.routes.ts
│   │   ├── experience/
│   │   │   ├── components/         # timeline-item
│   │   │   ├── experience.page.ts
│   │   │   └── experience.routes.ts
│   │   ├── portfolio/
│   │   │   ├── components/         # project-card, project-modal, tech-filter
│   │   │   ├── portfolio.page.ts
│   │   │   └── portfolio.routes.ts
│   │   └── contact/
│   │       ├── contact.page.ts
│   │       └── contact.routes.ts
│   │
│   ├── layout/                     # shells de la aplicación
│   │   ├── navbar/navbar.ts
│   │   └── footer/footer.ts
│   │
│   ├── app.ts                      # root component
│   ├── app.html                    # shell: navbar + router-outlet + footer
│   ├── app.config.ts               # providers globales (router, http, etc.)
│   └── app.routes.ts               # rutas raíz con loadChildren
│
├── styles.css                      # @tailwind base/components/utilities
└── ...

public/                             # assets estáticos (reemplaza a src/assets/ en Angular 17+)
├── projects/                       # HTML de proyectos embebibles
└── img/

docker/
└── nginx.conf                      # config nginx para la imagen prod

Dockerfile                          # multi-stage: deps → build → dev → runtime
docker-compose.yml                  # servicios: dev (hot reload) y prod (nginx)
tailwind.config.js
postcss.config.js
```

### Reglas de dependencias entre capas

```
features → shared → core
features → core
layout   → shared → core
```

- `core/` **no** importa de `shared/` ni de `features/`
- `shared/` **no** importa de `features/`
- Una `feature` **no** importa de otra `feature` (si necesitan algo común, sube a `shared/` o `core/`)

---

## Convenciones

- Todos los componentes son **standalone** (en Angular 21 es el default; no se declara `standalone: true`)
- Estado reactivo con **signals** (`signal()`, `computed()`, `effect()`)
- Estilos con clases **Tailwind** en el template; nada de styles inline salvo animaciones
- Naming: `camelCase` para variables, `PascalCase` para clases, `kebab-case` para archivos
- **Sin sufijo `Component`** en clases (estilo Angular 20+): `Navbar`, no `NavbarComponent`
- Componentes-página: clase `HomePage` en archivo `home.page.ts`
- Componentes reutilizables: clase `ProjectCard` en archivo `project-card.ts`
- Sin lógica de negocio en componentes: la data viene de `PortfolioService` (inyectado con `inject()`)
- **Lazy loading** en todas las rutas de página (vía `loadChildren` + `*.routes.ts` de cada feature)
- Servicios singleton se exponen como signals públicos read-only (`signal()` privado → `asReadonly()`)

---

## Docker

El `Dockerfile` es multi-stage con 4 etapas:

| Stage      | Base               | Propósito                                            |
|------------|--------------------|------------------------------------------------------|
| `deps`     | node:20-alpine     | Solo instala dependencias con pnpm (capa cacheable)  |
| `build`    | node:20-alpine     | Construye el bundle production (`pnpm build`)        |
| `dev`      | node:20-alpine     | `ng serve --host 0.0.0.0` para desarrollo containerizado |
| `runtime`  | nginx:1.27-alpine  | Sirve los archivos estáticos del bundle con nginx    |

`docker-compose.yml` expone dos servicios:

- **`dev`** — monta `./src`, `./public` y configs como volúmenes para hot reload. Puerto `4200:4200`.
- **`prod`** — construye el bundle y lo sirve con nginx. Puerto `8080:80`. Tiene fallback SPA en `nginx.conf` (`try_files $uri $uri/ /index.html`).

```bash
docker compose up dev               # http://localhost:4200
docker compose up --build prod      # http://localhost:8080
```

---

## Modelos principales

```typescript
// core/models/project.model.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  type: 'embeddable' | 'backend' | 'fullstack';
  embedPath?: string;     // ruta al HTML en assets/projects/
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

// core/models/experience.model.ts
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
  techStack?: string[];
}
```

---

## Proyectos iniciales del portafolio

| ID                | Título                          | Tipo        | Tecnologías                                |
|-------------------|---------------------------------|-------------|--------------------------------------------|
| commerce-flow     | CommerceFlow                    | fullstack   | Angular 17, .NET 8, PostgreSQL, Docker     |
| game-engine       | Game Engine GoF                 | backend     | Java, Patrones GoF (8 patrones)            |
| traffic-analysis  | Análisis Accidentes Bucaramanga | embeddable  | Python, Pandas, Matplotlib                 |
| ordento-api       | Ordento API                     | backend     | NestJS, Prisma, PostgreSQL, Docker         |

---

## Datos personales (para el servicio)

```typescript
export const PERSONAL_INFO = {
  name: 'Anderson David Suárez Bernal',
  alias: 'Titus',
  role: 'Full Stack Developer · Systems Engineering Student',
  location: 'Bucaramanga, Colombia',
  email: '',          // completar
  github: '',         // completar
  linkedin: '',       // completar
  summary: `Estudiante de último semestre de Ingeniería de Sistemas en UTS
    con ~1.5 años de experiencia como Junior Developer en CreandoSoft,
    desarrollando aplicaciones web en el sector salud. Stack principal:
    Java, Spring Boot, Angular, .NET Core, PostgreSQL y Docker.`
};
```

---

## Fases de desarrollo

### ✅ Fase 1 — Scaffold (COMPLETADA)

- [x] Crear proyecto Angular 21 con pnpm (routing, css, sin SSR, standalone)
- [x] Instalar y configurar Tailwind CSS v3 (`tailwind.config.js`, `postcss.config.js`, directivas en `styles.css`)
- [x] Crear estructura `core/ · shared/ · features/ · layout/`
- [x] Configurar `app.routes.ts` con `loadChildren` para cada feature
- [x] Crear `PortfolioService` con datos estáticos (projects, experiences, skills) usando signals
- [x] Implementar `Navbar` y `Footer` en `layout/` con Tailwind
- [x] Crear `Dockerfile` multi-stage (dev + prod) y `docker-compose.yml`
- [x] Verificar build production: `pnpm build` ✅ (66 kB initial, features lazy)
- [ ] Instalar `angular-cli-ghpages`: `pnpm add -D angular-cli-ghpages` (queda para Fase 5)

### ✅ Fase 2 — Hero + Sobre mí (COMPLETADA)

- [x] `Hero` con layout asimétrico (texto izquierda, foto derecha) + 2 CTAs
- [x] `About` con resumen + stats (años exp, proyectos, skills count)
- [x] `SkillsGrid` agrupado por categoría con íconos de Devicons CDN
- [x] `ScrollAnimateDirective` aplicada a `About` y `SkillsGrid`
- [x] **Dark mode** con toggle en navbar (`ThemeService` + signal + localStorage)
- [x] Variantes `dark:` aplicadas en todas las páginas (home, experience, portfolio, contact) y layout
- [x] Foto placeholder en `public/img/profile.svg` (reemplazar con foto real)
- [x] Build verificado: 68.64 kB initial, home.page lazy en 7.33 kB

> ⚠️ **Sin verificación visual.** No se pudo abrir browser desde el agente. Correr `pnpm start` y revisar:
> 1. Hero se ve bien en mobile (md:grid-cols-[1.3fr_1fr] colapsa a 1 columna)
> 2. Toggle dark/light persiste tras refresh (localStorage)
> 3. Íconos Devicons cargan (requiere red, son CDN externo)

### ✅ Fase 3 — Experiencia & Educación (COMPLETADA)

- [x] `TimelineItem` con input signal (`input.required<Experience>()`), dot + card
- [x] Línea vertical izquierda (div absoluto) con dots por item; verde brand para trabajo, amber para educación
- [x] Datos ya estaban en `PortfolioService`: CreandoSoft (trabajo) + UTS (educación)
- [x] Responsive: layout single-line es naturalmente mobile-friendly (no se rompe en pantallas pequeñas)
- [x] `appScrollAnimate` aplicada al contenedor del timeline
- [x] Build verificado: experience-page lazy en 3.49 kB

### ✅ Fase 4 — Portafolio de proyectos (COMPLETADA)

- [x] `ProjectCard` con badge de tipo, chip "Destacado" si `featured: true`, hover lift + arrow CTA
- [x] `ProjectPanel` side-panel desde la derecha (max-w-[640px]) con backdrop blur, slide animado, ESC para cerrar, body scroll lock
- [x] Iframe sandbox para proyectos `embeddable` (con `DomSanitizer.bypassSecurityTrustResourceUrl`)
- [x] Sección informativa + link a GitHub + botón "Abrir demo" para `backend`/`fullstack`
- [x] `TechFilter` con chips toggleables (OR lógico), botón "Limpiar" cuando hay activos
- [x] Estado orquestado en `PortfolioPage` con signals (`activeTechs: Set<string>`, `selectedProject`, `filteredProjects: computed`)
- [x] Empty state cuando los filtros no matchean ningún proyecto
- [x] Build verificado: portfolio-page lazy en 13.96 kB (4.09 kB transfer)

> 📝 **Pendiente cuando subas proyectos reales:**
> - Completar `githubUrl` y `demoUrl` en cada `Project` del `PortfolioService`
> - Para `traffic-analysis` (único embeddable): subir el HTML del análisis a `public/projects/traffic-analysis.html`

### ✅ Fase 5 — Contacto + Deploy (COMPLETADA)

- [x] `ContactForm` con Reactive Forms (`FormBuilder.nonNullable.group`), validación visual on-touch
- [x] Envío vía POST a Formspree con `fetch`, estados `submitting`/`success`/`error` como signals
- [x] `ContactPage` 2 columnas: sidebar con email/github/linkedin/ubicación + form
- [x] `PERSONAL_INFO` completado con email + github reales (linkedin pendiente)
- [x] `base-href: /portafolio-de-proyectos/` en `angular.json` (solo configuración production, dev sigue en `/`)
- [x] `angular-cli-ghpages` instalado, script `pnpm deploy` configurado
- [x] GitHub Actions workflow en `.github/workflows/deploy.yml` (build → upload-pages-artifact → deploy-pages)
- [x] SPA fallback en CI: copia `index.html` → `404.html` antes de deploy
- [x] `<title>` e `<meta description>` reales en `src/index.html`
- [x] Build verificado: contact-page lazy en 43.68 kB (10.21 kB transfer)
- [ ] Lighthouse: verificar manualmente cuando esté deployed (objetivo >90)

> 🚀 **Setup antes del primer deploy:**
> 1. **Formspree:**
>    - Crear cuenta en https://formspree.io/ y crear un form nuevo
>    - Copiar el endpoint (formato `https://formspree.io/f/xxxxxxxx`)
>    - Reemplazar `YOUR_FORM_ID` en `src/environments/environment.ts`
>    - En el dashboard de Formspree, restringir el dominio permitido a `https://titusandersonsuarez.github.io`
> 2. **GitHub Pages — habilitar GitHub Actions como source:**
>    - Repo → Settings → Pages → Source = "GitHub Actions"
>    - El primer push a `main` desplegará automáticamente
>    - URL final: https://titusandersonsuarez.github.io/portafolio-de-proyectos/
> 3. **Deploy manual (alternativa):** `pnpm deploy` (usa angular-cli-ghpages, pushea a la branch `gh-pages`).
>    Si usas este método, cambiar Pages Source a "Deploy from branch → gh-pages".

> 📝 **Pendiente tuyo:**
> - LinkedIn URL en `personal-info.ts` (línea `linkedin: ''`)
> - Foto real en `public/img/profile.svg` (o subir otra foto y cambiar `photoUrl`)
> - Endpoint real de Formspree en `environment.ts`

---

## Comandos frecuentes

> ⚠️ **Solo pnpm en este repo.** No usar `npm install` ni `yarn`.

```bash
# Local
pnpm install                                      # instalar deps
pnpm start                                        # = ng serve, dev en http://localhost:4200
pnpm build                                        # build production
pnpm test                                         # vitest

# Generación de código (recordar usar la ruta de feature correcta)
pnpm ng generate component features/portfolio/components/project-card
pnpm ng generate component shared/ui/button
pnpm ng generate service core/services/portfolio
pnpm ng generate directive shared/directives/scroll-animate

# Docker
docker compose up dev                             # dev con hot reload en :4200
docker compose up --build prod                    # prod nginx en :8080
docker compose down                               # detener todo

# Deploy (Fase 5)
pnpm ng deploy                                    # GitHub Pages (cuando se instale angular-cli-ghpages)
```

---

## Notas para Claude Code

- **Guiar una fase a la vez.** No avanzar a la siguiente sin confirmar con el usuario.
- Al inicio de cada sesión, leer este archivo para retomar contexto.
- Respetar las **reglas de dependencias entre capas** (features → shared → core).
- Cada feature debe exponer sus rutas en `*.routes.ts` y cargarse con `loadChildren` desde `app.routes.ts`.
- Priorizar código limpio y bien tipado sobre soluciones rápidas.
- Si hay dudas sobre diseño visual, preguntar antes de implementar.
- Los datos personales marcados como vacíos (`''`) deben ser completados por el usuario antes del deploy.
