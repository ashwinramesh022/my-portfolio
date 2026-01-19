"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hoverScale } from "@/lib/motion";

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
}

export function Card({ children, href, className, hover = true }: CardProps) {
  const baseStyles = cn(
    "block bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden",
    hover && "transition-colors duration-200 hover:border-[var(--color-border)]",
    className
  );

  const content = (
    <div className="p-6 md:p-8">{children}</div>
  );

  if (href) {
    return (
      <motion.div
        variants={hover ? hoverScale : undefined}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <Link href={href} className={baseStyles}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return <div className={baseStyles}>{content}</div>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({ children, className, as: Component = "h3" }: CardTitleProps) {
  return (
    <Component className={cn("text-heading-4 text-[var(--color-text-primary)]", className)}>
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-body-sm text-[var(--color-text-muted)] mt-2", className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("text-body-sm text-[var(--color-text-secondary)]", className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-[var(--color-border-subtle)]", className)}>
      {children}
    </div>
  );
}

