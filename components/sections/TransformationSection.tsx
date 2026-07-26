"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { assetPath } from "@/lib/assetPath";
import { glide } from "@/lib/motion";
import BackgroundVideo from "@/components/ui/BackgroundVideo";

const VIDEO_SRC = assetPath("/assets/videos/motion-house.mp4");
const POSTER_SRC = assetPath("/assets/images/motion-house-poster.jpg");

const BENEFITS = [
  {
    index: "01",
    title: "Sobre muro existente",
    description:
      "Instalación directa sobre la superficie actual — sin demolición previa.",
  },
  {
    index: "02",
    title: "Encastre oculto",
    description:
      "Junta mecánica sin tornillos a la vista; tiempos de obra reducidos.",
  },
  {
    index: "03",
    title: "Obra limpia",
    description:
      "Sin escombros ni polvo estructural; el espacio sigue en uso.",
  },
];

const REVEAL_EASE = glide.ease;
const REVEAL_DURATION = 0.55;
const REVEAL_STAGGER = 0.12;

const revealViewport = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -40px 0px",
} as const;

function revealTransition(delay: number, reduce: boolean | null) {
  if (reduce) return { duration: 0 };
  return {
    duration: REVEAL_DURATION,
    ease: REVEAL_EASE,
    delay,
  };
}

function revealInitial(reduce: boolean | null) {
  if (reduce) return false;
  return { opacity: 0, y: 12, filter: "blur(5px)" };
}

const revealVisible = { opacity: 1, y: 0, filter: "blur(0px)" };

const SECTION_CLASS =
  "relative isolate overflow-hidden bg-carbon text-offwhite min-h-dvh md:min-h-[90vh]";
const CONTENT_CLASS =
  "relative z-10 flex min-h-dvh flex-col justify-center px-6 py-24 md:min-h-[90vh] md:px-16 lg:px-20 lg:py-section xl:px-28";

export default function TransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoYParallax = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="transformacion-heading"
      className={SECTION_CLASS}
    >
      {/* Full-bleed video — oversized for parallax travel */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[12%] h-[124%] w-full"
        style={prefersReducedMotion ? undefined : { y: videoYParallax }}
      >
        <BackgroundVideo
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          preload="metadata"
          observeRef={sectionRef}
          detachWhenHidden
          playback={{
            enabled: true,
            threshold: 0.15,
          }}
          className="h-full w-full object-cover brightness-[0.7] saturate-[0.9]"
        />
      </motion.div>

      {/* Legibility scrim — stronger left/bottom where copy sits; heavier on mobile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "linear-gradient(105deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 42%, rgba(10,10,10,0.28) 72%, rgba(10,10,10,0.18) 100%)",
            "linear-gradient(to top, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 38%, transparent 70%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-carbon/25 md:bg-transparent"
      />

      {/* Content */}
      <div className={CONTENT_CLASS}>
        <div className="w-full max-w-xl lg:max-w-[41rem]">
          <motion.p
            className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-sand lg:text-[13px]"
            initial={revealInitial(prefersReducedMotion)}
            whileInView={revealVisible}
            viewport={revealViewport}
            transition={revealTransition(0, prefersReducedMotion)}
          >
            <span
              aria-hidden="true"
              className="h-px w-4 shrink-0 bg-sand"
            />
            Instalación
          </motion.p>

          <motion.h2
            id="transformacion-heading"
            className="mb-6 font-headline text-[2.95rem] font-normal leading-[0.98] tracking-[-0.02em] text-offwhite lg:text-[3.5rem] xl:text-[4.25rem]"
            initial={revealInitial(prefersReducedMotion)}
            whileInView={revealVisible}
            viewport={revealViewport}
            transition={revealTransition(REVEAL_STAGGER, prefersReducedMotion)}
          >
            Renovación sin obra pesada.
          </motion.h2>

          <motion.p
            className="mb-10 max-w-[52ch] text-base leading-[1.6] text-[#d8d4cc] lg:text-[17px]"
            initial={revealInitial(prefersReducedMotion)}
            whileInView={revealVisible}
            viewport={revealViewport}
            transition={revealTransition(
              REVEAL_STAGGER * 2,
              prefersReducedMotion,
            )}
          >
            El panel se monta sobre lo existente. El proceso es de ensamble,
            no de demolición.
          </motion.p>

          <ul className="flex flex-col gap-11">
            {BENEFITS.map(({ index, title, description }, i) => (
              <motion.li
                key={title}
                className="grid grid-cols-[2.25rem_1fr] items-start gap-x-4"
                initial={revealInitial(prefersReducedMotion)}
                whileInView={revealVisible}
                viewport={revealViewport}
                transition={revealTransition(
                  REVEAL_STAGGER * (3 + i),
                  prefersReducedMotion,
                )}
              >
                <span
                  aria-hidden="true"
                  className="pt-0.5 font-mono text-sm font-medium leading-none tracking-tight text-sand lg:text-base"
                >
                  {index}
                </span>
                <div>
                  <h3 className="mb-1.5 font-headline text-lg font-normal leading-snug tracking-[-0.01em] text-offwhite lg:text-xl">
                    <span className="sr-only">{index} · </span>
                    {title}
                  </h3>
                  <p className="max-w-[42ch] text-sm leading-relaxed text-[#d8d4cc]">
                    {description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
