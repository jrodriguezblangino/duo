# TODO — OG image definitiva

**Status:** placeholder shipped  
**File:** [`/public/og.png`](../public/og.png) (1200×630)

## Qué hacer

Reemplazar `public/og.png` con arte de marca final cuando exista:

- Tamaño exacto: **1200×630 px**
- Formato: PNG o JPG (si cambiás extensión, actualizá `OG_IMAGE_PATH` en `lib/seo.ts` y las refs en `app/layout.tsx`)
- Contenido: fachada/producto real, sin texto chico; debe leerse bien en WhatsApp / Instagram / LinkedIn
- Evitar logos pequeños o copy denso — la tarjeta ya lleva título y descripción vía metadata

## Deploy

Definí `NEXT_PUBLIC_SITE_URL` (sin slash final) en el entorno de producción para que `metadataBase` y las URLs absolutas de Open Graph apunten al dominio real.
