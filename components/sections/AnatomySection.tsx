import Image from "next/image";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";

const ICON_PROPS = {
  width: 32,
  height: 32,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const FEATURES = [
  {
    title: "Frente de Acero",
    description:
      "Acero galvanizado resistente a la intemperie que protege la superficie año tras año.",
    icon: (
      <svg {...ICON_PROPS} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
      </svg>
    ),
  },
  {
    title: "Núcleo de Poliuretano",
    description:
      "Poliuretano de alta densidad que aporta aislamiento térmico y acústico a cada panel.",
    icon: (
      <svg {...ICON_PROPS} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 17l9 5 9-5" />
      </svg>
    ),
  },
  {
    title: "Barrera de Aluminio",
    description:
      "Capa de aluminio que garantiza la integridad estructural y la estabilidad del sistema.",
    icon: (
      <svg {...ICON_PROPS} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
      </svg>
    ),
  },
  {
    title: "Ensamble Oculto",
    description:
      "Sistema de encastre invisible que logra superficies continuas, sin tornillos a la vista.",
    icon: (
      <svg {...ICON_PROPS} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 12a3 3 0 013-3h6a3 3 0 010 6h-3" />
        <path d="M15 12a3 3 0 01-3 3H6a3 3 0 010-6h3" />
      </svg>
    ),
  },
];

export default function AnatomySection() {
  return (
    <section
      aria-labelledby="anatomia-heading"
      className="bg-slate/50 px-5 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2
            id="anatomia-heading"
            className="mb-6 font-headline text-3xl md:text-4xl"
          >
            La ciencia detrás de la superficie.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-offwhite/70">
            Cada panel es un sistema de ingeniería de tres capas, diseñado para
            durar y pensado para verse impecable.
          </p>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
              <Image
                src="/assets/images/exploded_view_components.png"
                alt="Vista explotada del panel: frente de acero, núcleo de poliuretano y barrera de aluminio"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {FEATURES.map((feature, index) => (
              <Reveal key={feature.title} delay={0.08 * index}>
                <FeatureCard {...feature} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
