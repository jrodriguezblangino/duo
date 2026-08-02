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
    id: "fuego",
    question: "¿Qué comportamiento tiene frente al fuego?",
    answer:
      "La cara de aluminio y el respaldo de acero no alimentan la combustión como la madera o muchos revestimientos plásticos. La clasificación exacta depende del sistema de montaje y de la normativa local — se entrega con la ficha técnica del lote.",
  },
  {
    id: "clima",
    question: "¿Resiste sol, lluvia y humedad?",
    answer:
      "Sí. La cara anodizada está pensada para exterior: rechaza agua, mantiene el color frente a UV y no requiere barniz ni repintado periódico. Es apto para fachadas expuestas en clima templado y húmedo.",
  },
  {
    id: "muro-existente",
    question: "¿Se puede instalar sobre un muro o revestimiento existente?",
    answer:
      "En la mayoría de los casos sí. El sistema se monta sobre la superficie actual (mampostería, revoque o revestimiento previo) con subestructura adecuada, sin demolición estructural. Cada obra se evalúa en cotización.",
  },
  {
    id: "garantia",
    question: "¿Qué cubre la garantía?",
    answer:
      "Cobertura de 15 años sobre la estructura del panel y el acabado de cara, según condiciones de instalación y uso. Quedan fuera el daño mecánico, golpes y modificaciones no autorizadas. El detalle contractual acompaña cada pedido.",
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
      "Agua y detergente neutro, con paño suave. Evitar abrasivos, solventes agresivos y hidrolavado a alta presión sobre las juntas. El mantenimiento periódico es mínimo comparado con madera o pintura.",
  },
  {
    id: "dimensiones",
    question: "¿Qué medidas tiene el panel?",
    answer:
      "El módulo de cobertura de referencia es 1,5 m² por panel (útil para estimar cantidad). Cara de aluminio anodizado de 0,6 mm; largo y ancho exactos constan en la ficha técnica del sistema.",
  },
  {
    id: "colores",
    question: "¿Qué acabados y colores hay?",
    answer:
      "Misma geometría de panel en dos familias: wood-look (tonos tipo roble, nogal y similares) y metálico (carbón, aluminio y variantes anodizadas). La carta completa se comparte en la cotización o en muestra física.",
  },
];
