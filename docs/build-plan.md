# Fill Home — Progressive Build Plan (Cursor Agent)

**Purpose:** Turn the current product-led mockup into a *sales-ready, reusable* B2B site
that (a) wins the trust of metal-siding importers in Argentina and (b) can be reskinned
per client without rewriting code.

**How to use this file**
- Paste prompts into Cursor Agent **one phase at a time**, in order. Each phase builds on the previous.
- Every prompt assumes your current stack: **Next.js 16 / React 19 / Tailwind 4 / Framer Motion 12**.
- Reusable primitives already exist — reference them so Cursor stays on-system:
  `Button` (`components/ui/Button.tsx`), `Reveal` (`components/ui/Reveal.tsx`),
  `SectionLoopVideo`, `BackgroundVideo`, `StyleToggle`, `HighlightWord`, `AccentEcho`,
  `GalleryGrid`, `ProjectForm`, and tokens in `tailwind.config.ts` + `lib/site.ts`.
- **📥 = you must provide something before/with that step** (image, copy, number). Do not skip these.
- After every phase, run `npm run build` and open the live site to verify before moving on.

---

## PHASE 0 — Credibility hygiene (do first; blocks the demo)

> Goal: remove anything that makes the build look unfinished to a technical buyer.

**Prompt 0.1 — Remove the debug beacon**
```
In components/sections/AnatomySection.tsx, the StaticAnatomy component contains a useEffect
that fetches to http://127.0.0.1:7757/ingest/... wrapped in // #region agent log / #endregion
markers. Delete the entire useEffect block and the region comment markers. Keep all JSX and
layout identical. Verify no other code references that endpoint.
```

**Prompt 0.2 — Fix the hero product name**
```
In app/page.tsx the Hero headline is "Metal Sliding." — that is a typo. Change it to
"Metal Siding." (the product is exterior cladding). Update the HeroProps comment if needed.
Keep all other copy.
```

**Prompt 0.3 — Remove the [VERIFY] placeholder**
```
In app/tecnologia/page.tsx the spec line reads "Encastre oculto · tolerancia ± 0.3 mm [VERIFY]".
Remove the literal "[VERIFY]" text. If the tolerance is not yet confirmed, change the line to
"Encastre oculto · tolerancia controlada" until real data exists. Do not leave bracketed placeholders in the UI.
```

✅ **Checkpoint 0:** `npm run build` passes; no console errors; no `[VERIFY]` or `127.0.0.1` in source.

---

## PHASE 1 — Generification system (makes the mockup resellable per brand)

> Goal: replace hardcoded "Fill Home" identity with a single brand config so a client = one file.

📥 **You provide:** (a) the generic placeholder brand name you want to show prospects
(suggestion: **"Revestimiento Pro"** or keep a neutral **"Fill Home"** but make it swappable),
(b) a placeholder WhatsApp number in international format (e.g. `54911XXXXXXX`),
(c) a placeholder email, (d) a 1-line brand promise.

**Prompt 1.1 — Create a brand config module**
```
Create lib/brand.config.ts exporting a single BRAND object with: name, legalName, tagline,
whatsapp (international digits, no +), whatsappMessage (pre-filled URL-encoded Spanish text),
email, phoneDisplay, ctaLabel, accentToken (default "sand"), logoLightPath, logoDarkPath,
socialProofNote. Populate with these placeholder values: [PASTE YOUR 4 ITEMS HERE].
Keep SITE_NAME etc. working by re-exporting from this file. Do not change visual output yet.
```

**Prompt 1.2 — Wire site.ts to the brand config**
```
Refactor lib/site.ts so SITE_NAME, CTA.label, CTA.href and NAV_LINKS are derived from
lib/brand.config.ts. CTA.href should point to `/contacto`. Keep the same labels for now.
Update any import that used SITE_NAME directly (Navbar, Footer, layout) to import from brand.config.
Verify the site renders identically.
```

**Prompt 1.3 — Neutralize prospect-facing copy**
```
Replace brand-ego copy with neutral, benefit-led copy that any client could adopt:
- ManifestoSection.tsx: lead line → "Importamos ingeniería de revestimiento y la adaptamos
  al estándar local." Keep the scroll-scrub mechanic.
- Footer description and ConversionSection intro: keep generic ("Solicitud de cotización").
- Remove any mention of a specific trade show or origin story that ties the site to one company.
```

✅ **Checkpoint 1:** Site looks the same, but all identity lives in `lib/brand.config.ts`.
Swapping that file (later, per client) changes name/CTA/WhatsApp everywhere.

---

## PHASE 2 — WhatsApp-first conversion layer (Argentina GTM)

📥 Uses the WhatsApp number from Phase 1.

**Prompt 2.1 — Reusable WhatsApp CTA primitive**
```
Create components/ui/WhatsAppCTA.tsx: a Button (reuse components/ui/Button.tsx, variant="primary")
that links to `https://wa.me/${BRAND.whatsapp}?text=${BRAND.whatsappMessage}` (import from
brand.config). Add a small inline WhatsApp glyph (inline SVG, no extra dep). Props: size, label
(default "Hablar por WhatsApp"), className.
```

**Prompt 2.2 — Floating action button**
```
Create components/ui/WhatsAppFloat.tsx: a fixed bottom-right pill (z-40, above content, below
mobile menu z-50) visible on all pages, using WhatsAppCTA. It should hide when the mobile menu
is open and respect reduced-motion (no bounce). Mount it once in app/layout.tsx inside <main>
or just above <Footer/>. Use BRAND.whatsappMessage as the pre-filled text.
```

**Prompt 2.3 — Add WA + phone to nav and footer**
```
In Navbar.tsx and Footer.tsx, add the WhatsAppCTA (outline variant on nav, primary on footer)
and a plain phone link (tel:) using BRAND.phoneDisplay / BRAND.email. Keep existing "Solicitar
Cotización" CTA. On mobile nav, the WA button should sit above the primary CTA.
```

✅ **Checkpoint 2:** A floating WA button appears on every page; clicking opens a pre-filled
Argentine WhatsApp chat. Nav + footer also expose WA/phone.

---

## PHASE 3 — Hero conversion hook (first-screen next step)

**Prompt 3.1 — Add a quiet hero CTA pair**
```
In components/ui/Hero.tsx, below the bridgeLine, add a two-button row (do not disturb the
cinematic feel): primary = Button "Solicitar cotización" → /contacto; secondary = outline
"WhatsApp" using WhatsAppCTA. Keep them low-contrast/quiet (text-offwhite/80) and reveal with
the existing glide entrance. Do not add a CTA on the video itself.
```

✅ **Checkpoint 3:** Hero now gives the eye a next step without breaking the aesthetic.

---

## PHASE 4 — "Why now" / trend section (sets the reason before the product)

**Prompt 4.1 — New section component**
```
Create components/sections/WhyNowSection.tsx: a carbon-bg section after ManifestoSection in
app/page.tsx. Layout: eyebrow "Por qué ahora", headline "El revestimiento cambió.", and a 3-card
row (reuse FeatureCard from components/ui/FeatureCard.tsx) for: (1) Mantenimiento casi nulo,
(2) Instalación rápida sobre existente, (3) Durabilidad de décadas. Each card: mono index,
headline, one-line body. Use Reveal for entrance. Keep palette/tokens identical.
```

📥 **You may supply** 1 short stat per card (optional; placeholder copy is fine for the demo).

✅ **Checkpoint 4:** Home order is now: Hero → Manifesto → **WhyNow** → Anatomy → Transformation → Styles → Form.

---

## PHASE 5 — Comparison table (highest-leverage trust asset)

📥 **You provide** (or approve placeholders): durability years, install time, repaint cycle for
paint, relative 10-yr cost for each of: Metal Siding / Pintura / Ladrillo / PVC.

**Prompt 5.1 — Comparison section**
```
Create components/sections/ComparisonSection.tsx and insert it after StylesSection in app/page.tsx.
A 4-column responsive table (stacks on mobile): rows = Durabilidad, Mantenimiento, Tiempo de
instalación, Costo a 10 años, Resistencia al agua. Columns: Metal Siding (highlighted with sand
accent + "Recomendado" chip), Pintura, Ladrillo, PVC. Use BRAND-neutral labels. Mono labels,
carbon/off-white surfaces. Include a small disclaimer "Valores referenciales". Reuse table styles
from app/tecnologia/page.tsx spec table.
```

✅ **Checkpoint 5:** Buyers can self-answer "why not just paint it?" on the homepage.

---

## PHASE 6 — Guarantee / warranty block (risk reversal)

📥 **You provide** the warranty length + what it covers/excludes (placeholder: "15 años —
estructura y acabado; excluye daño mecánico").

**Prompt 6.1 — Guarantee section**
```
Create components/sections/GuaranteeSection.tsx, insert after ComparisonSection. Off-white bg.
Big Fraunces line "[X] años de garantía." + 3 small covered/excluded items in mono. Primary CTA
"Solicitar cotización". Keep it calm and confident, not salesy.
```

✅ **Checkpoint 6:** A clear risk-reversal exists before the form.

---

## PHASE 7 — Social proof / projects (the missing trust pillar)

📥 **You provide** 3–4 project entries: title, location, m², finish (madera/metálico), 1 image each.
Until real ones exist, use clearly-labeled placeholder projects ("Obra demostrativa").
✅ Placeholder set shipped: 4 AI demo images in `public/assets/images/project_demo_*.webp` + `lib/projects.ts` — swap when real photos arrive.

**Prompt 7.1 — Projects data + section** ✅
```
Create lib/projects.ts (array: id, title, location, m2, finish, image, blurb). Create
components/sections/ProjectsSection.tsx after GuaranteeSection on home. Grid of project cards
(reuse GalleryGrid card style) with image, location mono tag, m², finish chip. Link each to
/galeria or a detail anchor. Use Reveal stagger.
```

**Prompt 7.2 — Before/after within gallery** ✅
```
Extend components/ui/GalleryGrid.tsx (or add GalleryBeforeAfter.tsx) with an optional
before/after image pair and a draggable divider (pointer events, no dep). Use for 1–2 placeholder
projects. Keep accessible (keyboard arrow support + aria-label).
```

✅ **Checkpoint 7:** Site shows real (or labeled placeholder) proof, not just material macros.

---

## PHASE 8 — FAQ section (captures intent + SEO)

📥 **You provide** up to 8 Q&As (or approve this starter set): fire rating, weather resistance,
install over existing wall, warranty, lead time / import, cleaning, panel dimensions, colors.
✅ Starter set shipped in `lib/faq.ts` — edit answers there.

**Prompt 8.1 — FAQ accordion** ✅
```
Create lib/faq.ts (Q/A array, BRAND-neutral). Create components/sections/FaqSection.tsx after
ProjectsSection. Accessible accordion (<button aria-expanded> + region), mono question, body text.
Animate height with Framer Motion, respect reduced-motion. Off-white or carbon bg to alternate rhythm.
```

**Prompt 8.2 — JSON-LD for FAQ** ✅
```
In FaqSection (or app/page.tsx), inject a <script type="application/ld+json"> with FAQPage schema
built from lib/faq.ts. Keep it server-renderable (no client-only injection that breaks SSR).
```

✅ **Checkpoint 8:** FAQ visible on home; structured data present in page source.

---

## PHASE 9 — Calculator → budget output (closes "why pay more")

**Prompt 9.1 — Extend panelCalculator** ✅
```
In lib/panelCalculator.ts, add estimateBudget(areaM2) that returns a {min, max} ARS range using a
placeholder $/m² constant (export BUDGET_PER_M2 for easy editing). Keep estimateFromArea.
```

**Prompt 9.2 — Show budget in form** ✅
```
In components/ui/ProjectForm.tsx step 3, next to the panel-count preview, also show
"Presupuesto estimado: $X – $Y (referencial)" using estimateBudget. Add disclaimer.
```

✅ **Checkpoint 9:** The form now outputs an estimated budget, not just a panel count.

---

## PHASE 10 — SEO & OG (so prospects find it)

📥 **You provide** one hero OG image (1200×630) — or I can note it as a TODO.

**Prompt 10.1 — OG + structured data**
```
In app/layout.tsx metadata, add openGraph {title, description, url, images:[/og.png]} and
twitter card. Add a Product JSON-LD script using BRAND + SPECS. Add a docs TODO for the real OG image.
```

✅ **Checkpoint 10:** Sharing the link on WhatsApp/IG shows a clean card.

---

## PHASE 11 — Final verify & reskin readiness

**Prompt 11.1 — Build + a11y sweep**
```
Run npm run build. Fix any type/lint errors. Audit contrast of text-muted on slate and
text-offwhite/70 on carbon (aim >= 4.5:1). Confirm skip-link, focus-visible, and reduced-motion
paths still work after all additions. Confirm no hardcoded "Fill Home" remains outside brand.config.
```

**Prompt 11.2 — Reskin doc**
```
Create docs/reskin.md: 1-page instruction for a new client = "edit lib/brand.config.ts
(name, whatsapp, email, accentToken, logo) + drop images in /public/assets". List which sections
are demo placeholders to replace (projects, comparison numbers, warranty). This is your pitch artifact.
```

✅ **Final checkpoint:** `npm run build` green; every identity value in one file; demo placeholders
clearly marked; site is visually unchanged in feel but now answers all 5 "Whys" and is WA-first.

---

## Summary of what this delivers
- **P0 bugs killed** → demo looks finished.
- **Generic brand system** → you pitch "your brand drops in here."
- **WhatsApp-first + comparison + guarantee + projects + FAQ + budget** → answers every buyer objection.
- **One reskin doc** → the artifact that sells the engagement.

After this, come back and we build `docs/gtm-arg.md` (WhatsApp/IG outreach, objection handlers,
mockup-ready → signed-client milestone map).
