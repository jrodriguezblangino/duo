"use client";

import { useState } from "react";
import Image from "next/image";

type StyleKey = "madera" | "metalico";

const STYLES: Record<
  StyleKey,
  {
    label: string;
    description: string;
    videoSrc: string;
    imageSrc: string;
    imageAlt: string;
  }
> = {
  madera: {
    label: "Aspecto Madera",
    description:
      "La calidez natural de la madera con la resistencia estructural del acero. Ideal para interiores que buscan sofisticación atemporal.",
    videoSrc: "/assets/videos/hero_cinematic_scan.mp4",
    imageSrc: "/assets/images/detail_internal_45deg.png",
    imageAlt:
      "Detalle interno del panel con acabado aspecto madera, visto a 45 grados",
  },
  metalico: {
    label: "Metálico Negro",
    description:
      "Presencia arquitectónica contemporánea con un acabado metálico profundo. Protagonismo absoluto en fachadas y espacios comerciales.",
    videoSrc: "/assets/videos/motion_interlocking_sparkle.mp4",
    imageSrc: "/assets/images/gallery_color_options.png",
    imageAlt: "Opciones de color del panel con acabado metálico negro",
  },
};

export default function StyleToggle() {
  const [active, setActive] = useState<StyleKey>("madera");
  const style = STYLES[active];

  return (
    <div className="flex flex-col gap-8">
      <div
        role="group"
        aria-label="Selección de estilo"
        className="flex flex-wrap gap-3"
      >
        {(Object.keys(STYLES) as StyleKey[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={active === key}
            onClick={() => setActive(key)}
            className={`rounded-sm border px-6 py-3 text-sm uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
              active === key
                ? "border-sand bg-sand text-carbon"
                : "border-offwhite/20 text-offwhite/70 hover:border-sand hover:text-sand"
            }`}
          >
            {STYLES[key].label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <video
          key={style.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="aspect-video w-full rounded-sm object-cover"
        >
          <source src={style.videoSrc} type="video/mp4" />
        </video>
        <figure className="flex flex-col gap-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-sm">
            <Image
              src={style.imageSrc}
              alt={style.imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="text-sm leading-relaxed text-offwhite/60">
            {style.description}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
