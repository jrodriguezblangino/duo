import type { Metadata } from "next";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand.config";

export const metadata: Metadata = {
  title: "Galería",
  description: `Macro de textura, acabados aspecto madera y metálico, y comportamiento al agua del panel ${BRAND.name}.`,
};

export default function GaleriaPage() {
  return (
    <section
      aria-labelledby="galeria-heading"
      className="bg-carbon px-6 pb-24 pt-28 lg:px-20 lg:pb-section lg:pt-40"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="mb-12 max-w-measure lg:mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/60 lg:text-[13px]">
            Galería
          </p>
          <h1
            id="galeria-heading"
            className="mb-6 font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-6xl"
          >
            De la obra al detalle.
          </h1>
          <p className="max-w-measure text-base leading-[1.65] text-offwhite/70 lg:text-[17px]">
            Comparativas de fachada y el panel de cerca — textura, junta
            oculta y rechazo de agua.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <GalleryGrid />
        </Reveal>
      </div>
    </section>
  );
}
