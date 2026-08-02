import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { CTA } from "@/lib/site";

const YEARS = 15;

const ITEMS = [
  { label: "Cubierto", detail: "Estructura del panel" },
  { label: "Cubierto", detail: "Acabado de cara" },
  { label: "Excluido", detail: "Daño mecánico" },
] as const;

export default function GuaranteeSection() {
  return (
    <section
      aria-labelledby="garantia-heading"
      className="bg-offwhite px-6 py-section-mobile text-carbon lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="max-w-[28ch]">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-carbon/60 lg:text-[13px]">
            Garantía
          </p>
          <h2
            id="garantia-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-carbon lg:text-6xl"
          >
            {YEARS} años de garantía.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 lg:mt-12">
          <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
            {ITEMS.map((item) => (
              <li
                key={`${item.label}-${item.detail}`}
                className="font-mono text-xs tracking-[0.02em] text-carbon/70 lg:text-[13px]"
              >
                <span className="text-carbon/45">{item.label}</span>
                <span aria-hidden="true" className="mx-2 text-carbon/25">
                  —
                </span>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 lg:mt-12">
          <Button href={CTA.href} variant="primary">
            {CTA.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
