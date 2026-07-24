"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { glide, precision } from "@/lib/motion";

type StyleKey = "madera" | "metalico";

const STYLES: Record<
  StyleKey,
  {
    label: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  }
> = {
  madera: {
    label: "Aspecto madera",
    description:
      "Misma geometría de panel, misma junta oculta. Cara de aluminio con grano madera; el núcleo y el acero no cambian.",
    imageSrc: "/assets/images/detail_internal_45deg.png",
    imageAlt:
      "Detalle interno del panel Fill Home con acabado wood-look a 45°",
  },
  metalico: {
    label: "Metálico",
    description:
      "La misma construcción en acabado metálico. Cambia la cara; no el sistema.",
    imageSrc: "/assets/images/detail_internal_45deg_alt.png",
    imageAlt:
      "Detalle interno del panel Fill Home con acabado metálico a 45°",
  },
};

/**
 * Style Toggle — Aspecto madera ⇄ Metálico (§3.4).
 * Split-label + stacked opacity cross-dissolve. Never a wipe/slider.
 */
export default function StyleToggle() {
  const [active, setActive] = useState<StyleKey>("madera");
  const prefersReducedMotion = useReducedMotion();
  const keys = Object.keys(STYLES) as StyleKey[];

  return (
    <div className="flex flex-col gap-10">
      <div
        role="group"
        aria-label="Acabado del panel"
        className="flex flex-wrap items-center gap-6"
      >
        {keys.map((key, index) => (
          <div key={key} className="flex items-center gap-6">
            {index > 0 && (
              <span aria-hidden="true" className="h-4 w-px bg-offwhite/30" />
            )}
            <button
              type="button"
              aria-pressed={active === key}
              onClick={() => setActive(key)}
              className="relative pb-2 text-sm font-medium uppercase tracking-[0.08em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              <span
                className={
                  active === key ? "text-offwhite" : "text-offwhite/40"
                }
              >
                {STYLES[key].label}
              </span>
              {active === key && (
                <motion.span
                  layoutId="style-toggle-underline"
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px bg-sand"
                  transition={
                    prefersReducedMotion ? { duration: 0.15 } : precision
                  }
                />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-carbon lg:col-span-7">
          {keys.map((key) => (
            <motion.div
              key={key}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active === key ? 1 : 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.25 }
                  : { ...glide, duration: 0.9 }
              }
              aria-hidden={active !== key}
            >
              <Image
                src={STYLES[key].imageSrc}
                alt={active === key ? STYLES[key].imageAlt : ""}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                priority={key === "madera"}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col justify-end gap-8 lg:col-span-5">
          <p className="max-w-measure text-base leading-[1.65] text-offwhite/70 lg:text-[17px]">
            {STYLES[active].description}
          </p>
          <p className="font-mono text-xs tracking-[0.02em] text-offwhite/45 lg:text-[13px]">
            Misma estructura de tres capas · solo cambia la cara
          </p>
        </div>
      </div>
    </div>
  );
}
