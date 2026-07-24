import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const BASE =
  "inline-flex items-center justify-center rounded-sm font-medium uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-sand text-carbon hover:bg-offwhite",
  outline: "border border-sand text-sand hover:bg-sand hover:text-carbon",
  ghost:
    "relative text-offwhite/80 hover:text-sand after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-sand after:transition-transform after:duration-300 hover:after:scale-x-100",
};

const SIZES: Record<Size, string> = {
  sm: "px-6 py-3 text-sm",
  md: "px-8 py-4 text-sm",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  // Ghost buttons behave like inline text links: no box padding.
  const sizeClasses = variant === "ghost" ? "py-1 text-sm" : SIZES[size];
  const classes = `${BASE} ${VARIANTS[variant]} ${sizeClasses} ${className}`.trim();

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
