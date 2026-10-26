import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ActionLink({ children, className, variant = "primary", ...props }: ActionLinkProps) {
  const variantClasses =
    variant === "primary"
      ? "border-[var(--bm-brand)] bg-[var(--bm-brand)] text-white hover:border-[var(--bm-brand-strong)] hover:bg-[var(--bm-brand-strong)]"
      : "border-[var(--bm-border-strong)] bg-white text-[var(--bm-text)] hover:border-[var(--bm-text)] hover:bg-[var(--bm-surface-subtle)]";

  const classes = [
    "inline-flex min-h-[var(--bm-control-height)] items-center justify-center gap-2 rounded-[var(--bm-radius-control)] border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
    variantClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} {...props}>
      {children}
      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
    </a>
  );
}
