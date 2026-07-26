import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-sm border border-border bg-surface p-8 transition-colors hover:border-sand/60">
      <span aria-hidden="true" className="text-sand">
        {icon}
      </span>
      <h3 className="font-headline text-xl text-offwhite">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </article>
  );
}
