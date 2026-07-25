"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import CroppedPanelImage from "./CroppedPanelImage";

export type LayerInfo = {
  role: string;
  name: string;
  description: string;
};

type Marker = {
  index: string;
  /** % of cropped frame — wood face / foam core / steel profile */
  left: string;
  top: string;
  /** Keep callout inside the frame near edges */
  calloutAlign: "start" | "center" | "end";
};

const MARKERS: readonly Marker[] = [
  { index: "01", left: "30%", top: "48%", calloutAlign: "start" },
  { index: "02", left: "82%", top: "50%", calloutAlign: "end" },
  { index: "03", left: "95%", top: "46%", calloutAlign: "end" },
] as const;

type LayerDiagramProps = {
  layers: readonly LayerInfo[];
};

export default function LayerDiagram({ layers }: LayerDiagramProps) {
  const baseId = useId();
  const reduce = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(reduce ? 0 : null);

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
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  const activate = useCallback((index: number) => {
    setActive(index);
  }, []);

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-[42rem]">
      <CroppedPanelImage
        src="/assets/images/detail_internal_45deg_alt.png"
        alt="Diagrama anotado del canto del panel Fill Home: tres capas — aluminio anodizado, poliuretano de alta densidad y acero galvanizado."
        aspectClass="aspect-[16/10]"
        sizes="(min-width: 1024px) 672px, 100vw"
        priority
        contentRight={0.6}
      >
        {layers.map((layer, i) => {
          const marker = MARKERS[i];
          if (!marker) return null;
          const isActive = active === i;
          const panelId = `${baseId}-panel-${marker.index}`;

          return (
            <div
              key={layer.name}
              className="absolute z-10"
              style={{ left: marker.left, top: marker.top }}
            >
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => activate(i)}
                onMouseEnter={() => activate(i)}
                onFocus={() => activate(i)}
                className={`flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[11px] tracking-[0.04em] transition-[border-color,background-color,color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                  isActive
                    ? "scale-105 border-sand bg-sand text-carbon"
                    : "border-sand/70 bg-slate/90 text-sand hover:border-sand"
                }`}
              >
                <span className="sr-only">Capa </span>
                {marker.index}
              </button>

              <div
                id={panelId}
                role="region"
                aria-hidden={!isActive}
                className={`absolute bottom-[calc(100%+0.65rem)] z-20 w-[min(15.5rem,72vw)] transition-opacity duration-300 ease-out ${
                  marker.calloutAlign === "start"
                    ? "left-0"
                    : marker.calloutAlign === "end"
                      ? "right-0"
                      : "left-1/2 -translate-x-1/2"
                } ${
                  isActive
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <div className="rounded-sm border border-offwhite/15 bg-carbon/95 px-4 py-3 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.08em] text-offwhite/50">
                    {layer.role}
                  </p>
                  <p className="mt-1 text-sm text-offwhite">{layer.name}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-offwhite/60">
                    {layer.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CroppedPanelImage>

      <p className="mt-4 font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
        Canto en corte — tres capas anotadas
      </p>

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
