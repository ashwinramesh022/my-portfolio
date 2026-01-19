import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { PageHeader } from "@/components/shared";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = generateSEOMetadata({
  title: "About",
  description: "My story, how I think, and what drives me as an engineer. Learn about my background, values, and current explorations.",
  url: "/about",
});

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-narrow">
        {/* Header */}
        <PageHeader
          overline="About"
          title="The Story So Far"
          description="Engineer by training, designer by curiosity, builder by nature."
        />

        {/* Content */}
        <AboutContent />

        {/* Connect */}
        <section className="mt-20 pt-12 border-t border-[var(--color-border-subtle)]">
          <h2 className="text-heading-4 text-[var(--color-text-primary)] mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-body text-[var(--color-text-secondary)] mb-8 max-w-xl leading-relaxed">
            I&apos;m always interested in hearing about new opportunities, collaborations, 
            or just chatting about technology and design.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)] transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-text-muted)] group-hover:text-[var(--color-highlight)] transition-colors">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              {siteConfig.author.email}
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)] transition-all duration-200"
            >
              LinkedIn
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 group-hover:opacity-100 transition-opacity">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)] transition-all duration-200"
            >
              GitHub
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 group-hover:opacity-100 transition-opacity">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)] transition-all duration-200"
            >
              Twitter
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 group-hover:opacity-100 transition-opacity">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
