"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";

/**
 * Manifesto — typographic break between Hero and Anatomy.
 * Desktop: pinned scrub with staged paragraph focus (blur in → clear).
 * Mobile: natural flow (no full-viewport pin) — same staged focus on scroll.
 */

const BODY_LEAD =
  "Tras viajar a la Expo de Cantón, identificamos una oportunidad única: la intersección entre la ingeniería de vanguardia y la calidez de los materiales naturales.";

const PULL_QUOTE =
  "En Fill Home, no solo importamos paneles; curamos soluciones.";

const BODY_CLOSE =
  "Creemos que la arquitectura de alta gama no debería ser compleja. Nuestra misión es simplificar lo sofisticado, ofreciendo revestimientos que combinan la resistencia industrial del metal con la calidez orgánica de la madera.";

const BLUR_MAX = 14;

type HighlightWordProps = {
  children: string;
  reduce: boolean;
  progress: MotionValue<number>;
  range: readonly [number, number];
};

/** Primary accent — carbon word, sand highlight bar draws L→R. */
function HighlightWord({ children, reduce, progress, range }: HighlightWordProps) {
  const [start, end] = range;
  const scaleX = useTransform(progress, [start, end], [0, 1]);

  if (reduce) {
    return (
      <span className="relative inline px-[0.14em] text-carbon">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[0.06em] top-[0.16em] bg-sand/50"
        />
        <span className="relative">{children}</span>
      </span>
    );
  }

  return (
    <span className="relative inline px-[0.14em] text-carbon">
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[0.06em] top-[0.16em] origin-left bg-sand/50 will-change-transform"
        style={{ scaleX }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

type EchoWordProps = {
  children: string;
  reduce: boolean;
  progress: MotionValue<number>;
  range: readonly [number, number];
};

/** Secondary accent — carbon word + sand underline (legible on off-white). */
function EchoWord({ children, reduce, progress, range }: EchoWordProps) {
  const [start, end] = range;
  const scaleX = useTransform(progress, [start, end], [0, 1]);

  if (reduce) {
    return (
      <span className="relative inline text-carbon">
        {children}
        <span
          aria-hidden="true"
          className="absolute bottom-[0.05em] left-0 h-[2px] w-full bg-sand"
        />
      </span>
    );
  }

  return (
    <span className="relative inline text-carbon">
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-[0.05em] left-0 h-[2px] w-full origin-left bg-sand will-change-transform"
        style={{ scaleX }}
      />
    </span>
  );
}

type FocusBlockProps = {
  children: ReactNode;
  progress: MotionValue<number>;
  range: readonly [number, number];
  blurMax?: number;
  /** Floor opacity so copy never washes out completely mid-scrub */
  opacityFrom?: number;
  className?: string;
};

/**
 * Staged focus: blurred + soft → sharp + full.
 * Holds clear through progress 1 so leaving the section never leaves ghost text.
 */
function FocusBlock({
  children,
  progress,
  range,
  blurMax = BLUR_MAX,
  opacityFrom = 0.4,
  className,
}: FocusBlockProps) {
  const [start, end] = range;
  const opacity = useTransform(progress, [start, end, 1], [opacityFrom, 1, 1]);
  const blur = useTransform(progress, [start, end, 1], [blurMax, 0, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      className={className}
      style={{ opacity, filter, willChange: "opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}

const quoteClassName =
  "max-w-[28ch] border-l-2 border-sand pl-5 font-headline text-[1.375rem] font-normal leading-[1.25] tracking-[-0.015em] text-carbon md:text-[1.625rem] lg:text-[1.75rem]";

const leadParaClass =
  "max-w-[36ch] text-[15px] font-medium leading-[1.7] text-carbon/90 md:text-base lg:max-w-[38ch] lg:text-[17px]";

const closeParaClass =
  "max-w-[36ch] text-[15px] leading-[1.7] text-carbon/75 md:text-base lg:max-w-[38ch] lg:text-[17px]";

const italicClass =
  "max-w-[28ch] font-headline text-[1.125rem] font-normal italic leading-[1.4] tracking-[-0.01em] text-carbon/85 md:text-xl lg:text-[1.375rem]";

const eyebrowClass =
  "text-xs font-medium uppercase tracking-[0.18em] text-carbon/65 lg:text-[13px]";

function LeadBlock({
  reduce,
  progress,
  compact,
  headingId = "manifiesto-heading",
}: {
  reduce: boolean;
  progress: MotionValue<number>;
  /** Tighter vertical rhythm for mobile */
  compact?: boolean;
  headingId?: string;
}) {
  return (
    <div className="flex min-w-0 max-w-full flex-col lg:col-span-7">
      <p className={`${eyebrowClass} ${compact ? "mb-3" : "mb-4 lg:mb-7"}`}>
        Manifiesto
      </p>

      <h2
        id={headingId}
        className="box-border w-full max-w-[14ch] break-words font-headline text-[clamp(2.125rem,7.2vw+0.5rem,4.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-carbon"
      >
        Nacimos de una{" "}
        <HighlightWord reduce={reduce} progress={progress} range={[0.04, 0.2]}>
          búsqueda.
        </HighlightWord>
      </h2>

      <p className={`${compact ? "mt-4" : "mt-5 lg:mt-8"} ${italicClass}`}>
        Ingeniería que se siente como{" "}
        <EchoWord reduce={reduce} progress={progress} range={[0.14, 0.32]}>
          arte
        </EchoWord>
        ; diseño que se instala sin complicaciones.
      </p>
    </div>
  );
}

/** Staged body: p1 → quote → p2, each focusing in sequence, all clear by ~0.7 */
function BodyBlocks({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  return (
    <div className={className}>
      <FocusBlock progress={progress} range={[0.14, 0.4]} blurMax={14}>
        <p className={leadParaClass}>{BODY_LEAD}</p>
      </FocusBlock>

      <FocusBlock
        progress={progress}
        range={[0.28, 0.52]}
        blurMax={10}
        opacityFrom={0.45}
      >
        <blockquote className={quoteClassName}>{PULL_QUOTE}</blockquote>
      </FocusBlock>

      <FocusBlock progress={progress} range={[0.42, 0.68]} blurMax={14}>
        <p className={closeParaClass}>{BODY_CLOSE}</p>
      </FocusBlock>
    </div>
  );
}

function StaticLead() {
  return (
    <div className="flex min-w-0 max-w-full flex-col lg:col-span-7">
      <p className={`${eyebrowClass} mb-4 lg:mb-7`}>Manifiesto</p>
      <h2
        id="manifiesto-heading"
        className="box-border w-full max-w-[14ch] break-words font-headline text-[clamp(2.125rem,7.2vw+0.5rem,4.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-carbon"
      >
        Nacimos de una{" "}
        <span className="relative inline px-[0.14em] text-carbon">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[0.06em] top-[0.16em] bg-sand/50"
          />
          <span className="relative">búsqueda.</span>
        </span>
      </h2>
      <p className={`mt-5 lg:mt-8 ${italicClass}`}>
        Ingeniería que se siente como{" "}
        <span className="relative inline text-carbon">
          arte
          <span
            aria-hidden="true"
            className="absolute bottom-[0.05em] left-0 h-[2px] w-full bg-sand"
          />
        </span>
        ; diseño que se instala sin complicaciones.
      </p>
    </div>
  );
}

function StaticBody() {
  return (
    <div className="flex min-w-0 flex-col gap-8 lg:col-span-5">
      <div
        aria-hidden="true"
        className="mb-7 hidden h-[1.2em] shrink-0 text-[13px] lg:block"
      />
      <p className={leadParaClass}>{BODY_LEAD}</p>
      <blockquote className={quoteClassName}>{PULL_QUOTE}</blockquote>
      <p className={closeParaClass}>{BODY_CLOSE}</p>
    </div>
  );
}

export default function ManifestoSection() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = !!prefersReducedMotion;
  const mobileRef = useRef<HTMLElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopTrackRef,
    offset: ["start start", "end end"],
  });

  const mobileSpine = useTransform(mobileProgress, [0.02, 0.45], [0, 1]);
  const desktopSpine = useTransform(desktopProgress, [0.02, 0.4], [0, 1]);

  if (reduce) {
    return (
      <section
        aria-labelledby="manifiesto-heading"
        className="box-border bg-offwhite px-6 py-section-mobile text-carbon lg:px-20 lg:py-section"
      >
        <div className="relative mx-auto box-border w-full max-w-site">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-0 top-0 w-px bg-sand/50"
          />
          <div className="grid w-full max-w-full items-start gap-8 pl-7 md:gap-10 md:pl-9 lg:grid-cols-12 lg:gap-gutter lg:gap-y-0 lg:pl-12">
            <StaticLead />
            <StaticBody />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* —— Mobile: natural height, no viewport pin (fixes empty gap) —— */}
      <section
        ref={mobileRef}
        aria-labelledby="manifiesto-heading"
        className="box-border bg-offwhite px-6 py-section-mobile text-carbon lg:hidden"
      >
        <div className="relative mx-auto w-full max-w-site">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-0 top-0 w-px origin-top bg-sand/50"
            style={{ scaleY: mobileSpine }}
          />

          <div className="flex flex-col gap-8 pl-7 md:gap-10 md:pl-9">
            <LeadBlock reduce={false} progress={mobileProgress} compact />
            <BodyBlocks
              progress={mobileProgress}
              className="flex flex-col gap-7 md:gap-8"
            />
          </div>
        </div>
      </section>

      {/* —— Desktop: pinned scrub frame —— */}
      <section
        aria-labelledby="manifiesto-heading-desktop"
        className="box-border hidden bg-offwhite text-carbon lg:block"
      >
        <div ref={desktopTrackRef} className="relative h-[150vh]">
          <div className="sticky top-0 flex h-dvh items-center overflow-x-hidden py-24">
            <div className="relative mx-auto w-full max-w-site px-20">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[10%] left-20 top-0 w-px origin-top bg-sand/50"
                style={{ scaleY: desktopSpine }}
              />

              <div className="grid w-full max-w-full items-start gap-gutter pl-12 lg:grid-cols-12">
                <LeadBlock
                  reduce={false}
                  progress={desktopProgress}
                  headingId="manifiesto-heading-desktop"
                />

                <div className="flex min-w-0 flex-col lg:col-span-5">
                  <div
                    aria-hidden="true"
                    className="mb-7 h-[1.2em] shrink-0 text-[13px] leading-[1.2] tracking-[0.18em]"
                  />
                  <BodyBlocks
                    progress={desktopProgress}
                    className="flex flex-col gap-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
