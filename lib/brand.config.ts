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
  // ⚠️ Confirmar WA real de su IG antes de deploy. Placeholder hasta entonces:
  whatsapp: "54911XXXXXXX",
  /** Pre-filled Spanish text, already URL-encoded for wa.me ?text= */
  whatsappMessage: encodeURIComponent(
    "Hola, vi el prototipo de mi marca y quiero saber más",
  ),
  email: "hola@duopaneles.com.ar",
  phoneDisplay: "11 XXXX-XXXX",
  ctaLabel: "Hablar por WhatsApp",
  /** Tailwind color token used as the brand accent */
  accentToken: "sand",
  logoLightPath: assetPath("/assets/logos/duopaneles-light.png"),
  logoDarkPath: assetPath("/assets/logos/duopaneles-dark.png"),
  socialProofNote: "Representante oficial Arneg · paneles PIR",
} as const;

/** Compatibility aliases — prefer BRAND.* in new code */
export const SITE_NAME = BRAND.name;
export const BRAND_LOGO = BRAND.logoLightPath;
