import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import { assetPath } from "@/lib/assetPath";
import { CTA } from "@/lib/site";
import LayerDiagram from "./LayerDiagram";
import {
  InstallationBody,
  InsulationBody,
  ManufacturingBody,
} from "./HighlightedBodies";

export const metadata: Metadata = {
  title: "Tecnología",
  description:
    "Tres capas: aluminio anodizado 0.6 mm, poliuretano de alta densidad y acero galvanizado. Ficha técnica Fill Home.",
};

const LAYERS = [
  {
    role: "Cara vista",
    name: "Aluminio anodizado",
    description:
      "0.6 mm de cara anodizada. Wood-look o metálico — es lo que se ve y se toca.",
  },
  {
    role: "Núcleo",
    name: "Poliuretano de alta densidad",
    description:
      "Aislamiento térmico y acústico, y la capa que adhiere cara y respaldo.",
  },
  {
    role: "Respaldo",
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

const RAIL = "mx-auto w-full max-w-[64rem]";
const CHAPTER_Y = "py-16 lg:py-24";
const CHAPTER_GRID = "grid items-start gap-10 lg:grid-cols-12 lg:gap-16";

const EYEBROW =
  "mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-offwhite/55 lg:text-[13px]";
const HEADLINE_LG =
  "font-headline text-[1.75rem] font-normal italic leading-[1.08] tracking-[-0.01em] text-offwhite lg:text-[2.35rem]";
const BODY =
  "max-w-[36ch] text-base leading-[1.65] text-offwhite/65 lg:text-[17px]";
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
      <section
        aria-labelledby="tecnologia-heading"
        className="bg-carbon px-6 pt-28 text-offwhite lg:px-20 lg:pt-36"
      >
        <div className={RAIL}>
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-10 left-0 top-8 hidden w-px bg-offwhite/12 lg:block"
            />

            <div className="lg:pl-10">
              {/* Hero */}
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

              {/* 01 Fabricación */}
              <Chapter id="fabricacion">
                <ChapterEyebrow index="01" label="Fabricación" />
                <MediaFrame aspectClass="aspect-[2/1]">
                  <Image
                    src={assetPath("/assets/images/exploded_view_components.webp")}
                    alt="Perfiles y panel Fill Home en vista de taller"
                    fill
                    sizes="(min-width: 1440px) 1024px, 100vw"
                    className="object-cover object-[50%_30%]"
                    priority
                  />
                </MediaFrame>
              </Chapter>

              {/* 02 Composición */}
              <Chapter
                id="composicion"
                className="border-t border-offwhite/[0.06]"
              >
                <ChapterEyebrow index="02" label="Composición" />
                <h2 className="sr-only">Composición de tres capas</h2>
                <LayerDiagram layers={LAYERS} />
              </Chapter>

              {/* 03 Instalación — motion-clipper */}
              <Chapter
                id="instalacion"
                className="border-t border-offwhite/[0.06]"
              >
                <ChapterEyebrow index="03" label="Instalación" />
                <div className={CHAPTER_GRID}>
                  <div className="lg:col-span-7">
                    <MediaFrame aspectClass="aspect-[16/10]">
                      <BackgroundVideo
                        src={assetPath("/assets/videos/motion-clipper.mp4")}
                        preload="metadata"
                        aria-label="Encastre oculto entre paneles Fill Home"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </MediaFrame>
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

              {/* 04 Aislamiento */}
              <Chapter
                id="aislamiento"
                className="border-t border-offwhite/[0.06]"
              >
                <ChapterEyebrow index="04" label="Aislamiento" />
                <div className={CHAPTER_GRID}>
                  <div className="order-2 lg:order-1 lg:col-span-5">
                    <p className={HEADLINE_LG}>El núcleo que sostiene.</p>
                    <InsulationBody className={`mt-5 ${BODY}`} />
                    <p className={SPEC_LINE}>
                      Núcleo HD · aislamiento + adhesión
                    </p>
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-7">
                    <MediaFrame aspectClass="aspect-[16/10]">
                      <BackgroundVideo
                        src={assetPath(
                          "/assets/videos/motion_thermal_capacity.mp4",
                        )}
                        preload="metadata"
                        className="absolute inset-0 h-full w-full origin-right scale-[1.15] object-cover object-[75%_42%]"
                      />
                    </MediaFrame>
                  </div>
                </div>
              </Chapter>
            </div>
          </div>
        </div>
      </section>

      <div
        aria-hidden="true"
        className="h-28 bg-gradient-to-b from-carbon via-[#1f1f1f] to-offwhite sm:h-36"
      />

      {/* 05 Especificaciones */}
      <section
        aria-labelledby="ficha-heading"
        className="bg-offwhite px-6 pb-24 pt-6 text-carbon lg:px-20 lg:pb-section lg:pt-10"
      >
        <div className={`${RAIL} max-w-[40rem] lg:pl-10`}>
          <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-carbon/55 lg:text-[13px]">
            <span className="font-mono font-normal tracking-[0.08em] text-carbon/70">
              05
            </span>
            <span
              aria-hidden="true"
              className="h-px w-5 shrink-0 bg-carbon/25"
            />
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
