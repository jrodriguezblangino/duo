import Hero from "@/components/ui/Hero";
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
        headlineContinued={
          <>
            <span className="md:hidden">
              El revestimiento que se
              <br />
              adapta a tu diseño.
            </span>
            <span className="hidden md:inline lg:hidden">
              El revestimiento que se adapta
              <br />
              a tu diseño.
            </span>
            <span className="hidden whitespace-nowrap lg:inline">
              El revestimiento que se adapta a tu diseño.
            </span>
          </>
        }
        bridgeLine="Ingeniería de revestimiento para fachadas e interiores — múltiples terminaciones, una sola solución."
        videoSrc="/assets/videos/hero_cinematic_scan.mp4"
      />
      <AnatomySection />
      <TransformationSection />
      <StylesSection />
      <ConversionSection />
    </>
  );
}
