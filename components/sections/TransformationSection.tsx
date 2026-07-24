import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const BENEFITS = [
  {
    title: "Sobre muro existente",
    description:
      "Instalación directa sobre la superficie actual — sin demolición previa.",
  },
  {
    title: "Encastre oculto",
    description:
      "Junta mecánica sin tornillos a la vista; tiempos de obra reducidos.",
  },
  {
    title: "Obra limpia",
    description:
      "Sin escombros ni polvo estructural; el espacio sigue en uso.",
  },
];

export default function TransformationSection() {
  return (
    <section
      aria-labelledby="transformacion-heading"
      className="bg-offwhite px-6 py-24 text-carbon lg:px-20 lg:py-section"
    >
      <div className="mx-auto grid max-w-site items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-carbon/60 lg:text-[13px]">
            Instalación
          </p>
          <h2
            id="transformacion-heading"
            className="mb-6 font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-carbon lg:text-6xl"
          >
            Renovación sin obra pesada.
          </h2>
          <p className="mb-10 max-w-measure text-base leading-[1.65] text-carbon/70 lg:text-[17px]">
            El panel se monta sobre lo existente. El proceso es de ensamble,
            no de demolición.
          </p>
          <ul className="flex flex-col gap-6">
            {BENEFITS.map(({ title, description }) => (
              <li key={title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-2 h-px w-8 shrink-0 bg-sand"
                />
                <div>
                  <h3 className="mb-1 text-base font-medium text-carbon">
                    {title}
                  </h3>
                  <p className="max-w-measure text-sm leading-relaxed text-carbon/60">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="flex flex-col gap-8 lg:col-span-7">
          <Reveal delay={0.08}>
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
                src="/assets/videos/motion_disassembly_components.mp4"
                type="video/mp4"
              />
            </video>
            <p className="mt-4 font-mono text-xs tracking-[0.02em] text-carbon/45 lg:text-[13px]">
              Desmontaje de capas — ensamble mecánico
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-carbon/5">
              <Image
                src="/assets/images/durability_water_drops_still.png"
                alt="Gotas de agua sobre la cara anodizada del panel"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 font-mono text-xs tracking-[0.02em] text-carbon/45 lg:text-[13px]">
              Cara anodizada — rechazo de agua
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
