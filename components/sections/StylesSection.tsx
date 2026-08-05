import StyleToggle from "@/components/ui/StyleToggle";
import Reveal from "@/components/ui/Reveal";

/**
 * Shared composition width: text column (max-w-4xl ≈ 896px) + modest
 * ~48px bleed per side → 62rem (992px). One centered stack.
 */
const COMPOSITION = "mx-auto w-full max-w-[62rem]";

export default function StylesSection() {
  return (
    <section
      aria-labelledby="estilos-heading"
      className="bg-slate px-6 pt-24 pb-40 lg:px-20 lg:pt-section lg:pb-[240px]"
    >
      <div className="mx-auto max-w-site">
        <div className={COMPOSITION}>
          <Reveal className="mb-10 w-full text-center lg:mb-12 lg:pr-[12%]">
            <h2
              id="estilos-heading"
              className="mb-6 scroll-mt-32 font-headline text-[2.95rem] font-normal leading-[0.98] tracking-[-0.02em] text-offwhite lg:scroll-mt-44 lg:text-[3.5rem] xl:text-[4.25rem]"
            >
              Acabados metálicos.
            </h2>
            <p className="mx-auto max-w-[58ch] text-base leading-[1.6] text-muted lg:text-[17px]">
              Misma estructura de tres capas. La cara cambia de tono; el núcleo
              PIR y el acero no.
            </p>
          </Reveal>

          <StyleToggle />
        </div>
      </div>
    </section>
  );
}
