"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import { assetPath } from "@/lib/assetPath";
import CroppedPanelImage from "./CroppedPanelImage";

export type LayerInfo = {
  role: string;
  name: string;
  description: string;
};

type Marker = {
  index: string;
  left: string;
  top: string;
};

const MARKERS: readonly Marker[] = [
  { index: "01", left: "30%", top: "48%" },
  { index: "02", left: "82%", top: "50%" },
  { index: "03", left: "95%", top: "46%" },
] as const;

/** Match page HEADLINE_LG / BODY tokens */
const CALL_OUT_HEADLINE =
  "font-headline text-[1.75rem] font-normal italic leading-[1.08] tracking-[-0.01em] text-offwhite lg:text-[2.35rem]";
const CALL_OUT_BODY =
  "mt-5 max-w-[36ch] text-base leading-[1.65] text-offwhite/65 lg:text-[17px]";

type LayerDiagramProps = {
  layers: readonly LayerInfo[];
};

/**
 * Composition chapter — 7/5 grid.
 * Markers on the still; callout matches Instalación / Aislamiento copy pattern
 * (italic headline + body only — no duplicate 01/02/03 role label).
 */
export default function LayerDiagram({ layers }: LayerDiagramProps) {
  const baseId = useId();
  const reduce = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(reduce ? 0 : null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive((prev) => (prev == null ? 0 : prev));
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  const activate = useCallback((index: number) => {
    setActive(index);
  }, []);

  const activeLayer = active != null ? layers[active] : null;

  return (
    <div
      ref={rootRef}
      className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16"
    >
      <div className="lg:col-span-7">
        <CroppedPanelImage
          src={assetPath("/assets/images/detail_internal_45deg_alt.webp")}
          alt="Diagrama anotado del canto del panel Fill Home: tres capas — aluminio anodizado, poliuretano de alta densidad y acero galvanizado."
          aspectClass="aspect-[16/10]"
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
          contentRight={0.6}
        >
          {layers.map((layer, i) => {
            const marker = MARKERS[i];
            if (!marker) return null;
            const isActive = active === i;
            const isHot = hovered === i || isActive;

            return (
              <div
                key={layer.name}
                className="absolute z-10"
                style={{ left: marker.left, top: marker.top }}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[border-color,transform] duration-300 ${
                    isHot ? "scale-110 border-sand/70" : "border-sand/45"
                  }`}
                />
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`${baseId}-callout`}
                  aria-label={`${marker.index} · ${layer.name}`}
                  onClick={() => activate(i)}
                  onMouseEnter={() => {
                    setHovered(i);
                    activate(i);
                  }}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => activate(i)}
                  className={`relative flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[10px] tracking-[0.06em] transition-[border-color,background-color,color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                    isActive
                      ? "scale-105 border-sand bg-sand text-offwhite"
                      : isHot
                        ? "border-sand bg-slate/95 text-sand"
                        : "border-sand/65 bg-carbon/80 text-sand hover:border-sand"
                  }`}
                >
                  {marker.index}
                </button>
              </div>
            );
          })}
        </CroppedPanelImage>
      </div>

      <div className="lg:col-span-5">
        <div
          id={`${baseId}-callout`}
          role="region"
          aria-live="polite"
          className="min-h-[8.5rem]"
        >
          {activeLayer ? (
            <>
              <p className={CALL_OUT_HEADLINE}>{activeLayer.name}</p>
              <p className={CALL_OUT_BODY}>{activeLayer.description}</p>
            </>
          ) : (
            <p className="text-sm text-offwhite/40">
              Seleccioná una capa en el diagrama.
            </p>
          )}
        </div>
      </div>

      <ol className="sr-only">
        {layers.map((layer, i) => (
          <li key={layer.name}>
            {MARKERS[i]?.index} · {layer.role}: {layer.name}.{" "}
            {layer.description}
          </li>
        ))}
      </ol>
    </div>
  );
}
