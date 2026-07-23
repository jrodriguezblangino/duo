import ProjectForm from "@/components/ui/ProjectForm";

export default function ConversionSection() {
  return (
    <section
      aria-labelledby="conversion-heading"
      className="px-5 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="conversion-heading"
          className="mb-6 font-headline text-3xl md:text-4xl"
        >
          Diseñamos tu proyecto con precisión.
        </h2>
        <p className="mb-12 text-lg leading-relaxed text-offwhite/70">
          Cuéntanos las dimensiones de tu pared y el estilo que buscas. Nuestro
          equipo prepara tu cotización y el plan de proyecto a medida.
        </p>
        <ProjectForm />
      </div>
    </section>
  );
}
