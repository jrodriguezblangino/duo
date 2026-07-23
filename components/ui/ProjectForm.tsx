"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

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
  /** Se conecta al backend en la Fase 4; mientras tanto muestra un estado de éxito local. */
  onSubmit?: (data: ProjectFormData) => void;
};

const INPUT_CLASSES =
  "w-full rounded-sm border border-offwhite/15 bg-carbon px-4 py-3 text-base text-offwhite placeholder:text-offwhite/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand";

const LABEL_CLASSES =
  "mb-2 block text-xs uppercase tracking-widest text-offwhite/70";

export default function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: ProjectFormData = {
      nombre: String(formData.get("nombre")),
      telefono: String(formData.get("telefono")),
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

    onSubmit?.(data);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <p
        role="status"
        className="rounded-sm border border-sand/40 bg-slate p-8 text-lg leading-relaxed text-offwhite"
      >
        Gracias por confiar en Fill Home. Recibimos los datos de tu proyecto y
        nuestro equipo te contactará a la brevedad por el medio que elegiste.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Formulario de planificación de proyecto"
      className="flex flex-col gap-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={LABEL_CLASSES}>
            Nombre completo
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder="Ej.: Ana Martínez"
            className={INPUT_CLASSES}
          />
        </div>
        <div>
          <label htmlFor="telefono" className={LABEL_CLASSES}>
            Teléfono / WhatsApp
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            placeholder="Ej.: +54 9 351 000 0000"
            className={INPUT_CLASSES}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="tipoProyecto" className={LABEL_CLASSES}>
            Tipo de proyecto
          </label>
          <select
            id="tipoProyecto"
            name="tipoProyecto"
            required
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
          <label htmlFor="estilo" className={LABEL_CLASSES}>
            Estilo preferido
          </label>
          <select
            id="estilo"
            name="estilo"
            required
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

      <fieldset>
        <legend className={LABEL_CLASSES}>
          Dimensiones de la pared (en metros)
        </legend>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="anchoMetros" className={LABEL_CLASSES}>
              Ancho
            </label>
            <input
              id="anchoMetros"
              name="anchoMetros"
              type="number"
              required
              min={0.1}
              step={0.1}
              inputMode="decimal"
              placeholder="Ej.: 4.5"
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="altoMetros" className={LABEL_CLASSES}>
              Alto
            </label>
            <input
              id="altoMetros"
              name="altoMetros"
              type="number"
              required
              min={0.1}
              step={0.1}
              inputMode="decimal"
              placeholder="Ej.: 2.6"
              className={INPUT_CLASSES}
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className={LABEL_CLASSES}>¿Cómo prefieres que te contactemos?</legend>
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

      <div>
        <Button variant="primary" size="md" type="submit">
          Enviar datos del proyecto
        </Button>
      </div>
    </form>
  );
}
