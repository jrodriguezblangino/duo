"use client";

import { useEffect, useRef, useState } from "react";
import BackgroundVideo from "@/components/ui/BackgroundVideo";

type SectionLoopVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  wrapperClassName?: string;
  "aria-label"?: string;
};

/**
 * Looping section video with iOS tap fallback.
 * Autoplay is attempted aggressively; if still paused while on-screen,
 * a clear play control appears — one tap always works on iPhone Safari.
 */
export default function SectionLoopVideo({
  src,
  poster,
  className,
  wrapperClassName,
  "aria-label": ariaLabel,
}: SectionLoopVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showTap, setShowTap] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let armed = false;
    let timer = 0;

    const video = () => root.querySelector("video");

    const check = () => {
      const v = video();
      if (!v || !armed) return;
      if (v.paused && !v.ended) setShowTap(true);
      else setShowTap(false);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        armed = hit;
        window.clearTimeout(timer);
        if (hit) {
          timer = window.setTimeout(check, 900);
        } else {
          setShowTap(false);
        }
      },
      { threshold: 0.2 },
    );

    io.observe(root);
    const interval = window.setInterval(check, 1000);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, []);

  const onTapPlay = () => {
    const root = rootRef.current;
    const v = root?.querySelector("video");
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    void v.play().then(() => setShowTap(false)).catch(() => setShowTap(true));
  };

  return (
    <div ref={rootRef} className={`relative ${wrapperClassName ?? ""}`}>
      <BackgroundVideo
        src={src}
        poster={poster}
        preload="auto"
        observeRef={rootRef}
        playback={{ enabled: true, threshold: 0.05 }}
        aria-label={ariaLabel}
        className={className}
      />
      {showTap ? (
        <button
          type="button"
          onClick={onTapPlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-carbon/35"
          aria-label={ariaLabel ? `Reproducir: ${ariaLabel}` : "Reproducir video"}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-sand/80 bg-slate/90 text-sand shadow-[0_0_0_6px_rgba(212,195,179,0.15)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5L8 5.5z" />
            </svg>
          </span>
        </button>
      ) : null}
    </div>
  );
}
