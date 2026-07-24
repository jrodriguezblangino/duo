import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { CTA } from "@/lib/site";

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
];

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

export default function TecnologiaPage() {
  return (
    <>
      <section
        aria-labelledby="tecnologia-heading"
        className="bg-carbon px-6 pb-16 pt-28 lg:px-20 lg:pb-24 lg:pt-40"
      >
        <Reveal className="mx-auto max-w-measure text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
            Ingeniería de panel
          </p>
          <h1
            id="tecnologia-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-6xl"
          >
            De la superficie a la estructura.
          </h1>
          <p className="mx-auto mt-6 max-w-measure text-base leading-[1.65] text-offwhite/70 lg:text-[17px]">
            Orden visible → estructural: aluminio, poliuretano, acero.
          </p>
        </Reveal>
      </section>

      <section
        aria-labelledby="composicion-heading"
        className="bg-carbon px-6 pb-24 lg:px-20 lg:pb-section"
      >
        <div className="mx-auto max-w-site">
          <h2 id="composicion-heading" className="sr-only">
            Composición de tres capas
          </h2>

          <Reveal className="mb-16 lg:mb-24">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate">
              <Image
                src="/assets/images/exploded_view_components.png"
                alt="Perfiles y panel Fill Home en vista de taller"
                fill
                sizes="(min-width: 1440px) 1440px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-4 font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
              Sistema de panel y perfiles — vista de taller
            </p>
          </Reveal>

          <div className="mb-16 grid gap-px bg-sand/20 lg:mb-24 lg:grid-cols-3">
            {LAYERS.map(({ role, name, description }, index) => (
              <Reveal key={name} delay={0.08 * index}>
                <article className="h-full bg-slate px-6 py-8">
                  <p className="mb-4 font-mono text-xs tracking-[0.02em] text-offwhite/50">
                    {role}
                  </p>
                  <h3 className="text-base text-offwhite">{name}</h3>
                  <p className="mt-3 max-w-measure text-sm leading-relaxed text-offwhite/60">
                    {description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="relative aspect-[4/3] overflow-hidden bg-slate lg:col-span-7">
              <Image
                src="/assets/images/macro_zoom_quality.png"
                alt="Macro del canto: cara, núcleo y acabado"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
                Detalle de canto
              </p>
              <p className="font-headline text-[1.75rem] font-normal italic leading-[1.1] text-offwhite lg:text-[2.5rem]">
                Tolerancia visible.
              </p>
              <p className="mt-6 max-w-measure text-base leading-[1.65] text-offwhite/70">
                El canto muestra las tres capas sin maquillaje de render.
              </p>
              <p className="mt-6 font-mono text-xs tracking-[0.02em] text-sand lg:text-[13px]">
                0.6 mm aluminio · núcleo HD · acero galvanizado
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
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
              <p className="mt-4 font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
                Capacidad térmica del núcleo
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="ficha-heading"
        className="bg-offwhite px-6 py-24 text-carbon lg:px-20 lg:py-section"
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
