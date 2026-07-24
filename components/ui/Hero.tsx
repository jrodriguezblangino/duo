"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ENTRY_Y, glide } from "@/lib/motion";

type HeroProps = {
  eyebrow?: string;
  /** Primary display line (e.g. "Metal Sliding.") */
  headline: ReactNode;
  /** Optional second display line — sized to fit longer phrases */
  headlineContinued?: ReactNode;
  bridgeLine?: string;
  videoSrc: string;
  poster?: string;
};

const heroTokens = {
  "--hero-scrim-peak": "rgba(0, 0, 0, 0.55)",
  "--hero-scrim-mid": "rgba(0, 0, 0, 0.28)",
} as CSSProperties;

/**
 * Full-viewport cinematic hero — self-contained (100vh / 100dvh),
 * content clipped within bounds; nav owns the sole CTA.
 */
export default function Hero({
  eyebrow = "Revestimiento de ingeniería",
  headline,
  headlineContinued,
  bridgeLine = "Ingeniería de revestimiento para fachadas e interiores — múltiples terminaciones, una sola solución.",
  videoSrc,
  poster = "/assets/images/exploded_view_components.png",
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative h-[100vh] overflow-hidden bg-carbon max-md:h-[100dvh]"
      style={heroTokens}
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={prefersReducedMotion ? false : { scale: 1 }}
          animate={prefersReducedMotion ? undefined : { scale: 1.05 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 14,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                }
          }
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>
        {/* Light full-field scrim for nav / overall legibility */}
        <div aria-hidden="true" className="absolute inset-0 bg-carbon/10" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-8 pt-24 md:pb-10 md:pt-28 lg:px-20 lg:pb-12 lg:pt-32">
        {/* Text-only contrast scrim — soft vignette behind copy, not full hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] max-h-[28rem]"
          style={{
            background:
              "linear-gradient(165deg, transparent 0%, transparent 22%, var(--hero-scrim-mid) 58%, var(--hero-scrim-peak) 100%)",
          }}
        />

        <motion.div
          className="relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: ENTRY_Y }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : glide}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-offwhite/80 md:mb-7 lg:mb-8 lg:text-[13px]">
            {eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="font-headline font-normal tracking-[-0.02em] text-offwhite"
          >
            <span className="block text-[2.75rem] leading-[0.95] md:text-6xl lg:text-[5.25rem]">
              {headline}
            </span>
            {headlineContinued && (
              <span className="mt-2 block text-[1.375rem] leading-[1.1] md:mt-3 md:text-[1.75rem] md:leading-[1.12] lg:text-[2rem] lg:leading-[1.15]">
                {headlineContinued}
              </span>
            )}
          </h1>

          {bridgeLine && (
            <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.6] text-offwhite/70 md:mt-5 md:text-[17px] lg:text-xl">
              {bridgeLine}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
