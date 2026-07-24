"use client";

import { useId, useState } from "react";
import Button from "@/components/ui/Button";
import {
  estimatePanels,
  formatArea,
  PANEL_COVERAGE_M2,
  type PanelEstimate,
} from "@/lib/panelCalculator";

export type ProjectFormData = {
  nombre: string;
  telefono: string;
  tipoProyecto: "interior" | "exterior" | "comercial";
  anchoMetros: number;
  altoMetros: number;
  estilo: "madera" | "metalico";
  contactoPreferido: "llamada" | "whatsapp";
};

type ProjectFormProps = {
  onSubmit?: (data: ProjectFormData & PanelEstimate) => void;
};

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | {
      status: "success";
      paneles: number;
      areaM2: number;
      contactoPreferido: ProjectFormData["contactoPreferido"];
    };

const INPUT_CLASSES =
  "w-full rounded-sm border border-offwhite/15 bg-carbon px-4 py-3 text-base text-offwhite placeholder:text-offwhite/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand disabled:opacity-50";

const LABEL_CLASSES =
  "mb-2 block text-xs uppercase tracking-widest text-offwhite/70";

function parsePositiveNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export default function ProjectForm({ onSubmit }: ProjectFormProps) {
  const formId = useId();
  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const estimate = estimatePanels(
    parsePositiveNumber(ancho) ?? 0,
    parsePositiveNumber(alto) ?? 0,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const data: ProjectFormData = {
      nombre: String(formData.get("nombre")).trim(),
      telefono: String(formData.get("telefono")).trim(),
      tipoProyecto: formData.get(
        "tipoProyecto",
      ) as ProjectFormData["tipoProyecto"],
      anchoMetros: Number(formData.get("anchoMetros")),
      altoMetros: Number(formData.get("altoMetros")),
      estilo: formData.get("estilo") as ProjectFormData["estilo"],
      contactoPreferido: formData.get(
        "contactoPreferido",
      ) as ProjectFormData["contactoPreferido"],
    };

    const calculated = estimatePanels(data.anchoMetros, data.altoMetros);
    if (!calculated) {
      setSubmitState({
        status: "error",
        message: "Ingresá dimensiones válidas mayores a cero.",
      });
      return;
    }

    setSubmitState({ status: "loading" });

    try {
      const response = await fetch("/api/proyecto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
        paneles?: number;
        areaM2?: number;
        contactoPreferido?: ProjectFormData["contactoPreferido"];
      };

      if (!response.ok || !result.ok || !result.paneles || !result.areaM2) {
        setSubmitState({
          status: "error",
          message:
            result.error ??
            "No pudimos enviar tu solicitud. Intentá de nuevo en unos minutos.",
        });
        return;
      }

      onSubmit?.({ ...data, ...calculated });
      setSubmitState({
        status: "success",
        paneles: result.paneles,
        areaM2: result.areaM2,
        contactoPreferido: result.contactoPreferido ?? data.contactoPreferido,
      });
    } catch {
      setSubmitState({
        status: "error",
        message:
          "Hubo un problema de conexión. Verificá tu red e intentá nuevamente.",
      });
    }
  };

  if (submitState.status === "success") {
    const medio =
      submitState.contactoPreferido === "whatsapp"
        ? "WhatsApp"
        : "llamada telefónica";

    return (
      <div
        role="status"
        className="rounded-sm border border-sand/40 bg-slate p-8"
      >
        <p className="mb-4 text-lg leading-relaxed text-offwhite">
          Gracias por confiar en Fill Home. Recibimos los datos de tu proyecto y
          nuestro equipo te contactará a la brevedad por {medio}.
        </p>
        <dl className="grid gap-3 border-t border-offwhite/10 pt-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="mb-1 uppercase tracking-widest text-sand">
              Superficie estimada
            </dt>
            <dd className="text-offwhite/80">
              {formatArea(submitState.areaM2)} m²
            </dd>
          </div>
          <div>
            <dt className="mb-1 uppercase tracking-widest text-sand">
              Paneles necesarios
            </dt>
            <dd className="font-headline text-2xl text-offwhite">
              {submitState.paneles}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-offwhite/50">
          Cálculo basado en {PANEL_COVERAGE_M2.toLocaleString("es")} m² de
          cobertura por panel. El plan definitivo lo confirma nuestro equipo
          según el recorte y la orientación de la instalación.
        </p>
      </div>
    );
  }

  const isLoading = submitState.status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Formulario de planificación de proyecto"
      className="flex flex-col gap-6"
      noValidate={false}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-nombre`} className={LABEL_CLASSES}>
            Nombre completo
          </label>
          <input
            id={`${formId}-nombre`}
            name="nombre"
            type="text"
            required
            disabled={isLoading}
            autoComplete="name"
            placeholder="Ej.: Ana Martínez"
            className={INPUT_CLASSES}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-telefono`} className={LABEL_CLASSES}>
            Teléfono / WhatsApp
          </label>
          <input
            id={`${formId}-telefono`}
            name="telefono"
            type="tel"
            required
            disabled={isLoading}
            autoComplete="tel"
            placeholder="Ej.: +54 9 351 000 0000"
            className={INPUT_CLASSES}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-tipo`} className={LABEL_CLASSES}>
            Tipo de proyecto
          </label>
          <select
            id={`${formId}-tipo`}
            name="tipoProyecto"
            required
            disabled={isLoading}
            defaultValue=""
            className={INPUT_CLASSES}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${formId}-estilo`} className={LABEL_CLASSES}>
            Estilo preferido
          </label>
          <select
            id={`${formId}-estilo`}
            name="estilo"
            required
            disabled={isLoading}
            defaultValue=""
            className={INPUT_CLASSES}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="madera">Aspecto Madera</option>
            <option value="metalico">Metálico Negro</option>
          </select>
        </div>
      </div>

      <fieldset disabled={isLoading}>
        <legend className={LABEL_CLASSES}>
          Dimensiones de la pared (en metros)
        </legend>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-ancho`} className={LABEL_CLASSES}>
              Ancho
            </label>
            <input
              id={`${formId}-ancho`}
              name="anchoMetros"
              type="number"
              required
              min={0.1}
              step={0.1}
              inputMode="decimal"
              placeholder="Ej.: 4.5"
              value={ancho}
              onChange={(e) => setAncho(e.target.value)}
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-alto`} className={LABEL_CLASSES}>
              Alto
            </label>
            <input
              id={`${formId}-alto`}
              name="altoMetros"
              type="number"
              required
              min={0.1}
              step={0.1}
              inputMode="decimal"
              placeholder="Ej.: 2.6"
              value={alto}
              onChange={(e) => setAlto(e.target.value)}
              className={INPUT_CLASSES}
            />
          </div>
        </div>
      </fieldset>

      <div
        aria-live="polite"
        className="rounded-sm border border-offwhite/10 bg-slate px-5 py-4"
      >
        {estimate ? (
          <p className="text-sm leading-relaxed text-offwhite/80">
            Superficie estimada:{" "}
            <span className="text-offwhite">
              {formatArea(estimate.areaM2)} m²
            </span>
            . Paneles necesarios:{" "}
            <span className="font-headline text-xl text-sand">
              {estimate.paneles}
            </span>{" "}
            <span className="text-offwhite/50">
              (cobertura de {PANEL_COVERAGE_M2.toLocaleString("es")} m² por
              panel)
            </span>
          </p>
        ) : (
          <p className="text-sm text-offwhite/50">
            Ingresá el ancho y el alto para calcular cuántos paneles necesita
            tu proyecto.
          </p>
        )}
      </div>

      <fieldset disabled={isLoading}>
        <legend className={LABEL_CLASSES}>
          ¿Cómo prefieres que te contactemos?
        </legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <label className="flex cursor-pointer items-center gap-3 text-base text-offwhite/80">
            <input
              type="radio"
              name="contactoPreferido"
              value="llamada"
              required
              className="h-4 w-4 accent-[#D4C3B3]"
            />
            Prefiero una llamada
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-base text-offwhite/80">
            <input
              type="radio"
              name="contactoPreferido"
              value="whatsapp"
              className="h-4 w-4 accent-[#D4C3B3]"
            />
            Cotización por WhatsApp
          </label>
        </div>
      </fieldset>

      {submitState.status === "error" && (
        <p role="alert" className="text-sm text-red-300">
          {submitState.message}
        </p>
      )}

      <div>
        <Button variant="primary" size="md" type="submit" disabled={isLoading}>
          {isLoading ? "Enviando…" : "Enviar datos del proyecto"}
        </Button>
      </div>
    </form>
  );
}
