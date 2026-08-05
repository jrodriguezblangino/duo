import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand.config";
import { PROJECTS } from "@/lib/projects";
import { assetPath } from "@/lib/assetPath";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Galería",
  description: `Obras y detalle de panel ${BRAND.name}: techo, fachada y macro de material.`,
};

const DETAILS = [
  {
    id: "junta",
    label: "Junta oculta",
    image: assetPath("/assets/images/detail_internal_45deg_alt_metal.webp"),
  },
  {
    id: "textura",
    label: "Textura",
    image: assetPath("/assets/images/macro_zoom_quality.webp"),
  },
  {
    id: "agua",
    label: "Rechazo de agua",
    image: assetPath("/assets/images/durability_water_drops_still.webp"),
  },
] as const;

const CATEGORIES = [
  "Residencial",
  "Agro e Industrial",
  "Comercial e Institucional",
] as const;

/**
 * /galeria — aligned to docs/comps/duo-galeria/
 * Hero → Obras masonry → Detalle macros
 */
export default function GaleriaPage() {
  return (
    <>
      <section
        aria-labelledby="galeria-heading"
        className="relative flex min-h-[70dvh] items-center justify-center overflow-hidden bg-carbon px-6 text-center text-offwhite lg:min-h-[80dvh] lg:px-20"
      >
        <Image
          src={assetPath("/assets/images/project_demo_pavilion_metal.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/50 to-carbon"
        />
        <Reveal className="relative z-10 max-w-[18ch]">
          <h1
            id="galeria-heading"
            className="font-headline text-[3.5rem] font-normal leading-[0.95] tracking-[-0.02em] lg:text-[6rem]"
          >
            Obras.
          </h1>
          <p className="mt-5 text-sm text-offwhite/60 lg:text-base">
            Residencial, agro, industrial y comercial.
          </p>
        </Reveal>
      </section>

      <section
        aria-labelledby="galeria-obras-heading"
        className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
      >
        <div className="mx-auto max-w-site">
          <h2 id="galeria-obras-heading" className="sr-only">
            Proyectos
          </h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:gap-3">
            {PROJECTS.map((project, i) => (
              <li
                key={project.id}
                className={i % 3 === 0 ? "sm:col-span-1" : ""}
              >
                <Reveal delay={STAGGER * (i + 1)}>
                  <div className="group relative aspect-[4/3] overflow-hidden bg-slate">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-carbon/75 via-transparent to-transparent"
                    />
                    <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/90">
                      {project.title}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.12} className="mt-10 border-t border-border pt-6">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-sand">
              Proyectos que inspiran
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-offwhite/55"
                >
                  <span className="mr-2 text-sand">+</span>
                  {cat}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="galeria-detalle-heading"
        className="bg-carbon px-6 pb-section-mobile text-offwhite lg:px-20 lg:pb-section"
      >
        <div className="mx-auto max-w-site">
          <Reveal className="mb-10 max-w-[20ch]">
            <h2
              id="galeria-detalle-heading"
              className="font-headline text-[2.25rem] font-normal tracking-[-0.02em] lg:text-[3rem]"
            >
              Del panel al detalle.
            </h2>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-3">
            {DETAILS.map((detail, i) => (
              <li key={detail.id}>
                <Reveal delay={STAGGER * (i + 1)}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate">
                    <Image
                      src={detail.image}
                      alt={detail.label}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-offwhite/60">
                    {detail.label}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.16} className="mt-14">
            <Link
              href="/contacto"
              className="inline-flex font-mono text-xs uppercase tracking-[0.14em] text-sand underline underline-offset-4 hover:text-sand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              Cotizar un proyecto →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
