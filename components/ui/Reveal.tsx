"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ENTRY_Y, glide } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retraso en segundos para escalonar revelados dentro de una sección */
  delay?: number;
};

/**
 * Revela su contenido al entrar en el viewport (scroll).
 * Usa `glide` de lib/motion.ts. Respeta prefers-reduced-motion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: ENTRY_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      transition={{ ...glide, delay }}
    >
      {children}
    </motion.div>
  );
}
