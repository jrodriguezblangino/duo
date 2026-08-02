import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { PROJECTS, type ProjectFinish } from "@/lib/projects";
import { STAGGER } from "@/lib/motion";

const FINISH_LABEL: Record<ProjectFinish, string> = {
  madera: "Madera",
  metálico: "Metálico",
};

const mediaMotion =
  "h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.03]";

export default function ProjectsSection() {
  return (
    <section
      aria-labelledby="proyectos-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <Reveal className="mb-12 max-w-[32ch] lg:mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-sand lg:text-[13px]">
            Proyectos
          </p>
          <h2
            id="proyectos-heading"
            className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-offwhite lg:text-6xl"
          >
            Obra real, misma ingeniería.
          </h2>
          <p className="mt-5 max-w-measure text-base leading-relaxed text-offwhite/60 lg:text-lg">
            Referencias demostrativas hasta publicar instalaciones reales — el
            sistema de panel es el mismo.
          </p>
        </Reveal>

        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:gap-y-12">
          {PROJECTS.map((project, i) => (
            <li key={project.id}>
              <Reveal delay={STAGGER * (i + 1)}>
                <Link
                  href={project.href}
                  className="group flex flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate">
                    <Image
                      src={project.image}
                      alt={`${project.title} — acabado ${FINISH_LABEL[project.finish].toLowerCase()}`}
                      fill
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className={mediaMotion}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:text-[13px]">
                      {project.location}
                    </p>
                    <h3 className="font-headline text-xl font-normal tracking-[-0.01em] text-offwhite lg:text-2xl">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-mono text-xs tracking-[0.02em] text-offwhite/60 lg:text-[13px]">
                        {project.m2}&nbsp;m²
                      </span>
                      <span className="inline-block border border-sand/50 bg-sand/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sand">
                        {FINISH_LABEL[project.finish]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-offwhite/55 lg:text-[15px]">
                      {project.blurb}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
