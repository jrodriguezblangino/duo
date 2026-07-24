/** Cobertura oficial por panel (m²), según PROJECT_ROADMAP.md */
export const PANEL_COVERAGE_M2 = 1.5;

export type PanelEstimate = {
  areaM2: number;
  paneles: number;
};

/**
 * Calcula la cantidad de paneles necesarios a partir del área de la pared.
 * Se redondea hacia arriba para cubrir el espacio completo.
 */
export function estimatePanels(
  anchoMetros: number,
  altoMetros: number,
): PanelEstimate | null {
  if (
    !Number.isFinite(anchoMetros) ||
    !Number.isFinite(altoMetros) ||
    anchoMetros <= 0 ||
    altoMetros <= 0
  ) {
    return null;
  }

  const areaM2 = anchoMetros * altoMetros;
  const paneles = Math.ceil(areaM2 / PANEL_COVERAGE_M2);

  return {
    areaM2: Math.round(areaM2 * 100) / 100,
    paneles,
  };
}

export function formatArea(areaM2: number): string {
  return areaM2.toLocaleString("es", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
