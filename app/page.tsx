import Hero from "@/components/ui/Hero";
import ManifestoSection from "@/components/sections/ManifestoSection";
import AnatomySection from "@/components/sections/AnatomySection";
import TransformationSection from "@/components/sections/TransformationSection";
import StylesSection from "@/components/sections/StylesSection";
import ConversionSection from "@/components/sections/ConversionSection";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Revestimiento de ingeniería"
        headline="Metal Sliding."
        headlineContinued="El revestimiento que se adapta a tu diseño."
        bridgeLine="Ingeniería de revestimiento para fachadas e interiores — múltiples terminaciones, una sola solución."
        videoSrc="/assets/videos/hero_cinematic_scan.mp4"
      />
      <ManifestoSection />
      <AnatomySection />
      <TransformationSection />
      <StylesSection />
      <ConversionSection />
    </>
  );
}
