"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ENTRY_Y, glide } from "@/lib/motion";

const VALUES = ["INTELIGENTE", "SUSTENTABLE", "A MEDIDA"] as const;

/**
 * Brand values — the ONE deliberate light break (comp 08).
 * Mint only as seam decoration, never as text on offwhite.
 */
export default function BrandValuesSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.35, 1]);

  return (
    <section
      ref={ref}
      aria-labelledby="valores-heading"
      className="relative bg-offwhite px-6 py-section-mobile text-carbon lg:px-20 lg:py-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-sand"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-sand"
      />

      <div className="mx-auto max-w-site text-center">
        <h2 id="valores-heading" className="sr-only">
          Valores de marca
        </h2>

        <motion.ul
          style={reduce ? undefined : { y, opacity }}
          className="flex flex-col items-center gap-4 lg:gap-6"
        >
          {VALUES.map((value, i) => (
            <motion.li
              key={value}
              initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ ...glide, delay: reduce ? 0 : i * 0.1 }}
              className="font-headline text-[clamp(2.5rem,8vw,6.5rem)] font-normal uppercase leading-[0.95] tracking-[-0.03em] text-carbon"
            >
              {value}
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: ENTRY_Y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ ...glide, delay: reduce ? 0 : 0.28 }}
          className="mx-auto mt-10 max-w-[36ch] text-base leading-relaxed text-carbon/70 lg:mt-14 lg:text-lg"
        >
          Somos el aliado inteligente de tus proyectos.
        </motion.p>
      </div>
    </section>
  );
}
