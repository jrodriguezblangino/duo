"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { assetPath } from "@/lib/assetPath";
import { TECHO_LINES, MURO_LINES, type ProductLine } from "@/lib/productLines";
import { ENTRY_Y, STAGGER, glide } from "@/lib/motion";

type Tab = "techo" | "muro";

const PANEL_THUMB = assetPath("/assets/images/macro_zoom_quality.webp");

const ZERO_POINTS = [
  "ZERO madera",
  "ZERO deck de madera",
  "ZERO revestimiento tipo madera",
] as const;

/**
 * Líneas Techo / Muro — left rail + dense product rows (comp 03).
 */
export default function ProductLinesSection() {
  const [tab, setTab] = useState<Tab>("techo");
  const baseId = useId();
  const reduce = useReducedMotion() ?? false;
  const lines = tab === "techo" ? TECHO_LINES : MURO_LINES;

  return (
    <section
      aria-labelledby="lineas-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left rail */}
        <div className="lg:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/45">
            Paneles térmicos aislados
          </p>

          <div
            role="tablist"
            aria-label="Aplicación"
            className="mt-8 inline-flex border border-border p-1"
          >
            {(["techo", "muro"] as const).map((id) => {
              const selected = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`${baseId}-${id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(id)}
                  className={`px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                    selected
                      ? "bg-sand text-carbon"
                      : "text-offwhite/55 hover:text-offwhite"
                  }`}
                >
                  {id === "techo" ? "Techo" : "Muro"}
                </button>
              );
            })}
          </div>

          <h2
            id="lineas-heading"
            className="mt-10 font-headline text-[2.25rem] font-normal leading-[1.05] tracking-[-0.02em] text-offwhite lg:text-[2.75rem]"
          >
            Un sistema,{" "}
            <span className="text-sand">dos aplicaciones.</span>
          </h2>

          <ul className="mt-10 space-y-3">
            {ZERO_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-offwhite/70"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-5 w-5 items-center justify-center border border-sand text-[10px] text-sand"
                >
                  /
                </span>
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[28ch] border-t border-border pt-6 text-sm leading-relaxed text-offwhite/55">
            Paneles metálicos aislantes{" "}
            <span className="text-sand">PIR</span> para cubiertas y fachadas.
          </p>
        </div>

        {/* Right: dense rows */}
        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-${tab}`}
          className="lg:col-span-8"
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 8 }}
              transition={glide}
              className="border-t border-border"
            >
              {lines.map((line, i) => (
                <LineRow key={line.id} line={line} index={i} reduce={reduce} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProfileGlyph({ id }: { id: string }) {
  /** Abstract profile silhouettes — decorative, not technical drawings. */
  const paths: Record<string, string> = {
    "wave-ls": "M0 12 Q8 2 16 12 T32 12 T48 12 T64 12",
    "cover-ls": "M0 14 L8 4 H12 L16 14 L24 4 H28 L32 14 L40 4 H44 L48 14 L56 4 H60 L64 14",
    "cover-lt": "M0 14 L16 4 H22 L32 14 L48 4 H54 L64 14",
    "cover-lx": "M0 14 L20 4 H28 L40 14 L52 4 H60 L64 14",
    maximma: "M0 14 L4 4 H8 L12 14 L16 4 H20 L24 14 L28 4 H32 L36 14 L40 4 H44 L48 14 L52 4 H56 L60 14 L64 8",
    "fachada-pir": "M0 8 H64 M0 12 H64",
  };
  const d = paths[id] ?? "M0 10 H64";
  return (
    <svg
      viewBox="0 0 64 16"
      className="hidden h-4 w-20 shrink-0 text-sand sm:block"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d={d} />
    </svg>
  );
}

function LineRow({
  line,
  index,
  reduce,
}: {
  line: ProductLine;
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...glide, delay: reduce ? 0 : index * STAGGER }}
      className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-5 sm:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1fr)_5.5rem_auto] sm:gap-5 lg:py-6"
    >
      <div>
        <h3 className="font-headline text-xl tracking-[-0.02em] text-offwhite lg:text-2xl">
          {line.name}
        </h3>
        <p className="mt-1 text-sm text-offwhite/50">{line.blurb}</p>
      </div>

      <ProfileGlyph id={line.id} />

      <div className="relative hidden h-16 overflow-hidden bg-slate sm:block sm:h-20">
        <Image
          src={PANEL_THUMB}
          alt=""
          fill
          sizes="180px"
          className="object-cover opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:scale-[1.04]"
        />
      </div>

      <span
        aria-hidden="true"
        className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-sand/80 sm:block"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center border border-sand/50 font-mono text-lg leading-none text-sand transition-colors duration-200 group-hover:bg-sand group-hover:text-carbon"
      >
        +
      </span>
    </motion.li>
  );
}
