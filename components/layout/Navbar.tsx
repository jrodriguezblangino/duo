"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { BRAND_LOGO, CTA, NAV_LINKS, SITE_NAME } from "@/lib/site";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-offwhite/10 bg-carbon/90 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
        >
          <Image
            src={BRAND_LOGO}
            alt={`Logotipo de ${SITE_NAME}`}
            width={48}
            height={48}
            priority
            className="h-12 w-12 object-contain"
          />
          <span className="font-headline text-xl tracking-wide text-offwhite">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={`text-sm uppercase tracking-widest transition-colors hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                    pathname === href ? "text-sand" : "text-offwhite/80"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={CTA.href} variant="primary" size="sm">
            {CTA.label}
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
        >
          <span
            aria-hidden="true"
            className={`h-px w-6 bg-offwhite transition-transform ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`h-px w-6 bg-offwhite transition-transform ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="menu-movil"
        hidden={!menuOpen}
        className="border-t border-offwhite/10 bg-carbon md:hidden"
      >
        <ul className="flex flex-col gap-1 px-5 py-6">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={closeMenu}
                aria-current={pathname === href ? "page" : undefined}
                className={`block py-3 text-base uppercase tracking-widest transition-colors hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                  pathname === href ? "text-sand" : "text-offwhite/80"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Button
              href={CTA.href}
              onClick={closeMenu}
              variant="primary"
              size="sm"
              className="w-full"
            >
              {CTA.label}
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
