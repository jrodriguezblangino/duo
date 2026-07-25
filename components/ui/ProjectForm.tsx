"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import {
  estimateFromArea,
  formatArea,
  PANEL_COVERAGE_M2,
} from "@/lib/panelCalculator";
import { FINISH_TONES, type FinishTone } from "@/lib/finishes";
import { ENTRY_Y, glide, precision } from "@/lib/motion";

type ProjectType = "obra-nueva" | "renovacion" | "interior" | "exterior";
type StyleKey = "madera" | "metalico";

type FormState = {
  tipoProyecto: ProjectType | null;
  estilo: StyleKey;
  tono: FinishTone;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  superficieM2: string;
  timeline: string;
  mensaje: string;
};

const PROJECT_TYPES: { key: ProjectType; label: string }[] = [
  { key: "obra-nueva", label: "Obra nueva" },
  { key: "renovacion", label: "Renovación" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
];

const TIMELINES = [
  { value: "0-3", label: "0–3 meses" },
  { value: "3-6", label: "3–6 meses" },
  { value: "6-12", label: "6–12 meses" },
  { value: "12+", label: "Más de 12 meses" },
];

const STEPS = [
  { id: 1, label: "01 Proyecto" },
  { id: 2, label: "02 Material" },
  { id: 3, label: "03 Detalles" },
] as const;

const INPUT_UNDERLINE =
  "w-full border-0 border-b border-carbon/30 bg-transparent px-0 py-3 text-base text-carbon placeholder:text-carbon/40 transition-[border-color] duration-300 focus:border-sand focus:outline-none focus-visible:outline-none disabled:opacity-50";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success" };

/**
 * Multi-step Request a Quote form (§3.5).
 * Underline inputs, invert selection cards, Sand progress line — no modal/toast.
 */
export default function ProjectForm() {
  const formId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });
  const [form, setForm] = useState<FormState>({
    tipoProyecto: null,
    estilo: "madera",
    tono: "roble",
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    superficieM2: "",
    timeline: "",
    mensaje: "",
  });

  const progress = step / STEPS.length;
  const isLoading = submitState.status === "loading";

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canAdvance = () => {
    if (step === 1) return form.tipoProyecto !== null;
    if (step === 2) return Boolean(form.estilo && form.tono);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < 3) {
      if (canAdvance()) setStep((s) => s + 1);
      return;
    }

    const area = Number(form.superficieM2);
    if (!form.nombre.trim() || !form.email.trim() || !form.telefono.trim()) {
      setSubmitState({
        status: "error",
        message: "Completá nombre, email y teléfono para continuar.",
      });
      return;
    }
    if (!Number.isFinite(area) || area <= 0) {
      setSubmitState({
        status: "error",
        message: "Indicá una superficie aproximada mayor a cero.",
      });
      return;
    }

    // Demo / static export: no API. Keep the multi-step UX for client review.
    setSubmitState({ status: "success" });
  };

  if (submitState.status === "success") {
    return (
      <motion.div
        role="status"
        initial={prefersReducedMotion ? false : { opacity: 0, y: ENTRY_Y }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0.2 } : { ...glide, duration: 0.4 }}
        className="py-8"
      >
        <p className="font-headline text-[28px] font-normal italic leading-[1.1] text-carbon lg:text-[40px]">
          Flujo de cotización (demo).
        </p>
        <p className="mt-4 max-w-measure text-base leading-[1.65] text-carbon/70">
          Esta maqueta muestra el recorrido del formulario. El envío real y la
          cotización se activarán en la versión de producción.
        </p>
      </motion.div>
    );
  }

  const areaPreview = estimateFromArea(Number(form.superficieM2));

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Solicitud de cotización"
      className="flex flex-col gap-10"
      noValidate={false}
    >
      {/* Progress — 1px Sand over Carbon@20% track */}
      <div>
        <div
          className="h-px w-full bg-carbon/20"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Progreso del formulario"
        >
          <motion.div
            className="h-px bg-sand"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={prefersReducedMotion ? { duration: 0.15 } : precision}
          />
        </div>
        <ol className="mt-4 flex flex-wrap gap-4 font-mono text-xs tracking-[0.02em] text-carbon/50 lg:text-[13px]">
          {STEPS.map((s) => (
            <li
              key={s.id}
              className={step === s.id ? "text-carbon" : undefined}
            >
              {s.label}
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={prefersReducedMotion ? false : { opacity: 0, y: ENTRY_Y }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={
            prefersReducedMotion ? { duration: 0.15 } : { ...glide, duration: 0.4 }
          }
          className="flex flex-col gap-8"
        >
          {step === 1 && (
            <fieldset disabled={isLoading}>
              <legend className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-carbon/60">
                Tipo de proyecto
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {PROJECT_TYPES.map(({ key, label }) => {
                  const selected = form.tipoProyecto === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => update("tipoProyecto", key)}
                      className={`border px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                        selected
                          ? "border-carbon bg-carbon text-offwhite"
                          : "border-carbon text-carbon hover:bg-carbon/5"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-10">
              <fieldset disabled={isLoading}>
                <legend className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-carbon/60">
                  Dirección de material
                </legend>
                <div
                  role="group"
                  aria-label="Acabado"
                  className="flex items-center gap-6"
                >
                  {(
                    [
                      { key: "madera" as const, label: "Aspecto madera" },
                      { key: "metalico" as const, label: "Metálico" },
                    ] as const
                  ).map(({ key, label }, index) => (
                    <div key={key} className="flex items-center gap-6">
                      {index > 0 && (
                        <span
                          aria-hidden="true"
                          className="h-4 w-px bg-carbon/30"
                        />
                      )}
                      <button
                        type="button"
                        aria-pressed={form.estilo === key}
                        onClick={() => update("estilo", key)}
                        className="relative pb-2 text-sm font-medium uppercase tracking-[0.08em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
                      >
                        <span
                          className={
                            form.estilo === key
                              ? "text-carbon"
                              : "text-carbon/40"
                          }
                        >
                          {label}
                        </span>
                        {form.estilo === key && (
                          <motion.span
                            layoutId="form-style-underline"
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-px bg-sand"
                            transition={
                              prefersReducedMotion
                                ? { duration: 0.15 }
                                : precision
                            }
                          />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset disabled={isLoading}>
                <legend className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-carbon/60">
                  Tono de acabado
                </legend>
                <div className="flex flex-wrap gap-5">
                  {FINISH_TONES.map(({ key, label, src, objectPosition }) => {
                    const selected = form.tono === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={selected}
                        aria-label={label}
                        onClick={() => update("tono", key)}
                        className={`flex flex-col items-start gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${
                          selected ? "opacity-100" : "opacity-45"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`relative h-14 w-14 overflow-hidden border ${
                            selected
                              ? "border-carbon"
                              : "border-carbon/25"
                          }`}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                            style={{ objectPosition }}
                          />
                        </span>
                        <span className="font-mono text-xs tracking-[0.02em] text-carbon">
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label
                    htmlFor={`${formId}-nombre`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-carbon/60"
                  >
                    Nombre
                  </label>
                  <input
                    id={`${formId}-nombre`}
                    name="nombre"
                    type="text"
                    required
                    disabled={isLoading}
                    autoComplete="name"
                    value={form.nombre}
                    onChange={(e) => update("nombre", e.target.value)}
                    className={INPUT_UNDERLINE}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDuration: "400ms" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-email`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-carbon/60"
                  >
                    Email
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={INPUT_UNDERLINE}
                  />
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label
                    htmlFor={`${formId}-telefono`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-carbon/60"
                  >
                    Teléfono
                  </label>
                  <input
                    id={`${formId}-telefono`}
                    name="telefono"
                    type="tel"
                    required
                    disabled={isLoading}
                    autoComplete="tel"
                    value={form.telefono}
                    onChange={(e) => update("telefono", e.target.value)}
                    className={INPUT_UNDERLINE}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-direccion`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-carbon/60"
                  >
                    Dirección del proyecto
                  </label>
                  <input
                    id={`${formId}-direccion`}
                    name="direccion"
                    type="text"
                    disabled={isLoading}
                    autoComplete="street-address"
                    value={form.direccion}
                    onChange={(e) => update("direccion", e.target.value)}
                    className={INPUT_UNDERLINE}
                  />
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label
                    htmlFor={`${formId}-superficie`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-carbon/60"
                  >
                    Superficie aprox. (m²)
                  </label>
                  <input
                    id={`${formId}-superficie`}
                    name="superficieM2"
                    type="number"
                    required
                    min={0.1}
                    step={0.1}
                    inputMode="decimal"
                    disabled={isLoading}
                    value={form.superficieM2}
                    onChange={(e) => update("superficieM2", e.target.value)}
                    className={INPUT_UNDERLINE}
                  />
                  {areaPreview && (
                    <p className="mt-2 font-mono text-xs tracking-[0.02em] text-carbon/50">
                      ~{areaPreview.paneles} paneles ({formatArea(areaPreview.areaM2)}{" "}
                      m² · {PANEL_COVERAGE_M2} m²/panel)
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-timeline`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-carbon/60"
                  >
                    Plazo
                  </label>
                  <select
                    id={`${formId}-timeline`}
                    name="timeline"
                    required
                    disabled={isLoading}
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    className={INPUT_UNDERLINE}
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    {TIMELINES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor={`${formId}-mensaje`}
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-carbon/60"
                >
                  Mensaje
                </label>
                <textarea
                  id={`${formId}-mensaje`}
                  name="mensaje"
                  rows={4}
                  disabled={isLoading}
                  value={form.mensaje}
                  onChange={(e) => update("mensaje", e.target.value)}
                  className={`${INPUT_UNDERLINE} resize-y`}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {submitState.status === "error" && (
        <p role="alert" className="text-sm text-[#8B3A3A]">
          {submitState.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6">
        {step > 1 && (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setStep((s) => s - 1)}
            className="text-sm font-medium uppercase tracking-[0.08em] text-carbon/60 hover:text-carbon focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          >
            Atrás
          </button>
        )}
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isLoading || (step < 3 && !canAdvance())}
        >
          {isLoading
            ? "Enviando…"
            : step < 3
              ? "Continuar"
              : "Enviar solicitud"}
        </Button>
      </div>
    </form>
  );
}
