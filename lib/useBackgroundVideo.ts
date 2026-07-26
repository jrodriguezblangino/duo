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

/**
 * Production autoplay for muted looping background videos.
 *
 * iOS Safari / Chrome require the muted + playsInline *properties* (not just
 * attributes) before play(), and reject autoplay when an audio track is present
 * unless muted is locked in early. This hook:
 * - forces muted / defaultMuted / playsInline
 * - plays on intersection, pauses when off-screen
 * - retries on visibility / pageshow (bfcache)
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

    const tryPlay = () => {
      if (!enabled) {
        video.pause();
        return;
      }
      lockInlineMuted();
      if (video.paused) {
        void video.play().catch(() => {
          /* Autoplay may still fail under Low Power Mode — poster remains. */
        });
      }
    };

    const tryPause = () => {
      if (!video.paused) video.pause();
    };

    lockInlineMuted();

    if (!enabled) {
      tryPause();
      return;
    }

    let intersecting = false;

    const observeTarget = rootRef?.current ?? video;
    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting =
          entry.isIntersecting &&
          entry.intersectionRatio >= Math.min(threshold, 0.05);
        if (intersecting) {
          tryPlay();
        } else {
          tryPause();
        }
      },
      { threshold: [0, 0.05, threshold, 0.5, 1] },
    );
    io.observe(observeTarget);

    const onVisibility = () => {
      if (document.visibilityState === "visible" && intersecting) tryPlay();
    };
    const onPageShow = () => {
      if (intersecting) tryPlay();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);

    const ready = () => {
      if (intersecting) tryPlay();
    };
    video.addEventListener("loadeddata", ready);
    video.addEventListener("canplay", ready);

    /* Sync once in case the observer callback is delayed a frame */
    requestAnimationFrame(() => {
      const rect = observeTarget.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom > 0 && rect.top < vh) {
        intersecting = true;
        tryPlay();
      }
    });

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      video.removeEventListener("loadeddata", ready);
      video.removeEventListener("canplay", ready);
    };
  }, [videoRef, threshold, enabled, rootRef]);
}
