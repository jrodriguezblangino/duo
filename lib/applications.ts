import { assetPath } from "@/lib/assetPath";

export type ApplicationSegment = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  /** Grid span hint for asymmetric bento */
  span: "hero" | "tall" | "wide";
};

/**
 * Three application segments from duopaneles.com.ar.
 * Images are placeholders until real shoot assets land.
 */
export const APPLICATIONS: ApplicationSegment[] = [
  {
    id: "residencial",
    title: "Residencial",
    blurb: "Cubiertas y fachadas con terminación limpia y confort térmico.",
    image: assetPath("/assets/images/project_demo_pavilion_metal.webp"),
    span: "hero",
  },
  {
    id: "agro-industrial",
    title: "Agro e Industrial",
    blurb: "Naves y galpones: velocidad de montaje y aislamiento continuo.",
    image: assetPath("/assets/images/project_demo_townhouse_metal.webp"),
    span: "tall",
  },
  {
    id: "comercial-institucional",
    title: "Comercial e Institucional",
    blurb: "Cierres de obra pública y privada con durabilidad de acero.",
    image: assetPath("/assets/images/project_demo_villa_before.webp"),
    span: "wide",
  },
];
