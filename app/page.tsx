import Link from "next/link";
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
        <Link
          href={CTA.href}
          className="inline-flex items-center justify-center rounded-sm bg-sand px-8 py-4 text-sm font-medium uppercase tracking-widest text-carbon transition-colors hover:bg-offwhite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
        >
          Solicitar Cotización y Plan de Proyecto
        </Link>
      </div>
    </section>
  );
}
