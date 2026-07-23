"use client";

import { useState } from "react";
import Image from "next/image";

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
    caption: "Opciones de acabado: aspecto madera y metálico negro.",
    alt: "Paneles Fill Home en sus dos acabados: aspecto madera y metálico negro",
  },
  {
    src: "/assets/images/macro_zoom_quality.png",
    type: "image",
    category: "interior",
    caption: "Detalle macro de la textura y calidad del acabado.",
    alt: "Primer plano extremo de la textura del panel",
  },
  {
    src: "/assets/videos/detail_scan_high_quality.mp4",
    type: "video",
    category: "interior",
    caption: "Recorrido en detalle sobre la superficie del panel.",
  },
  {
    src: "/assets/videos/motion_interlocking_sparkle.mp4",
    type: "video",
    category: "interior",
    caption: "El sistema de encastre oculto en movimiento.",
  },
  {
    src: "/assets/images/durability_water_drops_still.png",
    type: "image",
    category: "exterior",
    caption: "Resistencia al agua: la superficie repele la humedad.",
    alt: "Gotas de agua sobre la superficie del panel demostrando su impermeabilidad",
  },
  {
    src: "/assets/videos/motion_water_sliding_v1.mp4",
    type: "video",
    category: "exterior",
    caption: "El agua se desliza sin dejar marcas sobre el acabado.",
  },
  {
    src: "/assets/videos/motion_water_sliding_v2.mp4",
    type: "video",
    category: "exterior",
    caption: "Comportamiento del agua sobre la superficie, vista alternativa.",
  },
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("todos");

  const visibleItems =
    filter === "todos"
      ? ITEMS
      : ITEMS.filter((item) => item.category === filter);

  return (
    <div className="flex flex-col gap-10">
      <div
        role="group"
        aria-label="Filtrar galería por categoría"
        className="flex flex-wrap gap-3"
      >
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={`rounded-sm border px-6 py-3 text-sm uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
              filter === key
                ? "border-sand bg-sand text-carbon"
                : "border-offwhite/20 text-offwhite/70 hover:border-sand hover:text-sand"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <li key={item.src}>
            <figure className="flex flex-col gap-3">
              {item.type === "image" ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-sm">
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
                  className="aspect-video w-full rounded-sm object-cover"
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
