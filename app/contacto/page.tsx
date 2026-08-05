import type { Metadata } from "next";
import ProjectForm from "@/components/ui/ProjectForm";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description:
  "Solicitá cotización: tipo de proyecto, acabado metálico y superficie aproximada.",
};

export default function ContactoPage() {
  return (
    <section
      aria-labelledby="contacto-heading"
      className="bg-offwhite px-6 pb-24 pt-28 text-carbon lg:px-20 lg:pb-section lg:pt-40"
    >
      <div className="mx-auto flex max-w-[640px] flex-col gap-6">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-carbon/60 lg:text-[13px]">
            Solicitud de cotización
          </p>
          <h1
            id="contacto-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-carbon lg:text-6xl"
          >
            Planificá el proyecto.
          </h1>
          <p className="mt-6 max-w-measure text-base leading-[1.65] text-carbon/70 lg:text-[17px]">
            Tipo de obra, dirección de material y datos de contacto. Sin
            formularios genéricos: tres pasos de consulta.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-6">
          <ProjectForm />
        </Reveal>
      </div>
    </section>
  );
}
