# Reskin — nuevo cliente en una página

Objetivo: rebrandear el sitio **sin reescribir componentes**. Identidad en un archivo + assets en `/public`.

---

## 1. Marca (`lib/brand.config.ts`)

Editá el objeto `BRAND`:

| Campo | Qué es |
|---|---|
| `name` / `legalName` | Nombre visible (nav, footer, SEO, alts) |
| `tagline` | Promesa de una línea (OG / Twitter) |
| `whatsapp` | Solo dígitos internacionales, sin `+` ni espacios (`549…`) |
| `whatsappMessage` | Texto prefill de `wa.me` — usar `encodeURIComponent(...)` |
| `email` / `phoneDisplay` | Contacto footer |
| `ctaLabel` | Botones primarios (“Solicitar Cotización”, etc.) |
| `accentToken` | Token Tailwind del acento (`sand` por defecto) |
| `logoLightPath` / `logoDarkPath` | Rutas vía `assetPath("/assets/logos/…")` |
| `socialProofNote` | Línea B2B corta |

También: `NEXT_PUBLIC_SITE_URL` en deploy (sin slash final) para OG absolutas.

---

## 2. Logos e imágenes (`public/assets`)

| Dónde | Qué reemplazar |
|---|---|
| `public/assets/logos/` | Logo claro/oscuro referenciado en `BRAND` |
| `public/assets/images/` | Fotos de producto, hero posters, galería |
| `public/assets/videos/` | Loops de anatomía / hero / agua |
| `public/og.png` | Preview social **1200×630** — ver `docs/og-image.md` |

No hace falta tocar componentes: usan `assetPath(...)` y `BRAND`.

---

## 3. Placeholders demo — reemplazar antes de producción

| Área | Archivo | Qué hay hoy |
|---|---|---|
| **Proyectos** | `lib/projects.ts` + `project_demo_*.webp` | 4 “Obra demostrativa” + fotos AI |
| **Antes/después** | `components/ui/GalleryGrid.tsx` (`BEFORE_AFTER`) | Pares demo Pilar / CABA |
| **Comparativa** | `components/sections/ComparisonSection.tsx` | Números referenciales (durabilidad, costo, etc.) |
| **Garantía** | `components/sections/GuaranteeSection.tsx` (`YEARS = 15`) | Años y cobertura/exclusiones demo |
| **FAQ garantía** | `lib/faq.ts` | Respuesta de 15 años alineada al bloque |
| **Presupuesto form** | `lib/panelCalculator.ts` (`BUDGET_PER_M2`) | ARS/m² placeholder ±15% |
| **Contacto WA/tel** | `lib/brand.config.ts` | Números/email de demo |
| **Specs** | `lib/specs.ts` | Ficha técnica compartida UI + JSON-LD |

Cuando publiquen obras reales: actualizá `lib/projects.ts`, las imágenes, y quitá el copy “Obra demostrativa” / “Referencias demostrativas” en `ProjectsSection`.

---

## 4. Checklist rápido

1. `lib/brand.config.ts` completo  
2. Logos + `og.png` + fotos/videos del cliente  
3. Proyectos, comparativa, garantía, FAQ, `BUDGET_PER_M2` con datos reales  
4. `NEXT_PUBLIC_SITE_URL` en el host  
5. `npm run build` verde  

Listo para pitch: *“tu marca entra acá; el resto es el sistema de venta.”*
