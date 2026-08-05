"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { TECHO_LINES, MURO_LINES, type ProductLine } from "@/lib/productLines";
import { ENTRY_Y, STAGGER, glide, precision } from "@/lib/motion";

type Tab = "techo" | "muro";

const TABS: { id: Tab; label: string }[] = [
  { id: "techo", label: "Techo" },
  { id: "muro", label: "Muro" },
];

function LineCard({ line, index }: { line: ProductLine; index: number }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: 8 }}
      transition={{ ...glide, delay: reduce ? 0 : index * STAGGER }}
      className="group relative flex flex-col justify-between border border-border bg-slate/40 p-6 transition-colors duration-200 hover:border-sand/40 lg:min-h-[220px] lg:p-8"
    >
      <span className="font-mono text-[10px] tracking-[0.16em] text-sand/80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mt-8">
        <h3 className="font-headline text-2xl font-normal tracking-[-0.02em] text-offwhite lg:text-[1.75rem]">
          {line.name}
        </h3>
        <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-offwhite/55">
          {line.blurb}
        </p>
      </div>
    </motion.article>
  );
}

/**
 * Líneas Techo / Muro — WAVE LS, COVER*, MAXIMMA (comp 03).
 * Tab switch only; no wood/metal finish leftover.
 */
export default function ProductLinesSection() {
  const [tab, setTab] = useState<Tab>("techo");
  const baseId = useId();
  const lines = tab === "techo" ? TECHO_LINES : MURO_LINES;

  return (
    <section
      aria-labelledby="lineas-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="mb-10 max-w-[28ch] lg:mb-14">
          <h2
            id="lineas-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-6xl"
          >
            Un sistema, dos aplicaciones.
          </h2>
        </Reveal>

        <div
          role="tablist"
          aria-label="Líneas de producto"
          className="mb-10 flex gap-0 border-b border-border"
        >
          {TABS.map((t) => {
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`${baseId}-${t.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setTab(t.id)}
                className={`relative px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                  selected ? "text-sand" : "text-offwhite/45 hover:text-offwhite/70"
                }`}
              >
                {t.label}
                {selected ? (
                  <motion.span
                    layoutId="lineas-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-px bg-sand"
                    transition={precision}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-${tab}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              className={`grid gap-px bg-border ${
                tab === "techo"
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "sm:grid-cols-1 lg:max-w-md"
              }`}
            >
              {lines.map((line, i) => (
                <LineCard key={line.id} line={line} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
