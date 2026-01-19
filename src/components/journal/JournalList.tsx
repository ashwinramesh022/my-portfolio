"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Tag, Button } from "@/components/ui";

interface JournalListProps {
  posts: PostMeta[];
  tags: { tag: string; count: number }[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

export function JournalList({ posts, tags }: JournalListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = activeTag
    ? posts.filter((p) => p.frontmatter.tags?.includes(activeTag))
    : posts;

  return (
    <div>
      {/* Tag Filters */}
      {tags.length > 0 && (
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-caption text-[var(--color-text-subtle)] mb-4">Filter by topic</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-2 rounded-full text-body-sm transition-all duration-200 ${
                activeTag === null
                  ? "bg-[var(--color-text-primary)] text-[var(--color-bg)]"
                  : "bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
              }`}
            >
              All posts
            </button>
            {tags.map(({ tag, count }) => (
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
                <span className="ml-1.5 text-caption opacity-60">({count})</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Posts List - Magazine Style */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag || "all"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="divide-y divide-[var(--color-border-subtle)]"
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              className="group"
            >
              <Link
                href={`/journal/${post.slug}`}
                className="block py-8 md:py-10 transition-colors hover:bg-[var(--color-bg-elevated)]/50 -mx-4 px-4 rounded-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  {/* Issue Number / Date */}
                  <div className="flex-shrink-0 md:w-32">
                    <div className="flex md:flex-col items-baseline md:items-start gap-2 md:gap-1">
                      <span className="text-caption text-[var(--color-text-subtle)] font-mono">
                        #{String(posts.length - index).padStart(3, "0")}
                      </span>
                      <time className="text-caption text-[var(--color-text-subtle)]">
                        {formatDate(post.frontmatter.date, { 
                          month: "short", 
                          day: "numeric",
                          year: "numeric"
                        })}
                      </time>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-heading-4 text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-highlight)] transition-colors duration-200">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-body text-[var(--color-text-muted)] mb-4 line-clamp-2 leading-relaxed">
                      {post.frontmatter.description}
                    </p>
                    
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-caption text-[var(--color-text-subtle)]">
                        {post.readingTime}
                      </span>
                      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                          <div className="flex flex-wrap gap-1.5">
                            {post.frontmatter.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-caption text-[var(--color-text-subtle)]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Read indicator */}
                  <div className="hidden md:flex items-center text-[var(--color-text-subtle)] group-hover:text-[var(--color-text-muted)] transition-colors">
                    <span className="text-caption mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read
                    </span>
                    <svg
                      width="16"
                      height="16"
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
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredPosts.length === 0 && activeTag && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <p className="text-body text-[var(--color-text-muted)] mb-2">
            No posts found for &quot;{activeTag}&quot;
          </p>
          <p className="text-body-sm text-[var(--color-text-subtle)] mb-6">
            Try selecting a different topic or view all posts.
          </p>
          <Button
            variant="outline"
            onClick={() => setActiveTag(null)}
          >
            View all posts
          </Button>
        </motion.div>
      )}
    </div>
  );
}
