"use client";

import { motion, useReducedMotion, useAnimate, stagger } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui";

// Cinematic easing - fast out, slow in (feels weighty)
const cinematicEase = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Orchestrated animation sequence (~3.5s total)
    const runSequence = async () => {
      // BEAT 1: Ambient atmosphere (0ms)
      animate(
        ".hero-glow",
        { opacity: 1, scale: 1 },
        { duration: 1.2, ease: "easeOut" }
      );

      // Brief pause
      await new Promise(resolve => setTimeout(resolve, 200));

      // BEAT 2: Introduction (200ms)
      await animate(
        ".hero-overline",
        { opacity: 1, x: 0 },
        { duration: 0.5, ease: cinematicEase }
      );

      // BEAT 3: Headlines (700ms - 1900ms)
      await animate(
        ".hero-letter",
        { opacity: 1, y: 0, rotateX: 0 },
        { 
          duration: 0.4, 
          ease: cinematicEase,
          delay: stagger(0.025, { startDelay: 0 }) // 25ms between letters
        }
      );

      // BEAT 4: Pause (1900ms - 2150ms)
      await new Promise(resolve => setTimeout(resolve, 250));

      // BEAT 5: Subheadline (2150ms - 2800ms)
      await animate(
        ".hero-subheadline",
        { opacity: 1, y: 0 },
        { duration: 0.65, ease: cinematicEase }
      );

      // BEAT 6: CTAs (2800ms - 3200ms)
      await animate(
        ".hero-cta",
        { opacity: 1, y: 0 },
        { duration: 0.4, ease: cinematicEase, delay: stagger(0.1) }
      );

      // BEAT 7: Scroll indicator (3200ms - 3500ms)
      await new Promise(resolve => setTimeout(resolve, 100));
      animate(
        ".hero-scroll",
        { opacity: 1 },
        { duration: 0.5, ease: "easeOut" }
      );
    };

    runSequence();
  }, [animate, shouldReduceMotion]);

  return (
    <section 
      ref={scope}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Multi-color gradient background - jewel-toned palette */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: "var(--gradient-hero)",
        }}
      />
      
      {/* Film grain texture - very subtle */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow - the warm accent that sets the mood */}
      <motion.div
        className="hero-glow absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translateX(20%)",
        }}
      />

      <div className="container-narrow w-full relative z-10">
        <div className="max-w-4xl">
          {/* Overline - the introduction */}
          <motion.div 
            className="hero-overline mb-8 flex items-center gap-3"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
          >
            <span className="w-10 h-px bg-[var(--color-text-muted)]" />
            <p className="text-overline text-[var(--color-text-muted)]">
              Software Engineer
            </p>
          </motion.div>

          {/* Main Headline - the star of the show */}
          <h1 className="mb-12">
            <HeadlineLine 
              text="Fast learner." 
              className="text-[var(--color-text-primary)]"
              shouldReduceMotion={shouldReduceMotion ?? false}
            />
            <HeadlineLine 
              text="Versatile builder." 
              className="text-[var(--color-text-muted)]"
              shouldReduceMotion={shouldReduceMotion ?? false}
            />
            <HeadlineLine 
              text="Creative technologist." 
              className="text-[var(--color-text-primary)]"
              shouldReduceMotion={shouldReduceMotion ?? false}
            />
          </h1>

          {/* Subheadline - supporting context, not competing */}
          <motion.p
            className="hero-subheadline text-body-lg text-[var(--color-text-secondary)] max-w-xl mb-12 leading-relaxed"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
          >
            I build meaningful products at the intersection of engineering and design. 
            Currently exploring{" "}
            <span className="text-[var(--color-text-primary)]">AI-augmented workflows</span>
            {" "}and{" "}
            <span className="text-[var(--color-text-primary)]">immersive experiences</span>.
          </motion.p>

          {/* CTAs - the invitation */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.div
              className="hero-cta"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Button href="/resume" variant="primary" size="lg">
                <span>View Resume</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="ml-1"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Button>
            </motion.div>
            <motion.div
              className="hero-cta"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Button href="/chapters" variant="outline" size="lg">
                Explore Chapters
              </Button>
            </motion.div>
          </div>

          {/* Scroll indicator - the "ready" signal */}
          <motion.div
            className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
          >
            <span className="text-caption text-[var(--color-text-subtle)]">Scroll</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-[var(--color-text-subtle)] to-transparent"
              animate={shouldReduceMotion ? {} : { scaleY: [1, 0.5, 1] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "top" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(10, 10, 12, 0.3) 100%)",
        }}
      />
    </section>
  );
}

// Each headline line with character-by-character animation
function HeadlineLine({ 
  text, 
  className,
  shouldReduceMotion 
}: { 
  text: string; 
  className: string;
  shouldReduceMotion: boolean;
}) {
  if (shouldReduceMotion) {
    return (
      <span className={`block text-display leading-[1.1] mb-2 ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span className={`block text-display leading-[1.1] mb-2 ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="hero-letter inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -80 }}
          style={{ 
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
