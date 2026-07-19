# CV — Celestí "Cel" Ticó Petit

Web personal / CV construida con **Next.js 14 (App Router)** + **Chakra UI**, optimizada para SEO
(metadata, Open Graph, JSON-LD Schema.org, sitemap y robots) y lista para desplegar con Docker.

## Ejecutar con Docker Compose (recomendado)

```bash
cd web
docker compose up --build
```

Abre <http://localhost:3592>.

Para detener: `docker compose down`.

## Desarrollo local (sin Docker)

```bash
cd web
npm install
npm run dev
```

## Estructura

- `app/` — páginas y componentes (App Router).
- `app/data.ts` — todo el contenido del CV en un único fichero, fácil de editar.
- `app/theme.ts` — tema oscuro de Chakra UI.
- `public/img/` — capturas de proyectos.
- `Dockerfile` / `docker-compose.yml` — build multi-stage con salida `standalone`.

## Editar el contenido

Casi todo el texto (perfil, skills, proyectos, experiencia, clientes) vive en `app/data.ts`.
