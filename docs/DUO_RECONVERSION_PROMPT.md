# dúoPANELES — Prompt de reconversión total (handoff senior)

> **Uso:** pegar en un chat Agent fresco. No re-explicar contexto.
> **Repo:** `C:/Dev/fill-home` · Branch: `duo-redesign`
> **Preview remote:** `duo` → https://github.com/jrodriguezblangino/duo.git · Pages: `gh-pages`
> **Preview URL:** https://jrodriguezblangino.github.io/duo/
> **Sitio original (IA/contenido, NO layout Wix):** https://www.duopaneles.com.ar
> **Plan canónico:** `duo_full_reconversion_fd0b56fc.plan.md`

---

## Design read (fijado)

Reading this as: full-site B2B industrial reconversion for dúoPANELES decision-makers, warm-premium industrial language, leaning toward editorial dark + mint blueprint density — NOT Fill Home reskin.

**Diales:** VARIANCE 7 · MOTION 8 · DENSITY 4

**Dirección visual:** warm-premium industrial (carbon `#17140F` + mint sand `#90EE90`) + densidad blueprint (grid/hairlines de `industrial-brutalist-ui`). NO CRT rojo. Un solo break claro deliberado (valores INTELIGENTE / SUSTENTABLE / A MEDIDA). Resto dark.

---

## Misión

Reconversión TOTAL del mockup Trojan Horse. El chat anterior falló: retintó mint + sumó motion sobre el esqueleto Fill Home. El dueño lo siente "el mismo mockup". Hay que **reconstruir la narrativa de marca**, no adaptar genérico.

**Alcance:** home + `/tecnologia` + `/galeria` + `/contacto`.
**Proceso:** comps 1:1 por sección → sign-off humano → código. Nunca código de UI antes del sign-off de comps de esa fase.
**Nunca** merge a `main` de fill-home sin OK explícito. Preview solo en remote `duo`.

---

## Por qué el mockup actual falla

Home actual (`app/page.tsx`) = IA Fill Home:

Hero → Stats → Manifesto → WhyNow → Anatomy → Transformation → Styles (comparador) → Comparison → Guarantee → Projects → FAQ → Conversion

Eso NO es dúo. dúo pide:

Hero (video fábrica) → Sistema Paneles PIR → Líneas Techo/Muro → Aplicaciones → Detalle capas (scroll) → Biblioteca BIM → Nosotros/stats → Valores → Obras → FAQ → Contacto/WA

**Retirar o absorber leftovers Fill Home:** WhyNow genérico, Transformation "siding", StyleToggle madera/metálico, Comparison "Metal Siding", copy aluminio/poliuretano/madera, Guarantee sin años verificados.

---

## Stack (no renegociar)

- Next 16 + Tailwind + `framer-motion@12`
- NO migrar a `motion@13`
- GSAP solo si un pin/scrub lo exige
- Tokens ya fijados: `sand #90EE90`, `sand-hover #B6F5DA`, `carbon #17140F`. NO retintar de nuevo.
- Fuentes existentes: Fraunces / General Sans / IBM Plex Mono (justificadas por brand brief; no swap por "anti-Fraunces" genérico del taste-skill)

---

## Datos reales (únicos permitidos)

Fuente: `docs/duopaneles-trojan.md` + sitio original. Si falta → `[VERIFY]` y reportar. **No inventar.**

| Campo | Valor |
|---|---|
| WA | `5491164594688` |
| Email | `hola@duopaneles.com.ar` |
| IG | `@duopaneles` |
| Stats | +3000 proyectos · +10 años · partner Arneg 2024 |
| Techos | WAVE LS, COVER LS, COVER LT, COVER LX, MAXIMMA |
| Núcleo | PIR / poliisocianurato · chapa acero #25 · respaldo galvanizado |
| Aplicaciones | Residencial · Agro e Industrial · Comercial e Institucional |
| Valores | INTELIGENTE · SUSTENTABLE · A MEDIDA |
| Copy usable | "Un sistema constructivo superior." / "Somos el aliado inteligente de tus proyectos." |
| Video hero | `/assets/videos/duo.mp4` |
| Logo | `/assets/logos/duo.png` |
| Brand config | `lib/brand.config.ts` |

---

## IA nueva (home)

```
Hero (video fábrica duo.mp4)
  → Sistema Paneles PIR
  → Líneas Techo / Muro (WAVE LS, COVER LS/LT/LX, MAXIMMA)
  → Aplicaciones (Residencial · Agro e Industrial · Comercial e Institucional)
  → Detalle capas (scroll wow: acero / PIR / galvanizado)
  → Biblioteca BIM
  → Nosotros / stats
  → Valores (ÚNICO break claro): INTELIGENTE · SUSTENTABLE · A MEDIDA
  → Obras
  → FAQ
  → Contacto / WA
```

**Interior:**
- `/tecnologia`: capas PIR + fichas/espesores + BIM deep-dive (no diagrama aluminio/PU viejo)
- `/galeria`: obras/aplicaciones (no wood-look)
- `/contacto`: form + WA real; campos alineados a form Wix (proyecto, m², plazo) sin inventar

---

## Skills obligatorios (leer antes de comps/código)

| Skill | Rol |
|---|---|
| `design-taste-frontend` | Anti-slop + pre-flight mecánico |
| `redesign-existing-projects` | Auditoría → overhaul (no reskin) |
| `imagegen-frontend-web` | 1 imagen horizontal POR sección |
| `high-end-visual-design` | Agencia-tier spacing/tipo/motion |
| `industrial-brutalist-ui` | Grid/densidad blueprint (NO CRT rojo) |
| `brandkit` + troiano | Coherencia de marca |
| `animate` / `review-animations` / `find-animation-opportunities` / `improve-animations` | Motion Emil motivado |

---

## Anti-patrones (NUNCA)

- Reskin / "cambiar copy y listo"
- 3 feature cards iguales
- Eyebrows en todas las secciones (máx ~1 cada 3)
- Más de un break claro
- Texto mint sobre fondo claro (WCAG fail)
- Animar `top` / `left` / `width` / `height`
- Inventar productos/stats
- Marquee múltiple / scroll cues / em-dashes como flourish
- Migrar a `motion@13`
- Tocar `main` de fill-home
- Copiar layout Wix del sitio original

---

## Secuencia de ejecución

### Paso 0 — Handoff
Este archivo. Commit: `checkpoint: duo reconversion handoff prompt`.

### Paso 1 — COMPS HOME (parar y pedir sign-off)
Generar UNA imagen horizontal por sección. Guardar en `docs/comps/duo-home/`:

| Archivo | Sección | Composición sugerida (variar) |
|---|---|---|
| `01-hero.png` | Hero video fábrica | Bottom-left text over full-bleed factory video still |
| `02-paneles.png` | Sistema Paneles PIR | Right-third caption + left-two-thirds macro panel |
| `03-lineas.png` | Líneas Techo/Muro | Horizontal product strip / accordion slices |
| `04-aplicaciones.png` | Aplicaciones ×3 | Asymmetric bento (NO 3 equal cards) |
| `05-capas.png` | Detalle capas scroll | Full-bleed cross-section pin energy |
| `06-bim.png` | Biblioteca BIM | Solid surface + technical/UI panel |
| `07-nosotros.png` | Nosotros / stats | Oversized metrics strip |
| `08-valores.png` | Valores (light break) | Stacked center manifesto on offwhite |
| `09-obras.png` | Obras | Gallery-led masonry / gapless bento |
| `10-faq.png` | FAQ | Two-column editorial list (no accordion default) |
| `11-contacto.png` | Contacto / WA | Mini minimalist + mint CTA carbon text |

Misma paleta mint/carbon. Composiciones VARIADAS. Al terminar: **STOP. Pedir sign-off. NO código.**

### Paso 2 — Código HOME (solo tras OK)
Implementar nueva IA, secciones nuevas (`ProductLinesSection`, `ApplicationsSection`, `BimSection`, `BrandValuesSection`), retirar leftovers Fill Home, motion motivado + reduced-motion, build verde, push `duo` (main) + `origin duo-redesign`.

### Paso 3 — Interior
Comps `docs/comps/duo-tecnologia|galeria|contacto/` → sign-off → código → push.

### Paso 4 — QA DoD
- [ ] `npm run build` verde
- [ ] Grep 0 en UI renderizada: Fill Home, wood-look, aluminio anodizado, aspecto madera
- [ ] WA = `5491164594688`
- [ ] Preview Pages OK
- [ ] Reduced-motion respeta todo
- [ ] Checkpoints `checkpoint: …` + push
- [ ] Sign-off humano antes de merge a `main` fill-home

---

## Git / deploy

```bash
# Branch de trabajo
git branch --show-current   # duo-redesign

# Remotes
# origin = fill-home (NO merge a main sin OK)
# duo    = preview Pages

# Push preview (después de código aprobado)
git push duo HEAD:main
git push -u origin duo-redesign
```

Mensajes de checkpoint: `checkpoint: <fase>`.

---

## Referencias internas

- `docs/duopaneles-trojan.md` — datos + abridor WA
- `docs/CURSOR_REDESIGN_BRIEF.md` — tokens, motion B1–B5, DoD legacy (supersedido en IA por este prompt)
- `lib/brand.config.ts` — BRAND ya con datos dúo
- `app/page.tsx` — esqueleto Fill Home a reemplazar

---

## Primera respuesta esperada de un chat que use este prompt

1. Design read + dials (1 línea)
2. Confirmar branch `duo-redesign` y estado git
3. Confirmar este MD existe / actualizarlo
4. Empezar comps HOME sección 1…n
5. Parar y pedir sign-off

**No implementar la home en código hasta sign-off de comps.**
