/** Shared technical specs — used by /tecnologia UI and Product JSON-LD. */
export type SpecRow = {
  label: string;
  value: string;
};

export const SPECS: SpecRow[] = [
  { label: "Dimensiones", value: "3 m × 40 cm" },
  { label: "Cobertura", value: "1,5 m² por panel" },
  { label: "Cara", value: "Aluminio anodizado 0.6 mm" },
  { label: "Núcleo", value: "Poliuretano HD — aislamiento + adhesión" },
  { label: "Respaldo", value: "Acero galvanizado" },
  { label: "Instalación", value: "Encastre oculto sobre muro existente" },
  { label: "Mantenimiento", value: "Agua y paño suave" },
  { label: "Acabados", value: "Aspecto madera / Metálico" },
];
