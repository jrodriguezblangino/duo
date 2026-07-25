"use client";

import { useMotionValue, useReducedMotion } from "framer-motion";
import {
  HighlightWord,
  HighlightWordStatic,
} from "@/components/ui/HighlightWord";

const DUMMY_RANGE = [0, 1] as const;

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
      range={DUMMY_RANGE}
      reveal="view"
      surface="dark"
      duration={0.5}
      delay={delay}
    >
      {children}
    </HighlightWord>
  );
}

/** Scene 1 — fabrication sequence; markers on extrusión / tolerancia */
export function ManufacturingBody({ className }: { className: string }) {
  const reduce = Boolean(useReducedMotion());

  return (
    <p className={className}>
      La cara nace por <ViewMark reduce={reduce}>extrusión</ViewMark> de
      aluminio; el núcleo se inyecta en poliuretano; el respaldo se lamina en
      acero galvanizado. El proceso está calibrado para la{" "}
      <ViewMark reduce={reduce} delay={0.35}>
        tolerancia
      </ViewMark>{" "}
      del encastre oculto.
    </p>
  );
}

/** Scene 3 — on-site installation; markers on encastre / tolerancia */
export function InstallationBody({ className }: { className: string }) {
  const reduce = Boolean(useReducedMotion());

  return (
    <p className={className}>
      Esa precisión se traslada a la obra: el{" "}
      <ViewMark reduce={reduce}>encastre</ViewMark> oculto sostiene una{" "}
      <ViewMark reduce={reduce} delay={0.35}>
        tolerancia
      </ViewMark>{" "}
      constante sobre el muro real, y permite un ensamble limpio — sin
      fijaciones a la vista.
    </p>
  );
}
