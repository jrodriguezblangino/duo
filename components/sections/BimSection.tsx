import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { STAGGER } from "@/lib/motion";

const BIM_ROWS = [
  { id: "revit", label: "Familias Revit", meta: "Paneles techo y muro" },
  { id: "fichas", label: "Fichas técnicas", meta: "Espesores y prestaciones" },
  { id: "detalles", label: "Detalles constructivos", meta: "Encastres y encuentros" },
] as const;

/**
 * Biblioteca BIM — technical panel (comp 06).
 * Deep content lives on /tecnologia; this is the home hook.
 */
export default function BimSection() {
  return (
    <section
      aria-labelledby="bim-heading"
      className="relative isolate overflow-hidden bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #90EE90 1px, transparent 1px), linear-gradient(to bottom, #90EE90 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-site items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2
              id="bim-heading"
              className="font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-[3.5rem]"
            >
              Biblioteca BIM.
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-offwhite/60 lg:text-[17px]">
              Familias y fichas para que arquitectos e ingenieros modelen el
              sistema desde el proyecto, no desde la improvisación en obra.
            </p>
          </Reveal>
          <Reveal delay={STAGGER * 2} className="mt-8">
            <Button href="/tecnologia" variant="outline" size="md">
              Ver tecnología
            </Button>
          </Reveal>
        </div>

        <Reveal delay={STAGGER} className="lg:col-span-7">
          <ul className="border border-border bg-slate/50">
            {BIM_ROWS.map((row, i) => (
              <li
                key={row.id}
                className={`flex items-center justify-between gap-6 px-6 py-5 lg:px-8 lg:py-6 ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <div>
                  <p className="font-headline text-lg tracking-[-0.01em] text-offwhite lg:text-xl">
                    {row.label}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-offwhite/45">
                    {row.meta}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-sand"
                >
                  →
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
