import FaqAccordion from "@/components/sections/FaqAccordion";
import { buildFaqPageJsonLd } from "@/lib/faq";

/**
 * Server wrapper: FAQPage JSON-LD in the HTML source + client accordion.
 * Do not move the script into a client component — it must SSR.
 */
export default function FaqSection() {
  const jsonLd = buildFaqPageJsonLd();

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-offwhite px-6 py-section-mobile text-carbon lg:px-20 lg:py-section"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FaqAccordion />
    </section>
  );
}
