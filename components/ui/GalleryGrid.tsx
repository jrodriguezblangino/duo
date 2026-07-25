"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { assetPath } from "@/lib/assetPath";
import { ENTRY_Y, STAGGER, glide, precision } from "@/lib/motion";

type Category = "interior" | "exterior";
type Filter = "todos" | Category;

type GalleryItem = {
  src: string;
  type: "image" | "video";
  category: Category;
  caption: string;
  alt?: string;
  /** Still frame while video buffers — avoids empty black tiles */
  poster?: string;
};

const ITEMS: GalleryItem[] = [
  {
    src: assetPath("/assets/images/gallery_color_options.png"),
    type: "image",
    category: "interior",
    caption: "Acabados: wood-look y metálico — misma geometría de panel.",
    alt: "Paneles Fill Home en acabados wood-look y metálico",
  },
  {
    src: assetPath("/assets/images/macro_zoom_quality.png"),
    type: "image",
    category: "interior",
    caption: "Macro de textura — cara de aluminio anodizado.",
    alt: "Primer plano de la textura del panel",
  },
  {
    src: assetPath("/assets/videos/detail_scan_high_quality.mp4"),
    type: "video",
    category: "interior",
    caption: "Recorrido sobre la superficie del panel.",
    poster: assetPath("/assets/images/macro_zoom_quality.png"),
  },
  {
    src: assetPath("/assets/videos/motion_interlocking_sparkle.mp4"),
    type: "video",
    category: "interior",
    caption: "Encastre oculto en movimiento.",
    poster: assetPath("/assets/images/gallery_color_options.png"),
  },
  {
    src: assetPath("/assets/images/durability_water_drops_still.png"),
    type: "image",
    category: "exterior",
    caption: "Rechazo de agua sobre la cara anodizada.",
    alt: "Gotas de agua sobre la superficie del panel",
  },
  {
    src: assetPath("/assets/videos/motion_water_sliding_v1.mp4"),
    type: "video",
    category: "exterior",
    caption: "Escurrimiento de agua sin marcar el acabado.",
    poster: assetPath("/assets/images/durability_water_drops_still.png"),
  },
  {
    src: assetPath("/assets/videos/motion_water_sliding_v2.mp4"),
    type: "video",
    category: "exterior",
    caption: "Comportamiento al agua — vista alternativa.",
    poster: assetPath("/assets/images/durability_water_drops_still.png"),
  },
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
];

const mediaMotion =
  "h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.03]";

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("todos");
  const prefersReducedMotion = useReducedMotion();

  const visibleItems =
    filter === "todos"
      ? ITEMS
      : ITEMS.filter((item) => item.category === filter);

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
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

      <ul
        aria-live="polite"
        className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((item, index) => (
            <motion.li
              key={item.src}
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
                ...(prefersReducedMotion
                  ? { duration: 0.2 }
                  : glide),
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
                      priority={index < 3}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={mediaMotion}
                    />
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={item.poster}
                      aria-hidden="true"
                      tabIndex={-1}
                      className={`absolute inset-0 ${mediaMotion}`}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
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
  );
}
