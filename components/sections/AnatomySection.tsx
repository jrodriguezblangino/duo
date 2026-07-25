"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { glide } from "@/lib/motion";

/**
 * Anatomy — scroll-driven composition story (desktop pin).
 * Scene 1 hero: 1:1 explode video, autoplay-loop (not scroll-scrubbed).
 * Scene 3 detail: 16:9 looping video (motion_disassembly_components-2).
 * Mobile: sequential reveal; reduced motion: static stack.
 */

const VIDEO_SRC = "/assets/videos/motion_disassembly_components.mp4";
const VIDEO_POSTER = "/assets/images/exploded_view_components.png";
/** Native 960×960 — container must be 1:1 so layers are never cropped */
const VIDEO_ASPECT = "aspect-square";
const DETAIL_VIDEO_SRC = "/assets/videos/motion_disassembly_components-2.mp4";
/** Native 1280×720 */
const DETAIL_ASPECT = "aspect-video";

const LAYERS = [
  {
    id: "aluminum",
    index: "01",
    role: "Cara vista",
    name: "Aluminio anodizado",
    spec: "0.6 mm — wood-look / metallic",
  },
  {
    id: "polyurethane",
    index: "02",
    role: "Núcleo",
    name: "Poliuretano",
    spec: "Alta densidad — aislamiento + adhesión",
  },
  {
    id: "steel",
    index: "03",
    role: "Respaldo",
    name: "Acero galvanizado",
    spec: "Rigidez estructural del sistema",
  },
] as const;

const LAYER_RANGES: readonly (readonly [number, number])[] = [
  [0.35, 0.5],
  [0.5, 0.65],
  [0.65, 0.75],
];

/** Scene 1 supporting copy — Manifiesto tone, material-literal */
const SCENE1_SUPPORT_BEFORE =
  "El panel combina la calidez de un ";
const SCENE1_SUPPORT_MID =
  " con la ";
const SCENE1_SUPPORT_AFTER =
  " del acero. La cara wood-look se mantiene en el tiempo ";
const SCENE1_SUPPORT_END = "; el núcleo une y aísla sin complicar la obra.";

const MONO_MUTED =
  "font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]";
const MONO_ACCENT =
  "font-mono text-xs tracking-[0.02em] text-sand lg:text-[13px]";

const VIEWPORT = { once: true, amount: 0.35 } as const;

/* ─── Shared focus / reveal helpers ─── */

/** Sand accent on carbon — text + underline draw (Manifesto echo treatment) */
function AccentUnderline({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: readonly [number, number];
}) {
  const [start, end] = range;
  const scaleX = useTransform(progress, [start, end, 1], [0, 1, 1]);

  return (
    <span className="relative inline text-sand">
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-[0.05em] left-0 h-[2px] w-full origin-left bg-sand will-change-transform"
        style={{ scaleX }}
      />
    </span>
  );
}

function AccentUnderlineStatic({ children }: { children: string }) {
  return (
    <span className="relative inline text-sand">
      {children}
      <span
        aria-hidden="true"
        className="absolute bottom-[0.05em] left-0 h-[2px] w-full bg-sand"
      />
    </span>
  );
}

function Scene1Support({
  progress,
}: {
  progress?: MotionValue<number>;
}) {
  const bodyClass =
    "mt-6 max-w-[36ch] text-base leading-[1.65] text-offwhite/70 lg:text-[17px]";

  if (!progress) {
    return (
      <p className={bodyClass}>
        {SCENE1_SUPPORT_BEFORE}
        <AccentUnderlineStatic>acabado real</AccentUnderlineStatic>
        {SCENE1_SUPPORT_MID}
        <AccentUnderlineStatic>resistencia estructural</AccentUnderlineStatic>
        {SCENE1_SUPPORT_AFTER}
        <AccentUnderlineStatic>sin mantenimiento</AccentUnderlineStatic>
        {SCENE1_SUPPORT_END}
      </p>
    );
  }

  return (
    <p className={bodyClass}>
      {SCENE1_SUPPORT_BEFORE}
      <AccentUnderline progress={progress} range={[0.08, 0.18]}>
        acabado real
      </AccentUnderline>
      {SCENE1_SUPPORT_MID}
      <AccentUnderline progress={progress} range={[0.12, 0.22]}>
        resistencia estructural
      </AccentUnderline>
      {SCENE1_SUPPORT_AFTER}
      <AccentUnderline progress={progress} range={[0.16, 0.26]}>
        sin mantenimiento
      </AccentUnderline>
      {SCENE1_SUPPORT_END}
    </p>
  );
}

function FocusText({
  children,
  progress,
  range,
  className,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: readonly [number, number];
  className?: string;
}) {
  const [start, end] = range;
  const opacity = useTransform(progress, [start, end, 1], [0.25, 1, 1]);
  const blur = useTransform(progress, [start, end, 1], [12, 0, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div className={className} style={{ opacity, filter }}>
      {children}
    </motion.div>
  );
}

function LayerCallout({
  layer,
  progress,
  range,
}: {
  layer: (typeof LAYERS)[number];
  progress: MotionValue<number>;
  range: readonly [number, number];
}) {
  const [start, end] = range;
  const opacity = useTransform(progress, [start, end, 1], [0, 1, 1]);
  const x = useTransform(progress, [start, end, 1], [16, 0, 0]);
  const lineScale = useTransform(progress, [start, end, 1], [0, 1, 1]);

  return (
    <motion.li
      className="relative grid grid-cols-[2.25rem_1fr] items-start gap-x-5 lg:grid-cols-[3.5rem_1fr] lg:gap-x-8"
      style={{ opacity, x }}
    >
      <span
        aria-hidden="true"
        className="relative z-[1] text-center font-mono text-[1.75rem] font-light leading-none tracking-tight text-offwhite/30 lg:text-[2.75rem]"
      >
        {layer.index}
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[1.125rem] top-[0.55em] h-px w-5 -translate-y-1/2 bg-offwhite/30 lg:left-[1.75rem] lg:top-[0.85em] lg:w-8"
      />

      <div className="min-w-0 pt-0.5 lg:pt-1">
        <p className={MONO_MUTED}>
          <span className="sr-only">{layer.index} · </span>
          {layer.role}
        </p>
        <p className="mt-2 font-headline text-xl font-normal leading-snug text-offwhite lg:text-[1.75rem]">
          {layer.name}
        </p>
        <p className={`mt-3 ${MONO_ACCENT}`}>{layer.spec}</p>
      </div>

      {/* Leader toward frozen frame (left → video) */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-[0.85em] hidden h-px w-10 origin-right bg-sand/70 lg:block"
        style={{ scaleX: lineScale }}
      />
    </motion.li>
  );
}

/**
 * Play while in viewport AND scroll progress is within [activeFrom, activeUntil).
 * Used for Scene 1 hero (until Scene 3) and Scene 3 detail (from Scene 3 on).
 */
function useProgressGatedPlayback(
  videoRef: RefObject<HTMLVideoElement | null>,
  progress: MotionValue<number>,
  activeFrom: number,
  activeUntil: number = 2,
) {
  const inViewRef = useRef(false);
  const progressRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sync = () => {
      const active =
        progressRef.current >= activeFrom &&
        progressRef.current < activeUntil;
      if (inViewRef.current && active) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    io.observe(video);

    progressRef.current = progress.get();
    const unsub = progress.on("change", (p) => {
      progressRef.current = p;
      sync();
    });
    sync();

    return () => {
      io.disconnect();
      unsub();
    };
  }, [videoRef, progress, activeFrom, activeUntil]);
}

/* ─── Static / reduced-motion layout ─── */

function StaticAnatomy() {
  return (
    <section
      aria-labelledby="anatomia-heading"
      className="bg-carbon px-6 py-24 lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <div className="mx-auto mb-12 max-w-measure text-center lg:mb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
            Composición — tres capas
          </p>
          <h2
            id="anatomia-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-6xl"
          >
            De la superficie a la estructura.
          </h2>
          <div className="mx-auto mt-2 w-fit text-left">
            <Scene1Support />
          </div>
        </div>

        <div className="mx-auto mb-12 w-full max-w-4xl lg:mb-20">
          <div
            className={`relative ${VIDEO_ASPECT} mx-auto w-full max-w-[min(100%,560px)] overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate`}
          >
            <video
              muted
              playsInline
              preload="metadata"
              poster={VIDEO_POSTER}
              className="h-full w-full object-contain"
              aria-label="Desmontaje de las tres capas del panel Fill Home"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
          <p className={`mt-4 ${MONO_MUTED}`}>
            Desmontaje de capas — ensamble mecánico
          </p>
        </div>

        <ol className="relative mx-auto mb-12 max-w-xl list-none space-y-10 pl-0 lg:mx-0 lg:mb-20 lg:max-w-2xl lg:space-y-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-[1.125rem] top-3 w-px bg-offwhite/20 lg:bottom-4 lg:left-[1.75rem] lg:top-4"
          />
          {LAYERS.map((layer) => (
            <li
              key={layer.id}
              className="relative grid grid-cols-[2.25rem_1fr] items-start gap-x-5 lg:grid-cols-[3.5rem_1fr] lg:gap-x-8"
            >
              <span
                aria-hidden="true"
                className="relative z-[1] text-center font-mono text-[1.75rem] font-light leading-none tracking-tight text-offwhite/30 lg:text-[2.75rem]"
              >
                {layer.index}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[1.125rem] top-[0.55em] h-px w-5 -translate-y-1/2 bg-offwhite/30 lg:left-[1.75rem] lg:top-[0.85em] lg:w-8"
              />
              <div className="min-w-0 pt-0.5 lg:pt-1">
                <p className={MONO_MUTED}>
                  <span className="sr-only">{layer.index} · </span>
                  {layer.role}
                </p>
                <p className="mt-2 font-headline text-xl font-normal leading-snug text-offwhite lg:text-[1.75rem]">
                  {layer.name}
                </p>
                <p className={`mt-3 ${MONO_ACCENT}`}>{layer.spec}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div
            className={`relative ${DETAIL_ASPECT} overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate lg:col-span-7`}
          >
            <video
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
              aria-label="Detalle de canto del panel Fill Home — tres capas"
            >
              <source src={DETAIL_VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
              Detalle de canto
            </p>
            <p className="font-headline text-[1.75rem] font-normal italic leading-[1.1] text-offwhite lg:text-[2.5rem]">
              Tolerancia visible.
            </p>
            <p className="mt-6 max-w-measure text-base leading-[1.65] text-offwhite/70">
              Cara de aluminio anodizado sobre núcleo de poliuretano y respaldo
              de acero. El canto muestra las tres capas sin maquillaje de
              render.
            </p>
            <p className={`mt-6 ${MONO_ACCENT}`}>
              0.6 mm aluminio · núcleo HD · acero galvanizado
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Mobile: sequential, no sticky scrub ─── */

function MobileAnatomy() {
  return (
    <section
      aria-labelledby="anatomia-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:hidden"
    >
      <div className="mx-auto max-w-site">
        <motion.div
          className="mb-10 max-w-measure"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={glide}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60">
            Composición — tres capas
          </p>
          <h2
            id="anatomia-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite"
          >
            De la superficie a la estructura.
          </h2>
          <Scene1Support />
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...glide, delay: 0.06 }}
        >
          <div className={`relative ${VIDEO_ASPECT} mx-auto overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate`}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={VIDEO_POSTER}
              className="h-full w-full object-contain"
              aria-label="Desmontaje de las tres capas del panel Fill Home"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
          <p className={`mt-4 ${MONO_MUTED}`}>
            Desmontaje de capas — ensamble mecánico
          </p>
        </motion.div>

        <ol className="relative mb-12 list-none space-y-10 pl-0">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-[1.125rem] top-3 w-px bg-offwhite/20"
          />
          {LAYERS.map((layer, index) => (
            <motion.li
              key={layer.id}
              className="relative grid grid-cols-[2.25rem_1fr] items-start gap-x-5"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ ...glide, delay: index * 0.1 }}
            >
              <span
                aria-hidden="true"
                className="relative z-[1] text-center font-mono text-[1.75rem] font-light leading-none tracking-tight text-offwhite/30"
              >
                {layer.index}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[1.125rem] top-[0.55em] h-px w-5 -translate-y-1/2 bg-offwhite/30"
              />
              <div className="min-w-0 pt-0.5">
                <p className={MONO_MUTED}>
                  <span className="sr-only">{layer.index} · </span>
                  {layer.role}
                </p>
                <p className="mt-2 font-headline text-xl font-normal leading-snug text-offwhite">
                  {layer.name}
                </p>
                <p className={`mt-3 ${MONO_ACCENT}`}>{layer.spec}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="grid gap-8">
          <motion.div
            className={`relative ${DETAIL_ASPECT} overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate`}
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={glide}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
              aria-label="Detalle de canto del panel Fill Home — tres capas"
            >
              <source src={DETAIL_VIDEO_SRC} type="video/mp4" />
            </video>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...glide, delay: 0.06 }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60">
              Detalle de canto
            </p>
            <p className="font-headline text-[1.75rem] font-normal italic leading-[1.1] text-offwhite">
              Tolerancia visible.
            </p>
            <p className="mt-5 max-w-measure text-base leading-[1.65] text-offwhite/70">
              Cara de aluminio anodizado sobre núcleo de poliuretano y respaldo
              de acero. El canto muestra las tres capas sin maquillaje de
              render.
            </p>
            <p className={`mt-5 ${MONO_ACCENT}`}>
              0.6 mm aluminio · núcleo HD · acero galvanizado
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Desktop: sticky scroll story ─── */

function DesktopAnatomy() {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const detailVideoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useProgressGatedPlayback(heroVideoRef, scrollYProgress, 0, 0.72);
  useProgressGatedPlayback(detailVideoRef, scrollYProgress, 0.72);

  /* Scene 1 — headline (hold 0 through end — avoid FM extrapolation revive) */
  const scene1Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.38, 1],
    [1, 0, 0],
  );

  /* Scene 2 — layers panel */
  const scene2Opacity = useTransform(
    scrollYProgress,
    [0.32, 0.38, 0.72, 0.78, 1],
    [0, 1, 1, 0, 0],
  );

  /* Visual: hero video → detail video */
  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 0.86, 1],
    [1, 1, 0, 0],
  );
  const detailOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 0.88, 1],
    [0, 0, 1, 1],
  );
  const detailScale = useTransform(
    scrollYProgress,
    [0.72, 0.92, 1],
    [1.05, 1, 1],
  );

  /* Scene 3 — detail copy */
  const scene3Opacity = useTransform(
    scrollYProgress,
    [0.78, 0.9, 1],
    [0, 1, 1],
  );
  const scene3Y = useTransform(scrollYProgress, [0.78, 0.92, 1], [16, 0, 0]);

  return (
    <section
      aria-labelledby="anatomia-heading-desktop"
      className="relative hidden bg-carbon text-offwhite lg:block"
    >
      <div ref={trackRef} className="relative h-[320vh]">
        <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
          <div className="relative mx-auto grid h-full w-full max-w-site grid-cols-12 items-center gap-gutter px-20 py-24">
            {/* Visual stage — 1:1 hero / 16:9 detail crossfade */}
            <div className="relative col-span-7 flex w-full items-center justify-center">
              <div
                className={`relative ${VIDEO_ASPECT} w-full max-h-[min(560px,68vh)] max-w-[min(100%,68vh)]`}
              >
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate"
                  style={{ opacity: videoOpacity }}
                >
                  <video
                    ref={heroVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={VIDEO_POSTER}
                    className="h-full w-full object-contain"
                    aria-label="Desmontaje de las tres capas del panel Fill Home"
                  >
                    <source src={VIDEO_SRC} type="video/mp4" />
                  </video>
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center origin-center"
                  style={{ opacity: detailOpacity, scale: detailScale }}
                >
                  <div
                    className={`relative ${DETAIL_ASPECT} w-full overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate`}
                  >
                    <video
                      ref={detailVideoRef}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-contain"
                      aria-label="Detalle de canto del panel Fill Home — tres capas"
                    >
                      <source src={DETAIL_VIDEO_SRC} type="video/mp4" />
                    </video>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right column — scenes 1–3 overlays */}
            <div className="relative col-span-5 flex h-full max-h-[min(560px,68vh)] flex-col justify-center">
              {/* Scene 1 — eyebrow + headline + support (vertically centered) */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center"
                style={{ opacity: scene1Opacity }}
              >
                <FocusText progress={scrollYProgress} range={[0.02, 0.18]}>
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
                    Composición — tres capas
                  </p>
                  <h2
                    id="anatomia-heading-desktop"
                    className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-5xl xl:text-6xl"
                  >
                    De la superficie a la estructura.
                  </h2>
                  <Scene1Support progress={scrollYProgress} />
                </FocusText>
              </motion.div>

              {/* Scene 2 — layer annotations */}
              <motion.div
                className="absolute inset-0 z-10 flex flex-col justify-center"
                style={{ opacity: scene2Opacity }}
              >
                <ol className="relative list-none space-y-10 pl-0 lg:space-y-12">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 left-[1.75rem] top-3 w-px bg-offwhite/20"
                  />
                  {LAYERS.map((layer, i) => (
                    <LayerCallout
                      key={layer.id}
                      layer={layer}
                      progress={scrollYProgress}
                      range={LAYER_RANGES[i]}
                    />
                  ))}
                </ol>
              </motion.div>

              {/* Scene 3 — detail copy */}
              <motion.div
                className="absolute inset-0 z-10 flex flex-col justify-center"
                style={{ opacity: scene3Opacity, y: scene3Y }}
              >
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
                  Detalle de canto
                </p>
                <p className="font-headline text-[1.75rem] font-normal italic leading-[1.1] text-offwhite lg:text-[2.5rem]">
                  Tolerancia visible.
                </p>
                <p className="mt-6 max-w-measure text-base leading-[1.65] text-offwhite/70">
                  Cara de aluminio anodizado sobre núcleo de poliuretano y
                  respaldo de acero. El canto muestra las tres capas sin
                  maquillaje de render.
                </p>
                <p className={`mt-6 ${MONO_ACCENT}`}>
                  0.6 mm aluminio · núcleo HD · acero galvanizado
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AnatomySection() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticAnatomy />;
  }

  return (
    <>
      <MobileAnatomy />
      <DesktopAnatomy />
    </>
  );
}
