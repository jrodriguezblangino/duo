/**
 * FAQ copy — product-system language, no hard-coded client name.
 * Swap answers per brand without touching the accordion UI.
 */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

/** Home FAQ set — matches comps (5 topics). */
export const HOME_FAQ: FaqItem[] = [
  {
    id: "pir",
    question: "Qué es PIR",
    answer:
      "PIR (poliisocianurato) es el núcleo aislante del panel. Ofrece aislamiento térmico superior, confort acústico y retardo al fuego frente al poliuretano común, con chapa de acero calibre #25 y respaldo galvanizado.",
  },
  {
    id: "fuego",
    question: "Retardo al fuego",
    answer:
      "El núcleo PIR aporta retardo a la propagación del fuego, superior al poliuretano común. La clasificación exacta depende del sistema y la normativa local; se entrega con la ficha técnica del lote.",
  },
  {
    id: "instalacion",
    question: "Instalación sobre estructura existente",
    answer:
      "En la mayoría de los casos sí. El panel se monta sobre la superficie actual con la subestructura adecuada, sin demolición. Cada obra se evalúa en cotización.",
  },
  {
    id: "espesores",
    question: "Espesores",
    answer:
      "Las líneas de techo y fachada varían según la aplicación. Las medidas exactas constan en la ficha técnica de cada línea.",
  },
  {
    id: "bim",
    question: "Biblioteca BIM",
    answer:
      "Disponemos de familias y fichas técnicas para modelar paneles de techo y muro. Pedilas por WhatsApp o desde Tecnología.",
  },
];

/** Extended FAQ — used if a dedicated FAQ page is added later. */
export const FAQ_ITEMS: FaqItem[] = [
  ...HOME_FAQ,
  {
    id: "clima",
    question: "¿Resiste sol, lluvia y humedad?",
    answer:
      "Sí. La chapa de acero conformada está pensada para exterior: rechaza agua, mantiene el color frente a UV y no requiere pintura de mantenimiento periódica. Es apto para fachadas y cubiertas expuestas en clima templado y húmedo.",
  },
  {
    id: "garantia",
    question: "¿Qué cubre la garantía?",
    answer:
      "Cobertura sobre la estructura del panel y el acabado de cara, según condiciones de instalación y uso. Quedan fuera el daño mecánico, golpes y modificaciones no autorizadas. El detalle contractual acompaña cada pedido.",
  },
  {
    id: "plazo",
    question: "¿Cuál es el plazo de entrega / importación?",
    answer:
      "Depende del stock regional y del volumen. En pedidos de importación el lead time típico ronda varias semanas desde la confirmación; con stock local puede acortarse a días. Confirmamos fecha en la cotización.",
  },
  {
    id: "limpieza",
    question: "¿Cómo se limpia el panel?",
    answer:
      "Agua y detergente neutro, con paño suave. Evitar abrasivos, solventes agresivos e hidrolavado a alta presión sobre las juntas. El mantenimiento periódico es mínimo comparado con pintura o revestimientos porosos.",
  },
  {
    id: "colores",
    question: "¿Qué acabados y colores hay?",
    answer:
      "Acabados metálicos (blanco, carbón, gris y variantes) para techo y fachada. La carta completa se comparte en la cotización o en muestra física.",
  },
];

/** Google FAQPage JSON-LD — safe to stringify into a server-rendered script. */
export function buildFaqPageJsonLd(items: FaqItem[] = HOME_FAQ) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;
}
