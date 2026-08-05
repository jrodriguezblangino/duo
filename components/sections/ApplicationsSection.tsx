import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { APPLICATIONS } from "@/lib/applications";
import { STAGGER } from "@/lib/motion";

const SPAN_CLASS = {
  hero: "sm:col-span-2 sm:row-span-2 min-h-[320px] lg:min-h-[480px]",
  tall: "sm:col-span-1 sm:row-span-2 min-h-[280px] lg:min-h-0",
  wide: "sm:col-span-1 min-h-[220px] lg:min-h-[240px]",
} as const;

/**
 * Aplicaciones — asymmetric bento (comp 04). NOT three equal cards.
 */
export default function ApplicationsSection() {
  return (
    <section
      aria-labelledby="aplicaciones-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="mb-10 max-w-[24ch] lg:mb-14">
          <h2
            id="aplicaciones-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-6xl"
          >
            Para todos los segmentos.
          </h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4">
          {APPLICATIONS.map((app, i) => (
            <li
              key={app.id}
              className={`group relative overflow-hidden bg-slate ${SPAN_CLASS[app.span]}`}
            >
              <Reveal delay={STAGGER * (i + 1)} className="absolute inset-0">
                <Image
                  src={app.image}
                  alt=""
                  fill
                  sizes={
                    app.span === "hero"
                      ? "(min-width: 640px) 66vw, 100vw"
                      : "(min-width: 640px) 33vw, 100vw"
                  }
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-carbon/35 to-carbon/10"
                />
              </Reveal>
              <div className="relative z-10 flex h-full flex-col justify-end p-6 lg:p-8">
                <h3 className="font-headline text-2xl font-normal tracking-[-0.02em] text-offwhite lg:text-3xl">
                  {app.title}
                </h3>
                <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-offwhite/70">
                  {app.blurb}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
