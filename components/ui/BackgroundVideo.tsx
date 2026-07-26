"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
  type VideoHTMLAttributes,
} from "react";
import {
  useBackgroundVideo,
  type BackgroundVideoOptions,
} from "@/lib/useBackgroundVideo";

type BackgroundVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "muted" | "controls" | "playsInline"
> & {
  src: string;
  /** Intersection / reduced-motion options */
  playback?: BackgroundVideoOptions;
  /** Observe a parent section instead of the video element */
  observeRef?: RefObject<Element | null>;
  /**
   * Drop src while fully off-screen so iOS can reclaim the hardware decoder.
   */
  detachWhenHidden?: boolean;
};

/**
 * Muted looping background video with iOS-safe autoplay.
 * Always silent, inline, no controls, no PiP.
 */
export default function BackgroundVideo({
  src,
  poster,
  className,
  playback,
  observeRef,
  preload = "auto",
  detachWhenHidden = false,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...rest
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [detached, setDetached] = useState(false);

  const onDetachChange = useCallback((next: boolean) => {
    setDetached(next);
  }, []);

  useBackgroundVideo(videoRef, {
    threshold: playback?.threshold ?? 0.15,
    enabled: playback?.enabled ?? true,
    rootRef: observeRef ?? playback?.rootRef,
    detachWhenHidden,
    onDetachChange: detachWhenHidden ? onDetachChange : undefined,
  });

  // Explicit load() after clearing src — required to free iOS decoders
  useEffect(() => {
    if (!detachWhenHidden) return;
    const video = videoRef.current;
    if (!video || !detached) return;
    video.removeAttribute("src");
    video.load();
  }, [detached, detachWhenHidden]);

  return (
    <video
      ref={videoRef}
      src={detached ? undefined : src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      preload={detached ? "none" : preload}
      tabIndex={-1}
      aria-hidden={ariaLabel ? undefined : ariaHidden}
      aria-label={ariaLabel}
      {...rest}
    />
  );
}
