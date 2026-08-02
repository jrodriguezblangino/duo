import ProjectForm from "@/components/ui/ProjectForm";
import Reveal from "@/components/ui/Reveal";

export default function ConversionSection() {
  return (
    <section
      aria-labelledby="conversion-heading"
      className="bg-slate px-6 py-24 text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-[640px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-sand lg:text-[13px]">
            Solicitud de cotización
          </p>
          <h2
            id="conversion-heading"
            className="mb-6 font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-6xl"
          >
            Planificá el proyecto.
          </h2>
          <p className="mb-12 max-w-measure text-base leading-[1.65] text-offwhite/70 lg:text-[17px]">
            Tres pasos: tipo de obra, dirección de material y datos de
            contacto. Respondemos con cotización y cantidad de paneles.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ProjectForm tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
