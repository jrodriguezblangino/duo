# BRIEF MAESTRO — Rediseño dúoPANELES (fill-home)

> **Para:** Cursor (Agent mode + `/loop` + `visual-loop`)
> **Autor del brief:** Hermes (estrategia). **Ejecución:** Cursor.
> **Repositorio:** `C:/Dev/fill-home` · **Branch de trabajo:** `duo-redesign`
> **Objetivo:** Rediseño profesional completo del mockup a la marca **dúoPANELES** (importador AR de paneles aislantes PIR), preservando el concepto warm-premium y el sistema de motion existente. NO es un reskin superficial, NO es copia ciega.

---

## 0. Contexto estratégico (por qué existe este brief)

- **Táctica Trojan Horse:** Joaquín (diseñador web freelance) arma un mockup de alta fidelidad **con la marca del prospecto** y lo usa como gancho de venta por WhatsApp/IG (Rioplatense, sin propuestas formales).
- **Prospecto actual:** **dúoPANELES** — importador AR de paneles PIR (techos y muros), partner oficial Arneg, +3.000 proyectos, +10 años.
- **Concepto visual:** *warm-premium industrial* — fondo oscuro (carbon), un único acento (mint `#90EE90` del logo), tipografía editorial (Fraunces serif + General Sans + IBM Plex Mono). Un único "break" claro a fondo claro en el Manifesto (decisión confirmada del usuario: **(b) mantener UN break claro deliberado**, con transición compuesta, no corte duro).
- **Sistema de motion:** Motion (framer-motion@12) ya integrado. Mantenerlo como único engine. GSAP **solo** si un efecto pinned-scrub específico lo exige. NO migrar a `motion@13` (sin beneficio, riesgo).
- **Lo que YA está hecho (no repetir):**
  - Color retint: `tailwind.config.ts` ya tiene `sand: "#90EE90"` (mint) y `sand-hover: "#B6F5DA"`. El botón primary ya usa `bg-sand text-carbon`. **No retintar de nuevo.**
  - `app/page.tsx`, `AnatomySection.tsx`, `ManifestoSection.tsx`: ya re-contentados a PIR + seams del Manifesto (commit `f7b8ef7`).
  - Capa de datos (`lib/specs.ts`, `lib/seo.ts`, `lib/faq.ts`, `lib/projects.ts`, `Footer.tsx`, `GalleryGrid.tsx`, `layout.tsx`, `contacto/page.tsx`, `tecnologia/page.tsx`, `ProjectsSection.tsx`): ya migrados a PIR/acero/acabados metálicos, **build verde**. Estado: **sin commit** (working tree dirty pero compila).

---

## 1. Estado de partida (starting point exacto para Cursor)

```bash
git branch --show-current        # => duo-redesign
git status --short               # => archivos de la capa de datos sin commit (ver §0)
npm run build                    # => VERDE (7 rutas, TypeScript OK)
```

**Acción de arranque obligatoria (Checkpoint C0):**
1. `git add -A && git commit -q -m "checkpoint: duo PIR content migration (data layer)"`
2. `git push -u origin duo-redesign`
3. Confirmar `npm run build` verde antes de tocar nada más.

> ⚠️ **Preview roto en dev:** `npm run dev` (Turbopack) tira **HTTP 500** por un error de CSS-module puro en `app/generalsans_*.module.css` (selectores globales `*`, `a`, `button`…). El build de producción sí compila. Para el loop visual usar:
> ```bash
> npm run build && (cd out && python -m http.server 3000 --bind 127.0.0.1)
> # abrir http://127.0.0.1:3000
> ```
> Opcional (solo si molesta): mover los selectores globales de ese CSS-module a `app/globals.css` `@layer base`. No es bloqueante.

---

## 2. Gobernanza de diseño (anti-slop — del taste-skill)

Cursor DEBE cumplir estas reglas en cada cambio:

1. **Una sola temática visual.** Dark industrial dominante; UN break claro en Manifesto (seam mint arriba/abajo). No introducir más secciones claras.
2. **Sin "AI slop":** nada de gradientes pastel vacíos, glassmorphism, ilustraciones 3D genéricas, o copy tipo "Elevate your…". Material protagónico, fotos/texturas reales.
3. **Motion con propósito.** Cada animación justifica una lectura (reveal de capa, conteo de stats, foco de cita). Cero perpetual-motion en elementos que no son status.
4. **Performance:** solo `transform`/`opacity` en animaciones (GPU). `will-change` con moderación. Videos con `preload="metadata"` + IntersectionObserver (ya existe `useBackgroundVideo`).
5. **Accesibilidad:** todo motion detrás de `prefers-reduced-motion`. Foco visible 2px mint (ya en globals.css). Contraste WCAG: **mint solo como fondo de botón con texto carbon, o como acento decorativo NO textual sobre claro** (mint `#90EE90` sobre `offwhite` #EDE4CF falla contraste).
6. **No inventar copy ni datos.** Usar los datos reales de §6. Si falta un dato, dejar `[VERIFY]` y reportarlo, no inventar.

---

## 3. Skills instalados — herramientas de gobernanza (Cursor DEBE tenerlos en cuenta)

Están en `.agents/skills/` (registrados en `skills-lock.json`). No son opcionales de ignorar: son la **lente de calidad** del rediseño. Cursor debe cargarlos según corresponda y aplicar sus reglas.

**Rediseño + gusto (de `Leonxlnx/taste-skill` + `emilkowalski/skills`):**
- `redesign-existing-projects` — método de rediseño de un proyecto existente (no reescritura ciega). Aplicar su flujo en Fase B/E.
- `design-taste-frontend` / `design-taste-frontend-v1` — auditoría de gusto frontend; usarlo como cross-check anti-slop en cada entrega.
- `minimalist-ui`, `industrial-brutalist-ui`, `high-end-visual-design` — referencias de lenguaje visual coherente con el concepto warm-premium industrial.
- `brandkit` — coherencia de marca; validar que cada sección respete tokens de §3 y datos de §6.

**Motion craft (de `emilkowalski/skills`):**
- `animate` — primitivas de animación en Motion; baseline de sintaxis.
- `improve-animations` / `review-animations` — auditar y mejorar las animaciones existentes (Anatomy scroll-scrub, Manifesto blur) antes de agregar nuevas.
- `find-animation-opportunities` — detectar dónde sumar WOW sin saturar.
- `animation-vocabulary` — nombrar/agrupar efectos con consistencia.
- `emil-design-eng` / `prototype` — calidad de implementación y prototipado rápido.

**Cómo usarlos en la práctica:**
- Antes de Fase B (motion): correr `review-animations` + `find-animation-opportunities` sobre el estado actual y aplicar `improve-animations`.
- En cada checkpoint C1–C4: pasar el diff por `design-taste-frontend` como gate de calidad.
- Si una sección se siente "genérica", consultar `minimalist-ui` / `high-end-visual-design`.

**Iteración visual — `/loop` y `visual-loop`:**
- Cursor **puede y debe usar** el skill `/loop` y `visual-loop` cuando lo considere necesario para iterar visualmente sobre el preview (build estático de §1), hasta que el usuario firme cada efecto WOW (B1–B5).
- Flujo sugerido: implementar → `npm run build` → servir `out/` → `/loop` para refinar → commit checkpoint.

---

## 4. Tokens del sistema (fuente de verdad — `tailwind.config.ts` + `globals.css`)

| Token | Hex | Uso |
|---|---|---|
| `carbon` | `#17140F` | bg oscuro principal |
| `slate` | `#2A211A` | panel/secundario |
| `surface` | `#3A2C20` | card elevada |
| `sand` | `#90EE90` | **acento mint (marca)** |
| `sand-hover` | `#B6F5DA` | hover/active acento |
| `offwhite` | `#EDE4CF` | fondo break Manifesto + texto sobre oscuro en secciones claras |
| `muted` | `#C9BFAA` | body text sobre oscuro |
| `border` | `#4A3B2C` | divisor oscuro |
| `border-light` | `#D8CBB0` | divisor claro |

- **Fuentes:** `headline`=Fraunces · `body`=General Sans · `mono`=IBM Plex Mono.
- **Radios:** 2px máx (solo `full` para íconos redondos). **No** usar radios grandes.
- **Espaciado:** `section`=160px, `section-mobile`=96px, `gutter`=80px, `nav`=88px.

---

## 5. Checkpoints de Git (política)

- Branch de trabajo: **`duo-redesign`** (ya creado). **Nunca** tocar `main` hasta aprobación final.
- Tag de rollback ya existe: **`checkpoint/pre-duo-redesign`** (estado pre-rediseño, seguro).
- **Checkpoints obligatorios** (commit + push después de cada fase, mensaje `checkpoint: <fase>`):
  - **C0** arranque (data layer) — §1
  - **C1** dead-code + dev-server fix
  - **C2** max-WOW motion (Hero + Anatomy + Stats + CTA)
  - **C3** responsive/QA
  - **C4** preview second-repo deploy
- **Second repo para preview:** crear `fill-home-duo` (GitHub Pages) y desplegar `duo-redesign` ahí → URL independiente, `main` de `fill-home` queda live sin tocar. Merge a `main` solo tras sign-off del cliente.

---

## 6. Fases ejecutables (paso a paso para Cursor)

### FASE A — Limpieza (C1)
- **A1.** Eliminar keyframes muertos en `app/globals.css`: `finish-handle-pulse`, `finish-divider-breathe` y sus `.animate-*` (0 usos en el repo — confirmado con grep). No borrar si algún componente los usa (re-grepear primero).
- **A2.** (Opcional, si afecta el loop) Mover selectores globales de `app/generalsans_*.module.css` a `@layer base` en `globals.css` para desbloquear `npm run dev`.
- **A3.** Verificar que no quede ningún `wood-look`, `Aluminio anodizado`, `Poliuretano HD`, `madera-look` en archivos `.ts/.tsx` renderizados (ya casi limpio; re-grepear).
- ✅ **Aceptación:** `npm run build` verde; grep de términos viejos = 0 en source.

### FASE B — Max-WOW motion (C2) — el corazón del pedido
Usar Motion (framer-motion). Iterar cada efecto en `/loop` + `visual-loop` hasta que el usuario lo firme. Patrones exactos:

- **B1. Hero — video `duo.mp4` + Ken Burns + scrim + reveal.**
  - `BackgroundVideo` ya existe; apuntar `src` a `/assets/videos/duo.mp4` (copiar desde `C:\Users\jrodr\.hermes\desktop-attachments\duo.mp4` → `public/assets/videos/duo.mp4`).
  - Ken Burns: `animate={{ scale: [1, 1.08] }}` con `transition={{ duration: 18, ease: "easeOut" }}` sobre el `<video>` (GPU, seguro).
  - Scrim: overlay `bg-gradient-to-b from-carbon/70 via-carbon/40 to-carbon` para legibilidad.
  - Headline: reveal clip/blur con `initial={{ opacity:0, y:24, filter:"blur(8px)" }} animate={{...0, filter:"blur(0)"}}`.
- **B2. AnatomySection — scroll-scrub (YA existe, refinar).**
  - Es el hero-piece: 1000vh desktop pin, 3 escenas. Mantener mecánica; afinar easing a `cubic-bezier(0.16,1,0.3,1)` y asegurar que las 3 capas digan **Chapa de acero / PIR / Acero galvanizado** (ya hecho en datos; verificar render).
- **B3. StatsBand — count-up scroll-driven (NUEVO, WOW).**
  - Usar `useScroll` + `useTransform` + `useMotionValue` (NO `useState` para el número — evita re-render).
  - Pattern:
    ```tsx
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "start 0.3"] });
    const count = useTransform(scrollYProgress, [0,1], [0, 3000]);
    const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("es-AR"));
    // <motion.span>{rounded}</motion.span>
    ```
  - Stats reales: **+3.000 proyectos · +10 años · partner Arneg 2024**.
- **B4. CTA magnético (NUEVO, WOW).**
  - `useMotionValue` para x/y; `onMouseMove` calcula desplazamiento relativo al centro; `useSpring` para suavizar; `style={{ x, y }}` en el botón principal del Hero/conversión.
  - `:active` → `scale(0.98)`. Transición base 200ms ease-out (no 300ms).
- **B5. Reveal de secciones + comparativa.**
  - Staggered reveals con `Reveal` existente; en la tabla comparativa, highlight de columna en hover/scroll.
- **B6. Cursor-follow glow (sutil).** Radial mint siguiendo el cursor en secciones dark (respetar reduced-motion). Opcional si no satura.
- ✅ **Aceptación:** cada efecto B1–B5 firmado en `/loop`; `prefers-reduced-motion` desactiva B3/B4/B6; build verde.

### FASE C — Responsive / QA (C3)
- **C1.** `h-[100vh]` → `min-h-[100dvh]` en Hero/Manifesto (salto iOS).
- **C2.** Auditar las 12 secciones: cap 1 eyebrow (máx 3 total en la página). Re-secuenciar variedad de layouts (full-bleed / pinned / bento / quote) para evitar repetición de "familia de layout".
- **C3.** Manifesto light-break: verificar seam mint arriba/abajo compuesto (ya insertado; afinar si el corte se lee accidental).
- **C4.** WhatsApp float → `BRAND.whatsapp` real (`5491164594688`, ya en config). Sin credenciales hardcodeadas.
- **C5.** Sin fugas de "Fill Home" en ningún texto renderizado.
- ✅ **Aceptación:** mobile/tablet/desktop OK; reduced-motion respeta todo; grep "Fill Home" = 0.

### FASE D — Deploy preview second-repo (C4)
- Crear repo `fill-home-duo`; GitHub Pages desde branch `duo-redesign`.
- URL independiente para que el usuario previsualice sin tocar `main` live.
- ✅ **Aceptación:** URL accesible; build de ese repo = mismo que local.

### FASE E — Promoción (solo tras sign-off)
- Merge `duo-redesign` → `main` (o apuntar Pages al branch). Mantener tag `checkpoint/pre-duo-redesign`.

---

## 7. Datos reales dúoPANELES (usar TAL CUAL, no inventar)

- **WhatsApp:** `5491164594688` · **IG:** @duopaneles · **Email:** hola@duopaneles.com.ar
- **Social proof:** "Partner oficial Arneg · +3.000 proyectos"
- **Stats:** +3.000 proyectos · +10 años · partner Arneg 2024
- **Productos:**
  - Techos: **WAVE LS, COVER LS, COVER LT, COVER LX, MAXIMMA**
  - Muros: panel de fachada PIR
- **Núcleo:** Poliisocianurato (PIR) con retardo al fuego · cara chapa de acero calibre #25 · respaldo acero galvanizado
- **Aplicaciones:** Residencial · Agro e Industrial · Comercial e Institucional
- **Valores:** INTELIGENTE · SUSTENTABLE · A MEDIDA
- **Video:** `duo.mp4` (fábrica, H.264 1920×1080, 25.3s) → Hero.
- **Logo:** `public/assets/logos/duo.png` (negro + mint, "duo" con casita en u).

---

## 8. Definition of Done (cuándo parar)

1. Build verde en `duo-redesign`.
2. Preview second-repo accesible y firmeado por el usuario en `/loop`.
3. Motion WOW (B1–B5) aprobado visualmente.
4. Cero fugas Fill Home / wood-look / aluminio.
5. Reduced-motion respeta todo.
6. Checkpoints C0–C4 commiteados y pusheados.
7. Sign-off del usuario → merge a `main`.

---

## 9. Anti-patrones explícitos (NUNCA hacer)

- No usar GSAP salvo efecto pinned que Motion no cubra.
- No migrar a `motion@13`.
- No introducir más secciones claras (rompe la regla de tema único).
- No poner texto mint sobre fondo claro (falla WCAG).
- No animar con `top/left/width/height` (layout thrash).
- No inventar stats/productos que no estén en §6.

---

## 10. Referencias internas

- `docs/duo-audit-phase0.md` — auditoría detallada (bloqueos A1, B3; hallazgos de motion).
- `docs/duopaneles-trojan.md` — estrategia Trojan + abridor WA + prompt D0 de color.
- `lib/brand.config.ts` — ya con datos dúo (WA real, accentToken `sand`).
- `tailwind.config.ts` — tokens ya retintados a mint.
