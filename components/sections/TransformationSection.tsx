"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { glide } from "@/lib/motion";

const BENEFITS = [
  {
    index: "01",
    title: "Sobre muro existente",
    description:
      "Instalación directa sobre la superficie actual — sin demolición previa.",
  },
  {
    index: "02",
    title: "Encastre oculto",
    description:
      "Junta mecánica sin tornillos a la vista; tiempos de obra reducidos.",
  },
  {
    index: "03",
    title: "Obra limpia",
    description:
      "Sin escombros ni polvo estructural; el espacio sigue en uso.",
  },
];

const CAPTION_CLASS =
  "mt-2 font-mono text-[11px] tracking-[0.05em] text-[#7A6756] lg:text-xs";

function BenefitList() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ul className="flex flex-col gap-11">
      {BENEFITS.map(({ index, title, description }, i) => (
        <motion.li
          key={title}
          className="grid grid-cols-[2.25rem_1fr] items-start gap-x-4"
          initial={
            prefersReducedMotion ? false : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -24px 0px" }}
          transition={{
            ...glide,
            delay: prefersReducedMotion ? 0 : i * 0.13,
          }}
        >
          <span
            aria-hidden="true"
            className="pt-0.5 font-mono text-sm font-medium leading-none tracking-tight text-sand lg:text-base"
          >
            {index}
          </span>
          <div>
            <h3 className="mb-1.5 font-headline text-lg font-normal leading-snug tracking-[-0.01em] text-carbon lg:text-xl">
              <span className="sr-only">{index} · </span>
              {title}
            </h3>
            <p className="max-w-[42ch] text-sm leading-relaxed text-carbon/65">
              {description}
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

export default function TransformationSection() {
  return (
    <section
      aria-labelledby="transformacion-heading"
      className="bg-offwhite px-6 py-24 text-carbon lg:px-20 lg:py-section"
    >
      <div className="mx-auto grid max-w-site items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#7A6756] lg:text-[13px]">
              <span
                aria-hidden="true"
                className="h-px w-4 shrink-0 bg-sand"
              />
              Instalación
            </p>
            <h2
              id="transformacion-heading"
              className="mb-6 font-headline text-[2.95rem] font-normal leading-[0.98] tracking-[-0.02em] text-carbon lg:text-[3.5rem] xl:text-[4.25rem]"
            >
              Renovación sin obra pesada.
            </h2>
            <p className="mb-10 max-w-[52ch] text-base leading-[1.6] text-[#2E2A26] lg:text-[17px]">
              El panel se monta sobre lo existente. El proceso es de ensamble,
              no de demolición.
            </p>
          </Reveal>
          <BenefitList />
        </div>

        <div className="flex flex-col gap-8 lg:col-span-7">
          <Reveal delay={0.08}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
              className="aspect-video w-full object-cover"
            >
              <source
                src="/assets/videos/motion_disassembly_components.mp4"
                type="video/mp4"
              />
            </video>
            <p className={CAPTION_CLASS}>
              Desmontaje de capas — ensamble mecánico
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-carbon/5">
              <Image
                src="/assets/images/durability_water_drops_still.png"
                alt="Gotas de agua sobre la cara anodizada del panel"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className={CAPTION_CLASS}>
              Cara anodizada — rechazo de agua
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
