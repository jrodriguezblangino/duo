import Hero from "@/components/ui/Hero";
import StatsBand from "@/components/sections/StatsBand";
import ManifestoSection from "@/components/sections/ManifestoSection";
import WhyNowSection from "@/components/sections/WhyNowSection";
import AnatomySection from "@/components/sections/AnatomySection";
import TransformationSection from "@/components/sections/TransformationSection";
import StylesSection from "@/components/sections/StylesSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import FaqSection from "@/components/sections/FaqSection";
import ConversionSection from "@/components/sections/ConversionSection";
import { assetPath } from "@/lib/assetPath";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="dúoPANELES"
        headline="Un sistema constructivo superior."
        headlineContinued="Panel aislante PIR para techo y fachada."
        bridgeLine="La solución sustentable que garantiza ahorro de energía, velocidad de obra, durabilidad y seguridad — partner oficial Arneg."
        videoSrc={assetPath("/assets/videos/duo.mp4")}
      />
      <StatsBand />
      <ManifestoSection />
      <WhyNowSection />
      <AnatomySection />
      <TransformationSection />
      <StylesSection />
      <ComparisonSection />
      <GuaranteeSection />
      <ProjectsSection />
      <FaqSection />
      <ConversionSection />
    </>
  );
}
