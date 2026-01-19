"use client";

import Link from "next/link";
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

export function ResumeContent() {
  return (
    <motion.div
      className="space-y-16 md:space-y-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Experience */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-4 mb-8">
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <h2 className="text-overline text-[var(--color-text-muted)]">
            Experience
          </h2>
        </div>
        <div className="space-y-8">
          <ExperienceItem
            title="Software Development Engineer Intern"
            company="Amazon"
            location="Seattle, WA"
            date="Summer 2025"
            highlights={[
              "Built real-time inventory forecasting system reducing overstock by 12% across pilot categories",
              "Designed and implemented REST API processing 50K+ SKU predictions daily",
              "Collaborated with senior engineers to integrate with legacy warehouse management systems",
              "Received return offer for full-time position",
            ]}
          />
          <ExperienceItem
            title="VR Developer & Researcher"
            company="University Psychology Lab"
            location="Remote"
            date="Jan 2025 – May 2025"
            highlights={[
              "Developed Unity-based VR therapeutic environment used in published research study",
              "Created three procedurally-generated nature environments with real-time biometric integration",
              "Built companion tablet app for therapist control during patient sessions",
              "92% of 40+ study participants reported reduced anxiety post-session",
            ]}
          />
          <ExperienceItem
            title="Teaching Assistant"
            company="Computer Science Department"
            location="University"
            date="Sep 2024 – Dec 2024"
            highlights={[
              "Assisted 200+ students in Data Structures and Algorithms course",
              "Held weekly office hours and graded assignments with detailed feedback",
              "Developed supplementary materials and practice problems",
            ]}
          />
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-4 mb-8">
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <h2 className="text-overline text-[var(--color-text-muted)]">
            Skills
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <SkillCategory
            title="Languages"
            skills={["TypeScript", "JavaScript", "Python", "C#", "Java", "SQL"]}
          />
          <SkillCategory
            title="Frontend"
            skills={["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"]}
          />
          <SkillCategory
            title="Backend"
            skills={["Node.js", "Express", "PostgreSQL", "DynamoDB", "REST APIs"]}
          />
          <SkillCategory
            title="Tools & Platforms"
            skills={["AWS", "Git", "Unity", "Figma", "Vercel"]}
          />
        </div>
      </motion.section>

      {/* Education */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-4 mb-8">
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <h2 className="text-overline text-[var(--color-text-muted)]">
            Education
          </h2>
        </div>
        <div className="p-6 md:p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
            <div>
              <h3 className="text-body-lg text-[var(--color-text-primary)] font-medium">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-body-sm text-[var(--color-text-muted)]">
                University Name
              </p>
            </div>
            <span className="text-body-sm text-[var(--color-text-subtle)]">
              Expected May 2026
            </span>
          </div>
          <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
            Relevant coursework: Data Structures, Algorithms, Systems Programming, 
            Machine Learning, Human-Computer Interaction, Computer Graphics
          </p>
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-4 mb-8">
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <h2 className="text-overline text-[var(--color-text-muted)]">
            Selected Projects
          </h2>
        </div>
        <p className="text-body text-[var(--color-text-muted)] mb-6">
          See detailed case studies in{" "}
          <Link 
            href="/chapters" 
            className="text-[var(--color-text-secondary)] underline underline-offset-4 hover:text-[var(--color-text-primary)] transition-colors"
          >
            Chapters
          </Link>
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ProjectCard
            title="Inventory Intelligence System"
            tech="TypeScript, Node.js, AWS Lambda, DynamoDB"
            description="Real-time forecasting microservice for Amazon fulfillment centers"
          />
          <ProjectCard
            title="Calm Spaces VR"
            tech="Unity, C#, Oculus SDK, React Native"
            description="Therapeutic VR environment for anxiety research"
          />
        </div>
      </motion.section>
    </motion.div>
  );
}

function ExperienceItem({
  title,
  company,
  location,
  date,
  highlights,
}: {
  title: string;
  company: string;
  location: string;
  date: string;
  highlights: string[];
}) {
  return (
    <div className="relative pl-8 border-l-2 border-[var(--color-border-subtle)]">
      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-text-muted)]" />
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-4">
        <div>
          <h3 className="text-body-lg text-[var(--color-text-primary)] font-medium">
            {title}
          </h3>
          <p className="text-body-sm text-[var(--color-text-muted)]">
            {company} · {location}
          </p>
        </div>
        <span className="text-body-sm text-[var(--color-text-subtle)] flex-shrink-0">
          {date}
        </span>
      </div>
      <ul className="space-y-2">
        {highlights.map((highlight, i) => (
          <li
            key={i}
            className="flex gap-3 text-body-sm text-[var(--color-text-secondary)]"
          >
            <span className="text-[var(--color-highlight)] mt-1">→</span>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="p-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl">
      <h3 className="text-caption text-[var(--color-text-subtle)] uppercase tracking-wider mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-lg text-body-sm text-[var(--color-text-secondary)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  tech,
  description,
}: {
  title: string;
  tech: string;
  description: string;
}) {
  return (
    <div className="group p-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl hover:border-[var(--color-border)] transition-colors duration-200">
      <h3 className="text-body text-[var(--color-text-primary)] font-medium mb-1 group-hover:text-[var(--color-highlight)] transition-colors">
        {title}
      </h3>
      <p className="text-caption text-[var(--color-text-subtle)] mb-3">{tech}</p>
      <p className="text-body-sm text-[var(--color-text-muted)]">{description}</p>
    </div>
  );
}
