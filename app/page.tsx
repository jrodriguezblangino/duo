import Hero from "@/components/ui/Hero";
import AnatomySection from "@/components/sections/AnatomySection";
import TransformationSection from "@/components/sections/TransformationSection";
import StylesSection from "@/components/sections/StylesSection";
import ConversionSection from "@/components/sections/ConversionSection";
import { CTA } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Innovación que define espacios."
        subheadline="Revestimientos de alta gama que combinan la calidez de la madera con la resistencia del metal. Diseño arquitectónico simplificado para proyectos exigentes."
        cta={{
          label: "Solicitar Cotización y Plan de Proyecto",
          href: CTA.href,
        }}
        videoSrc="/assets/videos/hero_cinematic_scan.mp4"
      />
      <AnatomySection />
      <TransformationSection />
      <StylesSection />
      <ConversionSection />
    </>
  );
}
