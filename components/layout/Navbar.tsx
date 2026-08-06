"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import Magnetic from "@/components/ui/Magnetic";
import { SITE_NAME } from "@/lib/brand.config";
import { NAV_LINKS } from "@/lib/site";
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
    if (!menuOpen) {
      delete document.body.dataset.mobileMenuOpen;
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.mobileMenuOpen = "true";
    return () => {
      document.body.style.overflow = prev;
      delete document.body.dataset.mobileMenuOpen;
    };
  }, [menuOpen]);

  const navSurface = scrolledPastHero
    ? "bg-surface border-b border-sand/40"
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

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
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
          <div className="flex items-center gap-3">
            <Magnetic strength={10}>
              <WhatsAppCTA variant="primary" size="sm" />
            </Magnetic>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="relative z-[60] -mr-2 flex h-11 w-11 shrink-0 items-center justify-center md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
        >
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-px w-6 origin-center bg-offwhite transition-transform duration-300 ${
                menuOpen ? "translate-y-[5.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-6 origin-center bg-offwhite transition-transform duration-300 ${
                menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-50 bg-carbon md:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.2 } : glide}
          >
            {/* True center of the band below the fixed header */}
            <div className="absolute inset-x-0 bottom-0 top-nav-mobile flex items-center justify-center px-6 py-[max(1.5rem,env(safe-area-inset-bottom))]">
              <div className="flex w-full max-w-xs flex-col items-center text-center">
                <ul className="flex w-full flex-col items-center">
                  {NAV_LINKS.map(({ href, label }, index) => {
                    const isActive = pathname === href;
                    return (
                      <motion.li
                        key={href}
                        className="w-full"
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
                          className={`group relative mx-auto block w-fit py-3 text-[1.125rem] font-medium uppercase tracking-[0.08em] leading-none text-offwhite/60 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                            isActive
                              ? "text-offwhite/85"
                              : "hover:text-offwhite/75"
                          }`}
                        >
                          {label}
                          <span
                            aria-hidden="true"
                            className={`absolute bottom-2 left-1/2 h-px w-6 -translate-x-1/2 bg-sand transition-opacity duration-300 ${
                              isActive
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-40"
                            }`}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div
                  className="mt-12 flex w-full flex-col items-center gap-4"
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
                  <WhatsAppCTA
                    variant="primary"
                    size="md"
                    onClick={closeMenu}
                    className="w-full !px-6 !py-3.5 !text-[13px] tracking-[0.14em]"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
