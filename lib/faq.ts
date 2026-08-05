/**
 * FAQ copy — product-system language, no hard-coded client name.
 * Swap answers per brand without touching the accordion UI.
 */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "pir",
    question: "¿Qué es PIR?",
    answer:
      "PIR (poliisocianurato) es el núcleo aislante del panel. Ofrece aislamiento térmico superior, confort acústico y retardo al fuego frente al poliuretano común, en un sistema de chapa de acero calibre #25 con respaldo galvanizado.",
  },
  {
    id: "fuego",
    question: "¿Qué comportamiento tiene frente al fuego?",
    answer:
      "El núcleo de poliisocianurato (PIR) aporta retardo a la propagación del fuego, superior al poliuretano común. La cara de chapa de acero y el respaldo galvanizado no alimentan la combustión. La clasificación exacta depende del sistema y la normativa local; se entrega con la ficha técnica del lote.",
  },
  {
    id: "bim",
    question: "¿Hay biblioteca BIM?",
    answer:
      "Sí. Disponemos de familias y fichas técnicas para modelar paneles de techo y muro en el proyecto. Pedilas por WhatsApp o desde la sección Tecnología.",
  },
  {
    id: "clima",
    question: "¿Resiste sol, lluvia y humedad?",
    answer:
      "Sí. La chapa de acero conformada está pensada para exterior: rechaza agua, mantiene el color frente a UV y no requiere pintura de mantenimiento periódica. Es apto para fachadas y cubiertas expuestas en clima templado y húmedo.",
  },
  {
    id: "muro-existente",
    question: "¿Se puede instalar sobre un muro o revestimiento existente?",
    answer:
      "En la mayoría de los casos sí. El panel se monta sobre la superficie actual (mampostería, revoque o estructura previa) con la subestructura adecuada, sin demolición. Al ser autoportante, reduce la necesidad de cielorrasos y mampuestos. Cada obra se evalúa en cotización.",
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
    id: "dimensiones",
    question: "¿Qué medidas tiene el panel?",
    answer:
      "Las líneas de techo y fachada varían en ancho útil y largo según la aplicación; el sistema es autoportante y permite ahorro de estructura secundaria. Las medidas exactas constan en la ficha técnica de cada línea.",
  },
  {
    id: "colores",
    question: "¿Qué acabados y colores hay?",
    answer:
      "Acabados metálicos (blanco, carbón, gris y variantes) para techo y fachada. La carta completa se comparte en la cotización o en muestra física.",
  },
];

/** Google FAQPage JSON-LD — safe to stringify into a server-rendered script. */
export function buildFaqPageJsonLd(items: FaqItem[] = FAQ_ITEMS) {
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
