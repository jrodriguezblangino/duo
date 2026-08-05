import Hero from "@/components/ui/Hero";
import ProductSystemSection from "@/components/sections/ProductSystemSection";
import ProductLinesSection from "@/components/sections/ProductLinesSection";
import ApplicationsSection from "@/components/sections/ApplicationsSection";
import AnatomySection from "@/components/sections/AnatomySection";
import BimSection from "@/components/sections/BimSection";
import StatsBand from "@/components/sections/StatsBand";
import BrandValuesSection from "@/components/sections/BrandValuesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import FaqSection from "@/components/sections/FaqSection";
import ConversionSection from "@/components/sections/ConversionSection";
import { assetPath } from "@/lib/assetPath";

/**
 * Home IA — dúoPANELES (reconversión total).
 * Comps: docs/comps/duo-home/
 */
export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="dúoPANELES"
        headline="Un sistema constructivo superior."
        headlineContinued="Panel aislante PIR para techo y fachada."
        bridgeLine="Ahorro energético, velocidad de obra y durabilidad. Partner oficial Arneg."
        videoSrc={assetPath("/assets/videos/duo.mp4")}
      />
      <ProductSystemSection />
      <ProductLinesSection />
      <ApplicationsSection />
      <AnatomySection />
      <BimSection />
      <StatsBand />
      <BrandValuesSection />
      <ProjectsSection />
      <FaqSection />
      <ConversionSection />
    </>
  );
}
