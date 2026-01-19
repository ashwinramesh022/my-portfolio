import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { JournalList } from "@/components/journal/JournalList";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = generateSEOMetadata({
  title: "Journal",
  description: "Long-form thoughts on engineering, design, learning, and the craft of building software.",
  url: "/journal",
});

export default function JournalPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="py-12 md:py-20">
      <div className="container-narrow">
        {/* Header */}
        <PageHeader
          overline="Writing"
          title="Journal"
          description="Long-form thoughts on engineering, design, learning, and the craft of building software."
        />

        {/* Posts */}
        <JournalList posts={posts} tags={tags} />

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center mx-auto mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--color-text-muted)]"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
            </div>
            <p className="text-body text-[var(--color-text-muted)]">
              No posts yet. Check back soon!
            </p>
          </div>
        )}

        {/* RSS Link */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/journal/feed.xml"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="group-hover:text-[var(--color-highlight)] transition-colors"
            >
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
            Subscribe via RSS
          </Link>

          <p className="text-caption text-[var(--color-text-subtle)]">
            {posts.length} {posts.length === 1 ? "post" : "posts"} published
          </p>
        </div>
      </div>
    </div>
  );
}
