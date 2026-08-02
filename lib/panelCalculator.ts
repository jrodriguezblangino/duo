/** Cobertura oficial por panel (m²), según PROJECT_ROADMAP.md */
export const PANEL_COVERAGE_M2 = 1.5;

/**
 * Precio referencial ARS / m² (placeholder — editar al cerrar lista de precios).
 * `estimateBudget` aplica ±15% alrededor de este valor.
 */
export const BUDGET_PER_M2 = 85_000;

/** Spread relativo del rango min/max (0.15 = ±15%). */
const BUDGET_RANGE_FACTOR = 0.15;

export type PanelEstimate = {
  areaM2: number;
  paneles: number;
};

export type BudgetEstimate = {
  min: number;
  max: number;
  /** ARS / m² usado para el cálculo (BUDGET_PER_M2). */
  perM2: number;
};

/**
 * Calcula la cantidad de paneles necesarios a partir del área de la pared.
 * Se redondea hacia arriba para cubrir el espacio completo.
 */
export function estimateFromArea(areaM2: number): PanelEstimate | null {
  if (!Number.isFinite(areaM2) || areaM2 <= 0) {
    return null;
  }

  return {
    areaM2: Math.round(areaM2 * 100) / 100,
    paneles: Math.ceil(areaM2 / PANEL_COVERAGE_M2),
  };
}

/**
 * Rango de presupuesto referencial en ARS a partir del área (m²).
 * Usa BUDGET_PER_M2 ± BUDGET_RANGE_FACTOR. No es cotización vinculante.
 */
export function estimateBudget(areaM2: number): BudgetEstimate | null {
  if (!Number.isFinite(areaM2) || areaM2 <= 0) {
    return null;
  }

  const mid = areaM2 * BUDGET_PER_M2;
  const delta = mid * BUDGET_RANGE_FACTOR;

  return {
    min: Math.round(mid - delta),
    max: Math.round(mid + delta),
    perM2: BUDGET_PER_M2,
  };
}

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

  return estimateFromArea(anchoMetros * altoMetros);
}

export function formatArea(areaM2: number): string {
  return areaM2.toLocaleString("es", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

/** Formatea un monto ARS sin decimales (preview de presupuesto). */
export function formatArs(amount: number): string {
  return amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}
