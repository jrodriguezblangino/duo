import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { BRAND_LOGO, CTA, NAV_LINKS, SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-offwhite/10 bg-slate">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 lg:px-10">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          >
            <Image
              src={BRAND_LOGO}
              alt={`Logotipo de ${SITE_NAME}`}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-headline text-lg tracking-wide text-offwhite">
              {SITE_NAME}
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-offwhite/60">
            Revestimientos de alta gama que combinan la calidez de la madera
            con la resistencia del metal.
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <h2 className="mb-4 text-sm uppercase tracking-widest text-sand">
            Explorar
          </h2>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-offwhite/70 transition-colors hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm uppercase tracking-widest text-sand">
            Tu proyecto
          </h2>
          <p className="mb-6 max-w-xs text-sm leading-relaxed text-offwhite/60">
            Diseñamos tu proyecto con precisión. Cuéntanos qué espacio quieres
            transformar y te preparamos una propuesta a medida.
          </p>
          <Button href={CTA.href} variant="outline" size="sm">
            {CTA.label}
          </Button>
        </div>
      </div>

      <div className="border-t border-offwhite/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-offwhite/40 lg:px-10">
          © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
