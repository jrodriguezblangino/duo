import Reveal from "@/components/ui/Reveal";

const BENEFITS = [
  {
    title: "Sobre paredes existentes",
    description:
      "Los paneles se instalan directamente sobre la superficie actual, sin demolición previa.",
  },
  {
    title: "Rapidez de ejecución",
    description:
      "El sistema de encastre oculto reduce drásticamente los tiempos de obra.",
  },
  {
    title: "Proceso limpio",
    description:
      "Sin escombros, sin polvo y sin interrumpir el uso del espacio durante la renovación.",
  },
];

export default function TransformationSection() {
  return (
    <section
      aria-labelledby="transformacion-heading"
      className="px-5 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <h2
            id="transformacion-heading"
            className="mb-6 font-headline text-3xl md:text-4xl"
          >
            Renovación sin obra pesada.
          </h2>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-offwhite/70">
            Transformar un espacio no debería significar semanas de obra. Fill
            Home se monta sobre lo que ya existe y convierte la renovación en
            un proceso preciso y ordenado.
          </p>
          <ul className="flex flex-col gap-6">
            {BENEFITS.map(({ title, description }) => (
              <li key={title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 h-px w-8 shrink-0 translate-y-2 bg-sand"
                />
                <div>
                  <h3 className="mb-1 font-headline text-lg text-offwhite">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-offwhite/60">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className="aspect-video w-full rounded-sm object-cover"
          >
            <source
              src="/assets/videos/motion_disassembly_components.mp4"
              type="video/mp4"
            />
          </video>
        </Reveal>
      </div>
    </section>
  );
}
