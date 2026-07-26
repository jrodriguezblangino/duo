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
import { useReducedMotion } from "framer-motion";
import { assetPath } from "@/lib/assetPath";

const WOOD_SRC = assetPath("/assets/images/detail_internal_45deg_alt.webp");
const METAL_SRC = assetPath("/assets/images/detail_internal_45deg_alt_metal.webp");

const DEFAULT_POSITION = 50;
const HINT_OUT = 35;
const STEP = 2;
const HINT_MS = 1100;
const HELPER_FADE_MS = 7000;

/**
 * Both sources are square; panel content spans ~0–62% x (rest is black void).
 * Show a bit past the content edge so the plate isn’t flush-cropped.
 */
const CONTENT_RIGHT = 0.7;
const CROP_FRAME_WIDTH = `${100 / CONTENT_RIGHT}%`;

function FinishCropLayer({
  src,
  clipPath,
}: {
  src: string;
  clipPath?: string;
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={clipPath ? { clipPath } : undefined}
      aria-hidden={clipPath ? true : undefined}
    >
      <div
        className="absolute left-0 top-1/2 aspect-square -translate-y-1/2"
        style={{ width: CROP_FRAME_WIDTH }}
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
 * Finish compare — Aspecto madera ⇄ Metálico (§3.4).
 * Draggable before/after slider over aligned detail stills.
 */
export default function StyleToggle() {
  const prefersReducedMotion = useReducedMotion();
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
        /* capture may fail on some browsers mid-gesture */
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
    if (!showHelper || hasInteracted) return;
    const t = window.setTimeout(() => setShowHelper(false), HELPER_FADE_MS);
    return () => window.clearTimeout(t);
  }, [showHelper, hasInteracted]);

  useEffect(() => {
    if (prefersReducedMotion || hintPlayedRef.current) return;

    const el = containerRef.current;
    if (!el) return;

    const playHint = () => {
      if (hintPlayedRef.current || prefersReducedMotion) return;
      hintPlayedRef.current = true;

      const start = performance.now();
      const from = DEFAULT_POSITION;
      const mid = HINT_OUT;
      const to = DEFAULT_POSITION;

      const easeInOut = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const tick = (now: number) => {
        if (draggingRef.current || hasDraggedRef.current) {
          hintRafRef.current = null;
          return;
        }
        const elapsed = now - start;
        const t = Math.min(1, elapsed / HINT_MS);
        const local = t < 0.5 ? easeInOut(t * 2) : easeInOut((t - 0.5) * 2);
        const pct =
          t < 0.5 ? from + (mid - from) * local : mid + (to - mid) * local;
        commitPosition(pct);
        if (t < 1) {
          hintRafRef.current = requestAnimationFrame(tick);
        } else {
          hintRafRef.current = null;
          commitPosition(DEFAULT_POSITION);
        }
      };

      hintRafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          playHint();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (hintRafRef.current != null) {
        cancelAnimationFrame(hintRafRef.current);
        hintRafRef.current = null;
      }
    };
  }, [prefersReducedMotion, commitPosition]);

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

  const woodClip = `inset(0 ${100 - position}% 0 0)`;
  const inviteMotion = !prefersReducedMotion && !hasInteracted;

  return (
    <div className="flex w-full flex-col gap-6 pb-4 lg:gap-7 lg:pb-8">
      {/*
        Width comes from the parent composition (max-w-[62rem]). Aspect only
        controls frame height — crop/zoom inside FinishCropLayer is untouched.
        Drag range tracks getBoundingClientRect of this container.
      */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-none overflow-hidden bg-carbon select-none"
        onPointerDown={onFramePointerDown}
        onPointerMove={(e) => moveDrag(e.clientX)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <FinishCropLayer src={METAL_SRC} />
        <FinishCropLayer src={WOOD_SRC} clipPath={woodClip} />

        <div
          className={`pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-sand/80 ${
            inviteMotion ? "animate-finish-divider-breathe" : ""
          }`}
          style={{ left: `${position}%` }}
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
          className="absolute top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          style={{ left: `${position}%` }}
          onKeyDown={onKeyDown}
          onPointerDown={onHandlePointerDown}
          onPointerMove={(e) => moveDrag(e.clientX)}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-sand/70 bg-slate/90 text-sand transition-transform duration-300 ${
              inviteMotion ? "animate-finish-handle-pulse" : "scale-100"
            }`}
          >
            {/* Editorial hairline ticks — restrained, not icon-font chevrons */}
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 1.5V10.5"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="square"
              />
              <path
                d="M7 1.5V10.5"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </button>

        <p
          className={`pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-sand/80 transition-opacity duration-500 sm:bottom-5 sm:text-[11px] ${
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
