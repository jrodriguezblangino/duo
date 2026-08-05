# Troiano dúoPANELES — Link-directo (variante shock) + Datos reales + Video

**Empresa:** dúoPANELES — Representante oficial Arneg, paneles aislantes PIR (techo y fachada).
**Web actual:** www.duopaneles.com.ar (Wix template).
**IG:** @duopaneles · **WA real (de /contacto):** **+54 9 11 6459-4688** ✅ (confirmado).
**Logo:** /public/assets/logos/duo.png — negro + verde menta `#90EE90`.
**Video aportado:** duo.mp4 (fábrica, H.264 1920×1080, 25s) → usable en hero/sección planta.
**Estrategia:** abridor CON link directo. El troiano usa SUS datos reales para que se sienta
"su" sitio, no un template. Riesgo suplantación → el texto aclara "maqueta / sin permiso" pegado al link.

---

## 0. Adaptación de color (del logo real)

Logo negro + menta `#90EE90`. Mi mockup usa `sand` (#BC4A26). Cambiamos el hex del token, no los
componentes. El fondo `carbon #17140F` (negro cálido) combina con el negro del logo.

- `sand` → `#90EE90` · `sand-hover` → `#B6F5DA`
- globals.css `::selection` bg `#90EE90` color `#17140F`; `:focus-visible` outline `#90EE90`
- Botón primary → `bg-sand text-carbon` (menta con texto oscuro = contraste WCAG).

---

## 1. Datos reales extraídos de su sitio (usar en el troiano)

**Stats (banda de credibilidad):**
- +3.000 proyectos ejecutados
- +10 años ofreciendo soluciones con paneles
- Equipo especializado de Arquitectos
- 2024 · partner oficial Arneg

**Líneas de producto (usar en StylesSection / catálogo):**
- TECHOS: WAVE LS · COVER LS · COVER LT · COVER LX · MAXIMMA
- MUROS: (línea de muros, ver /muros)
- Núcleo: poliuretano PIR con retardo al fuego · calibre acero #25
- Cara inferior: foil blanco / acero nervurado

**Aplicaciones:** Residencial · Agro e Industrial · Comercial e Institucional

**Valores de marca:** INTELIGENTE · SUSTENTABLE · A MEDIDA

**Copy real de ellos (reutilizable):**
- "Un sistema constructivo superior."
- "La solución sustentable que garantiza ahorro de energía, velocidad de obra, durabilidad y seguridad."
- "Somos el aliado inteligente de tus proyectos."

**FAQ y Biblioteca BIM** existen en su sitio → adaptar secciones FAQ del build-plan.

---

## 2. brand.config.ts (completo, con WA real)

```ts
export const BRAND = {
  name: "dúoPANELES",
  legalName: "dúoPANELES",
  tagline: "Sistema constructivo PIR — techo y fachada",
  whatsapp: "5491164594688",            // ✅ real, de /contacto
  whatsappMessage: "Hola, vi el prototipo de mi marca y quiero saber más",
  email: "hola@duopaneles.com.ar",
  phoneDisplay: "11 6459-4688",
  ctaLabel: "Hablar por WhatsApp",
  accentToken: "sand",                  // hex ya es menta (§0)
  logoLightPath: "/assets/logos/duo.png",
  logoDarkPath: "/assets/logos/duo.png",
  socialProofNote: "Partner oficial Arneg · +3.000 proyectos",
} as const;
```

---

## 3. Prompts Cursor (orden progresivo)

### Prompt D0 — Color al logo
```
tailwind.config.ts: "sand" #BC4A26 → #90EE90; "sand-hover" #D6602F → #B6F5DA. globals.css:
::selection background #90EE90 color #17140F; :focus-visible outline #90EE90. No tocar componentes.
```

### Prompt D1 — Botón + brand config
```
lib/brand.config.ts con valores dúoPANELES (name, tagline, whatsapp "5491164594688", ctaLabel
"Hablar por WhatsApp"). Button primary → bg-sand text-carbon hover:bg-sand-hover. Navbar/Footer/
WhatsAppFloat usan BRAND.
```

### Prompt D2 — Float WhatsApp (número real)
```
WhatsAppFloat abre wa.me/5491164594688 con BRAND.whatsappMessage. Z-40, oculto en menú móvil,
sin rebote si reduced-motion.
```

### Prompt D3 — Hero con video de fábrica
```
En components/ui/Hero.tsx, usar como videoSrc el archivo /assets/videos/duo.mp4 (fábrica, 25s,
loop). Mantener Ken Burns y scrim actuales. Texto:
eyebrow: "Sistema dúoPANELES"
headline: "Panel aislante PIR."
headlineContinued: "Techo y fachada de obra limpia."
bridgeLine: "Partner oficial Arneg. Aislación térmica y acústica, velocidad de obra y
durabilidad — la calidad que ya instalan, contada a la altura del material."
```
📥 Vos: copiar duo.mp4 a /public/assets/videos/duo.mp4.

### Prompt D4 — Banda de stats reales
```
StatsBand tras el Hero: "3.000+ proyectos" · "10+ años" · "Equipo de Arquitectos" · "Partner
oficial Arneg 2024". Mono + serif, reveal. Copy: "Una década vistiendo obras."
```

### Prompt D5 — Estilos: Techo / Muro (sus líneas)
```
StyleToggle/StylesSection: "Techo" / "Muro" (no madera/metálico). 📥 2 imágenes macro
(/public/assets/styles/). En catálogo, listar líneas reales: WAVE LS, COVER LS, COVER LT,
COVER LX, MAXIMMA (techos) + línea muros. Copy: "Un sistema, dos aplicaciones."
```

### Prompt D6 — Aplicaciones (3 segmentos)
```
Nueva sección ApplicationsSection: Residencial · Agro e Industrial · Comercial e Institucional
(reusa FeatureCard). Copy: "Para todos los segmentos."
```

### Prompt D7 — Atributos PIR reales
```
AttributesSection, 6 fichas: Aislación térmica superior · Aislación acústica · Velocidad de obra
· Durabilidad · Retardo al fuego (PIR) · Partner oficial Arneg. Íconos inline SVG.
```

### Prompt D8 — Valores de marca
```
Section "INTELIGENTE · SUSTENTABLE · A MEDIDA" (3 bloques, sus valores). Reusa FeatureCard o
Manifesto-style.
```

### Prompt D9 — Comparativa + garantía + proceso
```
ComparisonSection: dúoPANELES (resaltado) vs Pintura vs Ladrillo vs PVC. Filas: Aislación,
Instalación, Mantenimiento, Costo 10 años, Fuego. 📥 valores referenciales.
GuaranteeSection: "Material garantizado." 📥 años reales.
ProcessSection: Medís · Instalás · Listo (usar "velocidad de obra").
```

### Prompt D10 — FAQ (adaptar la suya)
```
FaqSection con preguntas reales de su rubro: ¿qué es PIR? ¿retardo al fuego? ¿instalación sobre
estructura existente? ¿espesores? ¿BIM? (basado en su /faq y fichas técnicas).
```

### Prompt D11 — Galería con obras
```
GalleryGrid con obras dúoPANELES. 📥 4-6 fotos de reels/obras (/public/assets/projects/).
Etiqueta mono: aplicación + obra.
```

### Prompt D12 — Verify + deploy
```
npm run build. Sin "Fill Home" fuera de brand.config, sin [VERIFY], sin debug beacon. Acento
menta aplicado. Botones primary texto carbon. Float WA → wa.me/5491164594688. Deploy GitHub Pages.
```

---

## 4. Abridor CON LINK (variante shock)

```
¡Hola! Soy Joaquín, diseñador web freelance. Estuve viendo dúoPANELES en Instagram y me
pareció que la calidad de lo que instalan no se ve reflejada en su web, que quedó un toque
anticuada. Les armé esta maqueta con su marca, sin compromiso, para que vean cómo quedaría
contada de otra forma: [LINK]
Si les gusta la idea charlamos, si no lo borran y listo jaja
```

**Follow-up (4 días, si no responden):**
```
Che, ¿llegaron a abrir la maqueta? [LINK] Por si se les perdió. Sin compromiso, solo para
que vean la onda. Cualquier cosa acá estoy.
```

---

## 5. Checklist pre-envío

- [ ] D0: token sand = #90EE90, globals.css menta
- [ ] Button primary = bg-sand text-carbon
- [ ] BRAND.whatsapp = 5491164594688 ✅
- [ ] Logo /public/assets/logos/duo.png ✅
- [ ] **duo.mp4 → /public/assets/videos/duo.mp4** (usar en hero)
- [ ] 2 imágenes estilos (techo/muro) en /public/assets/styles/
- [ ] 4-6 fotos obras en /public/assets/projects/
- [ ] Deploy GitHub Pages → URL lista
- [ ] Abrir desde el celu: confirmar menta + negro + video fábrica

**Por qué este troiano NO parece genérico:** usa sus stats (3.000 proyectos, 10 años, Arneg),
sus líneas de producto (WAVE LS, COVER LX…), sus aplicaciones (Agro/Industrial), sus valores
(INTELIGENTE/SUSTENTABLE/A MEDIDA) y su video de fábrica. El dueño abre y ve SU empresa.
