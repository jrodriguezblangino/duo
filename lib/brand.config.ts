import { assetPath } from "@/lib/assetPath";

/**
 * Single source of brand identity. Swap this object per client
 * without rewriting components.
 */
export const BRAND = {
  name: "Fill Home",
  legalName: "Fill Home",
  /** One-line brand promise */
  tagline: "Calidez de madera. Resistencia de metal.",
  /** International digits only — no + or spaces (wa.me) */
  whatsapp: "5491100000000",
  /** Pre-filled Spanish text, already URL-encoded for wa.me ?text= */
  whatsappMessage: encodeURIComponent(
    "Hola, me interesa cotizar revestimiento metálico Fill Home.",
  ),
  email: "hola@fillhome.com",
  phoneDisplay: "+54 11 0000-0000",
  ctaLabel: "Solicitar Cotización",
  /** Tailwind color token used as the brand accent */
  accentToken: "sand",
  logoLightPath: assetPath("/assets/logos/brand_logo.png"),
  logoDarkPath: assetPath("/assets/logos/brand_logo.png"),
  socialProofNote:
    "Para importadores y distribuidores de revestimiento metálico.",
} as const;

/** Compatibility aliases — prefer BRAND.* in new code */
export const SITE_NAME = BRAND.name;
export const BRAND_LOGO = BRAND.logoLightPath;
