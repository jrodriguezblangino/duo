import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { CTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tecnología",
  description:
    "La ciencia detrás de la superficie: acero galvanizado, núcleo de poliuretano de alta densidad y barrera de aluminio. Especificaciones técnicas completas.",
};

const LAYERS = [
  {
    name: "Frente de acero galvanizado",
    role: "Durabilidad",
    description:
      "La cara exterior del panel es acero galvanizado resistente a la intemperie. Protege contra impactos, humedad y radiación UV, manteniendo el acabado intacto durante años.",
  },
  {
    name: "Núcleo de poliuretano de alta densidad",
    role: "Aislamiento",
    description:
      "El corazón del panel aporta aislamiento térmico y acústico. Reduce la transferencia de calor y el ruido, mejorando el confort del espacio de forma inmediata.",
  },
  {
    name: "Barrera de aluminio",
    role: "Integridad",
    description:
      "La capa posterior de aluminio sella el sistema y garantiza la integridad estructural del conjunto, evitando deformaciones a lo largo del tiempo.",
  },
];

const SPECS = [
  { label: "Dimensiones del panel", value: "3 m de largo × 40 cm de ancho" },
  { label: "Cobertura", value: "1,5 m² por panel" },
  { label: "Frente", value: "Acero galvanizado resistente a la intemperie" },
  {
    label: "Núcleo",
    value: "Poliuretano de alta densidad (aislamiento térmico y acústico)",
  },
  { label: "Barrera posterior", value: "Aluminio (integridad estructural)" },
  {
    label: "Instalación",
    value: "Sistema de encastre oculto, apto sobre paredes existentes",
  },
  { label: "Mantenimiento", value: "Lavable con agua y un paño suave" },
  { label: "Estilos disponibles", value: "Aspecto Madera / Metálico Negro" },
];

export default function TecnologiaPage() {
  return (
    <>
      <section
        aria-labelledby="tecnologia-heading"
        className="px-5 pb-16 pt-24 lg:px-10"
      >
        <Reveal className="mx-auto flex max-w-4xl flex-col gap-6">
          <h1
            id="tecnologia-heading"
            className="font-headline text-4xl leading-tight md:text-5xl"
          >
            La ciencia detrás de la superficie.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-offwhite/70">
            Tres capas de ingeniería trabajan en conjunto para lograr un
            revestimiento que combina estética arquitectónica con rendimiento
            estructural real.
          </p>
        </Reveal>
      </section>

      <section
        aria-labelledby="composicion-heading"
        className="bg-slate/50 px-5 py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2
              id="composicion-heading"
              className="mb-12 font-headline text-3xl md:text-4xl"
            >
              Composición de tres capas.
            </h2>
          </Reveal>

          <div className="mb-12 grid gap-6 lg:grid-cols-3">
            {LAYERS.map(({ name, role, description }, index) => (
              <Reveal key={name} delay={0.08 * index}>
                <article className="flex h-full flex-col gap-3 rounded-sm border border-offwhite/10 bg-carbon p-8">
                  <p className="text-xs uppercase tracking-widest text-sand">
                    {role}
                  </p>
                  <h3 className="font-headline text-xl text-offwhite">{name}</h3>
                  <p className="text-sm leading-relaxed text-offwhite/60">
                    {description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <figure className="flex flex-col gap-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-sm">
                  <Image
                    src="/assets/images/detail_internal_45deg_alt.png"
                    alt="Estructura interna del panel vista a 45 grados: capas de acero, poliuretano y aluminio"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-sm text-offwhite/50">
                  Estructura interna del panel a 45°.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.12}>
              <figure className="flex flex-col gap-3">
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
                  <source
                    src="/assets/videos/motion_thermal_capacity.mp4"
                    type="video/mp4"
                  />
                </video>
                <figcaption className="text-sm text-offwhite/50">
                  Capacidad térmica del núcleo de poliuretano.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="ficha-heading"
        className="px-5 py-24 lg:px-10"
      >
        <Reveal className="mx-auto max-w-4xl">
          <h2
            id="ficha-heading"
            className="mb-12 font-headline text-3xl md:text-4xl"
          >
            Ficha técnica.
          </h2>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Especificaciones técnicas del panel Fill Home
            </caption>
            <tbody>
              {SPECS.map(({ label, value }) => (
                <tr
                  key={label}
                  className="border-b border-offwhite/10 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="w-1/3 py-5 pr-6 align-top text-sm font-medium uppercase tracking-widest text-sand"
                  >
                    {label}
                  </th>
                  <td className="py-5 text-base leading-relaxed text-offwhite/80">
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
