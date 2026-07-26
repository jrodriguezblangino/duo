"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import {
  HighlightWord,
  HighlightWordStatic,
} from "@/components/ui/HighlightWord";

function useParagraphScroll() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    /* Narrow upper-viewport window so above-the-fold Tecnología copy
       still has headroom to scrub from ~0 on first paint. */
    offset: ["start 0.28", "start 0.02"],
  });
  return { ref, progress: scrollYProgress };
}

function ScrollMark({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: ReturnType<typeof useParagraphScroll>["progress"];
  range: readonly [number, number];
  reduce: boolean;
}) {
  if (reduce) {
    return (
      <HighlightWordStatic surface="dark">{children}</HighlightWordStatic>
    );
  }

  return (
    <HighlightWord
      reduce={false}
      progress={progress}
      range={range}
      reveal="scroll"
      surface="dark"
    >
      {children}
    </HighlightWord>
  );
}

/** Hero / 01 — fabrication; highlight on proceso (not tolerancia) */
export function ManufacturingBody({ className }: { className: string }) {
  const reduce = Boolean(useReducedMotion());
  const { ref, progress } = useParagraphScroll();

  return (
    <p ref={ref} className={className}>
      La cara nace por extrusión de aluminio; el núcleo se inyecta en
      poliuretano; el respaldo se lamina en acero galvanizado. El{" "}
      <ScrollMark reduce={reduce} progress={progress} range={[0.15, 0.7]}>
        proceso
      </ScrollMark>{" "}
      está calibrado para la tolerancia del encastre oculto.
    </p>
  );
}

/** 03 — installation; same draw timing as hero */
export function InstallationBody({ className }: { className: string }) {
  const reduce = Boolean(useReducedMotion());
  const { ref, progress } = useParagraphScroll();

  return (
    <p ref={ref} className={className}>
      Esa precisión se traslada a la obra: el{" "}
      <ScrollMark reduce={reduce} progress={progress} range={[0.15, 0.7]}>
        encastre
      </ScrollMark>{" "}
      oculto sostiene una tolerancia constante sobre el muro real, y permite un
      ensamble limpio — sin fijaciones a la vista.
    </p>
  );
}

/** 04 — insulation; peer highlight treatment */
export function InsulationBody({ className }: { className: string }) {
  const reduce = Boolean(useReducedMotion());
  const { ref, progress } = useParagraphScroll();

  return (
    <p ref={ref} className={className}>
      El poliuretano de alta densidad reduce la transferencia térmica, aporta
      confort acústico y es la capa que{" "}
      <ScrollMark reduce={reduce} progress={progress} range={[0.2, 0.75]}>
        adhiere
      </ScrollMark>{" "}
      cara y respaldo en una sola pieza.
    </p>
  );
}
