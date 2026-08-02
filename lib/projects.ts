import { assetPath } from "@/lib/assetPath";

export type ProjectFinish = "madera" | "metálico";

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
 */
export const PROJECTS: Project[] = [
  {
    id: "demo-villa-madera",
    title: "Casa de country",
    location: "Pilar · Obra demostrativa",
    m2: 180,
    finish: "madera",
    image: assetPath("/assets/images/project_demo_villa_madera.webp"),
    blurb: "Fachada completa en wood-look — misma geometría de panel, lectura de madera.",
    href: "/galeria",
  },
  {
    id: "demo-townhouse-metal",
    title: "Casa urbana",
    location: "Buenos Aires · Obra demostrativa",
    m2: 95,
    finish: "metálico",
    image: assetPath("/assets/images/project_demo_townhouse_metal.webp"),
    blurb: "Volumen contemporáneo en acabado metálico carbón, juntas ocultas.",
    href: "/galeria",
  },
  {
    id: "demo-interior-madera",
    title: "Muro interior",
    location: "Córdoba · Obra demostrativa",
    m2: 42,
    finish: "madera",
    image: assetPath("/assets/images/project_demo_interior_madera.webp"),
    blurb: "Pared acento en nogal wood-look — instalación limpia sobre existente.",
    href: "/galeria",
  },
  {
    id: "demo-pavilion-metal",
    title: "Pabellón comercial",
    location: "Rosario · Obra demostrativa",
    m2: 220,
    finish: "metálico",
    image: assetPath("/assets/images/project_demo_pavilion_metal.webp"),
    blurb: "Anexo comercial en aluminio anodizado — durabilidad sin mantenimiento de pintura.",
    href: "/galeria",
  },
];
