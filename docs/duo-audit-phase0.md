# Phase 0 — Audit (dúoPANELES redesign)

**Design read:** Full marketing redesign of an existing B2B industrial site, for a mid-size
ARG importer's decision-maker (owner/partner), with a *warm-premium "Fill Home" concept,
retinted to Duo black + mint*, leaning toward a crafted editorial system with scroll-driven
motion (MOTION high). Audience = trust-first B2B → mint used with restraint, motion motivated.

**Dials (from your "max WOW" + trust-first B2B):** VARIANCE 7 · MOTION 8 · DENSITY 4.

**Stack confirmed:** Next.js 16, React 19, Tailwind v4, `framer-motion@12` (import `framer-motion`).
Single accent token `sand` already = mint `#90EE90`. Motion tokens in `lib/motion.ts`. This is
good infrastructure — we keep it, we do NOT migrate to `motion@13` or add GSAP unless a specific
effect needs it.

---

## A. BLOCKER — content/brand mismatch (must fix before visual polish)

1. **AnatomySection is hardcoded to the Fill Home product.** It describes 3 layers:
   "Aluminio anodizado" (wood-look cara vista), "Poliuretano HD" (núcleo), "Acero galvanizado"
   (respaldo), with copy about *madera-look / calidez de la madera*. Duo's real product is
   **PIR panel (cara de acero, núcleo PIR con retardo al fuego, calibre #25)** — no "madera".
   → The signature scroll-section currently lies about the product. Re-content to Duo's
   real stack (chapa acero / núcleo PIR / encastre oculto) or it undercuts the whole pitch.

2. **Hero copy deviates from your approved troiano.** `headlineContinued` is the full
   sustainability sentence (very long for a hero subline — taste-skill caps hero subtext at
   ~20 words / 3-4 lines). Keep it shorter; move the long sentence to a manifesto/why section.

## B. HIGH-impact visual/structure fixes (redesign skill + taste-skill)

3. **Light section in a dark page (BANNED).** `ManifestoSection` renders `bg-offwhite` while
   the rest of the page is `carbon` dark. This is the #1 generic tell. **Decision needed:**
   either (a) invert the manifesto to dark (recommended — keeps one theme) or (b) commit to a
   single deliberate "light break" with a strong transition. I recommend (a) for cohesion.
   Note: this also fixes the `text-carbon` copy that would otherwise clash.

4. **Eyebrow overuse.** Page has eyebrows on Hero, Anatomy ("Composición — tres capas"),
   Manifesto ("Manifiesto"), and likely more. taste-skill rule: max 1 eyebrow per 3 sections.
   Trim to ~3 total across the page. The Anatomy "Composición" eyebrow + index numbers is
   redundant — pick one.

5. **Hero uses `h-[100vh]` not `min-h-[100dvh]`.** iOS Safari jump risk. Change to
   `min-h-[100dvh]` (desktop already has `max-md:h-[100dvh]`; make it consistent).

6. **Section-layout repetition risk.** Current order: Hero → Stats → Manifesto → WhyNow →
   Anatomy → Transformation → Styles → Comparison → Guarantee → Projects → FAQ → Conversion.
   Several "split text+image" families stack. Need ≥4 distinct layout families; cap zigzag at 2
   consecutive. Will re-sequence in Phase 2 to alternate full-bleed / pinned / bento / quote.

## C. MOTION craft (emilkowalski review-animations + find-animation-opportunities)

**Keep (already good):**
- Anatomy scroll-scrub with `useTransform` on `transform`/`opacity` only — GPU-safe, justified
  (storytelling). Keep, but re-content to PIR.
- Manifesto staged blur→focus on scroll — justified (explanation), `willChange` set. Keep.
- Hero Ken Burns (14s linear reverse) — fine; respects reduced motion. Keep.
- `BackgroundVideo` IO-gated playback, decoder detach — excellent iOS engineering. Keep.

**Fix:**
7. **`Button` transition uses `transition-colors duration-300` (300ms) on a UI element** with
   `ease` unspecified (defaults to CSS ease, weak). review-animations: UI < 300ms is the cap,
   and prefers a stronger curve. Tighten to `transition-colors duration-200 ease-out` and add
   `active:scale-[0.98]` for tactile press (currently missing `:active`). Also add
   `hover:-translate-y-px` optional.
8. **Infinite pulsing keyframes** (`finish-handle-pulse`, `finish-divider-breathe` in
   globals.css) — perpetual motion on a non-status element. find-animation-opportunities: only
   eligible if it's a live/status indicator. If it's decorative on the quote/form, **delete or
   gate behind hover**. Confirm where these are used (ConversionSection) before keeping.
9. **Magnetic/spotlight CTAs** — you want max WOW. Add cursor-follow spotlight on primary CTA
   and a magnetic hover using `useMotionValue`/`useTransform` (NOT useState). Eligible
   (occasional, premium). This is the highest-leverage new motion.
10. **Stats count-up on scroll** — eligible (first-time/occasional, explanation). Add a
    scroll-driven number count using `useTransform` + `useMotionValue`. Replace static "3.000+".
11. **Reduced-motion coverage** is good (Hero/Anatomy/Manifesto all branch on `prefersReduced`).
    Keep that discipline for any new motion (9,10).

## D. CONTENT (taste-skill content rules)

12. **Real Duo data already wired** into `brand.config` (WA, Arneg, +3.000 proyectos) and Stats.
    Good. Ensure FAQ uses Duo's real questions (PIR, retardo al fuego, espesores, BIM) not filler.
13. **Avoid AI clichés** in any new Spanish copy: no "Elevate/Seamless"-style translates
    ("impulsamos", "potenciamos", "soluciones a medida" overuse). Write specific, plain Spanish.

## E. Accessibility / code quality

14. **Mint contrast:** `bg-sand text-carbon` (#90EE90 on #17140F) passes WCAG AA. Good. But
    mint on `offwhite` (light) text would FAIL — audit any mint-on-light usage (e.g. outline
    button `text-sand` on light bg in the manifesto break). After inverting manifesto to dark,
    this is mostly resolved.
15. **Debug artifacts:** confirm no `[VERIFY]`, no `console.log`, no `debug` beacons remain
    (prior audit flagged an AnatomySection debug beacon). Verify in Phase 4.

---

## Priority order (redesign skill fix-priority)
1. **A1** re-content Anatomy to PIR (blocker — product truth).
2. **B3** manifesto light→dark theme lock.
3. **A2 + B2** hero copy trim + eyebrow trim.
4. **C7, C8** button easing/active + perpetual-pulse audit.
5. **C9, C10** new WOW motion (magnetic CTA, stats count-up) via `/loop`.
6. **B5, B6** dvh + layout de-repetition.
7. **D, E** content + a11y pass.

**Verdict (review-animations framing):** Infrastructure is strong (GPU-only transforms, reduced-
motion branches, IO-gated video). No feel-breaking regressions in *existing* motion. Two blockers
are **content/brand truth** (A1) and **theme inconsistency** (B3), not motion. The redesign is
"Approve with required fixes" once A1 + B3 land.
