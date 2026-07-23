import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Diseñamos tu proyecto con precisión. Solicita una cotización y un plan a medida para tu espacio.",
};

export default function ContactoPage() {
  return (
    <section
      aria-labelledby="contacto-heading"
      className="px-5 py-24 lg:px-10"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <h1
          id="contacto-heading"
          className="font-headline text-4xl leading-tight md:text-5xl"
        >
          Diseñamos tu proyecto con precisión.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-offwhite/70">
          Cuéntanos sobre tu espacio y nuestro equipo te preparará una
          cotización y un plan de proyecto a medida, con la cantidad exacta de
          paneles para tus dimensiones.
        </p>
      </div>
    </section>
  );
}
