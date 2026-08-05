/**
 * Product lines from duopaneles.com.ar — techo + muro.
 * Do not invent SKUs beyond this list.
 */

export type ProductLine = {
  id: string;
  name: string;
  application: "techo" | "muro";
  blurb: string;
};

export const TECHO_LINES: ProductLine[] = [
  {
    id: "wave-ls",
    name: "WAVE LS",
    application: "techo",
    blurb: "Línea de cubierta con perfil WAVE.",
  },
  {
    id: "cover-ls",
    name: "COVER LS",
    application: "techo",
    blurb: "Línea de cubierta COVER LS.",
  },
  {
    id: "cover-lt",
    name: "COVER LT",
    application: "techo",
    blurb: "Línea de cubierta COVER LT.",
  },
  {
    id: "cover-lx",
    name: "COVER LX",
    application: "techo",
    blurb: "Línea de cubierta COVER LX.",
  },
  {
    id: "maximma",
    name: "MAXIMMA",
    application: "techo",
    blurb: "Línea de cubierta MAXIMMA.",
  },
];

export const MURO_LINES: ProductLine[] = [
  {
    id: "fachada-pir",
    name: "Panel de fachada PIR",
    application: "muro",
    blurb: "Cierre de muro con aislamiento PIR integrado.",
  },
];

export const PRODUCT_LINES = [...TECHO_LINES, ...MURO_LINES] as const;
