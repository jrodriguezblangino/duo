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
import { assetPath } from "@/lib/assetPath";
import { glide } from "@/lib/motion";
import {
  HighlightWord,
  HighlightWordStatic,
} from "@/components/ui/HighlightWord";
import SectionLoopVideo from "@/components/ui/SectionLoopVideo";
import { useIsDesktop } from "@/lib/useMediaQuery";
import { useSectionScrollProgress } from "@/lib/useSectionScrollProgress";

/**
 * Anatomy — scroll-driven composition story (desktop pin).
 * Scene 1 hero: 1:1 explode video, autoplay-loop (not scroll-scrubbed).
 * Scene 3 detail: 16:9 looping video (motion_disassembly_components-2).
 * Mobile: sequential reveal; reduced motion: static stack.
 */

const VIDEO_SRC = assetPath(
  "/assets/videos/motion_disassembly_components_ios.mp4",
);
/** Frame from the square disassembly loop — not the exploded still */
const VIDEO_POSTER = assetPath(
  "/assets/images/motion_disassembly_hero_poster.jpg",
);
/** Native 960×960 — container must be 1:1 so layers are never cropped */
const VIDEO_ASPECT = "aspect-square";
const DETAIL_VIDEO_SRC = assetPath(
  "/assets/videos/motion_disassembly_components_ios-2.mp4",
);
const DETAIL_VIDEO_POSTER = assetPath(
  "/assets/images/motion_disassembly_detail_poster.jpg",
);
/** Native 1280×720 */
const DETAIL_ASPECT = "aspect-video";

const LAYERS = [
  {
    id: "aluminum",
    index: "01",
    role: "Cara vista",
    name: "Aluminio anodizado",
    spec: "Una superficie diseñada para conservar su carácter. Acabado wood-look con resistencia frente al sol, la humedad y el desgaste cotidiano.",
  },
  {
    id: "polyurethane",
    index: "02",
    role: "Núcleo",
    name: "Poliuretano HD",
    spec: "El corazón del sistema. Aporta aislamiento térmico, confort acústico y una estructura sólida que se percibe desde el primer contacto.",
  },
  {
    id: "steel",
    index: "03",
    role: "Respaldo",
    name: "Acero galvanizado",
    spec: "La estructura que sostiene el rendimiento. Rigidez, estabilidad y protección para una placa preparada para acompañar cada proyecto durante años.",
  },
] as const;

const SCENE3_COPY = {
  label: "Detalle constructivo",
  headlineLine1: "Tres materiales.",
  headlineLine2: "Una sola solución.",
  lead: "Cada capa fue elegida por una razón. El ",
  afterAluminum: " protege la superficie y mantiene su acabado. El ",
  afterPoly: " aporta aislamiento y consistencia. El ",
  afterSteel:
    " entrega la rigidez estructural que define el sistema. Todo integrado mediante un encastre oculto que elimina fijaciones visibles y consigue una superficie limpia, continua y precisa.",
} as const;

const LAYER_RANGES: readonly (readonly [number, number])[] = [
  [0.26, 0.3],
  [0.3, 0.33],
  [0.33, 0.36],
];

/** Scene 1 supporting copy — single-word markers on Calidez / acero */
const SCENE1_BODY = {
  mid: " que no se desvanece. Resistencia que no se nota — hasta que la necesitás. Cada panel une un acabado real con la solidez del ",
  end: ", sin mantenimiento y sin complicar la obra.",
} as const;

const SCENE1_EYEBROW =
  "mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-sand lg:text-[13px]";
const SCENE1_HEADLINE =
  "font-headline text-[2.95rem] font-normal leading-[0.98] tracking-[-0.02em] text-offwhite lg:text-[3.5rem] xl:text-[4.25rem]";
const SCENE1_BODY_CLASS =
  "mt-6 max-w-[58ch] text-base leading-[1.6] text-muted lg:text-[17px]";
const SCENE3_BODY_CLASS =
  "mt-6 max-w-measure text-base leading-[1.65] text-muted lg:text-[17px]";

const MONO_MUTED =
  "font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]";
const MONO_ACCENT =
  "font-mono text-xs tracking-[0.02em] text-sand lg:text-[13px]";

const VIEWPORT = { once: true, amount: 0.35 } as const;

/* ─── Shared focus / reveal helpers ─── */

function Scene1Eyebrow() {
  return (
    <p className={SCENE1_EYEBROW}>
      <span aria-hidden="true" className="h-px w-4 shrink-0 bg-sand" />
      Composición — tres capas
    </p>
  );
}

function Scene3Headline() {
  return (
    <p className={SCENE1_HEADLINE}>
      {SCENE3_COPY.headlineLine1}
      <br />
      {SCENE3_COPY.headlineLine2}
    </p>
  );
}

function Scene3Spec({ className = "mt-10" }: { className?: string }) {
  return (
    <div className={className}>
      <span
        aria-hidden="true"
        className="mb-4 block h-px w-full max-w-measure bg-offwhite/15"
      />
      <p className="font-mono text-[11px] tracking-[0.06em] text-offwhite/45 lg:text-xs">
        <span className="text-sand">0.6 mm</span>
        {" aluminio anodizado · núcleo "}
        <span className="text-sand">HD</span>
        {" · acero galvanizado"}
      </p>
    </div>
  );
}

function Scene3Body({
  progress,
  reduce = false,
  highlightReveal = "scroll",
  ranges = [
    [0.72, 0.78],
    [0.86, 0.92],
    [0.96, 1],
  ] as const,
}: {
  progress?: MotionValue<number>;
  reduce?: boolean;
  highlightReveal?: "scroll" | "view";
  ranges?: readonly (readonly [number, number])[];
}) {
  if (!progress || reduce) {
    return (
      <p className={SCENE3_BODY_CLASS}>
        {SCENE3_COPY.lead}
        <HighlightWordStatic surface="dark">
          aluminio anodizado
        </HighlightWordStatic>
        {SCENE3_COPY.afterAluminum}
        <HighlightWordStatic surface="dark">
          poliuretano de alta densidad
        </HighlightWordStatic>
        {SCENE3_COPY.afterPoly}
        <HighlightWordStatic surface="dark">
          acero galvanizado
        </HighlightWordStatic>
        {SCENE3_COPY.afterSteel}
      </p>
    );
  }

  const isView = highlightReveal === "view";

  return (
    <p className={SCENE3_BODY_CLASS}>
      {SCENE3_COPY.lead}
      <HighlightWord
        reduce={false}
        progress={progress}
        range={ranges[0]}
        reveal={highlightReveal}
        surface="dark"
        {...(isView ? { duration: 0.6, delay: 0 } : {})}
      >
        aluminio anodizado
      </HighlightWord>
      {SCENE3_COPY.afterAluminum}
      <HighlightWord
        reduce={false}
        progress={progress}
        range={ranges[1]}
        reveal={highlightReveal}
        surface="dark"
        {...(isView ? { duration: 0.6, delay: 0.8 } : {})}
      >
        poliuretano de alta densidad
      </HighlightWord>
      {SCENE3_COPY.afterPoly}
      <HighlightWord
        reduce={false}
        progress={progress}
        range={ranges[2]}
        reveal={highlightReveal}
        surface="dark"
        {...(isView ? { duration: 0.6, delay: 1.6 } : {})}
      >
        acero galvanizado
      </HighlightWord>
      {SCENE3_COPY.afterSteel}
    </p>
  );
}

function Scene1Support({
  progress,
  reduce = false,
  highlightReveal = "scroll",
  ranges = [
    [0.12, 0.15],
    [0.18, 0.21],
  ] as const,
}: {
  progress?: MotionValue<number>;
  reduce?: boolean;
  highlightReveal?: "scroll" | "view";
  ranges?: readonly (readonly [number, number])[];
}) {
  if (!progress || reduce) {
    return (
      <p className={SCENE1_BODY_CLASS}>
        <HighlightWordStatic surface="dark">Calidez</HighlightWordStatic>
        {SCENE1_BODY.mid}
        <HighlightWordStatic surface="dark">acero</HighlightWordStatic>
        {SCENE1_BODY.end}
      </p>
    );
  }

  const isView = highlightReveal === "view";

  return (
    <p className={SCENE1_BODY_CLASS}>
      <HighlightWord
        reduce={false}
        progress={progress}
        range={ranges[0]}
        reveal={highlightReveal}
        surface="dark"
        {...(isView ? { duration: 0.45, delay: 0 } : {})}
      >
        Calidez
      </HighlightWord>
      {SCENE1_BODY.mid}
      <HighlightWord
        reduce={false}
        progress={progress}
        range={ranges[1]}
        reveal={highlightReveal}
        surface="dark"
        {...(isView ? { duration: 0.45, delay: 0.35 } : {})}
      >
        acero
      </HighlightWord>
      {SCENE1_BODY.end}
    </p>
  );
}

/**
 * Scroll-linked entrance: opacity + blur-to-focus + soft rise.
 * Matches Manifiesto FocusBlock language for Scene 1 copy.
 */
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
  const opacity = useTransform(progress, [start, end, 1], [0, 1, 1]);
  const blur = useTransform(progress, [start, end, 1], [5, 0, 0]);
  const y = useTransform(progress, [start, end, 1], [12, 0, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      className={className}
      style={{ opacity, filter, y, willChange: "opacity, filter, transform" }}
    >
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

    const lockInlineMuted = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.disablePictureInPicture = true;
    };

    const sync = () => {
      const active =
        progressRef.current >= activeFrom &&
        progressRef.current < activeUntil;
      if (inViewRef.current && active) {
        lockInlineMuted();
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    lockInlineMuted();

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
  // #region agent log
  useEffect(() => {
    fetch("http://127.0.0.1:7757/ingest/2ca1b4b9-9516-44e4-a778-feaf5b6e0783", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "5c4445",
      },
      body: JSON.stringify({
        sessionId: "5c4445",
        runId: "pre-fix",
        hypothesisId: "A",
        location: "AnatomySection.tsx:StaticAnatomy",
        message: "StaticAnatomy mounted",
        data: {
          hasSectionLoop: true,
          detailHasPoster: true,
          note: "static layout now uses SectionLoopVideo for both clips",
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }, []);
  // #endregion

  return (
    <section
      aria-labelledby="anatomia-heading"
      className="bg-carbon px-6 py-24 lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <div className="mx-auto mb-12 max-w-measure text-center lg:mb-20">
          <div className="mx-auto w-fit text-left">
            <Scene1Eyebrow />
            <h2
              id="anatomia-heading"
              className={SCENE1_HEADLINE}
            >
              De la superficie a la estructura.
            </h2>
            <Scene1Support reduce />
          </div>
        </div>

        <div className="mx-auto mb-12 w-full max-w-4xl lg:mb-20">
          <SectionLoopVideo
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            wrapperClassName={`relative ${VIDEO_ASPECT} mx-auto w-full max-w-[min(100%,560px)] overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate`}
            className="h-full w-full object-contain"
            aria-label="Desmontaje de las tres capas del panel Fill Home"
          />
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
          <div className="lg:col-span-7">
            <SectionLoopVideo
              src={DETAIL_VIDEO_SRC}
              poster={DETAIL_VIDEO_POSTER}
              wrapperClassName={`relative ${DETAIL_ASPECT} overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate`}
              className="h-full w-full object-contain"
              aria-label="Detalle de canto del panel Fill Home — tres capas"
            />
          </div>
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
              {SCENE3_COPY.label}
            </p>
            <Scene3Headline />
            <Scene3Body reduce />
            <Scene3Spec />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Mobile: sequential, no sticky scrub ─── */

function MobileAnatomy() {
  const introRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useSectionScrollProgress(introRef);
  const detailProgress = useSectionScrollProgress(detailRef);

  return (
    <section
      aria-labelledby="anatomia-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite"
    >
      <div className="mx-auto max-w-site">
        <div ref={introRef} className="mb-10 max-w-[58ch]">
          <FocusText progress={scrollYProgress} range={[0.02, 0.22]}>
            <Scene1Eyebrow />
          </FocusText>
          <FocusText progress={scrollYProgress} range={[0.12, 0.36]}>
            <h2
              id="anatomia-heading"
              className={SCENE1_HEADLINE}
            >
              De la superficie a la estructura.
            </h2>
          </FocusText>
          <FocusText progress={scrollYProgress} range={[0.28, 0.55]}>
            <Scene1Support
              progress={scrollYProgress}
              highlightReveal="view"
              ranges={[
                [0.3, 0.5],
                [0.45, 0.65],
              ]}
            />
          </FocusText>
        </div>

        <div className="mb-12">
          <SectionLoopVideo
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            wrapperClassName={`relative ${VIDEO_ASPECT} mx-auto overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate`}
            className="h-full w-full object-contain"
            aria-label="Desmontaje de las tres capas del panel Fill Home"
          />
          <p className={`mt-4 ${MONO_MUTED}`}>
            Desmontaje de capas — ensamble mecánico
          </p>
        </div>

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

        <div ref={detailRef} className="grid gap-8">
          <div>
            <SectionLoopVideo
              src={DETAIL_VIDEO_SRC}
              poster={DETAIL_VIDEO_POSTER}
              wrapperClassName={`relative ${DETAIL_ASPECT} overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate`}
              className="h-full w-full object-contain"
              aria-label="Detalle de canto del panel Fill Home — tres capas"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...glide, delay: 0.06 }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60">
              {SCENE3_COPY.label}
            </p>
            <Scene3Headline />
            <Scene3Body
              progress={detailProgress}
              highlightReveal="view"
              ranges={[
                [0.22, 0.4],
                [0.45, 0.62],
                [0.66, 0.84],
              ]}
            />
            <Scene3Spec className="mt-8" />
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

  useProgressGatedPlayback(heroVideoRef, scrollYProgress, 0, 0.42);
  useProgressGatedPlayback(detailVideoRef, scrollYProgress, 0.42);

  /* Scene 1 — hold after reveal before Scene 2 annotations enter */
  const scene1Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.26, 1],
    [1, 0, 0],
  );

  /* Scene 2 — sit on 01/02/03, then long fade before Scene 3 */
  const scene2Opacity = useTransform(
    scrollYProgress,
    [0.22, 0.28, 0.38, 0.5, 1],
    [0, 1, 1, 0, 0],
  );

  /* Visual: hero video → detail video — slow crossfade */
  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.42, 0.54, 1],
    [1, 1, 0, 0],
  );
  const detailOpacity = useTransform(
    scrollYProgress,
    [0, 0.42, 0.54, 1],
    [0, 0, 1, 1],
  );
  const detailScale = useTransform(
    scrollYProgress,
    [0.42, 0.54, 1],
    [1.05, 1, 1],
  );

  /* Scene 3 — slow entrance (~1vh), long pause (~1vh), spaced highlights */
  const scene3Opacity = useTransform(
    scrollYProgress,
    [0.44, 0.54, 1],
    [0, 1, 1],
  );
  const scene3Y = useTransform(scrollYProgress, [0.44, 0.54, 1], [12, 0, 0]);

  return (
    <section
      aria-labelledby="anatomia-heading-desktop"
      className="relative bg-carbon text-offwhite"
    >
      <div ref={trackRef} className="relative h-[1000vh]">
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
                    src={VIDEO_SRC}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={VIDEO_POSTER}
                    disablePictureInPicture
                    className="h-full w-full object-contain"
                    aria-label="Desmontaje de las tres capas del panel Fill Home"
                  />
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
                      src={DETAIL_VIDEO_SRC}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      disablePictureInPicture
                      className="h-full w-full object-contain"
                      aria-label="Detalle de canto del panel Fill Home — tres capas"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right column — scenes 1–3 overlays */}
            <div className="relative col-span-5 flex h-full max-h-[min(560px,68vh)] flex-col justify-center">
              {/* Scene 1 — paced reveal: eyebrow → headline → paragraph → markers */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center"
                style={{ opacity: scene1Opacity }}
              >
                <FocusText progress={scrollYProgress} range={[0.02, 0.07]}>
                  <Scene1Eyebrow />
                </FocusText>

                <FocusText progress={scrollYProgress} range={[0.04, 0.09]}>
                  <h2
                    id="anatomia-heading-desktop"
                    className={SCENE1_HEADLINE}
                  >
                    De la superficie a la estructura.
                  </h2>
                </FocusText>

                <FocusText progress={scrollYProgress} range={[0.07, 0.12]}>
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
                  {SCENE3_COPY.label}
                </p>
                <Scene3Headline />
                <Scene3Body progress={scrollYProgress} />
                <Scene3Spec />
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
  const isDesktop = useIsDesktop();

  // #region agent log
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const branch =
      prefersReducedMotion && isDesktop
        ? "static"
        : isDesktop
          ? "desktop"
          : "mobile";
    fetch("http://127.0.0.1:7757/ingest/2ca1b4b9-9516-44e4-a778-feaf5b6e0783", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "5c4445",
      },
      body: JSON.stringify({
        sessionId: "5c4445",
        runId: "post-fix",
        hypothesisId: "A",
        location: "AnatomySection.tsx:export",
        message: "Anatomy branch selected",
        data: {
          prefersReducedMotion,
          isDesktop,
          branch,
          mqlMatches: mql.matches,
          vw: window.innerWidth,
          note: "mobile never uses StaticAnatomy (iOS reduce-motion trap)",
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }, [prefersReducedMotion, isDesktop]);
  // #endregion

  // iOS Safari often reports prefers-reduced-motion even when the user
  // expects motion — StaticAnatomy then showed inert videos (poster / black,
  // no play control). Keep interactive mobile layout; only desktop reduced
  // motion uses the static stack (now with SectionLoopVideo).
  if (prefersReducedMotion && isDesktop) {
    return <StaticAnatomy />;
  }

  return isDesktop ? <DesktopAnatomy /> : <MobileAnatomy />;
}
