import { NextResponse } from "next/server";
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

function isValidSubmission(body: unknown): body is ProjectSubmission {
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
 * Endpoint de planificación de proyecto.
 * Valida el payload, calcula paneles y simula la notificación al equipo.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  if (!isValidSubmission(body)) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos o el formato es incorrecto." },
      { status: 400 },
    );
  }

  const estimate = estimateFromArea(body.superficieM2);

  if (!estimate) {
    return NextResponse.json(
      { ok: false, error: "La superficie debe ser mayor a cero." },
      { status: 400 },
    );
  }

  console.info("[Fill Home] Nueva solicitud de proyecto", {
    ...body,
    areaM2: estimate.areaM2,
    paneles: estimate.paneles,
    recibidoEn: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    paneles: estimate.paneles,
    areaM2: estimate.areaM2,
  });
}
