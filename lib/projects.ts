import { assetPath } from "@/lib/assetPath";

export type ProjectFinish = "blanco" | "carbón" | "gris";

export type Project = {
  id: string;
  title: string;
  location: string;
  m2: number;
  finish: ProjectFinish;
  image: string;
  blurb: string;
  /** Gallery deep-link (placeholder until real case studies exist) */
  href: string;
};

/**
 * Demo projects until real installs are photographed.
 * Replace image paths and copy; keep `id` stable if URLs depend on it.
 * Duo finishes are metallic (blanco / carbón / gris) — no wood-look.
 */
export const PROJECTS: Project[] = [
  {
    id: "demo-nave-industrial",
    title: "Nave industrial",
    location: "Buenos Aires · Obra demostrativa",
    m2: 1800,
    finish: "carbón",
    image: assetPath("/assets/images/project_demo_villa_madera.webp"),
    blurb: "Cubierta y fachada en panel PIR carbón — cierre estanco sin filtraciones.",
    href: "/galeria",
  },
  {
    id: "demo-galpon-blanco",
    title: "Galpón logístico",
    location: "Rosario · Obra demostrativa",
    m2: 2200,
    finish: "blanco",
    image: assetPath("/assets/images/project_demo_townhouse_metal.webp"),
    blurb: "Panel metálico blanco — máxima reflexión lumínica y menor carga térmica.",
    href: "/galeria",
  },
  {
    id: "demo-fachada-gris",
    title: "Fachada institucional",
    location: "Córdoba · Obra demostrativa",
    m2: 420,
    finish: "gris",
    image: assetPath("/assets/images/project_demo_interior_madera.webp"),
    blurb: "Fachada gris sobre muro existente — instalación limpia, sin demolición.",
    href: "/galeria",
  },
  {
    id: "demo-pabellon-metal",
    title: "Pabellón comercial",
    location: "Pilar · Obra demostrativa",
    m2: 220,
    finish: "carbón",
    image: assetPath("/assets/images/project_demo_pavilion_metal.webp"),
    blurb: "Anexo comercial en chapa de acero — durabilidad sin mantenimiento de pintura.",
    href: "/galeria",
  },
];
