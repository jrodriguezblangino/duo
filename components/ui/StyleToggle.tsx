"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

const WOOD_SRC = assetPath("/assets/images/detail_internal_45deg_alt.webp");
const METAL_SRC = assetPath(
  "/assets/images/detail_internal_45deg_alt_metal.webp",
);

const DEFAULT_POSITION = 50;
const HINT_OUT = 28;
const STEP = 2;
const HINT_MS = 1600;
const HELPER_FADE_MS = 10000;
const PULSE_TICK_MS = 40;

const CONTENT_RIGHT = 0.7;
const CROP_FRAME_WIDTH = `${100 / CONTENT_RIGHT}%`;

function FinishCropLayer({
  src,
  maskPct,
  frameWidthPx,
}: {
  src: string;
  maskPct?: number;
  frameWidthPx: number;
}) {
  const masked = maskPct != null;
  return (
    <div
      className={
        masked
          ? "absolute inset-y-0 left-0 z-[1] overflow-hidden"
          : "absolute inset-0 overflow-hidden"
      }
      style={masked ? { width: `${maskPct}%` } : undefined}
      aria-hidden={masked ? true : undefined}
    >
      <div
        className="absolute left-0 top-1/2 aspect-square -translate-y-1/2"
        style={{
          width:
            masked && frameWidthPx > 0
              ? frameWidthPx / CONTENT_RIGHT
              : CROP_FRAME_WIDTH,
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 992px, 100vw"
          className="object-cover"
          priority
          draggable={false}
        />
      </div>
    </div>
  );
}

/**
 * Finish compare — Aspecto madera ⇄ Metálico.
 * Invite pulse is React-state driven (setInterval) so it always paints on
 * iOS Safari — CSS keyframes and rAF-only style writes were unreliable.
 */
export default function StyleToggle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(DEFAULT_POSITION);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const hintPlayedRef = useRef(false);
  const hintRafRef = useRef<number | null>(null);

  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHelper, setShowHelper] = useState(true);
  const [frameWidthPx, setFrameWidthPx] = useState(0);
  /** 0..1 wave for invite pulse — forces React re-render / paint on iOS */
  const [pulseWave, setPulseWave] = useState(0);

  const commitPosition = useCallback((pct: number) => {
    const next = Math.min(100, Math.max(0, pct));
    positionRef.current = next;
    setPosition(next);
  }, []);

  const schedulePosition = useCallback((pct: number) => {
    positionRef.current = Math.min(100, Math.max(0, pct));
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setPosition(positionRef.current);
    });
  }, []);

  const positionFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return positionRef.current;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return positionRef.current;
    return ((clientX - rect.left) / rect.width) * 100;
  }, []);

  const markInteracted = useCallback(() => {
    if (hasDraggedRef.current) return;
    hasDraggedRef.current = true;
    setHasInteracted(true);
    setShowHelper(false);
    setPulseWave(0);
  }, []);

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setPosition(positionRef.current);
    markInteracted();
  }, [markInteracted]);

  const startDrag = useCallback(
    (clientX: number, target: HTMLElement, pointerId: number) => {
      if (hintRafRef.current != null) {
        cancelAnimationFrame(hintRafRef.current);
        hintRafRef.current = null;
      }
      draggingRef.current = true;
      try {
        target.setPointerCapture(pointerId);
      } catch {
        /* ignore */
      }
      schedulePosition(positionFromClientX(clientX));
    },
    [positionFromClientX, schedulePosition],
  );

  const moveDrag = useCallback(
    (clientX: number) => {
      if (!draggingRef.current) return;
      schedulePosition(positionFromClientX(clientX));
    },
    [positionFromClientX, schedulePosition],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setFrameWidthPx(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!showHelper || hasInteracted) return;
    const t = window.setTimeout(() => setShowHelper(false), HELPER_FADE_MS);
    return () => window.clearTimeout(t);
  }, [showHelper, hasInteracted]);

  // Always-on invite pulse until first drag (not gated on reduced-motion —
  // this is a functional affordance; iOS often reports reduced-motion oddly).
  useEffect(() => {
    if (hasInteracted) return;
    let t = 0;
    const id = window.setInterval(() => {
      t = (t + PULSE_TICK_MS) % 1600;
      const wave = 0.5 - 0.5 * Math.cos((t / 1600) * Math.PI * 2);
      setPulseWave(wave);
    }, PULSE_TICK_MS);
    return () => window.clearInterval(id);
  }, [hasInteracted]);

  // Auto-hint slide once the control is on screen
  useEffect(() => {
    if (hasInteracted || hintPlayedRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    const playHint = () => {
      if (hintPlayedRef.current || hasDraggedRef.current) return;
      hintPlayedRef.current = true;
      const start = performance.now();
      const from = DEFAULT_POSITION;
      const mid = HINT_OUT;
      const to = DEFAULT_POSITION;
      const easeInOut = (x: number) =>
        x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

      const tick = (now: number) => {
        if (draggingRef.current || hasDraggedRef.current) {
          hintRafRef.current = null;
          return;
        }
        const elapsed = now - start;
        const u = Math.min(1, elapsed / HINT_MS);
        const local = u < 0.5 ? easeInOut(u * 2) : easeInOut((u - 0.5) * 2);
        const pct =
          u < 0.5 ? from + (mid - from) * local : mid + (to - mid) * local;
        commitPosition(pct);
        if (u < 1) hintRafRef.current = requestAnimationFrame(tick);
        else {
          hintRafRef.current = null;
          commitPosition(DEFAULT_POSITION);
        }
      };
      hintRafRef.current = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          window.setTimeout(playHint, 500);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (hintRafRef.current != null) cancelAnimationFrame(hintRafRef.current);
    };
  }, [hasInteracted, commitPosition]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      next = positionRef.current - STEP;
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      next = positionRef.current + STEP;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = 100;
    }
    if (next == null) return;
    e.preventDefault();
    if (hintRafRef.current != null) {
      cancelAnimationFrame(hintRafRef.current);
      hintRafRef.current = null;
    }
    commitPosition(next);
    markInteracted();
  };

  const onFramePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    startDrag(e.clientX, e.currentTarget, e.pointerId);
  };

  const onHandlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    startDrag(e.clientX, e.currentTarget, e.pointerId);
  };

  const woodMaskPct = Math.max(position, 0.5);
  const inviting = !hasInteracted;
  const handleScale = inviting ? 1 + 0.2 * pulseWave : 1;
  const handleRing = inviting ? 6 + 14 * pulseWave : 0;
  const handleAlpha = inviting ? 0.15 + 0.35 * pulseWave : 0;
  const dividerOpacity = inviting ? 0.4 + 0.6 * pulseWave : 0.8;

  return (
    <div className="flex w-full flex-col gap-6 pb-4 lg:gap-7 lg:pb-8">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-none overflow-hidden bg-carbon select-none"
        onPointerDown={onFramePointerDown}
        onPointerMove={(e) => moveDrag(e.clientX)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <FinishCropLayer src={METAL_SRC} frameWidthPx={frameWidthPx} />
        <FinishCropLayer
          src={WOOD_SRC}
          maskPct={woodMaskPct}
          frameWidthPx={frameWidthPx}
        />

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-sand"
          style={{ left: `${position}%`, opacity: dividerOpacity }}
          aria-hidden="true"
        />

        <button
          type="button"
          role="slider"
          aria-label="Comparar acabados: arrastrá para revelar aspecto madera o metálico"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% aspecto madera, ${Math.round(100 - position)}% metálico`}
          className="absolute top-1/2 z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          style={{ left: `${position}%` }}
          onKeyDown={onKeyDown}
          onPointerDown={onHandlePointerDown}
          onPointerMove={(e) => moveDrag(e.clientX)}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-sand bg-slate text-sand"
            style={{
              transform: `scale(${handleScale})`,
              boxShadow: `0 0 0 ${handleRing}px rgba(212, 195, 179, ${handleAlpha})`,
            }}
          >
            <svg
              width="12"
              height="14"
              viewBox="0 0 10 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 1.5V10.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="square"
              />
              <path
                d="M7 1.5V10.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </button>

        <p
          className={`pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-sm bg-carbon/55 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-sand transition-opacity duration-500 sm:bottom-5 ${
            showHelper && !hasInteracted ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!showHelper || hasInteracted}
        >
          Arrastrá para comparar
        </p>

        <span className="sr-only">
          Comparación de acabados del panel Fill Home: aspecto madera a la
          izquierda y metálico a la derecha. Usá las flechas o arrastrá el
          control para revelar cada acabado.
        </span>
      </div>

      <p className="w-full text-center font-mono text-xs tracking-[0.02em] text-offwhite/50 lg:pr-[12%] lg:text-[13px]">
        Misma geometría · Junta oculta · Núcleo y acero invariables
      </p>
    </div>
  );
}
