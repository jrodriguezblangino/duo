"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { assetPath } from "@/lib/assetPath";
import { ENTRY_Y, STAGGER, glide } from "@/lib/motion";

const PANEL_BG = assetPath("/assets/images/macro_zoom_quality.webp");

const STATS = [
  {
    index: "01",
    kind: "count" as const,
    target: 3000,
    prefix: "+",
    accent: false,
    arrow: "Proyectos",
    detail: "Entregados con estándares de calidad y eficiencia.",
  },
  {
    index: "02",
    kind: "count" as const,
    target: 10,
    prefix: "+",
    accent: true,
    arrow: "Años de experiencia",
    detail: "Desarrollando soluciones que impulsan la industrialización.",
  },
  {
    index: "03",
    kind: "static" as const,
    value: "2024",
    accent: false,
    arrow: "Partner oficial Arneg",
    detail: "Alianza que fortalece nuestra oferta para el sector.",
  },
] as const;

function CountValue({
  value,
  prefix,
}: {
  value: MotionValue<string>;
  prefix: string;
}) {
  return (
    <span className="tabular-nums">
      {prefix}
      <motion.span>{value}</motion.span>
    </span>
  );
}

function CountStat({
  target,
  prefix,
  progress,
  reduce,
}: {
  target: number;
  prefix: string;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const count = useTransform(progress, [0, 1], [0, target]);
  const rounded = useTransform(count, (v) =>
    Math.round(v).toLocaleString("es-AR"),
  );

  if (reduce) {
    return (
      <span className="tabular-nums">
        {prefix}
        {target.toLocaleString("es-AR")}
      </span>
    );
  }

  return <CountValue value={rounded} prefix={prefix} />;
}

/**
 * Nosotros / stats — giant metrics (comp 07).
 */
export default function StatsBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const show = reduce || inView;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.3"],
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stats-band-heading"
      className="relative isolate overflow-hidden bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20"
      >
        <Image
          src={PANEL_BG}
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/80 to-transparent" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/35 to-transparent"
      />

      <div className="relative mx-auto max-w-site">
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={glide}
            className="max-w-[22ch] lg:max-w-[28ch]"
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-sand">
              Nosotros
            </p>
            <h2
              id="stats-band-heading"
              className="font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-[3.5rem]"
            >
              Construimos confianza con resultados.
            </h2>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ ...glide, delay: STAGGER }}
            className="max-w-[36ch] text-sm leading-relaxed text-offwhite/55 lg:pb-1.5 lg:text-base"
          >
            Combinamos innovación, experiencia y compromiso para entregar
            soluciones con paneles PIR — techo y fachada.
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <li
              key={stat.index}
              className={`relative py-8 pr-6 sm:pr-8 lg:px-8 lg:py-2 lg:first:pl-0 lg:last:pr-0 ${
                i > 0 ? "border-t border-border sm:border-t-0" : ""
              }`}
            >
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-border sm:block"
                />
              ) : null}

              <motion.div
                initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
                animate={show ? { opacity: 1, y: 0 } : undefined}
                transition={{ ...glide, delay: STAGGER * (i + 2) }}
              >
                <p
                  className={`font-headline text-[clamp(3rem,6vw,5rem)] font-normal leading-none tracking-[-0.03em] ${
                    stat.accent ? "text-sand" : "text-offwhite"
                  }`}
                >
                  {stat.kind === "count" ? (
                    <CountStat
                      target={stat.target}
                      prefix={stat.prefix}
                      progress={scrollYProgress}
                      reduce={reduce}
                    />
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-sand">
                  → {stat.arrow}
                </p>
                <div aria-hidden="true" className="mt-2 h-px w-12 bg-sand/60" />
                <p className="mt-3 max-w-[22ch] font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-offwhite/40">
                  {stat.detail}
                </p>
              </motion.div>
            </li>
          ))}
        </ul>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ ...glide, delay: STAGGER * 5 }}
          className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/40">
            Aislamiento térmico · Eficiencia · Sostenibilidad
          </p>
          <Link
            href="/tecnologia"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-offwhite underline decoration-sand underline-offset-4 hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          >
            Conocé más sobre nosotros →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
