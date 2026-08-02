import { BRAND } from "@/lib/brand.config";
import { SPECS } from "@/lib/specs";

/**
 * Canonical site origin for metadataBase / absolute OG URLs.
 * Override in deploy with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://fillhome.com";

export const SITE_DESCRIPTION =
  "Paneles de revestimiento madera-look sobre núcleo de poliuretano y respaldo de acero. Ingeniería de tres capas para proyectos exigentes.";

/** Default social share image — replace public/og.png with final brand art (1200×630). */
export const OG_IMAGE_PATH = "/og.png";

export function buildProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${BRAND.name} Metal Siding`,
    description: SITE_DESCRIPTION,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
    },
    category: "Revestimiento metálico / metal siding",
    material: "Aluminio anodizado, poliuretano de alta densidad, acero galvanizado",
    additionalProperty: SPECS.map(({ label, value }) => ({
      "@type": "PropertyValue",
      name: label,
      value,
    })),
  } as const;
}
