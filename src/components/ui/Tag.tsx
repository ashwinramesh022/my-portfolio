import Link from "next/link";
import { cn, getTagColorClass } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ children, href, active, onClick, className }: TagProps) {
  // Get color class based on tag text
  const tagText = typeof children === "string" ? children : "";
  const colorClass = active ? "" : getTagColorClass(tagText);
  
  const baseStyles = cn(
    "inline-flex items-center text-caption px-2.5 py-1 rounded-full transition-colors duration-200",
    active
      ? "bg-[var(--color-text-primary)] text-[var(--color-bg)]"
      : colorClass || "bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={baseStyles}>
        {children}
      </button>
    );
  }

  return <span className={baseStyles}>{children}</span>;
}

