"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  overline?: string;
  title: string;
  description?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function PageHeader({ overline, title, description }: PageHeaderProps) {
  return (
    <motion.header 
      className="mb-12 md:mb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {overline && (
        <motion.div 
          className="flex items-center gap-4 mb-4"
          variants={itemVariants}
        >
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <p className="text-overline text-[var(--color-text-muted)]">
            {overline}
          </p>
        </motion.div>
      )}
      
      <motion.h1 
        className="text-heading-1 text-[var(--color-text-primary)] mb-4"
        variants={itemVariants}
      >
        {title}
      </motion.h1>
      
      {description && (
        <motion.p 
          className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed"
          variants={itemVariants}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}

