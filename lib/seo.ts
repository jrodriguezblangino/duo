import { BRAND } from "@/lib/brand.config";
import { SPECS } from "@/lib/specs";

/**
 * Canonical site origin for metadataBase / absolute OG URLs.
 * Override in deploy with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://duopaneles.com.ar";

export const SITE_DESCRIPTION =
  "Paneles aislantes PIR para techo y fachada: chapa de acero, núcleo con retardo al fuego y encastre oculto. Partner oficial Arneg.";

/** Default social share image — replace public/og.png with final brand art (1200×630). */
export const OG_IMAGE_PATH = "/og.png";

export function buildProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${BRAND.name} Panel PIR`,
    description: SITE_DESCRIPTION,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
    },
    category: "Panel aislante PIR / techo y fachada",
    material: "Chapa de acero, poliisocianurato (PIR), acero galvanizado",
    additionalProperty: SPECS.map(({ label, value }) => ({
      "@type": "PropertyValue",
      name: label,
      value,
    })),
  } as const;
}
