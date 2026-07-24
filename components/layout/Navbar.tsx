"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { CTA, NAV_LINKS, SITE_NAME } from "@/lib/site";
import { ENTRY_Y, STAGGER, glide } from "@/lib/motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolledPastHero(window.scrollY >= window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const navSurface = scrolledPastHero
    ? "bg-slate/[0.92] border-b border-sand/20"
    : "bg-transparent border-b border-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${navSurface}`}
      style={{
        transitionProperty: "background-color, border-color",
        transitionTimingFunction: prefersReducedMotion
          ? "linear"
          : "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDuration: prefersReducedMotion ? "0ms" : "400ms",
      }}
    >
      <nav
        aria-label="Navegación principal"
        className="relative z-[60] mx-auto flex h-16 max-w-site items-center justify-between px-6 lg:h-[88px] lg:px-20"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="font-headline text-[1.375rem] font-normal leading-none tracking-[-0.01em] text-offwhite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
        >
          {SITE_NAME}
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={`group relative text-sm font-medium uppercase tracking-[0.08em] transition-colors duration-300 hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                    pathname === href ? "text-offwhite" : "text-offwhite/80"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-sand transition-transform duration-300 ${
                      pathname === href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Button href={CTA.href} variant="primary" size="sm">
            {CTA.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
        >
          <span
            aria-hidden="true"
            className={`h-px w-6 bg-offwhite transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`h-px w-6 bg-offwhite transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-50 flex flex-col justify-center bg-carbon px-6 pt-nav-mobile md:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.2 } : glide}
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map(({ href, label }, index) => {
                const isActive = pathname === href;
                return (
                  <motion.li
                    key={href}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: ENTRY_Y }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.2 }
                        : { ...glide, delay: index * STAGGER }
                    }
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={`group relative block py-2.5 font-headline text-[28px] font-normal italic leading-none text-offwhite/60 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                        isActive ? "text-offwhite/85" : "hover:text-offwhite/75"
                      }`}
                    >
                      {label}
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-1.5 left-0 h-px w-6 bg-sand transition-opacity duration-300 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-40"
                        }`}
                      />
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                className="mt-12"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: ENTRY_Y }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2 }
                    : { ...glide, delay: NAV_LINKS.length * STAGGER }
                }
              >
                <Button
                  href={CTA.href}
                  onClick={closeMenu}
                  variant="primary"
                  size="sm"
                  className="!text-xs tracking-[0.12em]"
                >
                  {CTA.label}
                </Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
