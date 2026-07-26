"use client";

import { useEffect, type RefObject } from "react";

export type BackgroundVideoOptions = {
  /** Play when this fraction of the element is visible (0–1). Default 0.15 */
  threshold?: number;
  /** When false, pause and do not attempt autoplay. */
  enabled?: boolean;
  /**
   * Observe this element for visibility instead of the video.
   * Useful when the video sits under overlays / parallax wrappers.
   */
  rootRef?: RefObject<Element | null>;
  /**
   * When fully off-screen, ask the caller to drop `src` (frees iOS decoders).
   */
  detachWhenHidden?: boolean;
  onDetachChange?: (detached: boolean) => void;
};

function isLooselyVisible(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return (
    rect.bottom > 24 &&
    rect.top < vh - 24 &&
    rect.width > 0 &&
    rect.height > 0
  );
}

function isFullyOffscreen(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom < 0 || rect.top > vh;
}

/**
 * Production autoplay for muted looping background videos on iOS Safari.
 *
 * - Locks muted + playsInline before every play()
 * - Retries on scroll / visualViewport / interval while visible
 * - Unlocks on first user gesture
 * - Only pauses when fully off-screen (hysteresis)
 * - Optional detachWhenHidden notifies caller to drop src (decoder release)
 */
export function useBackgroundVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  {
    threshold = 0.15,
    enabled = true,
    rootRef,
    detachWhenHidden = false,
    onDetachChange,
  }: BackgroundVideoOptions = {},
) {
  useEffect(() => {
    const target = () => rootRef?.current ?? videoRef.current;
    if (!target()) return;

    let detached = false;

    const lockInlineMuted = (video: HTMLVideoElement) => {
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

    const setDetached = (next: boolean) => {
      if (!detachWhenHidden) return;
      if (detached === next) return;
      detached = next;
      onDetachChange?.(next);
    };

    const tryPlay = () => {
      const video = videoRef.current;
      if (!video || !enabled || detached) return;
      lockInlineMuted(video);
      if (video.paused) {
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    };

    const tryPause = () => {
      const video = videoRef.current;
      if (video && !video.paused) video.pause();
    };

    const sync = () => {
      const el = target();
      if (!el) return;

      if (!enabled) {
        tryPause();
        return;
      }

      if (isLooselyVisible(el)) {
        setDetached(false);
        // src may reattach on next React commit — retry shortly
        tryPlay();
        window.setTimeout(tryPlay, 50);
        window.setTimeout(tryPlay, 200);
      } else if (isFullyOffscreen(el)) {
        tryPause();
        setDetached(true);
      }
    };

    const io = new IntersectionObserver(() => sync(), {
      threshold: [0, 0.01, 0.05, 0.1, 0.25, 0.5, 1],
      rootMargin: "40px 0px 40px 0px",
    });

    const observed = target();
    if (observed) io.observe(observed);

    const onVisibility = () => {
      if (document.visibilityState === "visible") sync();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", sync);
    window.addEventListener("scroll", sync, { passive: true, capture: true });
    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);
    document.addEventListener("touchstart", sync, { passive: true });
    document.addEventListener("click", sync);

    const video = videoRef.current;
    if (video) {
      lockInlineMuted(video);
      video.addEventListener("loadeddata", sync);
      video.addEventListener("canplay", sync);
      video.addEventListener("canplaythrough", sync);
    }

    sync();
    requestAnimationFrame(sync);
    const boot = window.setTimeout(sync, 300);
    const boot2 = window.setTimeout(sync, 1000);
    const interval = window.setInterval(sync, 750);

    return () => {
      io.disconnect();
      window.clearTimeout(boot);
      window.clearTimeout(boot2);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", sync);
      window.removeEventListener("scroll", sync, true);
      window.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
      document.removeEventListener("touchstart", sync);
      document.removeEventListener("click", sync);
      const v = videoRef.current;
      if (v) {
        v.removeEventListener("loadeddata", sync);
        v.removeEventListener("canplay", sync);
        v.removeEventListener("canplaythrough", sync);
      }
    };
  }, [videoRef, threshold, enabled, rootRef, detachWhenHidden, onDetachChange]);
}
