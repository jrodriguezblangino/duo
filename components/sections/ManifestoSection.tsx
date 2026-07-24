"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ENTRY_Y, glide } from "@/lib/motion";

/**
 * Manifesto — typographic visual break between Hero emotion and Anatomy logic.
 * Off-white field, art-directed 7/5 grid, scroll-triggered glide reveals.
 */

const BODY = [
  "Tras viajar a la Expo de Cantón, identificamos una oportunidad única: la intersección entre la ingeniería de vanguardia y la calidez de los materiales naturales. En Fill Home, no solo importamos paneles; curamos soluciones.",
  "Creemos que la arquitectura de alta gama no debería ser compleja. Nuestra misión es simplificar lo sofisticado, ofreciendo revestimientos que combinan la resistencia industrial del metal con la calidez orgánica de la madera.",
] as const;

const HEADLINE_LINES = ["Nacimos de una", "búsqueda."] as const;

const PARA_STAGGER = 0.12;
const RIGHT_DELAY = 0.28;

const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -5% 0px" } as const;

const leftVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: ENTRY_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: glide,
  },
};

const accentDraw = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { ...glide, duration: 0.9 },
  },
};

const lineMask = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.75, ease: glide.ease },
  },
};

export default function ManifestoSection() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = !!prefersReducedMotion;

  return (
    <section
      aria-labelledby="manifiesto-heading"
      className="bg-offwhite px-6 py-40 text-carbon md:py-48 lg:px-20 lg:py-[240px]"
    >
      <div className="mx-auto grid max-w-site items-start gap-12 lg:grid-cols-12 lg:gap-gutter lg:gap-y-0">
        {/* Lead — 7 cols: accent → eyebrow → headline → italic */}
        <motion.div
          className="lg:col-span-7"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={VIEWPORT}
          variants={reduce ? undefined : leftVariants}
        >
          <motion.span
            aria-hidden="true"
            className="mb-5 block h-px w-12 origin-left bg-sand md:mb-6"
            variants={reduce ? undefined : accentDraw}
          />

          <motion.p
            className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-carbon/40 md:mb-5 lg:text-[13px]"
            variants={reduce ? undefined : fadeUp}
          >
            Manifiesto
          </motion.p>

          <motion.h2
            id="manifiesto-heading"
            className="max-w-[12ch] font-headline text-[2.75rem] font-normal leading-[0.98] tracking-[-0.02em] text-carbon md:text-6xl lg:text-[4.5rem] lg:leading-[0.95]"
            variants={
              reduce
                ? undefined
                : {
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.1, delayChildren: 0.02 },
                    },
                  }
            }
          >
            {HEADLINE_LINES.map((line) => (
              <motion.span
                key={line}
                className="block overflow-hidden py-[0.05em]"
                variants={reduce ? undefined : { hidden: {}, visible: {} }}
              >
                <motion.span
                  className="block will-change-transform"
                  variants={reduce ? undefined : lineMask}
                >
                  {line}
                </motion.span>
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="mt-6 max-w-[22ch] font-headline text-[1.5rem] font-normal italic leading-[1.2] tracking-[-0.01em] text-carbon/75 md:mt-8 md:text-[1.75rem] lg:text-[2rem]"
            variants={reduce ? undefined : fadeUp}
          >
            Ingeniería que se siente como arte; diseño que se instala sin
            complicaciones.
          </motion.p>
        </motion.div>

        {/* Body — 5 cols, dropped; tiered spacing on mobile stack */}
        <div className="flex flex-col gap-0 lg:col-span-5 lg:pt-14">
          <motion.p
            className="mt-10 max-w-[36ch] text-[15px] leading-[1.7] text-carbon/65 md:text-base lg:mt-0 lg:max-w-[38ch] lg:text-[17px]"
            initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={
              reduce ? { duration: 0 } : { ...glide, delay: RIGHT_DELAY }
            }
          >
            {BODY[0]}
          </motion.p>

          <motion.div
            aria-hidden="true"
            className="my-8 h-px w-16 origin-left bg-sand/40 md:my-9 lg:my-10"
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
            viewport={VIEWPORT}
            transition={
              reduce
                ? { duration: 0 }
                : { ...glide, duration: 0.8, delay: RIGHT_DELAY + PARA_STAGGER }
            }
          />

          <motion.p
            className="max-w-[36ch] text-[15px] leading-[1.7] text-carbon/65 md:text-base lg:max-w-[38ch] lg:text-[17px]"
            initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={
              reduce
                ? { duration: 0 }
                : { ...glide, delay: RIGHT_DELAY + PARA_STAGGER * 2 }
            }
          >
            {BODY[1]}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
