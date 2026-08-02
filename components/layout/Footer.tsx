import Link from "next/link";
import Button from "@/components/ui/Button";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import { BRAND, SITE_NAME } from "@/lib/brand.config";
import { CTA, NAV_LINKS } from "@/lib/site";

const PHONE_HREF = `tel:${BRAND.phoneDisplay.replace(/[^\d+]/g, "")}`;

const contactLinkClass =
  "text-sm text-offwhite/70 transition-colors hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand";

export default function Footer() {
  return (
    <footer className="border-t border-offwhite/15 bg-carbon">
      <div className="mx-auto grid max-w-site gap-12 px-6 py-16 md:grid-cols-3 lg:px-20">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="font-headline text-[1.375rem] font-normal leading-none tracking-[-0.01em] text-offwhite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          >
            {SITE_NAME}
          </Link>
          <p className="max-w-measure text-sm leading-relaxed text-offwhite/60">
            Aluminio anodizado sobre núcleo de poliuretano y respaldo de acero.
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/50">
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
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-offwhite/50">
            Tu proyecto
          </h2>
          <p className="mb-6 max-w-measure text-sm leading-relaxed text-offwhite/60">
            Cotización y plan de paneles a partir de tipo de obra, acabado y
            superficie.
          </p>
          <ul className="mb-6 flex flex-col gap-2">
            <li>
              <a href={PHONE_HREF} className={contactLinkClass}>
                {BRAND.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className={contactLinkClass}>
                {BRAND.email}
              </a>
            </li>
          </ul>
          <div className="flex flex-col items-start gap-3">
            <WhatsAppCTA variant="primary" size="sm" />
            <Button href={CTA.href} variant="primary" size="sm">
              {CTA.label}
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-offwhite/10">
        <p className="mx-auto max-w-site px-6 py-6 text-xs text-offwhite/40 lg:px-20">
          © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
