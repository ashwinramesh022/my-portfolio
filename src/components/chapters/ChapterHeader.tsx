"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Chapter } from "@/lib/chapters";
import { formatDate } from "@/lib/utils";
import { Tag, Button } from "@/components/ui";

interface ChapterHeaderProps {
  chapter: Chapter;
}

export function ChapterHeader({ chapter }: ChapterHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  return (
    <header 
      ref={headerRef}
      className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(245, 158, 11, 0.05), transparent),
            radial-gradient(ellipse 50% 50% at 0% 80%, rgba(120, 119, 198, 0.04), transparent)
          `,
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
              <Link href="/chapters" className="hover:text-[var(--color-text-secondary)] transition-colors">
                Chapters
              </Link>
            </li>
            <li className="text-[var(--color-border)]">/</li>
            <li className="text-[var(--color-text-subtle)] truncate max-w-[200px]">{chapter.title}</li>
          </ol>
        </motion.nav>

        <motion.div style={{ opacity, y, scale }}>
          {/* Overline */}
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="w-8 h-px bg-[var(--color-text-muted)]" />
            <p className="text-overline text-[var(--color-text-muted)]">
              {chapter.subtitle}
            </p>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-heading-1 text-[var(--color-text-primary)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {chapter.title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {chapter.description}
          </motion.p>

          {/* Meta row */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="text-body-sm text-[var(--color-text-muted)]">
              {formatDate(chapter.date)}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <div className="flex flex-wrap gap-2">
              {chapter.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {chapter.links && (
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              {chapter.links.live && (
                <a
                  href={chapter.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="sm">
                    View Live ↗
                  </Button>
                </a>
              )}
              {chapter.links.github && (
                <a
                  href={chapter.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">
                    View Source ↗
                  </Button>
                </a>
              )}
              {chapter.links.demo && (
                <a
                  href={chapter.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="sm">
                    Watch Demo ↗
                  </Button>
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </header>
  );
}

