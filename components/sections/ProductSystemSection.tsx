import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { assetPath } from "@/lib/assetPath";
import { STAGGER } from "@/lib/motion";

const PANEL_IMAGE = assetPath("/assets/images/macro_zoom_quality.webp");

/**
 * Sistema Paneles PIR — macro product proof (comp 02).
 * Layout: left visual / right caption. No eyebrow.
 */
export default function ProductSystemSection() {
  return (
    <section
      aria-labelledby="paneles-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto grid max-w-site items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-slate lg:col-span-7 lg:aspect-[5/4]">
          <Image
            src={PANEL_IMAGE}
            alt="Detalle macro de panel aislante PIR: chapa de acero y núcleo"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
            priority={false}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/50 via-transparent to-transparent"
          />
        </Reveal>

        <div className="lg:col-span-5">
          <Reveal delay={STAGGER}>
            <h2
              id="paneles-heading"
              className="font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-[3.25rem]"
            >
              Panel aislante PIR.
            </h2>
          </Reveal>
          <Reveal delay={STAGGER * 2}>
            <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-offwhite/65 lg:text-[17px]">
              Núcleo de poliisocianurato con retardo al fuego, cara de chapa de
              acero calibre #25 y respaldo galvanizado. Aislación térmica y
              acústica, velocidad de obra y durabilidad en un solo sistema.
            </p>
          </Reveal>
          <Reveal delay={STAGGER * 3}>
            <ul className="mt-10 space-y-4 border-t border-border pt-8">
              {[
                "Aislación térmica superior",
                "Aislación acústica",
                "Velocidad de obra",
                "Retardo al fuego (PIR)",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.12em] text-offwhite/70 lg:text-[13px]"
                >
                  <span aria-hidden="true" className="text-sand">
                    /
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
