import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { CTA } from "@/lib/site";
import CroppedPanelImage from "./CroppedPanelImage";
import LayerDiagram from "./LayerDiagram";
import {
  InstallationBody,
  ManufacturingBody,
} from "./HighlightedBodies";

export const metadata: Metadata = {
  title: "Tecnología",
  description:
    "Tres capas: aluminio anodizado 0.6 mm, poliuretano de alta densidad y acero galvanizado. Ficha técnica Fill Home.",
};

const LAYERS = [
  {
    role: "01 · Cara vista",
    name: "Aluminio anodizado",
    description:
      "0.6 mm de cara anodizada. Wood-look o metálico — es lo que se ve y se toca.",
  },
  {
    role: "02 · Núcleo",
    name: "Poliuretano de alta densidad",
    description:
      "Aislamiento térmico y acústico, y la capa que adhiere cara y respaldo.",
  },
  {
    role: "03 · Respaldo",
    name: "Acero galvanizado",
    description:
      "Rigidez estructural del sistema; estabilidad dimensional en el tiempo.",
  },
] as const;

const SPECS = [
  { label: "Dimensiones", value: "3 m × 40 cm" },
  { label: "Cobertura", value: "1,5 m² por panel" },
  { label: "Cara", value: "Aluminio anodizado 0.6 mm" },
  { label: "Núcleo", value: "Poliuretano HD — aislamiento + adhesión" },
  { label: "Respaldo", value: "Acero galvanizado" },
  { label: "Instalación", value: "Encastre oculto sobre muro existente" },
  { label: "Mantenimiento", value: "Agua y paño suave" },
  { label: "Acabados", value: "Aspecto madera / Metálico" },
];

/**
 * One composition rail for the whole narrative.
 * Every chapter shares this width so left edges and media columns align.
 */
const RAIL = "mx-auto w-full max-w-[64rem]";

/** Shared chapter vertical rhythm */
const CHAPTER_Y = "py-16 lg:py-24";
const CHAPTER_GRID =
  "grid items-start gap-10 lg:grid-cols-12 lg:gap-16";

const EYEBROW =
  "mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-offwhite/55 lg:text-[13px]";
const HEADLINE_LG =
  "font-headline text-[1.75rem] font-normal italic leading-[1.08] tracking-[-0.01em] text-offwhite lg:text-[2.35rem]";
const BODY =
  "max-w-[36ch] text-base leading-[1.65] text-offwhite/65 lg:text-[17px]";
const CAPTION =
  "mt-4 font-mono text-xs tracking-[0.02em] text-offwhite/45 lg:text-[13px]";
const SPEC_LINE =
  "mt-6 font-mono text-xs tracking-[0.02em] text-sand lg:text-[13px]";

function ChapterEyebrow({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <p className={EYEBROW}>
      <span className="font-mono font-normal tracking-[0.08em] text-sand">
        {index}
      </span>
      <span aria-hidden="true" className="h-px w-5 shrink-0 bg-sand/45" />
      <span>{label}</span>
    </p>
  );
}

function Chapter({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div id={id} className={`${CHAPTER_Y} ${className}`}>
      {children}
    </div>
  );
}

function MediaFrame({
  children,
  aspectClass = "aspect-[16/10]",
}: {
  children: ReactNode;
  aspectClass?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate ${aspectClass}`}
    >
      {children}
    </div>
  );
}

export default function TecnologiaPage() {
  return (
    <>
      {/* ─── One continuous carbon narrative ─── */}
      <section
        aria-labelledby="tecnologia-heading"
        className="bg-carbon px-6 pt-28 text-offwhite lg:px-20 lg:pt-36"
      >
        <div className={RAIL}>
          <div className="relative">
            {/* Spine — left of the shared content edge */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-10 left-0 top-8 hidden w-px bg-offwhite/12 lg:block"
            />

            <div className="lg:pl-10">
              {/* Intro + chapters share one left edge */}
              <div className="max-w-[40rem] pb-6 lg:pb-4">
                <p className={EYEBROW}>
                  <span
                    aria-hidden="true"
                    className="h-px w-4 shrink-0 bg-sand"
                  />
                  Proceso de fabricación
                </p>
                <h1
                  id="tecnologia-heading"
                  className="font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-[3.75rem]"
                >
                  De la extrusión al encastre.
                </h1>
                <ManufacturingBody className={`mt-6 ${BODY} max-w-[42ch]`} />
              </div>

            {/* 01 — Establishing shot (full rail) */}
            <Chapter id="fabricacion">
              <div>
                <ChapterEyebrow index="01" label="Fabricación" />
                <MediaFrame aspectClass="aspect-[2/1]">
                  <Image
                    src="/assets/images/exploded_view_components.png"
                    alt="Perfiles y panel Fill Home en vista de taller"
                    fill
                    sizes="(min-width: 1440px) 1024px, 100vw"
                    className="object-cover object-[50%_30%]"
                    priority
                  />
                </MediaFrame>
                <p className={CAPTION}>
                  Sistema de panel y perfiles — vista de taller
                </p>
              </div>
            </Chapter>

            {/* 02 — Composition: diagram + live callout (7/5) */}
            <Chapter id="composicion" className="border-t border-offwhite/[0.06]">
              <div>
                <ChapterEyebrow index="02" label="Composición" />
                <h2 className="sr-only">Composición de tres capas</h2>
                <LayerDiagram layers={LAYERS} />
              </div>
            </Chapter>

            {/* 03 — Instalación: media | copy */}
            <Chapter id="instalacion" className="border-t border-offwhite/[0.06]">
              <ChapterEyebrow index="03" label="Instalación" />
              <div className={CHAPTER_GRID}>
                <div className="lg:col-span-7">
                  <CroppedPanelImage
                    src="/assets/images/detail_internal_45deg.png"
                    alt="Detalle del encastre oculto entre paneles Fill Home"
                    aspectClass="aspect-[16/10]"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    contentRight={0.58}
                    zoom={1.12}
                    objectPosition="60% 48%"
                  />
                  <p className={CAPTION}>Junta oculta — ajuste mecánico</p>
                </div>
                <div className="lg:col-span-5">
                  <p className={HEADLINE_LG}>El ajuste que no se ve.</p>
                  <InstallationBody className={`mt-5 ${BODY}`} />
                  <p className={SPEC_LINE}>
                    Encastre oculto · tolerancia ± 0.3 mm [VERIFY]
                  </p>
                </div>
              </div>
            </Chapter>

            {/* 04 — Aislamiento: copy | media (flip for rhythm) */}
            <Chapter id="aislamiento" className="border-t border-offwhite/[0.06]">
              <ChapterEyebrow index="04" label="Aislamiento" />
              <div className={CHAPTER_GRID}>
                <div className="order-2 lg:order-1 lg:col-span-5">
                  <p className={HEADLINE_LG}>El núcleo que sostiene.</p>
                  <p className={`mt-5 ${BODY}`}>
                    El poliuretano de alta densidad reduce la transferencia
                    térmica, aporta confort acústico y es la capa que adhiere
                    cara y respaldo en una sola pieza.
                  </p>
                  <p className={SPEC_LINE}>
                    Núcleo HD · aislamiento + adhesión
                  </p>
                </div>
                <div className="order-1 lg:order-2 lg:col-span-7">
                  <MediaFrame aspectClass="aspect-[16/10]">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      tabIndex={-1}
                      className="absolute inset-0 h-full w-full object-cover object-[75%_42%] scale-[1.15] origin-right"
                    >
                      <source
                        src="/assets/videos/motion_thermal_capacity.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </MediaFrame>
                  <p className={CAPTION}>Capacidad térmica del núcleo</p>
                </div>
              </div>
            </Chapter>
            </div>
          </div>
        </div>
      </section>

      {/* Dark → light bridge */}
      <div
        aria-hidden="true"
        className="h-28 bg-gradient-to-b from-carbon via-[#1f1f1f] to-offwhite sm:h-36"
      />

      {/* Specs — same rail width as narrative for continuity */}
      <section
        aria-labelledby="ficha-heading"
        className="bg-offwhite px-6 pb-24 pt-6 text-carbon lg:px-20 lg:pb-section lg:pt-10"
      >
        <div className={`${RAIL} max-w-[40rem]`}>
          <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-carbon/55 lg:text-[13px]">
            <span className="font-mono font-normal tracking-[0.08em] text-carbon/70">
              05
            </span>
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-carbon/25" />
            <span>Ficha técnica</span>
          </p>
          <h2
            id="ficha-heading"
            className="mb-12 font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-carbon lg:text-[3.5rem]"
          >
            Especificaciones.
          </h2>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Especificaciones técnicas del panel Fill Home
            </caption>
            <tbody>
              {SPECS.map(({ label, value }) => (
                <tr
                  key={label}
                  className="border-b border-carbon/10 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="w-[40%] py-5 pr-6 align-top font-mono text-xs font-normal tracking-[0.02em] text-carbon/55 sm:w-1/3"
                  >
                    {label}
                  </th>
                  <td className="py-5 text-base leading-relaxed text-carbon/80">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-16">
            <Button href={CTA.href} variant="primary" size="md">
              {CTA.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
