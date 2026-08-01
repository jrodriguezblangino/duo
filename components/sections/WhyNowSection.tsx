import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";
import { STAGGER } from "@/lib/motion";

const CARDS = [
  {
    index: "01",
    title: "Mantenimiento casi nulo",
    description:
      "Sin barniz ni repintado periódico — la cara anodizada aguanta sol, lluvia y uso.",
  },
  {
    index: "02",
    title: "Instalación rápida sobre existente",
    description:
      "Se monta sobre muro o revestimiento previo; obra limpia en días, no semanas.",
  },
  {
    index: "03",
    title: "Durabilidad de décadas",
    description:
      "Núcleo de poliuretano y respaldo de acero: vida útil proyectada de 30+ años.",
  },
] as const;

export default function WhyNowSection() {
  return (
    <section
      aria-labelledby="por-que-ahora-heading"
      className="border-t border-offwhite/10 bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="mb-12 max-w-[28ch] lg:mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-sand lg:text-[13px]">
            Por qué ahora
          </p>
          <h2
            id="por-que-ahora-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-offwhite lg:text-6xl"
          >
            El revestimiento cambió.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {CARDS.map((card, i) => (
            <Reveal key={card.index} delay={STAGGER * (i + 1)}>
              <FeatureCard
                icon={
                  <span className="font-mono text-xs tracking-[0.08em] lg:text-[13px]">
                    {card.index}
                  </span>
                }
                title={card.title}
                description={card.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
