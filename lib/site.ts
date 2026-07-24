export const SITE_NAME = "Fill Home";

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tecnologia", label: "Tecnología" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const CTA = {
  label: "Solicitar Cotización",
  href: "/contacto",
} as const;

/** Legacy stamp asset — not used in chrome; kept for reference until a clean mark exists */
export const BRAND_LOGO = "/assets/logos/brand_logo.png";
