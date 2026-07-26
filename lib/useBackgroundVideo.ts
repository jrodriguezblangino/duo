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
};

function isInViewport(el: Element, minRatio: number) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  const visibleH = Math.max(
    0,
    Math.min(rect.bottom, vh) - Math.max(rect.top, 0),
  );
  const visibleW = Math.max(
    0,
    Math.min(rect.right, vw) - Math.max(rect.left, 0),
  );
  if (rect.height <= 0 || rect.width <= 0) return false;
  const ratio = (visibleH * visibleW) / (rect.height * rect.width);
  return ratio >= minRatio || (rect.top < vh && rect.bottom > 0 && visibleH > 32);
}

/**
 * Production autoplay for muted looping background videos.
 *
 * iOS Safari needs muted + playsInline *properties* locked before play().
 * IntersectionObserver alone is unreliable when the <video> sits under a
 * CSS-transformed parallax layer — we observe a stable root when provided
 * and also re-check on scroll/resize/visualViewport as a fallback.
 */
export function useBackgroundVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  {
    threshold = 0.15,
    enabled = true,
    rootRef,
  }: BackgroundVideoOptions = {},
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const lockInlineMuted = () => {
      video.muted = true;
      video.defaultMuted = true;
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

    const target = () => rootRef?.current ?? video;

    let didKickLoad = false;

    const tryPlay = () => {
      if (!enabled) {
        video.pause();
        return;
      }
      lockInlineMuted();
      if (video.readyState < 2 && !didKickLoad) {
        didKickLoad = true;
        try {
          video.load();
        } catch {
          /* ignore */
        }
      }
      if (video.paused) {
        void video.play().catch(() => {
          /* Low Power Mode may still block — poster remains. */
        });
      }
    };

    const tryPause = () => {
      if (!video.paused) video.pause();
    };

    const sync = () => {
      const el = target();
      if (!el) return;
      if (isInViewport(el, Math.min(threshold, 0.1))) tryPlay();
      else tryPause();
    };

    lockInlineMuted();

    if (!enabled) {
      tryPause();
      return;
    }

    const io = new IntersectionObserver(
      () => sync(),
      { threshold: [0, 0.05, 0.1, 0.25, 0.5, 1] },
    );

    const observed = target();
    if (observed) io.observe(observed);

    const onVisibility = () => {
      if (document.visibilityState === "visible") sync();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", sync);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);

    video.addEventListener("loadeddata", sync);
    video.addEventListener("canplay", sync);

    sync();
    requestAnimationFrame(sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", sync);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
      video.removeEventListener("loadeddata", sync);
      video.removeEventListener("canplay", sync);
    };
  }, [videoRef, threshold, enabled, rootRef]);
}
