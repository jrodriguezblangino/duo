import Image from "next/image";
import type { ReactNode } from "react";

type CroppedPanelImageProps = {
  src: string;
  alt: string;
  /** Frame aspect — height only; width from parent */
  aspectClass?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
  /**
   * Fraction of source width that holds panel content (rest is black void).
   * Matches StyleToggle default of 0.7; lower = tighter crop.
   */
  contentRight?: number;
};

export default function CroppedPanelImage({
  src,
  alt,
  aspectClass = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 58vw, 100vw",
  priority = false,
  className = "",
  children,
  contentRight = 0.7,
}: CroppedPanelImageProps) {
  const cropWidth = `${100 / contentRight}%`;

  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-offwhite/[0.08] bg-carbon ${aspectClass} ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-0 top-1/2 aspect-square -translate-y-1/2"
          style={{ width: cropWidth }}
        >
          <Image
            src={src}
            alt={children ? "" : alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </div>
      </div>
      {children}
      {children ? <span className="sr-only">{alt}</span> : null}
    </div>
  );
}
