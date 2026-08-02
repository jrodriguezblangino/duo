"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GalleryBeforeAfter from "@/components/ui/GalleryBeforeAfter";
import { assetPath } from "@/lib/assetPath";
import { ENTRY_Y, STAGGER, glide, precision } from "@/lib/motion";
import { useBackgroundVideo } from "@/lib/useBackgroundVideo";

type Category = "interior" | "exterior";
type Filter = "todos" | Category;

type GalleryImageItem = {
  id: string;
  type: "image";
  src: string;
  category: Category;
  caption: string;
  alt?: string;
};

type GalleryVideoItem = {
  id: string;
  type: "video";
  src: string;
  category: Category;
  caption: string;
  /** Still frame while video buffers — avoids empty black tiles */
  poster?: string;
};

type GalleryMediaItem = GalleryImageItem | GalleryVideoItem;

type GalleryBeforeAfterItem = {
  id: string;
  category: Category;
  caption: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label?: string;
};

/** Project compares — own band, not mixed into the 3-col media grid */
const BEFORE_AFTER: GalleryBeforeAfterItem[] = [
  {
    id: "ba-country-pilar",
    category: "exterior",
    caption: "Pilar — antes / después, fachada wood-look.",
    beforeSrc: assetPath("/assets/images/project_demo_villa_before.webp"),
    afterSrc: assetPath("/assets/images/project_demo_villa_madera.webp"),
    beforeAlt: "Casa de country en Pilar antes del revestimiento",
    afterAlt: "Misma fachada con paneles wood-look Fill Home",
    label: "Comparar antes y después — casa de country en Pilar",
  },
  {
    id: "ba-urbana-caba",
    category: "exterior",
    caption: "Buenos Aires — antes / después, metálico carbón.",
    beforeSrc: assetPath("/assets/images/project_demo_townhouse_before.webp"),
    afterSrc: assetPath("/assets/images/project_demo_townhouse_metal.webp"),
    beforeAlt: "Casa urbana en Buenos Aires antes del revestimiento",
    afterAlt: "Misma fachada con paneles metálicos carbón Fill Home",
    label: "Comparar antes y después — casa urbana en Buenos Aires",
  },
];

const ITEMS: GalleryMediaItem[] = [
  {
    id: "finishes",
    src: assetPath("/assets/images/gallery_color_options.webp"),
    type: "image",
    category: "interior",
    caption: "Acabados: wood-look y metálico — misma geometría de panel.",
    alt: "Paneles Fill Home en acabados wood-look y metálico",
  },
  {
    id: "macro",
    src: assetPath("/assets/images/macro_zoom_quality.webp"),
    type: "image",
    category: "interior",
    caption: "Macro de textura — cara de aluminio anodizado.",
    alt: "Primer plano de la textura del panel",
  },
  {
    id: "detail-scan",
    src: assetPath("/assets/videos/detail_scan_high_quality.mp4"),
    type: "video",
    category: "interior",
    caption: "Recorrido sobre la superficie del panel.",
    poster: assetPath("/assets/images/macro_zoom_quality.webp"),
  },
  {
    id: "interlock",
    src: assetPath("/assets/videos/motion_interlocking_sparkle.mp4"),
    type: "video",
    category: "interior",
    caption: "Encastre oculto en movimiento.",
    poster: assetPath("/assets/images/gallery_color_options.webp"),
  },
  {
    id: "water-still",
    src: assetPath("/assets/images/durability_water_drops_still.webp"),
    type: "image",
    category: "exterior",
    caption: "Rechazo de agua sobre la cara anodizada.",
    alt: "Gotas de agua sobre la superficie del panel",
  },
  {
    id: "water-v1",
    src: assetPath("/assets/videos/motion_water_sliding_v1.mp4"),
    type: "video",
    category: "exterior",
    caption: "Escurrimiento de agua sin marcar el acabado.",
    poster: assetPath("/assets/images/durability_water_drops_still.webp"),
  },
  {
    id: "water-v2",
    src: assetPath("/assets/videos/motion_water_sliding_v2.mp4"),
    type: "video",
    category: "exterior",
    caption: "Comportamiento al agua — vista alternativa.",
    poster: assetPath("/assets/images/durability_water_drops_still.webp"),
  },
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
];

const mediaMotion =
  "h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.03]";

function GalleryVideo({
  src,
  poster,
  className,
  enabled,
}: {
  src: string;
  poster?: string;
  className: string;
  enabled: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useBackgroundVideo(videoRef, {
    enabled: enabled && shouldLoad,
    threshold: 0.2,
    rootRef,
  });

  return (
    <div ref={rootRef} className="absolute inset-0">
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          className={className}
        />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          decoding="async"
          className={className}
        />
      ) : null}
    </div>
  );
}

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("todos");
  const prefersReducedMotion = useReducedMotion();

  const showBeforeAfter = filter === "todos" || filter === "exterior";

  const visibleItems =
    filter === "todos"
      ? ITEMS
      : ITEMS.filter((item) => item.category === filter);

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {/* Band 1 — obra compares (2-up, same tile rhythm as media) */}
      {showBeforeAfter ? (
        <div className="flex flex-col gap-6 lg:gap-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-offwhite/45 lg:text-[13px]">
            Obra demostrativa
          </p>
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:gap-y-12">
            {BEFORE_AFTER.map((item, index) => (
              <li key={item.id}>
                <figure className="flex flex-col gap-4">
                  <GalleryBeforeAfter
                    beforeSrc={item.beforeSrc}
                    afterSrc={item.afterSrc}
                    beforeAlt={item.beforeAlt}
                    afterAlt={item.afterAlt}
                    label={item.label}
                    priority={index === 0}
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                  <figcaption className="font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
                    {item.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Band 2 — material macros (filtered 3-col) */}
      <div className="flex flex-col gap-10 lg:gap-12">
        {showBeforeAfter ? (
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-transparent via-offwhite/15 to-transparent"
          />
        ) : null}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-offwhite/45 lg:text-[13px]">
            Material — detalle
          </p>
          <div
            role="group"
            aria-label="Filtrar galería por categoría"
            className="-mx-1 flex flex-nowrap items-center overflow-x-auto px-1"
          >
            {FILTERS.map(({ key, label }, index) => (
              <Fragment key={key}>
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="mx-5 h-4 w-px shrink-0 bg-sand/20 sm:mx-6"
                  />
                )}
                <button
                  type="button"
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                  className="relative shrink-0 pb-2 text-sm font-medium uppercase tracking-[0.08em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
                >
                  <span
                    className={`transition-colors duration-300 ${
                      filter === key
                        ? "text-offwhite"
                        : "text-offwhite/40 hover:text-offwhite/70"
                    }`}
                  >
                    {label}
                  </span>
                  {filter === key && (
                    <motion.span
                      layoutId="gallery-filter-underline"
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px bg-sand"
                      transition={
                        prefersReducedMotion ? { duration: 0.15 } : precision
                      }
                    />
                  )}
                </button>
              </Fragment>
            ))}
          </div>
        </div>

        <ul
          aria-live="polite"
          className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((item, index) => (
              <motion.li
                key={item.id}
                layout={!prefersReducedMotion}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: ENTRY_Y }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: ENTRY_Y / 2 }
                }
                transition={{
                  ...(prefersReducedMotion ? { duration: 0.2 } : glide),
                  delay: prefersReducedMotion
                    ? 0
                    : Math.min(index, 4) * STAGGER,
                }}
              >
                <figure className="group flex flex-col gap-4">
                  <div className="relative aspect-video w-full overflow-hidden bg-slate">
                    {item.type === "image" ? (
                      <Image
                        src={item.src}
                        alt={item.alt ?? ""}
                        fill
                        priority={index === 0 && !showBeforeAfter}
                        loading={
                          index === 0 && !showBeforeAfter ? "eager" : "lazy"
                        }
                        decoding="async"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className={mediaMotion}
                      />
                    ) : (
                      <GalleryVideo
                        src={item.src}
                        poster={item.poster}
                        enabled={!prefersReducedMotion}
                        className={`absolute inset-0 ${mediaMotion}`}
                      />
                    )}
                  </div>
                  <figcaption className="font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
                    {item.caption}
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
