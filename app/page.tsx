import Hero from "@/components/ui/Hero";
import AnatomySection from "@/components/sections/AnatomySection";
import TransformationSection from "@/components/sections/TransformationSection";
import StylesSection from "@/components/sections/StylesSection";
import ConversionSection from "@/components/sections/ConversionSection";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Revestimiento madera-look de ingeniería"
        headline="Madera. Metal."
        bridgeLine="Aluminio anodizado, núcleo de poliuretano y respaldo de acero — tres capas, una superficie continua."
        videoSrc="/assets/videos/hero_cinematic_scan.mp4"
      />
      <AnatomySection />
      <TransformationSection />
      <StylesSection />
      <ConversionSection />
    </>
  );
}
