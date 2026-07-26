"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type PointerEvent,
} from "react";

type SectionLoopVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  wrapperClassName?: string;
  "aria-label"?: string;
};

/**
 * iOS-proof looping section video.
 *
 * Guards:
 * 1) Decoder pool — only the most-visible instance keeps `src`.
 * 2) Black frame after bogus "playing" — overlay stays until timeupdate advances.
 * 3) Video element always mounted; src attached while active+near so tap can
 *    call play() inside the user gesture (requires faststart MP4s).
 * 4) Coarse pointers skip autoplay — always show ▶ until confirmed playback.
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

function isNearViewport(el: Element, marginPx = 40) {
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
  return Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
}

const TAP_QUERY = "(hover: none), (pointer: coarse)";

function subscribeTapQuery(onChange: () => void) {
  const mql = window.matchMedia(TAP_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
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
  const [confirmedPlay, setConfirmedPlay] = useState(false);

  const tapOnly = useSyncExternalStore(
    subscribeTapQuery,
    () => window.matchMedia(TAP_QUERY).matches,
    () => true,
  );

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
      rootMargin: "40px 0px 40px 0px",
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

  const shouldAttach = near && isActive;

  useEffect(() => {
    if (!shouldAttach) setConfirmedPlay(false);
  }, [shouldAttach]);

  useEffect(() => {
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

    if (!shouldAttach) {
      video.pause();
      if (video.getAttribute("src")) {
        video.removeAttribute("src");
        video.load();
      }
      return;
    }

    lock();
    // Don't reload if tap already attached this src (would cancel play())
    if (video.getAttribute("src") !== src) {
      video.setAttribute("src", src);
      video.load();
    }

    const confirm = () => {
      if (!video.paused && video.currentTime > 0.05) setConfirmedPlay(true);
    };

    const onTimeUpdate = () => confirm();
    const onPlaying = () => confirm();
    const onPause = () => setConfirmedPlay(false);
    const onEmptied = () => setConfirmedPlay(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("emptied", onEmptied);

    if (!tapOnly) {
      const tryPlay = () => {
        lock();
        if (video.paused) void video.play().catch(() => {});
      };
      video.addEventListener("loadeddata", tryPlay);
      video.addEventListener("canplay", tryPlay);
      tryPlay();
      const t1 = window.setTimeout(tryPlay, 300);
      const t2 = window.setTimeout(tryPlay, 1000);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        video.removeEventListener("loadeddata", tryPlay);
        video.removeEventListener("canplay", tryPlay);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("playing", onPlaying);
        video.removeEventListener("pause", onPause);
        video.removeEventListener("emptied", onEmptied);
      };
    }

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("emptied", onEmptied);
    };
  }, [shouldAttach, src, tapOnly]);

  const onTapPlay = (e: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>) => {
    // Prefer a single gesture path — ignore the synthetic click after pointerup
    if (e.type === "click" && e.detail === 0) return;
    if ("pointerType" in e && e.type === "pointerup" && e.pointerType === "mouse") {
      return; // mouse uses click
    }

    e.preventDefault();
    e.stopPropagation();
    claimLoop(id);
    setNear(true);
    setIsActive(true);

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    if (video.getAttribute("src") !== src) {
      video.setAttribute("src", src);
      video.load();
    }

    void video.play().catch(() => setConfirmedPlay(false));
  };

  const showTap = near && !confirmedPlay;

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
          className={`absolute inset-0 z-0 h-full w-full object-contain ${
            confirmedPlay ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-slate" aria-hidden="true" />
      )}

      <video
        ref={videoRef}
        poster={poster}
        className={`relative z-[1] ${className ?? "h-full w-full object-contain"} ${
          confirmedPlay ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        controls={false}
        disablePictureInPicture
        preload={shouldAttach ? "auto" : "none"}
        tabIndex={-1}
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
      />

      {showTap ? (
        <button
          type="button"
          onClick={onTapPlay}
          onPointerUp={onTapPlay}
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
