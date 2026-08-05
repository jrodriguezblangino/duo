import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { APPLICATIONS } from "@/lib/applications";
import { STAGGER } from "@/lib/motion";

/**
 * Aplicaciones — title-in-bento + asymmetric tiles (comp 04).
 * Labels + arrow only; no equal cards, no blurbs on tiles.
 */
export default function ApplicationsSection() {
  const residencial = APPLICATIONS.find((a) => a.id === "residencial")!;
  const agro = APPLICATIONS.find((a) => a.id === "agro-industrial")!;
  const comercial = APPLICATIONS.find(
    (a) => a.id === "comercial-institucional",
  )!;

  return (
    <section
      aria-labelledby="aplicaciones-heading"
      className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
    >
      <div className="mx-auto max-w-site">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-[auto_minmax(240px,1fr)_auto] lg:gap-4">
          {/* Title cell */}
          <li className="relative flex min-h-[200px] flex-col justify-end border border-border/80 p-6 sm:min-h-[280px] lg:p-8">
            <Reveal>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-sand">
                + Aplicaciones
              </p>
              <h2
                id="aplicaciones-heading"
                className="max-w-[12ch] font-headline text-[2.25rem] font-normal leading-[1.05] tracking-[-0.02em] text-offwhite lg:text-[3.25rem]"
              >
                Para todos los segmentos
                <span className="text-sand">.</span>
              </h2>
            </Reveal>
          </li>

          {/* Agro tall */}
          <AppTile
            href="/galeria"
            title={agro.title}
            image={agro.image}
            className="sm:row-span-2 min-h-[280px] sm:min-h-0"
            delay={STAGGER}
          />

          {/* Residencial */}
          <AppTile
            href="/galeria"
            title={residencial.title}
            image={residencial.image}
            className="min-h-[220px]"
            delay={STAGGER * 2}
          />

          {/* Comercial full width */}
          <AppTile
            href="/galeria"
            title={comercial.title}
            image={comercial.image}
            className="min-h-[220px] sm:col-span-2"
            delay={STAGGER * 3}
          />
        </ul>
      </div>
    </section>
  );
}

function AppTile({
  href,
  title,
  image,
  className,
  delay,
}: {
  href: string;
  title: string;
  image: string;
  className?: string;
  delay: number;
}) {
  return (
    <li className={`relative overflow-hidden border border-border/80 ${className ?? ""}`}>
      <Reveal delay={delay} className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-carbon/85 via-carbon/25 to-carbon/10"
        />
      </Reveal>
      <Link
        href={href}
        className="group relative z-10 flex h-full min-h-[inherit] items-start justify-between gap-4 p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand lg:p-6"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-offwhite">
          {title}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-sand transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </li>
  );
}
