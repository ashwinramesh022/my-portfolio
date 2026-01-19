import Link from "next/link";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
  cursorLabel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      cursorLabel,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-[var(--color-text-primary)] text-[var(--color-bg)] hover:bg-[var(--color-text-secondary)]",
      secondary:
        "bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] border border-[var(--color-border)]",
      ghost:
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]",
      outline:
        "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
    };

    const sizes = {
      sm: "text-body-sm px-3 py-1.5 rounded-md gap-1.5",
      md: "text-body-sm px-4 py-2 rounded-lg gap-2",
      lg: "text-body px-6 py-3 rounded-lg gap-2",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link 
          href={href} 
          className={classes}
          data-cursor="link"
          data-cursor-label={cursorLabel}
        >
          {children}
        </Link>
      );
    }

    return (
      <button 
        ref={ref} 
        className={classes} 
        data-cursor="link"
        data-cursor-label={cursorLabel}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

