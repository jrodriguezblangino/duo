"use client";

import { useRef, type RefObject, type VideoHTMLAttributes } from "react";
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
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...rest
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useBackgroundVideo(videoRef, {
    threshold: playback?.threshold ?? 0.15,
    enabled: playback?.enabled ?? true,
    rootRef: observeRef ?? playback?.rootRef,
  });

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      preload={preload}
      tabIndex={-1}
      aria-hidden={ariaLabel ? undefined : ariaHidden}
      aria-label={ariaLabel}
      {...rest}
    />
  );
}
