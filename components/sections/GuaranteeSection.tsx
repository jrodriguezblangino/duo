"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Button from "@/components/ui/Button";
import { CTA } from "@/lib/site";
import { ENTRY_Y, STAGGER, glide } from "@/lib/motion";

const YEARS = 15;

const ITEMS = [
  { kind: "in" as const, detail: "Estructura del panel" },
  { kind: "in" as const, detail: "Acabado de cara" },
  { kind: "out" as const, detail: "Daño mecánico" },
] as const;

function useCountUp(target: number, active: boolean, reduce: boolean) {
  const [value, setValue] = useState(reduce || !active ? target : 0);

  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    if (!active) return;

    let frame = 0;
    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // expo-out matching glide
      const eased = t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduce, target]);

  return value;
}

export default function GuaranteeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const years = useCountUp(YEARS, inView, reduce);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const numeralY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const hairlineScale = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    reduce ? [1, 1] : [0, 1],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="garantia-heading"
      className="relative isolate overflow-hidden bg-slate text-offwhite"
    >
      {/* Warm atmospheric wash — separates from flat carbon above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(188,74,38,0.14),transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_80%,rgba(58,44,32,0.55),transparent_50%)]"
      />

      {/* Top edge: soft lift off Comparison */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/40 to-transparent"
      />

      {/* Bottom edge: hard break before cream Conversion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border-light/25"
      />

      <div className="relative mx-auto max-w-site px-6 py-section-mobile lg:px-20 lg:py-section">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Massive numeral */}
          <div className="relative lg:col-span-5">
            <motion.p
              aria-hidden="true"
              className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-sand lg:text-[13px]"
              initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
              animate={reduce || inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...glide, delay: 0 }}
            >
              Garantía
            </motion.p>

            <motion.div style={{ y: numeralY }} className="relative">
              <p
                className="font-headline text-[clamp(7.5rem,22vw,14rem)] font-normal leading-[0.82] tracking-[-0.04em] text-offwhite"
                aria-hidden="true"
              >
                {years}
              </p>
              {/* Draw underline under the numeral */}
              <motion.span
                aria-hidden="true"
                className="mt-4 block h-[2px] origin-left bg-sand"
                initial={reduce ? false : { scaleX: 0 }}
                animate={reduce || inView ? { scaleX: 1 } : undefined}
                transition={{ ...glide, delay: 0.35 }}
              />
            </motion.div>

            {/* Growing vertical hairline — desktop only */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 top-8 hidden h-[70%] w-px origin-top bg-sand/50 lg:block"
              style={{ scaleY: hairlineScale }}
            />
          </div>

          {/* Copy + coverage + CTA */}
          <div className="lg:col-span-7 lg:pb-4">
            <motion.h2
              id="garantia-heading"
              className="max-w-[12ch] font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-offwhite lg:text-[3.5rem] xl:text-[4.25rem]"
              initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
              animate={reduce || inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...glide, delay: 0.1 }}
            >
              <span className="sr-only">{YEARS} </span>
              años de garantía.
            </motion.h2>

            <motion.p
              className="mt-6 max-w-[36ch] text-base leading-[1.65] text-muted lg:text-[17px]"
              initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
              animate={reduce || inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...glide, delay: 0.18 }}
            >
              Cobertura sobre estructura y acabado — la confianza de un
              revestimiento pensado para durar.
            </motion.p>

            <ul className="mt-10 flex flex-col gap-0 border-t border-offwhite/10 lg:mt-12">
              {ITEMS.map((item, i) => (
                <motion.li
                  key={item.detail}
                  className="flex items-baseline gap-4 border-b border-offwhite/10 py-4"
                  initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
                  animate={reduce || inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ ...glide, delay: 0.28 + i * STAGGER }}
                >
                  <span
                    className={`font-mono text-xs tracking-[0.08em] uppercase lg:text-[13px] ${
                      item.kind === "in" ? "text-sand" : "text-offwhite/40"
                    }`}
                  >
                    {item.kind === "in" ? "Cubierto" : "Excluido"}
                  </span>
                  <span className="font-mono text-xs tracking-[0.02em] text-offwhite/75 lg:text-[13px]">
                    {item.detail}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10 lg:mt-12"
              initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
              animate={reduce || inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...glide, delay: 0.52 }}
            >
              <Button href={CTA.href} variant="primary">
                {CTA.label}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
