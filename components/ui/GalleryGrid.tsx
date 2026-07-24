"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { precision } from "@/lib/motion";

type Category = "interior" | "exterior";
type Filter = "todos" | Category;

type GalleryItem = {
  src: string;
  type: "image" | "video";
  category: Category;
  caption: string;
  alt?: string;
};

const ITEMS: GalleryItem[] = [
  {
    src: "/assets/images/gallery_color_options.png",
    type: "image",
    category: "interior",
    caption: "Acabados: wood-look y metálico — misma geometría de panel.",
    alt: "Paneles Fill Home en acabados wood-look y metálico",
  },
  {
    src: "/assets/images/macro_zoom_quality.png",
    type: "image",
    category: "interior",
    caption: "Macro de textura — cara de aluminio anodizado.",
    alt: "Primer plano de la textura del panel",
  },
  {
    src: "/assets/videos/detail_scan_high_quality.mp4",
    type: "video",
    category: "interior",
    caption: "Recorrido sobre la superficie del panel.",
  },
  {
    src: "/assets/videos/motion_interlocking_sparkle.mp4",
    type: "video",
    category: "interior",
    caption: "Encastre oculto en movimiento.",
  },
  {
    src: "/assets/images/durability_water_drops_still.png",
    type: "image",
    category: "exterior",
    caption: "Rechazo de agua sobre la cara anodizada.",
    alt: "Gotas de agua sobre la superficie del panel",
  },
  {
    src: "/assets/videos/motion_water_sliding_v1.mp4",
    type: "video",
    category: "exterior",
    caption: "Escurrimiento de agua sin marcar el acabado.",
  },
  {
    src: "/assets/videos/motion_water_sliding_v2.mp4",
    type: "video",
    category: "exterior",
    caption: "Comportamiento al agua — vista alternativa.",
  },
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("todos");
  const prefersReducedMotion = useReducedMotion();

  const visibleItems =
    filter === "todos"
      ? ITEMS
      : ITEMS.filter((item) => item.category === filter);

  return (
    <div className="flex flex-col gap-10">
      <div
        role="group"
        aria-label="Filtrar galería por categoría"
        className="flex flex-wrap items-center gap-6"
      >
        {FILTERS.map(({ key, label }, index) => (
          <div key={key} className="flex items-center gap-6">
            {index > 0 && (
              <span aria-hidden="true" className="h-4 w-px bg-offwhite/30" />
            )}
            <button
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
              className="relative pb-2 text-sm font-medium uppercase tracking-[0.08em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              <span
                className={
                  filter === key ? "text-offwhite" : "text-offwhite/40"
                }
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
          </div>
        ))}
      </div>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <li key={item.src}>
            <figure className="flex flex-col gap-3">
              {item.type === "image" ? (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt ?? ""}
                    fill
                    priority={index < 3}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="aspect-video w-full object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              )}
              <figcaption className="text-sm leading-relaxed text-offwhite/60">
                {item.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
