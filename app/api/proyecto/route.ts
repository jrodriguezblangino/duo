import { NextResponse } from "next/server";
import { estimatePanels } from "@/lib/panelCalculator";

export type ProjectSubmission = {
  nombre: string;
  telefono: string;
  tipoProyecto: "interior" | "exterior" | "comercial";
  anchoMetros: number;
  altoMetros: number;
  estilo: "madera" | "metalico";
  contactoPreferido: "llamada" | "whatsapp";
};

const TIPOS = new Set(["interior", "exterior", "comercial"]);
const ESTILOS = new Set(["madera", "metalico"]);
const CONTACTOS = new Set(["llamada", "whatsapp"]);

function isValidSubmission(body: unknown): body is ProjectSubmission {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;

  return (
    typeof data.nombre === "string" &&
    data.nombre.trim().length > 0 &&
    typeof data.telefono === "string" &&
    data.telefono.trim().length > 0 &&
    typeof data.tipoProyecto === "string" &&
    TIPOS.has(data.tipoProyecto) &&
    typeof data.estilo === "string" &&
    ESTILOS.has(data.estilo) &&
    typeof data.contactoPreferido === "string" &&
    CONTACTOS.has(data.contactoPreferido) &&
    typeof data.anchoMetros === "number" &&
    typeof data.altoMetros === "number"
  );
}

/**
 * Endpoint de planificación de proyecto.
 * Valida el payload, calcula paneles y simula la notificación al equipo
 * (consola del servidor). Sustituible por un servicio real (email/CRM) más adelante.
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

  const estimate = estimatePanels(body.anchoMetros, body.altoMetros);

  if (!estimate) {
    return NextResponse.json(
      { ok: false, error: "Las dimensiones deben ser mayores a cero." },
      { status: 400 },
    );
  }

  // Simulación de notificación al equipo (sustituir por email/CRM en producción).
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
    contactoPreferido: body.contactoPreferido,
  });
}
