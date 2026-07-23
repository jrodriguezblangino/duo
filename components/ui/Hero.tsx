import Button from "@/components/ui/Button";

type HeroProps = {
  headline: string;
  subheadline?: string;
  cta?: {
    label: string;
    href: string;
  };
  videoSrc: string;
  poster?: string;
};

export default function Hero({
  headline,
  subheadline,
  cta,
  videoSrc,
  poster,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[90vh] items-center overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-carbon/95 via-carbon/70 to-carbon/30"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-10">
        <div className="flex max-w-3xl flex-col items-start gap-8 py-24">
          <h1
            id="hero-heading"
            className="fade-in-up font-headline text-4xl leading-tight md:text-6xl"
          >
            {headline}
          </h1>
          {subheadline && (
            <p className="fade-in-up fade-delay-150 max-w-2xl text-lg leading-relaxed text-offwhite/80 md:text-xl">
              {subheadline}
            </p>
          )}
          {cta && (
            <Button
              href={cta.href}
              variant="primary"
              size="md"
              className="fade-in-up fade-delay-300"
            >
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
