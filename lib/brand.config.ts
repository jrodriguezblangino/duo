import { assetPath } from "@/lib/assetPath";

/**
 * Single source of brand identity. Swap this object per client
 * without rewriting components.
 */
export const BRAND = {
  name: "dúoPANELES",
  legalName: "dúoPANELES",
  /** One-line brand promise */
  tagline: "Sistema constructivo PIR — techo y fachada",
  /** International digits only — no + or spaces (wa.me) */
  whatsapp: "5491164594688",
  /** Pre-filled Spanish text, already URL-encoded for wa.me ?text= */
  whatsappMessage: encodeURIComponent(
    "Hola, vi el prototipo de mi marca y quiero saber más",
  ),
  email: "hola@duopaneles.com.ar",
  phoneDisplay: "11 6459-4688",
  ctaLabel: "Hablar por WhatsApp",
  /** Tailwind color token used as the brand accent (hex = mint §0) */
  accentToken: "sand",
  logoLightPath: assetPath("/assets/logos/duo.png"),
  logoDarkPath: assetPath("/assets/logos/duo.png"),
  socialProofNote: "Partner oficial Arneg · +3.000 proyectos",
} as const;

/** Compatibility aliases — prefer BRAND.* in new code */
export const SITE_NAME = BRAND.name;
export const BRAND_LOGO = BRAND.logoLightPath;
