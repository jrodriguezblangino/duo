"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";

type SectionLoopVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  wrapperClassName?: string;
  "aria-label"?: string;
};

/**
 * Composición loops for mobile.
 *
 * - Mount video when intersecting (isIntersecting only — iOS often reports
 *   ratio 0 while intersecting, which previously left a dead poster).
 * - Keep poster + ▶ above the video until timeupdate proves frames.
 * - Try muted autoplay on enter; never trust play() alone to hide the UI.
 * - Tap only calls play() (no load()) so the user gesture stays valid on iOS.
 */
export default function SectionLoopVideo({
  src,
  poster,
  className,
  wrapperClassName,
  "aria-label": ariaLabel,
}: SectionLoopVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [inView, setInView] = useState(false);
  /** True only after currentTime has advanced — not after play() resolves */
  const [hasFrames, setHasFrames] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Do NOT require intersectionRatio — iOS Safari often reports 0
        // while isIntersecting is true (left Composición stuck on poster).
        setInView(entries.some((e) => e.isIntersecting));
      },
      { threshold: 0, rootMargin: "0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setHasFrames(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const lock = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.disablePictureInPicture = true;
      try {
        video.disableRemotePlayback = true;
      } catch {
        /* older WebKit */
      }
    };

    const confirmFrames = () => {
      if (!video.paused && video.currentTime > 0.05) {
        setHasFrames(true);
      }
    };

    const tryPlay = () => {
      lock();
      if (video.paused) {
        void video.play().catch(() => {
          /* show tap UI until frames confirm */
        });
      }
    };

    lock();
    video.addEventListener("timeupdate", confirmFrames);
    video.addEventListener("playing", confirmFrames);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    tryPlay();
    const t1 = window.setTimeout(tryPlay, 350);
    const t2 = window.setTimeout(tryPlay, 1200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      video.removeEventListener("timeupdate", confirmFrames);
      video.removeEventListener("playing", confirmFrames);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.pause();
    };
  }, [inView, src]);

  const onTapPlay = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // Src already set by React — never load() inside the gesture.
    void video.play().catch(() => {});
  };

  const showCover = inView && !hasFrames;

  return (
    <div ref={rootRef} className={`relative ${wrapperClassName ?? ""}`}>
      {/* Permanent still — visible until real frames (covers black decode) */}
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          decoding="async"
          draggable={false}
          className={`absolute inset-0 z-[2] h-full w-full object-contain transition-opacity duration-200 ${
            hasFrames ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />
      ) : null}

      {inView ? (
        <video
          ref={videoRef}
          key={src}
          src={src}
          poster={poster}
          className={`relative z-[1] ${className ?? "h-full w-full object-contain"}`}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          preload="auto"
          tabIndex={-1}
          aria-hidden={ariaLabel ? undefined : true}
          aria-label={ariaLabel}
        />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          decoding="async"
          draggable={false}
          className={`relative z-[1] ${className ?? "h-full w-full object-contain"}`}
          aria-hidden="true"
        />
      ) : (
        <div
          className={`relative z-[1] ${className ?? "h-full w-full"} bg-slate`}
          aria-hidden="true"
        />
      )}

      {showCover ? (
        <button
          type="button"
          onClick={onTapPlay}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-carbon/45"
          aria-label={
            ariaLabel ? `Reproducir: ${ariaLabel}` : "Reproducir video"
          }
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-sand bg-slate text-sand shadow-[0_0_0_8px_rgba(212,195,179,0.25)]">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5.5v13l11-6.5L8 5.5z" />
            </svg>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-sand">
            Tocá para reproducir
          </span>
        </button>
      ) : null}
    </div>
  );
}
