"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getAllChapters, getChapterTags, Chapter } from "@/lib/chapters";
import { formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui";

export default function ChaptersPage() {
  const allChapters = getAllChapters();
  const tags = getChapterTags();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  const filteredChapters = activeTag
    ? allChapters.filter((c) => c.tags.includes(activeTag))
    : allChapters;

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <motion.header 
        ref={headerRef}
        className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        {/* Background accent */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(120, 119, 198, 0.05), transparent)",
          }}
        />

        <div className="container-narrow relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-10 h-px bg-[var(--color-border)]" />
            <p className="text-overline text-[var(--color-text-muted)]">
              Work
            </p>
          </motion.div>

          <motion.h1 
            className="text-display text-[var(--color-text-primary)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Chapters
          </motion.h1>

          <motion.p 
            className="text-body-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Each project is a chapter in my story as an engineer. 
            Here&apos;s a collection of work that shaped how I think and build.
          </motion.p>
        </div>
      </motion.header>

      {/* Content */}
      <div className="container-narrow pb-20">
        {/* Tag Filters */}
        <motion.div 
          className="mb-12 sticky top-20 z-20 py-4 -mx-6 px-6 bg-[var(--color-bg)]/80 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <p className="text-caption text-[var(--color-text-subtle)] mb-4">Filter by domain</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-2 rounded-full text-body-sm transition-all duration-200 ${
                activeTag === null
                  ? "bg-[var(--color-text-primary)] text-[var(--color-bg)]"
                  : "bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
              }`}
            >
              All chapters
            </button>
            {tags.map(({ tag }) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-body-sm transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-[var(--color-text-primary)] text-[var(--color-bg)]"
                    : "bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Chapters List */}
        <div className="space-y-6">
          {filteredChapters.map((chapter, index) => (
            <ChapterCard key={chapter.slug} chapter={chapter} index={index} />
          ))}
        </div>

        {filteredChapters.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center mx-auto mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--color-text-muted)]"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <p className="text-body text-[var(--color-text-muted)] mb-2">
              No chapters found for this filter.
            </p>
            <Button
              variant="outline"
              onClick={() => setActiveTag(null)}
              className="mt-4"
            >
              View all chapters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [40, 0]);

  return (
    <motion.div ref={cardRef} style={{ opacity, y }}>
      <Link href={`/chapters/${chapter.slug}`} className="group block">
        <div className="relative bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-[var(--color-border)] hover:bg-[var(--color-bg-surface)]">
          {/* Hover gradient */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(600px circle at 50% 50%, rgba(245, 158, 11, 0.03), transparent 50%)",
            }}
          />

          <div className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
            {/* Chapter Number */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center text-body-sm text-[var(--color-text-muted)] font-mono group-hover:border-[var(--color-highlight)] group-hover:text-[var(--color-highlight)] transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Meta */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-caption text-[var(--color-text-subtle)]">
                  {formatDateShort(chapter.date)}
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <span className="text-caption text-[var(--color-text-muted)]">
                  {chapter.subtitle}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-heading-4 text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-highlight)] transition-colors duration-200">
                {chapter.title}
              </h2>

              {/* Description */}
              <p className="text-body-sm text-[var(--color-text-secondary)] mb-5 leading-relaxed">
                {chapter.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {chapter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-caption text-[var(--color-text-subtle)] px-2.5 py-1 rounded-md bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] group-hover:border-[var(--color-border)] group-hover:text-[var(--color-text-primary)] transition-all duration-200 self-center">
              <svg
                width="18"
                height="18"
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
        </div>
      </Link>
    </motion.div>
  );
}
