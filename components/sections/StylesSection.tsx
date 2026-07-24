import StyleToggle from "@/components/ui/StyleToggle";
import Reveal from "@/components/ui/Reveal";

export default function StylesSection() {
  return (
    <section
      aria-labelledby="estilos-heading"
      className="bg-slate px-6 py-24 lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="mb-12 max-w-measure lg:mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
            Colección — aspecto madera / metálico
          </p>
          <h2
            id="estilos-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-6xl"
          >
            Un panel, dos acabados.
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-offwhite/70 lg:text-[17px]">
            Misma estructura de tres capas. La cara cambia; el núcleo y el
            acero no.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <StyleToggle />
        </Reveal>
      </div>
    </section>
  );
}
