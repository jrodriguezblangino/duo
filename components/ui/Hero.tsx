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
  bridgeLine?: ReactNode;
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
  bridgeLine = (
    <>
      Partner oficial <span className="text-sand">Arneg</span>.
    </>
  ),
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

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-center px-6 pb-16 pt-28 md:pb-20 md:pt-32 lg:px-20 lg:pb-24">
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
            <span className="block text-[3.25rem] leading-[0.95] text-offwhite md:text-7xl lg:text-[5.5rem]">
              {headline}
            </span>
            {headlineContinued && (
              <span className="sr-only">{headlineContinued}</span>
            )}
          </h1>

          {bridgeLine && (
            <p className="mt-5 max-w-[32rem] text-sm leading-[1.6] text-offwhite/75 md:mt-6 md:text-[15px] lg:text-base">
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
