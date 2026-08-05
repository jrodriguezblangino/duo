"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import { BRAND } from "@/lib/brand.config";

export default function WhatsAppFloat() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const sync = () => {
      setMenuOpen(document.body.dataset.mobileMenuOpen === "true");
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-mobile-menu-open"],
    });
    return () => observer.disconnect();
  }, []);

  if (menuOpen) return null;

  return (
    <motion.div
      className="fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 md:right-6 md:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
      animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <WhatsAppCTA
        iconOnly
        size="sm"
        label={BRAND.ctaLabel}
        className="h-14 w-14 rounded-full !p-0 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      />
    </motion.div>
  );
}
