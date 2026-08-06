import FaqAccordion from "@/components/sections/FaqAccordion";
import { buildFaqPageJsonLd, HOME_FAQ } from "@/lib/faq";

export default function FaqSection() {
  const jsonLd = buildFaqPageJsonLd(HOME_FAQ);

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
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
