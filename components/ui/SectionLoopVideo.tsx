"use client";

import { useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";

type SectionLoopVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  wrapperClassName?: string;
  "aria-label"?: string;
};

/**
 * iOS keeps a tiny pool of hardware video decoders. Multiple <video>
 * elements with src attached (even paused) exhaust it — playback then
 * stalls as a black frame with the poster already dismissed.
 *
 * This component:
 * - Keeps a permanent poster <img> underneath
 * - Mounts <video src> only while near the viewport AND holding the page lock
 * - Fully unmounts when far (frees the decoder)
 * - Shows an unmistakable ▶ until `playing` is confirmed
 * - Shares a one-at-a-time lock across instances on the page
 */

let activeLoopId: string | null = null;
const loopListeners = new Set<() => void>();

function claimLoop(id: string) {
  if (activeLoopId === id) return;
  activeLoopId = id;
  loopListeners.forEach((fn) => fn());
}

function releaseLoop(id: string) {
  if (activeLoopId !== id) return;
  activeLoopId = null;
  loopListeners.forEach((fn) => fn());
}

function isNearViewport(el: Element, marginPx = 80) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return (
    rect.bottom > -marginPx &&
    rect.top < vh + marginPx &&
    rect.width > 0 &&
    rect.height > 0
  );
}

function visibilityScore(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  return Math.max(0, visible);
}

export default function SectionLoopVideo({
  src,
  poster,
  className,
  wrapperClassName,
  "aria-label": ariaLabel,
}: SectionLoopVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const id = useId();

  const [near, setNear] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const sync = () => setIsActive(activeLoopId === id);
    sync();
    loopListeners.add(sync);
    return () => {
      loopListeners.delete(sync);
      releaseLoop(id);
    };
  }, [id]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sync = () => {
      const next = isNearViewport(root);
      setNear(next);
      if (!next) {
        releaseLoop(id);
        return;
      }
      // Prefer the most-visible looping section video
      let bestId = id;
      let bestScore = visibilityScore(root);
      document.querySelectorAll("[data-section-loop]").forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        const otherId = node.dataset.sectionLoop;
        if (!otherId || otherId === id) return;
        const score = visibilityScore(node);
        if (score > bestScore) {
          bestScore = score;
          bestId = otherId;
        }
      });
      claimLoop(bestId);
    };

    const io = new IntersectionObserver(() => sync(), {
      threshold: [0, 0.01, 0.1, 0.25, 0.5, 1],
      rootMargin: "80px 0px 80px 0px",
    });
    io.observe(root);

    window.addEventListener("scroll", sync, { passive: true, capture: true });
    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    sync();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", sync, true);
      window.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      releaseLoop(id);
    };
  }, [id]);

  const shouldMount = near && isActive;

  useEffect(() => {
    if (!shouldMount) setIsPlaying(false);
  }, [shouldMount]);

  useEffect(() => {
    if (!shouldMount) return;
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
      if (video.paused) {
        void video.play().catch(() => setIsPlaying(false));
      }
    };

    const onPlaying = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => {
      if (video.currentTime < 0.05) setIsPlaying(false);
    };

    lock();
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("touchstart", tryPlay, { passive: true });
    document.addEventListener("click", tryPlay);

    tryPlay();
    const boot = window.setTimeout(tryPlay, 250);
    const boot2 = window.setTimeout(tryPlay, 900);

    return () => {
      window.clearTimeout(boot);
      window.clearTimeout(boot2);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
      video.pause();
    };
  }, [shouldMount, src]);

  const onTapPlay = () => {
    // Mount + claim synchronously so play() stays inside the user gesture on iOS
    flushSync(() => {
      claimLoop(id);
      setNear(true);
      setIsActive(true);
    });
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    void video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const showTap = near && !isPlaying;

  return (
    <div
      ref={rootRef}
      data-section-loop={id}
      className={`relative ${wrapperClassName ?? ""}`}
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          decoding="async"
          draggable={false}
          className={`absolute inset-0 z-0 h-full w-full object-contain transition-opacity duration-300 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-slate" aria-hidden="true" />
      )}

      {shouldMount ? (
        <video
          ref={videoRef}
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

      {showTap ? (
        <button
          type="button"
          onClick={onTapPlay}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-carbon/45"
          aria-label={
            ariaLabel ? `Reproducir: ${ariaLabel}` : "Reproducir video"
          }
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-sand bg-slate text-sand shadow-[0_0_0_8px_rgba(212,195,179,0.22)]">
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
