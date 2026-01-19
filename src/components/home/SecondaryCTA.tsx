"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function SecondaryCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      className="py-28 md:py-40 border-t border-[var(--color-border-subtle)] relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 120%, rgba(120, 119, 198, 0.06), transparent)",
          }}
        />
      </motion.div>

      <div className="container-narrow relative">
        <div className="text-center">
          {/* Label */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="w-12 h-px bg-[var(--color-border)]" />
            <p className="text-overline text-[var(--color-text-muted)]">
              Keep Exploring
            </p>
            <span className="w-12 h-px bg-[var(--color-border)]" />
          </motion.div>
          
          {/* Heading */}
          <motion.h2
            className="text-heading-3 text-[var(--color-text-primary)] mb-14 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Dive deeper into my work and thoughts
          </motion.h2>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <CTACard
              href="/journal"
              title="Journal"
              description="Long-form thoughts on engineering, design, and the craft of building."
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              }
              delay={0}
              accentColor="var(--color-highlight)"
            />
            <CTACard
              href="/about"
              title="About Me"
              description="My story, how I think, and what drives me as an engineer."
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              }
              delay={0.1}
              accentColor="var(--color-accent)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTACard({
  href,
  title,
  description,
  icon,
  delay,
  accentColor,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  accentColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <Link
        href={href}
        className="group relative flex flex-col items-start p-8 md:p-10 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl transition-all duration-300 hover:border-[var(--color-border)] hover:bg-[var(--color-bg-surface)] overflow-hidden h-full"
      >
        {/* Hover gradient */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at 50% 0%, ${accentColor}10, transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="relative flex-1">
          <div 
            className="w-12 h-12 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center mb-6 transition-colors duration-300"
            style={{ 
              borderColor: `var(--color-border-subtle)`,
            }}
          >
            <span 
              className="text-[var(--color-text-muted)] transition-colors duration-300"
              style={{ color: "var(--color-text-muted)" }}
            >
              {icon}
            </span>
          </div>
          <h3 
            className="text-heading-4 text-[var(--color-text-primary)] mb-3 transition-colors duration-300"
            style={{ 
              // @ts-expect-error CSS custom property
              "--hover-color": accentColor 
            }}
          >
            <span className="group-hover:text-[var(--color-highlight)]">{title}</span>
          </h3>
          <p className="text-body-sm text-[var(--color-text-muted)] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Arrow */}
        <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-subtle)] group-hover:border-[var(--color-border)] group-hover:text-[var(--color-text-muted)] transition-all duration-300">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
