"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Chapter } from "@/lib/chapters";
import { formatDateShort } from "@/lib/utils";
import { Tag } from "@/components/ui";

interface FeaturedChaptersProps {
  chapters: Chapter[];
}

export function FeaturedChapters({ chapters }: FeaturedChaptersProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for the section header
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} className="py-28 md:py-40 relative">
      {/* Background accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 20% 50%, rgba(120, 119, 198, 0.03), transparent)",
        }}
      />

      <div className="container-narrow relative">
        {/* Section Header with parallax */}
        <motion.div 
          className="mb-16 md:mb-20"
          style={{ y: headerY }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="w-12 h-px bg-[var(--color-border)]" />
            <p className="text-overline text-[var(--color-text-muted)]">
              Featured Work
            </p>
          </motion.div>
          <motion.h2 
            className="text-heading-2 text-[var(--color-text-primary)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Select Chapters
          </motion.h2>
        </motion.div>

        {/* Chapters */}
        <div className="space-y-8 md:space-y-12">
          {chapters.map((chapter, index) => (
            <ChapterCard 
              key={chapter.slug} 
              chapter={chapter} 
              index={index}
            />
          ))}
        </div>

        {/* View All Link */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Link
            href="/chapters"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--color-border-subtle)] text-body text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)] transition-all duration-300"
          >
            View all chapters
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  // Card entrance animation based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.97, 1]);

  return (
    <motion.article
      ref={cardRef}
      style={{ opacity, y, scale }}
    >
      <Link href={`/chapters/${chapter.slug}`} className="group block relative">
        <div className="relative bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-8 md:p-10 lg:p-12 overflow-hidden transition-all duration-500 hover:border-[var(--color-border)] group-hover:bg-[var(--color-bg-surface)]">
          {/* Hover gradient spotlight */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.04), transparent 40%)",
            }}
          />

          <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12">
            {/* Content */}
            <div className="flex-1 max-w-2xl">
              {/* Chapter Number + Meta */}
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-caption text-[var(--color-text-muted)] font-mono group-hover:border-[var(--color-highlight)] group-hover:text-[var(--color-highlight)] transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-3 text-caption text-[var(--color-text-subtle)]">
                  <span>{formatDateShort(chapter.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                  <span className="text-[var(--color-text-muted)]">{chapter.subtitle}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-heading-3 text-[var(--color-text-primary)] mb-4 transition-colors duration-300 group-hover:text-[var(--color-highlight)]">
                {chapter.title}
              </h3>

              {/* Description */}
              <p className="text-body text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                {chapter.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {chapter.tags.slice(0, 4).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] group-hover:border-[var(--color-highlight)] group-hover:text-[var(--color-highlight)] group-hover:bg-[var(--color-highlight-muted)] transition-all duration-300 self-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Large watermark number */}
          <div className="absolute -bottom-6 -right-2 text-[10rem] font-bold text-[var(--color-bg-surface)] pointer-events-none select-none leading-none opacity-60 group-hover:opacity-100 group-hover:text-[var(--color-bg-hover)] transition-all duration-500">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
