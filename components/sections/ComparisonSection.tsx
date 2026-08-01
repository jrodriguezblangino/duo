import Reveal from "@/components/ui/Reveal";

const COLUMNS = [
  { id: "metal", label: "Metal Siding", recommended: true },
  { id: "pintura", label: "Pintura", recommended: false },
  { id: "ladrillo", label: "Ladrillo", recommended: false },
  { id: "pvc", label: "PVC", recommended: false },
] as const;

const ROWS = [
  {
    label: "Durabilidad",
    values: {
      metal: "30+ años",
      pintura: "5–8 años",
      ladrillo: "50+ años",
      pvc: "15–20 años",
    },
  },
  {
    label: "Mantenimiento",
    values: {
      metal: "Casi nulo",
      pintura: "Repintado cada 5–7 años",
      ladrillo: "Bajo",
      pvc: "Bajo–medio",
    },
  },
  {
    label: "Tiempo de instalación",
    values: {
      metal: "2–5 días",
      pintura: "1–2 semanas",
      ladrillo: "Semanas–meses",
      pvc: "3–7 días",
    },
  },
  {
    label: "Costo a 10 años",
    values: {
      metal: "Bajo",
      pintura: "Alto (ciclos)",
      ladrillo: "Medio–alto",
      pvc: "Medio",
    },
  },
  {
    label: "Resistencia al agua",
    values: {
      metal: "Excelente",
      pintura: "Media",
      ladrillo: "Alta",
      pvc: "Media",
    },
  },
] as const;

type ColumnId = (typeof COLUMNS)[number]["id"];

const thBase =
  "py-5 align-bottom font-mono text-xs font-normal tracking-[0.02em] text-offwhite/50";
const tdBase = "py-5 text-base leading-relaxed text-offwhite/80";
const rowBorder = "border-b border-offwhite/10";
const labelCell =
  "align-top font-mono text-xs font-normal tracking-[0.02em] text-offwhite/50";

export default function ComparisonSection() {
  return (
    <section
      aria-labelledby="comparacion-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="mb-12 max-w-[28ch] lg:mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-sand lg:text-[13px]">
            Comparativa
          </p>
          <h2
            id="comparacion-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-offwhite lg:text-6xl"
          >
            ¿Por qué no solo pintar?
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Comparativa de revestimientos: Metal Siding, pintura, ladrillo y
                PVC
              </caption>
              <thead>
                <tr className={rowBorder}>
                  <th scope="col" className={`${thBase} pr-6 text-left`}>
                    <span className="sr-only">Criterio</span>
                  </th>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.id}
                      scope="col"
                      className={`${thBase} px-4 text-left ${
                        col.recommended
                          ? "bg-sand/[0.1] text-sand"
                          : "text-offwhite/50"
                      }`}
                    >
                      <span className="flex flex-col items-start gap-2">
                        <span className="font-mono text-xs tracking-[0.02em] uppercase">
                          {col.label}
                        </span>
                        {col.recommended && (
                          <span className="inline-block border border-sand/50 bg-sand/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sand">
                            Recomendado
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className={`${rowBorder} last:border-b-0`}>
                    <th
                      scope="row"
                      className={`w-[22%] py-5 pr-6 ${labelCell}`}
                    >
                      {row.label}
                    </th>
                    {COLUMNS.map((col) => (
                      <td
                        key={col.id}
                        className={`${tdBase} px-4 ${
                          col.recommended
                            ? "bg-sand/[0.1] text-offwhite"
                            : ""
                        }`}
                      >
                        {row.values[col.id as ColumnId]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked product blocks */}
          <div className="flex flex-col gap-8 md:hidden">
            {COLUMNS.map((col) => (
              <div
                key={col.id}
                className={
                  col.recommended
                    ? "border border-sand/40 bg-sand/[0.08] p-6"
                    : "border border-offwhite/10 p-6"
                }
              >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <h3
                    className={`font-mono text-xs uppercase tracking-[0.08em] ${
                      col.recommended ? "text-sand" : "text-offwhite/70"
                    }`}
                  >
                    {col.label}
                  </h3>
                  {col.recommended && (
                    <span className="inline-block border border-sand/50 bg-sand/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sand">
                      Recomendado
                    </span>
                  )}
                </div>
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Criterios para {col.label}
                  </caption>
                  <tbody>
                    {ROWS.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-offwhite/10 last:border-b-0"
                      >
                        <th
                          scope="row"
                          className={`w-[42%] py-4 pr-4 ${labelCell}`}
                        >
                          {row.label}
                        </th>
                        <td className="py-4 text-base leading-relaxed text-offwhite/80">
                          {row.values[col.id as ColumnId]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <p className="mt-8 font-mono text-xs tracking-[0.02em] text-offwhite/40 lg:text-[13px]">
            Valores referenciales
          </p>
        </Reveal>
      </div>
    </section>
  );
}
