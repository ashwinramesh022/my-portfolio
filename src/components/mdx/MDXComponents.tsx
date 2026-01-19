import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Custom components for MDX content
export const mdxComponents = {
  // Headings with anchor links
  h1: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 id={id} className="text-heading-1 scroll-mt-24" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id} className="text-heading-2 scroll-mt-24" {...props}>
      <a href={`#${id}`} className="no-underline hover:underline">
        {children}
      </a>
    </h2>
  ),
  h3: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={id} className="text-heading-3 scroll-mt-24" {...props}>
      <a href={`#${id}`} className="no-underline hover:underline">
        {children}
      </a>
    </h3>
  ),
  h4: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 id={id} className="text-heading-4 scroll-mt-24" {...props}>
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-body-lg leading-relaxed" {...props}>
      {children}
    </p>
  ),

  // Links
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-primary)] underline underline-offset-4 hover:text-[var(--color-highlight)] transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href || "/"}
        className="text-[var(--color-text-primary)] underline underline-offset-4 hover:text-[var(--color-highlight)] transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Images with next/image optimization
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;
    
    // For external images, use regular img tag
    if (src.startsWith("http")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || ""}
          className="rounded-lg my-8 w-full"
          {...props}
        />
      );
    }

    return (
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={450}
        className="rounded-lg my-8"
      />
    );
  },

  // Blockquote
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-[var(--color-border)] pl-6 my-6 text-[var(--color-text-muted)] italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-body-lg text-[var(--color-text-secondary)]" {...props}>
      {children}
    </li>
  ),

  // Code
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code (no className from rehype-highlight)
    if (!className) {
      return (
        <code
          className="bg-[var(--color-bg-surface)] px-1.5 py-0.5 rounded text-[0.9em] font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    // Code block (has className from rehype-highlight)
    return (
      <code className={cn("font-mono text-sm", className)} {...props}>
        {children}
      </code>
    );
  },

  // Pre (code blocks)
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-lg p-6 overflow-x-auto my-6"
      {...props}
    >
      {children}
    </pre>
  ),

  // Horizontal rule
  hr: () => (
    <hr className="border-none border-t border-[var(--color-border)] my-12" />
  ),

  // Table
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-body-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left px-4 py-3 bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] font-medium border-b border-[var(--color-border)]"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 border-b border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
      {...props}
    >
      {children}
    </td>
  ),
};

// Custom Callout component for MDX
interface CalloutProps {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = {
    info: "border-[var(--color-accent)]",
    warning: "border-[var(--color-highlight)] bg-[var(--color-highlight-muted)]",
    tip: "border-green-500/50 bg-green-500/10",
  };

  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    tip: "💡",
  };

  return (
    <div
      className={cn(
        "border-l-3 rounded-md p-4 my-6 bg-[var(--color-bg-surface)]",
        styles[type]
      )}
    >
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span>{icons[type]}</span>
          <span className="font-medium text-[var(--color-text-primary)]">{title}</span>
        </div>
      )}
      <div className="text-body-sm text-[var(--color-text-secondary)]">{children}</div>
    </div>
  );
}

