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
 * Mobile Composición loops — same contract as Hero (muted / playsInline /
 * autoplay), plus an iOS tap fallback.
 *
 * Intentionally simple: no decoder mutex, no opacity-0 video, no load() inside
 * the tap handler. Those patterns passed desktop/Responsively and failed on
 * real iPhone Safari.
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
  const unlockedRef = useRef(false);

  const [inView, setInView] = useState(false);
  const [showTap, setShowTap] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some(
          (e) => e.isIntersecting && e.intersectionRatio >= 0.12,
        );
        setInView(hit);
      },
      { threshold: [0, 0.12, 0.25, 0.5, 1], rootMargin: "0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setShowTap(false);
      unlockedRef.current = false;
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

    const tryPlay = () => {
      lock();
      if (!video.paused) {
        setShowTap(false);
        return;
      }
      void video.play().then(
        () => setShowTap(false),
        () => setShowTap(true),
      );
    };

    const onPlaying = () => setShowTap(false);
    const onPause = () => {
      // Only re-offer tap if still on screen — avoid fighting scroll-away pause
      if (unlockedRef.current) return;
      if (video.paused) setShowTap(true);
    };
    const onCanPlay = () => {
      if (unlockedRef.current || !video.paused) tryPlay();
    };

    lock();
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", onCanPlay);

    tryPlay();
    const t1 = window.setTimeout(tryPlay, 400);
    const t2 = window.setTimeout(() => {
      if (video.paused) setShowTap(true);
    }, 1000);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", onCanPlay);
      video.pause();
    };
  }, [inView, src]);

  const onTapPlay = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    unlockedRef.current = true;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // Src is already on the element from React — do NOT call load() here
    // (load() cancels the user-gesture unlock on iOS).
    void video.play().then(
      () => setShowTap(false),
      () => setShowTap(true),
    );
  };

  return (
    <div
      ref={rootRef}
      className={`relative ${wrapperClassName ?? ""}`}
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          decoding="async"
          draggable={false}
          className="absolute inset-0 z-0 h-full w-full object-contain"
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
      ) : null}

      {inView && showTap ? (
        <button
          type="button"
          onClick={onTapPlay}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-carbon/50"
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
