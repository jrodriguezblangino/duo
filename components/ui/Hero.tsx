"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { assetPath } from "@/lib/assetPath";
import { glide } from "@/lib/motion";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Magnetic from "@/components/ui/Magnetic";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";

type HeroProps = {
  eyebrow?: string;
  /** Primary display line */
  headline: ReactNode;
  /** Optional second display line — sized to fit longer phrases */
  headlineContinued?: ReactNode;
  bridgeLine?: string;
  videoSrc: string;
  poster?: string;
};

/**
 * Full-viewport cinematic hero — video + Ken Burns + scrim + blur reveal.
 * Primary conversion CTA is magnetic (B4).
 */
export default function Hero({
  eyebrow = "dúoPANELES",
  headline,
  headlineContinued,
  bridgeLine = "Aislamiento térmico superior para techo y fachada. Partner oficial Arneg.",
  videoSrc,
  poster = assetPath("/assets/images/exploded_view_components.webp"),
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] overflow-hidden bg-carbon"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 will-change-transform"
          initial={prefersReducedMotion ? false : { scale: 1 }}
          animate={prefersReducedMotion ? undefined : { scale: 1.08 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 18, ease: "easeOut" }
          }
        >
          <BackgroundVideo
            src={videoSrc}
            poster={poster}
            preload="metadata"
            observeRef={sectionRef}
            playback={{ enabled: true, threshold: 0.05 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/40 to-carbon"
        />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-end px-6 pb-8 pt-24 md:pb-10 md:pt-28 lg:px-20 lg:pb-12 lg:pt-32">
        <motion.div
          className="relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 24, filter: "blur(8px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={prefersReducedMotion ? { duration: 0 } : glide}
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.1em] text-offwhite/80 md:mb-6 md:tracking-[0.12em] lg:text-[13px]">
            {eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="font-headline font-normal tracking-[-0.02em]"
          >
            <span className="block text-[3.25rem] leading-[0.95] text-offwhite md:text-7xl lg:text-[6.5rem]">
              {headline}
            </span>
            {headlineContinued && (
              <span className="mt-3 block text-[0.9375rem] font-normal leading-[1.3] text-offwhite/70 md:mt-4 md:text-[1.375rem] md:leading-[1.3] lg:text-2xl">
                {headlineContinued}
              </span>
            )}
          </h1>

          {bridgeLine && (
            <p className="mt-5 max-w-[32rem] text-sm leading-[1.6] text-offwhite/70 md:mt-6 md:max-w-[520px] md:text-[15px] lg:text-base">
              {bridgeLine}
            </p>
          )}

          <div className="mt-8 md:mt-10">
            <Magnetic strength={12}>
              <WhatsAppCTA size="md" className="active:scale-[0.98]" />
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
