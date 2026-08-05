# Análisis Senior + Plan de Adaptación — Trojan para Pietra Panel

**Contexto:** Tu mockup (`fill-home`) es un sitio de autoría "warm-industrial / architectural
premium" (Fraunces + General Sans + IBM Plex Mono, carbon #17140F / sand #BC4A26, scroll-scrub,
2px radius, sin blur shadows). Pietra Panel es fabricante nacional de paneles de poliuretano con
estilos Industrial / Brutalista / Clásico y alianza Teto Vinílico. El objetivo: un **troiano** —
tu mockup re-skinneado con su marca, sus estilos y su tono — para enviárselo y que vean "su" sitio
a la altura del producto.

**Fuente de verdad (extraída de pietrapanel.com):** fabricante desde 2012, El Palomar; estilos
Industrial/Brutalista/Clásico; atributos: instalación rápida y limpia, fácil de instalar, material
seguro (retardante de llamas), ligero, eficiencia económica, kit incluido; alianza Teto Vinílico;
web en Wix plantilla genérica; WA 11 4097-5419; IG @pietra_panel.

---

## 1. Auditoría de estudio (lo que el sitio actual comunica vs. lo que es)

| Dimensión | Estado actual Pietra | Falla de comunicación | Qué debe hacer el troiano |
|-----------|---------------------|-----------------------|---------------------------|
| **Jerarquía** | Hero genérico "LA SOLUCIÓN RÁPIDA…" + botón catálogo | No dice *quién* es ni por qué importa; el producto queda como commodity | Hero que nombre la marca y el sistema, no un slogan vacío |
| **Prueba social** | Stats (20k m², 870 arquitectos, 2012) hundidas al pie | La credibilidad más fuerte está escondida | Bandas de stats visibles, temprano, con peso tipográfico |
| **Estilos** | 3 tarjetas sueltas (Industrial/Brutalista/Clásico) | No se siente "colección", se siente lista | Toggle/navegación de estilos tipo tu `StyleToggle`, con macro de textura |
| **Confianza** | Sin garantía, sin comparativa, sin proceso | El comprador industrial necesita reducir riesgo | Secciones: comparativa, garantía, proceso/instalación |
| **Canal** | WA en footer, poco visible | El dueño vive en WA; el sitio no lo empuja | Float WA + CTA con su número real |
| **Estética** | Template Wix, radios grandes, sombras, tipo genérico | "Anticuado / del '15" vs. producto de 10 años | Tu sistema: serif display, 2px, sin blur, motion con intención |

**Veredicto de estudio:** el producto es de otra liga; la web lo traiciona. El troiano no debe
"imitar" su sitio, sino **mostrar la versión que merecen** — manteniendo tu autoría (eso es lo que
vende tu trabajo) pero hablando el lenguaje de ellos (estilos, atributos, alianza, WA).

---

## 2. Principios de adaptación (no romper tu sistema)

1. **Mantener el sistema de diseño.** No imites el Wix de ellos. Tu paleta carbon/sand, tu tipo,
   tu motion — eso es el valor. Solo cambiás *contenido* y *accent* por marca.
2. **Cambiar `madera/metálico` por `Industrial/Brutalista/Clásico`** en todo el flujo de estilos.
3. **Pietra es fabricante, no importador** — el copy debe decir "sistema constructivo", no "importamos".
4. **WA real** en float + nav + footer (11 4097-5419). Esto es clave: el troiano debe poder
   "llamarlos" con un clic.
5. **Stats y atributos reales** de su sitio, nada inventado.

---

## 3. Prompts progresivos para Cursor Agent

> Ejecutá en orden. Cada uno asume tu stack (Next 16 / Tailwind 4 / Framer 12) y tus primitivos
> (`Button`, `Reveal`, `StyleToggle`, `SectionLoopVideo`, `lib/brand.config.ts`).
> 📥 = vos aportás antes de ese paso.

### Prompt P1 — Brand config para Pietra (base del troiano)
```
Crea/actualiza lib/brand.config.ts con estos valores para el troiano Pietra Panel:
name: "Pietra Panel", tagline: "Sistema constructivo, no revestimiento decorativo",
whatsapp: "5491140975419", whatsappMessage: "Hola, vi el prototipo de mi marca y quiero saber más",
email: "hola@pietrapanel.com" (placeholder), phoneDisplay: "11 4097-5419",
ctaLabel: "Hablar por WhatsApp", accentToken: "sand". Mantener igual el resto del sitio.
Verificar que Navbar, Footer y el nuevo float usen estos valores.
```

### Prompt P2 — Float WhatsApp con su número
```
Crea components/ui/WhatsAppFloat.tsx usando BRAND.whatsapp y BRAND.whatsappMessage de brand.config.
Botón fijo abajo-derecha (z-40), oculto cuando el menú móvil está abierto, sin rebote si
prefers-reduced-motion. Ícono inline SVG de WhatsApp, label "WhatsApp". Montarlo en layout.tsx.
```

### Prompt P3 — Estilos: Industrial / Brutalista / Clásico
```
En components/ui/StyleToggle.tsx y en StylesSection, reemplaza las opciones "madera"/"metálico"
por "Industrial" / "Brutalista" / "Clásico". 📥 (vos: 3 imágenes macro de cada estilo en
/public/assets/styles/). Usar esas imágenes en el toggle y en la galería. Mantener el mecanismo
de reveal y el subrayado sand existente. El copy del bloque: "Un sistema, tres estilos."
```

### Prompt P4 — Hero adaptado (sin slogan vacío)
```
En app/page.tsx, cambia el Hero:
eyebrow: "Sistema PIETRA PANEL"
headline: "Revestimiento de ingeniería."
headlineContinued: "Tres estilos, una sola obra limpia."
bridgeLine: "Panel de poliuretano con instalación rápida y sin obra pesada. La calidad que ya
fabrican, contada a la altura del material."
Mantener video cinematográfico y scrim actuales. No agregar CTA sobre el video.
```

### Prompt P5 — Banda de stats temprana (prueba social)
```
Crea components/sections/StatsBand.tsx e insertala después del Hero (antes de Manifesto):
fondo carbon, 3 datos mono+serif: "Desde 2012" · "+20.000 m² revestidos" · "870 arquitectos
confiaron". Entrada con Reveal. Sin inventar otros números. Copy de apoyo: "Una década vistiendo
paredes y cielorrasos."
```
*(Nota de estrategia: estos números van en la banda temprana, NO en el mensaje de WA — ya lo
acordamos. Acá sí, porque en el sitio suman credibilidad.)*

### Prompt P6 — Atributos (6 fichas reales)
```
Crea components/sections/AttributesSection.tsx (reusa FeatureCard) después de Anatomy/Transformation:
6 fichas con los atributos reales de su sitio: Instalación rápida y limpia, Fácil de instalar,
Material seguro (retardante de llamas), Ligero y práctico, Eficiencia económica, Kit incluido.
Cada ficha: ícono simple (inline SVG, sin deps) + título + 1 línea. Off-white o carbon alternando.
```

### Prompt P7 — Alianza Teto Vinílico
```
Crea components/sections/AllianceSection.tsx después de Attributes: bloque "Alianza Teto Vinílico"
con copy: "Sistemas de cielorraso que optimizan tiempos de obra y elevan la estética en interiores."
📥 (vos: 1 imagen de cielorraso Teto). CTA secundaria opcional a su catálogo.
```

### Prompt P8 — Comparativa (cierra la objeción)
```
En ComparisonSection (build-plan Phase 5),列 usa columnas: PIETRA PANEL (resaltado sand +
chip "Recomendado"), Pintura, Ladrillo, PVC. Filas: Durabilidad, Instalación, Mantenimiento,
Costo a 10 años, Resistencia al fuego. 📥 (vos: valores referenciales; usar el atributo
"retardante de llamas" como diferenciador real). Disclaimer "Valores referenciales".
```

### Prompt P9 — Garantía + Proceso de instalación
```
Crea GuaranteeSection (build-plan Phase 6) con copy neutral: "Material seguro y garantizado."
📥 (vos: años de garantía reales). Y ProcessSection: 3 pasos (Medís · Instalás · Listo) usando
el atributo "instalación en pocas horas, sin polvo". Reusa Reveal y el ritmo de tu sitio.
```

### Prompt P10 — Galería y proyectos con su voz
```
Extiende GalleryGrid con imágenes de sus estilos (📥 vos: 4-6 fotos de obras reales en
/public/assets/projects/). Etiquetas mono: estilo + ubicación. Opcional before/after (build-plan
Phase 7.2) con 1-2 obras. Copy: "El material, en obra."
```

### Prompt P11 — CTA final + footer con su WA
```
En ConversionSection y Footer, el CTA principal debe ser WhatsApp (BRAND.whatsapp) con su número,
y el formulario /contacto queda como secundario. Footer: sumar "11 4097-5419" y "Sistema PIETRA
PANEL — El Palomar, Buenos Aires".
```

### Prompt P12 — Verify
```
npm run build. Confirmar: sin "Fill Home" fuera de brand.config, sin [VERIFY], sin debug beacon.
Contrast text-muted/slate y offwhite/70/carbon >= 4.5:1. Reduced-motion OK. Float WA abre
wa.me/5491140975419 con mensaje pre-cargado.
```

---

## 4. Checklist de entrega del troiano

- [ ] `brand.config.ts` = Pietra Panel + WA real
- [ ] Float WA funcionando en todas las páginas
- [ ] Estilos: Industrial / Brutalista / Clásico (no madera/metálico)
- [ ] Banda de stats temprana (2012 / 20k m² / 870 arquitectos)
- [ ] 6 atributos reales
- [ ] Bloque Teto Vinílico
- [ ] Comparativa + garantía + proceso
- [ ] Galería con obras reales (📥 fotos tuyas)
- [ ] Deploy en GitHub Pages con URL limpia para enviar

**El link que le pasás al dueño es este deploy.** Tu autoría queda intacta (eso vende tu laburo);
el contenido habla Pietra (eso los hace abrir y creer que "es suyo").

---

## 5. Nota de estrategia (importante)

Este troiano es **prueba de concepto**. Pietra es fabricante, no importador — queda afuera de tu
blanco original, pero es el mejor para demostrar el método. En el mensaje de WA (ya acordado) NO
mencionás los números ni la comparativa: solo "su web se ve un toque vieja, le queda grande al
producto, le armé una maqueta." El sitio se encarga de mostrar el resto cuando lo abren.
