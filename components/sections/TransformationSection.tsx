"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { glide } from "@/lib/motion";

const VIDEO_SRC = "/assets/videos/motion-house.mp4";
const POSTER_SRC = "/assets/images/motion-house-poster.jpg";

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
const CAPTION_CLASS =
  "pointer-events-none absolute bottom-6 right-6 font-mono text-xs tracking-wider text-sand/50 md:bottom-8 md:right-10 lg:bottom-10 lg:right-20";

export default function TransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoYParallax = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (prefersReducedMotion) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    io.observe(section);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

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
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          tabIndex={-1}
          className="h-full w-full object-cover brightness-[0.7] saturate-[0.9]"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
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

        <p className={CAPTION_CLASS}>Instalación real — sin efectos</p>
      </div>
    </section>
  );
}
