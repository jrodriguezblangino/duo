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

function isLooselyVisible(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  // Any overlap with the viewport — iOS chrome collapse makes tight ratios flaky
  return rect.bottom > 24 && rect.top < vh - 24 && rect.width > 0 && rect.height > 0;
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
 * - Unlocks on first user gesture (iOS often needs this after several videos)
 * - Only pauses when fully off-screen (hysteresis)
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

    const target = () => rootRef?.current ?? video;

    const tryPlay = () => {
      if (!enabled) {
        video.pause();
        return;
      }
      lockInlineMuted();
      if (video.paused) {
        const p = video.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            /* Autoplay blocked — caller may show tap fallback */
          });
        }
      }
    };

    const tryPause = () => {
      if (!video.paused) video.pause();
    };

    const sync = () => {
      const el = target();
      if (!el) return;
      if (isLooselyVisible(el)) tryPlay();
      else if (isFullyOffscreen(el)) tryPause();
    };

    lockInlineMuted();

    if (!enabled) {
      tryPause();
      return;
    }

    const io = new IntersectionObserver(
      () => sync(),
      { threshold: [0, 0.01, 0.05, 0.1, 0.25, 0.5, 1], rootMargin: "40px 0px 40px 0px" },
    );

    const observed = target();
    if (observed) io.observe(observed);

    const onVisibility = () => {
      if (document.visibilityState === "visible") sync();
    };

    const onGesture = () => {
      sync();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", sync);
    window.addEventListener("scroll", sync, { passive: true, capture: true });
    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);
    // First user gesture unlocks subsequent muted plays on iOS
    document.addEventListener("touchstart", onGesture, { passive: true });
    document.addEventListener("click", onGesture);

    video.addEventListener("loadeddata", sync);
    video.addEventListener("canplay", sync);
    video.addEventListener("canplaythrough", sync);

    sync();
    requestAnimationFrame(sync);
    const boot = window.setTimeout(sync, 300);
    const boot2 = window.setTimeout(sync, 1000);
    // Keep retrying while visible — iOS often rejects the first play()
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
      document.removeEventListener("touchstart", onGesture);
      document.removeEventListener("click", onGesture);
      video.removeEventListener("loadeddata", sync);
      video.removeEventListener("canplay", sync);
      video.removeEventListener("canplaythrough", sync);
    };
  }, [videoRef, threshold, enabled, rootRef]);
}
