import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { PROJECTS } from "@/lib/projects";
import { STAGGER } from "@/lib/motion";

const CATEGORIES = [
  { id: "residencial", label: "Residencial" },
  { id: "agro", label: "Agro e Industrial" },
  { id: "comercial", label: "Comercial" },
] as const;

/**
 * Obras — flush masonry + category legend (comp 09).
 * Strip card metadata on home; deep detail lives on /galeria.
 */
export default function ProjectsSection() {
  return (
    <section
      aria-labelledby="proyectos-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="mb-10 max-w-[14ch] lg:mb-14">
          <h2
            id="proyectos-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] text-offwhite lg:text-6xl"
          >
            Obras.
          </h2>
        </Reveal>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:gap-3">
          {PROJECTS.map((project, i) => (
            <li
              key={project.id}
              className={
                i === 0 || i === 3
                  ? "col-span-2 sm:col-span-1 sm:row-span-1"
                  : ""
              }
            >
              <Reveal delay={STAGGER * (i + 1)}>
                <Link
                  href={project.href}
                  className="group relative block aspect-[4/3] overflow-hidden bg-slate focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent opacity-80"
                  />
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/90 lg:bottom-4 lg:left-4 lg:text-[11px]">
                    {project.title}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.12} className="mt-10 border-t border-border pt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-offwhite/55"
              >
                <span aria-hidden="true" className="text-sand">
                  +
                </span>
                {cat.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
