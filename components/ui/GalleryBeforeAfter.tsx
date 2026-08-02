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

const DEFAULT_POSITION = 50;
const STEP = 2;

export type GalleryBeforeAfterProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** Accessible name for the slider control */
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Antes / después — divider arrastrable (pointer events, sin deps).
 * Teclado: flechas, Home, End. role=slider + aria-*.
 * Visual language aligned with StyleToggle + GalleryGrid tiles.
 */
export default function GalleryBeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  label = "Comparar antes y después del revestimiento",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: GalleryBeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(DEFAULT_POSITION);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const [position, setPosition] = useState(DEFAULT_POSITION);

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

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setPosition(positionRef.current);
  }, []);

  const startDrag = useCallback(
    (clientX: number, target: HTMLElement, pointerId: number) => {
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
    commitPosition(next);
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

  const beforeMaskPct = Math.max(position, 0.5);
  const beforePct = Math.round(position);
  const afterPct = Math.round(100 - position);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video w-full cursor-ew-resize touch-none select-none overflow-hidden bg-slate ${className}`}
      onPointerDown={onFramePointerDown}
      onPointerMove={(e) => moveDrag(e.clientX)}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src={afterSrc}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-y-0 left-0 z-[1] overflow-hidden"
        style={{ width: `${beforeMaskPct}%` }}
        aria-hidden="true"
      >
        <div
          className="relative h-full"
          style={{ width: `${10000 / beforeMaskPct}%` }}
        >
          <Image
            src={beforeSrc}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            draggable={false}
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Quiet edge labels — no bordered chips (sand reserved for handle) */}
      <span
        className="pointer-events-none absolute bottom-3 left-3 z-10 font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/55 lg:text-[11px]"
        aria-hidden="true"
      >
        Antes
      </span>
      <span
        className="pointer-events-none absolute bottom-3 right-3 z-10 font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/55 lg:text-[11px]"
        aria-hidden="true"
      >
        Después
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-sand/85"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      />

      <button
        type="button"
        role="slider"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={beforePct}
        aria-valuetext={`${beforePct}% antes, ${afterPct}% después`}
        className="absolute top-1/2 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
        style={{ left: `${position}%` }}
        onKeyDown={onKeyDown}
        onPointerDown={onHandlePointerDown}
        onPointerMove={(e) => moveDrag(e.clientX)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-sand bg-slate text-sand">
          <svg
            width="14"
            height="16"
            viewBox="0 0 10 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 1.5V10.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="square"
            />
            <path
              d="M7 1.5V10.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </button>

      <span className="sr-only">
        {beforeAlt}. {afterAlt}. Usá las flechas o arrastrá el control para
        comparar.
      </span>
    </div>
  );
}
