import { assetPath } from "@/lib/assetPath";

/** Metallic finish tones for dúoPANELES — no wood-look. */
export type FinishTone = "carbon" | "blanco" | "gris";

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
    src: assetPath("/assets/images/gallery_color_options.webp"),
    objectPosition: "12% 18%",
  },
  {
    key: "blanco",
    label: "Blanco",
    src: assetPath("/assets/images/gallery_color_options.webp"),
    objectPosition: "58% 32%",
  },
  {
    key: "gris",
    label: "Gris",
    src: assetPath("/assets/images/gallery_color_options.webp"),
    objectPosition: "38% 28%",
  },
];
