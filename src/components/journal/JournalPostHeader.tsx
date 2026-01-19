"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Post } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Tag } from "@/components/ui";

interface JournalPostHeaderProps {
  post: Post;
}

export function JournalPostHeader({ post }: JournalPostHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <header 
      ref={headerRef}
      className="relative pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden"
    >
      {/* Subtle background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(120, 119, 198, 0.03), transparent)",
        }}
      />

      <div className="container-narrow relative">
        {/* Breadcrumb */}
        <motion.nav 
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <ol className="flex items-center gap-2 text-caption text-[var(--color-text-muted)]">
            <li>
              <Link
                href="/journal"
                className="hover:text-[var(--color-text-secondary)] transition-colors"
              >
                Journal
              </Link>
            </li>
            <li className="text-[var(--color-border)]">/</li>
            <li className="text-[var(--color-text-subtle)] truncate max-w-[200px] md:max-w-xs">
              {post.frontmatter.title}
            </li>
          </ol>
        </motion.nav>

        <motion.div style={{ opacity, y }}>
          {/* Title */}
          <motion.h1 
            className="text-heading-1 text-[var(--color-text-primary)] mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {post.frontmatter.title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {post.frontmatter.description}
          </motion.p>

          {/* Meta */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 text-body-sm text-[var(--color-text-muted)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span>{post.readingTime}</span>
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <div className="flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div 
        className="container-narrow mt-12"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-px bg-gradient-to-r from-[var(--color-border)] via-[var(--color-border)] to-transparent" />
      </motion.div>
    </header>
  );
}

