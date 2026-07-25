import { assetPath } from "@/lib/assetPath";

/** Finish tones cropped from existing product photography (no invented hex fills). */
export type FinishTone = "carbon" | "roble" | "aluminio" | "nogal";

export const FINISH_TONES: {
  key: FinishTone;
  label: string;
  /** Source product still */
  src: string;
  /** CSS object-position to isolate a finish from the multi-sample plate */
  objectPosition: string;
}[] = [
  {
    key: "carbon",
    label: "Carbón",
    src: assetPath("/assets/images/gallery_color_options.png"),
    objectPosition: "12% 18%",
  },
  {
    key: "roble",
    label: "Roble",
    src: assetPath("/assets/images/gallery_color_options.png"),
    objectPosition: "38% 28%",
  },
  {
    key: "aluminio",
    label: "Aluminio",
    src: assetPath("/assets/images/gallery_color_options.png"),
    objectPosition: "58% 32%",
  },
  {
    key: "nogal",
    label: "Nogal",
    src: assetPath("/assets/images/gallery_color_options.png"),
    objectPosition: "78% 42%",
  },
];
