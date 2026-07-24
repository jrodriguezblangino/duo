"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { glide } from "@/lib/motion";

/**
 * Anatomy Block — 3-layer composition (§3.3).
 * Exploded-diagram list: spine + numerals reinforce stacked layers.
 * Order visible → structural: Aluminum → Polyurethane → Steel.
 */

const LAYERS = [
  {
    id: "aluminum",
    index: "01",
    role: "Cara vista",
    name: "Aluminio anodizado",
    spec: "0.6 mm — wood-look / metallic",
  },
  {
    id: "polyurethane",
    index: "02",
    role: "Núcleo",
    name: "Poliuretano",
    spec: "Alta densidad — aislamiento + adhesión",
  },
  {
    id: "steel",
    index: "03",
    role: "Respaldo",
    name: "Acero galvanizado",
    spec: "Rigidez estructural del sistema",
  },
] as const;

/** Consistent mono label style across the section */
const MONO_MUTED =
  "font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]";
const MONO_ACCENT =
  "font-mono text-xs tracking-[0.02em] text-sand lg:text-[13px]";

/** Major block rhythm — mobile 48px / desktop 80px */
const BLOCK_GAP = "mb-12 lg:mb-20";

/** Horizontal entry travel for layer build — within 24px motion budget */
const ENTRY_X = 20;

export default function AnatomySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="anatomia-heading"
      className="bg-carbon px-6 py-24 lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className={`mx-auto max-w-measure text-center ${BLOCK_GAP}`}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
            Composición — tres capas
          </p>
          <h2
            id="anatomia-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-6xl"
          >
            De la superficie a la estructura.
          </h2>
        </Reveal>

        {/* Hero product still — Aspecto madera (shared with Colección) */}
        <Reveal className={`mx-auto w-full max-w-4xl ${BLOCK_GAP}`}>
          <div className="relative aspect-[16/9] w-full max-h-[560px] overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate">
            <Image
              src="/assets/images/detail_internal_45deg.png"
              alt="Detalle interno del panel Fill Home con acabado wood-look a 45°"
              fill
              sizes="(min-width: 1280px) 896px, (min-width: 768px) 720px, calc(100vw - 3rem)"
              className="object-cover object-[62%_50%]"
              priority
            />
          </div>
          <p className={`mt-4 ${MONO_MUTED}`}>
            Sistema de panel y perfiles — vista de taller
          </p>
        </Reveal>

        {/* Layer breakdown — vertical exploded diagram */}
        <ol
          className={`relative mx-auto max-w-xl list-none space-y-10 pl-0 lg:mx-0 lg:max-w-2xl lg:space-y-14 ${BLOCK_GAP}`}
        >
          {/* Spine / axis through numeral centers */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-[1.125rem] top-3 w-px bg-offwhite/20 lg:bottom-4 lg:left-[1.75rem] lg:top-4"
          />

          {LAYERS.map((layer, index) => (
            <motion.li
              key={layer.id}
              className="relative grid grid-cols-[2.25rem_1fr] items-start gap-x-5 lg:grid-cols-[3.5rem_1fr] lg:gap-x-8"
              initial={
                prefersReducedMotion ? false : { opacity: 0, x: -ENTRY_X }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.2 }
                  : { ...glide, delay: index * 0.15 }
              }
            >
              {/* Blueprint index numeral */}
              <span
                aria-hidden="true"
                className="relative z-[1] text-center font-mono text-[1.75rem] font-light leading-none tracking-tight text-offwhite/30 lg:text-[2.75rem]"
              >
                {layer.index}
              </span>

              {/* Tick branches from spine into the text column */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[1.125rem] top-[0.55em] h-px w-5 -translate-y-1/2 bg-offwhite/30 lg:left-[1.75rem] lg:top-[0.85em] lg:w-8"
              />

              <div className="min-w-0 pt-0.5 lg:pt-1">
                <p className={MONO_MUTED}>
                  <span className="sr-only">{layer.index} · </span>
                  {layer.role}
                </p>
                <p className="mt-2 font-headline text-xl font-normal leading-snug text-offwhite lg:text-[1.75rem]">
                  {layer.name}
                </p>
                <p className={`mt-3 ${MONO_ACCENT}`}>{layer.spec}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Macro edge — engineered proof */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate lg:col-span-7">
            <Image
              src="/assets/images/macro_zoom_quality.png"
              alt="Macro del canto del panel: cara metálica, núcleo y acabado madera-look"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
              Detalle de canto
            </p>
            <p className="font-headline text-[1.75rem] font-normal italic leading-[1.1] text-offwhite lg:text-[2.5rem]">
              Tolerancia visible.
            </p>
            <p className="mt-6 max-w-measure text-base leading-[1.65] text-offwhite/70">
              Cara de aluminio anodizado sobre núcleo de poliuretano y
              respaldo de acero. El canto muestra las tres capas sin
              maquillaje de render.
            </p>
            <p className={`mt-6 ${MONO_ACCENT}`}>
              0.6 mm aluminio · núcleo HD · acero galvanizado
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
