"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ENTRY_Y, STAGGER, glide } from "@/lib/motion";

const STATS = [
  {
    index: "01",
    kind: "count" as const,
    target: 3000,
    prefix: "+",
    suffix: "",
    label: "Proyectos ejecutados",
  },
  {
    index: "02",
    kind: "count" as const,
    target: 10,
    prefix: "+",
    suffix: "",
    label: "Años de trayectoria",
  },
  {
    index: "03",
    kind: "static" as const,
    value: "Arneg",
    label: "Partner oficial 2024",
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_100%_0%,rgba(144,238,144,0.07),transparent_50%)]"
      />
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
            className="max-w-[18ch]"
          >
            <h2
              id="stats-band-heading"
              className="font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-[3.5rem]"
            >
              Una década de obra.
            </h2>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ ...glide, delay: STAGGER }}
            className="max-w-[34ch] text-sm leading-relaxed text-offwhite/55 lg:pb-1.5 lg:text-base"
          >
            Partner oficial Arneg. Paneles PIR para techo y fachada: la misma
            calidad, contada a la altura del material.
          </motion.p>
        </div>

        <motion.div
          aria-hidden="true"
          className="mb-10 h-px origin-left bg-gradient-to-r from-sand/50 via-border to-transparent lg:mb-12"
          initial={{ scaleX: 0 }}
          animate={show ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ ...glide, delay: STAGGER }}
        />

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
                <span className="font-mono text-[10px] tracking-[0.16em] text-sand/80 lg:text-[11px]">
                  {stat.index}
                </span>
                <p className="mt-4 font-headline text-[clamp(2.75rem,4.5vw,4rem)] font-normal leading-none tracking-[-0.03em] text-offwhite">
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
                <p className="mt-3 max-w-[16ch] font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-offwhite/45 lg:text-xs">
                  {stat.label}
                </p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
    </section>
  );
}
