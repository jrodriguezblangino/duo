# PROJECT ROADMAP: Fill Home Website
## Status: Planning Complete | Brand: Innovator-Curator Hybrid

This document serves as the "Source of Truth" for the development of the Fill Home website. All technical, design, and content decisions are finalized here.

---

## 1. Brand Identity & Design System

### Brand Persona
- **Innovator-Curator:** We provide deep technical authority on material science (Engineering) while delivering high-end aesthetic results (Design).
- **Tone of Voice:** Authoritative, technical, efficient, and modern. Sophisticated but reachable (not "exclusive" to the point of being intimidating).
- **Language:** Spanish (Neutral/Professional).

### Visual Style (The "Curator" Look)
- **Layout:** Minimalist, architectural, and spacious. Use significant white space.
- **Imagery:** Focus on "Macro-Photography" (textures, interlocking mechanisms) and "Full-Scale Architectural Applications" (interior/exterior).
- **Motion:** Fluid, high-end transitions. Elements should "glide" or "reveal" rather than pop. Use Framer Motion for smooth scroll-triggered reveals.

### Color Palette
- **Primary (Carbon):** #0D0D0D (Deep black for metal feel)
- **Secondary (Slate):** #1A1A1A (Soft charcoal)
- **Accent (Warm Sand):** #D4C3B3 (To complement the wood-look finish)
- **Typography (Off-White):** #F5F5F5 (Soft white for readability)

### Typography
- **Headlines:** Elegant Serif or high-end Geometric Sans (e.g., Playfair Display or Inter with high letter-spacing).
- **Body:** Clean, high-readability Sans-Serif (e.g., Inter).

---

## 2. Site Map & Content Strategy

### Page 1: Home (The Narrative Hub)
- **Hero Block:** Full-screen video/image.
  - *Headline:* Innovación que define espacios.
  - *Sub-headline:* Revestimientos de alta gama que combinan la calidez de la madera con la resistencia del metal. Diseño arquitectónico simplificado para proyectos exigentes.
  - *CTA:* Solicitar Cotización y Plan de Proyecto.
- **Anatomy Block (Technical):** "La ciencia detrás de la superficie."
  - *Features:* Steel Front (Durability), Polyurethane Core (Insulation), Aluminum Barrier (Integrity), Hidden Interlocking System (Design).
- **Transformation Block (Solution):** "Renovación sin obra pesada."
  - *Focus:* Installation over existing walls, speed, and "no-mess" process.
- **Styles Selection:** "Dos estéticas, una ingeniería superior."
  - *Visual Toggle:* Show "Wood Look" vs "Black Metallic."
- **Conversion Point:** "Diseñamos tu proyecto con precisión."
  - *Feature:* Request a Quote / Project Planning form.

### Page 2: Technology & Specs
- **Detail:** Deep dive into the 3-layer composition.
- **Gallery:** High-resolution images of the "Interior" and "Exterior" applications.
- **Technical Data Table:** Dimensions (3m x 40cm), Coverage (1.5m²), Maintenance (Washable).

### Page 3: Contact / Project Planning
- **Logic:** A "Project Planning" form.
- **Fields:** Name, Phone/WhatsApp, Project Type (Interior/Exterior/Commercial), Wall Dimensions (Width x Height), Preferred Style.
- **Outcome:** User selects "Call me" or "WhatsApp Quote."

---

## 3. Development Phases (Cursor Instructions)

### Phase 1: Project Setup & Design System
- **Goal:** Establish the technical foundation.
- **Tasks:**
  - Initialize Next.js with Tailwind CSS and TypeScript.
  - Configure `tailwind.config.ts` with the defined Color Palette and Typography.
  - Set up `framer-motion` for animations.
  - Create a global `Layout` component with a sophisticated Navbar (Logo left, "Solicitar Cotización" button right).
  - Create a global `Footer` component.

### Phase 2: Component Library
- **Goal:** Build the atomic elements.
- **Tasks:**
  - `Button.tsx`: Sophisticated hover states (smooth color shift/underline).
  - `Hero.tsx`: Video/Image background with fade-in text.
  - `FeatureCard.tsx`: For the "Anatomy" section (Icons + Text).
  - `StyleToggle.tsx`: A state-driven component to switch between Wood and Metallic visual styles.
  - `ProjectForm.tsx`: The multi-field intake form.

### Phase 3: Page Assembly
- **Goal:** Build the main views.
- **Tasks:**
  - Assemble the **Home Page** using the narrative blocks.
  - Build the **Technology Page** with the technical data tables.
  - Build the **Gallery Page** with filterable categories (Interior/Exterior).

### Phase 4: Logic & Interactivity
- **Goal:** Add the "Calculus" and "Booking."
- **Tasks:**
  - Implement the "Project Planning" logic (Input: Width/Height -> Output: Panel count based on 1.5m² coverage).
  - Connect the form to a backend (or simulated success state) that notifies the team.
  - Add scroll-reveal animations to all sections using Framer Motion.

### Phase 5: Polishing & Deployment
- **Goal:** Quality Assurance and Launch.
- **Tasks:**
  - Responsive design audit (Mobile/Tablet/Desktop).
  - Performance optimization (Image optimization for high-res assets).
  - Deploy to Vercel/GitHub Pages.

---

## 4. Source of Truth (Technical Facts)
- **Panel Dimensions:** 3 meters long x 40 cm wide.
- **Coverage:** 1.5 m² per panel.
- **Material 1:** Galvanized steel front (weather-resistant).
- **Material 2:** High-density polyurethane core (thermal/acoustic insulation).
- **Material 3:** Aluminum barrier (structural integrity).
- **Installation:** Hidden interlocking system; can be installed over existing walls.
- **Maintenance:** Washable with water and a soft cloth.
- **Styles:** Wood-look and Black Metallic.
