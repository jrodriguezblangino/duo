import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
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

/** Shared vertical rhythm between narrative sub-blocks (~64–80px) */
const BLOCK_GAP = "mt-16 lg:mt-20";

export default function TecnologiaPage() {
  return (
    <>
      <section
        aria-labelledby="tecnologia-heading"
        className="bg-carbon px-6 pb-16 pt-28 lg:px-20 lg:pb-24 lg:pt-40"
      >
        <Reveal className="mx-auto max-w-measure text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
            Proceso de fabricación
          </p>
          <h1
            id="tecnologia-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-6xl"
          >
            De la extrusión al encastre.
          </h1>
          <ManufacturingBody className="mx-auto mt-6 max-w-measure text-base leading-[1.65] text-offwhite/70 lg:text-[17px]" />
        </Reveal>
      </section>

      <section
        aria-labelledby="composicion-heading"
        className="bg-carbon px-6 pb-0 lg:px-20"
      >
        <div className="mx-auto max-w-site pb-16 lg:pb-20">
          <h2 id="composicion-heading" className="sr-only">
            Composición de tres capas
          </h2>

          <Reveal className="mx-auto max-w-[62rem]">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate">
              <Image
                src="/assets/images/exploded_view_components.png"
                alt="Perfiles y panel Fill Home en vista de taller"
                fill
                sizes="(min-width: 1440px) 992px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-4 font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
              Sistema de panel y perfiles — vista de taller
            </p>
          </Reveal>

          {/* Annotated cross-section — replaces disconnected 01/02/03 card grid */}
          <Reveal className={BLOCK_GAP}>
            <LayerDiagram layers={LAYERS} />
          </Reveal>

          {/* Instalación — image + copy as one pair */}
          <div
            className={`${BLOCK_GAP} grid items-center gap-8 lg:grid-cols-12 lg:gap-16`}
          >
            <Reveal className="lg:col-span-7">
              <CroppedPanelImage
                src="/assets/images/detail_internal_45deg.png"
                alt="Detalle del encastre oculto entre paneles Fill Home"
                aspectClass="aspect-[16/10]"
                sizes="(min-width: 1024px) 58vw, 100vw"
                contentRight={0.65}
              />
              <p className="mt-4 font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
                Junta oculta — ajuste mecánico
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
                Instalación
              </p>
              <p className="font-headline text-[1.75rem] font-normal italic leading-[1.1] text-offwhite lg:text-[2.5rem]">
                El ajuste que no se ve.
              </p>
              <InstallationBody className="mt-6 max-w-measure text-base leading-[1.65] text-offwhite/70" />
              <p className="mt-6 font-mono text-xs tracking-[0.02em] text-sand lg:text-[13px]">
                Encastre oculto · tolerancia ± 0.3 mm [VERIFY]
              </p>
            </Reveal>
          </div>

          {/* Aislamiento — text + thermal visual as one pair */}
          <div
            className={`${BLOCK_GAP} grid items-center gap-8 lg:grid-cols-12 lg:gap-16`}
          >
            <Reveal className="lg:col-span-5">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
                Aislamiento
              </p>
              <p className="max-w-measure text-base leading-[1.65] text-offwhite/70 lg:text-[17px]">
                El núcleo de poliuretano reduce transferencia térmica y
                aporta la adhesión entre cara y respaldo.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="overflow-hidden rounded-sm border border-offwhite/[0.08] bg-slate">
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
                  <source
                    src="/assets/videos/motion_thermal_capacity.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <p className="mt-4 font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
                Capacidad térmica del núcleo
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Dark → light bridge (Home has a hard cut; this page needs a seam) */}
      <div
        aria-hidden="true"
        className="h-36 bg-gradient-to-b from-carbon from-0% via-[#2a2a2a] via-55% to-offwhite to-100% sm:h-44"
      />

      <section
        aria-labelledby="ficha-heading"
        className="bg-offwhite px-6 pb-24 pt-8 text-carbon lg:px-20 lg:pb-section lg:pt-12"
      >
        <Reveal className="mx-auto max-w-[720px]">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-carbon/60 lg:text-[13px]">
            Ficha técnica
          </p>
          <h2
            id="ficha-heading"
            className="mb-12 font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-carbon lg:text-6xl"
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
        </Reveal>
      </section>
    </>
  );
}
