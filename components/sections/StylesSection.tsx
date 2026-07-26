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
          {/*
            Text shares the slider's width. Extra right padding offsets the
            left-weighted panel mass in the crop (black void on the right)
            so title/caption optically center on the visible product, not the
            empty frame edge — crop itself stays untouched.
          */}
          <Reveal className="mb-10 w-full text-center lg:mb-12 lg:pr-[12%]">
            <p className="mb-4 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-sand lg:text-[13px]">
              <span
                aria-hidden="true"
                className="h-px w-4 shrink-0 bg-sand"
              />
              Colección — aspecto madera / metálico
            </p>
            <h2
              id="estilos-heading"
              className="mb-6 scroll-mt-32 font-headline text-[2.95rem] font-normal leading-[0.98] tracking-[-0.02em] text-offwhite lg:scroll-mt-44 lg:text-[3.5rem] xl:text-[4.25rem]"
            >
              Un panel, dos acabados.
            </h2>
            <p className="mx-auto max-w-[58ch] text-base leading-[1.6] text-muted lg:text-[17px]">
              Misma estructura de tres capas. La cara cambia; el núcleo y el
              acero no.
            </p>
          </Reveal>

          {/* Not wrapped in Reveal — opacity:0 + transform broke invite pulse / IO on iOS */}
          <StyleToggle />
        </div>
      </div>
    </section>
  );
}
