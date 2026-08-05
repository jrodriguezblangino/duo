import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { BRAND } from "@/lib/brand.config";
import { TECHO_LINES, MURO_LINES } from "@/lib/productLines";
import { STAGGER } from "@/lib/motion";

const BIM_ITEMS = [
  ...TECHO_LINES.slice(0, 3).map((line) => ({
    id: line.id,
    name: line.name,
    type: "Cubierta",
  })),
  ...MURO_LINES.map((line) => ({
    id: line.id,
    name: line.name,
    type: "Muro",
  })),
];

const REVIT_YEARS = ["2020", "2021", "2022", "2023", "2024", "2025"] as const;

/**
 * Biblioteca BIM — library-widget density (comp 06).
 * No invented thicknesses or file sizes.
 */
export default function BimSection() {
  return (
    <section
      aria-labelledby="bim-heading"
      className="relative isolate overflow-hidden bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #90EE90 1px, transparent 1px), linear-gradient(to bottom, #90EE90 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-site items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2
              id="bim-heading"
              className="font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-[3.5rem]"
            >
              Biblioteca{" "}
              <span className="text-sand">BIM</span>
            </h2>
            <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-offwhite/60 lg:text-[17px]">
              Familias para modelar el sistema desde el proyecto. Pedilas por
              WhatsApp o desde Tecnología.
            </p>
          </Reveal>
          <Reveal delay={STAGGER} className="mt-8 flex flex-wrap gap-6">
            {["Familias paramétricas", "Información confiable", "Descarga"].map(
              (label) => (
                <span
                  key={label}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/45"
                >
                  <span className="mr-2 text-sand">+</span>
                  {label}
                </span>
              ),
            )}
          </Reveal>
        </div>

        <Reveal delay={STAGGER} className="lg:col-span-7">
          <div className="border border-border bg-slate/60">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 lg:px-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-sand">
                Biblioteca BIM
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-offwhite/40">
                {BRAND.name}
              </p>
            </div>

            <ul>
              {BIM_ITEMS.map((item, i) => (
                <li
                  key={item.id}
                  className={`flex items-center justify-between gap-4 px-5 py-4 lg:px-6 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div>
                    <p className="font-headline text-lg tracking-[-0.01em] text-offwhite">
                      {item.name}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-offwhite/40">
                      {item.type}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-sand">
                    Solicitar →
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-5 py-5 lg:px-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/40">
                Versiones Revit compatibles
              </p>
              <p className="mt-2 font-mono text-xs tracking-[0.08em] text-offwhite/70">
                {REVIT_YEARS.join(" · ")}
              </p>
              <div className="mt-5">
                <Button href="/tecnologia" variant="outline" size="sm">
                  Ver tecnología
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
