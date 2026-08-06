"use client";

import Image from "next/image";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { assetPath } from "@/lib/assetPath";
import { ENTRY_Y, glide } from "@/lib/motion";

const PANEL_IMG = assetPath("/assets/images/macro_zoom_quality.webp");

const LAYERS = [
  {
    index: "01",
    name: "Chapa de acero calibre 25",
  },
  {
    index: "02",
    name: "Núcleo PIR poliisocianurato",
  },
  {
    index: "03",
    name: "Acero galvanizado",
  },
] as const;

/**
 * Detalle de capas — annotated product stage (comp 05).
 */
export default function CapasSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.55", "end 0.45"],
  });

  const activeMv = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [0, 1, 2, 2]);

  useMotionValueEvent(activeMv, "change", (v) => {
    if (reduce) return;
    setActiveStep(Math.round(v));
  });

  return (
    <section
      ref={ref}
      aria-labelledby="capas-home-heading"
      className="relative bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto grid max-w-site items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/45">
            02 — Composición superior
          </p>
          <h2
            id="capas-home-heading"
            className="mt-5 font-headline text-[2.75rem] font-normal uppercase leading-[0.95] tracking-[-0.02em] lg:text-[4rem]"
          >
            Detalle
            <br />
            <span className="text-sand">de capas</span>
          </h2>
          <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-offwhite/60">
            Cada capa está diseñada para ofrecer el máximo rendimiento y
            durabilidad.
          </p>

          <ol className="mt-12 space-y-4 border-l border-border pl-5">
            {LAYERS.map((layer, i) => {
              const on = reduce || activeStep === i;
              return (
                <li
                  key={layer.index}
                  className={`font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-300 ${
                    on ? "text-sand" : "text-offwhite/35"
                  }`}
                >
                  <span className="mr-3">{layer.index}</span>
                  {layer.name}
                </li>
              );
            })}
          </ol>

          {!reduce ? (
            <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.16em] text-sand">
              Deslizá para descubrir
            </p>
          ) : null}
        </div>

        <div className="relative lg:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={glide}
            className="relative aspect-[4/3] overflow-hidden bg-slate lg:aspect-[5/4]"
          >
            <Image
              src={PANEL_IMG}
              alt="Corte de panel PIR: chapa de acero, núcleo y galvanizado"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-l from-carbon/50 via-transparent to-transparent"
            />
          </motion.div>

          <ul className="pointer-events-none absolute inset-y-6 right-0 hidden w-[44%] flex-col justify-between py-4 lg:flex">
            {LAYERS.map((layer, i) => {
              const on = reduce || activeStep === i;
              return (
                <li
                  key={layer.index}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    on ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <span aria-hidden="true" className="h-px flex-1 bg-sand/70" />
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full bg-sand"
                  />
                  <p className="max-w-[16ch] font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-sand">
                    {layer.index} — {layer.name}
                  </p>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/40">
            Rendimiento desde el interior
          </p>
        </div>
      </div>
    </section>
  );
}
