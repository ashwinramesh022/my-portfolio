"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ProofItem {
  label: string;
  icon: string;
}

interface ProofStripProps {
  items: readonly ProofItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  briefcase: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  cube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  ),
  sparkles: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z" />
      <path d="M19 5l.5 1.5L21 7l-1.5.5L19 9l-.5-1.5L17 7l1.5-.5L19 5z" />
    </svg>
  ),
};

export function ProofStrip({ items }: ProofStripProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the background line
  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Animated border lines */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"
        style={{ scaleX: lineWidth, transformOrigin: "left" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"
        style={{ scaleX: lineWidth, transformOrigin: "right" }}
      />
      
      <div className="container-narrow relative">
        {/* Section label */}
        <motion.p
          className="text-center text-caption text-[var(--color-text-subtle)] mb-8 uppercase tracking-widest"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Highlights
        </motion.p>

        {/* Items */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              className="group flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--color-bg-surface)]/50 border border-[var(--color-border-subtle)] backdrop-blur-sm hover:border-[var(--color-border)] hover:bg-[var(--color-bg-surface)] transition-all duration-300"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1] as const
              }}
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-highlight)] transition-colors duration-300">
                {iconMap[item.icon]}
              </span>
              <span className="text-body-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
