"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { ENTRY_Y, glide } from "@/lib/motion";

/**
 * Anatomy Block — 3-layer composition (§3.3).
 * Photography-first: exploded product shot + edge macro.
 * Order visible → structural: Aluminum → Polyurethane → Steel.
 */

const LAYERS = [
  {
    id: "aluminum",
    name: "Aluminio anodizado",
    role: "01 · Cara vista",
    spec: "0.6 mm — wood-look / metallic",
  },
  {
    id: "polyurethane",
    name: "Poliuretano",
    role: "02 · Núcleo",
    spec: "Alta densidad — aislamiento + adhesión",
  },
  {
    id: "steel",
    name: "Acero galvanizado",
    role: "03 · Respaldo",
    spec: "Rigidez estructural del sistema",
  },
] as const;

export default function AnatomySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="anatomia-heading"
      className="bg-carbon px-6 py-24 lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="mx-auto mb-16 max-w-measure text-center lg:mb-24">
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

        {/* Hero product still — full visual authority */}
        <Reveal className="mb-16 lg:mb-24">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate">
            <Image
              src="/assets/images/exploded_view_components.png"
              alt="Perfiles y panel Fill Home: cara madera-look, núcleo compuesto y piezas de encastre"
              fill
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-4 font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
            Sistema de panel y perfiles — vista de taller
          </p>
        </Reveal>

        {/* Layer callouts — balanced technical row */}
        <div className="mb-16 grid gap-px bg-sand/20 lg:mb-24 lg:grid-cols-3">
          {LAYERS.map((layer, index) => (
            <motion.aside
              key={layer.id}
              className="bg-slate px-6 py-8"
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: ENTRY_Y }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.2 }
                  : { ...glide, delay: index * 0.15 }
              }
            >
              <p className="mb-4 font-mono text-xs tracking-[0.02em] text-offwhite/50">
                {layer.role}
              </p>
              <p className="text-base text-offwhite">{layer.name}</p>
              <p className="mt-2 font-mono text-xs tracking-[0.02em] text-sand lg:text-[13px]">
                {layer.spec}
              </p>
            </motion.aside>
          ))}
        </div>

        {/* Macro edge — engineered proof */}
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative aspect-[4/3] overflow-hidden bg-slate lg:col-span-7">
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
            <p className="mt-6 font-mono text-xs tracking-[0.02em] text-sand lg:text-[13px]">
              0.6 mm aluminio · núcleo HD · acero galvanizado
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
