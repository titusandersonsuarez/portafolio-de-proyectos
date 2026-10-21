# Portafolio — Anderson Suárez

Sitio personal con mi experiencia, proyectos y datos de contacto.

**En vivo:** https://titusandersonsuarez.github.io/portafolio-de-proyectos/

## Stack

- Angular 21 (standalone components y signals, sin NgModules)
- TypeScript estricto
- Tailwind CSS
- Despliegue automático en GitHub Pages con GitHub Actions
- Docker para desarrollo y producción (nginx)

## Estructura

```
src/app/
├── core/        # modelos, servicios y datos (proyectos, experiencia, habilidades)
├── features/    # páginas: inicio, experiencia, portafolio, contacto
├── layout/      # encabezado, pie y navegación
└── shared/      # componentes reutilizables
```

Los proyectos y la experiencia se editan en `src/app/core/services/portfolio.service.ts`.

## Correr en local

```bash
pnpm install
pnpm start        # http://localhost:4200/portafolio-de-proyectos/
```

Con Docker:

```bash
docker compose up
```

## Despliegue

Cada push a `main` ejecuta `.github/workflows` y publica el build en GitHub Pages. El workflow copia `index.html` como `404.html`, así las rutas de Angular (`/portafolio`, `/experiencia`) funcionan al abrirse directamente.

---

[GitHub](https://github.com/titusandersonsuarez) · [LinkedIn](https://www.linkedin.com/in/anderson-suarez-150597239)
