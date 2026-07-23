import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tecnología",
  description:
    "La ciencia detrás de la superficie: acero galvanizado, núcleo de poliuretano de alta densidad y barrera de aluminio.",
};

export default function TecnologiaPage() {
  return (
    <section
      aria-labelledby="tecnologia-heading"
      className="px-5 py-24 lg:px-10"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <h1
          id="tecnologia-heading"
          className="font-headline text-4xl leading-tight md:text-5xl"
        >
          La ciencia detrás de la superficie.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-offwhite/70">
          Cada panel integra tres capas de ingeniería: un frente de acero
          galvanizado resistente a la intemperie, un núcleo de poliuretano de
          alta densidad con aislamiento térmico y acústico, y una barrera de
          aluminio que garantiza la integridad estructural.
        </p>
      </div>
    </section>
  );
}
