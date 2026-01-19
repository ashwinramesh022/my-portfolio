"use client";

import { motion } from "framer-motion";

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

export function AboutContent() {
  return (
    <motion.div
      className="space-y-16 md:space-y-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* My Story */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <h2 className="text-overline text-[var(--color-text-muted)]">
            My Story
          </h2>
        </div>
        <div className="space-y-6 max-w-2xl">
          <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
            I&apos;m currently pursuing my Master&apos;s in Computer Science at NC State University (4.0 GPA), 
            after completing my B.E. in Computer Science from Anna University, Chennai. My journey 
            into software engineering started with a curiosity about how things work—which quickly 
            evolved into a passion for building systems that solve real problems at scale.
          </p>
          <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
            This past summer, I interned at AWS on the EC2 ZIM Core Team, where I designed a 
            GraphQL-based system that reduced payload sizes by 80% and achieved sub-second latency. 
            I&apos;m also working on a $1.4M NSF-funded VR research project at NC State, building 
            educational environments in Unity3D for Meta for Education.
          </p>
          <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
            Beyond tech, I spent two years as President of Theatron, the official theater club 
            at Anna University—leading productions, organizing 20+ workshops, and securing $3,000 
            in funding. This experience shaped how I approach collaboration, communication, and 
            creative problem-solving.
          </p>
        </div>
      </motion.section>

      {/* How I Think */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <h2 className="text-overline text-[var(--color-text-muted)]">
            How I Think
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <ThinkingCard
            number="01"
            title="Systems First"
            description="I believe in understanding the whole before optimizing the parts. Good solutions emerge from seeing connections others miss."
          />
          <ThinkingCard
            number="02"
            title="User-Centered"
            description="Technical excellence means nothing if it doesn't serve people. I always start by asking: what does the user actually need?"
          />
          <ThinkingCard
            number="03"
            title="Iterative Refinement"
            description="I ship early and often. Perfect is the enemy of good, and real feedback beats hypothetical optimization every time."
          />
          <ThinkingCard
            number="04"
            title="Cross-Pollination"
            description="The best ideas come from unexpected places. I draw inspiration from design, psychology, and domains far from pure engineering."
          />
        </div>
      </motion.section>

      {/* Values */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <h2 className="text-overline text-[var(--color-text-muted)]">
            Values
          </h2>
        </div>
        <div className="space-y-6 max-w-2xl">
          <ValueItem
            title="Craft matters"
            description="I care about the details—clean code, thoughtful design, and experiences that feel right."
          />
          <ValueItem
            title="Continuous learning"
            description="Technology evolves fast. I stay curious, embrace new tools, and never stop growing."
          />
          <ValueItem
            title="Honest communication"
            description="I believe in saying what I mean, admitting what I don't know, and asking for help when needed."
          />
          <ValueItem
            title="Impact over activity"
            description="Shipping features isn't the goal—creating value is. I focus on outcomes, not output."
          />
        </div>
      </motion.section>

      {/* Currently Exploring */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <h2 className="text-overline text-[var(--color-text-muted)]">
            Currently Exploring
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            "GraphQL & Distributed Systems",
            "VR/XR Development",
            "Deep Learning for Medical Imaging",
            "AWS Cloud Architecture",
            "Full-Stack Development",
          ].map((topic) => (
            <span
              key={topic}
              className="px-4 py-2.5 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-xl text-body-sm text-[var(--color-text-secondary)] hover:border-[var(--color-border)] hover:text-[var(--color-text-primary)] transition-all duration-200"
            >
              {topic}
            </span>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

function ThinkingCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 md:p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl hover:border-[var(--color-border)] transition-colors duration-200">
      <span className="text-caption text-[var(--color-text-subtle)] font-mono mb-3 block group-hover:text-[var(--color-highlight)] transition-colors">
        {number}
      </span>
      <h3 className="text-body-lg text-[var(--color-text-primary)] font-medium mb-3">
        {title}
      </h3>
      <p className="text-body-sm text-[var(--color-text-muted)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ValueItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-[var(--color-highlight)]" />
      <div>
        <span className="text-body text-[var(--color-text-primary)] font-medium">
          {title}
        </span>
        <span className="text-body text-[var(--color-text-secondary)]"> — {description}</span>
      </div>
    </div>
  );
}
