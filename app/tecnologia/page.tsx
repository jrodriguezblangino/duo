import type { Metadata } from "next";
import Image from "next/image";
import Magnetic from "@/components/ui/Magnetic";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { assetPath } from "@/lib/assetPath";
import { SPECS } from "@/lib/specs";
import { BRAND } from "@/lib/brand.config";
import { TECHO_LINES, MURO_LINES } from "@/lib/productLines";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Tecnología",
  description: `Tres capas: chapa de acero (calibre #25), núcleo PIR con retardo al fuego y acero galvanizado. Ficha técnica ${BRAND.name}.`,
};

const LAYERS = [
  {
    index: "01",
    role: "Cara vista",
    name: "Chapa de acero",
    description:
      "Calibre #25. La cara que se ve y resiste la intemperie — terminación metálica para exterior.",
  },
  {
    index: "02",
    role: "Núcleo",
    name: "Poliisocianurato (PIR)",
    description:
      "Aislamiento térmico y acústico, con retardo al fuego; la capa que une cara y respaldo.",
  },
  {
    index: "03",
    role: "Respaldo",
    name: "Acero galvanizado",
    description:
      "Rigidez estructural del sistema; estabilidad dimensional en el tiempo.",
  },
] as const;

const BIM_ITEMS = [
  ...TECHO_LINES.map((l) => ({ id: l.id, name: l.name, type: "Cubierta" })),
  ...MURO_LINES.map((l) => ({ id: l.id, name: l.name, type: "Muro" })),
];

/**
 * /tecnologia — aligned to docs/comps/duo-tecnologia/
 * Hero → Capas → Ficha → BIM → CTA
 */
export default function TecnologiaPage() {
  return (
    <>
      {/* 01 Hero */}
      <section
        aria-labelledby="tecnologia-heading"
        className="relative min-h-[70dvh] overflow-hidden bg-carbon text-offwhite lg:min-h-[85dvh]"
      >
        <Image
          src={assetPath("/assets/images/exploded_view_components.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/80 to-carbon/40"
        />
        <div className="relative z-10 flex min-h-[70dvh] items-end px-6 pb-16 pt-32 lg:min-h-[85dvh] lg:px-20 lg:pb-24">
          <Reveal className="max-w-[28ch]">
            <h1
              id="tecnologia-heading"
              className="font-headline text-[3rem] font-normal leading-[0.95] tracking-[-0.02em] text-offwhite lg:text-[5rem]"
            >
              Tecnología<span className="text-sand">.</span>
            </h1>
            <p className="mt-5 text-base text-offwhite/65 lg:text-lg">
              Tres capas. Un sistema.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 Capas */}
      <section
        aria-labelledby="capas-heading"
        className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
      >
        <div className="mx-auto max-w-site">
          <Reveal className="mb-12 max-w-[20ch]">
            <h2
              id="capas-heading"
              className="font-headline text-[2.25rem] font-normal tracking-[-0.02em] lg:text-[3rem]"
            >
              Detalle de capas.
            </h2>
          </Reveal>
          <ul className="border-t border-border">
            {LAYERS.map((layer, i) => (
              <li
                key={layer.index}
                className="grid gap-4 border-b border-border py-8 lg:grid-cols-12 lg:gap-10 lg:py-10"
              >
                <Reveal
                  delay={STAGGER * (i + 1)}
                  className="lg:col-span-2"
                >
                  <span className="font-mono text-xs text-sand">
                    {layer.index}
                  </span>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/40">
                    {layer.role}
                  </p>
                </Reveal>
                <Reveal delay={STAGGER * (i + 1)} className="lg:col-span-4">
                  <h3 className="font-headline text-2xl tracking-[-0.02em] lg:text-3xl">
                    {layer.name}
                  </h3>
                </Reveal>
                <Reveal delay={STAGGER * (i + 1)} className="lg:col-span-6">
                  <p className="max-w-[42ch] text-base leading-relaxed text-offwhite/60">
                    {layer.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 Ficha */}
      <section
        aria-labelledby="ficha-heading"
        className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
      >
        <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2
              id="ficha-heading"
              className="font-headline text-[2.25rem] font-normal tracking-[-0.02em] lg:text-[3rem]"
            >
              Ficha técnica.
            </h2>
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-offwhite/55">
              Datos verificados del sistema. Sin inventar espesores ni
              clasificaciones fuera de ficha de lote.
            </p>
          </Reveal>
          <Reveal delay={STAGGER} className="lg:col-span-8">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Especificaciones técnicas del panel {BRAND.name}
              </caption>
              <tbody>
                {SPECS.map(({ label, value }, i) => (
                  <tr
                    key={label}
                    className={i > 0 ? "border-t border-border" : ""}
                  >
                    <th
                      scope="row"
                      className="w-[36%] py-5 pr-6 align-top font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-offwhite/45"
                    >
                      {label}
                    </th>
                    <td className="py-5 text-base leading-relaxed text-offwhite/80">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* 04 BIM */}
      <section
        aria-labelledby="tec-bim-heading"
        className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
      >
        <div className="mx-auto max-w-site">
          <Reveal className="mb-10 max-w-[24ch]">
            <h2
              id="tec-bim-heading"
              className="font-headline text-[2.25rem] font-normal tracking-[-0.02em] lg:text-[3rem]"
            >
              Biblioteca <span className="text-sand">BIM</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <ul className="border border-border bg-slate/40">
              {BIM_ITEMS.map((item, i) => (
                <li
                  key={item.id}
                  className={`flex items-center justify-between gap-4 px-5 py-5 lg:px-8 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div>
                    <p className="font-headline text-lg text-offwhite lg:text-xl">
                      {item.name}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-offwhite/40">
                      {item.type}
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hola, quiero la familia BIM de ${item.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-sand hover:text-sand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
                  >
                    Pedir →
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={STAGGER * 2} className="mt-8">
            <Button href="/contacto" variant="outline" size="md">
              Solicitar una familia
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 05 CTA */}
      <section
        aria-labelledby="tec-cta-heading"
        className="bg-carbon px-6 py-section-mobile text-center text-offwhite lg:px-20 lg:py-section"
      >
        <Reveal className="mx-auto max-w-[36ch]">
          <h2
            id="tec-cta-heading"
            className="font-headline text-[2.25rem] font-normal tracking-[-0.02em] lg:text-[3rem]"
          >
            Hablemos de tu especificación.
          </h2>
          <div className="mt-10 flex justify-center">
            <Magnetic strength={12}>
              <WhatsAppCTA size="md" className="active:scale-[0.98]" />
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
