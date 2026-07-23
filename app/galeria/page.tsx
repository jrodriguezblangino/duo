import type { Metadata } from "next";
import GalleryGrid from "@/components/ui/GalleryGrid";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Texturas, acabados y comportamiento del panel Fill Home en detalle: aspecto madera, metálico negro y resistencia al agua.",
};

export default function GaleriaPage() {
  return (
    <section aria-labelledby="galeria-heading" className="px-5 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h1
          id="galeria-heading"
          className="mb-6 font-headline text-4xl leading-tight md:text-5xl"
        >
          El material, en detalle.
        </h1>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-offwhite/70">
          Texturas, acabados y rendimiento real. Explora el panel Fill Home de
          cerca y descubre por qué la calidad se percibe a primera vista.
        </p>
        <GalleryGrid />
      </div>
    </section>
  );
}
