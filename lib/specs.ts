/** Shared technical specs — used by /tecnologia UI and Product JSON-LD. */
export type SpecRow = {
  label: string;
  value: string;
};

export const SPECS: SpecRow[] = [
  { label: "Dimensiones", value: "Largo y ancho según línea (techo/fachada)" },
  { label: "Cobertura", value: "Autoportante — sin cielorrasos ni mampuestos" },
  { label: "Cara", value: "Chapa de acero conformado (calibre #25)" },
  { label: "Núcleo", value: "Poliisocianurato (PIR) — retardo al fuego" },
  { label: "Respaldo", value: "Acero galvanizado" },
  { label: "Instalación", value: "Encastre oculto, estanco, sin filtraciones" },
  { label: "Mantenimiento", value: "Agua y paño suave" },
  { label: "Acabados", value: "Metálicos (blanco, carbón, gris)" },
];
