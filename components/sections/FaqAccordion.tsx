"use client";

import { useId, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { FAQ_ITEMS } from "@/lib/faq";
import { precision } from "@/lib/motion";

function FaqItemRow({
  item,
  open,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-offwhite/10">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand lg:py-6"
        >
          <span className="font-mono text-xs font-normal tracking-[0.02em] text-offwhite lg:text-[13px]">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={`mt-0.5 shrink-0 font-mono text-sm leading-none text-sand transition-transform duration-200 ${
              open ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={
              reduce
                ? { duration: 0.15 }
                : { height: precision, opacity: { duration: 0.2 } }
            }
            className="overflow-hidden"
          >
            <p className="max-w-measure pb-5 text-sm leading-[1.65] text-offwhite/70 lg:pb-6 lg:text-[15px]">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Client accordion UI — JSON-LD lives in the server FaqSection wrapper. */
export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-4">
        <h2
          id="faq-heading"
          className="font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-offwhite lg:text-6xl"
        >
          Antes de cotizar.
        </h2>
        <p className="mt-5 max-w-measure text-base leading-relaxed text-offwhite/65 lg:text-lg">
          Respuestas cortas sobre instalación, garantía y el sistema de panel.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="lg:col-span-8">
        <div className="border-t border-carbon/10">
          {FAQ_ITEMS.map((item) => (
            <FaqItemRow
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() =>
                setOpenId((current) =>
                  current === item.id ? null : item.id,
                )
              }
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
