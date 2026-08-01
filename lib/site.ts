import { BRAND, BRAND_LOGO, SITE_NAME } from "@/lib/brand.config";

export { BRAND_LOGO, SITE_NAME };

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tecnologia", label: "Tecnología" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const CTA = {
  label: BRAND.ctaLabel,
  href: "/contacto",
} as const;
