import ProjectForm from "@/components/ui/ProjectForm";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import { BRAND } from "@/lib/brand.config";

/**
 * Contacto / conversion (comp 11) — WA primary + form.
 */
export default function ConversionSection() {
  return (
    <section
      aria-labelledby="conversion-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-[640px] text-center">
        <Reveal>
          <h2
            id="conversion-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-6xl"
          >
            Hablemos de tu proyecto.
          </h2>
          <p className="mx-auto mt-5 max-w-[40ch] text-base leading-[1.65] text-offwhite/65 lg:text-[17px]">
            {BRAND.email} · {BRAND.phoneDisplay}
          </p>
          <div className="mt-8 flex justify-center">
            <Magnetic strength={12}>
              <WhatsAppCTA size="md" className="active:scale-[0.98]" />
            </Magnetic>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-offwhite/40">
            Instagram @duopaneles
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 text-left">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.14em] text-offwhite/45">
            O dejá los datos del proyecto
          </p>
          <ProjectForm tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
