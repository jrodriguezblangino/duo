import StyleToggle from "@/components/ui/StyleToggle";
import Reveal from "@/components/ui/Reveal";

export default function StylesSection() {
  return (
    <section
      aria-labelledby="estilos-heading"
      className="bg-slate/50 px-5 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2
            id="estilos-heading"
            className="mb-6 font-headline text-3xl md:text-4xl"
          >
            Dos estéticas, una ingeniería superior.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-offwhite/70">
            Elige la expresión de tu proyecto: la calidez del aspecto madera o
            la presencia del metálico negro. La misma tecnología en ambos
            acabados.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <StyleToggle />
        </Reveal>
      </div>
    </section>
  );
}
