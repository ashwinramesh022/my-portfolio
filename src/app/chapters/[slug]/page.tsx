import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getChapterBySlug,
  getAllChapterSlugs,
} from "@/lib/chapters";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Tag, Button } from "@/components/ui";
import { ChapterContent } from "@/components/chapters/ChapterContent";
import { ChapterHeader } from "@/components/chapters/ChapterHeader";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllChapterSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  
  if (!chapter) {
    return generateSEOMetadata({ title: "Chapter Not Found" });
  }

  return generateSEOMetadata({
    title: chapter.title,
    description: chapter.description,
    url: `/chapters/${slug}`,
    type: "article",
    publishedTime: chapter.date,
    tags: chapter.tags,
  });
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Story", url: "/" },
    { name: "Chapters", url: "/chapters" },
    { name: chapter.title, url: `/chapters/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <article className="min-h-screen">
        {/* Chapter Header */}
        <ChapterHeader chapter={chapter} />

        {/* Chapter Content */}
        <div className="container-narrow py-16 md:py-24">
          <ChapterContent chapter={chapter} />

          {/* Back link */}
          <div className="mt-20 pt-8 border-t border-[var(--color-border-subtle)]">
            <Link
              href="/chapters"
              className="group inline-flex items-center gap-2 text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all chapters
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
