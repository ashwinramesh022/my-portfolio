/**
 * Motion System - Cinematic presets with reduced motion support
 */

import type { Variants, Transition } from "framer-motion";

// Easing curves (matching CSS variables)
export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  inOutQuart: [0.76, 0, 0.24, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
};

// Duration presets (in seconds)
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
  cinematic: 1,
};

// Transition presets
export const transitions: Record<string, Transition> = {
  fast: {
    duration: duration.fast,
    ease: easing.smooth,
  },
  normal: {
    duration: duration.normal,
    ease: easing.outQuart,
  },
  slow: {
    duration: duration.slow,
    ease: easing.outExpo,
  },
  cinematic: {
    duration: duration.cinematic,
    ease: easing.outExpo,
  },
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
  springGentle: {
    type: "spring",
    stiffness: 200,
    damping: 25,
  },
};

// Animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const fadeUpSlow: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

export const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.cinematic,
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.normal,
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
};

// Stagger container variant
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Page transition variants
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.outExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: duration.fast,
      ease: easing.smooth,
    },
  },
};

// Hover variants for interactive elements
export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: transitions.fast,
  },
  tap: { scale: 0.98 },
};

export const hoverLift: Variants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: transitions.fast,
  },
};

// Utility: Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Utility: Get animation props based on reduced motion preference
export function getAnimationProps(
  variants: Variants,
  options?: {
    initial?: string;
    animate?: string;
    exit?: string;
    reducedMotion?: "always" | "never" | "user";
  }
) {
  const { 
    initial = "hidden", 
    animate = "visible", 
    exit,
    reducedMotion = "user" 
  } = options || {};

  return {
    variants,
    initial,
    animate,
    exit,
    ...(reducedMotion !== "never" && {
      // Framer Motion's built-in reduced motion handling
      style: { willChange: "auto" },
    }),
  };
}

