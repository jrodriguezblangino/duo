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
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
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
  const show = reduce || inView;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const numeralY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [48, -48],
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.45, 0.7],
    reduce ? [0.35, 0.35, 0.35] : [0.12, 0.42, 0.18],
  );
  const hairlineScale = useTransform(
    scrollYProgress,
    [0.12, 0.42],
    reduce ? [1, 1] : [0, 1],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="garantia-heading"
      className="relative isolate overflow-hidden bg-slate text-offwhite"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(144,238,144,0.14),transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_80%,rgba(58,44,32,0.55),transparent_50%)]"
      />

      {/* Living glow behind the numeral */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-sand/25 blur-[100px] lg:left-[8%]"
        style={{ opacity: glowOpacity }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border-light/25"
      />

      <div className="relative mx-auto max-w-site px-6 py-section-mobile lg:px-20 lg:py-section">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          {/* "15 años" as one unit */}
          <div className="relative lg:col-span-5">
            <motion.p
              aria-hidden="true"
              className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-sand lg:text-[13px]"
              initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...glide, delay: 0 }}
            >
              Cobertura
            </motion.p>

            <motion.div style={{ y: numeralY }} className="relative w-fit">
              {/* Clip reveal on the numeral stack */}
              <motion.div
                className="overflow-hidden"
                initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                animate={
                  show ? { clipPath: "inset(0% 0 0 0)" } : undefined
                }
                transition={{ ...glide, delay: 0.05 }}
              >
                <p
                  className="font-headline text-[clamp(7.5rem,22vw,14rem)] font-normal leading-[0.82] tracking-[-0.04em] text-offwhite"
                  aria-hidden="true"
                >
                  {years}
                </p>
              </motion.div>

              <motion.p
                aria-hidden="true"
                className="mt-1 font-headline text-[clamp(2rem,5vw,3.25rem)] font-normal leading-none tracking-[-0.02em] text-offwhite/90"
                initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={
                  show
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : undefined
                }
                transition={{ ...glide, delay: 0.45 }}
              >
                años
              </motion.p>

              <motion.span
                aria-hidden="true"
                className="mt-5 block h-[2px] origin-left bg-sand"
                initial={reduce ? false : { scaleX: 0 }}
                animate={show ? { scaleX: 1 } : undefined}
                transition={{ ...glide, delay: 0.65 }}
              />
            </motion.div>

            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 top-8 hidden h-[75%] w-px origin-top bg-sand/50 lg:block"
              style={{ scaleY: hairlineScale }}
            />
          </div>

          {/* Right: Garantía + coverage + CTA */}
          <div className="lg:col-span-7 lg:pb-4">
            <motion.h2
              id="garantia-heading"
              className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-offwhite lg:text-[3.5rem] xl:text-[4.25rem]"
              initial={
                reduce
                  ? false
                  : { opacity: 0, y: ENTRY_Y, filter: "blur(10px)" }
              }
              animate={
                show
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : undefined
              }
              transition={{ ...glide, delay: 0.2 }}
            >
              <span className="sr-only">{YEARS} años. </span>
              Garantía
            </motion.h2>

            <motion.p
              className="mt-6 max-w-[36ch] text-base leading-[1.65] text-muted lg:text-[17px]"
              initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...glide, delay: 0.32 }}
            >
              Cobertura sobre estructura y acabado — la confianza de un
              revestimiento pensado para durar.
            </motion.p>

            <ul className="mt-10 flex flex-col gap-0 border-t border-offwhite/10 lg:mt-12">
              {ITEMS.map((item, i) => (
                <motion.li
                  key={item.detail}
                  className="group relative flex items-baseline gap-4 overflow-hidden border-b border-offwhite/10 py-4"
                  initial={
                    reduce
                      ? false
                      : { opacity: 0, x: -16, filter: "blur(6px)" }
                  }
                  animate={
                    show
                      ? { opacity: 1, x: 0, filter: "blur(0px)" }
                      : undefined
                  }
                  transition={{ ...glide, delay: 0.42 + i * STAGGER }}
                >
                  <motion.span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-full w-px origin-top ${
                      item.kind === "in" ? "bg-sand/70" : "bg-offwhite/25"
                    }`}
                    initial={reduce ? false : { scaleY: 0 }}
                    animate={show ? { scaleY: 1 } : undefined}
                    transition={{ ...glide, delay: 0.5 + i * STAGGER }}
                  />
                  <span
                    className={`pl-4 font-mono text-xs tracking-[0.08em] uppercase lg:text-[13px] ${
                      item.kind === "in" ? "text-sand" : "text-offwhite/40"
                    }`}
                  >
                    {item.kind === "in" ? "Cubierto" : "Excluido"}
                  </span>
                  <span className="font-mono text-xs tracking-[0.02em] text-offwhite/75 transition-colors duration-300 group-hover:text-offwhite lg:text-[13px]">
                    {item.detail}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10 lg:mt-12"
              initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...glide, delay: 0.7 }}
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
