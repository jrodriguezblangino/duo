"use client";

import { useId, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { HOME_FAQ } from "@/lib/faq";
import { assetPath } from "@/lib/assetPath";
import { precision } from "@/lib/motion";

const PANEL_IMG = assetPath("/assets/images/macro_zoom_quality.webp");

/**
 * FAQ home — numbered rows + left bleed image (comp 10).
 */
export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(HOME_FAQ[0]?.id ?? null);

  return (
    <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="flex flex-col lg:col-span-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sand">
          FAQ
        </p>
        <h2
          id="faq-heading"
          className="mt-4 font-headline text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-offwhite lg:text-6xl"
        >
          Preguntas frecuentes
        </h2>
        <div aria-hidden="true" className="mt-5 h-px w-14 bg-sand" />
        <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-offwhite/60 lg:text-lg">
          Resolvemos las dudas más comunes sobre nuestros paneles, aplicaciones
          e instalación.
        </p>
        <div className="relative mt-10 hidden aspect-[4/3] w-full max-w-sm overflow-hidden bg-slate lg:mt-auto lg:block">
          <Image
            src={PANEL_IMG}
            alt=""
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={0.08} className="lg:col-span-7">
        <div className="border-t border-border">
          {HOME_FAQ.map((item, i) => (
            <FaqRow
              key={item.id}
              index={String(i + 1).padStart(2, "0")}
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

function FaqRow({
  index,
  item,
  open,
  onToggle,
}: {
  index: string;
  item: (typeof HOME_FAQ)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-border">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center gap-5 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand lg:gap-8 lg:py-7"
        >
          <span className="shrink-0 font-headline text-xl text-sand lg:text-2xl">
            {index}
          </span>
          <span className="flex-1 font-headline text-lg font-normal tracking-[-0.01em] text-offwhite lg:text-2xl">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 font-mono text-sand transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
          >
            →
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
            <p className="max-w-measure pb-6 pl-12 text-sm leading-[1.65] text-offwhite/65 lg:pl-16 lg:text-[15px]">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
