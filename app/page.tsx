import Button from "@/components/ui/Button";
import { CTA } from "@/lib/site";

export default function HomePage() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-[70vh] items-center px-5 py-24 lg:px-10"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-8">
        <h1
          id="hero-heading"
          className="font-headline text-4xl leading-tight md:text-6xl"
        >
          Innovación que define espacios.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-offwhite/70 md:text-xl">
          Revestimientos de alta gama que combinan la calidez de la madera con
          la resistencia del metal. Diseño arquitectónico simplificado para
          proyectos exigentes.
        </p>
        <Button href={CTA.href} variant="primary" size="md">
          Solicitar Cotización y Plan de Proyecto
        </Button>
      </div>
    </section>
  );
}
