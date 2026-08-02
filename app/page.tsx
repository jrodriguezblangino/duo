import Hero from "@/components/ui/Hero";
import ManifestoSection from "@/components/sections/ManifestoSection";
import WhyNowSection from "@/components/sections/WhyNowSection";
import AnatomySection from "@/components/sections/AnatomySection";
import TransformationSection from "@/components/sections/TransformationSection";
import StylesSection from "@/components/sections/StylesSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import ConversionSection from "@/components/sections/ConversionSection";
import { assetPath } from "@/lib/assetPath";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Revestimiento de ingeniería"
        headline="Metal Siding."
        headlineContinued="El revestimiento que se adapta a tu diseño."
        bridgeLine="Ingeniería de revestimiento para fachadas e interiores — múltiples terminaciones, una sola solución."
        videoSrc={assetPath("/assets/videos/hero_cinematic_scan.mp4")}
      />
      <ManifestoSection />
      <WhyNowSection />
      <AnatomySection />
      <TransformationSection />
      <StylesSection />
      <ComparisonSection />
      <GuaranteeSection />
      <ConversionSection />
    </>
  );
}
