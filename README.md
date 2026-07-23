# Fill Home — Sitio Web

Sitio web de Fill Home: revestimientos de alta gama que combinan la calidez de la madera con la resistencia del metal.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS v4 (tokens de marca en `tailwind.config.ts`, cargado vía `@config`)
- Framer Motion (animaciones — Fase 4)
- Fuentes: Playfair Display (titulares) e Inter (cuerpo) vía `next/font`

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Documentos de referencia

- `PROJECT_ROADMAP.md` — fuente de verdad del proyecto (fases, contenido, sistema de diseño)
- `ASSETS_MANIFEST.md` — inventario y uso estratégico de cada asset en `public/assets/`

## Estructura

```
app/            Rutas (App Router): /, /tecnologia, /contacto
components/     Componentes React (layout/, ui/)
lib/            Constantes y utilidades compartidas
public/assets/  Imágenes, videos y logos oficiales
```
