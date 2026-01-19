import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui";
import { PageHeader } from "@/components/shared";
import { ResumeContent } from "@/components/resume/ResumeContent";

export const metadata: Metadata = generateSEOMetadata({
  title: "Resume",
  description: "Software Engineer with experience at Amazon and expertise in full-stack development, VR/Unity, and AI-augmented workflows.",
  url: "/resume",
});

export default function ResumePage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-narrow">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <PageHeader
            overline="Resume"
            title="Ashwin Ramesh Kannan"
            description="Software Engineer passionate about building meaningful products at the intersection of engineering and design."
          />

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Button
              href="/resume.pdf"
              variant="primary"
              size="lg"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </Button>
            <Button
              href={`mailto:${siteConfig.author.email}`}
              variant="outline"
              size="lg"
            >
              Get in Touch
            </Button>
          </div>
        </header>

        {/* Resume Content */}
        <ResumeContent />

        {/* Contact Section */}
        <section className="mt-20 pt-12 border-t border-[var(--color-border-subtle)]">
          <h2 className="text-heading-4 text-[var(--color-text-primary)] mb-6">
            Contact
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContactCard
              label="Email"
              value={siteConfig.author.email}
              href={`mailto:${siteConfig.author.email}`}
            />
            <ContactCard
              label="LinkedIn"
              value="linkedin.com/in/ashwinrk"
              href={siteConfig.links.linkedin}
              external
            />
            <ContactCard
              label="GitHub"
              value="github.com/ashwinrk"
              href={siteConfig.links.github}
              external
            />
            <ContactCard
              label="Location"
              value="United States"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function ContactCard({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div className="p-5 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl">
      <p className="text-caption text-[var(--color-text-subtle)] mb-2">{label}</p>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group inline-flex items-center gap-1 text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <span className="truncate">{value}</span>
          {external && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          )}
        </a>
      ) : (
        <p className="text-body-sm text-[var(--color-text-secondary)]">{value}</p>
      )}
    </div>
  );
}
