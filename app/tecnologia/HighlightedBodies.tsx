"use client";

import { useMotionValue, useReducedMotion } from "framer-motion";
import {
  HighlightWord,
  HighlightWordStatic,
} from "@/components/ui/HighlightWord";

const DUMMY = [0, 1] as const;

function ViewMark({
  children,
  delay = 0,
  reduce,
}: {
  children: string;
  delay?: number;
  reduce: boolean;
}) {
  const progress = useMotionValue(0);

  if (reduce) {
    return (
      <HighlightWordStatic surface="dark">{children}</HighlightWordStatic>
    );
  }

  return (
    <HighlightWord
      reduce={false}
      progress={progress}
      range={DUMMY}
      reveal="view"
      surface="dark"
      duration={1}
      delay={delay}
    >
      {children}
    </HighlightWord>
  );
}

/** Hero / 01 — fabrication; highlight on proceso (not tolerancia) */
export function ManufacturingBody({ className }: { className: string }) {
  const reduce = Boolean(useReducedMotion());

  return (
    <p className={className}>
      La cara nace por extrusión de aluminio; el núcleo se inyecta en
      poliuretano; el respaldo se lamina en acero galvanizado. El{" "}
      <ViewMark reduce={reduce}>proceso</ViewMark> está calibrado para la
      tolerancia del encastre oculto.
    </p>
  );
}

/** 03 — installation; same draw timing as hero */
export function InstallationBody({ className }: { className: string }) {
  const reduce = Boolean(useReducedMotion());

  return (
    <p className={className}>
      Esa precisión se traslada a la obra: el{" "}
      <ViewMark reduce={reduce}>encastre</ViewMark> oculto sostiene una
      tolerancia constante sobre el muro real, y permite un ensamble limpio —
      sin fijaciones a la vista.
    </p>
  );
}

/** 04 — insulation; peer highlight treatment */
export function InsulationBody({ className }: { className: string }) {
  const reduce = Boolean(useReducedMotion());

  return (
    <p className={className}>
      El poliuretano de alta densidad reduce la transferencia térmica, aporta
      confort acústico y es la capa que{" "}
      <ViewMark reduce={reduce} delay={0.35}>
        adhiere
      </ViewMark>{" "}
      cara y respaldo en una sola pieza.
    </p>
  );
}
