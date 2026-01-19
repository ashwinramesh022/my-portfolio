"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Chapter } from "@/lib/chapters";

interface ChapterContentProps {
  chapter: Chapter;
}

export function ChapterContent({ chapter }: ChapterContentProps) {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Context */}
      <ContentSection 
        title="Context" 
        index={0}
      >
        <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
          {chapter.context}
        </p>
      </ContentSection>

      {/* What I Built */}
      <ContentSection 
        title="What I Built" 
        index={1}
      >
        <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
          {chapter.whatIBuilt}
        </p>
      </ContentSection>

      {/* Key Decisions */}
      <ContentSection 
        title="Key Decisions" 
        index={2}
      >
        <div className="space-y-4">
          {chapter.keyDecisions.map((decision, i) => (
            <motion.div 
              key={i} 
              className="flex gap-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.4, 
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1] as const
              }}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center text-caption text-[var(--color-text-muted)] font-mono">
                {i + 1}
              </span>
              <span className="text-body text-[var(--color-text-secondary)] pt-0.5">
                {decision}
              </span>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Challenges */}
      <ContentSection 
        title="Challenges" 
        index={3}
      >
        <div className="space-y-3">
          {chapter.challenges.map((challenge, i) => (
            <motion.div 
              key={i} 
              className="flex gap-3 text-body text-[var(--color-text-secondary)]"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.4, 
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1] as const
              }}
            >
              <span className="text-[var(--color-highlight)] mt-1">→</span>
              {challenge}
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Outcomes */}
      <ContentSection 
        title="Outcomes" 
        index={4}
      >
        <div className="space-y-3">
          {chapter.outcomes.map((outcome, i) => (
            <motion.div 
              key={i} 
              className="flex gap-3 text-body text-[var(--color-text-secondary)]"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.4, 
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1] as const
              }}
            >
              <span className="text-green-500 mt-1">✓</span>
              {outcome}
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Tech Stack */}
      <ContentSection 
        title="Tech Stack" 
        index={5}
      >
        <div className="flex flex-wrap gap-2">
          {chapter.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-4 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-lg text-body-sm text-[var(--color-text-secondary)] hover:border-[var(--color-border)] hover:text-[var(--color-text-primary)] transition-all duration-200"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.3, 
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1] as const
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </ContentSection>
    </div>
  );
}

function ContentSection({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [30, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y }}
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="text-caption text-[var(--color-text-subtle)] font-mono">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-heading-4 text-[var(--color-text-primary)]">
          {title}
        </h2>
        <span className="flex-1 h-px bg-[var(--color-border-subtle)]" />
      </div>
      {children}
    </motion.section>
  );
}
