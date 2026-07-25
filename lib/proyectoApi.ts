import { estimateFromArea } from "@/lib/panelCalculator";

export type ProjectSubmission = {
  nombre: string;
  email: string;
  telefono: string;
  direccion?: string;
  tipoProyecto: "obra-nueva" | "renovacion" | "interior" | "exterior";
  estilo: "madera" | "metalico";
  tono: string;
  superficieM2: number;
  timeline: string;
  mensaje?: string;
};

const TIPOS = new Set([
  "obra-nueva",
  "renovacion",
  "interior",
  "exterior",
]);
const ESTILOS = new Set(["madera", "metalico"]);

export function isValidSubmission(body: unknown): body is ProjectSubmission {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;

  return (
    typeof data.nombre === "string" &&
    data.nombre.trim().length > 0 &&
    typeof data.email === "string" &&
    data.email.trim().length > 0 &&
    typeof data.telefono === "string" &&
    data.telefono.trim().length > 0 &&
    typeof data.tipoProyecto === "string" &&
    TIPOS.has(data.tipoProyecto) &&
    typeof data.estilo === "string" &&
    ESTILOS.has(data.estilo) &&
    typeof data.tono === "string" &&
    data.tono.trim().length > 0 &&
    typeof data.superficieM2 === "number" &&
    typeof data.timeline === "string" &&
    data.timeline.trim().length > 0
  );
}

/**
 * Shared validation + panel estimate for the quote form.
 * Used when restoring a real API route (e.g. Vercel); static demo has no server.
 */
export function processProjectSubmission(body: ProjectSubmission) {
  const estimate = estimateFromArea(body.superficieM2);
  if (!estimate) return null;
  return estimate;
}
