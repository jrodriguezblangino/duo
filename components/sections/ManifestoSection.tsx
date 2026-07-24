"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { glide } from "@/lib/motion";

/**
 * Manifesto — typographic visual break between Hero emotion and Anatomy logic.
 * Off-white field, art-directed 7/5 grid, scroll-scrubbed kinetic type + spine.
 */

const BODY_LEAD =
  "Tras viajar a la Expo de Cantón, identificamos una oportunidad única: la intersección entre la ingeniería de vanguardia y la calidez de los materiales naturales.";

const PULL_QUOTE =
  "En Fill Home, no solo importamos paneles; curamos soluciones.";

const BODY_CLOSE =
  "Creemos que la arquitectura de alta gama no debería ser compleja. Nuestra misión es simplificar lo sofisticado, ofreciendo revestimientos que combinan la resistencia industrial del metal con la calidez orgánica de la madera.";

/** Headline words for scroll-scrub reveal — "búsqueda." carries the accent */
const HEADLINE_WORDS = [
  { text: "Nacimos", accent: false },
  { text: "de", accent: false },
  { text: "una", accent: false },
  { text: "búsqueda.", accent: true },
] as const;

const VIEWPORT = { once: true, amount: 0.3, margin: "0px 0px -8% 0px" } as const;

const BLUR_MAX = 5;

type ScrubWordProps = {
  text: string;
  accent: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
};

function ScrubWord({
  text,
  accent,
  index,
  total,
  progress,
  reduce,
}: ScrubWordProps) {
  const start = (index / total) * 0.55;
  const end = start + 0.4;

  const opacity = useTransform(progress, [start, end], [0.3, 1]);
  const blur = useTransform(progress, [start, end], [BLUR_MAX, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  const colorClass = accent ? "text-sand" : "text-carbon";

  if (reduce) {
    return (
      <span className={`${colorClass} inline`}>
        {text}
        {index < total - 1 ? "\u00A0" : null}
      </span>
    );
  }

  return (
    <motion.span
      className={`${colorClass} inline will-change-[opacity,filter]`}
      style={{ opacity, filter }}
    >
      {text}
      {index < total - 1 ? "\u00A0" : null}
    </motion.span>
  );
}

export default function ManifestoSection() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = !!prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const spineScale = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="manifiesto-heading"
      className="bg-offwhite px-6 py-40 text-carbon md:py-48 lg:px-20 lg:py-[240px]"
    >
      <div className="relative mx-auto max-w-site">
        {/* Blueprint spine — draws top → bottom with scroll */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-0 top-2 w-px origin-top bg-carbon/20 lg:bottom-4 lg:top-4"
          style={reduce ? { scaleY: 1 } : { scaleY: spineScale }}
        />

        <div className="grid items-start gap-10 pl-7 md:gap-12 md:pl-9 lg:grid-cols-12 lg:gap-gutter lg:gap-y-0 lg:pl-12">
          {/* Lead — 7 cols */}
          <div className="flex flex-col lg:col-span-7">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-carbon/40 md:mb-7 lg:text-[13px]">
              Manifiesto
            </p>

            <h2
              id="manifiesto-heading"
              className="max-w-[14ch] font-headline text-[2.75rem] font-normal leading-[0.98] tracking-[-0.02em] md:text-6xl lg:text-[4.5rem] lg:leading-[0.95]"
            >
              {HEADLINE_WORDS.map((word, index) => (
                <ScrubWord
                  key={word.text}
                  text={word.text}
                  accent={word.accent}
                  index={index}
                  total={HEADLINE_WORDS.length}
                  progress={scrollYProgress}
                  reduce={reduce}
                />
              ))}
            </h2>

            <p className="mt-8 max-w-[28ch] font-headline text-[1.125rem] font-normal italic leading-[1.35] tracking-[-0.01em] text-carbon/70 md:mt-10 md:text-xl lg:text-[1.375rem]">
              Ingeniería que se siente como{" "}
              <span className="text-sand">arte</span>; diseño que se instala sin
              complicaciones.
            </p>
          </div>

          {/* Body — 5 cols; mobile: pull before lead para for clearer rhythm */}
          <div className="flex flex-col lg:col-span-5 lg:pt-14">
            <motion.p
              className="order-2 mt-2 max-w-[36ch] text-[15px] font-medium leading-[1.7] text-carbon/80 md:text-base lg:order-1 lg:mt-0 lg:max-w-[38ch] lg:text-[17px]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={reduce ? { duration: 0 } : { ...glide, delay: 0.08 }}
            >
              {BODY_LEAD}
            </motion.p>

            {/* Pull quote — clip-path wipe L→R; carbon (not sand) so Sand stays a single accent */}
            <motion.blockquote
              className="order-1 my-10 max-w-[28ch] border-l border-carbon/15 pl-5 font-headline text-[1.375rem] font-normal leading-[1.25] tracking-[-0.015em] text-carbon md:my-12 md:text-[1.625rem] lg:order-2 lg:my-14 lg:text-[1.75rem]"
              initial={
                reduce
                  ? false
                  : { clipPath: "inset(0 100% 0 0)", opacity: 0.85 }
              }
              whileInView={
                reduce
                  ? undefined
                  : { clipPath: "inset(0 0% 0 0)", opacity: 1 }
              }
              viewport={VIEWPORT}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 1, ease: glide.ease, delay: 0.06 }
              }
            >
              {PULL_QUOTE}
            </motion.blockquote>

            <motion.p
              className="order-3 max-w-[36ch] text-[15px] leading-[1.7] text-carbon/45 md:text-base lg:max-w-[38ch] lg:text-[17px]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={reduce ? { duration: 0 } : { ...glide, delay: 0.12 }}
            >
              {BODY_CLOSE}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
