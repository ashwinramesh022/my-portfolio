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
            title="SDE Intern – EC2 ZIM Core Team"
            company="Amazon Web Services (AWS)"
            location="Arlington, VA"
            date="May 2025 – Aug 2025"
            highlights={[
              "Developed GraphQL-based POC for EC2 network interface data, reducing payload size by 80%",
              "Built dynamic SQL query builder eliminating N+1 issues, improving throughput by 25%",
              "Benchmarked resolver performance at 330+ req/sec with zero data loss",
              "Design adopted for large-scale production integration",
            ]}
          />
          <ExperienceItem
            title="Student VR Developer"
            company="NSF-Funded Research Project, NC State University"
            location="Raleigh, NC"
            date="Dec 2024 – Jun 2025"
            highlights={[
              "Developing VR environments in Unity3D for $1.4M NSF-funded project",
              "Integrating OpenXR frameworks and procedural generation for Meta for Education",
              "Managing Git version control and debugging across three project branches",
              "Optimizing performance with Unity Profiler for Meta Quest devices",
            ]}
          />
          <ExperienceItem
            title="Summer Intern"
            company="Semiconductor Research Corporation"
            location="Chennai, India"
            date="Jan 2024 – Mar 2024"
            highlights={[
              "Built outlier detection algorithms (SVM, K-means, DBSCAN) on 250+ datasets",
              "Improved anomaly detection accuracy by 12% for analog and mixed-signal circuits",
              "Achieved 87% accuracy (up from 80%) using clustering and predictive modeling",
              "Project funded by Texas Instruments & Semiconductor Research Organization",
            ]}
          />
          <ExperienceItem
            title="Software Developer Intern"
            company="EION, Inc."
            location="Chennai, India"
            date="Jul 2023 – Sep 2023"
            highlights={[
              "Built mobile app for Android using React and Node.js, improving throughput by 12%",
              "Engineered Firebase integration accelerating data retrieval by 15%",
              "Drove 50+ active users during beta release with real-time analytics",
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
            skills={["Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "SQL"]}
          />
          <SkillCategory
            title="Frontend"
            skills={["React", "Next.js", "HTML/CSS", "Tailwind CSS"]}
          />
          <SkillCategory
            title="Backend"
            skills={["Node.js", "Flask", "GraphQL", "REST APIs", "MongoDB", "Firebase"]}
          />
          <SkillCategory
            title="Cloud & Tools"
            skills={["AWS (EC2, SageMaker, VPC)", "Docker", "Git", "CI/CD", "Unity", "TensorFlow"]}
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
        <div className="space-y-4">
          <div className="p-6 md:p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-body-lg text-[var(--color-text-primary)] font-medium">
                  Master of Computer Science
                </h3>
                <p className="text-body-sm text-[var(--color-text-muted)]">
                  North Carolina State University, Raleigh, NC
                </p>
              </div>
              <div className="text-right">
                <span className="text-body-sm text-[var(--color-text-subtle)] block">
                  Expected May 2026
                </span>
                <span className="text-body-sm text-[var(--color-highlight)] font-medium">
                  GPA: 4.0/4.0
                </span>
              </div>
            </div>
            <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
              Coursework: Advanced Data Structures, Automated Learning and Data Analysis, Software Engineering
            </p>
          </div>
          <div className="p-6 md:p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-body-lg text-[var(--color-text-primary)] font-medium">
                  Bachelor of Engineering in Computer Science
                </h3>
                <p className="text-body-sm text-[var(--color-text-muted)]">
                  Anna University, College of Engineering, Chennai, India
                </p>
              </div>
              <div className="text-right">
                <span className="text-body-sm text-[var(--color-text-subtle)] block">
                  June 2024
                </span>
                <span className="text-body-sm text-[var(--color-highlight)] font-medium">
                  GPA: 3.7/4.0
                </span>
              </div>
            </div>
            <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
              Coursework: Application Development, Operating Systems, Data Structures, Object-Oriented Design, DBMS
            </p>
          </div>
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
            title="Memory-Driven Transformer"
            tech="Python, PyTorch, AWS SageMaker, BERT"
            description="Deep learning system for generating clinically consistent radiology reports"
          />
          <ProjectCard
            title="EC2 GraphQL Query System"
            tech="GraphQL, Docker, AWS Coral, SQL"
            description="POC reducing payload size by 80% for EC2 network interface data"
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
