import Magnetic from "@/components/ui/Magnetic";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand.config";
import { assetPath } from "@/lib/assetPath";

/**
 * Home close — WA-first cinematic CTA (comp 11). Form lives on /contacto.
 */
export default function ConversionSection() {
  return (
    <section
      aria-labelledby="conversion-heading"
      className="relative isolate overflow-hidden bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{
          backgroundImage: `url(${assetPath("/assets/images/detail_internal_45deg_alt_metal.webp")})`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/85 to-carbon/70"
      />

      <div className="relative mx-auto max-w-[40rem] text-center">
        <Reveal>
          <h2
            id="conversion-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-offwhite lg:text-6xl"
          >
            Hablemos de tu proyecto.
          </h2>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-offwhite/60 lg:text-xs">
            <a
              href={`mailto:${BRAND.email}`}
              className="hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              {BRAND.email}
            </a>
            <span aria-hidden="true" className="text-offwhite/30">
              |
            </span>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${BRAND.whatsappMessage}`}
              className="hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
              target="_blank"
              rel="noopener noreferrer"
            >
              {BRAND.phoneDisplay}
            </a>
          </p>
          <div className="mt-10 flex justify-center">
            <Magnetic strength={12}>
              <WhatsAppCTA size="md" className="active:scale-[0.98]" />
            </Magnetic>
          </div>
          <a
            href="https://instagram.com/duopaneles"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-offwhite/50 underline underline-offset-4 hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          >
            Instagram @duopaneles
          </a>
        </Reveal>
      </div>
    </section>
  );
}
