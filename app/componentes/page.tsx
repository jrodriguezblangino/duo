import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import FeatureCard from "@/components/ui/FeatureCard";
import StyleToggle from "@/components/ui/StyleToggle";
import ProjectForm from "@/components/ui/ProjectForm";

// Página interna de verificación de la librería de componentes (Fase 2).
// No está enlazada desde la navegación; se retirará al ensamblar las páginas en la Fase 3.
export const metadata: Metadata = {
  title: "Librería de componentes",
  robots: { index: false, follow: false },
};

const ICON_PROPS = {
  width: 32,
  height: 32,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ANATOMY_FEATURES = [
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

export default function ComponentesPage() {
  return (
    <>
      <Hero
        headline="Innovación que define espacios."
        subheadline="Revestimientos de alta gama que combinan la calidez de la madera con la resistencia del metal. Diseño arquitectónico simplificado para proyectos exigentes."
        cta={{
          label: "Solicitar Cotización y Plan de Proyecto",
          href: "/contacto",
        }}
        videoSrc="/assets/videos/hero_cinematic_scan.mp4"
      />

      <section
        aria-labelledby="botones-heading"
        className="mx-auto max-w-7xl px-5 py-24 lg:px-10"
      >
        <h2
          id="botones-heading"
          className="mb-10 font-headline text-3xl md:text-4xl"
        >
          Botones
        </h2>
        <div className="flex flex-wrap items-center gap-8">
          <Button variant="primary">Acción principal</Button>
          <Button variant="outline">Acción secundaria</Button>
          <Button variant="ghost" href="/tecnologia">
            Conocer la tecnología
          </Button>
        </div>
      </section>

      <section
        aria-labelledby="anatomia-heading"
        className="bg-slate/50 px-5 py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="anatomia-heading"
            className="mb-10 font-headline text-3xl md:text-4xl"
          >
            La ciencia detrás de la superficie.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ANATOMY_FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="estilos-heading"
        className="mx-auto max-w-7xl px-5 py-24 lg:px-10"
      >
        <h2
          id="estilos-heading"
          className="mb-10 font-headline text-3xl md:text-4xl"
        >
          Dos estéticas, una ingeniería superior.
        </h2>
        <StyleToggle />
      </section>

      <section
        aria-labelledby="formulario-heading"
        className="bg-slate/50 px-5 py-24 lg:px-10"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="formulario-heading"
            className="mb-10 font-headline text-3xl md:text-4xl"
          >
            Diseñamos tu proyecto con precisión.
          </h2>
          <ProjectForm />
        </div>
      </section>
    </>
  );
}
