# FILL HOME — Design System & Implementation Manifesto (V2 PRO)

**Status:** Source of Truth — binding for all frontend implementation
**Audience:** AI coding agents (Cursor), engineers, and designers
**Brand Position:** Innovator-Curator hybrid — engineering authority meets material aspiration
**Prime Directive:** Every visual decision in this document is a rule, not a suggestion. Where this document is silent, default to *less* — remove an element rather than invent one.

---

## 0. Brand Thesis

Fill Home makes wood-look metal cladding panels — an engineered material pretending to be nothing, and everything. The site must resolve one tension in every pixel: **this is a precision-manufactured industrial product** (steel, polyurethane, aluminum, tolerances, fire ratings) **presented with the restraint of a design gallery** (not a hardware catalog, not a construction supplier).

Reference calibration (studied, not copied):
- **azahner.com** → we take the *structural discipline*: generous section breaks, architectural photography given full-bleed authority, a grid that never feels improvised.
- **metalco.it** → we take the *materiality*: macro texture shots, an unapologetic industrial vocabulary (sections, callouts, technical diagrams) presented without ever feeling like a spec sheet.
- **italmesh.com** → we take the *editorial confidence*: oversized serif type used sparingly, long-form pacing, whitespace treated as a design element rather than empty margin.

If a component doesn't serve this thesis, cut it.

---

## 1. Design Principles — "Curated Minimalism"

Curated Minimalism is not "less stuff." It is **the deliberate removal of everything that does not increase the perceived precision or desirability of the material.** Two failure modes to avoid equally:
- *Generic-AI minimalism*: centered hero, big rounded card grid, soft pastel shadows, generic sans everywhere. (This is the current problem — see No-Go list, §6.)
- *Over-decoration*: gradients, glassmorphism, drop shadows, decorative icons, more than one accent color per screen.

### 1.1 Negative Space Rules
- **Section vertical rhythm:** minimum `160px` top/bottom padding on desktop for full-width narrative sections (`py-40` in Tailwind's default scale, or a custom `py-[160px]`), minimum `96px` (`py-24`) on mobile. Never let two sections touch without at least this buffer.
- **Never fill a section edge-to-edge with content.** Every text block has a maximum measure (see §2.1) and sits inside a margin, even inside a full-bleed image section (text is a floating plane above the image, not stretched to its edges).
- **Whitespace is a material, not a leftover.** Before adding an element to fill a "gap," ask: does the gap communicate confidence (yes, keep it) or emptiness (no, resolve with typography scale, not decoration).
- **Asymmetry is the default grid posture; balance is the exception used only for trust/technical moments.** Editorial and hero sections use asymmetric splits (see §2.2). Symmetric, centered layouts are reserved for: the Anatomy Block, technical specification tables, and the Quote form — places where the user needs to feel procedural clarity, not narrative drama.

### 1.2 Grid System
- **Base grid:** 12-column, `max-width: 1440px`, outer gutter `80px` desktop / `24px` mobile.
- **Asymmetric split (default for narrative sections):** `7/5` or `8/4` column splits. Never `6/6`. A perfectly even split reads as a template; an intentional imbalance reads as art direction.
- **Balanced/centered grid (technical sections only):** symmetric column layout, e.g. 3-up equal columns for the Anatomy Block layers, or a centered `max-w-[640px]` single column for the Quote form.
- **Alignment discipline:** text baselines align to a strict 8px baseline unit. All spacing values must be multiples of 8 (8, 16, 24, 32, 48, 64, 96, 160). No arbitrary values like `13px` or `22px`.

### 1.3 Visual Hierarchy
1. **Material/Imagery** (the panel, the texture, the building) — always the largest visual mass on a screen.
2. **Headline** (serif, large, sparse) — the single idea of the section.
3. **Supporting copy** (sans, small, tight measure) — never competes with the headline for attention; always noticeably smaller and quieter (lower contrast, `text-slate/70` equivalent).
4. **Interface chrome** (nav, buttons, labels) — smallest, most restrained, never decorated.

Only **one** element per screen may carry the accent color (Warm Sand). If in doubt, the accent goes on the CTA, not the decoration.

---

## 2. Visual Identity — Technical Specification

### 2.1 Typography

**Display / Headline typeface:** A high-contrast, editorial serif with confident thin strokes — think **"Canela," "GT Sectra," or "Söhne Serif"** class faces. If licensing is a constraint, fallback stack: `"Fraunces", "Canela", "Times New Instrument", Georgia, serif` — **Fraunces** (variable font, Google Fonts) is the approved production fallback because its optical sizing and softness at large scale avoid the "generic Playfair" AI tell.

**Body / UI typeface:** A neutral, engineered grotesque — **"Neue Haas Grotesk," "Suisse Int'l,"** or fallback **"Inter"** with tightened tracking, or preferably **"General Sans"** (free, geometric, less "default" than Inter). Body copy must never use the same family as the headline.

**Type scale (desktop / mobile):**

| Role | Font | Size (desktop) | Size (mobile) | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|
| Display XL (Hero headline) | Fraunces | 120px / 7.5rem | 56px / 3.5rem | 400 (Light/Regular, never Bold) | 0.95 | -0.02em |
| Display L (Section headline) | Fraunces | 64px / 4rem | 40px / 2.5rem | 400 | 1.05 | -0.01em |
| Display M (Subsection) | Fraunces | 40px / 2.5rem | 28px | 400 Italic (for editorial callouts only) | 1.1 | 0 |
| Eyebrow / Label | General Sans | 13px | 12px | 500 Medium | 1.2 | **0.18em, uppercase** |
| Body Large | General Sans | 20px | 17px | 400 | 1.6 | 0 |
| Body Standard | General Sans | 16px | 15px | 400 | 1.65 | 0 |
| Caption / Technical data | General Sans Mono or "IBM Plex Mono" | 13px | 12px | 400 | 1.4 | 0.02em |
| Button / Nav label | General Sans | 14px | 14px | 500 | 1 | 0.08em, uppercase |

**Rules:**
- Headlines are **never bold**. Weight comes from size and contrast, not boldness. Bold serif reads as "template real-estate site."
- Never center-align body paragraphs. Left-align only. Centered display headlines are permitted only in the Hero, and only when paired with an asymmetric supporting element (see §3.2).
- Max measure (line length) for body copy: **62 characters (~ `max-w-[42ch]` / `max-w-[560px]`)**. Never let paragraph text stretch full-column width.
- Eyebrows (small uppercase labels above headlines, e.g. "COLLECTION 02 — WOOD LOOK SERIES") are mandatory above every Display L headline to establish the editorial/technical dual voice.

### 2.2 Color Palette

| Token | Hex | Role | Usage Rule |
|---|---|---|---|
| `carbon` | `#0D0D0D` | Primary dark background / primary text on light | Used for full-bleed dark sections (Hero, Anatomy Block background, Footer) and as body text color on light backgrounds. Never pure black `#000` anywhere. |
| `slate` | `#1A1A1A` | Secondary dark / surface elevation on dark | Used for cards, panel surfaces, and nav bar background *on scroll* within dark sections. Creates the one-step elevation from Carbon without a drop shadow. |
| `sand` | `#D4C3B3` | **The only accent color** | Reserved exclusively for: (1) primary CTA button fill, (2) the active state of the Style Toggle, (3) thin 1px hairline dividers on dark backgrounds, (4) hover underline on nav links. Never used as a background fill larger than a button or chip. |
| `off-white` | `#F5F5F5` | Primary light background / primary text on dark | Base background for light sections (Anatomy technical detail, Quote form, most body copy sections). Used as text color on Carbon/Slate backgrounds. |

**Usage ratios per screen (approximate, for agent calibration):**
- Dark sections (Hero, statement moments): 85% Carbon/Slate, 12% Off-White (type/imagery), 3% Sand (single CTA or accent line).
- Light sections (specs, form, footer-adjacent content): 85% Off-White, 12% Carbon (type), 3% Sand (accent only).

**Hard rule:** Sand is never used for large surface fills, hero backgrounds, or illustrative color blocking. It is a *punctuation mark*, not a paint color. If an agent finds itself filling a full section background with `#D4C3B3`, this is a violation.

### 2.3 Imagery & Motion

**Photography direction:**
- **Hero footage:** cinematic, slow, wide architectural establishing shots — buildings clad in the product at golden hour or overcast diffused light (never harsh midday sun, never blue-sky-and-green-grass stock aesthetic). Color-graded toward Carbon/Sand — desaturate greens and blues in post so the panel's warmth is the only warm note in frame.
- **Macro shots:** extreme close-up of panel grain/texture and the metal substrate edge, shot with shallow depth of field, used specifically to sell "this is engineered, not painted wood." Always paired with a technical caption (material name + a single spec, e.g. "0.6mm anodized aluminum core").
- Never use generic stock photography of generic "modern homes." Every image must show the actual product, a macro of the actual material, or an abstracted technical diagram of it.

**Motion principles:**
- Motion exists to reveal hierarchy on scroll, never to decorate. Every animated element must be earning "attention" it wouldn't otherwise get.
- **Library:** Framer Motion for all React entry/scroll animations.
- **The "Glide" standard easing** (use for all section reveals, image parallax, and panel transitions):
  ```js
  const glide = { duration: 1.1, ease: [0.16, 1, 0.3, 1] }; // custom cubic-bezier "expo-out" glide
  ```
- **The "Precision" easing** (use for UI micro-interactions: buttons, toggles, nav state changes — must feel mechanical, not soft):
  ```js
  const precision = { type: "spring", stiffness: 280, damping: 30, mass: 0.9 };
  ```
- **Entry animation pattern (standard for all sections):** `opacity: 0 → 1` combined with `y: 24 → 0` (never more than 24px of travel — large translate distances read as "AI slide-in template"). Stagger children by `0.08s` max.
- **Never:** bounce easing, elastic easing, rotation on entry, scale-up-from-0 entry, confetti/particle effects, parallax beyond 15% speed differential (subtlety is the tell of craft).
- Video hero: must autoplay muted, loop seamlessly, 6–10 second loop length, with a very slow (`scale: 1 → 1.05` over 10s+, `ease: "linear"`) Ken Burns drift — never a static frozen hero video frame.

---

## 3. Component Architecture

### 3.1 Navbar
- **Structure:** Logo (left) — 4 max nav items (center-right or right-aligned, never centered as a group) — single CTA "Request a Quote" (far right, Sand-filled button).
- **Behavior:** Transparent over Hero (text in Off-White with a subtle text-shadow-free contrast scrim only if needed via a 10% black gradient, never a boxed background). On scroll past `80vh`, background transitions to `Slate` at 92% opacity with a **1px bottom hairline in Sand at 20% opacity** — no shadow, ever.
- **Sizing:** height `88px` desktop / `64px` mobile. Logo max-height `24px`.
- **Transition:** background/color transition uses `precision` easing, `duration: 0.4s`, triggered by scroll position, not scroll velocity.
- **Mobile:** hamburger opens a full-screen Carbon overlay with nav items in Display M serif type, staggered fade-up entry using `glide`.
- **No-go:** no drop shadow under the navbar at any scroll state; no rounded pill background on nav links; no sticky nav that appears/disappears aggressively on scroll-up/down (it should be a single, calm state change).

### 3.2 Hero Section — "Innovator-Curator" Narrative Flow
The Hero must resolve the brand tension in three beats, not one static banner:

1. **Beat 1 — Material truth (0–100vh):** Full-bleed cinematic hero video (slow Ken Burns, per §2.3) of an actual clad building. Eyebrow label top-left: `"ENGINEERED WOOD-LOOK CLADDING"`. Asymmetric headline block bottom-left (never centered): Display XL serif, max 4-5 words (e.g. *"Wood's warmth. Metal's will."*). A single Sand CTA button bottom-right, aligned to the opposite corner from the headline — this diagonal tension between text and CTA is the intended asymmetric signature.
2. **Beat 2 — Scroll-triggered reveal (100–160vh):** As the user scrolls, the video pins and *desaturates/darkens* slightly (via a CSS filter transition, `glide` easing) while a secondary panel slides up from below: a short editorial line (Body Large, max 18 words) that reframes the product as engineering, e.g. establishing the 3-layer composition — this is the bridge into the Anatomy Block.
3. **Beat 3 — Handoff:** Hero releases scroll-pin, transitions directly into the Anatomy Block with no gap (the Anatomy Block's dark background should visually continue the Hero's Carbon tone so the transition feels like one continuous material story, not a page break).

**Technical note for Cursor:** implement Beat 1→2 pin using `position: sticky` on the hero container with a height of `200vh`, not JS scroll-jacking libraries — keep it native and performant.

### 3.3 Anatomy Block — 3-Layer Composition
Displays the panel's construction: **Steel (structural core) → Polyurethane (insulating bonding layer) → Aluminum (finished wood-look face).**

- **Layout:** Balanced/centered grid (exception to asymmetry rule, per §1.2) — this is a technical diagram, it must read as rigorous, not artistic.
- **Visual form:** An exploded axonometric-style diagram (illustrated or 3D-rendered), layers separated vertically with visible gap, on a Carbon background.
- **Interaction:** Layers reveal sequentially on scroll (stagger `0.15s`, `glide` easing), each layer sliding into its assembled position from a slightly offset start (max 24px, per motion rule).
- **Callouts:** Each layer gets a technical callout card (Slate background, 1px Sand-at-20%-opacity border, **zero border-radius**): Material name (Body Standard, Off-White), one spec line (Caption/Mono, Sand), connected to its layer via a thin 1px leader line (Sand, not a shadow or arrow icon).
- **Layer order top-to-bottom must always be:** Aluminum finish (face, what you see/touch) → Polyurethane core (the engineering, insulation + bonding) → Steel backing (structural rigidity) — presented in this visible-to-structural order so the narrative goes from "what you experience" to "why it performs."
- **No-go:** no glossy 3D render with specular highlights/bloom (reads as generic product-render AI); prefer flat, precise, blueprint-adjacent illustration with subtle material shading only.

### 3.4 Style Toggle — "Wood Look" ⇄ "Metallic"
A sophisticated visual A/B switch, not a standard iOS-style toggle switch.

- **Form:** A horizontal split-label control: `WOOD LOOK` — thin vertical divider — `METALLIC`, set in Button/Nav label type (uppercase, tracked). The active label is Off-White/full-opacity; inactive is Off-White at 40% opacity. Active state underline in Sand, animated with `precision` spring easing (not a slide/fade — it should feel like a mechanical click).
- **Effect on activation:** The associated hero image/macro shot **cross-dissolves** (not slides) between the Wood Look and Metallic photography of the *same panel and same building angle* — this is critical: it must be the same product shot in both finishes, proving material versatility, not two different stock photos.
- **Cross-dissolve implementation:** two stacked `<Image>`/`<video>` layers, animate `opacity` with `glide` easing, `duration: 0.9s`. Never use a wipe/slider gimmick (default "before/after" website cliché) — the dissolve must feel like a material transforming, not a UI trick being shown off.
- **Placement:** Lives inline within product/collection sections, always paired 1:1 with the visual it controls — never a global site-wide theme toggle (this is a product-finish demonstration, not a dark-mode switch).

### 3.5 Project Planning Form — "Request a Quote"
A clean **multi-step** intake form (3 steps) — preferred over single-page for this brand: multi-step signals a *curated consultation process*, reinforcing "Innovator-Curator," not a generic contact form.

- **Step 1 — Project type:** Selectable cards (New Build / Renovation / Interior / Exterior) — cards are flat, zero radius, 1px Carbon border, fill to Carbon-on-Off-White when selected (invert, not a checkmark icon).
- **Step 2 — Material direction:** Uses the Style Toggle component (§3.4) to let the user indicate Wood Look vs. Metallic preference, plus a swatch-style selector for finish tone.
- **Step 3 — Details & contact:** Name, email, phone, project address, approx. sq. footage, timeline (dropdown), message (textarea). Fields are underline-style inputs (bottom-border only, no boxed input fields, no rounded corners) — input border is 1px Carbon at 30% opacity, transitions to full-opacity Sand on focus (`precision` easing).
- **Progress indication:** A thin 1px horizontal progress line at top of form (Sand fill over Carbon-at-20%-opacity track), with step labels in Caption type (e.g. "01 PROJECT — 02 MATERIAL — 03 DETAILS"), not a circular stepper with numbered bubbles (avoid the generic SaaS-onboarding look).
- **Submission:** On submit, form content fades out (`glide`, 0.4s) and is replaced in-place by a confirmation state — serif Display M line ("We've received your project.") plus one sans line on next steps. No modal, no toast, no confetti.
- **No-go:** no floating labels with rounded pill inputs, no multi-color validation states (validation uses Carbon/error-red-as-single-desaturated-tone only, never a bright red), no boxed "card" container around the whole form with a drop shadow.

---

## 4. Layout Composition Reference (ASCII Wireframes)

**Hero (asymmetric, Beat 1):**
```
┌──────────────────────────────────────────────────────┐
│ LOGO                    NAV NAV NAV NAV   [Quote CTA] │
│                                                        │
│  EYEBROW LABEL                                        │
│                                                        │
│  DISPLAY XL HEADLINE                                  │
│  (bottom-left, ~60% width)                            │
│                                          [Sand CTA →] │
└──────────────────────────────────────────────────────┘
        (full-bleed cinematic video background)
```

**Anatomy Block (balanced/centered):**
```
┌──────────────────────────────────────────────────────┐
│                    EYEBROW · HEADLINE                 │
│                                                        │
│              ┌───────────────┐                        │
│              │   ALUMINUM    │──── callout card        │
│              └───────────────┘                        │
│              ┌───────────────┐                        │
│              │ POLYURETHANE  │──── callout card        │
│              └───────────────┘                        │
│              ┌───────────────┐                        │
│              │     STEEL     │──── callout card        │
│              └───────────────┘                        │
└──────────────────────────────────────────────────────┘
```

**Editorial section (asymmetric 7/5):**
```
┌───────────────────────────┬──────────────┐
│                           │  Body copy    │
│      MACRO IMAGE          │  (max 42ch)   │
│                           │               │
│                           │  Eyebrow      │
│                           │  Display L    │
└───────────────────────────┴──────────────┘
```

---

## 5. Technical Implementation Notes (for Cursor)

- **Layout engine:** Tailwind CSS utility classes for all layout, spacing, and responsive behavior. Extend `tailwind.config` with the exact tokens in §2 (do not use default Tailwind gray/blue/etc. — remove unused default color palette to prevent accidental use).
- **Animation engine:** Framer Motion (`motion/react` or `framer-motion`) for all entry, scroll-triggered, and state-transition animations. Centralize the `glide` and `precision` easing/transition objects in a single `lib/motion.ts` and import everywhere — no ad hoc easing curves invented per-component.
- **Fonts:** Load Fraunces (variable, optical sizing enabled) and General Sans via `next/font` or self-hosted `@font-face` — never Google Fonts CDN `<link>` tag (performance + FOUC control).
- **Border-radius:** global Tailwind config override — set `borderRadius` scale max value to `2px` (`DEFAULT`/`sm`), remove `lg`/`xl`/`2xl`/`full` from buttons and cards entirely (only permit `rounded-full` on true circular elements like a play-button icon).
- **Shadows:** remove Tailwind's default `boxShadow` scale from config. Elevation is communicated via background color step (Carbon → Slate) and 1px hairlines only, never `box-shadow` blur.
- **Accessibility floor (non-negotiable even in a minimal design):** visible keyboard focus states (use a Sand 2px outline offset, not a browser default blue ring), respect `prefers-reduced-motion` (disable all `glide`/`precision` transitions, keep only opacity crossfades at reduced duration), color contrast on Off-White/Carbon body text must meet WCAG AA minimum.
- **Responsiveness:** all specs in §2.1 have explicit mobile values — implement mobile-first, do not simply scale desktop values down proportionally (serif display type needs more aggressive size reduction on mobile than sans body type, per the table).

### 6. The No-Go List (Hard Constraints)

Any of the following present in the implementation is a defect, not a style choice:

1. No rounded corners greater than **2px** anywhere except true circles (icons, avatars).
2. No `box-shadow` blur/soft-drop-shadows on cards, buttons, or the navbar. Elevation = color + hairline only.
3. No centered, symmetric hero layout (headline + subtext + button all centered in a stack) — this is the single most common "generic AI landing page" tell.
4. No purple/blue/teal gradient backgrounds or gradient text. No gradients of any kind except the single permitted 10% black scrim on the Hero for nav legibility.
5. No standard/default button colors (no blue, no black-with-white-text-only as the *only* button style — the primary CTA is always Sand-filled with Carbon text).
6. No stock "modern minimalist house with blue sky and green lawn" photography — every image is either the real product, a macro of it, or a technical diagram of it.
7. No bounce, elastic, or overshoot easing anywhere.
8. No icon-heavy UI (no feature-grid-with-3-icons-and-a-headline pattern) unless the icon is a genuine technical pictogram (e.g., a fire-rating symbol), never decorative line icons (no generic "checkmark in a circle" lists).
9. No emoji anywhere in production copy or UI.
10. No more than one accent color visible per screen (Sand is the only accent; Carbon/Slate/Off-White are structural, not accents).
11. No numbered-marker sections (01/02/03 badges) unless the content is a genuine sequence (the Anatomy Block's 3 layers qualify; a generic 3-feature grid does not).
12. No auto-generated placeholder copy tone ("Discover the future of...", "Elevate your space with...", "Unleash the power of...") — copy must be specific, material-literal, and restrained (see brand voice note below).
13. No hamburger-menu-with-full-nav-list-visible-on-desktop — desktop nav is max 4 links, deliberately curated, not a full sitemap dump.
14. No stacked card grids with identical rounded-white-cards-with-shadow-and-icon (the templated SaaS-feature-grid) applied to product features.

### 6.1 Brand Voice Note (for any AI-generated copy)
Write like a materials engineer who also has impeccable taste — not like a marketing generator. Prefer concrete claims over adjectives: "0.6mm anodized aluminum face over a rigid polyurethane core" beats "premium quality materials you can trust." Every sentence should be defensible as a fact or cuttable.

---

## 7. Definition of Done Checklist

Before marking any section "complete," verify against this document:
- [ ] Section vertical padding matches §1.1 (160/96px rule).
- [ ] Grid is asymmetric (7/5 or 8/4) unless it's a technical/form section (then balanced/centered).
- [ ] Headline uses Fraunces at correct weight (never bold) and correct tracking.
- [ ] Body copy measure does not exceed 42ch / 560px.
- [ ] Sand appears exactly once as an accent, nowhere as a fill background larger than a button/chip.
- [ ] All corner radii ≤ 2px, no box-shadow present.
- [ ] All entry animations use `glide` or `precision` from the shared motion lib, max 24px translate.
- [ ] No item from the §6 No-Go List is present.
- [ ] Reduced-motion and keyboard-focus states verified.

**This document supersedes visual guesswork. When uncertain, choose the option that removes an element rather than the option that adds one.**