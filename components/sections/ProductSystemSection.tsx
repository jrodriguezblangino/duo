import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { assetPath } from "@/lib/assetPath";
import { STAGGER } from "@/lib/motion";

const PANEL_IMAGE = assetPath("/assets/images/macro_zoom_quality.webp");

/**
 * Sistema Paneles PIR — edge-to-edge split (comp 02).
 */
export default function ProductSystemSection() {
  return (
    <section
      aria-labelledby="paneles-heading"
      className="bg-carbon text-offwhite"
    >
      <div className="mx-auto grid max-w-site lg:grid-cols-12">
        <div className="relative min-h-[360px] lg:col-span-7 lg:min-h-[560px]">
          <Image
            src={PANEL_IMAGE}
            alt="Detalle macro de panel aislante PIR: chapa de acero y núcleo"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>

        <div className="relative flex flex-col justify-center border-t border-border px-6 py-14 lg:col-span-5 lg:border-l lg:border-t-0 lg:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #90EE90 1px, transparent 1px), linear-gradient(to bottom, #90EE90 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <Reveal className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/45">
              Sistema Paneles PIR
            </p>
            <h2
              id="paneles-heading"
              className="mt-6 font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-[3.25rem]"
            >
              Panel aislante{" "}
              <span className="text-sand">PIR</span>
            </h2>
            <div
              aria-hidden="true"
              className="mt-5 h-px w-16 bg-sand"
            />
            <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-offwhite/65 lg:text-[17px]">
              Aislamiento térmico y acústico de alto desempeño que optimiza la
              eficiencia energética y el confort en cada proyecto.
            </p>
          </Reveal>

          <Reveal delay={STAGGER} className="relative mt-10 border-t border-border pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-sand">
              Construcción limpia y rápida
            </p>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-offwhite/55">
              Sistemas prefabricados que reducen tiempos de montaje en obra, con
              acabado metálico superior. Núcleo PIR, chapa acero #25, respaldo
              galvanizado.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
