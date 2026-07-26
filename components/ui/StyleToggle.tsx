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
const METAL_SRC = assetPath(
  "/assets/images/detail_internal_45deg_alt_metal.webp",
);

const DEFAULT_POSITION = 50;
const HINT_OUT = 32;
const STEP = 2;
const HINT_MS = 1400;
const HELPER_FADE_MS = 9000;
const PULSE_MS = 1600;

/**
 * Both sources are square; panel content spans ~0–62% x (rest is black void).
 * Show a bit past the content edge so the plate isn’t flush-cropped.
 */
const CONTENT_RIGHT = 0.7;
const CROP_FRAME_WIDTH = `${100 / CONTENT_RIGHT}%`;

/**
 * Full-bleed finish still. Optional `maskPct` crops from the left via overflow
 * width (not clip-path — WebKit often fails to repaint clip-path updates).
 * Inner image is sized to the full frame so the crop doesn’t squash.
 */
function FinishCropLayer({
  src,
  maskPct,
  frameWidthPx,
}: {
  src: string;
  /** 0–100: visible width from the left. Omit for full layer. */
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
 * Finish compare — Aspecto madera ⇄ Metálico (§3.4).
 * Invite pulse uses rAF (CSS keyframes were invisible on real iOS Safari).
 */
export default function StyleToggle() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;

  const containerRef = useRef<HTMLDivElement>(null);
  const handleGlowRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
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
  const [inviteActive, setInviteActive] = useState(false);

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
    setInviteActive(false);
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

  // Measure frame for width-masked wood layer
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

  // Start invite when the control enters view
  useEffect(() => {
    if (reduceMotion || hasInteracted) return;
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio > 0.2)) {
          setInviteActive(true);
          io.disconnect();
        }
      },
      { threshold: [0.2, 0.35, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion, hasInteracted]);

  // rAF pulse — CSS keyframes did not paint on real iPhone Safari
  useEffect(() => {
    if (!inviteActive || hasInteracted || reduceMotion) {
      const glow = handleGlowRef.current;
      const line = dividerRef.current;
      if (glow) {
        glow.style.transform = "scale(1)";
        glow.style.boxShadow = "none";
      }
      if (line) line.style.opacity = "0.8";
      return;
    }

    const glow = handleGlowRef.current;
    const line = dividerRef.current;
    if (!glow) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = ((now - start) % PULSE_MS) / PULSE_MS;
      const wave = 0.5 - 0.5 * Math.cos(t * Math.PI * 2); // 0→1→0
      const scale = 1 + 0.16 * wave;
      const ring = 4 + 10 * wave;
      const alpha = 0.12 + 0.28 * wave;
      glow.style.transform = `scale(${scale})`;
      glow.style.boxShadow = `0 0 0 ${ring}px rgba(212, 195, 179, ${alpha})`;
      if (line) line.style.opacity = String(0.45 + 0.55 * wave);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inviteActive, hasInteracted, reduceMotion]);

  // Auto-hint slide once (width mask — visible on iOS)
  useEffect(() => {
    if (!inviteActive || reduceMotion || hintPlayedRef.current || hasInteracted)
      return;

    const playHint = () => {
      if (hintPlayedRef.current || hasDraggedRef.current) return;
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

    // Small delay so the user sees the pulse before the slide
    const delay = window.setTimeout(playHint, 400);
    return () => {
      window.clearTimeout(delay);
      if (hintRafRef.current != null) {
        cancelAnimationFrame(hintRafRef.current);
        hintRafRef.current = null;
      }
    };
  }, [inviteActive, reduceMotion, hasInteracted, commitPosition]);

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

  // Keep a minimum mask so the wood layer never collapses to 0px width math
  const woodMaskPct = Math.max(position, 0.5);

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
          ref={dividerRef}
          className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-sand"
          style={{ left: `${position}%`, opacity: 0.8 }}
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
          className="absolute top-1/2 z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          style={{ left: `${position}%` }}
          onKeyDown={onKeyDown}
          onPointerDown={onHandlePointerDown}
          onPointerMove={(e) => moveDrag(e.clientX)}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span
            ref={handleGlowRef}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-slate/95 text-sand will-change-transform"
            style={{ transformOrigin: "center" }}
          >
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
          className={`pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-sand transition-opacity duration-500 sm:bottom-5 sm:text-[11px] ${
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
