import type { Metadata } from "next";
import Image from "next/image";
import Magnetic from "@/components/ui/Magnetic";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import ProjectForm from "@/components/ui/ProjectForm";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand.config";
import { assetPath } from "@/lib/assetPath";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cotizá tu proyecto: tipo de obra, m², plazo y WhatsApp. dúoPANELES.",
};

const CHANNELS = [
  {
    id: "wa",
    label: "WhatsApp",
    value: BRAND.phoneDisplay,
    href: `https://wa.me/${BRAND.whatsapp}?text=${BRAND.whatsappMessage}`,
  },
  {
    id: "email",
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    id: "ig",
    label: "Instagram",
    value: "@duopaneles",
    href: "https://instagram.com/duopaneles",
  },
] as const;

/**
 * /contacto — aligned to docs/comps/duo-contacto/
 * Dark hero + form + channel rows. Form fields include proyecto / m² / plazo.
 */
export default function ContactoPage() {
  return (
    <>
      <section
        aria-labelledby="contacto-heading"
        className="relative min-h-[70dvh] overflow-hidden bg-carbon text-offwhite lg:min-h-[75dvh]"
      >
        <Image
          src={assetPath("/assets/images/project_demo_townhouse_metal.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/85 to-carbon/50"
        />
        <div className="relative z-10 flex min-h-[70dvh] flex-col justify-end px-6 pb-16 pt-32 lg:min-h-[75dvh] lg:px-20 lg:pb-24">
          <Reveal className="max-w-[28ch]">
            <h1
              id="contacto-heading"
              className="font-headline text-[3rem] font-normal leading-[0.95] tracking-[-0.02em] lg:text-[4.5rem]"
            >
              Contacto.
            </h1>
            <p className="mt-5 text-base text-offwhite/65 lg:text-lg">
              Hablemos de tu proyecto.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-offwhite/50">
              {BRAND.email} · {BRAND.phoneDisplay}
            </p>
            <div className="mt-8">
              <Magnetic strength={12}>
                <WhatsAppCTA size="md" className="active:scale-[0.98]" />
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="cotizacion-heading"
        className="bg-carbon px-6 py-section-mobile text-offwhite lg:px-20 lg:py-section"
      >
        <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2
              id="cotizacion-heading"
              className="font-headline text-[2.25rem] font-normal tracking-[-0.02em] lg:text-[3rem]"
            >
              Cotización.
            </h2>
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-offwhite/55">
              Tipo de proyecto, superficie aproximada y plazo. Respondemos con
              cotización y cantidad de paneles.
            </p>
          </Reveal>
          <Reveal delay={STAGGER} className="lg:col-span-8">
            <ProjectForm tone="dark" />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="canales-heading"
        className="bg-carbon px-6 pb-section-mobile text-offwhite lg:px-20 lg:pb-section"
      >
        <div className="mx-auto max-w-site">
          <h2 id="canales-heading" className="sr-only">
            Canales de contacto
          </h2>
          <ul className="border-t border-border">
            {CHANNELS.map((channel, i) => (
              <li key={channel.id} className="border-b border-border">
                <Reveal delay={STAGGER * (i + 1)}>
                  <a
                    href={channel.href}
                    target={channel.id === "email" ? undefined : "_blank"}
                    rel={
                      channel.id === "email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="flex items-center justify-between gap-6 py-6 transition-colors hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand lg:py-8"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-offwhite/45">
                      {channel.label}
                    </span>
                    <span className="font-headline text-lg tracking-[-0.01em] text-offwhite lg:text-2xl">
                      {channel.value}
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
